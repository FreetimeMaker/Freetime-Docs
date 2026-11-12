# Configuration

## Android and build toolchain

The local 4.7.3 build uses application ID `com.freetime.geoweather`, minimum API 26 and compile/target SDK 37. Gradle daemon criteria request JDK 21; Kotlin output targets JVM 11. The bytecode target is not the JDK requirement for running Gradle.

The version catalog pins Kotlin 2.4.21, AGP 9.5.1 and Freetime Core 3.0.0. This app still resolves its Core artifacts from JitPack; do not confuse that with Core 3.1.0's newer Maven publishing configuration.

## User settings

Startup and display settings choose the initial location/overview and Compact or Detailed presentation. Unit preferences cover temperature, wind and pressure. Location notification settings and smart rain alerts control alert delivery, including quiet hours.

## Networking and persistence

Open-Meteo endpoint definitions live in `ApiConstants`; Ktor requests and forecast parsing belong in the data layer. Room stores structured records and snapshots, while the settings layer stores preferences. Schema changes need a deliberate migration strategy.

## Background execution

WorkManager and Glance support scheduled weather work and widgets. Refreshes must account for connectivity, cached-data freshness and Android background restrictions. Alert and refresh intervals are not exact delivery guarantees.
