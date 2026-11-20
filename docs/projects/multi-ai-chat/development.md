# Development

::: callout warning Prior source snapshot only
The local plugin repository was missing on 2026-11-20. Technical details and commands on this page are inherited from the previous review, not current-source verification. See [review scope](./index.md#multi-ai-chat-source-review).
:::

Multi AI Chat is a JetBrains IDE plugin rather than a standalone desktop application.

## Toolchain

- Kotlin JVM and serialization plugins 2.4.20
- Gradle wrapper 9.7.1
- Java 17
- IntelliJ Platform Gradle Plugin 2.18.1
- IntelliJ IDEA 2026.1 target

## Networking and data

The build declares OkHttp 5.5.0 and Okio 3.18.2 for HTTP communication, Gson 2.14.0 and org.json 20231013 for JSON processing. These are source declarations, not verified dependency resolution results.

## Providers

Provider-specific clients and settings are kept behind the plugin interface so users can select an AI provider/model without changing the surrounding IDE workflow.

`AppSettingsState` persists provider keys, models, selected provider and the last seen plugin version in `MultiAiChatSettings.xml`. Keys are plain persistent-state strings rather than Password Safe entries; treat this file as sensitive.

`AiClient.kt` implements the provider clients and exposes `Flow<String>` response streams. OpenAI uses `/v1/chat/completions`, Anthropic uses `/v1/messages`, and Gemini uses `v1beta/models/<model>:streamGenerateContent`. Provider model availability must be checked independently of the bundled defaults.

## Build

Use the Gradle wrapper:

```bash
./gradlew buildPlugin
```

For IDE testing, run `./gradlew runIde`. Installable archives are produced under `build/distributions/`. The build and source descriptor declare plugin version **1.2.0**, and Gradle's `pluginConfiguration.version` explicitly uses `project.version`; check the generated plugin metadata before publishing.

The new `build_plugin.sh` calls `./gradle clean buildPlugin`, but `gradle` is a directory in this checkout, not the wrapper executable. Use `./gradlew clean buildPlugin` directly instead. On Windows, use `gradlew.bat clean buildPlugin`; the new batch helper uses the Unix-style `./gradlew` spelling and was not executed during this review.

## Plugin metadata

The plugin ID is `com.freetime.maic` and its display name is **Multi AI Chat**. The tool-window registration ID is now `Multi AI Chat`, matching the lookup in `ExplainCodeAction`; previously the descriptor used `MultiAIChatWindow`. This fixes the source-level mismatch, but action behavior in a running IDE was not tested.

The 1.2.0 Gradle change notes and startup update notification mention the Gemini 2.5-to-3.6 update. The previous reviewed revision actually offered Gemini 1.5 models. The notification records the installed version silently on first installation, then notifies when a previously recorded version changes.

## Gemini migration and response limits

The selector offers `gemini-3.6-flash` and `gemini-3.6-pro`; the fresh-settings default is Flash. In `AppSettingsState.loadState`, any saved ID starting with `gemini-1.5` is rewritten to `gemini-2.5-flash`, then the following independent check rewrites any `gemini-2.5` prefix to `gemini-3.6-flash`. Both legacy families therefore end at Flash, including old Pro selections. Other prefixes are left unchanged; this is not provider-side model discovery or validation.

Gemini non-success responses now include the HTTP status, message and response body as `Gemini API Error`. Successful Gemini responses still use `source.readUtf8()` before parsing the full JSON response, so exposing a `Flow<String>` does not make Gemini output incremental over the network. Requests contain only the current prompt, not the displayed conversation history; Clear only empties the visible text area.

See the [source review and pinned evidence](./index.md#multi-ai-chat-source-review) for the inspected revision and validation limits.
