---
sidebar_position: 2
title: "useradd Command"
sidebar_label: "useradd"
description: "Create users with the standard useradd command - precise control for scripting and automation."
keywords:
  - "debian useradd"
  - "useradd command"
  - "automated user creation"
tags:
  - debian
  - useradd
  - automation
slug: /linux/debian/administration/user-management/user-accounts/useradd
---

# useradd Command

Standard low-level user creation command with precise control over all options.

## Basic Usage

Create user (no home directory)
```bash
sudo useradd username
```

Create user with home directory
```bash
sudo useradd -m username
```

Complete setup
```bash
sudo useradd -m -s /bin/bash -c "Full Name" username
sudo passwd username
```

## Essential Options

```bash
# Home directory
sudo useradd -m username                    # Create home
sudo useradd -d /custom/path username       # Custom location

# Shell and info
sudo useradd -s /bin/bash username          # Set shell
sudo useradd -c "John Doe" username         # Set comment

# Groups
sudo useradd -g primarygroup username       # Primary group
sudo useradd -G group1,group2 username     # Additional groups

# System user
sudo useradd -r username                    # System account
```

## Advanced Options

```bash
# Custom UID/GID
sudo useradd -u 1500 username
sudo useradd -g 1500 username

# Account expiration
sudo useradd -e 2024-12-31 username

# Password expiration
sudo useradd -f 30 username
```

## What It Does

- Adds entry to `/etc/passwd`
- Adds entry to `/etc/shadow` (locked)
- Creates home directory if `-m` used
- Does NOT set password (use `passwd`)

## Post-Creation

```bash
# Required steps
sudo passwd username
sudo usermod -aG sudo username

# Verify
id username
getent passwd username
```
