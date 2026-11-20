---
title: Multi AI Chat
---

# Multi AI Chat

A JetBrains IDE plugin for sending prompts and selected code to OpenAI, Anthropic Claude or Google Gemini.

[Source code](https://github.com/FreetimeMaker/Multi-AI-Chat) · [Setup](./getting-started.md) · [Development](./development.md) · [Troubleshooting](./troubleshooting.md)

::: callout warning Current local source is unavailable
On **2026-11-20** (`date -I`), the requested `/home/jamieachatz/AllProjects/Multi-AI-Chat` checkout was missing. The source declarations below are retained from the previous documentation review, not reverified against current code. Do not treat them as current release, model-availability or security guarantees.
:::

## Previously recorded version and platform

| Item | Prior review recorded |
| --- | --- |
| Plugin | 1.2.0; ID `com.freetime.maic` |
| Platform | JetBrains plugin, not a standalone app; IDEA 2026.1 target, source compatibility floor 261 |
| Build | Kotlin 2.4.20, Gradle wrapper 9.7.1, IntelliJ Platform Gradle Plugin 2.18.1 |
| Compilation | Java 17 compatibility; build-tool runtime requirements must be checked separately |
| Defaults | `gpt-4o`, `claude-3-5-sonnet-20240620`, `gemini-3.6-flash` |

Model IDs are bundled choices, not live provider discovery. A valid key does not guarantee access. See [setup](./getting-started.md) for a non-sensitive test and [development](./development.md) for request and migration behavior.

## Privacy and credential storage

::: callout warning Treat settings and diagnostics as sensitive
The prior implementation stored keys as plain strings in `MultiAiChatSettings.xml`, not Password Safe. Current storage could not be checked; continue protecting settings exports and backups. If credentials were exposed, rotate them.

Prompts and selected code leave the IDE for the selected provider and may incur charges. Do not send secrets or unauthorized code. The previously reviewed Gemini client placed its key in the request URL query string; redact URLs and error bodies before sharing diagnostics.
:::

The prior clients sent only the current prompt, not displayed conversation history. Clear removed visible text, not saved keys. Gemini buffered the full response despite exposing a response flow; this was not incremental network streaming.

## Source review

Documentation reviewed **2026-11-20**; **no current plugin source inspection was possible**. The earlier pages attributed their findings to [`e233c07776018a3f3969afc3401f0f4c8639a2c7`](https://github.com/FreetimeMaker/Multi-AI-Chat/tree/e233c07776018a3f3969afc3401f0f4c8639a2c7) on 2026-11-16. That provenance is inherited, not independently verified here.

Prior evidence scope: [build declarations](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/build.gradle.kts), [settings/storage](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/settings/AppSettingsState.kt), and [provider clients](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/api/AiClient.kt), together with tool-window/action wiring, build helpers and update metadata described in the prior pages.

No source build, dependency resolution, generated archive inspection, IDE test, provider call or Marketplace check was performed. Restore the local repository and recheck storage, model IDs and build scripts before asserting current behavior. No secret environment files were read.
