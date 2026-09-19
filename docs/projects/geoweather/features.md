# Features

GeoWeather is a native Android weather application.

## Forecasts

The app presents current and forecast weather data through Compose screens. Network data is retrieved through Ktor and serialized into application models before being rendered.

## Locations

Users can work with configured locations/cities. Persistent data belongs in the Room-backed data layer rather than being tied to individual Compose screens.

## Appearance

The UI uses Material 3, Material You dynamic colors and Liquid surfaces. Theme selection can adapt between light and dark presentation.

## Widgets and background work

Android Glance provides app-widget support. WorkManager is used where weather-related work must continue reliably outside an active screen.

## Images

Coil handles asynchronous image loading and integrates with the Ktor networking stack.

## Offline/local state

Room with bundled SQLite stores persistent local data, while lightweight preferences use the settings layer.
