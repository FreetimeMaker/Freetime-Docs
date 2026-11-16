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
- Compose navigation and expressive Material 3 theming through Freetime Design
- GitHub/F-Droid release-notification integration with explicit permission controls in Settings

::: callout info Remote service availability
Shop, map and voting pages are remote services, not native implementations of those services. Their availability depends on the upstream sites.
:::

## Android stack

The local catalog pins Kotlin 2.4.21, Android Gradle Plugin 9.5.1, KSP 2.3.14 and Freetime modules 3.2.0. Freetime artifacts now use `com.freetime` coordinates from `https://repo.free-time.me/maven/`, replacing JitPack. The app uses Compose/Material 3, Navigation Compose, Ktor with OkHttp, Kotlin serialization and Room.

`SuperSMPApplication` configures the Notifications module for GitHub and F-Droid release feeds with a 360-minute check interval, update/changelog categories and no notification on the first check. This is source configuration, not a delivery or scheduling guarantee; WorkManager's presence does not imply background server-status refresh.

Minimum SDK is 26 and compile/target SDK is 37. Gradle daemon criteria request JDK 21; Java and Kotlin bytecode target 17.

## Distribution

The README links to [GitHub Releases](https://github.com/FreetimeMaker/SuperSMP-Companion-App/releases/latest), [F-Droid](https://f-droid.org/packages/com.freetime.ssmpc), OpenAPK and GitHub Store. Channel versions may differ from the local checkout.

## Continue

- [Getting Started](./getting-started.md)
- [Development](./development.md)
- [Troubleshooting](./troubleshooting.md)

## Source review

Last checked against source: **2026-11-16**.

**Review scope:** Git status/history and changes since the previously documented revision, with focused inspection of dependency repositories, theming and release-notification configuration. The checkout was clean. No Android build, installation, notification-delivery test or live-service check was performed.

### SuperSMP-Companion-App

Current inspected revision: [`03708dc7b3ed86545a20baee5c2bb2fa90787e7a`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/tree/03708dc7b3ed86545a20baee5c2bb2fa90787e7a). Compared with previous revision `8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c`.

Current sources:

- [`gradle/libs.versions.toml`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/03708dc7b3ed86545a20baee5c2bb2fa90787e7a/gradle/libs.versions.toml) and [`settings.gradle.kts`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/03708dc7b3ed86545a20baee5c2bb2fa90787e7a/settings.gradle.kts) — module versions and Maven repository.
- [`app/build.gradle.kts`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/03708dc7b3ed86545a20baee5c2bb2fa90787e7a/app/build.gradle.kts) — unchanged app version/SDK values and added dependencies.
- [`SuperSMPApplication.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/03708dc7b3ed86545a20baee5c2bb2fa90787e7a/app/src/main/java/com/freetime/ssmpc/SuperSMPApplication.kt) — notification initialization and feeds.
- [`NotificationPermissionHelper.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/03708dc7b3ed86545a20baee5c2bb2fa90787e7a/app/src/main/java/com/freetime/ssmpc/NotificationPermissionHelper.kt) and [`SettingsScreen.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/03708dc7b3ed86545a20baee5c2bb2fa90787e7a/app/src/main/java/com/freetime/ssmpc/ui/screens/SettingsScreen.kt) — explicit permission/check actions.
- [`ui/theme/Theme.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/03708dc7b3ed86545a20baee5c2bb2fa90787e7a/app/src/main/java/com/freetime/ssmpc/ui/theme/Theme.kt) — shared theme and navigation-glass root.

Earlier review sources (retained as historical references):

- [`settings.gradle.kts`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/settings.gradle.kts)
- [`app/build.gradle.kts`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/build.gradle.kts)
- [`gradle/libs.versions.toml`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/gradle/libs.versions.toml)
- [`gradle/gradle-daemon-jvm.properties`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/gradle/gradle-daemon-jvm.properties)
- [`app/src/main/AndroidManifest.xml`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/AndroidManifest.xml)
- [`app/src/main/res/values/strings.xml`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/res/values/strings.xml)
- [`app/src/main/java/com/freetime/ssmpc/ui/screens/CoordinatesScreen.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/java/com/freetime/ssmpc/ui/screens/CoordinatesScreen.kt)
- [`app/src/main/java/com/freetime/ssmpc/ui/viewmodels/CoordinatesViewModel.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/java/com/freetime/ssmpc/ui/viewmodels/CoordinatesViewModel.kt)
- [`app/src/main/java/com/freetime/ssmpc/data/status/ServerStatusRepository.kt`](https://github.com/FreetimeMaker/SuperSMP-Companion-App/blob/8fef7a15dabc00e2bdd3b245b51d14e196dc9f7c/app/src/main/java/com/freetime/ssmpc/data/status/ServerStatusRepository.kt)
