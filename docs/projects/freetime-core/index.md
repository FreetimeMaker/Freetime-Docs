---
title: Freetime Core
---

# Freetime Core

Shared building blocks for expressive Android applications.

**Technologies:** Android, Kotlin, Library

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/Freetime-Core)

Version numbers below describe inspected source, not necessarily the latest published release.

## Find your starting point

- [Use the libraries](./getting-started.md) — Add the Maven repository and your first dependency.
- [Explore the modules](./modules.md) — Find the building blocks your app needs.
- [Build your interface](./design.md) — Integrate themes and floating navigation.

Freetime Core is the shared, open-source Android library suite for Freetime Maker applications. The reviewed source declares version **3.2.0**. Its README explicitly marks this release as prepared but not yet uploaded; public availability was not checked.

**Source code:** [FreetimeMaker/Freetime-Core](https://github.com/FreetimeMaker/Freetime-Core)

## Current direction

Freetime Core 3.x uses **Material 3 Expressive + Material You** as the UI foundation. Liquid Glass is intentionally limited to the dedicated floating bottom navigation instead of being a second general-purpose component system.

- Material 3 Expressive components and motion
- Material You dynamic colors on Android 12+
- automatic light mode from 07:00 and dark mode from 19:00
- optional OLED, system, light, dark and time-based theme modes
- Liquid Glass for the floating bottom navigation
- minimum SDK 24 and compile SDK 37
- F-Droid-friendly open-source dependencies

## Modules

| Module          | Purpose                                                                               |
| --------------- | ------------------------------------------------------------------------------------- |
| `Core`          | Shared models, results, SDK metadata and Android helpers                              |
| `Design`        | Material 3 Expressive/Material You theme helpers and floating bottom-navigation glass |
| `Browser`       | External and in-app URL routing and browser UI                                        |
| `Donations`     | Donation targets, wallet helpers and Compose donation UI                              |
| `FreetimeWarn`  | Reusable acknowledgement/warning flow                                                 |
| `Notifications` | Optional local polling for app updates, GitHub changelogs and developer blog messages |
| `Sample`        | Example application                                                                   |

## 3.0 migration

::: callout warning Migrating from 2.x
Generic 2.x Liquid Glass APIs such as `Modifier.liquidGlass()`, `LiquidGlassContainer`, `LiquidGlassIconButton` and `LiquidGlassRoot` are no longer the supported UI direction. Apps should use Material 3 directly for normal surfaces and `FloatingBottomNavigationGlassRoot` with `FloatingBottomNavigationBar` for the floating navigation.
:::

The floating bar follows the SimpMusic-style layout with a capsule container, sliding frosted selection pill and optional separate circular search action.

## Installation

The current publishing configuration uses Gemfury with repository `https://repo.free-time.me/maven/` and Maven group `com.freetime`. See [Getting Started](./getting-started.md) for repository setup and migration from JitPack.

These are the intended coordinates **after 3.2.0 publication**, not confirmed downloads:

```kotlin
implementation("com.freetime:Core:3.2.0")
implementation("com.freetime:Design:3.2.0")
implementation("com.freetime:Browser:3.2.0")
implementation("com.freetime:Donations:3.2.0")
implementation("com.freetime:FreetimeWarn:3.2.0")
implementation("com.freetime:Notifications:3.2.0")
```

## New in 3.2.0

[Notifications](./modules.md#notifications) adds optional WorkManager polling for GitHub/F-Droid app updates, GitHub release-note changelogs and developer blog messages. It persists configuration and bounded deduplication in DataStore, defaults to a silent first successful check and requires host-owned permission/channel setup. This is polling, not guaranteed immediate push. The existing theme templates and navigation-only glass direction remain in place.

The shared catalog and `FreetimeCore.SDK_VERSION` use 3.2.0; the Sample declares version code 5. Publishing is configured for six modules, with AAR/POM publication and anonymous verification before tagging. Configuration of that flow is not evidence that it ran.

## Theme templates in 3.1.0

Design includes classic Material 3 and Expressive templates with separate color, typography, shape and theme files. Apps can copy and customize these without Liquid Glass; Material You is opt-in. The existing root `AppTheme` keeps its behavior.

## Continue

- [Getting Started](./getting-started.md)
- [Modules](./modules.md)
- [Design & Liquid Glass](./design.md)
- [FreetimeWarn](./freetime-warn.md)

## Source review

Last checked against source: **2026-11-16**.

**Review scope:** 3.2.0 version and Maven configuration, module registration, Notifications public APIs and delivery/lifecycle implementation, plus setup and troubleshooting. The prior documentation described 3.1.0; historical statements are retained where explicitly labeled.

Reviewed the public shallow clone `/tmp/freetime-core-docs-review-20261116` (Windows: `C:/Users/jamie/AppData/Local/Temp/freetime-core-docs-review-20261116`), with the exact HEAD below and a clean working tree. This is a static source review, not a full historical diff: shallow history limits ancestry comparisons. No builds, tests, lint, emulator/device runs, publishing, anonymous artifact downloads or live endpoint checks were performed. Source README/changelog release claims are not independent verification of remote availability or runtime behavior.

### Freetime-Core

Inspected revision: [`8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94`](https://github.com/FreetimeMaker/Freetime-Core/tree/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94).

Pinned evidence:

- [Version catalog](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/gradle/libs.versions.toml), [root publishing configuration](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/build.gradle.kts) and [module registration](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/settings.gradle.kts).
- [README publication status](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/README.md) and [changelog](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/CHANGELOG.md).
- [Notifications build/dependencies](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Notifications/build.gradle.kts), [manifest permissions](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Notifications/src/main/AndroidManifest.xml) and [integration guide](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Notifications/README.md).
- [Public API and scheduling](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Notifications/src/main/java/com/freetime/notifications/FreetimeNotifications.kt), [models and validation](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Notifications/src/main/java/com/freetime/notifications/NotificationModels.kt), [check lifecycle/deduplication](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Notifications/src/main/java/com/freetime/notifications/NotificationChecker.kt), [source fetching](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Notifications/src/main/java/com/freetime/notifications/SourceFetcher.kt) and [version policy](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Notifications/src/main/java/com/freetime/notifications/NotificationPolicy.kt).
- [Daemon JDK criteria](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/gradle/gradle-daemon-jvm.properties) and [Sample configuration](https://github.com/FreetimeMaker/Freetime-Core/blob/8f9e8ad79bf82fe90b61b83ba4194aed2b37ca94/Sample/build.gradle.kts).
