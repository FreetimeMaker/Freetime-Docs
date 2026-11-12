# Getting Started

SuperSMP Companion is an unofficial Android companion app requiring API 26+. The local build is **2.0.1** (code 23).

## Prerequisites

| Scope           | Requirement                                                             | Purpose                                                                               |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Required        | Git checkout, Android SDK 37 and configured SDK path                    | Build the single `:app` module.                                                       |
| Required        | Repository Gradle wrapper and JDK 21 available to the daemon            | Daemon criteria request 21; Java/Kotlin output targets 17.                            |
| Required        | Running API 26+ emulator or USB-debugging device and SDK Platform Tools | Install and launch. `adb devices` should show one authorized target as `device`.      |
| Required        | Network access for initial dependency resolution                        | Prepare Gradle, plugins and dependencies before the timed exercise.                   |
| Optional        | Android Studio                                                          | Import and run the app through the IDE.                                               |
| Optional        | Device internet access and a working Android System WebView provider    | Server status, voting links, shop and map; not needed to save local coordinates.      |
| Publishing only | Release-signing setup and distribution-account access                   | Not needed to build or install the debug APK; this guide does not perform publishing. |

## First success in five minutes

The five-minute target assumes a **prepared environment** with source, SDK/JDK, device and dependency caches ready. Initial Gradle/dependency downloads, SDK installation and emulator startup are excluded; compilation time is machine-dependent, not guaranteed.

1. Obtain the checkout if needed, outside the timed exercise:

   ```bash
   git clone https://github.com/FreetimeMaker/SuperSMP-Companion-App.git
   cd SuperSMP-Companion-App
   ```

2. From the repository root, build, install and open:

   ```bash
   ./gradlew :app:assembleDebug
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   adb shell am start -n com.freetime.ssmpc/.MainActivity
   ```

   On Windows, use `.\gradlew.bat :app:assembleDebug`. Expected checkpoints: `BUILD SUCCESSFUL`, an APK at the install path and adb's `Success`. These are expected results, not commands executed during this source review.

3. Open **Coords**, press the **+** action, and enter name **First base**, X **100**, Y **64**, Z **-200**. Keep the default dimension and press **Add** (labels follow the device language).
4. Expected UI: a coordinate card named **First base**, the entered X/Y/Z values and the dimension. Navigate away and back: the record should still be listed because it is stored locally in Room. This checks local functionality independently of server status or embedded websites. The test record can be removed with its delete action.

If a checkpoint differs, use [Troubleshooting](./troubleshooting). Do not use an online-server indicator as the only installation test.

## Explore the app

The navigation graph provides home/server status, command reference, saved coordinates, links, shop, map and settings. Coordinates are stored locally in Room. Voting links, shop and map need their remote websites; server status uses a separate Ktor API request.

Freetime Core dependencies remain pinned to **3.0.0** via JitPack. The newer Core repository version is not a drop-in change made by this walkthrough.

For installable releases, use the project's [GitHub Releases](https://github.com/FreetimeMaker/SuperSMP-Companion-App/releases/latest) or its [F-Droid package](https://f-droid.org/packages/com.freetime.ssmpc). Those distribution links do not establish that a downloaded release matches the local checkout version.

See [Development](./development) for the stack and [Troubleshooting](./troubleshooting) for build and remote-content checks.
