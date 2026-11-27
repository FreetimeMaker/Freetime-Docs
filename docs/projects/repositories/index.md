# Repositories

[Freetime Repository](https://repo.free-time.me/) hosts packages for Android, Linux, Java and Kotlin. [FreetimeMaker/Repoitories](https://github.com/FreetimeMaker/Repoitories) contains the package trees and publishing workflows. To install packages or resolve dependencies, use the hosted endpoint for your client; you do not need to clone the GitHub repository.

| Client                              | Endpoint                                | Scope                                 |
| ----------------------------------- | --------------------------------------- | ------------------------------------- |
| [F-Droid](./f-droid.md)             | `https://repo.free-time.me/fdroid/repo` | Android apps                          |
| [APT](./apt.md)                     | `https://repo.free-time.me/apt/`        | Debian/Ubuntu, `stable main`, `amd64` |
| [DNF / YUM](./dnf-yum.md)           | `https://repo.free-time.me/yum/x86_64/` | RPM packages for `x86_64`             |
| [Maven / Gradle](./maven-gradle.md) | `https://repo.free-time.me/maven/`      | Java and Kotlin artifacts             |

The repository homepage shows expandable package catalogs and setup instructions. Pages generates the counts and version listings from the same snapshot it deploys: the F-Droid v2 index, APT package lists, RPM primary metadata, and Maven POMs.

## Troubleshooting and publishing

- **Nothing appears after refresh:** confirm that your client uses the endpoint in the table, not the GitHub URL or the repository homepage. For Linux, check the architecture and the first metadata error.
- **Dependency not found:** check the group, case-sensitive artifact name and exact release version. Where available, inspect the artifact's `maven-metadata.xml`.
- **Publishing:** follow the upstream [F-Droid](https://github.com/FreetimeMaker/Repoitories/blob/main/fdroid/README.md), [Linux](https://github.com/FreetimeMaker/Repoitories/blob/main/packaging/linux/README.md) and [Maven](https://github.com/FreetimeMaker/Repoitories/blob/main/packaging/maven/README.md) maintainer guides. Client setup does not grant publishing access.

## Repository review

Reviewed on 2026-11-27 by comparing [remote HEAD `28a73c7`](https://github.com/FreetimeMaker/Repoitories/tree/28a73c79b4ae9b2d8e383569fbe5f50432f8aefd) with the previous review at [`5178f9f`](https://github.com/FreetimeMaker/Repoitories/tree/5178f9fc901f83d0485819f580cd3623f6a4e0a5). The pinned APT and RPM indexes replaced the previous `license-gen` and XMRiGUI versions. The hosted APT package list and RPM primary metadata were checked separately and listed the same versions:

| Package       | APT (`stable main`) | DNF / YUM                 |
| ------------- | ------------------- | ------------------------- |
| `license-gen` | `1.1.0` (`all`)     | `1.2.0-1.fc45` (`noarch`) |
| XMRiGUI       | `2.1.0` (`amd64`)   | `2.1.0-1.fc45` (`x86_64`) |

The Maven package tree and Linux public signing key files are unchanged between the two revisions. See [F-Droid build metadata and index status](./f-droid.md#build-metadata-and-index-status) for the separate Android checks. Package installation and dependency resolution were not tested.
