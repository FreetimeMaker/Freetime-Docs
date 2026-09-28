# GeoWeather

GeoWeather is a modern Android weather application inspired by MeteoSwiss.

**Repository:** [FreetimeMaker/GeoWeather](https://github.com/FreetimeMaker/GeoWeather)

## Current features

- multiple saved cities
- 16-day forecasts with hourly weather data
- Celsius/Fahrenheit, km/h/mph and hPa/mmHg units
- weather alerts and notifications
- localization and integrated changelog
- Material You dynamic colors
- home-screen weather widgets

## Recent weather and widget work

The widget system now has four variants with responsive layouts, per-widget locations and improved configuration. Refresh work coordinates Open-Meteo requests, uses freshness checks and cached forecasts, and behaves better with offline/Data Saver conditions.

Day/night styling and forecast icons use each location's timezone and sunrise/sunset data. Obsolete weather-provider parsing was removed and Open-Meteo hourly/16-day validation was strengthened. Backup/restore now preserves settings and saved locations while excluding rebuildable weather caches.

## Android stack

- Kotlin 2.4.20
- Jetpack Compose and Material 3
- Freetime Core 2.0.0
- Room / SQLite
- Ktor
- Coil 3
- WorkManager
- AndroidX Glance for widgets

## Backend

GeoWeather backend functionality is part of [All API](/projects/all-api/), including subscription plans, code redemption and current-subscription lookup.

## Distribution

GeoWeather is distributed through GitHub Releases, F-Droid-compatible channels and Luma Store.
