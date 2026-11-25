---
title: GeoWeather
---

# GeoWeather

Forecasts, weather alerts and home-screen widgets for Android.

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/GeoWeather)

GeoWeather is a native Android weather app inspired by MeteoSwiss, with multiple saved locations, offline forecasts and optional alerts.

## Verified source baseline

| Setting | Inspected value |
| --- | --- |
| App version | **4.7.6** (code **95**) |
| Platform / package | Android API 26+ / `com.freetime.geoweather` |
| Compile / target SDK | 37.2 / 37 |
| Gradle wrapper / daemon / Kotlin output | 9.9.2 / JDK 21 / JVM 11 |
| Kotlin / AGP / KSP | 2.4.21 / 9.5.2 / **2.3.14** |
| Freetime libraries | **4.0.1** via JitPack (`com.github.FreetimeMaker.Freetime-Core`) |

Evidence: [version catalog](https://github.com/FreetimeMaker/GeoWeather/blob/dff41781a6a8d931eba003983cf6d436551093cd/gradle/libs.versions.toml) · [Android build](https://github.com/FreetimeMaker/GeoWeather/blob/dff41781a6a8d931eba003983cf6d436551093cd/app/build.gradle.kts) · [daemon criteria](https://github.com/FreetimeMaker/GeoWeather/blob/dff41781a6a8d931eba003983cf6d436551093cd/gradle/gradle-daemon-jvm.properties).

These are local source values, not verified channel versions.

## Choose your route

- [Getting Started](./getting-started.md): build, install and save your first location.
- [Installation & Build](./installation.md): distribution links and build targets.
- [Architecture](./architecture.md) and [Configuration](./configuration.md): data flow, persistence and app settings.
- [Troubleshooting](./troubleshooting.md): distinguish stale caches, service failures and notification restrictions.

## Current features

- multiple saved cities
- 16-day daily forecasts and an hourly view for the next 24 hours
- Celsius/Fahrenheit, km/h/mph and hPa/mmHg units
- weather alerts and notifications
- localization and integrated changelog
- Material You dynamic colors
- home-screen weather widgets

## Personalization and sharing

Startup choices are overview (the default), last viewed and current location, with a saved-location fallback when device location is unavailable. Legacy favorite startup values now fall back to overview. Compact and Detailed display modes control the amount of information shown.

The local day planner ranks two-hour windows for walking, running, cycling and gardening without an AI service. Weather cards can be shared as images with a timestamp/source, custom title and optional hidden location.

::: callout warning "Planner limitations"
The day planner is not safety advice. Suggestions are hidden when weather data is stale or incomplete.
:::

## Weather and widgets

The widget system now has four variants with responsive layouts, per-widget locations and improved configuration. Refresh work coordinates Open-Meteo requests, uses freshness checks and cached forecasts, and behaves better with offline/Data Saver conditions.

Day/night styling and forecast icons use each location's timezone and sunrise/sunset data. Obsolete weather-provider parsing was removed and Open-Meteo hourly/16-day validation was strengthened. The JSON location export preserves saved locations, their notification/change-alert settings and the default-location flag, while excluding rebuildable weather caches. It is not a full export of all application preferences.

::: callout info "Location export scope"
The JSON location export is not a full backup of application preferences and excludes rebuildable weather caches.
:::

## Android stack

- Kotlin 2.4.21 and Android Gradle Plugin 9.5.2
- Jetpack Compose (BOM 2026.11.01) and Material 3 1.5.0
- Freetime Core 4.0.1 (`com.github.FreetimeMaker.Freetime-Core` artifacts from JitPack)
- Room / SQLite
- Ktor
- Coil 3
- WorkManager
- AndroidX Glance for widgets

## Backend

The current app’s `ApiConstants` defines Open-Meteo weather endpoints, not subscription endpoints. The legacy `SubscriptionPlans` client expected `GET /v2/geoweather/subscriptions/plans`, but [commit `06843a925f67`](https://github.com/FreetimeMaker/GeoWeather/commit/06843a925f67937b41ab7433d6e7ded559a34143) removed that client together with accounts, code redemption and subscription lookup. Remaining strings/changelog entries do not establish active subscription support.

In the previously reviewed revision, the [All API](../all-api/index.md) source mounted no GeoWeather router in either [v1](https://github.com/FreetimeMaker/All-API-Node/blob/f743d19fd760a7a337e23e1af8ddff9fa1c3708b/src/v1/index.js) or [v2](https://github.com/FreetimeMaker/All-API-Node/blob/f743d19fd760a7a337e23e1af8ddff9fa1c3708b/src/v2/index.js). Historical client expectations are not evidence that plans, redemption or current-subscription endpoints are available; no successful subscription integration or live deployment is verified here.

## Distribution

The source lists GitHub Releases, F-Droid, OpenAPK, GitHub Store and Luma Store. See [Installation](./installation.md) for links and verification limits.

## Maintained next steps

- **Use:** complete the saved-location exercise, then configure units, startup behavior and each widget separately.
- **Develop:** keep Ktor response validation, forecast freshness and Room migration behavior explicit; use the [configuration example](./configuration.md#configuration-location-backup-api) for the actual backup boundary.
- **Validate later:** test alerts, widgets and foreground-service behavior on a prepared device; a configured interval is not delivery evidence.

## Source review

Reviewed **2026-11-25** in a temporary upstream clone at [`dff41781a6a8`](https://github.com/FreetimeMaker/GeoWeather/tree/dff41781a6a8d931eba003983cf6d436551093cd), compared with `e71504a34250`. Scope: version and dependency metadata, repository and AAR resolution rules, release notes, and the F-Droid build and signature checks. Static source inspection only; no builds, CI runs, production F-Droid checks or All API re-review.

Reviewed **2026-11-25** against the clean local [GeoWeather checkout at `e71504a34250`](https://github.com/FreetimeMaker/GeoWeather/tree/e71504a342503ee0148e731dbbafa0bb1bcbc59d), comparing it with `5a6b8d0c1fb4`. Scope: app/build metadata, dependency and wrapper pins, in-app and store release notes, localization changes, and the README’s Luma badge. The overview controls and hourly forecast window were spot-checked in source; their implementation did not change in this range. This was a static review, not an Android build, device test, live API check, distribution check or deployment review.

Reviewed **2026-11-20** against the clean local [GeoWeather checkout at `5a6b8d0c1fb4`](https://github.com/FreetimeMaker/GeoWeather/tree/5a6b8d0c1fb41a66aa9fd6efd61ddc32161d6533). Scope: Gradle/version metadata, settings/startup, forecast/planner/rain policy, location backup and notification configuration; legacy subscription-client removal and All-API-Node route mounts at `f743d19fd760a7a337e23e1af8ddff9fa1c3708b`. Existing architecture/feature context is retained. Static inspection only; no builds, device runs, live APIs, distribution downloads or website/deployment verification.
