---
sidebar_position: 4
title: "Rocky Linux Administration Guide 2025 | RHEL Alternative"
description: "Complete Rocky Linux guide covering installation, DNF package management, enterprise features, and migration from CentOS."
keywords: 
  - "rocky linux"
  - "rhel alternative"
  - "centos replacement"
  - "dnf package manager"
  - "enterprise linux"
  - "rocky linux installation"
  - "selinux configuration"
  - "systemd administration"
slug: rocky-linux-guide
---

# Rocky Linux Administration

Rocky Linux is a community-driven, enterprise-grade Linux distribution that is 100% bug-for-bug compatible with Red Hat Enterprise Linux (RHEL). Created by the original founder of CentOS, it serves as the spiritual successor to CentOS.

## Why Choose Rocky Linux?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🎯 Key Benefits</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>100% RHEL compatibility</li>
          <li>Community-driven and free forever</li>
          <li>Enterprise-grade stability</li>
          <li>10-year lifecycle support</li>
          <li>Perfect CentOS replacement</li>
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
          <li>Web hosting and applications</li>
          <li>Database servers</li>
          <li>Development and testing</li>
          <li>RHEL learning environment</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## Release Information

| Version | Codename | Release Date | Base RHEL | Support Until |
|---------|----------|--------------|-----------|---------------|
| 9.3 | Blue Onyx | November 2023 | RHEL 9.3 | ~2032 |
| 9.2 | Blue Onyx | May 2023 | RHEL 9.2 | ~2032 |
| 8.9 | Green Obsidian | November 2023 | RHEL 8.9 | ~2029 |
| 8.8 | Green Obsidian | May 2023 | RHEL 8.8 | ~2029 |

:::tip Version Recommendation
**Rocky Linux 9.x** for new deployments - offers modern features and longer support.
**Rocky Linux 8.x** for migration from CentOS 8 or existing RHEL 8 environments.
:::

## Migration from CentOS

### CentOS 8 to Rocky Linux 8
```bash
# Download migration script
curl -O https://raw.githubusercontent.com/rocky-linux/rocky-tools/main/migrate2rocky/migrate2rocky.sh

# Make executable
chmod +x migrate2rocky.sh

# Run migration (backup first!)
sudo ./migrate2rocky.sh -r

# Verify migration
cat /etc/redhat-release
```

### Manual Migration Steps
```bash
# Backup important data first!
sudo tar -czf /backup/etc-backup.tar.gz /etc

# Remove CentOS repositories
sudo rm -rf /etc/yum.repos.d/CentOS-*

# Install Rocky repositories
sudo dnf install -y https://download.rockylinux.org/pub/rocky/9/BaseOS/x86_64/linux/Packages/r/rocky-release-9.3-1.3.el9.noarch.rpm

# Update system
sudo dnf update -y

# Reboot
sudo reboot
```

## Quick Start Guides

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🚀 Installation</h3>
      </div>
      <div className="card__body">
        <p>Fresh Rocky Linux installation from ISO</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/rocky/installation" className="button button--primary">Install Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🔄 CentOS Migration</h3>
      </div>
      <div className="card__body">
        <p>Migrate existing CentOS systems to Rocky</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/rocky/migration" className="button button--primary">Migration Guide</a>
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
        <a href="/docs/linux/rocky/package-management" className="button button--primary">DNF Guide</a>
      </div>
    </div>
  </div>
</div>

## Core Administration Topics

### System Management
- **[Initial Setup](/docs/linux/rocky/initial-setup)** - Post-installation configuration
- **[User Management](/docs/linux/rocky/users)** - Account and group administration
- **[Service Management](/docs/linux/rocky/services)** - Systemd service configuration
- **[File System Management](/docs/linux/rocky/filesystems)** - LVM, XFS, and storage

### Security & Compliance
- **[SELinux Configuration](/docs/linux/rocky/selinux)** - Security-Enhanced Linux
- **[Firewall Management](/docs/linux/rocky/firewall)** - firewalld configuration
- **[SSH Hardening](/docs/linux/rocky/ssh)** - Secure shell setup
- **[Audit System](/docs/linux/rocky/auditing)** - System auditing with auditd

