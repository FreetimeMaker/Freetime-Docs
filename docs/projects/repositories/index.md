# Repositories

[Freetime Repository](https://repo.free-time.me/) hosts packages for Android, Linux, Java and Kotlin. [FreetimeMaker/Repoitories](https://github.com/FreetimeMaker/Repoitories) contains the package trees and publishing workflows. To install packages or resolve dependencies, use the hosted endpoint for your client; you do not need to clone the GitHub repository.

| Client | Endpoint | Scope |
| --- | --- | --- |
| [F-Droid](./f-droid.md) | `https://repo.free-time.me/fdroid/repo` | Android apps |
| [APT](./apt.md) | `https://repo.free-time.me/apt/` | Debian/Ubuntu, `stable main`, `amd64` |
| [DNF / YUM](./dnf-yum.md) | `https://repo.free-time.me/yum/x86_64/` | RPM packages for `x86_64` |
| [Maven / Gradle](./maven-gradle.md) | `https://repo.free-time.me/maven/` | Java and Kotlin artifacts |

## Troubleshooting and publishing

- **Nothing appears after refresh:** confirm that your client uses the endpoint in the table, not the GitHub URL or the repository homepage. For Linux, check the architecture and the first metadata error.
- **Dependency not found:** check the group, case-sensitive artifact name and exact release version. Where available, inspect the artifact's `maven-metadata.xml`.
- **Publishing:** follow the upstream [F-Droid](https://github.com/FreetimeMaker/Repoitories/blob/main/fdroid/README.md), [Linux](https://github.com/FreetimeMaker/Repoitories/blob/main/packaging/linux/README.md) and [Maven](https://github.com/FreetimeMaker/Repoitories/blob/main/packaging/maven/README.md) maintainer guides. Client setup does not grant publishing access.

Reviewed on 2026-11-25 by comparing [remote revision `5178f9f`](https://github.com/FreetimeMaker/Repoitories/tree/5178f9fc901f83d0485819f580cd3623f6a4e0a5) with the previous review at [`a6e1e2f`](https://github.com/FreetimeMaker/Repoitories/tree/a6e1e2f0b836a98dc629523867e530b899d680b1). The newer revision changes the APT, YUM and Maven package trees; the Linux signing key file (`public.gpg`) is unchanged. See [F-Droid build metadata and index status](./f-droid.md#build-metadata-and-index-status) for the separate index checks. Package installation and dependency resolution were not tested.
