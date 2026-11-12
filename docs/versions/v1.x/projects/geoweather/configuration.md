# Configuration

## Android SDK

GeoWeather compiles and targets Android SDK 37 and supports devices from API 26.

## Networking

Ktor is the primary HTTP client. Keep service URLs and request behavior in the networking/data layer rather than embedding them in Compose UI.

## Persistence

Room is used for structured persistent data. Schema changes should include a deliberate migration strategy.

## Preferences

Lightweight application preferences use the settings layer. UI code should consume settings through application state rather than duplicating persistence logic.

## Background execution

Use WorkManager for deferrable reliable work and Glance for widgets. Android background restrictions should be considered when choosing refresh intervals.
