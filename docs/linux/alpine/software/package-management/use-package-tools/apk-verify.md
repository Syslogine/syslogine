---
sidebar_position: 3
title: "apk verify"
sidebar_label: "apk verify"
description: "Verify package integrity in Alpine Linux - check checksums, verify installed files, and detect modified packages with apk verify command."
keywords:
  - "apk verify"
  - "alpine verify"
  - "package integrity"
  - "verify checksums"
  - "check packages"
tags:
  - alpine
  - apk-verify
  - verify
  - integrity
slug: /linux/alpine/software/package-management/use-package-tools/apk-verify
---

# apk verify

Verify integrity and checksums of installed packages.

## Syntax

```bash
apk verify [OPTIONS] [PACKAGE...]
```

## Description

Checks the integrity of installed packages by verifying file checksums and permissions. Detects modified, missing, or corrupted files.

## Options

| Option | Description |
|--------|-------------|
| `-v, --verbose` | Show verification details |
| `-q, --quiet` | Only show errors |
| `--check` | Exit with error if issues found |

## Examples

**Verify all packages:**
```bash
apk verify
```

**Verify specific package:**
```bash
apk verify nginx
```

**Verbose verification:**
```bash
apk verify -v nginx
```

**Quiet mode (errors only):**
```bash
apk verify -q
```

**Verify multiple packages:**
```bash
apk verify nginx mysql php
```

**Check and exit with status:**
```bash
apk verify --check && echo "OK" || echo "Issues found"
```

## Output

**Modified files:**
```
WARNING: nginx: checksum mismatch: /etc/nginx/nginx.conf
```

**Missing files:**
```
WARNING: nginx: missing: /usr/sbin/nginx
```

**Permission changes:**
```
WARNING: nginx: permissions changed: /etc/nginx/
```

## Return Values

| Code | Meaning |
|------|---------|
| 0 | All verified successfully |
| 1 | Verification issues found |

## Notes

- Configuration files may show mismatches (expected)
- Verifies checksums, not file contents
- Useful for security auditing
- Run after suspected filesystem corruption

## Common Usage

**Security check:**
```bash
apk verify
```

**Check specific service:**
```bash
apk verify nginx
```

**Verify system integrity:**
```bash
apk verify -v
```

## Related Commands

- [apk fix](./apk-fix) - Repair packages
- [apk audit](./apk-audit) - Security audit
- [Package Tools](./)

## See Also

- `man apk-verify`