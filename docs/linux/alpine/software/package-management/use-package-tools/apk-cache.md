---
sidebar_position: 1
title: "apk cache"
sidebar_label: "apk cache"
description: "Manage local package cache in Alpine Linux - download packages, clean cache, and synchronize cached packages with apk cache command."
keywords:
  - "apk cache"
  - "alpine cache"
  - "package cache"
  - "cache management"
  - "clean cache"
tags:
  - alpine
  - apk-cache
  - cache
  - cache-management
slug: /linux/alpine/software/package-management/use-package-tools/apk-cache
---

# apk cache

Manage the local package cache directory.

## Syntax

```bash
apk cache [OPTIONS] COMMAND
```

## Commands

| Command | Description |
|---------|-------------|
| `download` | Download packages to cache |
| `clean` | Remove all cached packages |
| `sync` | Remove packages not in world |
| `purge` | Alias for clean |

## Options

| Option | Description |
|--------|-------------|
| `-l, --link` | Create hard links instead of copies |
| `-s, --simulate` | Simulate operation |

## Examples

**Download package to cache:**
```bash
apk cache download nginx
```

**Download multiple packages:**
```bash
apk cache download nginx mysql php
```

**Clean entire cache:**
```bash
apk cache clean
```

**Remove unused packages:**
```bash
apk cache sync
```

**Simulate cleanup:**
```bash
apk cache clean -s
```

**Download with hard links:**
```bash
apk cache download -l nginx
```

**Download all installed packages:**
```bash
apk cache download
```

## Cache Location

Default: `/var/cache/apk/`

**Check cache size:**
```bash
du -sh /var/cache/apk/
```

**List cached packages:**
```bash
ls -lh /var/cache/apk/
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Error |

## Notes

- Cache useful for offline installations
- Clean cache to free disk space
- Docker builds use `--no-cache` option
- Cache survives system upgrades

## Common Use Cases

**Free disk space:**
```bash
apk cache clean
```

**Prepare offline installation:**
```bash
apk cache download $(cat /etc/apk/world)
```

**Remove old versions:**
```bash
apk cache sync
```

## Related Commands

- [apk add](../install-packages) - Install packages
- [apk fix](./apk-fix) - Repair installations
- [Package Tools](./)

## See Also

- `man apk-cache`