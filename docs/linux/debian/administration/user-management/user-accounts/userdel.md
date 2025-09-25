---
sidebar_position: 6
title: "userdel Command"
sidebar_label: "userdel"
description: "Remove users with the standard userdel command - precise control for automation and scripting."
keywords:
  - "debian userdel"
  - "userdel command"
  - "automated user removal"
tags:
  - debian
  - userdel
  - automation
slug: /linux/debian/administration/user-management/user-accounts/userdel
---

# userdel Command

Standard low-level user deletion command with precise control for scripting.

## Basic Usage

```bash
# Remove user (keep home directory)
sudo userdel username

# Remove user and home directory
sudo userdel -r username

# Force removal (even if logged in)
sudo userdel -f username
```

## Options

```bash
# Remove home directory and mail spool
sudo userdel -r username

# Force removal
sudo userdel -f username

# Remove even if user is logged in
sudo userdel -Z username  # SELinux contexts
```

## What It Does

- Removes user from `/etc/passwd`
- Removes from `/etc/shadow`
- Removes from `/etc/group` entries
- Optionally removes home directory (`-r`)
- Optionally removes mail spool (`-r`)

## What It Doesn't Do

- Find files owned by user outside home
- Kill user processes
- Remove cron jobs
- Clean application data

## Manual Cleanup

```bash
# Kill user processes
sudo pkill -u username

# Find remaining files
sudo find / -user username -exec rm -rf {} \; 2>/dev/null

# Remove cron jobs
sudo crontab -r -u username

# Clean logs
sudo find /var/log -name "*username*" -delete
```

## Scripted Removal

```bash
#!/bin/bash
username="$1"

# Kill processes
sudo pkill -u "$username"

# Remove user and home
sudo userdel -r "$username"

# Clean remaining files
sudo find / -user "$username" -delete 2>/dev/null

echo "User $username removed"
```
