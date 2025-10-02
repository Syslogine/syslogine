---
sidebar_position: 1
title: "apk search"
sidebar_label: "apk search"
description: "Search for packages in Alpine Linux repositories - find packages by name or description with apk search command."
keywords:
  - "apk search"
  - "alpine search"
  - "find packages"
  - "search repositories"
  - "package search"
tags:
  - alpine
  - apk-search
  - package-search
  - find-packages
slug: /linux/alpine/software/package-management/search-packages/apk-search
---

# apk search

Search for packages in configured repositories.

## Syntax

```bash
apk search [OPTIONS] PATTERN...
```

## Description

Searches for packages matching the given pattern(s). Searches both package names and descriptions. Supports wildcards and regular expressions.

## Options

| Option | Description |
|--------|-------------|
| `-e, --exact` | Match package name exactly |
| `-d, --description` | Search in descriptions only |
| `-x, --regex` | Use regular expressions |
| `-a, --all` | Show all package versions |
| `-o, --origin` | List packages by origin |

## Examples

**Search by name:**
```bash
apk search nginx
```

**Exact match:**
```bash
apk search -e nginx
```

**Search in descriptions:**
```bash
apk search -d "web server"
```

**Wildcard search:**
```bash
apk search 'php*'
```

**Regular expression:**
```bash
apk search -x '^nginx-'
```

**Show all versions:**
```bash
apk search -a nginx
```

**List by origin:**
```bash
apk search -o
```

**Multiple patterns:**
```bash
apk search nginx apache
```

## Output Format

```
package-version-release - Description
```

Example:
```
nginx-1.24.0-r1 - HTTP and reverse proxy server
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Packages found |
| 1 | No matches |

## Wildcards

- `*` - Multiple characters
- `?` - Single character
- Use quotes for patterns with spaces

## Common Patterns

**Development packages:**
```bash
apk search '*-dev'
```

**Documentation:**
```bash
apk search '*-doc'
```

**Python packages:**
```bash
apk search 'py3-*'
```

**Libraries:**
```bash
apk search 'lib*'
```

## Notes

- Searches are case-insensitive
- Run `apk update` first for latest list
- Use quotes for special characters
- Combine with grep for filtering

## Related Commands

- [apk info](./apk-info) - Show package details
- [apk add](../install-packages) - Install packages
- [apk update](../update-packages/apk-update) - Update indexes

## See Also

- [Package Management](../)
- `man apk-search`