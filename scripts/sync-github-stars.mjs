import { readFile, writeFile } from 'node:fs/promises';

const path = new URL('../content/github-stars.json', import.meta.url);
const snapshots = JSON.parse(await readFile(path, 'utf8'));
const token = process.env.GITHUB_TOKEN;
let failures = 0;

await Promise.all(Object.keys(snapshots).map(async (repo) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) throw new Error('Invalid star count');
    snapshots[repo] = { count: data.stargazers_count, updatedAt: new Date().toISOString() };
    console.log(`${repo}: ${data.stargazers_count}`);
  } catch (error) {
    failures++;
    console.error(`Could not refresh ${repo}: ${error.message}. Keeping its previous snapshot.`);
  }
}));

// A failed scheduled refresh must not replace the last successfully deployed site.
if (failures && process.argv.includes('--strict')) process.exitCode = 1;
else await writeFile(path, `${JSON.stringify(snapshots, null, 2)}\n`);
