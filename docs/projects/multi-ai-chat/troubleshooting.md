# Troubleshooting


Work from the symptom below. Commands are suggested local checks, not outputs observed during this documentation review. Use your configured ports/origins; never include credentials in shared logs.

## Provider request fails

**Check:** Confirm the selected provider/model in the tool window and the provider’s key in Settings. Inspect the displayed HTTP error; check account model access, billing and quota in the provider console. Do not post keys or credential-bearing URLs.

**Expected:** A usable key, an available model from the selector and sufficient quota are all required. A successful test shows a response, not just the submitted prompt.

**Fix:** Verify provider, model identifier and API key independently. The bundled defaults (`gpt-4o`, `claude-3-5-sonnet-20240620`, `gemini-1.5-flash`) may be retired or unavailable to your account. A valid key does not guarantee model access. Check provider billing, quotas and the HTTP error shown by the client.

The HTTP clients use a 30-second connect timeout and a 60-second read timeout. Proxy, TLS or connectivity failures can surface as `Connection Error` messages.

## Plugin incompatible with IDE

**Check:** Check the IDE version in **Help → About** and the installed plugin’s compatibility information. For a locally built ZIP, inspect its generated metadata:

```bash
unzip -l build/distributions/*.zip
```

Locate the plugin JAR, then inspect its `META-INF/plugin.xml` for the generated `idea-version` range.

**Expected:** The actual IDE build must fit the generated compatibility range; the configured build target alone is not a promise of compatibility with every JetBrains IDE.

**Fix:** Check the IntelliJ Platform target and generated plugin compatibility before changing Kotlin or networking dependencies. The local build targets IDEA 2026.1, uses Kotlin 2.4.10 and declares plugin version 1.1.1.

## Credentials appeared in exported settings

**Check:** Inspect the settings export file list for `MultiAiChatSettings.xml`, without sharing its contents.

**Expected:** This file can contain plaintext provider keys and must not be included in shared exports or issue attachments.

**Fix:** The current settings component stores keys in `MultiAiChatSettings.xml`, not an encrypted credential store. Remove the file from shared exports and rotate any exposed provider keys. Do not paste the settings file into a public issue.