### Network & Services
- **[Network Configuration](/docs/linux/rocky/networking)** - NetworkManager and interfaces
- **[DNS Configuration](/docs/linux/rocky/dns)** - BIND and systemd-resolved
- **[Time Synchronization](/docs/linux/rocky/ntp)** - Chrony NTP configuration
- **[Certificate Management](/docs/linux/rocky/certificates)** - SSL/TLS certificates

## DNF Package Management

### Basic DNF Commands
```bash
# Update package cache
sudo dnf check-update

# Update all packages
sudo dnf update

# Install packages
sudo dnf install package-name
sudo dnf install package1 package2

# Remove packages
sudo dnf remove package-name

# Search packages
dnf search keyword
dnf list available | grep keyword

# Package information
dnf info package-name
dnf provides /path/to/file
```

### Repository Management
```bash
# List enabled repositories
dnf repolist

# Enable repository
sudo dnf config-manager --enable repository-name

# Add new repository
sudo dnf config-manager --add-repo https://example.com/repo.repo

# Install from specific repository
sudo dnf install --enablerepo=repository-name package-name

# Clean cache
sudo dnf clean all
```

### EPEL Repository
```bash
# Install EPEL (Extra Packages for Enterprise Linux)
sudo dnf install epel-release

# Install from EPEL
sudo dnf install htop

# List EPEL packages
dnf repository-packages epel list
```

## Enterprise Features

### Red Hat Subscription Manager Alternative
```bash
# Rocky Linux doesn't need subscriptions
# All repositories are free and open

# Check available repositories
dnf repolist all

# Enable PowerTools/CRB repository
sudo dnf config-manager --enable powertools  # Rocky 8
sudo dnf config-manager --enable crb         # Rocky 9
```

### Application Streams (AppStream)
```bash
# List available modules
dnf module list

# Install specific module stream
sudo dnf module install nodejs:18

# Reset module
sudo dnf module reset nodejs

# Switch module stream
sudo dnf module install nodejs:20
```

### Container Tools
```bash
# Install Podman and container tools
sudo dnf install podman buildah skopeo

# Install Docker (alternative)
sudo dnf config-manager --add-repo https://download.docker.com/linux/centlinux/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io
```

## Server Roles & Applications

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🌐 Web Server</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Apache HTTP Server (httpd)</li>
          <li>Nginx configuration</li>
          <li>PHP-FPM integration</li>
          <li>SSL/TLS with mod_ssl</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/rocky/web-server" className="button button--secondary">Web Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🗄️ Database Server</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>MariaDB installation</li>
          <li>PostgreSQL setup</li>
          <li>MySQL configuration</li>
          <li>Database security</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/rocky/database" className="button button--secondary">DB Guide</a>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>📧 Mail Server</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Postfix MTA</li>
          <li>Dovecot IMAP</li>
          <li>SpamAssassin</li>
          <li>Mail security</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/rocky/mail-server" className="button button--secondary">Mail Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🔒 Security Services</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>OpenVPN server</li>
          <li>FreeIPA identity management</li>
          <li>Fail2ban protection</li>
          <li>ClamAV antivirus</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/rocky/security-services" className="button button--secondary">Security Guide</a>
      </div>
    </div>
  </div>
</div>

## System Configuration

### Important Configuration Files
```bash
# Network configuration
/etc/NetworkManager/
/etc/sysconfig/network-scripts/

# Service configuration
/etc/systemd/system/
/usr/lib/systemd/system/

# Package management
/etc/dnf/dnf.conf
/etc/yum.repos.d/

# Security
/etc/selinux/config
/etc/audit/auditd.conf
/etc/firewalld/
```

### SELinux Management
```bash
# Check SELinux status
sestatus
getenforce

# Set SELinux mode
sudo setenforce 0  # Permissive
sudo setenforce 1  # Enforcing

# Permanent configuration
sudo nano /etc/selinux/config
# SELINUX=enforcing|permissive|disabled

# SELinux troubleshooting
sealert -a /var/log/audit/audit.log
ausearch -m avc -ts recent
```

