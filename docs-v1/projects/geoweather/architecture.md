# Architecture

GeoWeather is a native Android application built around Jetpack Compose.

## UI

The UI uses Compose Material 3 together with the Liquid library. Dynamic Material You colors and time-aware light/dark presentation are handled by the application layer.

## Networking

Weather and backend requests use Ktor with the OkHttp engine and Kotlin serialization.

## Local data

Room and bundled SQLite provide persistent local storage. Multiplatform Settings is used for lightweight settings/preferences.

## Background features

WorkManager handles reliable background work. Glance is included for app-widget functionality.

## Images and async work

Coil with its Ktor networking integration handles image loading. Kotlin coroutines are used for asynchronous work.
