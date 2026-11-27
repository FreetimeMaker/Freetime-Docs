# F-Droid

Open the [repository homepage](https://repo.free-time.me/) and choose **Add to F-Droid**, or scan the QR code. To add it manually, enter `https://repo.free-time.me/fdroid/repo` in your client's **Repositories** settings. Verify the SHA-256 signing fingerprint before accepting it:

```text
525AAD9B346F70388D96E281C061BC184B5AFEC35872BF1E140AD8063CC2A1C2
```

Refresh the index and search for the app. If you have an old repository URL, add and verify the new entry before removing the old one.

## Build metadata and index status

Reviewed on 2026-11-27 against [repository revision `28a73c7`](https://github.com/FreetimeMaker/Repoitories/tree/28a73c79b4ae9b2d8e383569fbe5f50432f8aefd). Build metadata describes what CI should build; indexes describe what the repository lists. Compared with `5178f9f`, the two recipes were reformatted without changing their current versions or build entries. The checked-in main v1 and v2 indexes changed their repository timestamps, not their package entries. The hosted v1 and v2 index contents matched the pinned copies at review.

| App                                    | Current metadata (version/code) | Highest in checked-in main v1/v2 indexes | Highest in hosted main v1/v2 indexes |
| -------------------------------------- | ------------------------------- | ---------------------------------------- | ------------------------------------ |
| GeoWeather (`com.freetime.geoweather`) | `4.7.6` / `95`                  | `4.7.6` / `95`                           | `4.7.6` / `95`                       |
| Luma Store (`com.freetime.lumastore`)  | `4.4.2` / `32`                  | `4.4.2` / `32`                           | `4.4.2` / `32`                       |

The earlier GeoWeather `4.7.4` / `93` and Luma Store `4.4.3` / `33` recipes are no longer in the metadata, and neither version appeared in the indexes checked. APK downloads and installations were not tested. The Pages workflow deploys the main F-Droid index and its files, not the separate archive.

Luma Store's metadata retains the `NonFreeNet` anti-feature for optional Google sign-in and GitHub or GitLab sign-in for developer features. Browsing and installing apps do not require an account.

## Build CI changes

- Before staging an automatic metadata update, CI checks the source revisions for enabled new or changed recipes and the candidate current recipe. If their Gradle or TOML configuration references `repo.free-time.me/maven`, CI restores that app's previous metadata and skips its update. This filter applies to F-Droid update CI, not to Maven clients or published artifacts.
- Automatic updates are staged as artifacts. Before writing candidate metadata to `main`, CI scans and test-builds new or changed recipes and the candidate current version in the official F-Droid buildserver container. Scanner errors, build failures, missing APKs, and reference APK mismatches block the batch. Stale or historical updates are checked again before applying them.
- The workflow no longer patches the source scanner to allow the Freetime Maven endpoint. It still pins `fdroidserver`, uses Python `3.12` for APK signature metadata copying, and logs APK ZIP differences when reproducibility verification fails.
- The publishing build still prepares Android SDK platforms listed by `sdkmanager` from API 24 through 37.2, skips extra platform requests outside that range, and installs Build Tools `34.0.0` and `35.0.0`.
