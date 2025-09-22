---
sidebar_position: 0
title: "System Auditing | Debian 13 Server Security"
sidebar_label: "System Auditing"
description: "Complete guide to system auditing on Debian 13 Trixie server including audit daemon configuration, log analysis, compliance monitoring, and security event tracking."
keywords:
  - "debian 13 system auditing"
  - "debian server audit logs"
  - "debian trixie security auditing"
  - "linux audit daemon"
  - "debian compliance monitoring"
tags:
  - debian-13
  - debian-trixie
  - system-auditing
  - security-monitoring
  - compliance
slug: system-auditing
---

# System Auditing on Debian 13 Server

System auditing is crucial for security monitoring, compliance requirements, and forensic analysis. This guide covers comprehensive auditing setup on Debian 13 Trixie servers.

## Overview

The Linux Audit Framework provides detailed logging of system calls, file access, user activities, and security-relevant events. It consists of:

- **auditd**: The audit daemon that collects and logs events
- **auditctl**: Command-line tool for configuring audit rules
- **ausearch**: Tool for searching audit logs
- **aureport**: Tool for generating audit reports

## Installing Audit Framework

### Install Required Packages

```bash
# Update package repository
sudo apt update

# Install audit framework
sudo apt install auditd audispd-plugins

# Install additional analysis tools
sudo apt install aide-common
```

### Enable and Start Services

```bash
# Enable auditd service
sudo systemctl enable auditd

# Start auditd service
sudo systemctl start auditd

# Check service status
sudo systemctl status auditd
```

## Basic Configuration

### Main Configuration File

Edit the main audit configuration:

```bash
sudo nano /etc/audit/auditd.conf
```

Key configuration parameters:

```conf
# Log file location
log_file = /var/log/audit/audit.log

# Log file size (MB)
max_log_file = 50

# Number of log files to keep
num_logs = 10

# Action when disk space is low
space_left_action = email
action_mail_acct = root

# Action when disk is full
disk_full_action = suspend

# Format of log entries
log_format = RAW

# Flush audit records to disk
flush = incremental_async
```

### Audit Rules Configuration

Create or edit audit rules:

```bash
sudo nano /etc/audit/rules.d/audit.rules
```

## Essential Audit Rules

### System Call Monitoring

```bash
# Monitor system calls
-a always,exit -F arch=b64 -S adjtimex -S settimeofday -k time-change
-a always,exit -F arch=b32 -S adjtimex -S settimeofday -S stime -k time-change

# Monitor network-related system calls
-a always,exit -F arch=b64 -S socket -S bind -S connect -k network
-a always,exit -F arch=b32 -S socket -S bind -S connect -k network
```

### File and Directory Monitoring

```bash
# Monitor sensitive files
-w /etc/passwd -p wa -k identity
-w /etc/group -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/sudoers -p wa -k identity

# Monitor system configuration
-w /etc/ssh/sshd_config -p wa -k sshd
-w /etc/hosts -p wa -k network
-w /etc/resolv.conf -p wa -k network

# Monitor log files
-w /var/log/audit/ -p wa -k auditlog
-w /var/log/auth.log -p wa -k authlog

# Monitor critical directories
-w /bin/ -p wa -k binaries
-w /sbin/ -p wa -k binaries
-w /usr/bin/ -p wa -k binaries
-w /usr/sbin/ -p wa -k binaries
```

### User Activity Monitoring

```bash
# Monitor user login/logout
-w /var/log/lastlog -p wa -k logins
-w /var/run/faillock/ -p wa -k logins

# Monitor sudo usage
-w /var/log/sudo.log -p wa -k actions

# Monitor user changes
-a always,exit -F arch=b64 -S execve -k commands
-a always,exit -F arch=b32 -S execve -k commands
```

### Privilege Escalation Monitoring

```bash
# Monitor setuid/setgid programs
-a always,exit -F arch=b64 -S setuid -S setgid -S setreuid -S setregid -k privilege_escalation
-a always,exit -F arch=b32 -S setuid -S setgid -S setreuid -S setregid -k privilege_escalation

# Monitor capability changes
-a always,exit -F arch=b64 -S capset -k capabilities
-a always,exit -F arch=b32 -S capset -k capabilities
```

## Advanced Audit Rules

### Process Monitoring

```bash
# Monitor process creation and termination
-a always,exit -F arch=b64 -S clone -S fork -S vfork -k process
-a always,exit -F arch=b32 -S clone -S fork -S vfork -k process

# Monitor module loading
-w /sbin/insmod -p x -k modules
-w /sbin/rmmod -p x -k modules
-w /sbin/modprobe -p x -k modules
-a always,exit -F arch=b64 -S init_module -S delete_module -k modules
```

### File System Monitoring

```bash
# Monitor file attribute changes
-a always,exit -F arch=b64 -S chmod -S fchmod -S fchmodat -k perm_mod
-a always,exit -F arch=b32 -S chmod -S fchmod -S fchmodat -k perm_mod

# Monitor file ownership changes
-a always,exit -F arch=b64 -S chown -S fchown -S fchownat -S lchown -k perm_mod
-a always,exit -F arch=b32 -S chown -S fchown -S fchownat -S lchown -k perm_mod
```

