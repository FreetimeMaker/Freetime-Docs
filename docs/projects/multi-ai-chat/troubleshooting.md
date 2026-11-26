# Troubleshooting

Source reviewed on **2026-11-25**. See [Source review](./index.md#multi-ai-chat-source-review) for the pinned commit and validation limits.

Work from the symptom below. Commands are suggested local checks, not outputs observed during this documentation review. When sharing diagnostics, never include credentials in shared logs.

## Provider request fails

**Check:** Confirm the selected provider/model in the tool window and the provider’s key in Settings. Inspect the displayed HTTP error; check account model access, billing and quota in the provider console. Do not post keys or credential-bearing URLs.

**Expected:** A usable key, an available model from the selector and sufficient quota are all required. A successful test shows a response, not just the submitted prompt.

**Fix:** Verify provider, model identifier and API key independently. The bundled defaults (`gpt-4o`, `claude-3-5-sonnet-20240620`, `gemini-3.6-flash`) are source identifiers and may be unavailable to your account; live availability was not verified. A valid key does not guarantee model access. Check provider billing, quotas and the HTTP error shown by the client.

Gemini HTTP failures display `Gemini API Error` with the status, message and response body. Use the body to distinguish model, authentication and quota failures, but redact sensitive content before sharing it. Gemini puts the API key in the request URL query string; never share the complete URL.

The HTTP clients use a 30-second connect timeout and a 60-second read timeout. Proxy, TLS or connectivity failures can surface as `Connection Error` messages.

## Plugin incompatible with IDE

**Check:** Check the IDE version in **Help → About** and the installed plugin’s compatibility information. For a locally built ZIP, inspect its generated metadata:

```bash
unzip -l build/distributions/*.zip
```

Locate the plugin JAR, then inspect its `META-INF/plugin.xml` for the generated `idea-version` range.

**Expected:** The actual IDE build must fit the generated compatibility range; the configured build target alone is not a promise of compatibility with every JetBrains IDE.

**Fix:** Check the IntelliJ Platform target and generated plugin compatibility before changing Kotlin or networking dependencies. The local build targets IDEA 2026.1, uses Kotlin 2.4.20 and declares plugin version 1.2.0.

## Gemini Pro selection changed after upgrading

**Check:** Inspect the selected Gemini model after older settings load.

**Expected:** Saved IDs beginning with `gemini-1.5` or `gemini-2.5` migrate to `gemini-3.6-flash`, even if the old selection was Pro. Other prefixes are not migrated.

**Fix:** Choose `gemini-3.6-pro` in the tool window if your account supports it. The migration does not verify access to the new model.

## Gemini response arrives all at once

**Check:** Distinguish waiting for a completed response from an HTTP or parsing error.

**Expected:** Although the client calls `streamGenerateContent`, it reads the entire successful response body before parsing and emitting text. The client can emit several text chunks after buffering, but it does not display them as they arrive over the network.

## Shell build helper fails

**Check:** If `build_plugin.sh` fails on `./gradle`, use the wrapper directly.

**Fix:** Run `./gradlew clean buildPlugin` from the source root, or `gradlew.bat clean buildPlugin` on Windows. The shell helper targets the `gradle` directory rather than the `gradlew` executable; helper execution and dependency resolution were not tested in this review.

## Credentials appeared in exported settings

**Check:** Inspect the settings export file list for `MultiAiChatSettings.xml`, without sharing its contents.

**Expected:** This file can contain plaintext provider keys and must not be included in shared exports or issue attachments.

**Fix:** The current settings component stores keys in `MultiAiChatSettings.xml`, not an encrypted credential store. Remove the file from shared exports and rotate any exposed provider keys. Do not paste the settings file into a public issue.
