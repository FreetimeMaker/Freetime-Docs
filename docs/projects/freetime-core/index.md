---
title: Freetime Core
---

# Freetime Core

Modular Kotlin Multiplatform building blocks for Android and desktop JVM applications. Adopt only the libraries you need; no Freetime account or Luma Store installation is required. The project uses open-source dependencies and is licensed under GPL-3.0.

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/Freetime-Core)

## Verified source baseline

| Setting | Inspected value |
| --- | --- |
| Library version | **4.0.1**, breaking successor to Android-only 3.2.0 |
| Platforms | Android API 24+ and desktop JVM; no supported iOS/web targets |
| Android compile / sample target SDK | 37 / 37 |
| Toolchain | Gradle daemon JDK 25; JVM toolchain/output 17 |
| Plugins | Kotlin 2.4.21, AGP 9.5.1, Compose Multiplatform 1.12.2 |
| Android sample | `:Sample-android`, version code 6 |

Evidence: [version catalog](https://github.com/FreetimeMaker/Freetime-Core/blob/2bb88da626d82b77bd612f1f3eca857346c30e71/gradle/libs.versions.toml) · [Android build](https://github.com/FreetimeMaker/Freetime-Core/blob/2bb88da626d82b77bd612f1f3eca857346c30e71/Sample/androidApp/build.gradle.kts) · [daemon criteria](https://github.com/FreetimeMaker/Freetime-Core/blob/2bb88da626d82b77bd612f1f3eca857346c30e71/gradle/gradle-daemon-jvm.properties).

::: callout warning "Publication is not verified"
4.0.1 is the intended source/staging version, not a confirmed public download. Remote publishing in this checkout is disabled. The upstream README reports an incomplete 4.0.0 upload; do not use 4.0.0. Use the local samples until a complete publication is verified.
:::

## Choose a module

| Module | Purpose |
| --- | --- |
| `Core` | Models, results, SDK metadata and platform preferences |
| `Design` | Expressive theme, Material You on Android and floating navigation glass |
| `Browser` | URL routing; Android WebView or desktop external-browser action |
| `Donations` | Donation UI, wallet and clipboard helpers; host-owned QR encoding |
| `FreetimeWarn` | Configurable warning UI and persistent acknowledgements |
| `Notifications` | Local GitHub/F-Droid update, changelog and developer-blog polling |
| `Sample` / `Sample-android` | Shared sample/desktop entry point and thin Android host |

[Modules](./modules.md) explains platform capabilities and integration contracts.

## Design direction and migration

Material 3 Expressive is the default component system. `AppTheme` supplies expressive motion, Material You on Android 12+, regular schemes elsewhere, SYSTEM/LIGHT/DARK/OLED/AUTO_TIME modes and a default 07:00–19:00 light period. Default Liquid Glass is navigation-only; imported full-glass templates are explicit opt-ins, not automatic restyling.

For 2.x integrations, replace removed generic glass modifiers and containers with Material components. For 3.2.0 integrations, keep the case-sensitive `com.freetime` root artifact names but account for KMP source sets, platform stores/launchers and complete Gradle Module Metadata. See [Getting Started](./getting-started.md) and [Design & Liquid Glass](./design.md).

## Maintained next steps

- **Try locally:** run an Android or desktop [sample target](./getting-started.md#getting-started-local-sample-targets).
- **Integrate:** select modules and use the [platform-aware APIs](./modules.md); do not upgrade GeoWeather or SuperSMP merely to match this library version.
- **Before distribution:** verify all platform artifacts and metadata after an authorized publication; staging/task configuration is not evidence of remote success.
- **Diagnose:** use [Troubleshooting](./troubleshooting.md) before changing toolchain or dependency pins.

## Source review

Reviewed **2026-11-20** against the clean local [Freetime-Core checkout at `2bb88da626d8`](https://github.com/FreetimeMaker/Freetime-Core/tree/2bb88da626d82b77bd612f1f3eca857346c30e71). Scope: Gradle/version metadata, sample targets/UI, KMP migration, theme/templates, preferences, browser/warning APIs and Android/desktop notification lifecycle. Static inspection only; no source builds, device/desktop execution, live APIs, downloads or publication checks. Source-declared release results are not independently verified here.
