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
- `src/app/globals.css`: layout and light/dark theme.
- `public/assets/`: user-provided avatar, paper image, self-hosted font.
- `content/publications.bib` and `public/publications.bib`: keep both copies in sync.
- `PROFILE-README.md`: content for the separate `sxy1499894281` GitHub profile repository.
- `SCHOLAR-SETUP.md`: account setup copy and instructions.

## Deployment

The public repository is `sxy1499894281/sxy1499894281.github.io`. Source code is stored on main. GitHub Pages publishes the compiled static site from the gh-pages branch. Run npm run build after edits, then publish the contents of out/ to gh-pages. The local Actions workflow is optional and is not enabled on GitHub.

Do not upload this entire repository into the profile README repository; it is a separate project.

## Content provenance

School, email, and avatar: supplied by user on 2026-09-26. User confirmed admission as an incoming PhD student starting Fall 2027. Research experience and advisor not supplied. Google Scholar URL supplied by user. CV link omitted until supplied. Conference year corrected to ICML 2026 per user; arXiv BibTeX remains 2026, the preprint year.

Paper metadata: https://arxiv.org/abs/2605.15677
Paper illustration: https://sxy1499894281.github.io/VCG-Bench/assets/paper/fig01-comparison.webp
Font: Droid Serif, Apache License 2.0; see public/assets/DroidSerif-LICENSE.txt.

Design: research portfolio; reference-inspired two-column academic composition. DESIGN_VARIANCE=4, MOTION_INTENSITY=1, VISUAL_DENSITY=4. Real supplied avatar and research figure, subdued blue accent, system dark mode, responsive single-column mobile layout. No analytics, tracking, or fabricated metrics.
