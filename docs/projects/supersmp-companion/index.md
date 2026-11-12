---
title: SuperSMP Companion
---

# SuperSMP Companion

An unofficial Android companion for the SuperSMP community.

**Technologies:** Android, Community, Companion

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/SuperSMP-Companion-App)

Version numbers below describe inspected source, not necessarily the latest published release.

## Find your starting point

- [Use the companion](./getting-started.md) — Explore server status, coordinates and community links.
- [Build from source](./development.md) — Configure and build the Android application.
- [Resolve a problem](./troubleshooting.md) — Check connectivity and external service limitations.

SuperSMP Companion is a free, open-source **unofficial** Android companion app for the SuperSMP Minecraft server. It is not affiliated with or endorsed by the server.

**Source code:** [FreetimeMaker/SuperSMP-Companion-App](https://github.com/FreetimeMaker/SuperSMP-Companion-App)

The local Android build declares **2.0.1** (version code **23**), with application ID `com.freetime.ssmpc`.

## Features present in source

- home screen with server status retrieved through the mcsrvstat.us API
- voting-platform links and community links
- embedded official shop at `https://store.supersmp.fun`
- embedded map at `https://map.supersmp.fun/`
- server-command reference screen
- locally saved coordinates with name, X/Y/Z, dimension and description, backed by Room
- settings, changelog and donation screens
- Compose navigation and Material 3 UI

::: callout info Remote service availability
Shop, map and voting pages are remote services, not native implementations of those services. Their availability depends on the upstream sites.
:::

## Android stack

The local catalog pins Kotlin 2.4.21, Android Gradle Plugin 9.5.1 and Freetime Core 3.0.0. The app uses Compose/Material 3, Navigation Compose, Ktor with OkHttp, Kotlin serialization and Room. WorkManager is declared as a dependency; that alone does not establish a scheduled background feature.

Minimum SDK is 26 and compile/target SDK is 37. Gradle daemon criteria request JDK 21; Java and Kotlin bytecode target 17.

## Distribution

The README links to [GitHub Releases](https://github.com/FreetimeMaker/SuperSMP-Companion-App/releases/latest), [F-Droid](https://f-droid.org/packages/com.freetime.ssmpc), OpenAPK and GitHub Store. Channel versions may differ from the local checkout.

## Continue

- [Getting Started](./getting-started.md)
- [Development](./development.md)
- [Troubleshooting](./troubleshooting.md)

## Source review

Last checked against source: **2026-11-12**.

**Review scope:** Setup, prerequisites and troubleshooting.

This manually maintained, scoped review is independent of page edits and documentation builds. It does not certify every page, build results, published artifacts or live services. The listed source checkouts were clean when inspected.

### SuperSMP-Companion-App

Inspected revision: [`8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/tree/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c).

- [`settings.gradle.kts`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/settings.gradle.kts)
- [`app/build.gradle.kts`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/build.gradle.kts)
- [`gradle/libs.versions.toml`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/gradle/libs.versions.toml)
- [`gradle/gradle-daemon-jvm.properties`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/gradle/gradle-daemon-jvm.properties)
- [`app/src/main/AndroidManifest.xml`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/AndroidManifest.xml)
- [`app/src/main/res/values/strings.xml`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/res/values/strings.xml)
- [`app/src/main/java/com/freetime/ssmpc/ui/screens/CoordinatesScreen.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/java/com/freetime/ssmpc/ui/screens/CoordinatesScreen.kt)
- [`app/src/main/java/com/freetime/ssmpc/ui/viewmodels/CoordinatesViewModel.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/java/com/freetime/ssmpc/ui/viewmodels/CoordinatesViewModel.kt)
- [`app/src/main/java/com/freetime/ssmpc/data/status/ServerStatusRepository.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/java/com/freetime/ssmpc/data/status/ServerStatusRepository.kt)
