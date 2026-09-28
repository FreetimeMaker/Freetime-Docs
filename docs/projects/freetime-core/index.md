# Freetime Core

Freetime Core is the shared, open-source Android library suite for Freetime Maker applications. The current release is **3.0.0**.

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

| Module | Purpose |
| --- | --- |
| `Core` | Shared models, results, SDK metadata and Android helpers |
| `Design` | Material 3 Expressive/Material You theme helpers and floating bottom-navigation glass |
| `Browser` | External and in-app URL routing and browser UI |
| `Donations` | Donation targets, wallet helpers and Compose donation UI |
| `FreetimeWarn` | Reusable acknowledgement/warning flow |
| `Sample` | Example application |

## 3.0 migration

Generic 2.x Liquid Glass APIs such as `Modifier.liquidGlass()`, `LiquidGlassContainer`, `LiquidGlassIconButton` and `LiquidGlassRoot` are no longer the supported UI direction. Apps should use Material 3 directly for normal surfaces and `FloatingBottomNavigationGlassRoot` with `FloatingBottomNavigationBar` for the floating navigation.

The floating bar follows the SimpMusic-style layout with a capsule container, sliding frosted selection pill and optional separate circular search action.

## Installation

Freetime Core is distributed as JitPack multi-module artifacts:

```kotlin
implementation("com.github.FreetimeMaker.Freetime-Core:Core:3.0.0")
implementation("com.github.FreetimeMaker.Freetime-Core:Design:3.0.0")
implementation("com.github.FreetimeMaker.Freetime-Core:Browser:3.0.0")
implementation("com.github.FreetimeMaker.Freetime-Core:Donations:3.0.0")
implementation("com.github.FreetimeMaker.Freetime-Core:FreetimeWarn:3.0.0")
```

## Continue

- [Getting Started](/projects/freetime-core/getting-started)
- [Modules](/projects/freetime-core/modules)
- [Design & Liquid Glass](/projects/freetime-core/design)
- [FreetimeWarn](/projects/freetime-core/freetime-warn)
