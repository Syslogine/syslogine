---
sidebar_position: 3
title: "apk del"
sidebar_label: "apk del"
description: "Remove software packages from Alpine Linux - delete packages with apk del command, remove dependencies, clean up packages, and uninstall software."
keywords:
  - "alpine remove packages"
  - "apk del"
  - "delete packages"
  - "uninstall alpine"
  - "remove software"
tags:
  - alpine
  - apk-del
  - remove-packages
  - package-removal
  - uninstall
slug: /linux/alpine/software/package-management/remove-packages
---

# apk del

Remove packages from the system.

## Syntax

```bash
apk del [OPTIONS] PACKAGE...
```

## Options

| Option | Description |
|--------|-------------|
| `-r, --rdepends` | Remove reverse dependencies |
| `--no-scripts` | Don't execute uninstall scripts |
| `-i, --interactive` | Confirm before removing |
| `-s, --simulate` | Simulate without removing |
| `--purge` | Remove configuration files |

## Examples

**Remove single package:**
```bash
apk del nginx
```

**Remove multiple packages:**
```bash
apk del nginx php mysql
```

**Remove with dependencies:**
```bash
apk del -r nginx
```

**Remove virtual package:**
```bash
apk del .build-deps
```

**Interactive removal:**
```bash
apk del -i nginx
```

**Simulate removal:**
```bash
apk del -s nginx
```

**Remove without scripts:**
```bash
apk del --no-scripts nginx
```

## Virtual Packages

Remove entire groups at once:

```bash
# Create virtual package
apk add --virtual .build-deps gcc make

# Remove all at once
apk del .build-deps
```

## Dependency Handling

- **Explicit packages** - Removed when requested
- **Dependencies** - Removed only if nothing else needs them
- **Orphaned packages** - Remain installed unless manually removed

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Package not found or error |
| 2 | Invalid syntax |

## Notes

- Removing non-existent packages shows warning but exits 0
- Configuration files may remain after removal
- Dependencies of other packages are not removed
- Check dependencies before removing system packages

## Safety Tips

**Critical packages to avoid:**
- `alpine-base` - Base system
- `apk-tools` - Package manager
- `busybox` - Core utilities
- `musl` - C library

**Check before removing:**
```bash
apk info -r packagename  # What requires this?
apk info -R packagename  # What does this require?
```

## Related Commands

- [apk add](../package-management/install-packages) - Install packages
- [apk info](../package-management/search-packages/apk-info) - Show package information
- [apk cache](../package-management/use-package-tools/apk-cache) - Manage cache

## See Also

- [Package Management](../)
- `man apk-del`