# Freetime Docs

English-language documentation for the Freetime Maker ecosystem, built with [docmd](https://docmd.io/). The site uses the Summer template and Sky theme, with integrated Material You colors and Material 3 Expressive styling.

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

The CLI is installed locally through `@docmd/core`; a global installation is not required for these commands. There are no `dev` or site `build` scripts in `package.json`; design asset generation and palette tests have their own npm scripts.

## Build and validation

```bash
npm run test:design
npm run build:design
npx --no-install docmd validate
npx --no-install docmd build
```

The static site is generated in `site/`. This directory is ignored by Git and should not be edited manually.

To fail a build when docmd detects missing referenced files or assets:

```bash
npx --no-install docmd build --strict
```

A successful build is not a browser test, accessibility audit or verification of the documented applications and services. `npm run test:design` checks settings validation, deterministic palettes and text contrast for light/dark schemes across ten seed colors. Tests use the same bundler as the browser asset. There is no general documentation unit-test, typecheck or committed browser-test suite.

## Repository structure

- `docmd.config.json` — Site metadata, template, theme, CSS, versions and plugin configuration.
- `docs/` — Current documentation (`v2`), including the homepage, Getting Started and seven project guides.
- `docs-v1/` — Archived documentation (`v1`), including historical project guides.
- `docs/navigation.json` and `docs-v1/navigation.json` — Independent sidebar navigation for each version.
- `assets/images/` — Shared logos and favicons.
- `assets/css/material3.css` — Shared Material 3 Expressive-inspired presentation.
- `assets/css/material-you.css` — Integrated accent-color controls; expressive shapes remain shared.
- `assets/css/custom.css` — Sidebar cursor and collapsible hover overrides.
- `scripts/design-picker.js` and `scripts/design-palette.js` — Accent-color selection, browser persistence and Material tonal palette generation.
- `assets/js/material-you.js` — Committed browser bundle; regenerate with `npm run build:design`, do not edit directly.
- `tests/design-palette.test.js` — Palette and settings tests.
- `.github/workflows/deploy.yml` — GitHub Pages build and deployment.

The current project guides cover All API, Freetime Core, GeoWeather, Luma Store, MD-Blog, Multi AI Chat and SuperSMP Companion.

## Design and interactions

The visual layer is implemented with CSS over docmd's existing Summer template, not with a separate Material component framework. It includes:

- Paired tonal colors for light and dark modes, with system appearance enabled by default.
- Expressive heading sizes, rounded and asymmetric surfaces, pill-shaped navigation and buttons.
- Shape transitions on search, buttons and previous/next page links.
- Visible keyboard-focus outlines and reduced-motion overrides.
- Consistent hover colors and hand cursors for collapsible sidebar groups and links.

`theme.customCss` loads `material3.css`, `material-you.css` and then `custom.css`, so the interaction overrides remain in effect. All styles apply to both documentation versions. Keep ordinary document text selectable; cursor rules should target interactive navigation elements only.

Material color roles are declared as `--md-*` variables and mapped to Summer's `--summer-*` tokens. When changing a background, update and check its paired foreground in both themes. Semantic callout colors remain separate from the primary and tertiary accents.

### Integrated Material You colors

Material You is the site's color system, not a separate design mode. It is always combined with the expressive typography, shapes and motion. Google's `@material/material-color-utilities` derives light and dark tonal palettes from the accent seed; no remote color API or external font is loaded.

Open **Accent color** in the sidebar to personalize the palette. The default seed is blue (`#00639b`). The existing light/dark theme setting remains independent. Only the seed is stored under `freetime-docs-design` in browser local storage and shared across documentation versions and tabs on the same origin. Legacy design selections are ignored while their valid seed colors are retained. **Reset color** restores the default seed without disabling Material You. The picker can still change the in-memory selection when storage is unavailable; unrelated docmd features may have their own storage requirements. Without JavaScript, the static light/dark palettes match the default seed.

The browser cannot read the operating system's wallpaper palette; users choose their own accent. Rebuild the committed JS bundle after changing either design script or the Material color dependency, and commit the generated asset with its sources. The deployment workflow serves that bundle without a separate design compilation step.

## Navigation and Iconify

Navigation is maintained explicitly in each version's `navigation.json`:

- Keep the **Projects** overview link first inside the **Projects** group.
- Sort the remaining project groups alphabetically by title.
- Inside each project group, keep its project overview first and sort the remaining subpages alphabetically by title.
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
2. Installs project dependencies with `npm install` and installs `@docmd/core@0.10.1` globally.
3. Runs `docmd build` and uploads `site/` as a Pages artifact.
4. Deploys the artifact in a separate job using the `github-pages` environment.

The current workflow does not run a separate validation or browser-test step. A successful local build does not prove that a deployment has completed.

In repository **Settings → Pages**, select **GitHub Actions** as the deployment source and configure the custom domain as needed. Both `CNAME` and the site URL configuration specify `docs.free-time.me`; `base` is `/`. For deployment under a repository subpath instead, adjust the URL and base configuration rather than assuming root-relative assets will work unchanged.

Network access is needed to install packages, resolve any missing docmd runtime dependencies and download uncached Iconify SVGs. No application API keys are required to build the documentation.
