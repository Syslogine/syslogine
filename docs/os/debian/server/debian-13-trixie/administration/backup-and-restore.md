---
sidebar_position: 8
title: "Backup and Restore | Debian 13 Server"
sidebar_label: "Backup & Restore"
description: "Complete guide to backup and restore strategies on Debian 13 Trixie server including automated backups, incremental backups, system recovery, and enterprise backup solutions."
keywords:
  - "debian 13 backup"
  - "debian server restore"
  - "debian trixie backup solutions"
  - "server backup administration"
  - "debian enterprise backup"
tags:
  - debian-13
  - debian-trixie
  - backup-restore
  - data-protection
  - server-administration
slug: debian-13-backup-restore
---

# Backup and Restore in Debian 13 Server

## Overview
This tutorial covers comprehensive backup and restore strategies for Debian 13 servers, from simple file backups to full system recovery. You'll learn to implement automated backup solutions, create disaster recovery plans, and ensure data integrity across different scenarios.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 45 minutes  
**Required packages:** rsync, tar, cron, borgbackup (optional)  
**System requirements:** Sufficient storage space for backups (recommended 2x system size)

## Installation
```bash
# Install essential backup tools
sudo apt update
sudo apt install rsync tar gzip bzip2 xz-utils cron

# Install advanced backup solutions (optional)
sudo apt install borgbackup duplicity rdiff-backup
```

## Basic Section 🟢

### Simple File Backup with tar
```bash
# Create compressed backup of home directories
sudo tar -czf /backup/home-$(date +%Y%m%d).tar.gz /home

# Backup specific directory
tar -czf backup-$(date +%Y%m%d-%H%M).tar.gz /path/to/important/data

# Extract backup
tar -xzf backup-20241215.tar.gz
```

### Using rsync for Incremental Backups
```bash
# Local backup with rsync
rsync -av --delete /home/ /backup/home/

# Remote backup via SSH
rsync -av --delete /var/www/ user@backup-server:/backups/www/

# Exclude files
rsync -av --delete --exclude='*.tmp' --exclude='cache/' /data/ /backup/data/
```

### Basic System Backup Script
```bash
#!/bin/bash
# simple-backup.sh
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup important directories
tar -czf $BACKUP_DIR/etc-$DATE.tar.gz /etc
tar -czf $BACKUP_DIR/var-www-$DATE.tar.gz /var/www
tar -czf $BACKUP_DIR/home-$DATE.tar.gz /home

# Database backup (if MySQL/MariaDB is installed)
if command -v mysqldump >/dev/null; then
    mysqldump --all-databases > $BACKUP_DIR/databases-$DATE.sql
fi

echo "Backup completed: $DATE"
```

## Advanced Section 🔴

### Automated Backup with BorgBackup
```bash
# Initialize repository
borg init --encryption=repokey /backup/borg-repo

# Create backup
borg create /backup/borg-repo::'{hostname}-{now}' \
    /home /etc /var/www \
    --exclude '*.pyc' \
    --exclude '/home/*/.cache' \
    --compression lz4

# List archives
borg list /backup/borg-repo

# Mount archive for browsing
mkdir /mnt/backup
borg mount /backup/borg-repo::server-2024-12-15T10:30:00 /mnt/backup
```

### Enterprise Backup Script with Rotation
```bash
#!/bin/bash
# enterprise-backup.sh
set -euo pipefail

BACKUP_ROOT="/backup"
RETENTION_DAYS=30
LOG_FILE="/var/log/backup.log"
NOTIFICATION_EMAIL="admin@company.com"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a $LOG_FILE
}

# Function to backup databases
backup_databases() {
    log "Starting database backup"
    
    # MySQL/MariaDB
    if systemctl is-active --quiet mysql; then
        mysqldump --all-databases --single-transaction --routines --triggers \
            > $BACKUP_ROOT/mysql-$(date +%Y%m%d-%H%M).sql
    fi
    
    # PostgreSQL
    if systemctl is-active --quiet postgresql; then
        sudo -u postgres pg_dumpall > $BACKUP_ROOT/postgres-$(date +%Y%m%d-%H%M).sql
    fi
}

# Function to backup system files
backup_system() {
    log "Starting system backup"
    
    borg create $BACKUP_ROOT/borg-repo::'{hostname}-{now}' \
        /etc /home /var/www /var/lib \
        --exclude '/var/lib/docker' \
        --exclude '/home/*/.cache' \
        --compression lz4 \
        --stats
}

# Cleanup old backups
cleanup_backups() {
    log "Cleaning up old backups"
    
    # Remove old SQL dumps
    find $BACKUP_ROOT -name "*.sql" -mtime +$RETENTION_DAYS -delete
    
    # Prune borg repository
    borg prune $BACKUP_ROOT/borg-repo \
        --keep-daily=7 \
        --keep-weekly=4 \
        --keep-monthly=6 \
        --stats
}

# Main execution
main() {
    log "Backup process started"
    
    backup_databases
    backup_system
    cleanup_backups
    
    log "Backup process completed successfully"
    echo "Backup completed successfully" | mail -s "Backup Report $(hostname)" $NOTIFICATION_EMAIL
}

# Error handling
trap 'log "Backup failed"; echo "Backup failed on $(hostname)" | mail -s "BACKUP FAILURE" $NOTIFICATION_EMAIL' ERR

main "$@"
```