## Applying and Managing Rules

### Load Rules

```bash
# Load rules from configuration files
sudo auditctl -R /etc/audit/rules.d/audit.rules

# View current rules
sudo auditctl -l

# View audit status
sudo auditctl -s
```

### Dynamic Rule Management

```bash
# Add temporary rule (lost on reboot)
sudo auditctl -w /tmp -p rwxa -k temp_access

# Delete specific rule
sudo auditctl -W /tmp -p rwxa -k temp_access

# Delete all rules
sudo auditctl -D
```

## Log Analysis and Monitoring

### Using ausearch

```bash
# Search by keyword
sudo ausearch -k identity

# Search by user
sudo ausearch -ua username

# Search by time range
sudo ausearch -ts today
sudo ausearch -ts 10:00 -te 11:00

# Search for failed events
sudo ausearch -f

# Search for specific file access
sudo ausearch -f /etc/passwd
```

### Using aureport

```bash
# Generate summary report
sudo aureport

# Authentication report
sudo aureport -au

# Failed events report
sudo aureport -f

# Executable report
sudo aureport -x

# File access report
sudo aureport -f

# Time-based report
sudo aureport -ts today
```

### Real-time Monitoring

```bash
# Follow audit log in real-time
sudo tail -f /var/log/audit/audit.log

# Monitor with ausearch
sudo ausearch -ts now -f | tail -f
```

## Log Rotation and Management

### Configure Log Rotation

```bash
sudo nano /etc/logrotate.d/audit
```

```conf
/var/log/audit/audit.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 root adm
    postrotate
        /sbin/service auditd restart > /dev/null 2>&1 || true
    endscript
}
```

### Manual Log Management

```bash
# Rotate logs manually
sudo service auditd rotate

# Clear audit buffer
sudo auditctl -e 0

# Re-enable auditing
sudo auditctl -e 1
```

## Compliance and Reporting

### PCI DSS Compliance Rules

```bash
# Monitor authentication attempts
-w /var/log/auth.log -p wa -k authentication

# Monitor network configuration changes
-a always,exit -F arch=b64 -S sethostname -S setdomainname -k network_modifications

# Monitor date and time changes
-a always,exit -F arch=b64 -S adjtimex -S settimeofday -k time_changes
```

### Generate Compliance Reports

```bash
# Daily security summary
sudo aureport -ts today --summary

# User activity report
sudo aureport -u --summary

# System modification report
sudo ausearch -k system_modifications | aureport -f
```

## Automated Monitoring Scripts

### Daily Audit Report Script

```bash
sudo nano /usr/local/bin/daily-audit-report.sh
```

```bash
#!/bin/bash

LOG_DIR="/var/log/audit"
REPORT_DIR="/var/log/audit/reports"
DATE=$(date +%Y%m%d)

# Create report directory
mkdir -p $REPORT_DIR

# Generate daily report
{
    echo "Daily Audit Report - $(date)"
    echo "=================================="
    echo
    
    echo "Failed Events:"
    aureport -f --summary
    echo
    
    echo "Authentication Events:"
    aureport -au --summary
    echo
    
    echo "File Access Events:"
    aureport -f --summary
    echo
    
    echo "Network Events:"
    ausearch -k network --format text | tail -20
    
} > $REPORT_DIR/audit-report-$DATE.txt

# Email report (optional)
# mail -s "Daily Audit Report" admin@example.com < $REPORT_DIR/audit-report-$DATE.txt
```

### Make script executable and schedule

```bash
sudo chmod +x /usr/local/bin/daily-audit-report.sh

# Add to crontab
echo "0 6 * * * /usr/local/bin/daily-audit-report.sh" | sudo crontab -
```

## Performance Tuning

### Optimize Audit Performance

```bash
# Reduce audit buffer size for high-load systems
sudo auditctl -b 320

# Set audit rate limit
sudo auditctl -r 100

# Configure audit failure mode
sudo auditctl -f 1  # 0=silent, 1=printk, 2=panic
```

### Monitor Audit Performance

```bash
# Check audit statistics
sudo auditctl -s

# Monitor audit queue
cat /proc/sys/kernel/audit_backlog_limit

# Check for dropped events
grep "audit_lost" /var/log/audit/audit.log
```

## Troubleshooting

### Common Issues

**High CPU usage from auditd:**
```bash
# Reduce audit rules
sudo auditctl -D

# Add only essential rules
# Increase buffer size
sudo auditctl -b 8192
```

**Disk space issues:**
```bash
# Check audit log size
du -sh /var/log/audit/

# Configure log rotation
sudo nano /etc/audit/auditd.conf
# Set max_log_file_action = rotate
```

**Missing events:**
```bash
# Check if auditd is running
sudo systemctl status auditd

# Verify rules are loaded
sudo auditctl -l

# Check for rule syntax errors
sudo auditctl -R /etc/audit/rules.d/audit.rules
```

### Debug Mode

```bash
# Enable debug mode
sudo auditctl -s | grep enabled

# Check audit messages in syslog
sudo grep audit /var/log/syslog
```
