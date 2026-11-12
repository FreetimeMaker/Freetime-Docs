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

Multi AI Chat is a JetBrains IDE plugin that brings multiple AI providers into one coding workflow. The current version declared by the local Gradle build is **1.1.1**.

**Source code:** [FreetimeMaker/Multi-AI-Chat](https://github.com/FreetimeMaker/Multi-AI-Chat)

## Providers

The plugin integrates:

- OpenAI
- Anthropic Claude
- Google Gemini

Provider-specific API keys and model choices are stored separately in plugin settings. Current defaults in the project include `gpt-4o`, `claude-3-5-sonnet-20240620` and a Gemini Flash model.

## IDE integration

Multi AI Chat provides a right-side **Multi AI Chat** tool window, provider switching and real-time chat. It also registers an editor context-menu **Explain Code** action for sending selected code to the configured AI provider.

The plugin targets JetBrains platform builds starting at build 261 and includes startup update notifications plus a dedicated settings page.

## Security

::: callout warning API keys are stored in plain text
Provider API keys are supplied by the user. The current implementation stores them as plain string fields in the IDE's `MultiAiChatSettings.xml` persistent state, not in Password Safe. Protect that file and exclude it from shared settings, backups or source control where appropriate.

Prompts and selected code are sent to the selected external provider; provider billing, rate limits and data-handling policies apply. Do not submit secrets or code you are not authorized to share.
:::

::: callout tip Check model availability
The bundled model defaults are historical identifiers, not a guarantee of current provider availability. Select a model supported by your account.
:::

## Source review

Last checked against source: **2026-11-12**.

**Review scope:** Setup, prerequisites and troubleshooting.

This manually maintained, scoped review is independent of page edits and documentation builds. It does not certify every page, build results, published artifacts or live services. The listed source checkouts were clean when inspected.

### Multi-AI-Chat

Inspected revision: [`45bc792f205b7770d8994a3f1b1050b7f164f591`](https://github.com/FreetimeMaker/Multi-AI-Chat/tree/45bc792f205b7770d8994a3f1b1050b7f164f591).

- [`build.gradle.kts`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/45bc792f205b7770d8994a3f1b1050b7f164f591/build.gradle.kts)
- [`src/main/resources/META-INF/plugin.xml`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/45bc792f205b7770d8994a3f1b1050b7f164f591/src/main/resources/META-INF/plugin.xml)
- [`src/main/kotlin/com/freetime/maic/actions/ExplainCodeAction.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/45bc792f205b7770d8994a3f1b1050b7f164f591/src/main/kotlin/com/freetime/maic/actions/ExplainCodeAction.kt)
- [`src/main/kotlin/com/freetime/maic/api/AiClient.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/45bc792f205b7770d8994a3f1b1050b7f164f591/src/main/kotlin/com/freetime/maic/api/AiClient.kt)
- [`src/main/kotlin/com/freetime/maic/services/ChatService.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/45bc792f205b7770d8994a3f1b1050b7f164f591/src/main/kotlin/com/freetime/maic/services/ChatService.kt)
- [`src/main/kotlin/com/freetime/maic/settings/AppSettingsConfigurable.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/45bc792f205b7770d8994a3f1b1050b7f164f591/src/main/kotlin/com/freetime/maic/settings/AppSettingsConfigurable.kt)
- [`src/main/kotlin/com/freetime/maic/settings/AppSettingsState.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/45bc792f205b7770d8994a3f1b1050b7f164f591/src/main/kotlin/com/freetime/maic/settings/AppSettingsState.kt)
- [`src/main/kotlin/com/freetime/maic/toolWindow/MyToolWindowFactory.kt`](https://github.com/FreetimeMaker/Multi-AI-Chat/blob/45bc792f205b7770d8994a3f1b1050b7f164f591/src/main/kotlin/com/freetime/maic/toolWindow/MyToolWindowFactory.kt)
