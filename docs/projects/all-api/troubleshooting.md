# Troubleshooting


Work from the symptom below. Commands are suggested local checks, not outputs observed during this documentation review. Use your configured ports/origins; never include credentials in shared logs.

## 404 or outdated endpoint examples

**Check:** Compare the failing URL with the versioned API route. For a local backend:

```bash
curl -i --max-time 5 http://localhost:3000/v2/health
```

**Expected:** The directly mounted health route returns HTTP 200 and `{"status":"ok"}`; frontend-only routes must be requested from Next.js, not Express.

**Fix:** The current Express backend mounts `/v1` and `/v2`, not `/api/v1` or `/api/v2`. GeoWeather, F-Port, Arcade and Luma `/package-formats` are not mounted in backend 2.8.1. Consult the [API Reference](./api-reference.md) before debugging deployment routing.

Next.js `/api/luma/apps` is a separate manually reviewed submission feed, not an alias for `/v2/lumastore/apps`.

## API returns 401

**Check:** Inspect the failed request in browser developer tools or your client: confirm a `Bearer` user access token is sent, without copying it into an issue. Check the response message and backend logs.

**Expected:** A protected request uses an unexpired user token from the correct Supabase project. Forge authorization does not authenticate a Supabase user.

**Fix:** Send a current Supabase user access token for protected operations. For Luma ratings/favorites it must belong to the dedicated Luma Store project. A forge OAuth token used for source resolution is not a substitute. Some handlers also map database errors to 401; inspect the response message and server logs.

## App details fail but ratings work

**Check:** Compare the identifier in the failed details URL with the `id` returned by the catalog.

**Expected:** Details use a store app ID; success on a package-name rating lookup does not prove the detail URL is valid.

**Fix:** App details query by store app ID. Ratings, reviews and per-app favorites additionally accept a package name. Read the catalog ID rather than applying package-name lookup to every handler.

## Empty catalog or source results

**Check:** Inspect the requested platform and the latest release asset names. On a configured local backend:

```bash
curl -i --max-time 20 "http://localhost:3000/v2/lumastore/apps?platform=Android"
```

**Expected:** A successful catalog request returns JSON containing the available Android entries; no particular entry count is guaranteed. A source needs an APK asset to survive filtering.

**Fix:** The current Luma catalog and tracked-source resolver expose Android entries/APK assets only. Linux/Windows filters and non-APK direct URLs can legitimately return empty results. For forge sources, also check the latest release and provider rate limits/token permissions.

## Frontend proxy returns 503

**Check:** From the frontend host, request the backend health URL (use the actual origin from `API_BASE`):

```bash
curl -i --max-time 2 http://localhost:3000/v2/health
```

**Expected:** HTTP 200 within the proxy’s two-second health window. `API_BASE` is an origin, without an appended `/v2`.

**Fix:** The proxy checks upstream `/v2/health` with a two-second timeout before most requests. Confirm `API_BASE` and backend reachability. Successful health does not test database access. Ordinary forwarded requests have a 15-second timeout.

## Supabase operations fail

**Check:** Compare server environment variable names with [Getting Started](./getting-started.md), then inspect the failing database/RPC error and policies in the intended project. Do not print secrets.

**Expected:** The selected project contains the schema/RPCs used by that handler and permits the operation for the requesting user.

**Fix:** Verify project-specific server configuration, schema, RPCs and Row Level Security policies. Never resolve permission errors by exposing a service-role key to a client.

## Documentation and deployment differ

**Check:** Record the source revision and local changes in each relevant checkout:

```bash
git rev-parse HEAD
git status --short
```

Compare them with the revision recorded by your deployment.

**Expected:** A full commit SHA and either an empty status (clean) or a list of local changes. Matching docs does not establish matching deployment routing.

**Fix:** These pages describe the inspected local sources. Docs versions, local revisions and deployed services may differ. Compare the [backend](https://github.com/FreetimeMaker/All-API-Node) and [frontend](https://github.com/FreetimeMaker/All-API-FrontEnd) revisions with the deployed artifacts; aliases and production availability were not tested.
