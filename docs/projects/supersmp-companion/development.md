# Development

## Android configuration

SuperSMP Companion is a native Android application.

- Application ID: `com.freetime.ssmpc`
- Minimum SDK: 26
- Target SDK: 37
- Java/JVM target: 17

## UI

Jetpack Compose and Material 3 provide the primary UI. The Liquid library is used for glass-style surfaces.

## Data and networking

Ktor with OkHttp is used for network access and Kotlin serialization. Room provides local persistence.

## Background work

WorkManager is included for reliable scheduled/background tasks.

## Release optimization

Release builds enable code minification and resource shrinking with Android's optimized ProGuard defaults plus project-specific rules.

## Build

```bash
./gradlew assembleDebug
```
