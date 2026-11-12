---
title: Luma Store
---

# Luma Store

Android app discovery, publishing and developer tools.

**Technologies:** Android, Web, App store

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/Luma-Store-Android)

Version numbers below describe inspected source, not necessarily the latest published release.

## Find your starting point

- [Discover the store](./getting-started.md) — Find your way around clients and publishing tools.
- [Build the Android app](./android.md) — Set up and build the native store client.
- [Integrate a client](./custom-clients.md) — Connect your own client to the store ecosystem.

Luma Store is an open-source Android app-store ecosystem with a native Android client, public web discovery, a developer dashboard and shared Supabase-backed metadata. The inspected backend and website submission handler currently expose Android/APK distribution, not a general Linux/Windows package catalog.

## At a glance

1. **Android app & web discovery** — Browse apps and access developer tools.
2. **Luma Store services** — Versioned catalog API, submission handlers and APK release sources.
3. **Shared Supabase data** — Profiles, submissions, metadata, analytics and storage.

Catalog overview. The separate manually reviewed frontend feed is not the same catalog.

## Source code

| Repository                                                                | Current role                                                                                  |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Luma-Store-Android](https://github.com/FreetimeMaker/Luma-Store-Android) | Kotlin/Compose Android client, version **4.4.1** (code 31)                                    |
| [Luma-Store-Website](https://github.com/FreetimeMaker/Luma-Store-Website) | Public discovery, tracked sources and standalone developer dashboard                          |
| [All-API-Node](https://github.com/FreetimeMaker/All-API-Node)             | Shared `/v2/lumastore` catalog, profiles, ratings/reviews, favorites and APK release resolver |
| [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd)     | Separate account/developer frontend and manually reviewed `/api/luma/apps` feed               |

These URLs were checked against local Git remotes.

::: callout info Platform scope
The inspected backend and website submission handler expose Android/APK distribution, not a general Linux/Windows package catalog.

No local Linux client repository was available; its implementation and distribution instructions are not verified. See [Linux status](./linux.md).
:::

## Android

The Android client uses **Freetime Core 3.0.0**, Material 3 Expressive and Material You, with floating Liquid Glass navigation. Discover includes collections, filtering and sorting. App details expose developer information, ratings, download metrics and funding.

The developer area includes profile/avatar and funding management, app analytics and notifications. The client combines the Luma catalog with optional F-Droid-compatible repositories and includes APK download/installation integration.

## Inside the Android client

The Discover screen brings app browsing and category filters together. This repository screenshot shows an earlier interface, not the current build.

The referenced screenshot is not included in this documentation checkout. See the [project repository](https://github.com/FreetimeMaker/Luma-Store-Android) for source screenshots; these may differ from the current interface.

## Website and dashboard

The standalone website uses Next.js **16.4.5**, React **19.3.1**, TypeScript, Tailwind CSS 4 and Supabase. It provides public app/developer pages, saved apps, tracked sources, support funding and authenticated developer tools.

Developers can save drafts, import Fastlane metadata, submit Android APKs, resubmit updates, edit published metadata, inspect review/status history and manage profile/funding data. Final submissions verify a public GitHub, GitLab or Codeberg repository.

## Shared data and security

Supabase supplies authentication, profiles, submissions, store metadata, analytics and storage. Public catalog access differs from authenticated developer operations. Keep service-role keys and email/webhook secrets on the server; use the appropriate user session and matching forge authorization for protected actions.

::: callout warning Deployment routing is not verified
This documentation describes local source state, not a tested production deployment. In particular, the website's unversioned API aliases require deployment routing outside the inspected Express mounts.
:::

## Continue

- [Getting Started](./getting-started.md)
- [Android](./android.md)
- [Developer Dashboard](./developer-dashboard.md)
- [App Submissions](./submissions.md)
- [Sources](./sources.md)
- [Building Custom Clients](./custom-clients.md)

## Source review

Last checked against source: **2026-11-12**.

**Review scope:** Setup, prerequisites and troubleshooting.

This manually maintained, scoped review is independent of page edits and documentation builds. It does not certify every page, build results, published artifacts or live services. The listed source checkouts were clean when inspected.

### Luma-Store-Android

Inspected revision: [`7a99f332cf3628d71b71440d2395c924c9761e95`](https://github.com/FreetimeMaker/Luma-Store-Android/tree/7a99f332cf3628d71b71440d2395c924c9761e95).

- [`app/build.gradle.kts`](https://github.com/FreetimeMaker/Luma-Store-Android/blob/7a99f332cf3628d71b71440d2395c924c9761e95/app/build.gradle.kts)
- [`gradle/gradle-daemon-jvm.properties`](https://github.com/FreetimeMaker/Luma-Store-Android/blob/7a99f332cf3628d71b71440d2395c924c9761e95/gradle/gradle-daemon-jvm.properties)
- [`gradle/libs.versions.toml`](https://github.com/FreetimeMaker/Luma-Store-Android/blob/7a99f332cf3628d71b71440d2395c924c9761e95/gradle/libs.versions.toml)
- [`app/src/main/java/com/freetime/lumastore/MainActivity.kt`](https://github.com/FreetimeMaker/Luma-Store-Android/blob/7a99f332cf3628d71b71440d2395c924c9761e95/app/src/main/java/com/freetime/lumastore/MainActivity.kt)
- [`app/src/main/java/com/freetime/lumastore/data/AppRepository.kt`](https://github.com/FreetimeMaker/Luma-Store-Android/blob/7a99f332cf3628d71b71440d2395c924c9761e95/app/src/main/java/com/freetime/lumastore/data/AppRepository.kt)
- [`app/src/main/java/com/freetime/lumastore/data/LumaStoreApi.kt`](https://github.com/FreetimeMaker/Luma-Store-Android/blob/7a99f332cf3628d71b71440d2395c924c9761e95/app/src/main/java/com/freetime/lumastore/data/LumaStoreApi.kt)

### Luma-Store-Website

Inspected revision: [`6af34c11fc609055318a358e48413f8816d8e94e`](https://github.com/FreetimeMaker/Luma-Store-Website/tree/6af34c11fc609055318a358e48413f8816d8e94e).

- [`package.json`](https://github.com/FreetimeMaker/Luma-Store-Website/blob/6af34c11fc609055318a358e48413f8816d8e94e/package.json)
- [`.env.example`](https://github.com/FreetimeMaker/Luma-Store-Website/blob/6af34c11fc609055318a358e48413f8816d8e94e/.env.example)
- [`app/dashboard/AuthGate.tsx`](https://github.com/FreetimeMaker/Luma-Store-Website/blob/6af34c11fc609055318a358e48413f8816d8e94e/app/dashboard/AuthGate.tsx)
- [`app/page.tsx`](https://github.com/FreetimeMaker/Luma-Store-Website/blob/6af34c11fc609055318a358e48413f8816d8e94e/app/page.tsx)

### All-API-Node

Inspected revision: [`a51436ed31f7a8f6082ac387bff7ce50fb3e1051`](https://github.com/FreetimeMaker/All-API-Node/tree/a51436ed31f7a8f6082ac387bff7ce50fb3e1051).

- [`src/index.js`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/src/index.js)
- [`src/v2/lumastore/store.js`](https://github.com/FreetimeMaker/All-API-Node/blob/a51436ed31f7a8f6082ac387bff7ce50fb3e1051/src/v2/lumastore/store.js)
