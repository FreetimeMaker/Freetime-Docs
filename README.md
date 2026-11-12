# Freetime Docs

Freetime Docs is a VitePress-based documentation site with documentation-specific versioning.

## Development

Use Node.js 24 (the CI runtime) and install the locked dependencies:

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

VitePress writes the static build to:

```text
docs/.vitepress/dist
```

## Visual components

The VitePress theme lives in `docs/.vitepress/theme/`:

- `projects.ts` is the shared catalog for project names, repository links, tags and task-oriented entry points.
- `ProjectCards` renders the catalog on the homepage and project directory.
- `ProjectHeader` and `ProjectPaths` provide consistent project introductions and task links.
- `ProjectBackLink` supplies breadcrumbs and contextual next steps on current project pages.
- `ProjectDiagram` renders accessible HTML architecture flows without an extra diagram dependency.
- `ProjectScreenshot` displays local screenshots with alt text, captions and full-size links.
- `style.css` defines light/dark tokens, responsive layouts, focus states and reduced-motion support. Native VitePress callouts retain their semantic colors.
- `layout.css` separates the header, section navigation, left sidebar, content and right-hand outline while preserving the existing Freetime design. The homepage uses the same documentation layout and sidebar.
- `VersionSelector` sits before every sidebar entry. It lists only the current and archived versions, preserving the page where available and falling back safely otherwise. The manifest and archive sidebars are derived at config time by `version-navigation.ts`, with no filesystem code shipped to the client.
- `DocsOptions`, `LanguageSelector` and `ThemeOptions` implement the options menu directly in Vue. Appearance follows the system by default and supports persistent Light/Dark overrides using VitePress's existing storage key. Code copying uses VitePress's built-in button; whole-page copy widgets and AI are not enabled.

The layout structure follows the public docmd Summer reference, not its CSS or plugin system. Its unrelated Rafisa client/GitLab destinations are not copied; this site links to its own documentation repository. English/German selection covers the real introductory pages under `/` and `/de/`. Technical guides remain English, explicitly noted before switching; no missing translations or external AI services are silently substituted.

Project overview pages keep a `title` in frontmatter and use `<ProjectHeader project="slug" />` for their visible heading. Keep screenshot originals under `static/img/projects/`; `sync:static` copies them into the build's public directory. Existing screenshots come from the source projects' Fastlane metadata and are explicitly labeled when they do not represent the current UI. Do not use them as proof of current behavior.

## Source reviews and connected guides

Every current project has a **Source review** panel, distinct from VitePress's Git-based last-updated timestamp. Review metadata lives in `docs/.vitepress/theme/source-reviews.json`: explicit review date, limited scope, full source commit IDs and inspected file paths. Dates are never refreshed by a build.

To record a new review:

1. Inspect the source checkout and check `git status --short`. The displayed clean-checkout statement requires reviewing a clean revision; commit or otherwise resolve source changes before recording it.
2. Verify the actual instructions against the relevant files. Record `git rev-parse HEAD`, not a version label guessed from a release page.
3. Update only the reviewed project's date, scope, revisions and file list. Do not imply that static inspection proves a successful build, live endpoint or published artifact.
4. If an edit changes an instruction beyond the recorded review scope, re-check the relevant source before representing it as reviewed. A copy edit alone is not a new technical review.

Connected guides are maintained as `related` entries in `projects.ts`. Link to the specific integration page and explain the relationship. An empty array is valid when there is no direct integration; do not invent a dependency to fill a card.

Each Getting Started page offers a five-minute first-success exercise and **Required / Optional / Publishing only** prerequisites. The estimate assumes the stated prepared environment; downloads, account provisioning and external service availability are not timing guarantees. Troubleshooting follows **Symptom → Check → Expected → Fix**.

`PageFeedback` adds edit and prefilled issue links on documentation pages and the homepage. The source repository's default branch is `main`. Feedback is submitted only after the reader chooses to do so on GitHub; page query strings and fragments are not included in the prefilled URL.

## Quality checks

```bash
npm test
npm run typecheck
npm run build
npm run check:docs
npx playwright install chromium
npm run test:browser
```

After installing Chromium, `npm run check` runs all five validation steps in order. On Linux CI, install browser system libraries with `npx playwright install --with-deps chromium`.

