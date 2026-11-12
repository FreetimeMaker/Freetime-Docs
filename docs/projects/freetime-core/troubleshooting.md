# Troubleshooting

These checks follow the local 3.1.0 source. Expected results below are diagnostic targets, not claims that builds, installations or public artifact requests were executed during this review. Run shell commands from the Freetime Core checkout unless noted.

## Gradle fails before compilation

**Check:** inspect the daemon requirement and SDK path without starting a build:

```bash
java -version
cat gradle/gradle-daemon-jvm.properties
cat local.properties
```

**Expected:** the criteria file requests `toolchainVersion=25`; Android SDK 37 is installed and the SDK path is configured. A missing `local.properties` is not itself an error if the SDK is configured through the environment. The launcher JDK shown by `java -version` is not necessarily the daemon JDK selected by Gradle.

**Fix:** make JDK 25 available to the daemon/toolchain resolver and configure the SDK in Android Studio or a local, untracked `sdk.dir` entry. Java output target 17 does not mean the daemon should run on JDK 17. Use the checked-in wrapper, not a system Gradle installation.

## A consumer cannot resolve Core or Design

**Check:** compare the consumer's `settings.gradle.kts` and dependency declarations with [Getting Started](./getting-started.md). To inspect public POM availability independently of Gradle, if curl is installed:

```bash
curl --fail --show-error --location --max-time 30 'https://repo.free-time.me/maven/com/freetime/Design/3.1.0/Design-3.1.0.pom'
```

**Expected:** HTTP success and Maven XML for `com.freetime:Design:3.1.0`. This checks one POM only, not its AAR or transitive dependencies; availability was not verified here.

**Fix:** use the exact case-sensitive module name, align module versions, and declare the public repository in dependency resolution. Do not add publisher credentials to a public consumer. For HTTP/DNS/TLS errors, investigate connectivity or repository availability before changing source code. The local `:Sample` uses project dependencies and does not prove that a public release is downloadable.

## The sample does not install or open

**Check:** after a successful sample build:

```bash
adb devices
ls Sample/build/outputs/apk/debug/
adb shell am start -n com.freetime.sample/.MainActivity
```

**Expected:** one authorized target marked `device`, a debug APK, and the sample activity opening on API 24+. See the [first-success checkpoints](./getting-started.md#first-success-in-five-minutes).

**Fix:** start or authorize the device, select a target with adb's `-s` option if several are attached, and install the actual APK filename. If installation reports an incompatible signing certificate, use a separate emulator or back up data before uninstalling the older app; do not clear data as a first diagnostic step.

## Old components are unresolved, or the theme draws no navigation

**Check:** compare imports and calls against `Design/src/main/java/com/freetime/design/Theme.kt` and `Sample/src/main/java/com/freetime/sample/MainActivity.kt`.

**Expected:** `AppTheme` wraps host-owned composables. It does not create navigation, a preferences controller or a `FreetimeApp` shell.

**Fix:** replace removed API usage with Material 3 components and explicit host state. Start with the minimal text example in [Getting Started](./getting-started.md), then follow [Design & Liquid Glass](./design.md) for the backdrop root and floating bar. Glass is deliberately limited to floating bottom navigation; flat cards and dialogs are not a rendering failure.

## A saved preference does not update the visible UI

**Check:** inspect the value returned by `FreetimePreferences.from(context).read()` and the state actually passed to `AppTheme`. Verify that reads and writes use the same preferences name.

**Expected:** the preference store exposes `read()`, `update { ... }` and `reset()`, not an observable UI controller. Stored accessibility flags do not automatically affect every component.

**Fix:** keep observable state in the host, update it after preference changes, and map stored modes and flags into theme/component arguments. Do not reset all preferences just to force recomposition.
