# Development

## Source code and stack

- [All-API-Node](https://github.com/FreetimeMaker/All-API-Node): package **2.8.1**, CommonJS, Express ^5.3.0, Supabase JavaScript, Axios ^1.21.1, CORS, dotenv ^18.0.10, Helmet and JSON Web Tokens; esbuild is a development dependency.
- [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd): package **2.2.0**, Next.js **16.3.3** App Router, React **19.2.8**, TypeScript, Tailwind CSS 4 and Supabase.

The backend package no longer declares Appwrite, TweetNaCl, Umi or Metaplex Bubblegum dependencies. The current routers do not mount GeoWeather, F-Port or Arcade.

## Backend runtime

```bash
npm install
npm start
```

`src/index.js` loads dotenv, configures Helmet/CORS/JSON parsing, serves `/assets`, mounts `/v1` and `/v2`, and exports the app. It listens on `PORT` (default 3000) only when started directly. The package declares a start script but no test or lint script.

### Router bundling

The entry point uses `asRouter()` to normalize wrapped CommonJS routers and a runtime `.cjs` chunk fallback for Vercel/Rolldown interop. Keep changes to this layer compatible with both direct Node execution and bundled hosting.

### Data and services

`src/lib/supabase.js` separates generic Supabase access from Luma Store access. Generic clients use `SUPABASE_URL` / `SUPABASE_ANON_KEY` (with public-name fallbacks) and optionally `SUPABASE_SERVICE_ROLE_KEY`. Luma clients use `LUMASTORE_SUPABASE_URL` / `LUMASTORE_SUPABASE_PUBLISHABLE_KEY`, with project-specific public defaults in the implementation.

The Luma router normalizes Android platform metadata, reads public aggregate download counts, and implements ratings, reviews, favorites, developer profiles and APK source resolution. Authenticated writes use the user's token with the public client. MD-Blog reads repository Markdown and sets HTTP cache headers on successful responses.

### Luma Fastlane metadata

Catalog list/detail GETs now enrich Android listings with developer display names and GitHub Fastlane metadata from `fastlane/metadata/android` on a pinned default-branch commit. Metadata includes title, descriptions, changelog, phone screenshots and localized entries, with an optional icon. Changelogs prefer `<versionCode>.txt`, then `default.txt`. The loader needs at least one complete locale and fills missing translations from that primary locale. Unsupported repositories or unavailable metadata leave stored listing content in place. GET enrichment does not write to the database.

The loader supports HTTPS `github.com/owner/repository` sources only, unlike the broader release resolver. `GITHUB_TOKEN` is optional for GitHub API requests. Successful metadata is cached for five minutes, failures for one minute, with bounded in-memory entries.

For explicit synchronization:

```bash
node src/lib/sync-luma-metadata.js
node src/lib/sync-luma-metadata.js --apply
```

These commands run from the backend repository root and require configuration in the process environment; this CLI does not itself load dotenv. Even the default dry run reads the database and fetches GitHub metadata—it is not an offline preview. The default is a dry run over non-archived `store_apps`. `--apply` requires the dedicated `LUMASTORE_SUPABASE_SERVICE_ROLE_KEY`, not the generic project key. Synchronization validates complete metadata and checks snapshots/scalar guards before writes. App and platform writes are not a transaction: a partial failure must be retried. Do not infer atomicity from a successful first write.

`POST /v2/lumastore/metadata/webhook` provides event-driven synchronization. Configure `LUMASTORE_METADATA_WEBHOOK_SECRET` and the dedicated service-role key on the server; see [API Reference](./api-reference.md). It awaits synchronization before replying rather than scheduling work after the response.

Focused Node tests exist in `src/lib/luma-metadata.test.js`, `src/lib/sync-luma-metadata.test.js` and `src/lib/luma-metadata-webhook.test.js`, despite the absence of an npm test script. This documentation review did not run them or execute synchronization against a database.

## Separate frontend

Run `npm run lint` for ESLint and `npm run type-check` for `tsc --noEmit`. `npm run build` builds the Next.js app; `npm start` serves the production build. The package declares no test script. See [Getting Started](./getting-started.md#getting-started-optional-accountdashboard-frontend) for local configuration and [API Reference](./api-reference.md#api-reference-separate-frontend-routes) for the route inventory.

Use the checked-in `.env.example`, `package.json` and route tree as the source of truth at the reviewed revision. The frontend README references `supabase/migrations/20260910_luma_submission_updates.sql` and `/dashboard/developer/status`, but neither is present at that revision. The [Luma website setup](../luma-store/getting-started.md#getting-started-website-and-developer-dashboard) is for a separate project.

## Secrets

Keep service-role credentials, OAuth client secrets, email credentials and webhook secrets out of public configuration and source control. Never copy real local environment files into documentation.
