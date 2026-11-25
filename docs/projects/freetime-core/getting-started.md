# Getting Started

Freetime Core **4.0.2** targets Android API 24+ and desktop JVM. Android compilation uses SDK 37; iOS and web are not supported.

::: callout warning "Use local targets before verified publication"
The 4.0.2 coordinates below describe intended publications, not verified downloads. The source disables remote publishing, and upstream reports incomplete 4.0.0 artifacts. Upstream classifies versions below 4.0.1 as unsupported and JitPack-only; that hosting was not verified. Keep Gradle Module Metadata enabled; an AAR/POM-only release is insufficient for KMP. See the [review scope](./index.md#freetime-core-source-review).
:::

## Prerequisites

| Scope              | Requirement                                                                                   | Purpose                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Required           | Git checkout, Android SDK 37, configured SDK path and the repository's Gradle wrapper (9.9.2) | Build the existing `:Sample-android` host against local modules.                                   |
| Required           | JDK 25 available to Gradle                                                                    | `gradle/gradle-daemon-jvm.properties` requests 25; Java output targets 17.                         |
| Required           | Running API 24+ emulator or USB-debugging device, Android SDK Platform Tools                  | Install and open the sample. `adb devices` should show one target as `device`.                     |
| Required           | Network access for initial dependency resolution                                              | Download Gradle, plugins and dependencies before building.                                         |
| Optional           | Android Studio with Compose support                                                           | Open the project and run the `Sample-android` configuration instead of using the CLI.              |
| Local staging only | Python 3                                                                                      | Consolidate and verify KMP publications; no upload token is needed. Remote publishing is disabled. |

## Local sample targets

Goal: build the existing local sample, open it and trigger its snackbar without resolving a public Freetime release. Prepare the checkout, SDK/JDK and device first; initial dependency downloads and compilation have no fixed time budget.

1. From the Freetime Core checkout root, build and install the existing sample (no publication or consumer API scaffold is needed):

   ```bash
   ./gradlew :Sample-android:assembleDebug
   adb install -r Sample/androidApp/build/outputs/apk/debug/Sample-android-debug.apk
   adb shell am start -n com.freetime.sample/.MainActivity
   ```

   On Windows, replace `./gradlew` with `.\gradlew.bat`. If the APK filename differs, inspect `Sample/androidApp/build/outputs/apk/debug/` before installing.

2. Expected build/install result: Gradle ends with `BUILD SUCCESSFUL`, an APK is present in that directory, and adb installation reports `Success`. These are expected checkpoints, not results from an executed build in this documentation review.
3. Expected UI: the sample displays **Freetime Core**, a **Material 3 Expressive** heading and **Design**, **Settings**, **Donate** and **Browser** navigation actions. On Design, press **Show message**: the snackbar should read **Hello from Material 3 Expressive**.

The **Browser** tab also offers **Open in-app browser**. The sample opens `https://keepandroidopen.org` in an Android WebView with JavaScript enabled; on desktop the screen offers an external-browser action instead. This optional check contacts an external site.

If any checkpoint differs, use [Troubleshooting](./troubleshooting.md) before changing dependency versions.

For desktop, use a graphical session and a JDK 17 toolchain in addition to the daemon JDK 25. Run `./gradlew :Sample:run`; expected UI is the same shared sample. `./gradlew :Sample:desktopJar` is the compilation/package target, not an installer or GUI smoke test. Android SDK requirements still apply when configuring this multi-target checkout.

## Repository and dependencies

See the [Maven / Gradle repository guide](../repositories/maven-gradle.md) for setup and dependency-resolution checks.

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

After publication, include only the modules you need, keeping their versions aligned:

```kotlin
dependencies {
    implementation("com.freetime:Core:4.0.2")
    implementation("com.freetime:Design:4.0.2")
    implementation("com.freetime:Browser:4.0.2")
    implementation("com.freetime:Donations:4.0.2")
    implementation("com.freetime:FreetimeWarn:4.0.2")
    implementation("com.freetime:Notifications:4.0.2")
}
```

Public Gemfury packages require no consumer credentials. Replace the old `com.github.FreetimeMaker.Freetime-Core` group with `com.freetime`; artifact names remain case-sensitive. Remove JitPack only if no other dependency needs it. These instructions describe the local source configuration, not an independent check of published artifact availability.

For local Notifications integration, use `implementation(project(":Notifications"))` instead of its Maven dependency. In another checkout, first include both local `Notifications` and `Core` projects in the consuming build; the dependency line alone does not import them. See [Notifications](./modules.md#modules-notifications) for runtime setup and permission requirements.

The repository/group migration began in 3.1.0; Notifications arrived in 3.2.0. The move to KMP in the 4.0 release line is a separate breaking change. Depend on root artifacts, not `Core-android`/`Core-desktop`; their artifacts are classifiers selected through `.module` metadata. In KMP builds, add shared libraries to `commonMain.dependencies`; Notifications belongs in the Android/desktop JVM source sets because it uses Java APIs. Local project dependencies require including the corresponding library projects first.

## Local publication staging

Run `./gradlew stagePublications` to stage the six unified KMP libraries under `build/public-maven` without uploading anything. The version comes from `-PreleaseVersion`, then `VERSION`, then the version catalog. A leading `v` is stripped, so `-PreleaseVersion=v4.0.2` stages version `4.0.2`.

Gradle calls `python3` by default; use `-PpythonExecutable=/path/to/python3` to select another interpreter. The consolidator targets Python 3.5 compatibility; its test suite uses Python 3.11+. `./gradlew publishToMavenLocal` publishes only the unified coordinates to Maven Local, not the native root or target publications. Neither task verifies public access.

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

On Android, `FreetimePreferences.from(context)` provides `read()`, `update { ... }` and `reset()` over private SharedPreferences. `FreetimePreferencesState` stores theme/browser modes, automatic theme hours, reduced motion, reduced transparency, high contrast and `floatingBottomNavigationGlassEnabled`.

On desktop, create the store with `FreetimePreferences.from(name = "my_app")` at the platform entry point; it uses Java Preferences rather than SharedPreferences. Pass the store into shared UI.

The host app owns observable UI state and maps stored settings into its theme. Do not use the removed `FreetimeApp`, preferences-controller or Freetime-prefixed component APIs from older documentation. Stored accessibility flags are not evidence that every Material component automatically consumes them.

## Navigation glass and templates

In the default theme, only floating bottom navigation uses Liquid Glass. See [Design & Liquid Glass](./design.md) for the backdrop root and bar APIs. Ordinary screens, cards, dialogs and controls use Material 3.

Introduced in 3.1.0 and retained in 4.0.2 are copyable classic Material 3 and Expressive theme templates with app-owned tokens and no Liquid Glass.

## Next

- [Modules](./modules.md)
- [Design & Liquid Glass](./design.md)
- [FreetimeWarn](./freetime-warn.md)
- [Troubleshooting](./troubleshooting.md)
