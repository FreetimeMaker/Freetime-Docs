# Development

Multi AI Chat is a JetBrains IDE plugin rather than a standalone desktop application.

## Toolchain

- Kotlin 2.4.10
- Java 17
- IntelliJ Platform Gradle Plugin 2.18.1
- IntelliJ IDEA 2026.1 target

## Networking and data

The plugin includes OkHttp/Okio for HTTP communication, Gson and org.json for JSON processing.

## Providers

Provider-specific clients and settings are kept behind the plugin interface so users can select an AI provider/model without changing the surrounding IDE workflow.

`AppSettingsState` persists provider keys, models, selected provider and the last seen plugin version in `MultiAiChatSettings.xml`. Keys are plain persistent-state strings rather than Password Safe entries; treat this file as sensitive.

`AiClient.kt` implements the provider clients and exposes `Flow<String>` response streams. OpenAI uses `/v1/chat/completions`, Anthropic uses `/v1/messages`, and Gemini uses `v1beta/models/<model>:streamGenerateContent`. Provider model availability must be checked independently of the bundled defaults.

## Build

Use the Gradle wrapper:

```bash
./gradlew buildPlugin
```

For IDE testing, run `./gradlew runIde`. Installable archives are produced under `build/distributions/`. The build currently declares plugin version **1.1.1**; check the generated plugin metadata before publishing.

## Plugin metadata

The plugin ID is `com.freetime.maic` and its display name is **Multi AI Chat**.
