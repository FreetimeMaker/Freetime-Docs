---
title: Freetime Core
---

# Freetime Core

Modular Kotlin Multiplatform building blocks for Android and desktop JVM applications. Adopt only the libraries you need; no Freetime account or Luma Store installation is required. The project uses open-source dependencies and is licensed under [GPL-3.0](https://github.com/FreetimeMaker/Freetime-Core/blob/1d064fa4a515ed331a52df723a5544907d5a4f10/LICENSE).

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/Freetime-Core)

## Verified source baseline

| Setting                             | Inspected value                                                     |
| ----------------------------------- | ------------------------------------------------------------------- |
| Library version                     | **4.0.2** (KMP release line; replaces Android-only 3.2.0)                 |
| Platforms                           | Android API 24+ and desktop JVM; no supported iOS/web targets       |
| Android compile / sample target SDK | 37 / 37                                                             |
| Toolchain                           | Gradle wrapper 9.9.2; Gradle daemon JDK 25; JVM toolchain/output 17 |
| Android Compose catalog pins        | Compose BOM 2026.11.01; Material 3 1.5.0                            |
| Plugins                             | Kotlin 2.4.21, AGP 9.5.2, Compose Multiplatform 1.12.2              |
| Android sample                      | `:Sample-android`, version code 7                                   |

Evidence: [version catalog](https://github.com/FreetimeMaker/Freetime-Core/blob/1d064fa4a515ed331a52df723a5544907d5a4f10/gradle/libs.versions.toml) · [Android build](https://github.com/FreetimeMaker/Freetime-Core/blob/1d064fa4a515ed331a52df723a5544907d5a4f10/Sample/androidApp/build.gradle.kts) · [wrapper properties](https://github.com/FreetimeMaker/Freetime-Core/blob/1d064fa4a515ed331a52df723a5544907d5a4f10/gradle/wrapper/gradle-wrapper.properties) · [daemon criteria](https://github.com/FreetimeMaker/Freetime-Core/blob/1d064fa4a515ed331a52df723a5544907d5a4f10/gradle/gradle-daemon-jvm.properties).

::: callout warning "Publication is not verified"
4.0.2 is the current source version, not a confirmed public download. The source build stages locally and does not upload to Maven. The upstream [changelog](https://github.com/FreetimeMaker/Freetime-Core/blob/1d064fa4a515ed331a52df723a5544907d5a4f10/CHANGELOG.md) describes versions below 4.0.1 as unsupported and JitPack-only; their availability was not checked. Do not use 4.0.0: the upstream Notifications guide still reports an incomplete Maven upload. Use the local samples until a complete publication is verified.
:::

## Choose a module

| Module                      | Purpose                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| `Core`                      | Models, results, SDK metadata and platform preferences                  |
| `Design`                    | Expressive theme, Material You on Android and floating navigation glass |
| `Browser`                   | URL routing; Android WebView or desktop external-browser action         |
| `Donations`                 | Donation UI, wallet and clipboard helpers; host-owned QR encoding       |
| `FreetimeWarn`              | Configurable warning UI and persistent acknowledgements                 |
| `Notifications`             | Local GitHub/F-Droid update, changelog and developer-blog polling       |
| `Sample` / `Sample-android` | Shared sample/desktop entry point and thin Android host                 |

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

On **2026-11-25**, inspected GitHub’s diff from the clean local baseline [`768805c77acf`](https://github.com/FreetimeMaker/Freetime-Core/tree/768805c77acf06d680226d59d00ddd4b4c8e499b) to the requested remote commit [`1d064fa4a515`](https://github.com/FreetimeMaker/Freetime-Core/tree/1d064fa4a515ed331a52df723a5544907d5a4f10) and read the remote build script at that revision. This follow-up covered release and toolchain metadata, the Browser sample, publishing code and tests, and upstream documentation. The earlier local diff review from `2bb88da626d8` to `768805c77acf` on the same date covered the wrapper, Compose catalog pins, license, and changelog. The broader sample, migration, design, and module review was performed on **2026-11-20** at `2bb88da626d8`.

Static inspection only: no source builds, device or desktop execution, live product API requests, artifact downloads, or publication checks. Upstream-reported build and release results were not independently verified.
