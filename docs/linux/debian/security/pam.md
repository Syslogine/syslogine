---
sidebar_position: 0
title: "PAM Configuration | Debian 13 Server Security"
sidebar_label: "PAM Authentication"
description: "Complete guide to Pluggable Authentication Modules (PAM) configuration on Debian 13 Trixie server including authentication policies, password requirements, and access control."
keywords:
  - "debian 13 pam configuration"
  - "debian server authentication"
  - "debian trixie pam setup"
  - "linux pluggable authentication modules"
  - "debian access control"
tags:
  - debian-13
  - debian-trixie
  - pam-configuration
  - authentication
  - access-control
slug: pam
---

# PAM Configuration on Debian 13 Server

Pluggable Authentication Modules (PAM) provide a flexible framework for authentication, authorization, session management, and password management on Linux systems. This guide covers comprehensive PAM configuration for Debian 13 Trixie servers.

## Overview

PAM consists of four management groups:

- **Authentication**: Verifies user identity
- **Authorization (Account)**: Controls access permissions
- **Session**: Manages user sessions
- **Password**: Handles password changes and policies

Each service can use different PAM modules through configuration files in `/etc/pam.d/`.

## PAM Architecture

### PAM Components

- **PAM Modules**: Shared libraries that perform specific authentication tasks
- **PAM Configuration**: Files that define which modules to use for each service
- **PAM-aware Applications**: Programs that use PAM for authentication

### Control Flags

- **required**: Must succeed; failure doesn't stop module stack
- **requisite**: Must succeed; failure stops module stack immediately
- **sufficient**: Success is sufficient; failure is ignored
- **optional**: Success/failure is ignored unless it's the only module
- **include**: Include another PAM configuration file
- **substack**: Include another configuration as a substack

## Basic PAM Configuration

### Understanding PAM Files

```bash
# List PAM configuration files
ls -la /etc/pam.d/

# Common PAM files
ls -la /etc/pam.d/{common-*,login,su,sudo,ssh}
```

### Common PAM Configuration Files

**Common Authentication** (`/etc/pam.d/common-auth`):
```bash
# View current authentication configuration
cat /etc/pam.d/common-auth
```

**Common Account** (`/etc/pam.d/common-account`):
```bash
# View current account configuration
cat /etc/pam.d/common-account
```

**Common Password** (`/etc/pam.d/common-password`):
```bash
# View current password configuration
cat /etc/pam.d/common-password
```

**Common Session** (`/etc/pam.d/common-session`):
```bash
# View current session configuration
cat /etc/pam.d/common-session
```

## Installing PAM Modules

### Essential PAM Modules

```bash
# Update package repository
sudo apt update

# Install additional PAM modules
sudo apt install libpam-modules-bin libpam-pwquality libpam-google-authenticator

# Install development tools (if needed)
sudo apt install libpam0g-dev

# Install additional security modules
sudo apt install libpam-tmpdir libpam-umask
```

### Available PAM Modules

```bash
# List installed PAM modules
ls -la /lib/x86_64-linux-gnu/security/

# Common modules
ls -la /lib/x86_64-linux-gnu/security/pam_*.so
```

## Password Policy Configuration

### Using pam_pwquality

Install and configure password quality checking:

```bash
# Install pwquality module
sudo apt install libpam-pwquality

# Configure password quality
sudo nano /etc/security/pwquality.conf
```

**Password Quality Configuration** (`/etc/security/pwquality.conf`):
```conf
# Minimum password length
minlen = 12

# Minimum number of character classes
minclass = 3

# Maximum number of consecutive identical characters
maxrepeat = 2

# Maximum number of consecutive characters from the same class
maxclasschars = 4

# Minimum number of lowercase letters
dcredit = -1

# Minimum number of uppercase letters
ucredit = -1

# Minimum number of digits
dcredit = -1

# Minimum number of special characters
ocredit = -1

# Check against dictionary words
dictcheck = 1

# Minimum number of characters that must be different from old password
difok = 8

# Check username in password
usercheck = 1

# Enable cracklib checking
enforcing = 1
```

### Configure PAM Password Module

Edit `/etc/pam.d/common-password`:

```bash
sudo nano /etc/pam.d/common-password
```

