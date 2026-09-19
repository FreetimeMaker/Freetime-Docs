# Development

Multi AI Chat is a JetBrains IDE plugin rather than a standalone desktop application.

## Toolchain

- Kotlin 2.4.20
- Java 17
- IntelliJ Platform Gradle Plugin 2.18.1
- IntelliJ IDEA 2026.1 target

## Networking and data

The plugin includes OkHttp/Okio for HTTP communication, Gson and org.json for JSON processing.

## Providers

Provider-specific clients and settings are kept behind the plugin interface so users can select an AI provider/model without changing the surrounding IDE workflow.

API keys are user configuration and must never be committed to source control.

## Build

Use the Gradle wrapper:

```bash
./gradlew buildPlugin
```

For IDE testing, use the IntelliJ Platform Gradle run task configured by the project.

## Plugin metadata

The plugin ID is `com.freetime.maic` and its display name is **Multi AI Chat**.
