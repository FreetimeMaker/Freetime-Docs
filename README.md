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

- **Unit tests:** isolated positive and negative fixtures for metadata, review dates/commits, clean URLs, anchors, missing images and alt attributes.
- **Typecheck:** Vue components, theme TypeScript and JSON imports. TypeScript is pinned exactly to `6.0.3`: the current Vue checker requires the `typescript/lib/tsc` entry point that TypeScript 7 no longer exports, and its Volar dependency requires TypeScript `<7`. Keep this pin when updating dependencies until the Vue checker and its dependencies support TypeScript 7; update and validate `package-lock.json` together with `package.json`.
- **Built-doc checks:** HTML parsing with `parse5`; checks local links, anchors, image references, project entry points, related guides and source-review schema. External links and live APIs are deliberately not fetched. Valid commit syntax is not proof that a remote commit or file exists; source reviews remain a manual responsibility.
- **Browser smoke tests:** the production build runs on an ephemeral local server, always shut down after the run. The matrix covers the homepage, project directory, every project overview and a setup subpage on mobile/desktop in light/dark mode. It checks local assets, overflow, theme, feedback, reviews, SPA navigation, keyboard focus and search. External requests are blocked. These are smoke checks, not a complete accessibility audit or pixel-diff visual regression suite.

`.github/workflows/docs.yml` runs these checks on pushes and pull requests with read-only repository permissions and no deployment secrets. It does not deploy the site; deployment is handled by Vercel. Browser failures upload screenshots and diagnostics for seven days. Local artifacts are ignored under `artifacts/browser-smoke/`.

## Versioning

Documentation versions are independent from Git tags and application releases.

Create a snapshot with:

```bash
npm run docs:version -- 1.0
```

Archived versions are stored under `docs/versions/<version>/` and are automatically exposed through the VitePress version selector.

## Vercel

Vercel deploys the static VitePress output through its Git integration. The tracked `vercel.json` configures:

- Framework Preset: **Other** (`framework: null`)
- Install Command: `npm ci --include=dev` (the build tools are dev dependencies)
- Build Command: `npm run build:vercel`
- Output Directory: `docs/.vitepress/dist`
- Clean URLs: enabled, matching VitePress
- Node.js: **24.x**, pinned in `package.json` and matching CI

Use the repository root as the Vercel project's Root Directory. Remove conflicting build/install/output overrides in the Vercel dashboard. No Vercel token is needed in GitHub Actions for a Git-integrated deployment.

`build:vercel` runs unit tests, Vue typechecking, the static build (including asset synchronization), then built-link/image/metadata checks. A failed check fails the Vercel build. It deliberately does not run Playwright or install Chromium; browser smoke tests remain in GitHub Actions and can also be run locally.

GitHub checks and Vercel builds run independently. A failing browser check does not by itself block Vercel's automatic deployment; enforce a required check before merging to your production branch if that gate is needed. Configure the production branch and preview deployments in Vercel.

The deployed site needs neither a Node server nor a catch-all SPA rewrite: VitePress generates individual HTML pages and assets. Only `docs/.vitepress/dist` is published, not source repositories or test artifacts. No application API keys are needed to build these docs. Feedback links use the page's deployed origin, so they also work on Vercel preview URLs.

To validate the same build locally:

```bash
npm ci --include=dev
npm run build:vercel
```

A local success verifies the build command and generated files, not the live Vercel project settings or deployment.
