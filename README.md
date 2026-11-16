# Freetime Docs

English-language documentation for the Freetime Maker ecosystem, built with [docmd](https://docmd.io/). The site uses the Summer template, the Sky theme and a shared Material 3 Expressive-inspired CSS layer.

**Website:** [docs.free-time.me](https://docs.free-time.me)

## Development

Use Node.js 26 to match the GitHub Actions runtime. Install the locked dependencies and start the local development server:

```bash
npm ci
npx --no-install docmd dev
```

The CLI reports the local address. To choose a port and prevent the browser from opening automatically:

```bash
npx --no-install docmd dev --port 3000 --no-open
```

The CLI is installed locally through `@docmd/core`; a global installation is not required for these commands. There are currently no `dev`, `build` or test scripts in `package.json`.

## Build and validation

```bash
npx --no-install docmd validate
npx --no-install docmd build
```

The static site is generated in `site/`. This directory is ignored by Git and should not be edited manually.

To fail a build when docmd detects missing referenced files or assets:

```bash
npx --no-install docmd build --strict
```

A successful build is not a browser test, accessibility audit or verification of the documented applications and services. This repository currently has no dedicated unit-test, typecheck or browser-test suite.

## Repository structure

- `docmd.config.json` — Site metadata, template, theme, CSS, versions and plugin configuration.
- `docs/` — Current documentation (`v2`), including the homepage, Getting Started and seven project guides.
- `docs-v1/` — Archived documentation (`v1`), including historical project guides.
- `docs/navigation.json` and `docs-v1/navigation.json` — Independent sidebar navigation for each version.
- `assets/images/` — Shared logos and favicons.
- `assets/css/material3.css` — Shared Material 3 Expressive-inspired presentation.
- `assets/css/custom.css` — Sidebar cursor and collapsible hover overrides.
- `.github/workflows/deploy.yml` — GitHub Pages build and deployment.

The current project guides cover All API, Freetime Core, GeoWeather, Luma Store, MD-Blog, Multi AI Chat and SuperSMP Companion.

## Design and interactions

The visual layer is implemented with CSS over docmd's existing Summer template, not with a separate Material component framework. It includes:

- Paired tonal colors for light and dark modes, with system appearance enabled by default.
- Expressive heading sizes, rounded and asymmetric surfaces, pill-shaped navigation and buttons.
- Shape transitions on search, buttons and previous/next page links.
- Visible keyboard-focus outlines and reduced-motion overrides.
- Consistent hover colors and hand cursors for collapsible sidebar groups and links.

`theme.customCss` loads `material3.css` first and `custom.css` second, so the interaction overrides remain in effect. Both files apply to both documentation versions. Keep ordinary document text selectable; cursor rules should target interactive navigation elements only.

Material color roles are declared as `--md-*` variables and mapped to Summer's `--summer-*` tokens. When changing a background, update and check its paired foreground in both themes. Semantic callout colors remain separate from the primary and tertiary accents.

## Navigation and Iconify

Navigation is maintained explicitly in each version's `navigation.json`:

- Keep the **Projects** overview link first inside the **Projects** group.
- Sort the remaining project groups and their subpages alphabetically by title.
- Preserve version-specific pages rather than copying the current navigation into the archive.
- Give every navigation entry an appropriate icon.

`@docmd/plugin-iconify` is installed as a dependency and enabled in `docmd.config.json`. Navigation entries use Iconify names such as:

```json
{
  "title": "Getting Started",
  "path": "/getting-started/",
  "icon": "iconify:lucide:rocket"
}
```

The plugin resolves icons during the build and embeds SVGs in the generated HTML. Uncached icons require access to `api.iconify.design`; downloaded SVGs are cached under `.docmd/cache/icons/`, which is ignored by Git. The plugin may substitute a fallback icon when an icon cannot be fetched, so a green build alone does not prove that every intended icon was resolved.

## Documentation versions

Documentation versions are independent from application releases and the package version. The version selector is configured at the top of the sidebar:

- **v2.x (Latest):** `docs/`, published at the site root.
- **v1.x:** `docs-v1/`, published under `/v1/`.

To add a version, prepare a separate source directory with its own navigation and register it in `versions.all` in `docmd.config.json`. Set `versions.current` to the intended current version. Shared assets and CSS affect archived pages too; they are not frozen visual snapshots.

## Maintaining project guides

Update the relevant Markdown files under `docs/projects/<project>/` when the source project changes. Avoid rewriting archived technical instructions unless correcting a historical documentation error.

Project overview pages include manually maintained **Source review** sections with inspected revisions, file links, scope and limitations. A documentation build does not refresh these reviews.

When recording a review:

1. Inspect the source repository and check its working-tree status.
2. Verify the relevant instructions against actual source files and record the full commit ID.
3. State the review date, scope and any unavailable or unverified components. Claim a clean checkout only if it was clean when inspected.
4. Distinguish source declarations from published versions, available artifacts, successful builds and live-service behavior.
5. Update related setup, configuration and troubleshooting pages when the reviewed changes affect them.

Keep internal links and assets valid, and do not use historical screenshots as evidence of the current UI.

## GitHub Pages deployment

`.github/workflows/deploy.yml` runs on pushes to `main`. It:

1. Checks out the repository and sets up Node.js 26.
2. Installs project dependencies with `npm install` and installs `@docmd/core@0.10.0` globally.
3. Runs `docmd build` and uploads `site/` as a Pages artifact.
4. Deploys the artifact in a separate job using the `github-pages` environment.

The current workflow does not run a separate validation or browser-test step. A successful local build does not prove that a deployment has completed.

In repository **Settings → Pages**, select **GitHub Actions** as the deployment source and configure the custom domain as needed. Both `CNAME` and the site URL configuration specify `docs.free-time.me`; `base` is `/`. For deployment under a repository subpath instead, adjust the URL and base configuration rather than assuming root-relative assets will work unchanged.

Network access is needed to install packages, resolve any missing docmd runtime dependencies and download uncached Iconify SVGs. No application API keys are required to build the documentation.
