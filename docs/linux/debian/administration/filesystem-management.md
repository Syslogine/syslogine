---
sidebar_position: 4
title: "Filesystem Management"
sidebar_label: "Filesystem Management"
description: "Complete guide to filesystem management on Debian 13 Trixie server including disk partitioning, LVM, filesystem types, mounting, and storage optimization."
keywords:
  - "debian 13 filesystem"
  - "debian server disk management"
  - "debian trixie storage"
  - "server filesystem administration"
  - "debian enterprise storage"
tags:
  - debian-13
  - debian-trixie
  - filesystem-management
  - disk-management
  - server-administration
slug: filesystem-management
---

import DisplayTags from '@site/src/components/DisplayTags';

<DisplayTags tags={['Debian', '13', 'Server']} />

## Overview
This tutorial covers comprehensive filesystem management for Debian 13 servers, including disk partitioning, filesystem creation, LVM configuration, mounting strategies, and storage optimization. You'll learn to manage storage efficiently from basic setups to enterprise-grade solutions.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 60 minutes  
**Required packages:** fdisk, parted, lvm2, xfsprogs, e2fsprogs  
**System requirements:** Root access, available disk space or additional drives

## Installation
```bash
# Install filesystem management tools
sudo apt update
sudo apt install fdisk parted gparted lvm2 xfsprogs e2fsprogs dosfstools

# Install advanced tools
sudo apt install btrfs-progs zfsutils-linux smartmontools hdparm
```

## Basic Section 🟢

### Viewing Disk Information
```bash
# List all block devices
lsblk

# Show disk usage
df -h

# Display partition table
sudo fdisk -l

# Check filesystem type and usage
sudo blkid
mount | column -t
```

### Basic Disk Partitioning
```bash
# Interactive partitioning with fdisk
sudo fdisk /dev/sdb

# Common fdisk commands:
# n - create new partition
# d - delete partition
# p - print partition table
# w - write changes
# q - quit without saving

# Alternative: using parted
sudo parted /dev/sdb
(parted) mklabel gpt
(parted) mkpart primary ext4 0% 100%
(parted) quit
```

### Creating Filesystems
```bash
# Create ext4 filesystem
sudo mkfs.ext4 /dev/sdb1

# Create XFS filesystem
sudo mkfs.xfs /dev/sdb1

# Create filesystem with label
sudo mkfs.ext4 -L "data-drive" /dev/sdb1

# Create filesystem with specific block size
sudo mkfs.ext4 -b 4096 /dev/sdb1
```

### Basic Mounting
```bash
# Create mount point
sudo mkdir /mnt/data

# Mount filesystem
sudo mount /dev/sdb1 /mnt/data

# Mount with specific options
sudo mount -o rw,noatime /dev/sdb1 /mnt/data

# Unmount
sudo umount /mnt/data
```

### Permanent Mounting with fstab
```bash
# Edit fstab
sudo nano /etc/fstab

# Add entry (UUID recommended)
UUID=12345678-1234-1234-1234-123456789012 /mnt/data ext4 defaults,noatime 0 2

# Get UUID
sudo blkid /dev/sdb1

# Test fstab entries
sudo mount -a
```

## Advanced Section 🔴

### LVM (Logical Volume Manager)
```bash
# Create physical volume
sudo pvcreate /dev/sdb /dev/sdc

# Create volume group
sudo vgcreate vg-data /dev/sdb /dev/sdc

# Create logical volume
sudo lvcreate -L 100G -n lv-web vg-data
sudo lvcreate -l 100%FREE -n lv-database vg-data

# Create filesystem on LV
sudo mkfs.ext4 /dev/vg-data/lv-web

# Mount logical volume
sudo mkdir /var/www-data
sudo mount /dev/vg-data/lv-web /var/www-data
```

### LVM Management Commands
```bash
# Display information
sudo pvdisplay
sudo vgdisplay
sudo lvdisplay

# Extend logical volume
sudo lvextend -L +50G /dev/vg-data/lv-web
sudo resize2fs /dev/vg-data/lv-web

# Add disk to volume group
sudo pvcreate /dev/sdd
sudo vgextend vg-data /dev/sdd

# Create snapshot
sudo lvcreate -L 10G -s -n lv-web-snap /dev/vg-data/lv-web
```

### RAID Configuration with mdadm
```bash
# Install mdadm
sudo apt install mdadm

# Create RAID 1 array
sudo mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc

# Check RAID status
cat /proc/mdstat
sudo mdadm --detail /dev/md0

# Save RAID configuration
sudo mdadm --detail --scan >> /etc/mdadm/mdadm.conf
sudo update-initramfs -u
```

