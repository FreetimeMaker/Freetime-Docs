---
title: GeoWeather
---

# GeoWeather

Forecasts, weather alerts and home-screen widgets for Android.

**Technologies:** Android, Compose, Weather

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/GeoWeather)

Version numbers below describe inspected source, not necessarily the latest published release.

## Find your starting point

- [Use the app](./getting-started.md) — Start with locations, forecasts and widgets.
- [Build from source](./installation.md) — Prepare the Android toolchain and run a build.
- [Explore the architecture](./architecture.md) — Understand weather data, storage and background work.

GeoWeather is a modern Android weather application inspired by MeteoSwiss.

The local Android build declares **4.7.3** (version code **92**), API 26 minimum and compile/target SDK 37.

**Source code:** [FreetimeMaker/GeoWeather](https://github.com/FreetimeMaker/GeoWeather)

## Current features

- multiple saved cities
- 16-day forecasts with hourly weather data
- Celsius/Fahrenheit, km/h/mph and hPa/mmHg units
- weather alerts and notifications
- localization and integrated changelog
- Material You dynamic colors
- home-screen weather widgets

## Inside the app

Saved locations keep several cities within reach. This image is from the project's Fastlane metadata, not a capture of the current build.

The referenced screenshot is not included in this documentation checkout. See the [project repository](https://github.com/FreetimeMaker/GeoWeather) for source screenshots; these may differ from the current interface.

## Personalization and sharing

Startup choices include favorite, last viewed, overview and current location, with a saved-location fallback when device location is unavailable. Compact and Detailed display modes control the amount of information shown.

The local day planner ranks two-hour windows for walking, running, cycling and gardening without an AI service. Suggestions are hidden for stale or incomplete data and are not safety advice. Weather cards can be shared as images with a timestamp/source, custom title and optional hidden location.

::: callout warning Planner limitations
The day planner is not safety advice. Suggestions are hidden when weather data is stale or incomplete.
:::

## Weather and widgets

The widget system now has four variants with responsive layouts, per-widget locations and improved configuration. Refresh work coordinates Open-Meteo requests, uses freshness checks and cached forecasts, and behaves better with offline/Data Saver conditions.

Day/night styling and forecast icons use each location's timezone and sunrise/sunset data. Obsolete weather-provider parsing was removed and Open-Meteo hourly/16-day validation was strengthened. The JSON location export preserves saved locations, their notification/change-alert settings and the default-location flag, while excluding rebuildable weather caches. It is not a full export of all application preferences.

::: callout info Location export scope
The JSON location export is not a full backup of application preferences and excludes rebuildable weather caches.
:::

## Android stack

- Kotlin 2.4.21 and Android Gradle Plugin 9.5.1
- Jetpack Compose and Material 3
- Freetime Core 3.0.0 (the version currently pinned by this app)
- Room / SQLite
- Ktor
- Coil 3
- WorkManager
- AndroidX Glance for widgets

## Backend

GeoWeather backend functionality is part of [All API](../all-api/index.md), including subscription plans, code redemption and current-subscription lookup.

## Distribution

GeoWeather is distributed through GitHub Releases, F-Droid-compatible channels and Luma Store.

## Source review

Last checked against source: **2026-11-12**.

**Review scope:** Setup, prerequisites and troubleshooting.

This manually maintained, scoped review is independent of page edits and documentation builds. It does not certify every page, build results, published artifacts or live services. The listed source checkouts were clean when inspected.

### GeoWeather

Inspected revision: [`74c21ab67e7357b3f1dc5797e17f175fa3d2b348`](https://github.com/FreetimeMaker/GeoWeather/tree/74c21ab67e7357b3f1dc5797e17f175fa3d2b348).

- [`settings.gradle.kts`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/settings.gradle.kts)
- [`app/build.gradle.kts`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/app/build.gradle.kts)
- [`gradle/libs.versions.toml`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/gradle/libs.versions.toml)
- [`gradle/gradle-daemon-jvm.properties`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/gradle/gradle-daemon-jvm.properties)
- [`app/src/main/AndroidManifest.xml`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/app/src/main/AndroidManifest.xml)
- [`app/src/main/java/com/freetime/geoweather/ui/SearchScreen.kt`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/app/src/main/java/com/freetime/geoweather/ui/SearchScreen.kt)
- [`app/src/main/java/com/freetime/geoweather/ui/OnboardingScreen.kt`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/app/src/main/java/com/freetime/geoweather/ui/OnboardingScreen.kt)
- [`app/src/main/java/com/freetime/geoweather/data/WeatherApiClient.kt`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/app/src/main/java/com/freetime/geoweather/data/WeatherApiClient.kt)
- [`app/src/main/java/com/freetime/geoweather/data/WeatherRepository.kt`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/app/src/main/java/com/freetime/geoweather/data/WeatherRepository.kt)
- [`app/src/main/java/com/freetime/geoweather/data/Backup.kt`](https://github.com/FreetimeMaker/GeoWeather/blob/74c21ab67e7357b3f1dc5797e17f175fa3d2b348/app/src/main/java/com/freetime/geoweather/data/Backup.kt)
