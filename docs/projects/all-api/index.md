---
title: All API
---

# All API

All API is the Express backend for shared Freetime Maker services. A separate Next.js frontend provides account and dashboard functionality; its `/api/*` routes are not backend mounts.

## Choose a task

| You want to… | Start here |
| --- | --- |
| Run a local backend | [Getting Started](./getting-started.md) — install, configure and check process health |
| Call a service | [Using the API](./using-the-api.md) — request helper and catalog/blog examples |
| Look up a contract | [API Reference](./api-reference.md) — mounted routes, parameters and responses |
| Authenticate a request | [Authentication](./authentication.md) — user, forge and webhook credentials |
| Change or diagnose the backend | [Development](./development.md) or [Troubleshooting](./troubleshooting.md) |

## Verified scope and versions

| Component | Source declaration / scope |
| --- | --- |
| [All-API-Node](https://github.com/FreetimeMaker/All-API-Node) | Package **2.8.1**, CommonJS, Express **^5.3.0**; `npm start`; no Node engine constraint declared |
| Backend mounts | `/v1` and `/v2`: health, generic Supabase auth and Wallora; v2 additionally provides Luma Store and MD-Blog |
| [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd) | Separate frontend; checkout unavailable locally, so current version, scripts and route behavior are not verified |
| Luma distribution | Android platform metadata and APK release assets; not a Linux/Windows package catalog |

Versions are source declarations, not release or deployment claims. The v1 version-info handler marks v1 deprecated; use v2 for new integrations. GeoWeather, F-Port and Sol Arcade are not mounted in the inspected backend.

## Request boundaries

Clients call the backend origin plus an explicit versioned path, for example `/v2/lumastore/apps`. Supabase supplies authentication and database access. Luma Store uses a dedicated project rather than the generic auth project. Public catalog reads, user-scoped writes and server-only metadata synchronization have different credential requirements.

:::callout warning Deployment is a separate check
The Android client uses `https://api.free-time.me/v2/lumastore`; the standalone website uses an unversioned `/lumastore` alias. That alias is not mounted by Express. Production rewrites and availability were not tested.
:::

## Source review

**Reviewed 2026-11-20** (terminal date), read-only. Checked package/scripts, entry-point and versioned mounts, auth/Wallora/blog handlers, Supabase configuration, Luma catalog/resolver and metadata synchronization/webhook code at [All-API-Node `f743d19fd760a7a337e23e1af8ddff9fa1c3708b`](https://github.com/FreetimeMaker/All-API-Node/tree/f743d19fd760a7a337e23e1af8ddff9fa1c3708b). The checkout was clean. Client routing and token usage were cross-checked in the [Luma source review](../luma-store/index.md#luma-store-source-review).

`All-API-FrontEnd` was absent locally; earlier frontend details are explicitly marked as historical, not revalidated. No source builds, source tests, database operations, dependency resolution or live API calls were run. No local secret environment files were read.
