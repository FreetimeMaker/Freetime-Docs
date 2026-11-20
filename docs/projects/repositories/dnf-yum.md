# DNF/YUM

The inspected APT and RPM public keys share this primary OpenPGP fingerprint:

```text
E0C7B84FAF8A9BD74ED0D40592F06B1023F0829A
```

Compare the full fingerprint before trusting a downloaded key. If it differs, stop and check for a key rotation in the upstream repository. Keep signature verification enabled.

## Add the RPM repository


Check that `uname -m` reports `x86_64`. Download the armored public key and verify its fingerprint:

```sh
curl -fSLo freetime-repository.asc https://repo.free-time.me/yum/x86_64/public.asc
gpg --show-keys --with-fingerprint freetime-repository.asc
```

Save the following as `/etc/yum.repos.d/freetime-repository.repo`:

```ini
[freetime-repository]
name=Freetime Repository
baseurl=https://repo.free-time.me/yum/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://repo.free-time.me/yum/x86_64/public.asc
```

Run `sudo dnf --refresh makecache`. If prompted to trust metadata or package keys, compare the fingerprint with the verified key. Check that the RPM supports your distribution and release before installing; matching `x86_64` alone is not enough.
