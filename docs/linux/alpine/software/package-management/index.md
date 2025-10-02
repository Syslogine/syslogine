---
sidebar_position: 1
title: "Package Management"
sidebar_label: "Package Management"
description: "Alpine Package Keeper (APK) - package management system for Alpine Linux, manage software packages, repositories, and system updates."
keywords:
  - "alpine package management"
  - "apk package manager"
  - "alpine apk"
  - "package management alpine"
  - "apk commands"
tags:
  - alpine
  - package-management
  - apk
  - software-management
slug: /linux/alpine/software/package-management
---

# Package Management

Alpine Linux uses **APK (Alpine Package Keeper)** as its package management system.

## APK Commands

### Package Installation
- [apk add](./package-management/install-packages) - Install packages and dependencies

### Package Removal
- [apk del](./package-management/remove-packages) - Remove packages from system

### System Updates
- [apk update](./package-management/update-packages/apk-update) - Update repository indexes
- [apk upgrade](./package-management/update-packages/apk-upgrade) - Upgrade installed packages

### Package Information
- [apk search](./package-management/search-packages/apk-search) - Search for packages
- [apk info](./package-management/search-packages/apk-info) - Display package information

### Package Tools
- [apk cache](./package-management/use-package-tools/apk-cache) - Manage package cache
- [apk fix](./package-management/use-package-tools/apk-fix) - Repair package installations
- [apk verify](./package-management/use-package-tools/apk-verify) - Verify package integrity
- [apk audit](./package-management/use-package-tools/apk-audit) - Audit security vulnerabilities
- [apk dot](./package-management/use-package-tools/apk-dot) - Generate dependency graphs
- [apk stats](./package-management/use-package-tools/apk-stats) - Display repository statistics

## Basic Syntax

```bash
apk [OPTIONS] COMMAND [ARGUMENTS]
```

## Common Options

| Option | Description |
|--------|-------------|
| `-v, --verbose` | Verbose output |
| `-q, --quiet` | Quiet mode |
| `-i, --interactive` | Ask before actions |
| `-s, --simulate` | Simulate operation |
| `--no-cache` | Don't use cache |
| `-U, --update-cache` | Update cache first |

## Configuration Files

| File | Purpose |
|------|---------|
| `/etc/apk/repositories` | Repository list |
| `/etc/apk/world` | Installed packages |
| `/var/cache/apk/` | Package cache |
| `/lib/apk/db/` | APK database |

## Quick Examples

**Update system:**
```bash
apk update && apk upgrade
```

**Install package:**
```bash
apk add nginx
```

**Search package:**
```bash
apk search nginx
```

**Remove package:**
```bash
apk del nginx
```

**Show package info:**
```bash
apk info nginx
```

## See Also

- [Alpine Wiki - APK](https://wiki.alpinelinux.org/wiki/Alpine_Package_Keeper)
- `man apk`