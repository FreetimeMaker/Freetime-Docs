# Getting Started

GeoWeather is an Android app for API 26+. The local source declares version **4.7.3** (code 92).

## Prerequisites

| Scope           | Requirement                                                             | Purpose                                                                                                 |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Required        | Git checkout, Android SDK 37 and configured SDK path                    | Build the single `:app` module.                                                                         |
| Required        | Repository Gradle wrapper and JDK 21 available to the daemon            | Daemon criteria request 21; Kotlin bytecode targets JVM 11.                                             |
| Required        | Running API 26+ emulator or USB-debugging device and SDK Platform Tools | Install and launch; `adb devices` should show one authorized target as `device`.                        |
| Required        | Network access                                                          | Resolve dependencies initially and search/fetch weather from Open-Meteo on first use.                   |
| Optional        | Android Studio                                                          | Import the checkout and run the app through the IDE.                                                    |
| Optional        | Notifications and a launcher supporting widgets                         | Explore alerts and widgets after the basic forecast check. Configure each widget's location separately. |
| Publishing only | Distribution-account access and release-signing setup                   | Not needed for this debug-build walkthrough; no publishing credentials are required here.               |

## First success in five minutes

Allow five minutes only for a **prepared environment** with the checkout, SDK/JDK, device and dependency caches ready. Initial Gradle/dependency downloads, SDK installation and emulator startup are excluded; compilation and network response times can exceed this target.

1. Obtain the source if necessary (outside the timed exercise):

   ```bash
   git clone https://github.com/FreetimeMaker/GeoWeather.git
   cd GeoWeather
   ```

2. From the checkout root, build, install and launch:

   ```bash
   ./gradlew :app:assembleDebug
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   adb shell am start -n com.freetime.geoweather/.MainActivity
   ```

   On Windows, use `.\gradlew.bat :app:assembleDebug`. Expected checkpoints are `BUILD SUCCESSFUL`, an APK at the install path and adb's `Success`. These commands were not executed during this source review.

3. Complete or skip onboarding if shown. Open city search, enter **Berlin**, and select the result whose region/country matches your intended location. Expected UI: search results show city names with region/country (or coordinates); selecting one saves it and returns from search.
4. Open the saved location's forecast. Expected UI after a successful fetch: the selected location's name, weather/temperature data and an update timestamp. Verify that timestamp rather than assuming any visible forecast is fresh. Exact temperatures and result ordering depend on the live service and are not fixed test values.

If search, installation or refresh fails, follow [Troubleshooting](./troubleshooting.md). A successful build alone does not verify weather service availability.

## First-use settings and dependency notes

Choose units and startup/display preferences in Settings. Saved forecasts remain readable offline, but check their update timestamps. Configure notifications and each widget's location separately when using those features.

The dependency catalog currently pins Freetime Core **3.0.0** through JitPack, not the Core repository's newer 3.1.0. Do not substitute library versions as part of this walkthrough.

## Next steps

Continue with [Installation & Build](./installation.md), [Features](./features.md), [Architecture](./architecture.md), [Configuration](./configuration.md) and [Troubleshooting](./troubleshooting.md).
