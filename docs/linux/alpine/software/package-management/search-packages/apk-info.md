---
sidebar_position: 2
title: "apk info"
sidebar_label: "apk info"
description: "Display package information in Alpine Linux - show package details, contents, dependencies with apk info command."
keywords:
  - "apk info"
  - "package information"
  - "package details"
  - "alpine package info"
  - "show package"
tags:
  - alpine
  - apk-info
  - package-info
  - package-details
slug: /linux/alpine/software/package-management/search-packages/apk-info
---

# apk info

Display information about packages.

## Syntax

```bash
apk info [OPTIONS] [PACKAGE...]
```

## Description

Shows detailed information about packages. Without arguments, lists all installed packages. With package names, displays detailed information for those packages.

## Options

| Option | Description |
|--------|-------------|
| `-a, --all` | List all packages (installed and available) |
| `-i, --installed` | List only installed packages |
| `-e, --exact` | Exact package name match |
| `-L, --contents` | List files in package |
| `-W, --who-owns` | Show package owning file |
| `-R, --depends` | Show package dependencies |
| `-r, --rdepends` | Show reverse dependencies |
| `-s, --size` | Show package size |
| `-d, --description` | Show package description |
| `-w, --webpage` | Show package webpage |

## Examples

**List installed packages:**
```bash
apk info
```

**Show package details:**
```bash
apk info nginx
```

**List package contents:**
```bash
apk info -L nginx
```

**Find package owning file:**
```bash
apk info -W /usr/sbin/nginx
```

**Show dependencies:**
```bash
apk info -R nginx
```

**Show reverse dependencies:**
```bash
apk info -r nginx
```

**Show package size:**
```bash
apk info -s nginx
```

**Show description:**
```bash
apk info -d nginx
```

**Show webpage:**
```bash
apk info -w nginx
```

**Multiple options:**
```bash
apk info -dsw nginx
```

**Check if installed:**
```bash
apk info -e nginx && echo "Installed" || echo "Not installed"
```

## Output Examples

**Standard list:**
```
nginx-1.24.0-r1
php-8.1.12-r0
mysql-8.0.31-r0
```

**With description (-d):**
```
nginx-1.24.0-r1 description:
HTTP and reverse proxy server
```

**File list (-L):**
```
nginx-1.24.0-r1 contains:
/etc/nginx/
/etc/nginx/nginx.conf
/usr/sbin/nginx
```

**Dependencies (-R):**
```
nginx-1.24.0-r1 depends on:
pcre
zlib
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Package not found |

## Notes

- `-L` only works for installed packages
- `-W` searches installed packages only
- Combine options for detailed output
- Use with grep for filtering

## Common Queries

**Find command's package:**
```bash
apk info -W $(which nginx)
```

**List config files:**
```bash
apk info -L nginx | grep '/etc/'
```

**Check dependencies:**
```bash
apk info -R nginx
```

**Find what needs package:**
```bash
apk info -r musl
```

## Related Commands

- [apk search](./apk-search) - Search for packages
- [apk add](../install-packages) - Install packages
- [apk list](../../) - Alternative listing

## See Also

- [Package Management](../)
- `man apk-info`