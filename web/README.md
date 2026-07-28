# GitHub Pages

On every push to `main`, `.github/workflows/build-site.yml`:

1. Builds the Astro site from `web/`
2. Deploys to GitHub Pages

## One-time setup in the repo

1. **Settings → Pages**
2. **Build and deployment → Source**: GitHub Actions
3. Push to `main` (or run the workflow manually)

The public URL will appear in the workflow summary / Pages settings (for a project site usually `https://<user>.github.io/<repo>/`).

`SITE_URL` and `BASE_PATH` are injected by `actions/configure-pages` so asset and wikilink paths work under a subpath.