### System Snapshot with LVM
```bash
# Create LVM snapshot
sudo lvcreate -L 5G -s -n root-snapshot /dev/vg0/root

# Mount snapshot
sudo mkdir /mnt/snapshot
sudo mount /dev/vg0/root-snapshot /mnt/snapshot

# Backup from snapshot
tar -czf /backup/system-snapshot-$(date +%Y%m%d).tar.gz -C /mnt/snapshot .

# Cleanup
sudo umount /mnt/snapshot
sudo lvremove /dev/vg0/root-snapshot
```

## Configuration Examples

### Automated Cron Jobs
```bash
# Edit crontab
sudo crontab -e

# Daily backup at 2 AM
0 2 * * * /usr/local/bin/enterprise-backup.sh

# Weekly full system backup
0 3 * * 0 /usr/local/bin/full-system-backup.sh

# Hourly important data sync
0 * * * * rsync -av /critical/data/ /backup/critical/
```

### Remote Backup Configuration
```bash
# SSH key setup for passwordless backup
ssh-keygen -t rsa -b 4096
ssh-copy-id backup-user@backup-server

# Remote backup script
#!/bin/bash
REMOTE_HOST="backup-server"
REMOTE_PATH="/backups/$(hostname)"

# Create remote directory
ssh $REMOTE_HOST "mkdir -p $REMOTE_PATH"

# Sync to remote server
rsync -av --delete --compress /backup/ $REMOTE_HOST:$REMOTE_PATH/
```

## Security Considerations

### Encryption Best Practices
```bash
# Encrypt backup with GPG
tar -czf - /important/data | gpg --cipher-algo AES256 --compress-algo 1 \
    --symmetric --output backup-encrypted-$(date +%Y%m%d).tar.gz.gpg

# Decrypt backup
gpg --decrypt backup-encrypted-20241215.tar.gz.gpg | tar -xzf -
```

### Secure Remote Storage
- Use SSH keys instead of passwords for remote backups
- Enable firewall rules to restrict backup traffic
- Implement backup verification and integrity checks
- Store encryption keys separately from backups
- Regular testing of restore procedures

### Access Control
```bash
# Set proper permissions on backup directory
sudo chmod 700 /backup
sudo chown root:root /backup

# Create dedicated backup user
sudo useradd -r -s /bin/false backup-user
sudo mkdir /home/backup-user
sudo chown backup-user:backup-user /home/backup-user
```

## Quick Reference

### Essential Commands
```bash
# Quick file backup
tar -czf backup.tar.gz /path/to/backup

# Restore from tar
tar -xzf backup.tar.gz -C /restore/location

# Incremental sync
rsync -av --delete source/ destination/

# Database backup
mysqldump database_name > backup.sql
pg_dump database_name > backup.sql

# System package list
dpkg --get-selections > package-list.txt
apt-mark showauto > auto-packages.txt
```

### Borg Commands
```bash
# Initialize repo
borg init --encryption=repokey /path/to/repo

# Create archive
borg create /path/to/repo::archive-name /data

# List archives
borg list /path/to/repo

# Extract archive
borg extract /path/to/repo::archive-name

# Check repository
borg check /path/to/repo
```

## Troubleshooting

### Common Issues

**Backup script fails with permission errors:**
```bash
# Run backup as root or use sudo
sudo /usr/local/bin/backup-script.sh

# Check file permissions
ls -la /backup/
sudo chown -R backup-user:backup-user /backup/
```

**Insufficient disk space:**
```bash
# Check available space
df -h /backup

# Clean old backups
find /backup -type f -mtime +30 -delete

# Compress existing backups
gzip /backup/*.sql
```

**Restore fails:**
```bash
# Verify backup integrity
tar -tzf backup.tar.gz >/dev/null && echo "OK" || echo "Corrupted"

# Check borg repository
borg check /backup/borg-repo

# Test restore to temporary location first
mkdir /tmp/restore-test
tar -xzf backup.tar.gz -C /tmp/restore-test
```

**Remote backup connection issues:**
```bash
# Test SSH connection
ssh -T backup-user@backup-server

# Check SSH key permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Verify known_hosts
ssh-keyscan backup-server >> ~/.ssh/known_hosts
```

## Performance Tips

### Optimization Strategies
- Use compression (gzip, lz4) to reduce backup size
- Implement incremental backups to save time and space
- Schedule backups during low-usage periods
- Use local storage for speed, remote for redundancy
- Monitor backup performance and adjust accordingly

### Parallel Processing
```bash
# Parallel tar creation
tar -czf - /large/dataset | pv | split -b 1G - backup-part-

# Parallel rsync
rsync -av --progress --partial /source/ /destination/
```

### Network Optimization
```bash
# Limit bandwidth for remote backups
rsync -av --bwlimit=1000 /data/ remote:/backup/

# Use compression for network transfers
rsync -avz /data/ remote:/backup/
```

## What's Next
- [Monitoring and Logging | Debian 13 Server]
- [Disaster Recovery Planning | Debian 13 Server]
- [Storage Management | Debian 13 Server]
- [Security Hardening | Debian 13 Server]