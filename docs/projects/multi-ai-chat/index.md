---
title: Multi AI Chat
---

<ProjectHeader project="multi-ai-chat" />

## Find your starting point

<ProjectPaths project="multi-ai-chat" />

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

::: warning API keys are stored in plain text
Provider API keys are supplied by the user. The current implementation stores them as plain string fields in the IDE's `MultiAiChatSettings.xml` persistent state, not in Password Safe. Protect that file and exclude it from shared settings, backups or source control where appropriate.

Prompts and selected code are sent to the selected external provider; provider billing, rate limits and data-handling policies apply. Do not submit secrets or code you are not authorized to share.
:::

::: tip Check model availability
The bundled model defaults are historical identifiers, not a guarantee of current provider availability. Select a model supported by your account.
:::