### Advanced Filesystem: Btrfs
```bash
# Create btrfs filesystem
sudo mkfs.btrfs /dev/sdb1

# Mount with options
sudo mount -o compress=zstd,noatime /dev/sdb1 /mnt/btrfs

# Create subvolume
sudo btrfs subvolume create /mnt/btrfs/home
sudo btrfs subvolume create /mnt/btrfs/snapshots

# Create snapshot
sudo btrfs subvolume snapshot /mnt/btrfs/home /mnt/btrfs/snapshots/home-$(date +%Y%m%d)

# Balance filesystem
sudo btrfs balance start /mnt/btrfs
```

### ZFS Configuration
```bash
# Create ZFS pool
sudo zpool create tank /dev/sdb /dev/sdc

# Create ZFS dataset
sudo zfs create tank/data
sudo zfs create tank/backup

# Set properties
sudo zfs set compression=lz4 tank/data
sudo zfs set mountpoint=/data tank/data

# Create snapshot
sudo zfs snapshot tank/data@backup-$(date +%Y%m%d)

# Check pool status
sudo zpool status
sudo zfs list
```

## Configuration Examples

### Enterprise Storage Layout
```bash
# Complete LVM setup for enterprise server
#!/bin/bash

# Physical volumes
sudo pvcreate /dev/sdb /dev/sdc /dev/sdd /dev/sde

# Create volume groups
sudo vgcreate vg-system /dev/sdb /dev/sdc
sudo vgcreate vg-data /dev/sdd /dev/sde

# System logical volumes
sudo lvcreate -L 20G -n lv-root vg-system
sudo lvcreate -L 8G -n lv-var vg-system
sudo lvcreate -L 4G -n lv-tmp vg-system
sudo lvcreate -L 10G -n lv-home vg-system

# Data logical volumes
sudo lvcreate -L 200G -n lv-database vg-data
sudo lvcreate -L 100G -n lv-web vg-data
sudo lvcreate -l 100%FREE -n lv-backup vg-data

# Create filesystems
sudo mkfs.ext4 /dev/vg-system/lv-root
sudo mkfs.ext4 /dev/vg-system/lv-var
sudo mkfs.ext4 /dev/vg-system/lv-tmp
sudo mkfs.ext4 /dev/vg-system/lv-home
sudo mkfs.xfs /dev/vg-data/lv-database
sudo mkfs.ext4 /dev/vg-data/lv-web
sudo mkfs.ext4 /dev/vg-data/lv-backup
```

### Optimized fstab Configuration
```bash
# /etc/fstab - Enterprise configuration
UUID=root-uuid /               ext4    defaults,noatime,errors=remount-ro 0 1
UUID=var-uuid  /var            ext4    defaults,noatime 0 2
UUID=tmp-uuid  /tmp            ext4    defaults,noatime,nodev,nosuid,noexec 0 2
UUID=home-uuid /home           ext4    defaults,noatime,nodev 0 2
UUID=db-uuid   /var/lib/mysql  xfs     defaults,noatime,logbufs=8,logbsize=256k 0 2
UUID=web-uuid  /var/www        ext4    defaults,noatime,nodev 0 2
UUID=backup-uuid /backup       ext4    defaults,noatime,nodev,nosuid 0 2

# Temporary filesystems
tmpfs /tmp                     tmpfs   defaults,noatime,mode=1777,size=2G 0 0
tmpfs /var/tmp                 tmpfs   defaults,noatime,mode=1777,size=1G 0 0
```

### Automated Disk Monitoring Script
```bash
#!/bin/bash
# disk-monitor.sh
THRESHOLD=85
EMAIL="admin@company.com"
LOG_FILE="/var/log/disk-monitor.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> $LOG_FILE
}

check_disk_usage() {
    df -h | awk 'NR>1 {gsub(/%/,"",$5); if($5 > '$THRESHOLD') print $0}' | while read line; do
        USAGE=$(echo $line | awk '{print $5}')
        MOUNT=$(echo $line | awk '{print $6}')
        
        log "WARNING: Disk usage on $MOUNT is ${USAGE}%"
        echo "Disk usage warning: $MOUNT is ${USAGE}% full" | \
            mail -s "Disk Space Alert - $(hostname)" $EMAIL
    done
}

check_filesystem_health() {
    # Check for filesystem errors
    dmesg | grep -i "filesystem\|ext4\|xfs" | tail -10 >> $LOG_FILE
    
    # SMART monitoring
    for disk in $(lsblk -nd -o NAME | grep -E '^[sv]d[a-z]$'); do
        smartctl -H /dev/$disk | grep -q "PASSED" || {
            log "WARNING: SMART check failed for /dev/$disk"
            echo "SMART check failed for /dev/$disk" | \
                mail -s "Disk Health Alert - $(hostname)" $EMAIL
        }
    done
}

main() {
    log "Starting disk monitoring check"
    check_disk_usage
    check_filesystem_health
    log "Disk monitoring check completed"
}

main
```

## Security Considerations

