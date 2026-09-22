# Luma Store

Luma Store is an open-source app-store ecosystem with an Android client, public web discovery, developer tools and platform-aware store metadata.

## Current architecture

| Component | Role |
| --- | --- |
| Luma Store Android | Native Android store client |
| Luma Store Website | Public Discover pages and Developer Dashboard |
| All API | Public v2 store API, including ratings and platform filtering |
| Supabase | Store metadata, developer accounts, submissions, download statistics and related data |

## Android

The Android client is written in Kotlin with Jetpack Compose. It supports Luma Store data together with F-Droid-compatible/community sources, search, app details, installed-app management and update workflows.

The current dependency catalog uses Freetime Core/Design and the app is progressively moving shared UI behavior into Freetime Core.

## Website and developer tools

The website provides public app discovery and developer pages as well as the authenticated Developer Dashboard.

Current developer functionality includes app submission/maintenance, status timelines, developer verification/invite flow, platform metadata for Android/Windows/Linux, download statistics, per-app and per-developer README badges, and developer-wide funding methods.

Public app pages expose ratings and total download information without requiring a developer account.

## Developer funding

Funding is configured **per developer**, not per app. Supported profile fields currently include a general donation URL, Liberapay, OpenCollective, Bitcoin and Litecoin. The same funding methods can be displayed across all apps owned by that developer.

## Downloads and badges

Luma-hosted downloads are counted across published versions. The dashboard exposes all-time totals and can generate badges for an individual app or all apps belonging to a developer.

## Store API

All API 2.7 exposes Luma Store through the v2 contract:

```text
GET /v2/lumastore/apps
GET /v2/lumastore/apps/:id
GET /v2/lumastore/apps/:id/ratings
GET /v2/lumastore/package-formats
```

Authenticated rating endpoints are documented in [All API](/projects/all-api/api-reference).

## Continue

- [Getting Started](/projects/luma-store/getting-started)
- [Android](/projects/luma-store/android)
- [Developer Dashboard](/projects/luma-store/developer-dashboard)
- [Sources](/projects/luma-store/sources)
- [Building Custom Clients](/projects/luma-store/custom-clients)
