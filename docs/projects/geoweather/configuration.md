# Configuration

## Android and build toolchain

The local 4.7.6 build uses application ID `com.freetime.geoweather`, minimum API 26, compile SDK 37.2 and target SDK 37. Gradle daemon criteria request JDK 21; Kotlin output targets JVM 11. The bytecode target is not the JDK requirement for running Gradle.

The wrapper uses Gradle 9.9.2. The version catalog pins Kotlin 2.4.21, AGP 9.5.2, KSP 2.3.14 and Freetime Core 4.0.1. The build uses JitPack only for `com.github.FreetimeMaker.Freetime-Core`; other dependencies use Google Maven and Maven Central. In [`settings.gradle.kts`](https://github.com/FreetimeMaker/GeoWeather/blob/dff41781a6a8d931eba003983cf6d436551093cd/settings.gradle.kts), a version-scoped rule corrects the Android API and runtime AAR filenames to include `-android` for the six Freetime 4.0.1 modules, preserving Gradle module metadata and transitive dependencies.

## User settings

Startup and display settings choose overview (the default), last viewed location or current location, and Compact or Detailed presentation. Legacy `favorite` startup values now fall back to overview. Unit preferences cover temperature, wind and pressure. Location notification settings and smart rain alerts control alert delivery, including quiet hours.

The persistent weather notification is a separate opt-in setting requiring Android notification permission and an enabled notification channel. Freetime notification settings independently control Updates, Changelogs and Developer messages; their configuration requests a 15-minute check interval and a silent first-check baseline, not immediate delivery.

## Networking and persistence

Open-Meteo endpoint definitions live in `ApiConstants`; Ktor requests and forecast parsing belong in the data layer. Room stores structured records and snapshots, while the settings layer stores preferences. Schema changes need a deliberate migration strategy.

## Background execution

WorkManager and Glance support scheduled weather work and widgets. Refreshes must account for connectivity, cached-data freshness and Android background restrictions. Alert and refresh intervals are not exact delivery guarantees.

## Location backup API

The following in-app Kotlin fragment uses the actual `data/Backup.kt` functions. `locations` is the caller’s existing `List<LocationEntity>`; parsing returns entities for the host to validate and persist, not a database restore by itself.

```kotlin
import com.freetime.geoweather.data.LocationEntity
import com.freetime.geoweather.data.exportLocationsJson
import com.freetime.geoweather.data.parseLocationsBackup

fun roundTripLocations(locations: List<LocationEntity>): List<LocationEntity> {
    val json = exportLocationsJson(locations)
    return parseLocationsBackup(json)
}
```

Format version 1 stores name, latitude/longitude, notification enable/time, change-alert enable/interval and default-location flag. It excludes application preferences and forecast caches. Malformed JSON or a missing `locations` array throws; invalid entries are skipped, so compare the parsed count before writing. Android file selection is host-registered through `registerFilePickers`; serialization alone does not launch a picker or save a file.

[Backup source](https://github.com/FreetimeMaker/GeoWeather/blob/5a6b8d0c1fb41a66aa9fd6efd61ddc32161d6533/app/src/main/java/com/freetime/geoweather/data/Backup.kt) · [Version catalog](https://github.com/FreetimeMaker/GeoWeather/blob/dff41781a6a8d931eba003983cf6d436551093cd/gradle/libs.versions.toml)
