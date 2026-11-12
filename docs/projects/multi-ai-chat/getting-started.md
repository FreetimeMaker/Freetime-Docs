# Getting Started

## Prerequisites

| Scope | Prerequisite |
| --- | --- |
| Required | A compatible JetBrains IDE, an installed plugin archive, network access and an API key/account with access to a model offered by the plugin. Provider billing or quota may be required. |
| Optional | For source builds: Git, the Gradle wrapper and a Java 17-compatible compilation toolchain; the configured target IDE is IDEA 2026.1. Gradle/IDE downloads can take longer than five minutes and may need a newer runtime to run the build tooling. |
| Publishing only | Plugin distribution access and any credentials required by your chosen release process; not needed to install from disk. |

## First success in five minutes

**Goal: receive one provider response in the tool window.** This assumes a compatible IDE and plugin are already installed, downloads/restarts are complete, and you already have a funded or otherwise usable provider account/key. Building, account setup and provider availability are outside the estimate.

1. Open IDE Settings, search for **Multi AI Chat**, enter the API key for one provider and apply the change. Keys are stored as plain strings; do not share settings exports.
2. Open the right-side chat tool window and choose that provider and a model in its model selector. Model selection is in the tool window, not the API-key settings page.
3. Enter `Reply with a short greeting.` and click **Send**. Expect your prompt and a provider response in the conversation; exact wording is not deterministic. This sends data to that provider and may incur charges. Do not use private code for this test.

The bundled model choices are historical. If none is available to your account, this source revision needs a model-list update before this quick start can succeed; entering a valid key alone cannot fix that. See [Troubleshooting](./troubleshooting.md).

## Build from source

Multi AI Chat is a JetBrains IDE plugin.

```bash
git clone https://github.com/FreetimeMaker/Multi-AI-Chat.git
cd Multi-AI-Chat
./gradlew buildPlugin
```

## Install and configure

1. Build with a Java 17-compatible toolchain and install the ZIP from `build/distributions/` using the IDE's **Install Plugin from Disk** action.
2. Open the **Multi AI Chat** settings page and enter the key for the provider you want to use.
3. Open the right-side **Multi AI Chat** tool window and choose the provider and model.
4. To explain a selection, select editor text and invoke **Explain Code** from the editor context menu.

For a development IDE, run `./gradlew runIde` instead of installing the archive manually. The configured target is IntelliJ IDEA **2026.1**; verify generated plugin compatibility for other IDE builds.

## Credentials and privacy

Keys are currently persisted in `MultiAiChatSettings.xml` as plain strings. Keep that file private. Chat prompts and code selections leave the IDE for the selected provider, and requests may incur charges. Replace historical default model IDs if your provider no longer supports them.
