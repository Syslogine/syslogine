---
sidebar_position: 5
title: "Search Packages"
sidebar_label: "Search Packages"
description: "Search and query packages in Alpine Linux - find packages and display detailed package information."
keywords:
  - "alpine search packages"
  - "apk search"
  - "apk info"
  - "find packages"
  - "package information"
tags:
  - alpine
  - search-packages
  - apk-search
  - apk-info
  - package-query
slug: /linux/alpine/software/package-management/search-packages
---

# Search Packages

Search for packages in repositories and display detailed package information.

## Commands

- [apk search](./search-packages/apk-search) - Search for packages by name or description
- [apk info](./search-packages/apk-info) - Display detailed package information

## Quick Examples

**Search by name:**
```bash
apk search nginx
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

## Common Search Patterns

**Development packages:**
```bash
apk search '*-dev'
```

**Python packages:**
```bash
apk search 'py3-*'
```

**Library packages:**
```bash
apk search 'lib*'
```

## See Also

- [apk search](./search-packages/apk-search) - Search for packages
- [apk info](./search-packages/apk-info) - Package information
- [Package Management](../package-management/)