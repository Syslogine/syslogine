---
sidebar_position: 3
title: "usermod Command"
sidebar_label: "usermod"
description: "Modify existing user accounts with usermod - change groups, shell, home directory, and account properties."
keywords:
  - "debian usermod"
  - "modify users"
  - "change user properties"
tags:
  - debian
  - usermod
  - user-modification
slug: /linux/debian/administration/user-management/user-accounts/usermod
---

# usermod Command

Modify existing user account properties including groups, shell, and home directory.

## Basic Usage

```bash
# Add user to group
sudo usermod -aG groupname username

# Change primary group
sudo usermod -g newgroup username

# Change shell
sudo usermod -s /bin/zsh username

# Change home directory
sudo usermod -d /new/home -m username
```

## Group Management

```bash
# Add to additional groups (append)
sudo usermod -aG sudo,docker username

# Replace all groups
sudo usermod -G newgroup1,newgroup2 username

# Remove from group (use gpasswd)
sudo gpasswd -d username groupname
```

## Account Control

```bash
# Lock account
sudo usermod -L username

# Unlock account
sudo usermod -U username

# Change username
sudo usermod -l newname oldname

# Set expiration date
sudo usermod -e 2024-12-31 username
```

## User Information

```bash
# Change full name
sudo usermod -c "New Full Name" username

# Change login shell
sudo usermod -s /bin/bash username

# Move home directory
sudo usermod -d /new/home -m username
```

## Common Tasks

```bash
# Add user to sudo group
sudo usermod -aG sudo username

# Change to system account
sudo usermod -r username

# Disable login
sudo usermod -s /usr/sbin/nologin username

# Enable login
sudo usermod -s /bin/bash username
```

## Verification

```bash
# Check groups
groups username
id username

# Check account status
sudo chage -l username
```
