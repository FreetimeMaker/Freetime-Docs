---
title: All API
---

<ProjectHeader project="all-api" />

## Find your starting point

<ProjectPaths project="all-api" />

All API consists of an Express backend and a separate Next.js account/dashboard frontend. This documentation describes the locally inspected implementation, not a verified production deployment.

## At a glance

<ProjectDiagram project="all-api" />

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

::: warning Current endpoint scope
GeoWeather, F-Port and Sol Arcade are not mounted by the current backend. Older documentation for those endpoints is not a contract for this revision.
:::

## Frontend

The frontend provides Supabase sign-in, account/developer dashboard pages, health monitoring, support handling, a backend proxy and a separate manually reviewed Luma submission API. Its `/api/luma/apps` endpoint is distinct from the Express `/v2/lumastore/apps` catalog.

## Runtime and security

The backend exports the Express app for hosting and starts a local listener when executed directly. Supabase provides database/auth access; Luma Store uses a dedicated Supabase client. Keep service-role keys, provider secrets, email credentials and webhook secrets server-side.

## Continue

- [Getting Started](/projects/all-api/getting-started)
- [Using the API](/projects/all-api/using-the-api)
- [API Reference](/projects/all-api/api-reference)
- [Authentication](/projects/all-api/authentication)
- [Development](/projects/all-api/development)
