---
sidebar_position: 2
title: "apk upgrade"
sidebar_label: "apk upgrade"
description: "Upgrade installed packages in Alpine Linux - upgrade packages to latest versions with apk upgrade command to keep system current."
keywords:
  - "apk upgrade"
  - "alpine upgrade"
  - "upgrade packages"
  - "update software"
  - "system upgrade"
tags:
  - alpine
  - apk-upgrade
  - package-upgrade
  - system-upgrade
slug: /linux/alpine/software/package-management/update-packages/apk-upgrade
---

# apk upgrade

Upgrade installed packages to their latest available versions.

## Syntax

```bash
apk upgrade [OPTIONS] [PACKAGE...]
```

## Description

Upgrades installed packages to the newest versions available in configured repositories. Without package names, upgrades all packages. Specific packages can be targeted by listing them.

## Options

| Option | Description |
|--------|-------------|
| `-a, --available` | Upgrade to any available version |
| `-l, --latest` | Always select latest version |
| `--no-scripts` | Don't execute upgrade scripts |
| `-i, --interactive` | Confirm before upgrading |
| `-s, --simulate` | Simulate without upgrading |
| `--no-cache` | Don't use package cache |

## Examples

**Upgrade all packages:**
```bash
apk upgrade
```

**Upgrade with index update:**
```bash
apk update && apk upgrade
```

**Upgrade specific packages:**
```bash
apk upgrade nginx mysql
```

**Interactive upgrade:**
```bash
apk upgrade -i
```

**Simulate upgrade:**
```bash
apk upgrade -s
```

**Upgrade available versions:**
```bash
apk upgrade -a
```

**Upgrade without cache:**
```bash
apk upgrade --no-cache
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Upgrade failed |
| 2 | Invalid syntax |

## Notes

- Always run `apk update` first
- Kernel upgrades require reboot
- Services may need restart after upgrade
- Check logs at `/var/log/messages` for issues

## Post-Upgrade Actions

**Check services:**
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

## Common Workflows

**Standard upgrade:**
```bash
apk update && apk upgrade
```

**Safe upgrade with review:**
```bash
apk update && apk upgrade -i
```

**Check what would upgrade:**
```bash
apk update && apk upgrade -s
```

**Docker image upgrade:**
```bash
apk update && apk upgrade --no-cache
```

## Configuration Files

| File | Purpose |
|------|---------|
| `/etc/apk/world` | Explicitly installed packages |
| `/lib/apk/db/installed` | Installed package database |

## Related Commands

- [apk update](./apk-update) - Update repository indexes
- [apk add](../install-packages) - Install packages
- [apk audit](../use-package-tools/apk-audit) - Check vulnerabilities

## See Also

- [Package Management](../)
- `man apk-upgrade`