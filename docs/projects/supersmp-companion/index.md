---
title: SuperSMP Companion
---

# SuperSMP Companion

An unofficial Android companion for the SuperSMP community.

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/SuperSMP-Companion-App)

SuperSMP Companion is a free, open-source **unofficial** Android companion for the SuperSMP Minecraft server. It is not affiliated with or endorsed by the server.

## Verified source baseline

| Setting | Inspected value |
| --- | --- |
| App version | **2.0.1** (code **23**) |
| Platform / package | Android API 26+ / `com.freetime.ssmpc` |
| Compile / target SDK | 37 / 37 |
| Gradle daemon / bytecode | JDK 21 / JVM 17 |
| Kotlin / AGP / KSP | 2.4.21 / 9.5.1 / **2.3.13** |
| Freetime libraries | **3.1.0**, five modules; no Notifications dependency |

Evidence: [version catalog](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/bef24070b407296991498e79ac15f6406b621680/gradle/libs.versions.toml) · [Android build](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/bef24070b407296991498e79ac15f6406b621680/app/build.gradle.kts) · [daemon criteria](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/bef24070b407296991498e79ac15f6406b621680/gradle/gradle-daemon-jvm.properties).

These values describe the local checkout, not the latest distributed release.

## Choose your route

- [Getting Started](./getting-started.md): build/install and save a local coordinate, independently of remote services.
- [Development](./development.md): build targets, UI/data boundaries and a source-backed API example.
- [Troubleshooting](./troubleshooting.md): distinguish WebView, status API, Room and build failures.

## Features present in source

- home screen with server status retrieved through the mcsrvstat.us API
- voting-platform links and community links
- embedded official shop at `https://store.supersmp.fun`
- embedded map at `https://map.supersmp.fun/`
- server-command reference screen
- locally saved coordinates with name, X/Y/Z, dimension and description, backed by Room
- settings, changelog and donation screens
- Compose navigation, local Material 3 theming and app-owned glass helpers

::: callout info "Remote service availability"
Shop, map and voting pages are remote services, not native implementations of those services. Their availability depends on the upstream sites.
:::

## Android stack

Compose/Material 3 and Navigation Compose render the app. Ktor/OkHttp with Kotlin serialization retrieves status; Room stores coordinates. The build retains WorkManager, but that dependency alone does not establish background status polling or release notifications. `SuperSMPApplication.onCreate()` has no notification initialization in this checkout.

Freetime Core, Design, Browser, Donations and FreetimeWarn are pinned to 3.1.0 under `com.freetime` from [`https://repo.free-time.me/maven/`](../repositories/maven-gradle.md). Do not copy the current Core 4.0.1 API assumptions into this app without a deliberate migration.

## Distribution

The README links to [GitHub Releases](https://github.com/FreetimeMaker/SuperSMP-Companion-App/releases/latest), [F-Droid](https://f-droid.org/packages/com.freetime.ssmpc), OpenAPK and GitHub Store. Channel versions may differ from the local checkout.

## Maintained next steps

- **Use:** complete the [local coordinate exercise](./getting-started.md#getting-started-build-and-save-a-first-coordinate) before testing remote status, map or shop.
- **Develop:** preserve saved coordinates while diagnosing Room/input errors; handle status API failures separately from WebViews.
- **Before upgrading Core:** compare theme, glass and warning integration against the pinned 3.1.0 API. Release notifications would be new integration work here, not an existing feature to enable.

## Source review

Reviewed **2026-11-20** against the clean local [SuperSMP-Companion-App checkout at `bef24070b407`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/tree/bef24070b407296991498e79ac15f6406b621680). Scope: Gradle/version metadata, application initialization, theme/glass, coordinate input/persistence wiring and status repository/ViewModel. Static inspection only; no builds, device runs, live APIs, release downloads or deployment checks.
