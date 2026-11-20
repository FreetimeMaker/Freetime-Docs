---
title: Luma Store
---

# Luma Store

Luma Store combines an Android app-store client, public web discovery and an authenticated developer dashboard. Published catalog records, developer submissions and personally tracked release URLs are separate workflows—not three names for the same feed.

## Choose a task

| You want to…                              | Start here                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| Browse apps or set up a checkout          | [Getting Started](./getting-started.md)                                                    |
| Explore the native clients                | [Android](./android.md) or [Linux Developer Console](./linux.md)                           |
| Publish an Android app                    | [Developer Dashboard](./developer-dashboard.md), then [App submissions](./submissions.md)  |
| Follow releases without submitting an app | [Sources](./sources.md)                                                                    |
| Build another client                      | [Custom clients](./custom-clients.md) and the [API Reference](../all-api/api-reference.md) |
| Diagnose a failure                        | [Troubleshooting](./troubleshooting.md)                                                    |

## Verified platforms and versions

| Component / source                                                        | Verified local scope                                                                                                      |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [Luma-Store-Android](https://github.com/FreetimeMaker/Luma-Store-Android) | **4.4.2 (32)**; Android API **24+**, compile/target **37**; Kotlin **2.4.21**, AGP **9.5.1**, Freetime Core **3.2.0**     |
| [Luma-Store-Website](https://github.com/FreetimeMaker/Luma-Store-Website) | Package **1.0.0**; Next.js **16.4.5**, React **19.3.1**; discovery, tracked sources and developer dashboard               |
| [All-API-Node](https://github.com/FreetimeMaker/All-API-Node)             | Package **2.8.1**; `/v2/lumastore` catalog, profiles, ratings/reviews, favorites and APK resolver                         |
| [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd)     | Separate frontend; absent locally, current implementation/version unverified                                              |
| [Luma-Store-Dekstop](https://github.com/FreetimeMaker/Luma-Store-Dekstop) | [Developer Console](./linux.md), package **1.0.0**; Desktop JVM with Linux DEB/RPM and Windows EXE/MSI packaging declared |

These are source declarations, not published release guarantees. The inspected catalog normalizes Android platform rows and the website accepts Android/APK submissions; neither establishes Linux/Windows package distribution.

## How the pieces fit

The Android client enables the Luma catalog by default and can additionally read F-Droid-compatible repositories. It provides discovery collections, app details, ratings and download metrics, APK installation and developer profile/funding tools. Developer notification synchronization uses Android `JobService`.

The website separates public app/developer pages from session-protected dashboard tools. Developers save drafts, verify a public forge repository, submit APK metadata for review, inspect status/history and manage profile/funding information. A `Pending` submission does not mean a published catalog record has changed.

Tracked sources instead follow a latest forge release or a direct HTTPS APK URL. The website keeps this list in browser local storage; it is not the Android client's repository list or a submitted store listing.

:::callout warning Security and deployment boundaries
Use a Luma Supabase user token for user-scoped operations, a matching forge token for repository access, and server-only credentials for privileged work. The website's unversioned `/lumastore` API alias depends on deployment routing outside the inspected Express mounts. No live availability was checked.
:::

## Source review

**Reviewed 2026-11-20** (terminal date), read-only. All four inspected checkouts were clean; repository URLs were checked against their Git remotes.

- [Android `03c98fc52e19b2b0897391acdef24358d3d2ada5`](https://github.com/FreetimeMaker/Luma-Store-Android/tree/03c98fc52e19b2b0897391acdef24358d3d2ada5): app/SDK and dependency declarations, Gradle/JDK setup, repository defaults, API token use and notification job/session path.
- [Website `6af34c11fc609055318a358e48413f8816d8e94e`](https://github.com/FreetimeMaker/Luma-Store-Website/tree/6af34c11fc609055318a358e48413f8816d8e94e): package/scripts, public environment template and Supabase clients, dashboard session gate, submission validation/forge permissions/archive logic, login scopes, navigation, tracked-source storage/routing and status-webhook authentication.
- [Backend `f743d19fd760a7a337e23e1af8ddff9fa1c3708b`](https://github.com/FreetimeMaker/All-API-Node/tree/f743d19fd760a7a337e23e1af8ddff9fa1c3708b): mounts, catalog identifiers/filters, ratings/favorites, APK resolver and metadata/webhook implementation.

The [Desktop source review](./linux.md#linux-developer-console-source-review) covers the additional checkout and its packaging configuration. All API FrontEnd source remained unavailable locally. No source builds/tests, dependency resolution, device installation, database changes or live API calls were performed. Only the public `.env.example` template was read, not local secret environment files.
