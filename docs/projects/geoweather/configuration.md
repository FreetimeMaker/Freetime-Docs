# Configuration

## Android and build toolchain

The local 4.7.3 build uses application ID `com.freetime.geoweather`, minimum API 26 and compile/target SDK 37. Gradle daemon criteria request JDK 21; Kotlin output targets JVM 11. The bytecode target is not the JDK requirement for running Gradle.

The version catalog pins Kotlin 2.4.21, AGP 9.5.1, KSP 2.3.14 and Freetime Core 3.2.0. Freetime artifacts use the `com.freetime` group and resolve from `https://repo.free-time.me/maven/`; JitPack has been removed.

## User settings

Startup and display settings choose overview (the default), last viewed location or current location, and Compact or Detailed presentation. Legacy `favorite` startup values now fall back to overview. Unit preferences cover temperature, wind and pressure. Location notification settings and smart rain alerts control alert delivery, including quiet hours.

The persistent weather notification is a separate opt-in setting requiring Android notification permission and an enabled notification channel. Freetime notification settings independently control Updates, Changelogs and Developer messages; their configuration requests a 15-minute check interval and a silent first-check baseline, not immediate delivery.

## Networking and persistence

Open-Meteo endpoint definitions live in `ApiConstants`; Ktor requests and forecast parsing belong in the data layer. Room stores structured records and snapshots, while the settings layer stores preferences. Schema changes need a deliberate migration strategy.

## Background execution

WorkManager and Glance support scheduled weather work and widgets. Refreshes must account for connectivity, cached-data freshness and Android background restrictions. Alert and refresh intervals are not exact delivery guarantees.
