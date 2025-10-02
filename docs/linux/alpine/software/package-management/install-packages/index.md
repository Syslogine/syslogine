---
sidebar_position: 2
title: "apk add"
sidebar_label: "apk add"
description: "Install software packages in Alpine Linux - add packages with apk add command, manage dependencies, install from repositories, and add virtual packages."
keywords:
  - "alpine install packages"
  - "apk add"
  - "install software alpine"
  - "add packages"
  - "package installation"
tags:
  - alpine
  - apk-add
  - install-packages
  - package-installation
slug: /linux/alpine/software/package-management/install-packages
---

# apk add

Install packages and their dependencies from configured repositories.

## Syntax

```bash
apk add [OPTIONS] PACKAGE...
```

## Options

| Option | Description |
|--------|-------------|
| `-t, --virtual NAME` | Create virtual package |
| `-u, --upgrade` | Upgrade if already installed |
| `-l, --latest` | Select latest version |
| `--no-scripts` | Don't execute install scripts |
| `--no-cache` | Don't use package cache |
| `-X, --repository REPO` | Use specific repository |
| `-i, --interactive` | Confirm before installing |
| `-s, --simulate` | Simulate without installing |

## Examples

**Install single package:**
```bash
apk add nginx
```

**Install multiple packages:**
```bash
apk add nginx php mysql
```

**Install with cache update:**
```bash
apk add -U nginx
```

**Install specific version:**
```bash
apk add 'nginx=1.24.0-r1'
```

**Install without cache (Docker):**
```bash
apk add --no-cache nginx
```

**Install to virtual package:**
```bash
apk add --virtual .build-deps gcc make
```

**Install from specific repository:**
```bash
apk add nginx@edge
```

**Simulate installation:**
```bash
apk add -s nginx
```

## Virtual Packages

Group related packages for easier removal:

```bash
# Create virtual package
apk add --virtual .build-deps gcc make libc-dev

# Remove entire group
apk del .build-deps
```

**Common naming:**
- `.build-deps` - Build dependencies
- `.run-deps` - Runtime dependencies
- `.dev-deps` - Development dependencies

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Package not found or error |
| 2 | Invalid syntax |

## Notes

- Automatically resolves dependencies
- Installing existing packages is safe (no-op)
- Use `--no-cache` in Docker to reduce image size
- Virtual packages don't appear in `/etc/apk/world`

## Related Commands

- [apk del](../package-management/remove-packages) - Remove packages
- [apk search](../package-management/search-packages/apk-search) - Search for packages
- [apk info](../package-management/search-packages/apk-info) - Show package information
- [apk update](../package-management/update-packages/apk-update) - Update repository indexes

## See Also

- [Package Management](../)
- `man apk-add`