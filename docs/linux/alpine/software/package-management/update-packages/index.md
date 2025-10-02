---
sidebar_position: 4
title: "Update Packages"
sidebar_label: "Update Packages"
description: "Update and upgrade packages in Alpine Linux - refresh repository indexes and upgrade installed packages to keep system current."
keywords:
  - "alpine update packages"
  - "apk update"
  - "apk upgrade"
  - "update alpine"
  - "system updates"
tags:
  - alpine
  - update-packages
  - apk-update
  - apk-upgrade
  - system-updates
slug: /linux/alpine/software/package-management/update-packages
---

# Update Packages

Keep Alpine Linux system up to date by refreshing repository indexes and upgrading installed packages.

## Commands

- [apk update](./apk-update) - Update repository indexes
- [apk upgrade](./apk-upgrade) - Upgrade installed packages

## Standard Update Workflow

```bash
# Update indexes and upgrade packages
apk update && apk upgrade
```

## Quick Examples

**Update repository indexes:**
```bash
apk update
```

**Upgrade all packages:**
```bash
apk upgrade
```

**Update and upgrade together:**
```bash
apk update && apk upgrade
```

**Interactive upgrade:**
```bash
apk upgrade -i
```

**Simulate upgrade:**
```bash
apk upgrade -s
```

## Update Frequency

| System Type | Frequency |
|-------------|-----------|
| Production servers | Weekly |
| Development systems | Daily |
| Desktop systems | Weekly |
| Docker images | On rebuild |

## Post-Upgrade Tasks

**Check for services that need restart:**
```bash
rc-status
```

**Restart service:**
```bash
rc-service nginx restart
```

**Reboot if kernel updated:**
```bash
reboot
```

## See Also

- [apk update](./update-packages/apk-update) - Update repository indexes
- [apk upgrade](./update-packages/apk-upgrade) - Upgrade packages
- [Package Management](../)