# Troubleshooting


Work from the symptom below. Commands are suggested local checks, not outputs observed during this documentation review. Use your configured ports/origins; never include credentials in shared logs.

## Blog returns 503

**Check:** With the backend from the local setup running on port 3001, check both endpoints (substitute your actual base URL):

```bash
curl -i --max-time 15 http://localhost:3001/v2/blog/posts
curl -i --max-time 15 http://localhost:3001/v2/blog/categories
```

Inspect the MD-Blog server log as well.

**Expected:** Both endpoints return successful JSON responses. A health response alone does not test either dependency.

**Fix:** Check `ALL_API_URL` and connectivity to both `/blog/posts` and `/blog/categories`. The listing requires successful responses from both endpoints. Consult server logs for `[blog] API error`. Local `public/blogs` files are not a fallback.

## Post returns 404 or is not listed

**Check:** Open `/blog` without a category query and compare its returned slugs with the requested slug. Inspect `/blog/posts/<slug>` on the configured backend, replacing `<slug>` with the real value.

**Expected:** The backend exposes that slug; an unfiltered listing is not restricted by the AND-combined category filters.

**Fix:** Check that the configured backend exposes the slug and that selected category filters match. Multiple filters use AND semantics; clear filters to inspect the complete listing.

## Homepage works but posts do not

**Check:** Compare `http://localhost:3000/` with `http://localhost:3000/blog` and inspect the two backend endpoints in the 503 check above.

**Expected:** The homepage can render independently; the listing needs the backend. Homepage success is not an API test.

**Fix:** The homepage reads a local file, while posts require All API. Successful homepage rendering does not verify backend connectivity.

## Post links differ between environments

**Check:** Inspect the actual link target in the listing and compare `/api/blog/<slug>` with `/blog/<slug>` in your deployment, using a real slug.

**Expected:** The local server accepts both forms. Deployed routing must also handle the form emitted by the listing.

**Fix:** The listing currently emits `/api/blog/<slug>` links; `vercel.json` explicitly maps `/blog/<slug>`. The local server accepts both forms. Check deployment routing for the API-style path as well as the public route.

## Node rejects the startup flag

**Check:** Run in the MD-Blog checkout:

```bash
node --version
node --use-system-ca -e "console.log(typeof fetch)"
```

**Expected:** The second command accepts the flag and prints `function`. This checks capabilities, not whether all dependency runtime requirements are satisfied.

**Fix:** Both npm startup scripts pass `--use-system-ca`. Upgrade to a Node.js release supporting that flag. Also ensure the runtime supports native `fetch` and installed dependency requirements.

## Missing templates or styles

**Check:** From the repository root, check the required files:

```bash
ls public/md/index.md public/views/home.html public/views/blog.html public/styles
```

**Expected:** Markdown, both templates and the styles directory exist in the working directory and deployment bundle.

**Fix:** Run from the repository with its `public` directory intact. Templates are read from disk, and CSS is served under `/styles/`.
