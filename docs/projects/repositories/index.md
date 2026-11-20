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

Endpoints were checked against the public homepage. Package metadata and Linux signing keys were inspected in [revision `f9eb647`](https://github.com/FreetimeMaker/Repoitories/tree/f9eb647688a3dd010a77f4bdda92ed630bc26505). Package installation and dependency resolution were not tested.
