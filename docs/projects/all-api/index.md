---
title: All API
---

# All API

Backend services, authentication and shared project APIs.

**Technologies:** Node.js, Express, Backend

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/All-API-Node)

Version numbers below describe inspected source, not necessarily the latest published release.

## Find your starting point

- [Make a request](./using-the-api.md) — Learn versioned routes and response handling.
- [Run locally](./getting-started.md) — Configure the backend and start development.
- [Integrate a service](./api-reference.md) — Look up endpoints and authentication requirements.

All API consists of an Express backend and a separate Next.js account/dashboard frontend. This documentation describes the locally inspected implementation, not a verified production deployment.

## At a glance

1. **Applications & API clients** — Send requests to the versioned backend routes.
2. **Express · /v1 and /v2** — Authentication, Wallora and v2 Luma Store / MD-Blog routes.
3. **Supabase** — Authentication and service data; privileged credentials stay server-side.

Simplified backend request flow. The separate Next.js frontend also has its own routes.

## Source code

- [All-API-Node](https://github.com/FreetimeMaker/All-API-Node) — backend, package **2.8.1**.
- [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd) — web frontend, package **2.2.0**.

These repository URLs were checked against the local Git remotes.

## API versions and services

The Express entry point mounts `/v1` and `/v2`, without an `/api` prefix. Both versions expose health, Supabase authentication and Wallora wallpaper routes. v1 is marked deprecated in its version-info response.

v2 additionally mounts:

| Service    | Current role                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| Luma Store | Android catalog, developer profiles, download counts, ratings/reviews, saved apps and tracked APK release sources |
| MD-Blog    | Markdown post list, post details and categories                                                                   |

::: callout warning Current endpoint scope
GeoWeather, F-Port and Sol Arcade are not mounted by the current backend. Older documentation for those endpoints is not a contract for this revision.
:::

## Frontend

The frontend provides Supabase sign-in, account/developer dashboard pages, health monitoring, support handling, a backend proxy and a separate manually reviewed Luma submission API. Its `/api/luma/apps` endpoint is distinct from the Express `/v2/lumastore/apps` catalog.

## Runtime and security

The backend exports the Express app for hosting and starts a local listener when executed directly. Supabase provides database/auth access; Luma Store uses a dedicated Supabase client. Keep service-role keys, provider secrets, email credentials and webhook secrets server-side.

## Continue

- [Getting Started](./getting-started.md)
- [Using the API](./using-the-api.md)
- [API Reference](./api-reference.md)
- [Authentication](./authentication.md)
- [Development](./development.md)

## Source review

Last checked against source: **2026-11-12**.

**Review scope:** Setup, prerequisites and troubleshooting.

This manually maintained, scoped review is independent of page edits and documentation builds. It does not certify every page, build results, published artifacts or live services. The listed source checkouts were clean when inspected.

### All-API-Node

Inspected revision: [`a51436ed31f7a8f6082ac387bff7ce50fb3e1051`](https://github.com/FreetimeMaker/All-API-Node/tree/a51436ed31f7a8f6082ac387bff7ce50fb3e1051).

- [`package.json`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/package.json)
- [`src/index.js`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/src/index.js)
- [`src/lib/supabase.js`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/src/lib/supabase.js)
- [`src/v2/index.js`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/src/v2/index.js)
- [`src/v2/health/health.js`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/src/v2/health/health.js)
- [`src/v2/lumastore/store.js`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/src/v2/lumastore/store.js)
- [`src/v2/blog/index.js`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/src/v2/blog/index.js)

### All-API-FrontEnd

Inspected revision: [`5ecab236b32c955e7bd98d904dbc8f688c7a41a8`](https://github.com/FreetimeMaker/All-API-FrontEnd/tree/5ecab236b32c955e7bd98d904dbc8f688c7a41a8).

- [`package.json`](https://github.com/FreetimeMaker/All-API-FrontEnd/blob/5ecab236b32c955e7bd98d904dbc8f688c7a41a8/package.json)
- [`.env.example`](https://github.com/FreetimeMaker/All-API-FrontEnd/blob/5ecab236b32c955e7bd98d904dbc8f688c7a41a8/.env.example)
- [`app/api/proxy/[...path]/route.ts`](https://github.com/FreetimeMaker/All-API-FrontEnd/blob/5ecab236b32c955e7bd98d904dbc8f688c7a41a8/app/api/proxy/%5B...path%5D/route.ts)
