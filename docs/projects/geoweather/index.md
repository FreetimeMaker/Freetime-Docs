---
title: GeoWeather
---

<ProjectHeader project="geoweather" />

## Find your starting point

<ProjectPaths project="geoweather" />

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

<ProjectScreenshot src="/img/projects/geoweather-locations.jpg" alt="GeoWeather saved-location list with city names, coordinates, remove controls and an add button." caption="Saved locations keep several cities within reach. This image is from the project's Fastlane metadata, not a capture of the current build." />

## Personalization and sharing

Startup choices include favorite, last viewed, overview and current location, with a saved-location fallback when device location is unavailable. Compact and Detailed display modes control the amount of information shown.

The local day planner ranks two-hour windows for walking, running, cycling and gardening without an AI service. Suggestions are hidden for stale or incomplete data and are not safety advice. Weather cards can be shared as images with a timestamp/source, custom title and optional hidden location.

::: warning Planner limitations
The day planner is not safety advice. Suggestions are hidden when weather data is stale or incomplete.
:::

## Weather and widgets

The widget system now has four variants with responsive layouts, per-widget locations and improved configuration. Refresh work coordinates Open-Meteo requests, uses freshness checks and cached forecasts, and behaves better with offline/Data Saver conditions.

Day/night styling and forecast icons use each location's timezone and sunrise/sunset data. Obsolete weather-provider parsing was removed and Open-Meteo hourly/16-day validation was strengthened. The JSON location export preserves saved locations, their notification/change-alert settings and the default-location flag, while excluding rebuildable weather caches. It is not a full export of all application preferences.

::: info Location export scope
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

GeoWeather backend functionality is part of [All API](/projects/all-api/), including subscription plans, code redemption and current-subscription lookup.

## Distribution

GeoWeather is distributed through GitHub Releases, F-Droid-compatible channels and Luma Store.
