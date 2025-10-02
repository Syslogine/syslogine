---
sidebar_position: 6
title: "apk stats"
sidebar_label: "apk stats"
description: "Display repository statistics in Alpine Linux - show package counts and repository information with apk stats command."
keywords:
  - "apk stats"
  - "alpine statistics"
  - "repository stats"
  - "package count"
  - "repo info"
tags:
  - alpine
  - apk-stats
  - statistics
  - repository
slug: /linux/alpine/software/package-management/use-package-tools/apk-stats
---

# apk stats

Display statistics about repositories and packages.

## Syntax

```bash
apk stats
```

## Description

Shows statistics about configured repositories including package counts and repository information.

## Example Output

```
Total packages: 12847
Installed packages: 157
Available packages: 12690
Repository: https://dl-cdn.alpinelinux.org/alpine/v3.18/main
Repository: https://dl-cdn.alpinelinux.org/alpine/v3.18/community
```

## Examples

**Show statistics:**
```bash
apk stats
```

**Filter output:**
```bash
apk stats | grep "Installed"
```

**Count repositories:**
```bash
apk stats | grep "Repository:" | wc -l
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |

## Information Displayed

- Total packages in repositories
- Number of installed packages
- Number of available packages
- Configured repository URLs

## Notes

- Run `apk update` first for accurate stats
- Shows data from local cache
- Quick overview of system state

## Common Usage

**Check system overview:**
```bash
apk update
apk stats
```

**View installed count:**
```bash
apk stats | grep "Installed"
```

## Related Commands

- [apk info](../search-packages/apk-info) - List packages
- [apk search](../search-packages/apk-search) - Search packages
- [Package Tools](./)

## See Also

- `man apk-stats`