### Filesystem Permissions and Security
```bash
# Set secure mount options
sudo mount -o defaults,noatime,nodev,nosuid,noexec /dev/sdb1 /mnt/secure

# Encrypt filesystem with LUKS
sudo cryptsetup luksFormat /dev/sdb1
sudo cryptsetup luksOpen /dev/sdb1 encrypted-disk
sudo mkfs.ext4 /dev/mapper/encrypted-disk

# Mount encrypted filesystem
sudo mount /dev/mapper/encrypted-disk /mnt/encrypted
```

### Access Control Lists (ACLs)
```bash
# Install ACL support
sudo apt install acl

# Enable ACL on filesystem
sudo mount -o remount,acl /

# Set ACL permissions
setfacl -m u:username:rwx /path/to/directory
setfacl -m g:groupname:r-x /path/to/directory

# View ACLs
getfacl /path/to/directory

# Remove ACL
setfacl -x u:username /path/to/directory
```

### Quota Management
```bash
# Install quota tools
sudo apt install quota

# Enable quotas in fstab
# Add usrquota,grpquota to mount options

# Initialize quotas
sudo quotacheck -cum /home
sudo quotaon /home

# Set user quota
sudo setquota -u username 1000000 1200000 1000 1200 /home

# Check quotas
quota -u username
sudo repquota /home
```

## Quick Reference

### Essential Commands
```bash
# Disk information
lsblk -f                    # Show filesystems
df -h                       # Disk usage
du -sh /path                # Directory usage
sudo fdisk -l               # List partitions
sudo blkid                  # Show UUIDs

# LVM commands
sudo pvs                    # Physical volumes
sudo vgs                    # Volume groups  
sudo lvs                    # Logical volumes
sudo lvcreate -L 10G -n name vg  # Create LV
sudo lvextend -L +5G /dev/vg/lv  # Extend LV

# Filesystem commands
sudo mkfs.ext4 /dev/device  # Create ext4
sudo fsck /dev/device       # Check filesystem
sudo tune2fs -l /dev/device # Show filesystem info
sudo resize2fs /dev/device  # Resize ext4
```

### Mount Options
```bash
# Common mount options
defaults        # Default options
noatime         # Don't update access times
nodiratime      # Don't update directory access times
nodev           # No device files
nosuid          # No SUID programs
noexec          # No executable files
ro              # Read-only
rw              # Read-write
sync            # Synchronous writes
async           # Asynchronous writes
```

## Troubleshooting

### Common Issues

**Filesystem corruption:**
```bash
# Check and repair ext4
sudo fsck.ext4 -f /dev/sdb1

# Check and repair XFS
sudo xfs_repair /dev/sdb1

# Force check on next boot
sudo touch /forcefsck
```

**Can't unmount busy filesystem:**
```bash
# Find processes using filesystem
sudo fuser -mv /mnt/point
sudo lsof +D /mnt/point

# Kill processes and unmount
sudo fuser -km /mnt/point
sudo umount /mnt/point

# Lazy unmount
sudo umount -l /mnt/point
```

**LVM issues:**
```bash
# Scan for LVM volumes
sudo pvscan
sudo vgscan
sudo lvscan

# Activate volume group
sudo vgchange -ay vg-name

# Fix missing physical volume
sudo vgreduce --removemissing vg-name
```

**Disk full issues:**
```bash
# Find large files
sudo find / -type f -size +100M 2>/dev/null

# Clear system logs
sudo journalctl --vacuum-time=7d
sudo apt autoremove
sudo apt autoclean

# Check for deleted but open files
sudo lsof | grep deleted
```

**Mount fails at boot:**
```bash
# Check fstab syntax
sudo mount -a

# Boot into recovery mode if needed
# Edit fstab and add 'noauto' option temporarily

# Check filesystem UUID
sudo blkid /dev/device
```

## Performance Tips

### Filesystem Optimization
```bash
# Optimize ext4 for performance
sudo tune2fs -o journal_data_writeback /dev/device
sudo mount -o noatime,data=writeback /dev/device /mnt

# XFS performance tuning
sudo mount -o noatime,logbufs=8,logbsize=256k /dev/device /mnt

# Enable read-ahead for large sequential reads
sudo blockdev --setra 4096 /dev/device
```

### I/O Scheduling
```bash
# Check current I/O scheduler
cat /sys/block/sda/queue/scheduler

# Set I/O scheduler
echo mq-deadline | sudo tee /sys/block/sda/queue/scheduler

# Permanent setting
echo 'echo mq-deadline > /sys/block/sda/queue/scheduler' >> /etc/rc.local
```

### Memory and Cache Tuning
```bash
# Adjust swappiness
echo 'vm.swappiness=10' >> /etc/sysctl.conf

# Adjust cache pressure
echo 'vm.vfs_cache_pressure=50' >> /etc/sysctl.conf

# Apply settings
sudo sysctl -p
```

## What's Next
- [Storage Monitoring | Debian 13 Server]
- [Backup and Restore | Debian 13 Server]
- [Performance Tuning | Debian 13 Server]
- [Security Hardening | Debian 13 Server]