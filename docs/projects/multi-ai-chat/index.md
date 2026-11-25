---
title: Multi AI Chat
---

# Multi AI Chat

A JetBrains IDE plugin for sending prompts and selected code to OpenAI, Anthropic Claude or Google Gemini.

[Source code](https://github.com/FreetimeMaker/Multi-AI-Chat) · [Setup](./getting-started.md) · [Development](./development.md) · [Troubleshooting](./troubleshooting.md)

## Version and platform

| Item        | Source declaration                                                                            |
| ----------- | --------------------------------------------------------------------------------------------- |
| Plugin      | 1.2.0; ID `com.freetime.maic`                                                                 |
| Platform    | JetBrains plugin, not a standalone app; IDEA 2026.1 target, source compatibility floor 261    |
| Build       | Kotlin 2.4.20, Gradle wrapper 9.9.1, IntelliJ Platform Gradle Plugin 2.18.1                   |
| Compilation | Java 17 source and target compatibility; check the build-tool runtime requirements separately |
| Defaults    | `gpt-4o`, `claude-3-5-sonnet-20240620`, `gemini-3.6-flash`                                    |

Model IDs are bundled choices, not live provider discovery. A valid key does not guarantee access. See [setup](./getting-started.md) for a non-sensitive test and [development](./development.md) for request and migration behavior.

## Privacy and credential storage

::: callout warning Treat settings and diagnostics as sensitive
The plugin stores keys as plain strings in `MultiAiChatSettings.xml`, not in JetBrains Password Safe. Protect settings exports and backups, and rotate any exposed keys.

Prompts and selected code leave the IDE for the selected provider and may incur charges. Do not send secrets or unauthorized code. The Gemini client puts its key in the request URL query string; redact URLs and error bodies before sharing diagnostics.
:::

The clients send only the current prompt, not the displayed conversation history. **Clear** removes visible text, not saved keys. Gemini buffers the full response before emitting text, so its output is not displayed as it arrives over the network.

## Source review

Reviewed **2026-11-25** in a temporary clone. The checked-out commit matched the remote `HEAD` reported by `git ls-remote`: [`e9504cd7b6d0f2072dfb5c86d6caa96d51131d24`](https://github.com/FreetimeMaker/Multi-AI-Chat/tree/e9504cd7b6d0f2072dfb5c86d6caa96d51131d24). Compared with the previously cited commit, the Gradle wrapper distribution changed from 9.7.1 to 9.9.1; the only other file change was funding metadata.

Pinned evidence: [build declarations](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e9504cd7b6d0f2072dfb5c86d6caa96d51131d24/build.gradle.kts), [wrapper properties](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e9504cd7b6d0f2072dfb5c86d6caa96d51131d24/gradle/wrapper/gradle-wrapper.properties), [plugin descriptor](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e9504cd7b6d0f2072dfb5c86d6caa96d51131d24/src/main/resources/META-INF/plugin.xml), [settings and migration](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e9504cd7b6d0f2072dfb5c86d6caa96d51131d24/src/main/kotlin/com/freetime/maic/settings/AppSettingsState.kt), [model selector](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e9504cd7b6d0f2072dfb5c86d6caa96d51131d24/src/main/kotlin/com/freetime/maic/toolWindow/MyToolWindowFactory.kt), and [provider clients](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e9504cd7b6d0f2072dfb5c86d6caa96d51131d24/src/main/kotlin/com/freetime/maic/api/AiClient.kt).

This was a source inspection only. No plugin build, dependency resolution, archive inspection, IDE test, provider call or Marketplace check was performed.
