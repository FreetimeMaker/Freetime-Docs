# Getting Started

MD-Blog is now a static site. Node.js is needed for builds and local preview, not for production request handling.

## Prerequisites

- Git, npm and a recent Node.js runtime compatible with the dependencies. The Pages workflow uses **Node.js 26**; the README still mentions 24. The npm scripts no longer use `--use-system-ca`.
- Network access for dependency installation. API route discovery is attempted during builds, but local Markdown is a fallback.
- A browser with JavaScript enabled for the blog listing and posts. The pre-rendered homepage does not require JavaScript.
- For deployment, repository/Pages permissions and custom-domain DNS access; no API secrets belong in the static bundle.

## First success in five minutes

The estimate assumes the runtime and checkout are ready and dependency downloads are complete or fast. API discovery can wait up to 20 seconds before falling back; build duration is not guaranteed.

```bash
git clone https://github.com/FreetimeMaker/MD-Blog.git
cd MD-Blog
npm ci
npm run dev
```

`npm run dev` builds `dist` and starts the static preview at `http://localhost:3000`. `npm start` does the same. Set `PORT` to change the preview port.

1. Open `/` and expect the homepage generated from `public/md/index.md`.
2. Edit homepage prose, stop and rerun `npm run dev`, then reload. There is no watcher; changing source alone does not change `dist`.
3. Open `/blog/`. JavaScript requests posts and categories from All API, using bundled local Markdown when a request fails.

These are expected checkpoints from source, not a preview session executed during this review.

## Content and backend configuration

Edit `public/md/index.md` for the homepage. Local fallback posts live in `public/blogs`, including subdirectories. Use a unique filename slug, an H1 title, comma-separated `Categories:` metadata and, for dated ordering, `Released on <t:UNIX_SECONDS>`. Rebuild to include changes in the local JSON and generated paths. Adding a local file does not publish it to All API or merge it into a successful API listing.

The build and browser use `https://api.free-time.me/v2`. To use another backend, change `API` in `scripts/post-pages.js` and `public/scripts/blog.js`, then rebuild. The former `ALL_API_URL` environment variable has no effect. The preview does not proxy requests; the backend must permit browser CORS access.

## Build and tests

```bash
npm run build
npm test
```

Run tests after a completed build: they use generated artifacts and mocked API responses. These commands are instructions, not a claim that this documentation review ran them.

## Deploy

Use `.github/workflows/pages.yml`: pushes to `main` and manual dispatch build, test and deploy `dist` to GitHub Pages. Select **GitHub Actions** in repository Pages settings and configure the custom domain `blog.free-time.me` and its DNS/HTTPS separately. The code assumes that domain's root, not a GitHub repository subpath.

Rebuild/deploy after adding API posts to create HTTP-200 title paths. Otherwise new paths may render through the JavaScript 404 shell while retaining HTTP 404. Local Markdown changes always require a rebuild/deployment. The old Vercel configuration and serverless handlers are no longer present.

See [Architecture](./architecture.md) and [Troubleshooting](./troubleshooting.md).
