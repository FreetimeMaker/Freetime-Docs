---
title: Luma Store
---

<ProjectHeader project="luma-store" />

## Find your starting point

<ProjectPaths project="luma-store" />

Luma Store is an open-source Android app-store ecosystem with a native Android client, public web discovery, a developer dashboard and shared Supabase-backed metadata. The inspected backend and website submission handler currently expose Android/APK distribution, not a general Linux/Windows package catalog.

## At a glance

<ProjectDiagram project="luma-store" />

## Source code

| Repository                                                                | Current role                                                                                  |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Luma-Store-Android](https://github.com/FreetimeMaker/Luma-Store-Android) | Kotlin/Compose Android client, version **4.4.1** (code 31)                                    |
| [Luma-Store-Website](https://github.com/FreetimeMaker/Luma-Store-Website) | Public discovery, tracked sources and standalone developer dashboard                          |
| [All-API-Node](https://github.com/FreetimeMaker/All-API-Node)             | Shared `/v2/lumastore` catalog, profiles, ratings/reviews, favorites and APK release resolver |
| [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd)     | Separate account/developer frontend and manually reviewed `/api/luma/apps` feed               |

These URLs were checked against local Git remotes.

::: info Platform scope
The inspected backend and website submission handler expose Android/APK distribution, not a general Linux/Windows package catalog.

No local Linux client repository was available; its implementation and distribution instructions are not verified. See [Linux status](/projects/luma-store/linux).
:::

## Android

The Android client uses **Freetime Core 3.0.0**, Material 3 Expressive and Material You, with floating Liquid Glass navigation. Discover includes collections, filtering and sorting. App details expose developer information, ratings, download metrics and funding.

The developer area includes profile/avatar and funding management, app analytics and notifications. The client combines the Luma catalog with optional F-Droid-compatible repositories and includes APK download/installation integration.

## Inside the Android client

<ProjectScreenshot src="/img/projects/luma-store-discover.jpg" alt="Luma Store Discover screen with app cards, category filters, an app list and bottom navigation." caption="The Discover screen brings app browsing and category filters together. This repository screenshot shows an earlier interface, not the current build." />

## Website and dashboard

The standalone website uses Next.js **16.4.5**, React **19.3.1**, TypeScript, Tailwind CSS 4 and Supabase. It provides public app/developer pages, saved apps, tracked sources, support funding and authenticated developer tools.

Developers can save drafts, import Fastlane metadata, submit Android APKs, resubmit updates, edit published metadata, inspect review/status history and manage profile/funding data. Final submissions verify a public GitHub, GitLab or Codeberg repository.

## Shared data and security

Supabase supplies authentication, profiles, submissions, store metadata, analytics and storage. Public catalog access differs from authenticated developer operations. Keep service-role keys and email/webhook secrets on the server; use the appropriate user session and matching forge authorization for protected actions.

::: warning Deployment routing is not verified
This documentation describes local source state, not a tested production deployment. In particular, the website's unversioned API aliases require deployment routing outside the inspected Express mounts.
:::

## Continue

- [Getting Started](/projects/luma-store/getting-started)
- [Android](/projects/luma-store/android)
- [Developer Dashboard](/projects/luma-store/developer-dashboard)
- [App Submissions](/projects/luma-store/submissions)
- [Sources](/projects/luma-store/sources)
- [Building Custom Clients](/projects/luma-store/custom-clients)
