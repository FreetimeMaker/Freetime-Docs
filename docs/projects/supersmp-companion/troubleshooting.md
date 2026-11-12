# Troubleshooting

Expected results below are diagnostic targets derived from local source, not executed builds, device tests or live-service checks. Run checkout commands from the SuperSMP Companion repository root.

## Map, shop or voting content is blank

**Check:** open the same URL in the device browser: map uses `https://map.supersmp.fun/`, shop uses `https://store.supersmp.fun`; voting URLs are listed in `ui/screens/LinksScreen.kt`. Check device connectivity and the Android System WebView provider. On an adb-connected device, inspect the provider with:

```bash
adb shell dumpsys webviewupdate
```

**Expected:** a valid current WebView provider. The remote website should load independently if it is available and permits access; browser success alone does not prove embedded WebView compatibility. Shop, map and voting pages use WebViews, not the status API client.

**Fix:** update/enable the device's supported WebView provider if missing or broken. If the browser also fails, investigate connectivity or the upstream operator. If only embedding fails, inspect WebView loading/rendering errors rather than Ktor. These sites remain controlled by external operators; do not disable TLS checks as a workaround.

## Server status is unavailable

**Check:** compare the address passed to `refreshStatus` in `ui/screens/HomeScreen.kt` with `data/status/ServerStatusRepository.kt`. The client fetches `https://api.mcsrvstat.us/3/` followed by that address. Inspect HTTP/JSON results separately from map/shop rendering.

**Expected:** a status response that can be decoded by the app. An offline-server response is not the same as a transport failure. `ServerStatusViewModel` catches exceptions without exposing a detailed error, so the UI alone may not identify the cause or prove a fresh response.

**Fix:** verify device connectivity, the requested address and service availability; use debugger/network inspection to distinguish HTTP and parsing failures. Do not infer that the Minecraft server is down solely because app status is missing, and do not change WebView settings to fix this Ktor/OkHttp request.

## Saved coordinates are wrong or disappear

**Check:** repeat the [local coordinate exercise](./getting-started#first-success-in-five-minutes), navigate away and back, and inspect Room/ViewModel errors. Enter numeric X/Y/Z values using a period for decimals.

**Expected:** the named record appears with its values and dimension and remains in the local list. The current dialog uses `toDoubleOrNull() ?: 0.0`: invalid or empty numeric input becomes zero rather than producing a validation message.

**Fix:** enter valid numbers and re-add an incorrect record before deleting the old one. Inspect `ui/viewmodels/CoordinatesViewModel.kt` and `data/coords/` for persistence failures. Preserve important coordinates before uninstalling or clearing app data; that can remove local records and is not a first-line diagnostic step.

## Build fails

**Check:** inspect configuration without running a build:

```bash
java -version
cat gradle/gradle-daemon-jvm.properties
cat gradle/libs.versions.toml
cat settings.gradle.kts
```

**Expected:** daemon criteria request JDK 21, Java/Kotlin output targets 17, and the app compiles against SDK 37. The local minimum SDK is 26, despite older API-24 wording in the upstream README. The launcher reported by `java -version` is not necessarily the selected daemon.

**Fix:** use the repository wrapper, configure SDK 37 and make JDK 21 available. Freetime Core dependencies are pinned to 3.0.0 via JitPack: distinguish resolution failures from source compilation errors, and do not silently substitute the library repository's newer version.

## APK installation fails

**Check:** inspect the built APK directory and device authorization:

```bash
ls app/build/outputs/apk/debug/
adb devices
```

**Expected:** `app-debug.apk` after a successful debug build, plus an authorized API 26+ target listed as `device`.

**Fix:** start/authorize a compatible target, or select one using adb's `-s` option when several are attached. For an incompatible-signature error when replacing a store/release installation, prefer a separate emulator; preserve saved coordinates before any uninstall. Do not assume debug and distributed APKs share a signing key.

## Debug works but release fails

**Check:** inspect the existing release error/R8 output and `app/proguard-rules.pro`; compare the failing code path with the debug variant.

**Expected:** release enables minification and resource shrinking, unlike debug. A successful debug build does not validate release behavior.

**Fix:** isolate the missing or renamed class/resource before changing keep rules. A release-specific fix needs validation against the release variant in a separately prepared build environment; this review did not run either variant. Do not disable shrinking globally just to hide the symptom.

Return to [Getting Started](./getting-started) or see [Development](./development).
