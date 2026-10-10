export type StarCount = { count: string; source: 'github' | 'shields' };

export async function fetchStarCount(repo: string, signal: AbortSignal, timeoutMs = 5000): Promise<StarCount> {
  async function request(url: string) {
    // A timeout belongs to this request only; it must not cancel the fallback.
    const response = await fetch(url, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)]),
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Star count request failed: ${response.status}`);
    return response.json();
  }

  try {
    const data = await request(`https://api.github.com/repos/${repo}`);
    if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) throw new Error('Invalid GitHub count');
    return { count: data.stargazers_count.toLocaleString('en-US'), source: 'github' };
  } catch (error) {
    if (signal.aborted) throw error;
    const data = await request(`https://img.shields.io/github/stars/${repo}.json`);
    const count = data.value ?? data.message;
    if (typeof count !== 'string' || !/^\d[\d,.]*[kMB]?$/.test(count)) throw new Error('Invalid Shields count');
    return { count, source: 'shields' };
  }
}
