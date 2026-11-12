# All API

All API is the central Node.js backend for Freetime Maker services. The current backend package version is **2.8.0** and uses Express 5.

## API versions

The API is mounted under `/api/v1` and mirrored under `/api/v2`. Sol Arcade is available on v2.

## Current services

| Service | Current role |
| --- | --- |
| Auth | Supabase OAuth, sessions and linked accounts |
| GeoWeather | Subscription plans, subscriptions and code redemption |
| Wallora | Wallpaper catalog and purchases |
| F-Port | Open-source app directory and cloud-synced likes |
| Sol Arcade | Wallet login, on-chain pass payments, compressed NFT passes, plays and scores |

## Runtime and data

The backend is built for Vercel serverless deployment and can also run directly with Node.js. Supabase/PostgreSQL stores the service data with Row Level Security where applicable. The backend also includes Appwrite support where individual services require it.

The v2 Sol Arcade flow uses wallet challenge/signature authentication, JWT sessions, Solana payment confirmation and compressed NFT pass minting. A pass has a configurable play limit and each game start consumes one play.

## Selected endpoints

```text
GET  /api/v1/health
GET  /api/v1/auth/me
GET  /api/v1/geoweather/subscriptions/plans
GET  /api/v1/wallora/wallpapers
GET  /api/v1/fport/apps
GET  /api/v2/arcade
POST /api/v2/arcade/login
POST /api/v2/arcade/pass/confirm
POST /api/v2/arcade/play/start
```

## Security

Service-role keys, Solana mint keys, Arcade JWT/admin secrets and other privileged credentials are server-only. Clients should authenticate through the exposed API flows rather than receiving privileged backend keys.

## Continue

- [Using the API](/projects/all-api/using-the-api)
- [API Reference](/projects/all-api/api-reference)
- [Authentication](/projects/all-api/authentication)
- [Development](/projects/all-api/development)
