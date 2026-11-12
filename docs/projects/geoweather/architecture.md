# Architecture

GeoWeather is a native Android app with one Gradle module, `:app`, under package `com.freetime.geoweather`.

## UI and state

Jetpack Compose and Material 3 render weather, location, settings and radar screens. ViewModels expose screen state. The app pins Freetime Core 3.0.0 for shared Core, Design, Browser, Donations and FreetimeWarn functionality; this is separate from the library repository's newer 3.1.0 version.

## Networking

`WeatherApiClient`, `WeatherRepository` and `OpenMeteoForecastParser` handle retrieval and parsing through Ktor, Kotlin serialization and the OkHttp engine dependency. `ApiConstants` defines Open-Meteo forecast, geocoding, reverse-geocoding, archive and air-quality endpoints. The stack is Ktor, not the Retrofit stack still mentioned in the upstream README.

## Local data

Room with bundled SQLite stores locations, weather history and forecast snapshots. Multiplatform Settings provides lightweight preferences. JSON backup helpers export saved locations, per-location notification/change-alert settings and the default-location flag, not all app preferences or rebuildable forecast caches.

## Background and widgets

WorkManager workers handle notifications, weather-change work and widget refreshes. Glance renders four widget variants; widget preferences and a configuration activity select their locations. Android scheduling restrictions still apply.

## Local calculations and sharing

`WeatherDayPlanner` scores activity windows locally. `RainAlertPolicy` defines forecast-window selection and cooldown rules. Weather-share composables and their dialog generate a card for Android sharing.

## Supporting libraries

Coroutines coordinate asynchronous work, Coil 3 with Ktor integration loads images, and osmdroid supports map UI.
