# Getting Started

Source reviewed on **2026-11-25**. See [Source review](./index.md#source-review) for the pinned commit and validation limits.

## Prerequisites

| Scope           | Prerequisite                                                                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required        | A compatible JetBrains IDE, an installed plugin archive, network access and an API key/account with access to a model offered by the plugin. Provider billing or quota may be required.                                                            |
| Optional        | For source builds: Git, the Gradle wrapper and a JDK that can run Gradle 9.9.1 and the IntelliJ Platform build tooling. The build declares Java 17 source/target compatibility and targets IDEA 2026.1; these declarations do not specify the Gradle runtime JDK. |
| Publishing only | Plugin distribution access and any credentials required by your chosen release process; not needed to install from disk.                                                                                                                           |

## Test one provider response

**Goal: receive one provider response in the tool window.** This assumes a compatible IDE and plugin are already installed, downloads/restarts are complete, and you already have a funded or otherwise usable provider account/key. Building, account setup and provider availability are not part of this test.

1. Open IDE Settings, search for **Multi AI Chat**, enter the API key for one provider and apply the change. Keys are stored as plain strings; do not share settings exports.
2. Open the right-side chat tool window and choose that provider and a model in its model selector. Model selection is in the tool window, not the API-key settings page.
3. Enter `Reply with a short greeting.` and click **Send**. Expect your prompt and a provider response in the conversation; exact wording is not deterministic. This sends data to that provider and may incur charges. Do not use private code for this test.

Version 1.2.0 offers `gemini-3.6-flash` and `gemini-3.6-pro`, with Flash as the default. These are bundled source identifiers, not verified live model availability. If no offered model is available to your account, the source model list needs updating; entering a valid key alone cannot fix that. See [Troubleshooting](./troubleshooting.md).

## Build from source

Multi AI Chat is a JetBrains IDE plugin.

```bash
git clone https://github.com/FreetimeMaker/Multi-AI-Chat.git
cd Multi-AI-Chat
./gradlew buildPlugin
```

Use the wrapper directly: `build_plugin.sh` incorrectly calls `./gradle` rather than `./gradlew`. On Windows, use `gradlew.bat buildPlugin`. No build was executed during this source review.

## Install and configure

1. Build with the wrapper and install the ZIP from `build/distributions/` using the IDE's **Install Plugin from Disk** action.
2. Open the **Multi AI Chat** settings page and enter the key for the provider you want to use.
3. Open the right-side **Multi AI Chat** tool window and choose the provider and model.
4. To explain a selection, select editor text and choose **Multi AI → Explain Code** from the editor context menu.

For a development IDE, run `./gradlew runIde` instead of installing the archive manually. The configured target is IntelliJ IDEA **2026.1**; verify generated plugin compatibility for other IDE builds.

## Credentials and privacy

Keys are currently persisted in `MultiAiChatSettings.xml` as plain strings. Keep that file private. Chat prompts and code selections leave the IDE for the selected provider, and requests may incur charges. Check bundled model IDs against provider availability. When older settings load, saved Gemini IDs starting with `gemini-1.5` or `gemini-2.5` migrate to `gemini-3.6-flash`, including former Pro selections. Select `gemini-3.6-pro` explicitly if desired and supported by your account.