- **Unit tests:** isolated positive and negative fixtures for metadata, review dates/commits, clean URLs, anchors, missing images, alt attributes, external-link behavior, snapshot link rewriting, version fallback and archive sidebar discovery.
- **Typecheck:** Vue components, theme TypeScript and JSON imports. TypeScript is pinned exactly to `6.0.3`: the current Vue checker requires the `typescript/lib/tsc` entry point that TypeScript 7 no longer exports, and its Volar dependency requires TypeScript `<7`. Keep this pin when updating dependencies until the Vue checker and its dependencies support TypeScript 7; update and validate `package-lock.json` together with `package.json`.
- **Built-doc checks:** HTML parsing with `parse5`; checks local links, anchors, image references, project entry points, related guides and source-review schema. External links and live APIs are deliberately not fetched. Valid commit syntax is not proof that a remote commit or file exists; source reviews remain a manual responsibility.
- **Browser smoke tests:** the production build runs on an ephemeral local server, always shut down after the run. The matrix covers the homepage, project directory, every project overview and a setup subpage on mobile/desktop in light/dark mode. It checks local assets, overflow, theme, feedback, reviews, SPA navigation, keyboard focus and search. External requests are blocked. A second navigation suite checks sidebar order, version switching and missing-page fallback, archive-only navigation, language switching, system theme changes and persistence, clipboard copying and mobile overflow. These are smoke checks, not a complete accessibility audit or pixel-diff visual regression suite.

`.github/workflows/docs.yml` validates pull requests and pushes to `main`. Its build job has read-only repository permissions; the separate deployment job receives only the additional Pages/OIDC permissions it needs. After all checks succeed, pushes to `main` and manual runs on `main` publish to GitHub Pages. Pull requests never deploy. Browser failure artifacts are retained for seven days. Local artifacts are ignored under `artifacts/`.

## Versioning

Documentation versions are independent from Git tags and application releases.

Create a snapshot with:

```bash
npm run docs:version -- 1.0
```

Archived versions are stored under `docs/versions/<version>/` and are automatically exposed through the selector at the top of the sidebar. There is no separate “Documentation versions” sidebar group or “All versions” selector item. The archive list comes from `docs/versions.json`; `current` is the current guide label, not an application version.

Snapshots preserve relative links, qualify root-relative documentation links to copied pages, and keep images under the shared global assets. Generated `docs/public` assets are not copied into each archive. Existing archives are never overwritten. Each historical sidebar is discovered from that archive's actual Markdown files, not borrowed from today's project list.

## GitHub Pages

GitHub Actions builds, validates and deploys the static site. The expected default project URL is:

```text
https://freetimemaker.github.io/Freetime-Docs/
```

### One-time repository setup

1. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
2. Allow the `github-pages` environment to deploy from `main` if deployment branch restrictions are configured.
3. Push to `main`, or manually run **Documentation quality and GitHub Pages** on `main`.

No personal access token or `gh-pages` branch is required. The workflow uses GitHub's Pages artifact and short-lived OIDC credentials. The deployment job runs only after unit tests, typechecking, the build, static checks and both browser suites have passed. The build and deployment use Node.js from `package.json` (`24.x`). Full Git history is checked out for page last-updated timestamps.

### Base path and assets

The default VitePress base is `/Freetime-Docs/`, matching this repository's project site. The workflow derives the same base from the repository name; set the repository Actions variable **`DOCS_BASE`** to override it. A base must begin and end with `/`.

For a custom domain or an owner site hosted at the domain root, set `DOCS_BASE` to `/` and configure that domain in GitHub Pages. For local builds use the same environment variable. No custom domain is assumed or provisioned by this change.

Favicons, images, search, sidebar links, language/version switches and test servers honor this prefix. The build writes `.deployment.json` with the resolved base; static and browser checks read that artifact rather than assuming the origin root. Checks reject same-origin links that escape the deployment base. Clean URLs remain enabled because GitHub Pages supports extensionless HTML URLs; no catch-all rewrite is used.

Only `docs/.vitepress/dist` is uploaded, including the `.nojekyll` marker copied from `static/`. Source repositories and test artifacts are not deployed. No application API keys are needed.

### Local validation

```bash
npm ci
npx playwright install chromium
npm run check
```

`npm run build:pages` runs unit tests, typechecking, the static build and static checks without Chromium. The workflow additionally runs the browser suites before uploading the site.

To test a root-domain build on a POSIX shell:

```bash
DOCS_BASE=/ npm run check
```

The development server also uses the configured base; its default entry point is `http://localhost:5173/Freetime-Docs/` unless the port changes. For local root-path development use `DOCS_BASE=/ npm run dev`.

Vercel configuration and its build script have been removed. If the old Vercel Git integration is still enabled, disconnect it in Vercel to stop duplicate deployments; repository changes alone cannot disable that external integration. A successful local run does not prove that GitHub Pages has been enabled or that a live deployment has completed.
