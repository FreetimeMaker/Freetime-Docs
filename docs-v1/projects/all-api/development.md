# Development

All API **2.7.0** is an Express 5 backend designed for local Node execution and Vercel serverless deployment.

## Runtime

```bash
npm install
npm start
```

The entry point is `src/index.js`. It mounts `/v1` and `/v2`, serves static assets and starts a local listener only when the file is executed directly.

## Main dependencies

- Express 5
- Supabase JavaScript client
- Appwrite Node SDK
- Axios
- Helmet and CORS
- JSON Web Tokens / TweetNaCl
- Solana Web3, Umi and Metaplex Bubblegum
- esbuild for the Arcade glue bundle

## Router bundling

Vercel/Rolldown can expose CommonJS router modules in several wrapped shapes. The entry point uses an `asRouter()` normalization layer and a runtime chunk fallback so bundled v1/v2 routers still resolve as Express routers.

## Data services

Supabase remains the main database/auth integration for several services. Luma Store supports dedicated Supabase environment variables.

GeoWeather code models now use Appwrite TablesDB. Configure the Appwrite endpoint, GeoWeather project/database/table IDs and server API key through environment variables.

## MD-Blog

The v2 blog router reads Markdown from the MD-Blog repository, parses title/release/category metadata and exposes normalized post/category responses with caching.

## Luma Store

The v2 Luma Store router reads `store_apps`, category and platform rows, normalizes platform metadata, validates Linux package formats and implements public/authenticated ratings.

## Secrets

Keep service-role credentials, Appwrite API keys, Solana private keys, JWT secrets and admin tokens server-side and out of source control.
