---
sidebar_position: 4
title: "apk audit"
sidebar_label: "apk audit"
description: "Audit system for security vulnerabilities in Alpine Linux - check installed packages for known CVEs with apk audit command."
keywords:
  - "apk audit"
  - "alpine security"
  - "security audit"
  - "vulnerability scan"
  - "CVE check"
tags:
  - alpine
  - apk-audit
  - security
  - vulnerabilities
  - audit
slug: /linux/alpine/software/package-management/use-package-tools/apk-audit
---

# apk audit

Audit system for known security vulnerabilities.

## Syntax

```bash
apk audit [OPTIONS]
```

## Description

Checks installed packages against the Alpine security database to identify known vulnerabilities (CVEs).

## Options

| Option | Description |
|--------|-------------|
| `-r, --recursive` | Check dependencies recursively |
| `--backup` | Show backup solutions |

## Examples

**Basic security audit:**
```bash
apk audit
```

**Recursive audit:**
```bash
apk audit -r
```

**Show backup solutions:**
```bash
apk audit --backup
```

## Output Format

```
openssl-1.1.1k-r0:
  - CVE-2021-3450: CA certificate check bypass
  - CVE-2021-3449: NULL pointer deref in signature_algorithms
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | No vulnerabilities found |
| 1 | Vulnerabilities detected |

## Notes

- Requires updated security database
- Run `apk update` before auditing
- Apply updates to fix vulnerabilities
- Part of regular security maintenance

## Common Workflow

**Security check:**
```bash
apk update
apk audit
```

**Audit and upgrade:**
```bash
apk update
apk audit
apk upgrade
```

**Check after upgrade:**
```bash
apk upgrade
apk audit
```

## Related Commands

- [apk update](../update-packages/apk-update) - Update indexes
- [apk upgrade](../update-packages/apk-upgrade) - Upgrade packages
- [apk verify](./apk-verify) - Verify integrity
- [Package Tools](./)

## See Also

- `man apk-audit`