```conf
# PAM configuration for password changes
password    requisite     pam_pwquality.so retry=3
password    [success=1 default=ignore] pam_unix.so obscure use_authtok try_first_pass sha512 rounds=656000
password    sufficient    pam_unix.so obscure use_authtok try_first_pass sha512 rounds=656000
password    requisite     pam_deny.so
password    required      pam_permit.so
```

## Account Lockout Policies

### Using pam_faillock

Configure account lockout after failed attempts:

```bash
sudo nano /etc/pam.d/common-auth
```

**Authentication with Faillock**:
```conf
# PAM configuration for authentication
auth    required      pam_faillock.so preauth silent audit deny=5 unlock_time=900
auth    [success=1 default=ignore] pam_unix.so nullok_secure
auth    [default=die] pam_faillock.so authfail audit deny=5 unlock_time=900
auth    sufficient    pam_faillock.so authsucc audit
auth    requisite     pam_deny.so
auth    required      pam_permit.so
```

**Account Configuration**:
```bash
sudo nano /etc/pam.d/common-account
```

```conf
# PAM configuration for account validation
account required      pam_faillock.so
account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite     pam_deny.so
account required      pam_permit.so
```

### Faillock Configuration

Create faillock configuration:

```bash
sudo nano /etc/security/faillock.conf
```

```conf
# Faillock configuration
audit
silent
deny = 5
fail_interval = 900
unlock_time = 900
root_unlock_time = 1800
admin_group = wheel
even_deny_root
```

### Managing Locked Accounts

```bash
# View failed login attempts
sudo faillock --user username

# Unlock specific user
sudo faillock --user username --reset

# View all locked accounts
sudo faillock

# Reset all locked accounts
sudo faillock --reset
```

## Time-based Access Control

### Using pam_time

Configure time-based access restrictions:

```bash
# Install if not present
sudo apt install libpam-modules

# Configure time access
sudo nano /etc/security/time.conf
```

**Time Access Configuration**:
```conf
# Format: services;ttys;users;times
# Allow login only during business hours for regular users
login;*;!root;Mo-Fr0800-1800
sshd;*;!admin;Mo-Fr0800-1800

# Allow specific users 24/7 access
login;*;admin;Al0000-2400
sshd;*;sysadmin;Al0000-2400

# Restrict console access at night
login;tty*;!root;Mo-Su0600-2200
```

**Enable in PAM**:
```bash
sudo nano /etc/pam.d/common-account
```

Add this line:
```conf
account    required     pam_time.so
```

## Group-based Access Control

### Using pam_group

Configure dynamic group membership:

```bash
sudo nano /etc/security/group.conf
```

```conf
# Format: services;ttys;users;times;groups
# Add users to audio group during business hours
*;*;user1;Mo-Fr0800-1800;audio

# Add admin users to additional groups
*;*;admin;Al0000-2400;adm,sudo,staff
```

**Enable in PAM Session**:
```bash
sudo nano /etc/pam.d/common-session
```

Add:
```conf
session    optional     pam_group.so
```

## Resource Limits

### Using pam_limits

Configure system resource limits:

```bash
sudo nano /etc/security/limits.conf
```

```conf
# Format: <domain> <type> <item> <value>

# Set limits for all users
*               soft    nproc           1000
*               hard    nproc           2000
*               soft    nofile          4096
*               hard    nofile          8192
*               soft    core            0
*               hard    core            0

# Set limits for specific users
admin           soft    nproc           2000
admin           hard    nproc           4000
admin           soft    nofile          8192
admin           hard    nofile          16384

# Set limits for groups
@developers     soft    nproc           1500
@developers     hard    nproc           3000

# Memory limits (in KB)
*               soft    as              2097152
*               hard    as              4194304

# CPU time limits (in minutes)
@users          soft    cpu             60
@users          hard    cpu             120
```

**Enable in PAM Session**:
```bash
sudo nano /etc/pam.d/common-session
```

Ensure this line exists:
```conf
session    required     pam_limits.so
```

## Two-Factor Authentication

### Google Authenticator Setup

```bash
# Install Google Authenticator PAM module
sudo apt install libpam-google-authenticator

# Generate configuration for user
google-authenticator
```

**Configure 2FA for SSH**:
```bash
sudo nano /etc/pam.d/sshd
```

Add at the top:
```conf
# Google Authenticator
auth required pam_google_authenticator.so
```

