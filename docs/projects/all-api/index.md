---
title: All API
---

# All API

All API is the Express backend for shared Freetime Maker services. A separate Next.js frontend provides account and dashboard functionality; its `/api/*` routes are not backend mounts.

## Choose a task

| You want to… | Start here |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| Run a local backend | [Getting Started](./getting-started.md) — install, configure and check process health |
| Call a service | [Using the API](./using-the-api.md) — request helper and catalog/blog examples |
| Look up a contract | [API Reference](./api-reference.md) — mounted routes, parameters and responses |
| Authenticate a request | [Authentication](./authentication.md) — user, forge and webhook credentials |
| Change or diagnose the backend | [Development](./development.md) or [Troubleshooting](./troubleshooting.md) |

## Verified scope and versions

| Component | Source declaration / scope |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [All-API-Node](https://github.com/FreetimeMaker/All-API-Node) | Package **2.8.1**, CommonJS, Express **^5.3.0**; `npm start`; no Node engine constraint declared |
| Backend mounts | `/v1` and `/v2`: health, generic Supabase auth and Wallora; v2 additionally provides Luma Store and MD-Blog |
| [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd) | Package **2.2.0**, Next.js **16.3.3**, React **19.2.8**; see [frontend setup](./getting-started.md#getting-started-optional-accountdashboard-frontend) |
| Luma distribution | Android platform metadata and APK release assets; not a Linux/Windows package catalog |

Versions are source declarations, not release or deployment claims. The v1 version-info handler marks v1 deprecated; use v2 for new integrations. GeoWeather, F-Port and Sol Arcade are not mounted in the inspected backend.

## Request boundaries

Clients call the backend origin plus an explicit versioned path, for example `/v2/lumastore/apps`. Supabase supplies authentication and database access. Luma Store uses a dedicated project rather than the generic auth project. Public catalog reads, user-scoped writes and server-only metadata synchronization have different credential requirements.

:::callout warning Deployment is a separate check
The Android client uses `https://api.free-time.me/v2/lumastore`; the standalone website uses an unversioned `/lumastore` alias. That alias is not mounted by Express. The newer backend revision removes the repository `CNAME` for `api.free-time.me`; that does not establish whether the hostname still serves the API. Production DNS, rewrites and availability were not tested.
:::

## Source review

**Reviewed 2026-11-20** (terminal date), read-only. Checked package/scripts, entry-point and versioned mounts, auth/Wallora/blog handlers, Supabase configuration, Luma catalog/resolver and metadata synchronization/webhook code at [All-API-Node `f743d19fd760a7a337e23e1af8ddff9fa1c3708b`](https://github.com/FreetimeMaker/All-API-Node/tree/f743d19fd760a7a337e23e1af8ddff9fa1c3708b). The checkout was clean. Client routing and token usage were cross-checked in the [Luma source review](../luma-store/index.md#luma-store-source-review).

**Frontend reviewed 2026-11-25**, read-only in a temporary clone of remote HEAD [All-API-FrontEnd `e2876bcb4728d41edb0504199f07e6649fd695d5`](https://github.com/FreetimeMaker/All-API-FrontEnd/tree/e2876bcb4728d41edb0504199f07e6649fd695d5). Checked package scripts and versions, the environment template, App Router route inventory, health/proxy handlers and OAuth wiring.

**Backend delta reviewed 2026-11-25**, read-only in a temporary clone of remote HEAD [All-API-Node `e7010ad906104bd8e597634c6e0cf7718b88fd5e`](https://github.com/FreetimeMaker/All-API-Node/tree/e7010ad906104bd8e597634c6e0cf7718b88fd5e). Compared with local HEAD `f743d19fd760a7a337e23e1af8ddff9fa1c3708b`: only `CNAME` and `package.json` changed; handler source was unchanged and was not re-reviewed.

No app builds, app tests, dependency installs, database operations or live API calls were run. No local secret environment files were read.
