# Android client

The Luma Store Android app is the primary mobile store client.

## Platform

- Application ID: `com.freetime.lumastore`
- Minimum SDK: 24
- Target SDK: 37
- Jetpack Compose UI
- Java 11 compatibility

## UI

The app uses Material 3 and the Liquid library. Compose is used throughout the application rather than XML-based screens.

## Store sources

Luma Store can aggregate F-Droid-compatible and custom sources. Source state and filtering belong to the client experience, while Luma Store-specific developer/app metadata comes from the backend.

## Backend integration

The Android client uses the Supabase Kotlin SDK for PostgREST and authentication. Ktor Android provides HTTP transport for additional network operations.

## Images

Coil 3 with the OkHttp network integration is used for remote images such as application icons and screenshots.

## Build

```bash
./gradlew assembleDebug
```

The project currently contains one Android `:app` module.
