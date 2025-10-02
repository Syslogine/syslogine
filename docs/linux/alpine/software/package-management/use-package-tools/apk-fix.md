---
sidebar_position: 2
title: "apk fix"
sidebar_label: "apk fix"
description: "Repair package installations in Alpine Linux - fix broken packages, reinstall corrupted files, and repair dependencies with apk fix command."
keywords:
  - "apk fix"
  - "alpine repair"
  - "fix packages"
  - "repair installation"
  - "broken packages"
tags:
  - alpine
  - apk-fix
  - repair
  - fix-packages
slug: /linux/alpine/software/package-management/use-package-tools/apk-fix
---

# apk fix

Repair or reinstall packages to fix installation issues.

## Syntax

```bash
apk fix [OPTIONS] [PACKAGE...]
```

## Description

Reinstalls packages to repair corrupted installations, fix broken dependencies, or restore missing files. Without package names, checks and repairs all installed packages.

## Options

| Option | Description |
|--------|-------------|
| `-d, --depends` | Fix dependencies only |
| `-r, --reinstall` | Force reinstallation |
| `-u, --upgrade` | Prefer upgrading packages |
| `-x, --xattr` | Fix extended attributes |
| `-s, --simulate` | Simulate without changes |

## Examples

**Fix all packages:**
```bash
apk fix
```

**Fix specific package:**
```bash
apk fix nginx
```

**Force reinstall:**
```bash
apk fix --reinstall nginx
```

**Fix dependencies only:**
```bash
apk fix -d
```

**Fix with upgrade:**
```bash
apk fix -u
```

**Simulate fix:**
```bash
apk fix -s
```

**Fix multiple packages:**
```bash
apk fix nginx mysql php
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Fix failed |

## Notes

- Useful after filesystem corruption
- Repairs missing or modified files
- Does not modify configuration files
- Requires network access

## When to Use

**Corrupted binaries:**
```bash
apk fix --reinstall packagename
```

**Missing dependencies:**
```bash
apk fix -d
```

**After disk issues:**
```bash
apk fix
```

**Broken package state:**
```bash
apk fix --reinstall
```

## Related Commands

- [apk verify](./apk-verify) - Verify package integrity
- [apk add](../install-packages) - Install packages
- [Package Tools](./)

## See Also

- `man apk-fix`