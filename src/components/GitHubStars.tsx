'use client';

import { useEffect, useState } from 'react';
import { fetchStarCount, type StarCount } from '@/lib/github-stars';

const REFRESH_INTERVAL = 5 * 60 * 1000;

export default function GitHubStars({ repo, initialCount, updatedAt }: { repo: string; initialCount: number; updatedAt: string }) {
  const [stars, setStars] = useState<{ count: string; source: StarCount['source'] | 'snapshot'; checkedAt: string }>({
    count: initialCount.toLocaleString('en-US'), source: 'snapshot', checkedAt: updatedAt,
  });

  useEffect(() => {
    const controller = new AbortController();
    let refreshing = false;
    let lastAttempt = 0;

    async function refresh() {
      if (document.hidden || refreshing || Date.now() - lastAttempt < REFRESH_INTERVAL) return;
      refreshing = true;
      lastAttempt = Date.now();
      try {
        const result = await fetchStarCount(repo, controller.signal);
        if (!controller.signal.aborted) setStars({ ...result, checkedAt: new Date().toISOString() });
      } catch {
        // Keep the last successful count, including the automatically built snapshot.
      } finally {
        refreshing = false;
      }
    }

    void refresh();
    const interval = setInterval(() => void refresh(), REFRESH_INTERVAL);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      controller.abort();
      clearInterval(interval);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [repo]);

  const checkedAt = stars.checkedAt.replace('T', ' ').replace(/\.\d{3}Z$/, ' UTC');
  const status = stars.source === 'github'
    ? `Fetched from GitHub at ${checkedAt}`
    : stars.source === 'shields'
      ? `GitHub stars via Shields.io; fetched at ${checkedAt}; cached count may be delayed`
      : `GitHub snapshot from ${checkedAt}; live count unavailable or loading`;
  return <a className="stars" href={`https://github.com/${repo}`} aria-label={`${stars.count} GitHub stars. ${status}`} title={status}><span aria-hidden="true">★</span> {stars.count}</a>;
}
