# Installation & Build

## Install the app

The project README links to [GitHub Releases](https://github.com/FreetimeMaker/GeoWeather/releases/latest), [F-Droid](https://f-droid.org/packages/com.freetime.geoweather), OpenAPK, GitHub Store and Luma Store. The Android package is `com.freetime.geoweather`; the local source requires API 26+.

## Build requirements

- Android SDK 37 for compilation and targeting
- JDK 21 for the Gradle daemon, as requested by `gradle/gradle-daemon-jvm.properties`
- The repository's Gradle wrapper; the local catalog pins AGP 9.5.1 and Kotlin 2.4.21

Kotlin emits JVM 11 bytecode. This does not mean Gradle runs on JDK 11.

## Build from source

```bash
git clone https://github.com/FreetimeMaker/GeoWeather.git
cd GeoWeather
./gradlew :app:assembleDebug
```

On Windows, run `.\gradlew.bat :app:assembleDebug` from the cloned repository. The standard APK output is under `app/build/outputs/apk/debug/`.

The local build declares version 4.7.3 (code 92). Release availability in individual distribution channels may differ from the local checkout.

## Project layout

There is one Android `:app` module and no shared multiplatform module. Runtime dependencies include Freetime Core 3.0.0 via JitPack, Ktor, Room/bundled SQLite, Coil, WorkManager, Glance and osmdroid.
