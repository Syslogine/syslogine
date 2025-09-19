---
sidebar_position: 1
title: "AlmaLinux Administration Guide 2025"
sidebar_label: "Index"
description: "Complete AlmaLinux guide covering installation, DNF management, enterprise features, and migration from CentOS with CloudLinux backing."
keywords: 
  - "almalinux"
  - "rhel alternative"
  - "cloudlinux almalinux"
  - "centos replacement"
  - "enterprise linux"
  - "almalinux installation"
  - "dnf package manager"
  - "almalinux migration"
tags:
  - almalinux
  - enterprise-linux
  - rhel-alternative
  - centos-replacement
  - cloudlinux
  - dnf-package-manager
  - linux-migration
  - server-administration
slug: /docs/linux/almalinux
---

import DisplayTags from '@site/src/components/DisplayTags';

<DisplayTags tags={['almalinux', 'desktop', 'v9.5', '2025']} />

## Intro

AlmaLinux is a 1:1 binary compatible fork of RHEL, developed by CloudLinux Inc. It provides enterprise-grade stability with commercial backing, making it a reliable alternative to CentOS and a production-ready RHEL replacement.

## Why Choose AlmaLinux?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🎯 Key Benefits</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>1:1 binary compatibility with RHEL</li>
          <li>CloudLinux commercial backing</li>
          <li>Free forever guarantee</li>
          <li>Production-ready stability</li>
          <li>Extensive hardware support</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>📊 Use Cases</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Enterprise production servers</li>
          <li>Web hosting infrastructure</li>
          <li>Database and application servers</li>
          <li>Cloud and virtualization platforms</li>
          <li>Development and testing environments</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## Release Information

| Version | Codename | Release Date | Base RHEL | Support Until |
|---------|----------|--------------|-----------|---------------|
| 9.3 | Shamrock Pampas Cat | November 2023 | RHEL 9.3 | ~2032 |
| 9.2 | Turquoise Kodkod | May 2023 | RHEL 9.2 | ~2032 |
| 8.9 | Midnight Oncilla | November 2023 | RHEL 8.9 | ~2029 |
| 8.8 | Sapphire Caracal | May 2023 | RHEL 8.8 | ~2029 |

:::tip CloudLinux Advantage
AlmaLinux is backed by CloudLinux Inc., a profitable company with over 15 years of Linux experience, ensuring long-term sustainability and enterprise-grade support options.
:::

## AlmaLinux vs Competition

| Feature | AlmaLinux | Rocky Linux | CentOS Stream | Oracle Linux |
|---------|-----------|-------------|---------------|--------------|
| RHEL Compatibility | 1:1 Binary | 1:1 Binary | Upstream | Modified |
| Commercial Backing | CloudLinux | Community | Red Hat | Oracle |
| Support Options | Available | Community | Red Hat | Oracle |
| Licensing | Free | Free | Free | Free |
| Enterprise Focus | High | High | Medium | High |

## Quick Start Guides

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🚀 Installation</h3>
      </div>
      <div className="card__body">
        <p>Fresh AlmaLinux installation from ISO</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/almalinux/installation" className="button button--primary">Install Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🔄 Migration Tools</h3>
      </div>
      <div className="card__body">
        <p>Migrate from CentOS/RHEL to AlmaLinux</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/almalinux/migration" className="button button--primary">Migration Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>📦 Package Management</h3>
      </div>
      <div className="card__body">
        <p>DNF package manager and repositories</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/almalinux/package-management" className="button button--primary">DNF Guide</a>
      </div>
    </div>
  </div>
</div>

## Migration from CentOS

### Automated Migration Script
```bash
# Download AlmaLinux migration script
curl -O https://raw.githubusercontent.com/AlmaLinux/almalinux-deploy/master/almalinux-deploy.sh

# Make executable
chmod +x almalinux-deploy.sh

# Run migration (backup system first!)
sudo ./almalinux-deploy.sh

# Verify migration
cat /etc/almalinux-release
```

