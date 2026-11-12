# Troubleshooting

Expected results below are source-based diagnostic targets, not executed build or live-service checks. Run checkout commands from the GeoWeather repository root. Optional curl checks contact Open-Meteo from your computer; they do not test the Android device's network or the full forecast parser.

## Weather data does not load

**Check:** confirm device connectivity, inspect the forecast update timestamp, and separate Ktor/HTTP errors from forecast-parser validation. For an independent connectivity check, if curl is available:

```bash
curl --fail --show-error --location --max-time 30 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&timezone=auto'
```

**Expected:** HTTP success with JSON containing current temperature data. This minimal request does not validate every field requested by the app. In-app refresh should advance the saved update timestamp; a visible saved forecast alone may be cached.

**Fix:** resolve connectivity, DNS/TLS or upstream HTTP failures first. If HTTP succeeds but the app rejects data, inspect `data/WeatherApiClient.kt` and `data/OpenMeteoForecastParser.kt` for the failing response/field rather than clearing saved locations. Do not treat stale content as proof of a successful refresh.

## City search is empty

**Check:** try a plain city name such as Berlin and verify the device is online. Optionally check geocoding separately:

```bash
curl --fail --show-error --location --max-time 30 'https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=5&language=en&format=json'
```

**Expected:** a JSON `results` array for that query; the UI lists names with region/country or coordinates. Search availability is separate from forecast availability.

**Fix:** correct the query, choose the intended region, and investigate the geocoding response if it is missing or rejected. A successful desktop request does not establish device connectivity.

## Planner suggestions are missing

**Check:** inspect the location's update time, timezone and required hourly forecast inputs. `WeatherDayPlanner.kt` rejects stale/future-dated timestamps and invalid zones; eligible windows also need suitable consecutive forecast hours and a sufficient score.

**Expected:** data older than two hours is stale, and even fresh data need not produce a recommended window. Missing required inputs can prevent suggestions.

**Fix:** refresh the location and check device time/timezone and the returned forecast zone. If valid fresh data still yields no suitable window, absence of a suggestion is not necessarily a UI failure or something a reset can fix.

## Rain alerts or widgets are delayed

**Check:** verify Android notification permission, location notification settings, smart rain alerts, quiet hours and each widget's own location. Check background restrictions, offline status and Data Saver too.

**Expected:** rain alerts have a three-hour per-location cooldown; configured quiet hours suppress them from 22:00 to 07:00 in the device's local hour. Widget location selection is independent. Hourly forecast data cannot promise an exact rain-start time.

**Fix:** enable the relevant permission/settings and correct widget location selection. Adjust OS background restrictions only if appropriate for the device; do not bypass cooldowns or interpret forecast timing as a delivery guarantee.

## Local data behaves unexpectedly

**Check:** inspect Room/bundled SQLite migration and persistence errors before clearing app data. Compare a JSON export's locations and their notification/change-alert/default settings with the saved list.

**Expected:** the export preserves those location settings, not every application preference or rebuildable weather cache.

**Fix:** preserve an export before destructive changes. Diagnose failed migration/writes rather than assuming import restores all settings; configure application-level preferences separately after restoring locations.

## Build fails

**Check:** inspect the toolchain and dependency pins without starting a build:

```bash
java -version
cat gradle/gradle-daemon-jvm.properties
cat gradle/libs.versions.toml
cat settings.gradle.kts
```

**Expected:** daemon criteria request JDK 21, the app compiles with SDK 37 and targets JVM 11, and Freetime Core 3.0.0 resolves through JitPack. `java -version` shows the launcher, not necessarily Gradle's selected daemon. SDK 26+ is required on the device.

**Fix:** use the repository wrapper with SDK 37 configured and JDK 21 available. Distinguish repository/dependency-resolution failures from compiler errors. Do not silently replace the pinned Core dependency with 3.1.0 or change the JVM target to match the daemon version.

Return to [Getting Started](./getting-started.md) or see [Installation & Build](./installation.md).
