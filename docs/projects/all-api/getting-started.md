# Getting Started

All API 2.7.0 is the central Express backend.

## Install

```bash
git clone https://github.com/FreetimeMaker/All-API-Node.git
cd All-API-Node
npm install
npm start
```

Direct local execution uses port 3000 unless `PORT` is configured.

## Base URL

Production clients use the configured All API origin. Routes themselves are mounted under `/v1` and `/v2`.

Start integration testing with:

```text
GET /v2/health
```

## Configuration

Supabase-backed services require their configured public/server credentials. Luma Store can use its own Supabase configuration rather than the generic project.

GeoWeather code operations require Appwrite endpoint/project/API-key configuration. Sol Arcade additionally requires its Solana/JWT/admin configuration.

::: danger
Never expose service-role keys, Appwrite API keys, JWT/admin secrets or wallet private keys to browser, Android or desktop clients.
:::

## Next

Read [Using the API](/projects/all-api/using-the-api), [API Reference](/projects/all-api/api-reference) and [Development](/projects/all-api/development).