### Migration from Different Sources
```bash
# From CentOS 8
sudo ./almalinux-deploy.sh

# From CentOS Stream 8
sudo ./almalinux-deploy.sh

# From Oracle Linux 8
sudo ./almalinux-deploy.sh -f

# From Rocky Linux 8
sudo ./almalinux-deploy.sh
```

### Post-Migration Verification
```bash
# Check system information
cat /etc/almalinux-release
hostnamectl
uname -r

# Verify repositories
dnf repolist
dnf check-update

# Check services
systemctl status
systemctl list-failed
```

## Core Administration Topics

### System Management
- **[Initial Configuration](/docs/linux/almalinux/initial-setup)** - Post-installation setup
- **[User & Group Management](/docs/linux/almalinux/users)** - Account administration
- **[Service Management](/docs/linux/almalinux/services)** - Systemd configuration
- **[Storage Management](/docs/linux/almalinux/storage)** - LVM, XFS, and disk management

### Security & Compliance
- **[SELinux Configuration](/docs/linux/almalinux/selinux)** - Security-Enhanced Linux
- **[Firewall Management](/docs/linux/almalinux/firewall)** - firewalld configuration
- **[SSH Security](/docs/linux/almalinux/ssh)** - Secure shell hardening
- **[System Auditing](/docs/linux/almalinux/auditing)** - auditd configuration

### Network & Infrastructure
- **[Network Configuration](/docs/linux/almalinux/networking)** - NetworkManager setup
- **[DNS Management](/docs/linux/almalinux/dns)** - BIND and DNS configuration
- **[NTP Configuration](/docs/linux/almalinux/ntp)** - Time synchronization
- **[Load Balancing](/docs/linux/almalinux/load-balancing)** - HAProxy and nginx

## Package Management with DNF

### Essential DNF Commands
```bash
# System updates
sudo dnf check-update
sudo dnf update
sudo dnf upgrade  # More comprehensive update

# Package operations
sudo dnf install package-name
sudo dnf install @group-name
sudo dnf remove package-name
sudo dnf autoremove  # Remove orphaned packages

# Search and information
dnf search keyword
dnf info package-name
dnf list installed
dnf list available

# History management
dnf history list
sudo dnf history undo ID
sudo dnf history redo ID
```

### Repository Management
```bash
# List repositories
dnf repolist
dnf repolist all

# Enable/disable repositories
sudo dnf config-manager --enable repo-name
sudo dnf config-manager --disable repo-name

# Add new repository
sudo dnf config-manager --add-repo https://example.com/repo.repo

# Install from specific repo
sudo dnf install --enablerepo=repo-name package-name
```

### EPEL and Additional Repositories
```bash
# Install EPEL
sudo dnf install epel-release

# Install PowerTools/CRB
sudo dnf config-manager --enable powertools  # AlmaLinux 8
sudo dnf config-manager --enable crb         # AlmaLinux 9

# Install Remi repository (PHP)
sudo dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm

# Install Docker CE repository
sudo dnf config-manager --add-repo https://download.docker.com/linux/centlinux/docker-ce.repo
```

## Enterprise Features

### Application Streams
```bash
# List available modules
dnf module list

# Show module information
dnf module info module-name

# Install specific module stream
sudo dnf module install nodejs:18
sudo dnf module install php:8.1

# Switch module stream
sudo dnf module reset php
sudo dnf module install php:8.2

# List installed modules
dnf module list --installed
```

### Container Technologies
```bash
# Install Podman suite
sudo dnf install podman buildah skopeo

# Install Docker
sudo dnf install docker-ce docker-ce-cli containerd.io
sudo systemctl enable --now docker

# Install Kubernetes tools
sudo dnf install kubernetes-client

# Container image management
podman pull registry.access.redhat.com/ubi9/ubi
podman run -it ubi9/ubi bash
```

