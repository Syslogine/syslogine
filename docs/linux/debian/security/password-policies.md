---
sidebar_position: 0
title: "Password Policies | Debian 13 Server Security"
sidebar_label: "Password Policies"
description: "Complete guide to implementing password policies on Debian 13 Trixie server including complexity requirements, expiration policies, history management, and enforcement mechanisms."
keywords:
  - "debian 13 password policies"
  - "debian server password security"
  - "debian trixie password requirements"
  - "linux password complexity"
  - "debian password expiration"
tags:
  - debian-13
  - debian-trixie
  - password-policies
  - security-hardening
  - authentication
slug: password-policies
---

# Password Policies on Debian 13 Server

Implementing robust password policies is crucial for maintaining system security. This guide covers comprehensive password policy configuration on Debian 13 Trixie servers, including complexity requirements, expiration policies, and enforcement mechanisms.

## Overview

Password policies in Debian are enforced through multiple components:

- **PAM modules**: Control password complexity and validation
- **Shadow password suite**: Manages password aging and expiration
- **Login.defs**: System-wide password defaults
- **Cracklib**: Dictionary-based password checking
- **pwquality**: Advanced password quality checking

## Installing Password Policy Tools

### Essential Packages

```bash
# Update package repository
sudo apt update

# Install password quality tools
sudo apt install libpam-pwquality cracklib-runtime

# Install additional password tools
sudo apt install libpam-cracklib pwgen apg

# Install password strength testing tools
sudo apt install john hashcat
```

### Verify Installation

```bash
# Check installed PAM modules
ls -la /lib/x86_64-linux-gnu/security/ | grep -E "(pwquality|cracklib|unix)"

# Verify cracklib dictionaries
ls -la /var/cache/cracklib/

# Check pwquality configuration
ls -la /etc/security/pwquality.conf
```

## Basic Password Requirements

### System Default Configuration

Edit the main login configuration:

```bash
sudo nano /etc/login.defs
```

**Key Password Settings**:
```conf
# Password aging controls
PASS_MAX_DAYS   90
PASS_MIN_DAYS   7
PASS_WARN_AGE   14

# Minimum acceptable password length
PASS_MIN_LEN    12

# Number of previous passwords to remember
PASS_MAX_TRIES  3

# Password hashing algorithm
ENCRYPT_METHOD  SHA512

# Number of SHA rounds (higher = more secure but slower)
SHA_CRYPT_MIN_ROUNDS 656000
SHA_CRYPT_MAX_ROUNDS 656000

# Enable password history
PASS_ALWAYS_WARN yes

# Home directory creation
CREATE_HOME     yes
```

### PAM Password Module Configuration

Configure PAM password requirements:

```bash
sudo nano /etc/pam.d/common-password
```

**Basic Password PAM Configuration**:
```conf
# PAM configuration for password changes

# Password quality checking
password    requisite     pam_pwquality.so retry=3 minlen=12 difok=8 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1

# Password history to prevent reuse
password    required      pam_pwhistory.so remember=12 use_authtok

# Unix password storage with strong hashing
password    [success=1 default=ignore] pam_unix.so obscure use_authtok try_first_pass sha512 rounds=656000

# Fallback and denial
password    requisite     pam_deny.so
password    required      pam_permit.so
```

## Advanced Password Complexity

### pwquality Configuration

Configure detailed password quality requirements:

```bash
sudo nano /etc/security/pwquality.conf
```

**Comprehensive Password Quality Settings**:
```conf
# Minimum password length
minlen = 14

# Minimum number of character classes (lower, upper, digit, other)
minclass = 4

# Maximum number of consecutive identical characters
maxrepeat = 2

# Maximum number of consecutive characters from the same class
maxclasschars = 3

# Minimum number of lowercase letters required
lcredit = -2

# Minimum number of uppercase letters required
ucredit = -1

# Minimum number of digits required
dcredit = -1

# Minimum number of special characters required
ocredit = -1

# Minimum number of characters that must be different from old password
difok = 8

# Check against dictionary words
dictcheck = 1

# Reject passwords containing username
usercheck = 1

# Reject passwords that are rotations of the previous password
usersubstr = 3

# Enable strict mode
enforcing = 1

# Maximum credit for having characters in certain classes
maxcredit = 2

# Check for palindromes
palindrome = 1

# Minimum word length for dictionary checking
dictpath = /var/cache/cracklib/cracklib_dict
```

