import assert from 'node:assert/strict';
import { test, mock, afterEach } from 'node:test';
import { fetchStarCount } from '../src/lib/github-stars.ts';

afterEach(() => mock.restoreAll());
const repo = 'HKUSTDial/DataMagic';
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });

test('uses the exact GitHub count, including zero', async () => {
  const fetch = mock.method(globalThis, 'fetch', async () => json({ stargazers_count: 0 }));
  assert.deepEqual(await fetchStarCount(repo, new AbortController().signal), { count: '0', source: 'github' });
  assert.equal(fetch.mock.callCount(), 1);
});

test('falls back to Shields when GitHub rate-limits a visitor', async () => {
  mock.method(globalThis, 'fetch', async (url) => url.includes('api.github.com')
    ? json({ message: 'API rate limit exceeded' }, 403) : json({ value: '303' }));
  assert.deepEqual(await fetchStarCount(repo, new AbortController().signal), { count: '303', source: 'shields' });
});

test('a GitHub timeout does not abort the Shields fallback', async () => {
  const keepAlive = setTimeout(() => {}, 1000);
  const signals = [];
  mock.method(globalThis, 'fetch', async (url, { signal }) => {
    signals.push(signal);
    if (url.includes('api.github.com')) return new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    });
    assert.equal(signal.aborted, false);
    return json({ value: '303' });
  });
  try {
    assert.deepEqual(await fetchStarCount(repo, new AbortController().signal, 10), { count: '303', source: 'shields' });
    assert.equal(signals[0].aborted, true);
    assert.notEqual(signals[0], signals[1]);
  } finally {
    clearTimeout(keepAlive);
  }
});

test('does not request a fallback after the component unmounts', async () => {
  const controller = new AbortController();
  const fetch = mock.method(globalThis, 'fetch', async () => {
    controller.abort();
    throw controller.signal.reason;
  });
  await assert.rejects(fetchStarCount(repo, controller.signal));
  assert.equal(fetch.mock.callCount(), 1);
});

test('rejects invalid responses from both services so the UI can retain its snapshot', async () => {
  mock.method(globalThis, 'fetch', async (url) => url.includes('api.github.com')
    ? json({ stargazers_count: -1 }) : json({ value: 'rate limited' }));
  await assert.rejects(fetchStarCount(repo, new AbortController().signal), /Invalid Shields count/);
});

test('accepts the Shields message field and abbreviated large counts', async () => {
  mock.method(globalThis, 'fetch', async (url) => url.includes('api.github.com')
    ? json({}, 503) : json({ message: '1.2k' }));
  assert.deepEqual(await fetchStarCount(repo, new AbortController().signal), { count: '1.2k', source: 'shields' });
});