### Firewall Configuration
```bash
# Check firewall status
sudo firewall-cmd --state

# List active zones
sudo firewall-cmd --get-active-zones

# Add service to firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Add custom port
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload

# List all rules
sudo firewall-cmd --list-all
```

## System Monitoring & Maintenance

### System Information
```bash
# Rocky Linux version
cat /etc/rocky-release
hostnamectl

# System resources
free -h
df -h
lscpu
lsmem

# Network information
ip addr show
ss -tuln
nmcli device status
```

### Log Management
```bash
# System logs with journald
journalctl -u service-name
journalctl -f  # Follow logs
journalctl --since "1 hour ago"

# Traditional log files
/var/log/messages
/var/log/secure
/var/log/audit/audit.log
/var/log/dnf.log
```

### Performance Monitoring
```bash
# Install monitoring tools
sudo dnf install htop iotop nethogs

# System performance
htop
iotop
iostat
vmstat 1

# Network monitoring
nethogs
iftop
ss -i
```

## Troubleshooting

### Common Issues
- **[Boot Problems](/docs/linux/rocky/troubleshooting/boot)** - GRUB and systemd issues
- **[Package Conflicts](/docs/linux/rocky/troubleshooting/packages)** - DNF dependency issues
- **[SELinux Denials](/docs/linux/rocky/troubleshooting/selinux)** - Permission problems
- **[Network Issues](/docs/linux/rocky/troubleshooting/network)** - Connectivity problems

### Recovery Procedures
```bash
# Boot into rescue mode
# Add 'systemd.unit=rescue.target' to kernel line

# Fix broken packages
sudo dnf check
sudo dnf history list
sudo dnf history undo last

# Reset SELinux contexts
sudo restorecon -R /
sudo fixfiles relabel

# Network troubleshooting
sudo nmcli general reload
sudo systemctl restart NetworkManager
```

## Best Practices

:::tip Enterprise Best Practices
- Use LVM for flexible storage management
- Keep SELinux enabled in enforcing mode
- Regular system updates with `dnf update`
- Implement proper backup strategies
- Monitor system logs regularly
- Use configuration management tools (Ansible)
:::

:::warning Security Considerations
- Enable and configure firewalld
- Keep system updated for security patches
- Use strong authentication methods
- Implement proper access controls
- Regular security audits
- Monitor failed login attempts
:::

## Rocky Linux vs Alternatives

| Feature | Rocky Linux | AlmaLinux | CentOS Stream | RHEL |
|---------|-------------|-----------|---------------|------|
| RHEL Compatibility | 100% | 100% | Upstream | Source |
| Cost | Free | Free | Free | Paid |
| Support | Community | CloudLinux | Red Hat | Red Hat |
| Lifecycle | 10 years | 10 years | Rolling | 10 years |
| Enterprise Focus | High | High | Medium | High |

## Development & Automation

### Programming Languages
```bash
# Python development
sudo dnf install python3 python3-pip python3-devel

# Node.js development
sudo dnf module install nodejs:18

# Java development
sudo dnf install java-17-openjdk java-17-openjdk-devel

# Go development
sudo dnf install golang

# Build tools
sudo dnf install gcc gcc-c++ make cmake
```

### Configuration Management
```bash
# Install Ansible
sudo dnf install ansible

# Install Puppet
sudo dnf install puppet

# Install Chef
# Use chef.io repositories
```

## Additional Resources

- **[Rocky Linux Documentation](https://docs.rockylinux.org/)**
- **[Rocky Linux Forums](https://forums.rockylinux.org/)**
- **[Rocky Linux Mattermost](https://chat.rockylinux.org/)**
- **[Rocky Linux GitHub](https://github.com/rocky-linux)**
- **[RHEL Documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/)**

## Related Guides

- **[AlmaLinux Administration](/docs/linux/almalinux)** - Alternative RHEL clone
- **[RHEL Administration](/docs/linux/rhel)** - Upstream enterprise Linux
- **[CentOS Migration](/docs/migration/centos-to-rocky)** - Migration procedures

---

*Rocky Linux provides enterprise-grade stability and RHEL compatibility without licensing costs. Its community-driven development ensures long-term viability for enterprise deployments.*