# Installation & Build

## Requirements

GeoWeather is an Android application with a minimum SDK of 26 and a target/compile SDK of 37. The project uses JVM 11 bytecode.

## Build from source

Clone the GeoWeather repository and build the Android app with the Gradle wrapper:

```bash
./gradlew assembleDebug
```

On Windows:

```powershell
.\gradlew.bat assembleDebug
```

Release builds are produced through the project's Gradle and CI configuration.

## Project layout

GeoWeather currently consists of a single Android `:app` module. There is no shared multiplatform module in the current project configuration.
