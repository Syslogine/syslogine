---
sidebar_position: 4
title: "passwd Command"
sidebar_label: "passwd"
description: "Manage user passwords with the passwd command - set, change, and control password policies in Debian systems."
keywords:
  - "debian passwd"
  - "password management"
  - "change password"
  - "password policies"
tags:
  - debian
  - passwd
  - password-management
  - security
slug: /linux/debian/administration/user-management/user-accounts/passwd
---

# passwd Command

Manage user passwords and password policies for secure authentication control.

## Basic Usage

```bash
# Change your own password
passwd

# Change another user's password (as root)
sudo passwd username

# Set password for new user
sudo passwd newuser
```

## Password Management

```bash
# Force password change on next login
sudo passwd -e username

# Lock user password
sudo passwd -l username

# Unlock user password
sudo passwd -u username

# Delete password (passwordless login)
sudo passwd -d username
```

## Password Status

```bash
# Check password status
sudo passwd -S username

# Example output:
# username PS 2024-01-15 0 99999 7 -1
# PS = Password Set, L = Locked, NP = No Password
```

## Advanced Options

```bash
# Set password expiration
sudo passwd -x 90 username          # Expire in 90 days
sudo passwd -n 7 username           # Min 7 days between changes
sudo passwd -w 14 username          # Warn 14 days before expiration

# Interactive password aging
sudo chage username
```

## Batch Password Setting

```bash
# Set password non-interactively
echo 'username:newpassword' | sudo chpasswd

# From file
sudo chpasswd < userlist.txt
# File format: username:password
```

## Password Policies

```bash
# View password aging info
sudo chage -l username

# Set account expiration
sudo chage -E 2024-12-31 username

# Set password expiration
sudo chage -M 90 username           # Max 90 days
sudo chage -m 7 username            # Min 7 days
sudo chage -W 14 username           # Warn 14 days before
```

## Configuration Files

### `/etc/login.defs`
```bash
PASS_MAX_DAYS   99999    # Maximum password age
PASS_MIN_DAYS   0        # Minimum password age
PASS_WARN_AGE   7        # Password expiration warning
```

### `/etc/security/pwquality.conf`
```bash
minlen = 8               # Minimum length
minclass = 3             # Character classes required
maxrepeat = 2            # Max repeated characters
```

## Common Tasks

```bash
# New user setup
sudo passwd newuser
sudo chage -d 0 newuser             # Force change on first login

# Account maintenance
sudo passwd -S username             # Check status
sudo chage -l username              # View aging info

# Security lockdown
sudo passwd -l username             # Lock account
sudo chage -E 0 username            # Expire account immediately
```

## Password Quality

```bash
# Install password quality checking
sudo apt install libpam-pwquality

# Test password strength
echo "testpass" | pwscore
```

## Troubleshooting

```bash
# Password too weak
passwd: BAD PASSWORD: The password is too short

# Account locked
passwd: Authentication token manipulation error

# Permission denied
passwd: Permission denied

# Solutions:
sudo passwd username                # Use sudo
sudo passwd -u username            # Unlock first
```

## Security Best Practices

```bash
# Enforce strong passwords
sudo apt install libpam-pwquality

# Regular password expiration
sudo chage -M 90 username

# Monitor password status
sudo passwd -Sa                     # All users status

# Disable password login (SSH keys only)
sudo passwd -l username
```

## Verification

```bash
# Test password change
su - username

# Check password status
sudo passwd -S username
sudo chage -l username

# View last password change
sudo lastlog -u username
```