# Getting Started

## Prerequisites

| Scope | Prerequisite |
| --- | --- |
| Required | Git, Node.js with native `fetch` and `--use-system-ca` support, npm, a browser and a free local port. |
| Optional | curl for HTTP checks; a reachable All API backend for blog listing and post details. The homepage needs neither a backend nor an account. |
| Publishing only | Access to the backend content workflow for posts; deployment access (for example Vercel) for hosting. Homepage content is edited locally. |

## First success in five minutes

**Goal: render the local Markdown homepage.** Allow five minutes only with the runtime already installed and repository/dependency downloads completed or fast. Account creation, deployment and backend provisioning are outside this estimate.

1. Run the setup commands below from your terminal and leave the server running.
2. Open `http://localhost:3000/` in a browser. Expect the homepage rendered from `public/md/index.md`, not a backend-powered post listing.
3. Edit a line of prose in `public/md/index.md`, save it and reload the page. Expect your edited text to appear. Optionally check the HTTP response in another terminal:

   ```bash
   curl -i --max-time 5 http://localhost:3000/
   ```

   Expect HTTP **200** and HTML. No backend call is required by this homepage handler. Use your chosen `PORT` if different.

Need help? See [Troubleshooting](/projects/md-blog/troubleshooting).

## Local setup

Use a recent Node.js runtime supporting native `fetch` and the `--use-system-ca` flag used by the npm scripts.

```bash
git clone https://github.com/FreetimeMaker/MD-Blog.git
cd MD-Blog
npm ci
npm run dev
```

The local HTTP server listens on `http://localhost:3000`. Set `PORT` to choose another port. `npm start` launches the same server; there is no separate build script.

## Connect a backend

By default, blog requests use `https://api.free-time.me/v2`. To use a local All API instance:

```bash
ALL_API_URL=http://localhost:3001/v2 npm run dev
```

Use the actual port of your backend and do not append `/blog` to the base URL. Homepage rendering does not require the backend, but blog listing and post detail do.

## Publish content

Edit `public/md/index.md` for the homepage. Publish blog posts through the backend's content workflow, not by adding local files to `public/blogs`. Verify that the post appears in `/blog/posts` and resolves through `/blog/posts/<slug>` on the configured API.

## Deploy

Deploy the repository to Vercel using its existing `vercel.json`. Set `ALL_API_URL` in the deployment environment if you use a different backend. Keep templates and public assets in the deployment.