## Server Roles & Applications

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🌐 Web Applications</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Apache HTTP Server</li>
          <li>Nginx with PHP-FPM</li>
          <li>WordPress hosting</li>
          <li>SSL certificate management</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/almalinux/web-server" className="button button--secondary">Web Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🗄️ Database Solutions</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>MariaDB clustering</li>
          <li>PostgreSQL replication</li>
          <li>Redis caching</li>
          <li>Database backup strategies</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/almalinux/database" className="button button--secondary">DB Guide</a>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>☁️ Cloud Integration</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>AWS EC2 optimization</li>
          <li>Azure VM configuration</li>
          <li>Google Cloud integration</li>
          <li>Cloud-init automation</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/almalinux/cloud" className="button button--secondary">Cloud Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🔧 DevOps Tools</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Jenkins CI/CD</li>
          <li>GitLab installation</li>
          <li>Ansible automation</li>
          <li>Monitoring with Prometheus</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/almalinux/devops" className="button button--secondary">DevOps Guide</a>
      </div>
    </div>
  </div>
</div>

## Security Configuration

### SELinux Management
```bash
# Check SELinux status
sestatus
getenforce

# SELinux modes
sudo setenforce 0  # Permissive
sudo setenforce 1  # Enforcing

# Permanent configuration
sudo nano /etc/selinux/config
# SELINUX=enforcing

# SELinux troubleshooting
sudo sealert -a /var/log/audit/audit.log
sudo ausearch -m avc -ts recent

# Context management
sudo restorecon -R /var/www/html/
sudo setsebool -P httpd_can_network_connect on
```

### Firewall Configuration
```bash
# Basic firewall management
sudo firewall-cmd --state
sudo firewall-cmd --list-all

# Service management
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh

# Port management
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --remove-port=8080/tcp

# Apply changes
sudo firewall-cmd --reload

# Zone management
sudo firewall-cmd --get-zones
sudo firewall-cmd --set-default-zone=public
```

## System Monitoring & Performance

### Performance Monitoring Tools
```bash
# Install monitoring tools
sudo dnf install htop iotop nethogs sysstat

# System performance
htop
top
vmstat 1
iostat -x 1

# Memory analysis
free -h
cat /proc/meminfo
pmap -x PID

# Disk I/O monitoring
iotop
iostat -x 1
lsof | grep deleted
```

### Log Management
```bash
# Systemd journal
journalctl -f
journalctl -u service-name
journalctl --since "1 hour ago"
journalctl --until "2023-12-01"

# Traditional logs
tail -f /var/log/messages
tail -f /var/log/secure
tail -f /var/log/audit/audit.log

# Log rotation
sudo logrotate -f /etc/logrotate.conf
```

### System Tuning
```bash
# Kernel parameters
sudo sysctl -a | grep vm
sudo sysctl vm.swappiness=10

# Permanent tuning
sudo nano /etc/sysctl.conf
# vm.swappiness = 10
# net.core.rmem_max = 134217728

# Apply changes
sudo sysctl -p

# CPU performance
sudo dnf install tuned
sudo systemctl enable --now tuned
sudo tuned-adm profile throughput-performance
```

## Backup & Recovery

### System Backup Strategies
```bash
# System configuration backup
sudo tar -czf /backup/etc-$(date +%Y%m%d).tar.gz /etc

# Full system backup with rsync
sudo rsync -aAXv --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} / /backup/

# LVM snapshot backup
sudo lvcreate -L1G -s -n root-snapshot /dev/vg0/root
sudo mount /dev/vg0/root-snapshot /mnt/snapshot
# Backup from snapshot
sudo umount /mnt/snapshot
sudo lvremove /dev/vg0/root-snapshot
```