**Enable Challenge-Response in SSH**:
```bash
sudo nano /etc/ssh/sshd_config
```

```conf
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive
```

```bash
# Restart SSH service
sudo systemctl restart sshd
```

### Per-User 2FA Configuration

```bash
# Run as each user requiring 2FA
google-authenticator

# Follow prompts:
# - Do you want authentication tokens to be time-based? (y/n) y
# - Do you want me to update your "/home/user/.google_authenticator" file? (y/n) y
# - Do you want to disallow multiple uses of the same authentication token? (y/n) y
# - Do you want to increase the original generation time window? (y/n) n
# - Do you want to enable rate-limiting? (y/n) y
```

## Custom Environment Setup

### Using pam_env

Configure environment variables:

```bash
sudo nano /etc/security/pam_env.conf
```

```conf
# Set environment variables for all users
EDITOR          DEFAULT=nano
BROWSER         DEFAULT=firefox
LANG            DEFAULT=en_US.UTF-8

# User-specific environment variables
HOME            DEFAULT=/home/@{PAM_USER} OVERRIDE=@{PAM_USER}
SHELL           DEFAULT=/bin/bash

# Security-related variables
TMOUT           DEFAULT=1800
HISTSIZE        DEFAULT=1000
HISTFILESIZE    DEFAULT=2000
```

**Enable in PAM Session**:
```bash
sudo nano /etc/pam.d/common-session
```

Add:
```conf
session    required     pam_env.so readenv=1
session    required     pam_env.so readenv=1 envfile=/etc/security/pam_env.conf
```

## Logging and Monitoring

### PAM Logging Configuration

```bash
# Configure rsyslog for PAM
sudo nano /etc/rsyslog.d/10-pam.conf
```

```conf
# PAM logging
auth,authpriv.*                 /var/log/auth.log
*.*;auth,authpriv.none          -/var/log/syslog
```

### Monitor PAM Events

```bash
# Monitor authentication logs
sudo tail -f /var/log/auth.log

# Search for specific PAM events
sudo grep "pam_unix" /var/log/auth.log
sudo grep "authentication failure" /var/log/auth.log

# Monitor failed login attempts
sudo grep "authentication failure" /var/log/auth.log | tail -20

# Monitor successful logins
sudo grep "session opened" /var/log/auth.log | tail -10
```

### Create PAM Monitoring Script

```bash
sudo nano /usr/local/bin/pam-monitor.sh
```

```bash
#!/bin/bash

LOG_FILE="/var/log/auth.log"
REPORT_FILE="/var/log/pam-report-$(date +%Y%m%d).txt"

{
    echo "PAM Security Report - $(date)"
    echo "================================="
    echo
    
    echo "Failed Login Attempts (Last 24 hours):"
    grep "authentication failure" $LOG_FILE | grep "$(date +'%b %d')" | wc -l
    echo
    
    echo "Successful Logins (Last 24 hours):"
    grep "session opened" $LOG_FILE | grep "$(date +'%b %d')" | wc -l
    echo
    
    echo "Locked Accounts:"
    faillock | grep -v "never"
    echo
    
    echo "Recent Authentication Failures:"
    grep "authentication failure" $LOG_FILE | tail -10
    echo
    
    echo "Recent Password Changes:"
    grep "password changed" $LOG_FILE | tail -5
    
} > $REPORT_FILE

echo "Report generated: $REPORT_FILE"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/pam-monitor.sh

# Schedule daily execution
echo "0 6 * * * /usr/local/bin/pam-monitor.sh" | sudo crontab -
```

## Service-Specific PAM Configuration

### SSH PAM Configuration

```bash
sudo nano /etc/pam.d/sshd
```

```conf
# PAM configuration for the Secure Shell service

# Standard Un*x authentication
@include common-auth

# Disallow non-root logins when /etc/nologin exists
account    required     pam_nologin.so

# Standard Un*x authorization
@include common-account

# SELinux needs to be the first session rule
session    required     pam_selinux.so close
session    required     pam_loginuid.so

# Standard Un*x session setup and teardown
@include common-session

# Set up user limits from /etc/security/limits.conf
session    required     pam_limits.so

# Standard Un*x password changing
@include common-password

# SELinux needs to intervene at login time
session    required     pam_selinux.so open
```

### Sudo PAM Configuration

```bash
sudo nano /etc/pam.d/sudo
```

