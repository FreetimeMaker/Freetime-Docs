# Android client

The Luma Store Android application is the native mobile store client.

## Platform

- Application ID: `com.freetime.lumastore`
- Minimum SDK: 24
- Target/compile SDK line: 37
- Kotlin 2.4.20
- Jetpack Compose
- Freetime Core/Design dependency line currently configured as 1.9.1 in the app catalog

## UI

The app uses Compose and is adopting reusable Freetime Core/Design components for its shared visual language, including Freetime's Liquid Glass direction. New shared UI should prefer Freetime Core rather than duplicating app-local components.

## Sources

The Android client can combine Luma Store data with F-Droid-compatible/community repositories. Source retrieval, parsing and filtering are client responsibilities; Luma-specific developer and published-app metadata comes from the backend.

## Store data

For Luma Store-specific catalog data, the current All API v2 contract provides normalized app/platform data and ratings. Platform rows can carry download URL, file size and package-format metadata.

## Images

Remote application icons and screenshots are loaded by the client. A missing image should not make the rest of an app listing unusable.

## Build

```bash
./gradlew assembleDebug
```

For release work, use the repository's configured Gradle/CI release flow rather than manually changing generated artifacts.