### Database Backup
```bash
# MariaDB backup
mysqldump -u root -p --all-databases > /backup/mysql-$(date +%Y%m%d).sql

# PostgreSQL backup
sudo -u postgres pg_dumpall > /backup/postgresql-$(date +%Y%m%d).sql

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backup/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR
mysqldump -u root -p --all-databases > $BACKUP_DIR/mysql.sql
tar -czf $BACKUP_DIR/etc.tar.gz /etc
find /backup -type d -mtime +7 -exec rm -rf {} \;
```

## Troubleshooting

### Common Issues
- **[Boot Problems](/docs/linux/almalinux/troubleshooting/boot)** - GRUB and systemd issues
- **[Package Conflicts](/docs/linux/almalinux/troubleshooting/packages)** - DNF resolution
- **[SELinux Denials](/docs/linux/almalinux/troubleshooting/selinux)** - Permission issues
- **[Network Problems](/docs/linux/almalinux/troubleshooting/network)** - Connectivity issues

### System Recovery
```bash
# Boot rescue mode
# Add 'systemd.unit=rescue.target' to kernel parameters

# Fix package database
sudo dnf check
sudo dnf clean all
sudo dnf makecache

# Restore from backup
sudo tar -xzf /backup/etc-backup.tar.gz -C /

# Network recovery
sudo nmcli general reload
sudo systemctl restart NetworkManager
sudo firewall-cmd --reload
```

## Best Practices

:::tip Production Best Practices
- Use AlmaLinux 9.x for new deployments
- Implement regular backup schedules
- Keep SELinux enabled and properly configured
- Use LVM for flexible storage management
- Monitor system performance and logs
- Test updates in staging environment
:::

:::warning Security Considerations
- Enable automatic security updates
- Configure firewalld with minimal open ports
- Regular security audits and vulnerability scanning
- Implement proper access controls and SSH hardening
- Keep system and applications updated
- Monitor failed authentication attempts
:::

## CloudLinux Integration

### Commercial Support Options
- **CloudLinux AlmaLinux Support** - Professional support services
- **TuxCare Extended Lifecycle Support** - Extended security updates
- **KernelCare Live Patching** - Zero-downtime kernel updates
- **CloudLinux OS** - Commercial hardened version available

### Migration to CloudLinux OS
```bash
# Convert AlmaLinux to CloudLinux OS (if needed)
wget https://repo.cloudlinux.com/cloudlinux/sources/cln/cldeploy
sh cldeploy -k YOUR-LICENSE-KEY
```

## Development Environment

### Programming Languages
```bash
# Python development
sudo dnf install python3 python3-pip python3-devel
pip3 install virtualenv

# Node.js development
sudo dnf module install nodejs:18
npm install -g pm2

# PHP development
sudo dnf module install php:8.1
sudo dnf install php-mysql php-gd php-mbstring

# Java development
sudo dnf install java-17-openjdk java-17-openjdk-devel maven

# Go development
sudo dnf install golang
```

## Additional Resources

- **[Official AlmaLinux Documentation](https://wiki.almalinux.org/)**
- **[AlmaLinux Community Chat](https://chat.almalinux.org/)**
- **[AlmaLinux Forums](https://forums.almalinux.org/)**
- **[CloudLinux Knowledge Base](https://docs.cloudlinux.com/)**
- **[AlmaLinux GitHub](https://github.com/AlmaLinux)**

## Related Guides

- **[Rocky Linux Administration](/docs/linux/rocky)** - Alternative RHEL clone
- **[RHEL Administration](/docs/linux/rhel)** - Upstream enterprise Linux
- **[CentOS Migration](/docs/migration/)** - Migration procedures
- **[CloudLinux OS](/docs/linux/cloudlinux)** - Commercial hardened variant

---

*AlmaLinux combines the stability of RHEL with the assurance of commercial backing from CloudLinux. Its commitment to being "free forever" and 1:1 binary compatibility makes it an excellent choice for enterprise environments seeking a reliable CentOS replacement.*