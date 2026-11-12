# Multi AI Chat

Multi AI Chat is a JetBrains IDE plugin that brings multiple AI providers into one coding workflow. The current plugin version is **1.2.0**.

**Repository:** [FreetimeMaker/Multi-AI-Chat](https://github.com/FreetimeMaker/Multi-AI-Chat)

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

Provider API keys are configuration secrets. They must be supplied by the user and must never be committed to the repository.
