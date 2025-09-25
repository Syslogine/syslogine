---
sidebar_position: 8
title: "Account Information"
sidebar_label: "Account Info"
description: "Query user account details with id, getent, finger, and monitoring commands for user verification and system auditing."
keywords:
  - "debian user info"
  - "id command"
  - "getent passwd"
  - "user account details"
  - "account verification"
tags:
  - debian
  - account-information
  - user-monitoring
  - system-auditing
slug: /linux/debian/administration/user-management/user-accounts/account-info
---

# Account Information

Query user account details, group memberships, and login information for verification and monitoring.

## Basic User Information

```bash
# Current user info
id
whoami

# Specific user info
id username
getent passwd username

# User groups
groups username

# Detailed user data
finger username
```

## Account Database Queries

```bash
# User account details
getent passwd username

# All users
getent passwd

# User's group info
getent group groupname

# All groups
getent group
```

## User ID Information

```bash
# User and group IDs
id username

# Only user ID
id -u username

# Only group ID
id -g username

# All group IDs
id -G username

# Group names only
id -Gn username
```

## Login Information

```bash
# Last login times
lastlog

# Specific user last login
lastlog -u username

# Currently logged in users
who
w

# Login history
last username
```

## Account Status

```bash
# Password status
sudo passwd -S username

# Account aging info
sudo chage -l username

# Shadow file entry
sudo getent shadow username

# Account expiration
sudo chage -l username | grep "Account expires"
```

## Process Information

```bash
# User processes
ps -u username

# Process tree
pstree -u username

# Running processes count
ps -u username --no-headers | wc -l

# Memory usage by user
ps -u username -o pid,ppid,cmd,%mem,%cpu --sort=-%mem
```

## Home Directory Info

```bash
# Home directory location
getent passwd username | cut -d: -f6

# Home directory size
du -sh /home/username

# Home directory permissions
ls -ld /home/username

# Files owned by user
find /home -user username -ls 2>/dev/null
```

## Group Membership Details

```bash
# Primary group
id -gn username

# All groups
groups username

# Group membership with IDs
id username

# Check specific group membership
groups username | grep -q "groupname" && echo "Member" || echo "Not member"
```

## System-wide User Analysis

```bash
# All regular users (UID >= 1000)
getent passwd | awk -F: '$3 >= 1000 {print $1,$3,$5}' OFS='\t'

# All system users (UID < 1000)
getent passwd | awk -F: '$3 < 1000 {print $1,$3,$5}' OFS='\t'

# Users with login shells
getent passwd | grep -v -E "(nologin|false)$"

# Locked accounts
sudo passwd -Sa | grep " L "
```

## Detailed User Report

```bash
#!/bin/bash
username="$1"

echo "=== User Information Report ==="
echo "Username: $username"
echo "UID/GID: $(id $username)"
echo "Home: $(getent passwd $username | cut -d: -f6)"
echo "Shell: $(getent passwd $username | cut -d: -f7)"
echo "Groups: $(groups $username | cut -d: -f2-)"
echo "Last login: $(lastlog -u $username | tail -1)"
echo "Processes: $(ps -u $username --no-headers | wc -l)"
```

## Monitoring Commands

```bash
# Real-time user activity
w username

# Login attempts
sudo grep "$username" /var/log/auth.log | tail -10

# Failed logins
sudo grep "Failed password.*$username" /var/log/auth.log

# Successful logins
sudo grep "Accepted.*$username" /var/log/auth.log
```

## File Ownership Analysis

```bash
# Files owned by user
find / -user username -ls 2>/dev/null

# Files in specific directory
find /home -user username -type f | wc -l

# Large files owned by user
find / -user username -size +100M -ls 2>/dev/null

# Recently modified files
find /home -user username -mtime -7 -ls
```

## Account Validation

```bash
# Check if user exists
getent passwd username > /dev/null && echo "Exists" || echo "Not found"

# Validate UID uniqueness
getent passwd | cut -d: -f3 | sort | uniq -d

# Check home directory exists
[ -d "$(getent passwd $username | cut -d: -f6)" ] && echo "Home exists"

# Verify shell is valid
getent passwd username | cut -d: -f7 | xargs ls -l
```

## Security Information

```bash
# Password aging details
sudo chage -l username

# Account locks and expiration
sudo passwd -S username
sudo chage -l username | grep -E "(expires|locked)"

# SSH key information
ls -la /home/username/.ssh/

# Sudo privileges
sudo -l -U username
```

## Batch User Information

```bash
# Generate user report for all users
getent passwd | while IFS=: read user x uid gid gecos home shell; do
    if [ $uid -ge 1000 ]; then
        echo "$user:$uid:$gid:$home:$shell"
    fi
done

# Users not logged in recently
lastlog -b 30 | tail -n +2 | grep "Never"
```

## JSON/Structured Output

```bash
# User info as JSON-like format
username="john"
echo "{"
echo "  \"username\": \"$username\","
echo "  \"uid\": $(id -u $username),"
echo "  \"gid\": $(id -g $username),"
echo "  \"home\": \"$(getent passwd $username | cut -d: -f6)\","
echo "  \"shell\": \"$(getent passwd $username | cut -d: -f7)\","
echo "  \"groups\": [$(groups $username | cut -d: -f2- | sed 's/ /", "/g' | sed 's/^/"/;s/$/"/')]"
echo "}"
```

## Configuration Files

```bash
# View relevant config files
cat /etc/passwd | grep username
cat /etc/group | grep username
sudo cat /etc/shadow | grep username
```

## Troubleshooting

```bash
# User not found
getent passwd username
# Check spelling, verify user exists

# No group information
id username
# Check group memberships, verify groups exist

# Permission denied
sudo id username
# Use sudo for system user information
```
