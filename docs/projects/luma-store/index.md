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
| [Luma-Store-Android](https://github.com/FreetimeMaker/Luma-Store-Android) | **4.4.3 (33)**; Android API **24+**, compile **37** minor API level **2**, target **37**; Kotlin **2.4.21**, AGP **9.5.2**, Freetime Core **4.0.2**     |
| [Luma-Store-Website](https://github.com/FreetimeMaker/Luma-Store-Website) | Package **1.0.0**; Next.js **16.4.6**, React **19.3.1**; discovery, tracked sources and developer dashboard               |
| [All-API-Node](https://github.com/FreetimeMaker/All-API-Node)             | Package **2.8.1**; `/v2/lumastore` catalog, profiles, ratings/reviews, favorites and APK resolver                         |
| [All-API-FrontEnd](https://github.com/FreetimeMaker/All-API-FrontEnd)     | Separate frontend; absent locally, current implementation/version unverified                                              |
| [Luma-Store-Dekstop](https://github.com/FreetimeMaker/Luma-Store-Dekstop) | [Developer Console](./linux.md), package **1.0.0**; Desktop JVM with Linux DEB/RPM and Windows EXE/MSI packaging declared |

These are source declarations, not published release guarantees. The inspected catalog normalizes Android platform rows and the website accepts Android/APK submissions; neither establishes Linux/Windows package distribution.

## How the pieces fit

The Android client enables the Luma catalog by default and can additionally read F-Droid-compatible repositories. It provides discovery collections, app details, ratings and download metrics, APK installation and developer profile/funding tools. The developer area lists published-app analytics separately from submissions. Developer notification synchronization uses Android `JobService`.

The website separates public app/developer pages from session-protected dashboard tools. Developers save drafts, verify a public forge repository, submit APK metadata for review, inspect status/history and manage profile/funding information. A `Pending` submission does not mean a published catalog record has changed.

Tracked sources instead follow a latest forge release or a direct HTTPS APK URL. The website keeps this list in browser local storage; it is not the Android client's repository list or a submitted store listing.

:::callout warning Security and deployment boundaries
Use a Luma Supabase user token for user-scoped operations, a matching forge token for repository access, and server-only credentials for privileged work. The website's unversioned `/lumastore` API alias depends on deployment routing outside the inspected Express mounts. No live availability was checked.
:::

## Source review

**2026-11-25 follow-up, read-only.** Compared the Android and Desktop source changes with the revisions documented on 2026-11-20. The local Website and backend checkouts were still at the 2026-11-20 pins, so their newer remote HEADs were compared against those pins in temporary clones. Unchanged implementation details carry forward from the earlier review.

- [Android `4ca4752c99d0d95fae5c92cc16d925050d187b91`](https://github.com/FreetimeMaker/Luma-Store-Android/tree/4ca4752c99d0d95fae5c92cc16d925050d187b91), compared with `03c98fc52e19b2b0897391acdef24358d3d2ada5`: app and build declarations, release CI, F-Droid source URL, outage fallback, developer analytics and submission controls. Unchanged behavior carries forward from the earlier review.
- [Website `ff8504f3d54ffa3cd2ac6035f94c342dc7acbca4`](https://github.com/FreetimeMaker/Luma-Store-Website/tree/ff8504f3d54ffa3cd2ac6035f94c342dc7acbca4), compared with `6af34c11fc609055318a358e48413f8816d8e94e`: `package.json` only. Next.js, Supabase JS, Tailwind and lint dependencies changed; dashboard, submissions and tracked-source implementation files did not.
- [Backend `e7010ad906104bd8e597634c6e0cf7718b88fd5e`](https://github.com/FreetimeMaker/All-API-Node/tree/e7010ad906104bd8e597634c6e0cf7718b88fd5e), compared with `f743d19fd760a7a337e23e1af8ddff9fa1c3708b`: Axios and dotenv dependency ranges changed and the root `CNAME` was removed. No change to the Luma mounts or handlers. See the [All API reference](../all-api/api-reference.md) for the backend contract.

The [Desktop source review](./linux.md#linux-developer-console-source-review) covers the additional checkout and its packaging configuration. All API FrontEnd source remained unavailable locally. The follow-up did not run client builds/tests or CI, resolve dependencies, install apps, change databases, call live APIs or inspect secret environment files.
