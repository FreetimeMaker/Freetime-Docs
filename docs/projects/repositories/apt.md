# APT

The inspected APT and RPM public keys share this primary OpenPGP fingerprint:

```text
E0C7B84FAF8A9BD74ED0D40592F06B1023F0829A
```

Compare the full fingerprint before trusting a downloaded key. If it differs, stop and check for a key rotation in the upstream repository. Keep signature verification enabled.

## Add the APT source


Check that `dpkg --print-architecture` reports `amd64`. Download and inspect the binary public key:

```sh
curl -fSLo freetime-repository.gpg https://repo.free-time.me/public.gpg
gpg --show-keys --with-fingerprint freetime-repository.gpg
```

After verifying the fingerprint, install the key and refresh the repository:

```sh
sudo install -d -m 0755 /etc/apt/keyrings
sudo install -m 0644 freetime-repository.gpg /etc/apt/keyrings/freetime-repository.gpg
printf '%s\n' 'deb [arch=amd64 signed-by=/etc/apt/keyrings/freetime-repository.gpg] https://repo.free-time.me/apt/ stable main' | sudo tee /etc/apt/sources.list.d/freetime-repository.list
sudo apt update
```

Use `apt search` to find a package, then `apt-cache policy` with its name to verify the candidate's origin before installing. The `signed-by` option scopes the key to this source; do not use `apt-key` or `trusted=yes`.
