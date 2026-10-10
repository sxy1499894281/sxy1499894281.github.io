# Xiaoyan Su's academic homepage

Personal website at https://sxy1499894281.github.io/, based on [PRISM](https://github.com/xyjoey/PRISM). Original MIT license is preserved in LICENSE.

## Preview and build

Requires Node.js 22 or later.

```sh
npm ci
npm run dev
# Or generate the static site:
npm run build
```

The build produces `out/`. To preview the production export: `python3 -m http.server 4173 --directory out`.

## Edit

- `content/config.toml`: identity, institution, email, GitHub, optional Google Scholar URL.
- `content/bio.md`: research biography.
- `src/app/page.tsx`: publication, resource links, and open-source project.
- `content/github-stars.json`: repository list and dated fallback star counts; refreshed by `npm run sync:stars`.
- `src/app/globals.css`: layout and light/dark theme.
- `public/assets/`: user-provided avatar, paper image, self-hosted font.
- `content/publications.bib` and `public/publications.bib`: keep both copies in sync.
- `PROFILE-README.md`: content for the separate `sxy1499894281` GitHub profile repository.
- `SCHOLAR-SETUP.md`: account setup copy and instructions.

## Deployment

The public repository is `sxy1499894281/sxy1499894281.github.io`. Source code is stored on `main`. Set GitHub Pages' source to **GitHub Actions**. `.github/workflows/deploy.yml` fetches current star counts, runs tests and lint, builds the static site, and deploys it on every push to `main`, on manual dispatch, and weekly on Monday at 08:17 Asia/Shanghai (00:17 UTC). Scheduled runs may be delayed by GitHub. Public-repository schedules can be disabled after 60 days without repository activity; re-enable the workflow in Actions if this happens.

The workflow uses GitHub's built-in `GITHUB_TOKEN` for authenticated requests; no personal token is published or required as a repository secret. A failed refresh stops deployment and preserves the last successful site. The fetched snapshot is included in the deployment without creating weekly source commits. To refresh a local preview, run `npm run sync:stars` before `npm run build` (optionally provide `GITHUB_TOKEN` through the environment to avoid anonymous API limits).

In the browser, star counts refresh on page load, every five minutes while the page is visible, and when returning to a stale tab. GitHub requests and the Shields.io fallback each have an independent five-second timeout. If both fail, the last successful count remains visible, with its source and timestamp in the tooltip. Shields.io counts can be delayed by that service's cache. The site still displays the latest deployed snapshot with JavaScript disabled.

Do not upload this entire repository into the profile README repository; it is a separate project.

## Content provenance

School, email, and avatar: supplied by user on 2026-09-26. User confirmed admission as an incoming PhD student starting Fall 2027. Research experience and advisor not supplied. Google Scholar URL supplied by user. CV link omitted until supplied. Conference year corrected to ICML 2026 per user; arXiv BibTeX remains 2026, the preprint year.

Paper metadata: https://arxiv.org/abs/2605.15677
Paper illustration: https://sxy1499894281.github.io/VCG-Bench/assets/paper/fig01-comparison.webp
Font: Droid Serif, Apache License 2.0; see public/assets/DroidSerif-LICENSE.txt.

Design: research portfolio; reference-inspired two-column academic composition. DESIGN_VARIANCE=4, MOTION_INTENSITY=1, VISUAL_DENSITY=4. Real supplied avatar and research figure, subdued blue accent, system dark mode, responsive single-column mobile layout. No analytics, tracking, or fabricated metrics.
