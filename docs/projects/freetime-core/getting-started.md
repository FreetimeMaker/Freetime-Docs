# Getting Started

The local Freetime Core source declares version **3.1.0**. Its Android libraries require API 24+ and compile against SDK 37.

## Prerequisites

| Scope           | Requirement                                                                           | Purpose                                                                                         |
| --------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Required        | Git checkout, Android SDK 37, configured SDK path and the repository's Gradle wrapper | Build the existing `:Sample` app against local modules.                                         |
| Required        | JDK 25 available to Gradle                                                            | `gradle/gradle-daemon-jvm.properties` requests 25; Java output targets 17.                      |
| Required        | Running API 24+ emulator or USB-debugging device, Android SDK Platform Tools          | Install and open the sample. `adb devices` should show one target as `device`.                  |
| Required        | Network access for initial dependency resolution                                      | Download Gradle, plugins and dependencies before the timed exercise.                            |
| Optional        | Android Studio with Compose support                                                   | Open the project and run the `Sample` configuration instead of using the CLI.                   |
| Publishing only | Python 3 and a Gemfury token (`FURY_TOKEN` or `furyToken` in user Gradle properties)  | Maintainer uploads, not sample builds or public dependency consumption. Never commit the token. |

## First success in five minutes

This is a target for a **prepared environment**: checkout, SDK/JDK setup, emulator startup and initial Gradle/dependency downloads are excluded. Compilation time depends on the machine; this is not a measured build-time guarantee.

1. From the Freetime Core checkout root, build and install the existing sample (no publication or consumer API scaffold is needed):

   ```bash
   ./gradlew :Sample:assembleDebug
   adb install -r Sample/build/outputs/apk/debug/Sample-debug.apk
   adb shell am start -n com.freetime.sample/.MainActivity
   ```

   On Windows, replace `./gradlew` with `.\gradlew.bat`. If the APK filename differs, inspect `Sample/build/outputs/apk/debug/` before installing.

2. Expected build/install result: Gradle ends with `BUILD SUCCESSFUL`, an APK is present in that directory, and adb installation reports `Success`. These are expected checkpoints, not results from an executed build in this documentation review.
3. Expected UI: the sample displays **Freetime Core**, a **Material 3 Expressive** heading and **Design**, **Settings**, **Donate** and **Browser** navigation actions. On Design, press **Show message**: the snackbar should read **Hello from Material 3 Expressive**.

If any checkpoint differs, use [Troubleshooting](./troubleshooting) before changing dependency versions.

## Repository and dependencies

For integration into an existing Android Compose app, add the public Maven repository in `settings.gradle.kts` (this is separate from the local sample route):

```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven("https://repo.free-time.me/maven/")
    }
}
```

Include only the modules you need, keeping their versions aligned:

```kotlin
dependencies {
    implementation("com.freetime:Core:3.1.0")
    implementation("com.freetime:Design:3.1.0")
    implementation("com.freetime:Browser:3.1.0")
    implementation("com.freetime:Donations:3.1.0")
    implementation("com.freetime:FreetimeWarn:3.1.0")
}
```

Public Gemfury packages require no consumer credentials. Replace the old `com.github.FreetimeMaker.Freetime-Core` group with `com.freetime`; artifact names remain case-sensitive. Remove JitPack only if no other dependency needs it. These instructions describe the local source configuration, not an independent check of published artifact availability.

## Application theme

Inside an existing Compose activity's `setContent` block, use Material 3 components directly inside the shared theme. This complete minimal content block needs no invented `AppContent` component:

```kotlin
import androidx.compose.material3.Text
import com.freetime.design.AppTheme
import com.freetime.design.ThemeMode

// Inside setContent { ... }:
AppTheme(
    themeMode = ThemeMode.AUTO_TIME,
    floatingBottomNavigationGlassEnabled = true,
) {
    Text("Hello from Freetime Core")
}
```

Expected UI: themed text reading **Hello from Freetime Core**, not an automatically generated screen or navigation bar. The modes are `SYSTEM`, `LIGHT`, `DARK`, `OLED` and `AUTO_TIME`. The automatic schedule defaults to light from 07:00 and dark from 19:00. Material You dynamic colors are enabled by default on Android 12+.

## Preferences

`FreetimePreferences.from(context)` provides `read()`, `update { ... }` and `reset()` over private SharedPreferences. `FreetimePreferencesState` stores theme/browser modes, automatic theme hours, reduced motion, reduced transparency, high contrast and `floatingBottomNavigationGlassEnabled`.

The host app owns observable UI state and maps stored settings into its theme. Do not use the removed `FreetimeApp`, preferences-controller or Freetime-prefixed component APIs from older documentation. Stored accessibility flags are not evidence that every Material component automatically consumes them.

## Navigation glass and templates

Only floating bottom navigation uses Liquid Glass. See [Design & Liquid Glass](./design) for the backdrop root and bar APIs. Ordinary screens, cards, dialogs and controls use Material 3.

Version 3.1.0 also includes copyable classic Material 3 and Expressive theme templates with app-owned tokens and no Liquid Glass.

## Next

- [Modules](./modules)
- [Design & Liquid Glass](./design)
- [FreetimeWarn](./freetime-warn)
- [Troubleshooting](./troubleshooting)
