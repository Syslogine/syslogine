---
sidebar_position: 1
title: "apk update"
sidebar_label: "apk update"
description: "Update repository indexes in Alpine Linux - refresh package lists with apk update command to get latest available packages."
keywords:
  - "apk update"
  - "alpine update"
  - "refresh repositories"
  - "update indexes"
  - "repository update"
tags:
  - alpine
  - apk-update
  - repository-update
  - package-indexes
slug: /linux/alpine/software/package-management/update-packages/apk-update
---

# apk update

Update the local repository index from configured repositories.

## Syntax

```bash
apk update [OPTIONS]
```

## Description

Fetches the latest package index files from all configured repositories. Updates the local cache of available packages and their versions. Does not install or upgrade any packages.

## Options

| Option | Description |
|--------|-------------|
| `--allow-untrusted` | Allow untrusted repositories |
| `--repositories-file FILE` | Use alternate repositories file |
| `-q, --quiet` | Suppress output |

## Examples

**Standard update:**
```bash
apk update
```

**Quiet update:**
```bash
apk update -q
```

**Custom repositories file:**
```bash
apk update --repositories-file /etc/apk/repositories.backup
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Network error or repository unreachable |
| 2 | Invalid repository configuration |

## When to Run

- Before installing new packages
- Before upgrading system
- After modifying `/etc/apk/repositories`
- Daily/weekly maintenance

## Notes

- Requires network connection
- Index files cached in `/var/cache/apk/`
- Does not modify installed packages
- Fast operation (downloads only index files)

## Common Usage

**Before installation:**
```bash
apk update && apk add nginx
```

**Before upgrade:**
```bash
apk update && apk upgrade
```

**Check for updates:**
```bash
apk update && apk version
```

## Configuration Files

| File | Purpose |
|------|---------|
| `/etc/apk/repositories` | Repository list |
| `/var/cache/apk/` | Index cache location |

## Related Commands

- [apk upgrade](./update-packages/apk-upgrade) - Upgrade packages
- [apk add](../update-packages/install-packages) - Install packages
- [Package Management](../)

## See Also

- `man apk-update`