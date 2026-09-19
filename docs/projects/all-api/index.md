# All API

All API is the central backend for Freetime Maker services. It is built with Express.js and designed for Vercel serverless deployment.

**Repository:** [FreetimeMaker/All-API-Node](https://github.com/FreetimeMaker/All-API-Node)

## API versions

Endpoints are mounted under `/v1`. Most services are also mirrored under `/v2`, while Sol Arcade is documented as v2-only.

## Services

| Service | Purpose |
| --- | --- |
| GeoWeather | Subscription plans and subscription management |
| Wallora | Wallpaper catalog, details and purchases |
| Sol Arcade | Solana Arcade Pass sessions, minting and plays |
| Auth | Supabase OAuth authentication and linked accounts |

## Core endpoints

### Health

`GET /v1/health`

Returns service status and a timestamp.

### Authentication

Authentication uses Supabase OAuth. The API provides configuration, login, callback, logout, current-user and linked-account endpoints. Protected routes use Bearer authentication.

### GeoWeather

- `GET /v1/geoweather/subscriptions/plans`
- `POST /v1/geoweather/subscriptions/redeem`
- `GET /v1/geoweather/subscriptions`

### Wallora

- `GET /v1/wallora/wallpapers`
- `GET /v1/wallora/wallpapers/:id`
- `POST /v1/wallora/wallpapers/:id/purchase`
- `POST /v1/wallora/wallpapers`

### Sol Arcade

Sol Arcade uses the v2 API and includes challenge/login, session status, pass payment/minting and play-management endpoints.

## Configuration

The backend uses Supabase configuration for database/auth functionality. Sol Arcade additionally supports Solana RPC, mint wallet, recipient, JWT/admin secrets, asset base URL and play-limit configuration through environment variables.

::: warning
Never put service-role keys, private wallet keys or admin secrets into client applications or public documentation.
:::
