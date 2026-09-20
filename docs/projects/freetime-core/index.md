# Freetime Core

Freetime Core is the shared Android library suite for Freetime Maker applications. It keeps common design, update, browser and donation behavior reusable while consuming apps remain independently installable and usable.

## Modules

| Artifact | Purpose |
| --- | --- |
| `freetime-core` | Common models, results and lightweight utilities |
| `freetime-design` | Material You and Freetime's Liquid Glass design system |
| `freetime-updater` | Source-agnostic application update checking |
| `freetime-browser` | External and in-app URL routing |
| `freetime-donations` | Donation models and reusable Compose UI |

## Platform

Freetime Core is built as a set of Android libraries.

- **Minimum SDK:** 24
- **Compile SDK:** 37
- **Kotlin:** 2.4.10
- **Group:** `me.free-time`
- **License:** GPL-3.0

## Design principles

The libraries are designed so that consuming applications remain independent. Freetime Core does not require a Freetime account or Luma Store, and shared integrations use interfaces and callbacks instead of forcing a specific backend.

The Design module follows Material color roles and provides the current Freetime/GeoWeather Liquid Glass system.

## Continue

- [Getting Started](/projects/freetime-core/getting-started)
- [Modules](/projects/freetime-core/modules)
