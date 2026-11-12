# Features

GeoWeather is a native Android weather app. The local build version is 4.7.3.

## Forecasts and locations

- Save multiple cities and search by name or coordinates.
- View current conditions, hourly data and a 16-day Open-Meteo forecast.
- Switch Celsius/Fahrenheit, km/h/mph and hPa/mmHg units.
- Read saved forecasts offline with their update timestamp; offline data is not a new forecast.

## Startup and display

In **Settings → Startup and display**, choose the favorite location, last viewed location, overview or current location. Favorite/first saved location is the default; Back opens the overview. Current location falls back to saved data when device location is unavailable.

Compact mode emphasizes essentials; Detailed mode adds analyses. The UI uses Material 3, Material You and Freetime Core 3.0.0 theme/navigation integration, rather than a standalone Liquid component library.

## Local day planner

The planner summarizes today and ranks consecutive two-hour windows for walking, running, cycling and gardening. It uses local forecast heuristics, not an AI service. Recommendations are hidden when data is older than two hours or required inputs are missing. They are not safety advice.

## Alerts

Weather notifications and smart rain alerts depend on location notification settings. Rain alerts use hourly forecast windows, respect quiet hours and apply a three-hour cooldown per location. Android background scheduling and forecast resolution do not guarantee an exact rain-start notification.

## Widgets

Glance provides Responsive, Compact, Forecast and Detailed widget variants, with per-widget location settings. WorkManager coordinates refreshes; cached forecasts remain useful when fresh data cannot be fetched.

## Sharing and backup

Share a weather card as an image with its data timestamp and source. The share dialog supports a custom title and hiding the location before opening Android's share sheet.

JSON backup/restore preserves saved locations, their notification/change-alert settings and the default-location flag. It excludes rebuildable weather caches and is not a full application-preferences backup. Room and bundled SQLite hold structured local data; Multiplatform Settings handles lightweight preferences.
