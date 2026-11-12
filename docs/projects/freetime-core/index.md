---
title: Freetime Core
---

<ProjectHeader project="freetime-core" />

## Find your starting point

<ProjectPaths project="freetime-core" />

Freetime Core is the shared, open-source Android library suite for Freetime Maker applications. The local source declares version **3.1.0**.

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

| Module         | Purpose                                                                               |
| -------------- | ------------------------------------------------------------------------------------- |
| `Core`         | Shared models, results, SDK metadata and Android helpers                              |
| `Design`       | Material 3 Expressive/Material You theme helpers and floating bottom-navigation glass |
| `Browser`      | External and in-app URL routing and browser UI                                        |
| `Donations`    | Donation targets, wallet helpers and Compose donation UI                              |
| `FreetimeWarn` | Reusable acknowledgement/warning flow                                                 |
| `Sample`       | Example application                                                                   |

## 3.0 migration

::: warning Migrating from 2.x
Generic 2.x Liquid Glass APIs such as `Modifier.liquidGlass()`, `LiquidGlassContainer`, `LiquidGlassIconButton` and `LiquidGlassRoot` are no longer the supported UI direction. Apps should use Material 3 directly for normal surfaces and `FloatingBottomNavigationGlassRoot` with `FloatingBottomNavigationBar` for the floating navigation.
:::

The floating bar follows the SimpMusic-style layout with a capsule container, sliding frosted selection pill and optional separate circular search action.

## Installation

The current publishing configuration uses Gemfury with repository `https://repo.free-time.me/maven/` and Maven group `com.freetime`. See [Getting Started](./getting-started) for repository setup and migration from JitPack.

```kotlin
implementation("com.freetime:Core:3.1.0")
implementation("com.freetime:Design:3.1.0")
implementation("com.freetime:Browser:3.1.0")
implementation("com.freetime:Donations:3.1.0")
implementation("com.freetime:FreetimeWarn:3.1.0")
```

## Theme templates in 3.1.0

Design includes classic Material 3 and Expressive templates with separate color, typography, shape and theme files. Apps can copy and customize these without Liquid Glass; Material You is opt-in. The existing root `AppTheme` keeps its behavior.

## Continue

- [Getting Started](/projects/freetime-core/getting-started)
- [Modules](/projects/freetime-core/modules)
- [Design & Liquid Glass](/projects/freetime-core/design)
- [FreetimeWarn](/projects/freetime-core/freetime-warn)
