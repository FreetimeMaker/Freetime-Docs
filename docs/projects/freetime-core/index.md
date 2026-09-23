# Freetime Core

Freetime Core is the shared, open-source Android library suite for Freetime Maker applications. The current release line is **1.10.x**. It centralizes reusable application infrastructure while consuming apps remain independently installable and do not require a Freetime account or Luma Store.

## Modules

| Module | Purpose |
| --- | --- |
| `Core` | Shared models, result types, preferences and lightweight Android utilities |
| `Design` | Standalone Freetime Compose design system, Liquid Glass, accessibility, layout and reusable controls |
| `Browser` | External and app-owned in-app URL routing |
| `Donations` | Donation models and reusable Compose UI built on Freetime Design |
| `FreetimeWarn` | Kotlin/Compose warning notices with mandatory app naming and persistent acknowledgement |

The repository also contains a `Sample` application demonstrating the modules together.

## Platform

- **Current release:** 1.10.1
- **Minimum SDK:** 24
- **Compile SDK:** 37
- **Kotlin:** 2.4.20
- **License:** GPL-3.0

## Freetime Design

Since 1.6, `Design` is its own Material-free UI foundation built with Compose UI/Foundation, Freetime tokens and Kyant Backdrop/Shapes. It owns its palette, typography, shapes, spacing, sizing, motion and glass tokens.

The 1.10 release substantially expands Liquid Glass. The effect now follows the interaction and optical behavior used by SimpMusic more closely while keeping **Freetime's own tintable glass colors**. It includes adaptive backdrop blur, vibrancy, saturation, refraction, dynamic scrims, press highlights, shadows, recorded-backdrop luminance sampling and spring-driven navigation interactions.

## App environment and accessibility

`FreetimeApp` can own a shared `FreetimePreferencesController`, making appearance changes immediately available throughout the composition. Persisted settings include system/light/dark/OLED/time-based themes, automatic light/dark hours, reduced motion, reduced transparency, high contrast, browser mode and whether Liquid Glass is enabled.

`FreetimeAccessibilitySettings()` can consume the controller supplied by `FreetimeApp` automatically.

## Layout and navigation

Freetime Design includes Material-free screen and navigation primitives such as `FreetimeScaffold`, tabs, floating action buttons, bottom sheets, adaptive bottom navigation/navigation rail and popup menus. The current bottom navigation uses a draggable Liquid Glass selection blob with spring snapping, velocity squash/stretch and press deformation.

## Principles

1. Consuming apps stay independently usable.
2. No mandatory Freetime account or Luma Store dependency.
3. Shared UI is not built on Material 3.
4. Dependencies remain open-source and F-Droid-friendly.
5. Shared infrastructure prefers callbacks and generic models over app-specific backends.

## Continue

- [Getting Started](/projects/freetime-core/getting-started)
- [Modules](/projects/freetime-core/modules)
- [Design & Liquid Glass](/projects/freetime-core/design)
- [FreetimeWarn](/projects/freetime-core/freetime-warn)
