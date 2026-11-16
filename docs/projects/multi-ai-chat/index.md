---
title: Multi AI Chat
---

# Multi AI Chat

Multiple AI providers in one JetBrains IDE workflow.

**Technologies:** JetBrains, Kotlin, Plugin

[Get started](./getting-started.md) · [Source code](https://github.com/FreetimeMaker/Multi-AI-Chat)

Version numbers below describe inspected source, not necessarily the latest published release.

## Find your starting point

- [Install and configure](./getting-started.md) — Build the plugin and configure a provider.
- [Develop the plugin](./development.md) — Explore the toolchain and provider clients.
- [Resolve a problem](./troubleshooting.md) — Check models, credentials and IDE compatibility.

Multi AI Chat is a JetBrains IDE plugin that brings OpenAI, Anthropic Claude and Google Gemini into one coding workflow. The reviewed source declares version **1.2.0**.

## Providers

Provider-specific API keys and model choices are stored separately in plugin settings. Defaults are `gpt-4o`, `claude-3-5-sonnet-20240620` and `gemini-3.6-flash`. The Gemini selector offers `gemini-3.6-flash` and `gemini-3.6-pro`. These identifiers are declared in source; their live availability was not verified.

## Changes since the previous review

- **Gemini 3.6:** The previous reviewed selector offered Gemini 1.5 Flash/Pro; it now offers 3.6 Flash/Pro. Saved model IDs starting with `gemini-1.5` or `gemini-2.5` migrate to `gemini-3.6-flash` when settings load, including previous Pro selections. Other prefixes remain unchanged.
- **Gemini error details:** Non-success HTTP responses now display `Gemini API Error`, the status, message and response body. This improves available diagnostic detail, not model access or retry behavior.
- **Explain Code tool-window lookup:** The descriptor now registers the window as `Multi AI Chat`, matching the existing action lookup instead of the old `MultiAIChatWindow` ID. Runtime behavior was not tested.
- **Build and release metadata:** Both Gradle and the source plugin descriptor declare 1.2.0; Gradle explicitly derives plugin metadata version from `project.version`. Kotlin moves to 2.4.20, the Gradle wrapper to 9.7.1, OkHttp to 5.5.0 and Okio to 3.18.2. Java 17 compilation compatibility, IDEA 2026.1 and IntelliJ Platform Gradle Plugin 2.18.1 remain unchanged.
- **Update messaging and icon:** Gradle change notes and startup notifications now describe the Gemini 2.5-to-3.6 update, although the previous review's selector still used 1.5. The sidebar icon now has a white background and blue check mark. First installation records the version without showing an update notification.
- **Build helpers:** Shell and batch helpers were added. The shell helper incorrectly invokes `./gradle` (a directory), not `./gradlew`; use the wrapper directly as documented in [Development](./development.md).

## IDE integration and limits

The plugin provides a right-side **Multi AI Chat** tool window, provider/model switching and a **Multi AI → Explain Code** editor context-menu action. API keys are configured on its settings page. The source descriptor declares `since-build="261"`; generated compatibility metadata must still be checked for the intended IDE.

The clients expose response flows, but Gemini reads the full successful response before parsing and emitting text; it is not incremental network streaming. Each provider request contains only the current prompt, not the displayed conversation history. Clear empties the visible text area, not persisted provider settings.

## Security

::: callout warning API keys are stored in plain text
Provider API keys are supplied by the user. The implementation stores them as plain string fields in the IDE's `MultiAiChatSettings.xml` persistent state, not in Password Safe. Protect that file and exclude it from shared settings, backups or source control where appropriate.

Prompts and selected code are sent to the selected external provider; provider billing, rate limits and data-handling policies apply. Do not submit secrets or code you are not authorized to share. Gemini puts its key in the request URL query string; redact URLs and sensitive error-body content before sharing diagnostics.
:::

## Source review

Last checked against source: **2026-11-16**.

**Review scope:** Local source comparison, provider settings and migration, request/error handling, IDE action wiring, build declarations, helpers and update metadata across these four documentation pages.

Inspected clean local checkout: `/c/Users/jamie/IdeaProjects/Multi-AI-Chat`, HEAD [`e233c07776018a3f3969afc3401f0f4c8639a2c7`](https://github.com/FreetimeMaker/Multi-AI-Chat/tree/e233c07776018a3f3969afc3401f0f4c8639a2c7). Compared against the previous reviewed revision [`45bc792f205b7770d8994a3f1b1050b7f164f591`](https://github.com/FreetimeMaker/Multi-AI-Chat/tree/45bc792f205b7770d8994a3f1b1050b7f164f591) using the full Git diff and current source files. The diff covers 11 files, including funding metadata outside the user-facing feature scope.

### Review evidence

Pinned sources supporting the statements above:

- [`build.gradle.kts`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/build.gradle.kts) — version, toolchain/dependency declarations, target IDE and generated version wiring.
- [`gradle-wrapper.properties`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/gradle/wrapper/gradle-wrapper.properties), [`build_plugin.sh`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/build_plugin.sh) and [`build_plugin.bat`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/build_plugin.bat) — wrapper version and helper commands.
- [`AppSettingsState.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/settings/AppSettingsState.kt) — defaults, sequential legacy-prefix migration and plaintext persistent state.
- [`AppSettingsConfigurable.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/settings/AppSettingsConfigurable.kt) — API-key settings UI.
- [`MyToolWindowFactory.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/toolWindow/MyToolWindowFactory.kt) — model choices, send flow and Clear behavior.
- [`AiClient.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/api/AiClient.kt) — provider endpoints, current-prompt payloads, timeouts, Gemini error body and full-body parsing.
- [`plugin.xml`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/resources/META-INF/plugin.xml) and [`ExplainCodeAction.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/actions/ExplainCodeAction.kt) — source compatibility floor, action registration and matching tool-window lookup.
- [`UpdateNotificationActivity.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/activities/UpdateNotificationActivity.kt), [`ChatService.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/kotlin/com/freetime/maic/services/ChatService.kt) and [`maic_icon.svg`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/e233c07776018a3f3969afc3401f0f4c8639a2c7/src/main/resources/icons/maic_icon.svg) — version notification conditions, transient message flow and sidebar artwork.

### Validation limits

This was a static source review, not a plugin build or runtime certification. No Gradle dependency resolution, helper execution, generated ZIP/descriptor inspection, Plugin Verifier run, IDE installation, interactive migration/action test or live provider call was performed. No Marketplace release or Gemini 3.6 availability is established by these source declarations. Existing plaintext credential storage and Gemini buffering remain limitations. Documentation checks do not certify external services or published artifacts.
