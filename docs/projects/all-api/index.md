# All API

All API is the central Node.js backend for Freetime Maker services. The current backend package version is **2.7.0** and uses Express 5.

## API versions

The server mounts legacy-compatible v1 routes under `/v1` and the current v2 router under `/v2`.

## Current services

| Service | Current role |
| --- | --- |
| Auth | Supabase OAuth/session and linked-account routes |
| GeoWeather | Subscription plans, subscriptions and code redemption |
| Wallora | Wallpaper catalog and purchase operations |
| Sol Arcade | Wallet challenge/login, pass payment/minting, plays and scores |
| Luma Store | Public catalog, platform filtering and ratings |
| MD-Blog | Blog posts, post Markdown and categories |

GeoWeather code lookup/redemption models now use Appwrite TablesDB, while other backend areas continue to use their configured data services.

## v2 highlights

```text
GET /v2/health
GET /v2/lumastore/apps
GET /v2/lumastore/apps/:id
GET /v2/blog/posts
GET /v2/blog/posts/:slug
GET /v2/blog/categories
```

Sol Arcade remains a v2 service.

## Runtime

The API is designed for Vercel/serverless deployment but can also be started directly with Node. The entry point normalizes bundled router exports to handle Vercel/Rolldown CommonJS interop.

## Continue

- [Using the API](/projects/all-api/using-the-api)
- [API Reference](/projects/all-api/api-reference)
- [Authentication](/projects/all-api/authentication)
- [Development](/projects/all-api/development)
