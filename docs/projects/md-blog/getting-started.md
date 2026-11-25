# Getting Started

## Prerequisites

Use Git, npm and a Node runtime compatible with the dependency lockfile. The Pages workflow selects **Node 26**; the README's Node 24 guidance differs. Installation needs npm registry access. Builds attempt API discovery and can continue with local posts if it fails. A browser needs JavaScript; live content also needs API CORS access.

## Build and preview

```bash
git clone https://github.com/FreetimeMaker/MD-Blog.git
cd MD-Blog
npm ci
npm run dev
```

Open `http://localhost:3000`. Expected: `/` displays the homepage from `public/md/index.md`; `/blog/` tries the live list and categories first, falling back per request. `npm start` runs the same build-and-preview sequence. `PORT` changes the preview port.

There is no watcher. Edit the homepage, stop the process, rerun `npm run dev` and reload to see the change. A failed API discovery logs a warning and falls back to local routes; invalid local content can still stop the build. Follow [build failure checks](./troubleshooting.md#troubleshooting-build-cannot-discover-posts).

## Publish content or change the backend

Publish posts through the external API's content process. For bundled fallback content, add or edit Markdown under `public/blogs/` (nested directories are supported), then rebuild and deploy. The filename stem supplies the legacy slug, the first H1 supplies the title (otherwise the filename stem with hyphens and underscores replaced by spaces), and a `Categories:` line supplies comma-separated categories. Keep filename slugs unique across directories. Bundled posts are not published to the API or appended to a successful API listing. New title paths need a deployment to receive HTTP 200.

To change the backend, edit `API` in both `scripts/post-pages.js` and `public/scripts/blog.js`, then rebuild. `ALL_API_URL` is unused. The preview serves static files only and cannot proxy requests or repair API CORS headers. Never put a secret in frontend constants.

## Test changes

```bash
npm run build
npm test
```

Expected: a completed build supplies `dist` for Node tests covering mocked browser requests, route validation, security and preview behavior. Tests cover mocked API responses and local fallback; the preceding build attempts live discovery but can use local posts instead. These are suggested commands, not executed review results.

## Deploy with Pages

1. Select **GitHub Actions** in repository Pages settings.
2. Configure `blog.free-time.me`, its DNS and HTTPS separately.
3. Push to `main` or dispatch `.github/workflows/pages.yml` manually.
4. Check the job results and deployed paths: `/`, `/blog/` and a generated post path.

The workflow installs, builds, tests and uploads only `dist`. Root-relative assets require the custom-domain root; a repository subpath is not supported without changes. There is no scheduled rebuild or API publish hook. A configured workflow is not evidence of successful deployment. See [HTTP 404 behavior](./troubleshooting.md#troubleshooting-post-renders-with-http-404).
