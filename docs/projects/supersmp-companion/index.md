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
| Compile / target SDK | 37.2 / 37 |
| Gradle daemon / bytecode | JDK 21 / JVM 17 |
| Kotlin / AGP / KSP | 2.4.21 / 9.5.2 / **2.3.14** |
| Freetime libraries | **4.0.1**, six JitPack modules including Notifications |

Evidence: [version catalog](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/9e4fab3887bc8f5d277f58668d0ef11519a26bd2/gradle/libs.versions.toml) · [Android build](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/9e4fab3887bc8f5d277f58668d0ef11519a26bd2/app/build.gradle.kts) · [daemon criteria](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/9e4fab3887bc8f5d277f58668d0ef11519a26bd2/gradle/gradle-daemon-jvm.properties).

These values describe the reviewed source, not the latest distributed release.

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
- Expressive Material 3 theming and Compose bottom navigation
- opt-in delivery of app update and release-note notifications

::: callout info "Remote service availability"
Shop, map and voting pages are remote services, not native implementations of those services. Their availability depends on the upstream sites.
:::

## Android stack

Compose/Material 3 and Navigation Compose render the app. Ktor/OkHttp with Kotlin serialization retrieves status; Room stores coordinates. The build retains WorkManager; that dependency alone does not establish background server-status polling. Release notifications are separate and configured in `SuperSMPApplication.onCreate()`.

Core, Design, Browser, Donations, FreetimeWarn and Notifications use version `4.0.1` (no `v` prefix) under `com.github.FreetimeMaker.Freetime-Core` from [JitPack](https://jitpack.io/).

## Distribution

The README links to [GitHub Releases](https://github.com/FreetimeMaker/SuperSMP-Companion-App/releases/latest), [F-Droid](https://f-droid.org/packages/com.freetime.ssmpc), OpenAPK and GitHub Store. Channel versions may differ from the reviewed source.

## Maintained next steps

- **Use:** complete the [local coordinate exercise](./getting-started.md#getting-started-build-and-save-a-first-coordinate) before testing remote status, map or shop.
- **Develop:** preserve saved coordinates while diagnosing Room/input errors; handle status API failures separately from WebViews.
- **Enable release alerts:** use [App notifications](./getting-started.md#getting-started-enable-release-notifications) in Settings.

## Source review

On **2026-11-25**, compared GitHub `master` HEAD [`9e4fab3887bc8f5d277f58668d0ef11519a26bd2`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/tree/9e4fab3887bc8f5d277f58668d0ef11519a26bd2) with the previously documented local snapshot [`bef24070`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/tree/bef24070b407296991498e79ac15f6406b621680) in a temporary clone. Static review focused on the build and dependency migration, theme/navigation, notification setup and settings, and the impact on the existing coordinate workflow. No dependency resolution, builds, device runs, live feed or API checks, release downloads, or notification delivery tests were performed.
