'use client';

import { useEffect, useState } from 'react';

export default function GitHubStars({ repo, initialCount }: { repo: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount.toLocaleString('en-US'));
  const [source, setSource] = useState<'snapshot' | 'github' | 'shields'>('snapshot');

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    async function refresh() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!response.ok) throw new Error('GitHub unavailable');
        const data = await response.json();
        if (!Number.isInteger(data.stargazers_count) || data.stargazers_count < 0) throw new Error('Invalid count');
        if (!controller.signal.aborted) {
          setCount(data.stargazers_count.toLocaleString('en-US'));
          setSource('github');
        }
      } catch {
        // Shields caches GitHub counts without using the visitor's GitHub quota.
        try {
          const response = await fetch(`https://img.shields.io/github/stars/${repo}.json`, { signal: controller.signal });
          if (!response.ok) return;
          const data = await response.json();
          if (!controller.signal.aborted && typeof data.value === 'string' && /^\d[\d,.]*[kMB]?$/.test(data.value)) {
            setCount(data.value);
            setSource('shields');
          }
        } catch {
          // Keep the clearly dated snapshot if both services are unavailable.
        }
      } finally {
        clearTimeout(timeout);
      }
    }
    void refresh();
    return () => { controller.abort(); clearTimeout(timeout); };
  }, [repo]);

  const status = source === 'github' ? 'Fetched from GitHub on this page load' : source === 'shields' ? 'GitHub stars via Shields.io; cached count may be delayed' : 'Snapshot from September 26, 2026; live count unavailable or loading';
  return <a className="stars" href={`https://github.com/${repo}`} aria-label={`${count} GitHub stars. ${status}`} title={status}><span aria-hidden="true">★</span> {count}</a>;
}
