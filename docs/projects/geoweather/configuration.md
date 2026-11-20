# Configuration

## Android and build toolchain

The local 4.7.3 build uses application ID `com.freetime.geoweather`, minimum API 26 and compile/target SDK 37. Gradle daemon criteria request JDK 21; Kotlin output targets JVM 11. The bytecode target is not the JDK requirement for running Gradle.

The version catalog pins Kotlin 2.4.21, AGP 9.5.1, KSP 2.3.13 and Freetime Core 3.2.0. Freetime artifacts use the `com.freetime` group and resolve from `https://repo.free-time.me/maven/`; JitPack has been removed.

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

[Backup source](https://github.com/FreetimeMaker/GeoWeather/blob/5a6b8d0c1fb41a66aa9fd6efd61ddc32161d6533/app/src/main/java/com/freetime/geoweather/data/Backup.kt) · [Build/catalog](https://github.com/FreetimeMaker/GeoWeather/blob/5a6b8d0c1fb41a66aa9fd6efd61ddc32161d6533/gradle/libs.versions.toml)