### Understanding pwquality Options

**Character Credits**:
- Positive values: Maximum credit given
- Negative values: Minimum required characters
- Example: `dcredit = -2` requires at least 2 digits

**Character Classes**:
- Lowercase letters (a-z)
- Uppercase letters (A-Z)
- Digits (0-9)
- Special characters (!@#$%^&*()...)
**Dictionary Checking**:
- `dictcheck = 1`: Enable dictionary checking
- `dictpath`: Specify custom dictionary location
- Rejects common words and variations

### Custom Dictionary Configuration

Create custom dictionary for enhanced checking:

```bash
# Create custom dictionary file
sudo nano /etc/security/custom-dict.txt
```

Add common weak passwords and company-specific terms:
```txt
password123
company123
welcome2024
qwerty123
admin123
yourcompanyname
yourdomainname
```

**Build custom dictionary**:
```bash
# Convert to cracklib format
sudo cracklib-format /etc/security/custom-dict.txt | sudo cracklib-packer /var/cache/cracklib/custom_dict

# Update pwquality to use custom dictionary
sudo nano /etc/security/pwquality.conf
```

Add to configuration:
```conf
# Use custom dictionary in addition to default
dictpath = /var/cache/cracklib/cracklib_dict
```

## Password Expiration Policies

### Global Expiration Settings

Set system-wide password expiration:

```bash
# Edit system defaults
sudo nano /etc/login.defs
```

**Expiration Configuration**:
```conf
# Maximum number of days a password may be used
PASS_MAX_DAYS   60

# Minimum number of days between password changes
PASS_MIN_DAYS   1

# Number of days warning given before password expires
PASS_WARN_AGE   7

# Password expiration for new accounts
PASS_MAX_DAYS   60
PASS_MIN_DAYS   1
PASS_WARN_AGE   7
```

### Per-User Password Expiration

```bash
# Set password expiration for existing user
sudo chage -M 60 -m 1 -W 7 username

# Set password to expire immediately (force change)
sudo chage -d 0 username

# Set password to never expire (for service accounts)
sudo chage -M -1 username

# View current password status
sudo chage -l username

# Interactive password aging setup
sudo chage username
```

### Understanding chage Parameters

**Common chage Options**:
- `-M days`: Maximum password age
- `-m days`: Minimum password age
- `-W days`: Warning days before expiration
- `-I days`: Inactive days after expiration
- `-E date`: Account expiration date
- `-d date`: Last password change date

**Viewing Password Information**:
```bash
# View detailed password aging info
sudo chage -l username

# Check all users' password status
sudo cat /etc/shadow | cut -d: -f1,3,4,5,6,7,8
```

## Password History Management

### Configure Password History

Prevent password reuse using PAM:

```bash
sudo nano /etc/pam.d/common-password
```

**Password History Configuration**:
```conf
# Remember last 24 passwords
password    required      pam_pwhistory.so remember=24 use_authtok enforce_for_root

# Alternative: Use pam_unix with remember option
password    [success=1 default=ignore] pam_unix.so obscure use_authtok try_first_pass sha512 remember=12 rounds=656000
```

### Password History Options

**pam_pwhistory Parameters**:
- `remember=N`: Number of previous passwords to remember
- `use_authtok`: Use password from previous module
- `enforce_for_root`: Apply history to root user
- `retry=N`: Number of retry attempts

**Managing Password History**:
```bash
# Check password history location
ls -la /etc/security/opasswd*

# View password history structure (admin only)
sudo head -5 /etc/security/opasswd

# Password history file format: username:hash1:hash2:hash3...
```

## Account Lockout Policies

### Configure Account Lockout with faillock

Set up automatic account lockout after failed attempts:

```bash
sudo nano /etc/pam.d/common-auth
```

**Account Lockout Configuration**:
```conf
# Account lockout after failed attempts
auth    required      pam_faillock.so preauth silent audit deny=5 unlock_time=1800 fail_interval=900

# Standard authentication
auth    [success=1 default=ignore] pam_unix.so nullok_secure

# Faillock post-auth
auth    [default=die] pam_faillock.so authfail audit deny=5 unlock_time=1800 fail_interval=900
auth    sufficient    pam_faillock.so authsucc audit

# Standard modules
auth    requisite     pam_deny.so
auth    required      pam_permit.so
```

### Configure Account Policies

```bash
sudo nano /etc/pam.d/common-account
```

```conf
# Account validation with lockout check
account required      pam_faillock.so
account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite     pam_deny.so
account required      pam_permit.so
```

### faillock Configuration Options

**faillock Parameters**:
- `deny=N`: Number of failed attempts before lockout
- `unlock_time=N`: Seconds until automatic unlock
- `fail_interval=N`: Time window for counting failures
- `audit`: Log attempts to audit system
- `silent`: Don't display lockout messages
- `even_deny_root`: Apply lockout to root user

### Managing Locked Accounts

```bash
# View locked accounts
sudo faillock

# View specific user's failed attempts
sudo faillock --user username

# Unlock specific user
sudo faillock --user username --reset

# Reset all lockouts
sudo faillock --reset
```

## Password Strength Testing

### Manual Password Testing

```bash
# Test password against current policy
echo "test_password" | pwscore

# Test password with specific requirements
echo "MyP@ssw0rd123" | pwscore -c /etc/security/pwquality.conf

# Check password against dictionary
echo "password123" | cracklib-check
```

### Understanding Password Scores

**pwscore Output**:
- Score 0-100: Password strength rating
- Higher scores indicate stronger passwords
- Minimum acceptable score varies by policy

**cracklib-check Responses**:
- "OK": Password passes dictionary check
- Error messages: Specific weakness identified

### Password Generation Tools

```bash
# Generate strong passwords
pwgen -s -y -n 16 5

# Generate pronounceable passwords
apg -m 12 -x 16 -M NCL -n 5

# Generate cryptographically secure passwords
openssl rand -base64 32 | tr -d "=+/" | cut -c1-16
```

**Password Generation Options**:
- `-s`: Secure random passwords
- `-y`: Include symbols
- `-n`: Include numbers
- `-m N`: Minimum length
- `-x N`: Maximum length

## Service Account Policies

### Configure Service Account Passwords

Different policies for service accounts:

```bash
# Create service account with specific policies
sudo useradd -r -s /bin/false -d /var/lib/service service_account

# Set long password expiration for service accounts
sudo chage -M 365 -W 30 service_account

# Generate strong service account password
service_password=$(openssl rand -base64 32)
echo "service_account:$service_password" | sudo chpasswd
```

### Service Account Considerations

**Service Account Best Practices**:
- Longer password expiration periods (6-12 months)
- Higher complexity requirements
- No interactive login capability
- Regular password rotation schedules
- Secure password storage

**Service Account PAM Configuration**:
```bash
sudo nano /etc/pam.d/service-account
```

```conf
# PAM configuration for service accounts
# More relaxed password requirements

password    requisite     pam_pwquality.so minlen=20 minclass=3 maxrepeat=3
password    required      pam_pwhistory.so remember=5 use_authtok
password    [success=1 default=ignore] pam_unix.so obscure use_authtok try_first_pass sha512
password    requisite     pam_deny.so
password    required      pam_permit.so
```

## Password Policy Monitoring

### Checking Password Status

```bash
# View user password information
sudo chage -l username

# Check all users with password aging
for user in $(awk -F: '$3 >= 1000 && $3 != 65534 {print $1}' /etc/passwd); do
    echo "User: $user"
    sudo chage -l $user | grep -E "(Last password change|Password expires)"
    echo
done
```

### Identifying Policy Violations

**Finding Expired Passwords**:
```bash
# Check for expired passwords
sudo awk -F: '$3 >= 1000 && $3 != 65534 {print $1}' /etc/passwd | while read user; do
    expiry=$(sudo chage -l $user | grep "Password expires" | cut -d: -f2 | xargs)
    if [[ "$expiry" != "never" ]] && [[ "$expiry" != "password must be changed" ]]; then
        echo "$user: $expiry"
    fi
done
```

**Finding Accounts Without Passwords**:
```bash
# Check for accounts with empty passwords
sudo awk -F: '($2 == "") {print $1}' /etc/shadow
```

### Log Analysis

**Monitor Password Changes**:
```bash
# View recent password changes
grep "password changed" /var/log/auth.log

# Monitor failed password attempts
grep "authentication failure" /var/log/auth.log

# Check account lockouts
grep "pam_faillock" /var/log/auth.log
```

## User Communication and Training

### Password Policy Documentation

Create clear documentation for users:

```bash
sudo nano /etc/motd
```

```txt
===============================================================================
                          SYSTEM PASSWORD POLICY
===============================================================================

Password Requirements:
• Minimum 14 characters
• Must contain: uppercase, lowercase, numbers, special characters
• Cannot reuse last 12 passwords
• Cannot contain username or dictionary words
• Maximum password age: 60 days
• Warning period: 7 days before expiration

Account Security:
• Account locks after 5 failed login attempts
• Lockout duration: 30 minutes
• Contact system administrator if locked out

For password assistance: admin@yourcompany.com
===============================================================================
```

### User Education Points

**Key Messages for Users**:
- Password complexity requirements
- Expiration and change procedures
- Account lockout policies
- Security importance of strong passwords
- Where to get help

## Troubleshooting Password Policies

### Common Issues and Solutions

**Password Rejected Despite Meeting Requirements**:
```bash
# Check pwquality configuration
sudo pwscore -c /etc/security/pwquality.conf

# Test specific password
echo "your_password" | pwscore -c /etc/security/pwquality.conf

# Enable debug mode
sudo nano /etc/pam.d/common-password
# Add 'debug' to pam_pwquality line:
# password requisite pam_pwquality.so retry=3 debug

# Monitor auth logs
sudo tail -f /var/log/auth.log | grep pwquality
```

**Password History Not Working**:
```bash
# Check password history file permissions
sudo ls -la /etc/security/opasswd*

# Verify PAM configuration
grep "remember=" /etc/pam.d/common-password

# Ensure proper file ownership
sudo chown root:root /etc/security/opasswd
sudo chmod 600 /etc/security/opasswd
```

**Account Lockout Issues**:
```bash
# Check faillock status
sudo faillock --user username

# Verify PAM configuration order
grep -n "pam_faillock" /etc/pam.d/common-auth

# Check log entries
sudo grep "pam_faillock" /var/log/auth.log
```

### Testing Password Policies

```bash
# Create test user for policy testing
sudo useradd -m testuser
sudo passwd testuser

# Test various password combinations
su - testuser
passwd

# Test specific scenarios:
# - Weak passwords
# - Dictionary words
# - Password reuse
# - Complexity requirements

# Clean up test user
sudo userdel -r testuser
```

### Debugging PAM Configuration

**Enable PAM Debugging**:
```bash
# Add debug parameter to PAM modules
sudo nano /etc/pam.d/common-password
```

Example with debug enabled:
```conf
password    requisite     pam_pwquality.so retry=3 debug
password    required      pam_pwhistory.so remember=12 debug
```

**Monitor Debug Output**:
```bash
# Watch auth logs for debug messages
sudo tail -f /var/log/auth.log | grep -E "(pwquality|pwhistory)"
```