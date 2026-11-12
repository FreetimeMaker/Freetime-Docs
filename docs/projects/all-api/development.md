# Development

## Source code and stack

- [All-API-Node](https://github.com/FreetimeMaker/All-API-Node): package **2.8.1**, CommonJS, Express 5, Supabase JavaScript, Axios, CORS, dotenv, Helmet and JSON Web Tokens; esbuild is a development dependency.
- [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd): package **2.2.0**, Next.js **16.3.3**, React **19.2.8**, TypeScript, Tailwind CSS 4 and Supabase SSR, with Solana/payment dependencies for frontend functionality.

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

The Luma router normalizes Android platform metadata, reads public aggregate download counts, and implements ratings, reviews, favorites, developer profiles and APK source resolution. Authenticated writes use the user's token with the public client. MD-Blog reads repository Markdown with caching.

## Frontend development

Copy the frontend's `.env.example` to a local environment file and configure `API_BASE` plus the public Supabase URL/key. Privileged routes additionally need the server-side service-role key. Support/developer email delivery uses `RESEND_API_KEY` and `EMAIL_FROM`; support notifications also use `EMAIL_NOTIFICATION_TO`. The status webhook checks `LUMA_STATUS_WEBHOOK_SECRET`.

```bash
npm install
npm run dev
npm run type-check
npm run lint
npm run build
```

`/api/proxy/[...path]` forwards to `API_BASE`, preserving query parameters and filtering headers. Ordinary requests have a 15-second timeout; most requests first perform a two-second upstream health check. GET login requests redirect to the backend. A proxy 503 can therefore originate from the health precheck before the target handler runs.

## Secrets

Keep service-role credentials, OAuth client secrets, email credentials and webhook secrets out of public configuration and source control. Never copy real local environment files into documentation.