```conf
# PAM configuration for sudo

# Require authentication
auth       required   pam_env.so readenv=1 user_readenv=0
auth       required   pam_env.so readenv=1 envfile=/etc/default/locale user_readenv=0
@include common-auth

# Account validation
@include common-account

# Session management
@include common-session-noninteractive

# Additional security - require specific group membership
auth       required   pam_wheel.so use_uid
```

## Advanced PAM Modules

### Custom PAM Module

Example of a simple custom PAM module configuration:

```bash
# Install development packages
sudo apt install build-essential libpam0g-dev

# Create custom module directory
mkdir ~/custom_pam_module
cd ~/custom_pam_module
```

**Simple Time-based PAM Module**:
```c
// custom_time_check.c
#include <security/pam_appl.h>
#include <security/pam_modules.h>
#include <time.h>

PAM_EXTERN int pam_sm_authenticate(pam_handle_t *pamh, int flags,
                                   int argc, const char **argv) {
    time_t current_time;
    struct tm *time_info;
    
    time(&current_time);
    time_info = localtime(&current_time);
    
    // Allow access only during business hours (9 AM to 5 PM)
    if (time_info->tm_hour >= 9 && time_info->tm_hour < 17) {
        return PAM_SUCCESS;
    }
    
    return PAM_AUTH_ERR;
}

PAM_EXTERN int pam_sm_setcred(pam_handle_t *pamh, int flags,
                              int argc, const char **argv) {
    return PAM_SUCCESS;
}
```

## Troubleshooting PAM

### Common PAM Issues

**Check PAM Configuration Syntax**:
```bash
# Test PAM configuration
sudo pamtester login username authenticate

# Test specific service
sudo pamtester sshd username authenticate
```

**Debug PAM Authentication**:
```bash
# Enable debug mode in PAM modules
# Add 'debug' parameter to module line
auth    required     pam_unix.so debug

# Monitor logs
sudo tail -f /var/log/auth.log | grep pam
```

**Check PAM Module Dependencies**:
```bash
# List PAM module dependencies
ldd /lib/x86_64-linux-gnu/security/pam_unix.so

# Verify module exists and permissions
ls -la /lib/x86_64-linux-gnu/security/pam_*.so
```

### PAM Testing Tools

```bash
# Install PAM testing utilities
sudo apt install pamtester

# Test authentication
pamtester login username authenticate

# Test account validation
pamtester login username acct

# Test password change
pamtester passwd username chauthtok
```

## Security Best Practices

### PAM Security Guidelines

1. **Principle of Least Privilege**: Configure PAM with minimal required permissions
2. **Regular Auditing**: Monitor PAM logs and failed authentication attempts
3. **Strong Password Policies**: Implement comprehensive password requirements
4. **Account Lockout**: Configure appropriate lockout policies
5. **Two-Factor Authentication**: Implement 2FA for privileged accounts
6. **Time-based Access**: Restrict access to business hours when appropriate
7. **Resource Limits**: Set appropriate system resource limits

### PAM Configuration Backup

```bash
# Backup PAM configuration
sudo tar -czf /root/pam-backup-$(date +%Y%m%d).tar.gz /etc/pam.d/ /etc/security/

# Create configuration snapshot
sudo cp -r /etc/pam.d /etc/pam.d.backup.$(date +%Y%m%d)
sudo cp -r /etc/security /etc/security.backup.$(date +%Y%m%d)
```

### Regular PAM Maintenance

```bash
# Weekly PAM security check script
sudo nano /usr/local/bin/pam-security-check.sh
```

```bash
#!/bin/bash

echo "PAM Security Check - $(date)"
echo "============================"

# Check for accounts with no password
echo "Accounts with empty passwords:"
sudo awk -F: '($2 == "") {print $1}' /etc/shadow

# Check for locked accounts
echo -e "\nLocked accounts:"
sudo faillock | grep -v "never" | grep "locked"

# Check PAM configuration syntax
echo -e "\nPAM configuration check:"
for service in login sshd sudo su; do
    if pamtester $service root authenticate 2>/dev/null; then
        echo "$service: OK"
    else
        echo "$service: CHECK REQUIRED"
    fi
done

# Check for unusual authentication attempts
echo -e "\nRecent failed authentication attempts:"
sudo grep "authentication failure" /var/log/auth.log | tail -5
```
