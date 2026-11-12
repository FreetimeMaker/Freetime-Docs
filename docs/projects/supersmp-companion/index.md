---
title: SuperSMP Companion
---

<ProjectHeader project="supersmp-companion" />

## Find your starting point

<ProjectPaths project="supersmp-companion" />

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

::: info Remote service availability
Shop, map and voting pages are remote services, not native implementations of those services. Their availability depends on the upstream sites.
:::

## Android stack

The local catalog pins Kotlin 2.4.21, Android Gradle Plugin 9.5.1 and Freetime Core 3.0.0. The app uses Compose/Material 3, Navigation Compose, Ktor with OkHttp, Kotlin serialization and Room. WorkManager is declared as a dependency; that alone does not establish a scheduled background feature.

Minimum SDK is 26 and compile/target SDK is 37. Gradle daemon criteria request JDK 21; Java and Kotlin bytecode target 17.

## Distribution

The README links to [GitHub Releases](https://github.com/FreetimeMaker/SuperSMP-Companion-App/releases/latest), [F-Droid](https://f-droid.org/packages/com.freetime.ssmpc), OpenAPK and GitHub Store. Channel versions may differ from the local checkout.

## Continue

- [Getting Started](./getting-started)
- [Development](./development)
- [Troubleshooting](./troubleshooting)
