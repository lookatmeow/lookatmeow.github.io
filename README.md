# Vision — Dedicated GitHub Pages Site

This repository is now structured to support a dedicated static GitHub site for the Vision project, inspired by the `titanioco.github.io` layout.

- Live URL target: https://lookatme.github.io
- GitHub repo target: sas-boson/lookatme

## What was migrated

- Added GitHub Pages/Jekyll-style folders:
	- `_data/`
	- `_includes/`
	- `_layouts/`
	- `_pages/`
	- `_posts/`
	- `assets/`, `images/`, `files/`
- Added site config: `_config.yml`
- Added navigation data: `_data/navigation.yml`
- Added base layout/includes for static content pages
- Added GitHub Actions deploy workflow: `.github/workflows/pages.yml`

## Current behavior

- `index.html` remains your main static homepage for the Vision project.
- TypeScript continues to build into `dist/main.js` with `npm run build`.
- Additional project pages can be added under `_pages/`.

## Local development

```bash
npm install
npm run build
npm run dev
```

## GitHub Pages deployment

1. Push to the `github-site` branch (for repo `sas-boson/lookatme`).
2. In GitHub repo settings, set **Pages** source to **GitHub Actions**.
3. Workflow `Deploy Vision site` will build and publish automatically.

## Suggested next content updates

- Update `_config.yml` with your real `url` and `repository`.
- Expand `_pages/about.md` and `_pages/vision-notes.md` with project-specific content.