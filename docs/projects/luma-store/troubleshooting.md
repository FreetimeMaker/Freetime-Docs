# Troubleshooting


Work from the symptom below. Commands are suggested local checks, not outputs observed during this documentation review. Use your configured ports/origins; never include credentials in shared logs.

## A source shows no apps or assets

**Check:** Check the client’s enabled sources, then inspect the source HTTP response and latest release assets separately. Do not assume a parsed but empty result is a network failure.

**Expected:** Luma is enabled by default. Android catalog entries/APK assets are eligible; a source without those can legitimately be empty.

**Fix:** Check retrieval, HTTP status, parsing and filtering independently. Android's Luma catalog is enabled by default, while built-in F-Droid/community sources are disabled by default.

The current public catalog contains Android platform rows only. Tracked release resolution keeps APK assets only; a latest release without an `.apk` asset or a non-APK direct URL can produce an empty list. Linux/Windows packages and `package_format` filtering are not supported by this backend revision.

## Website alias fails while the versioned API works

**Check:** In browser developer tools, inspect the failed request URL/status. Compare its unversioned prefix with `/v2/lumastore` on the same configured backend; inspect proxy/rewrite rules.

**Expected:** The deployed alias must resolve to the intended versioned handler. Source code alone does not confirm that it exists in production.

**Fix:** The website calls the unversioned `https://api.free-time.me/lumastore` alias. The inspected Express entry point mounts `/v2/lumastore`; it does not define that alias. Check deployed proxy/rewrite configuration separately. Production routing was not tested during this source review.

## App details return 404

**Check:** Copy the catalog row’s store app ID into the detail request and inspect the response message/server logs.

**Expected:** An existing, accessible store app ID resolves; package-name lookup is not supported by this handler.

**Fix:** Use the store app ID returned by the catalog. Unlike ratings/reviews/favorites, the detail handler does not resolve package names. Some handlers map database errors to 404, so also inspect the response message and backend logs.

## Ratings or saved apps fail

**Check:** Inspect authentication and request JSON in your client without sharing the token. Verify project, token expiry, integer rating and trimmed review length; inspect the HTTP status before parsing JSON.

**Expected:** A dedicated Luma user session, rating 1–5 and review at most 2,000 characters; deleting successfully returns an empty body, not JSON.

**Fix:** Use a current Supabase access token from the dedicated Luma project, not a generic All API session or forge OAuth token. Rating writes require an integer from 1 to 5 and optional review text of at most 2,000 trimmed characters. Developers cannot rate their own apps. Successful delete responses have no JSON body.

## Submission is rejected or not visible

**Check:** In the dashboard, check repository visibility, forge authorization, APK download data and review/publication/archive status. Compare the submission record with the published catalog record.

**Expected:** An authorized public supported repository and Android APK data pass these prerequisites; visibility still depends on review/publication state.

**Fix:** Final submissions require an Android APK download and a public supported repository with verified ownership/write access. Confirm matching forge authorization. Check review/publication/archive state before treating dashboard/catalog differences as a rendering bug; a submission row and a published `store_apps` row are different records.

## Developer notifications do not appear

**Check:** Check the saved developer session and Android notification permission/settings. Inspect `NotificationSyncJobService` scheduling and errors using Android Studio Logcat.

**Expected:** A valid session permits loading dashboard notifications and the OS permits displaying them; this job is not a WorkManager worker.

**Fix:** Android's `NotificationSyncJobService` requires a saved session and loads dashboard notifications through `DeveloperRepository`. Inspect session validity, platform job scheduling and notification permission/settings rather than looking for a WorkManager worker.

## Images do not render

**Check:** Open the failing media URL in a browser and inspect its HTTP status/content type. For profile uploads, inspect Supabase Storage policy errors.

**Expected:** The URL returns a decodable image rather than an HTML error/login page; the upload operation is permitted by Storage policies.

**Fix:** The Android client uses Coil. Verify that stored media URLs return decodable images. For profile uploads, check Supabase Storage configuration and policies as well as client image handling.

## Dashboard build fails

**Check:** From the website checkout, compare `.env.local` variable names with `.env.example` without exposing values, then run the checks below in order.

**Expected:** Type-check and lint should finish successfully before investigating a production build. The first failure identifies the next issue; these commands have not been run for this documentation review.

**Fix:** Configure `.env.local` from the [website's example](https://github.com/FreetimeMaker/Luma-Store-Website/blob/HEAD/.env.example). Run the declared checks in order:

```bash
npm run type-check
npm run lint
npm run build
```

These are troubleshooting commands, not results from this documentation update. Keep service-role keys and email/webhook secrets server-only. See [Getting Started](/projects/luma-store/getting-started) for configuration.
