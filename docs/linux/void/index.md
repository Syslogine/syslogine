---
sidebar_position: 20
title: "Void Linux Administration Guide 2025 | Independent Rolling Release"
description: "Complete Void Linux guide covering runit init system, XBPS package management, musl and glibc variants, and minimalist system administration."
keywords: 
  - "void linux"
  - "runit init system"
  - "xbps package manager"
  - "musl libc"
  - "independent linux"
  - "rolling release"
  - "minimal linux"
  - "systemd-free"
  - "void templates"
slug: void-guide
---

# Void Linux Administration

Void Linux is an independent Linux distribution featuring a rolling release model, the runit init system, and the XBPS package manager. Built from scratch rather than derived from another distribution, it emphasizes simplicity, speed, and stability.

## Why Choose Void Linux?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>Key Benefits</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Independent distribution (not derivative)</li>
          <li>Fast and simple runit init system</li>
          <li>Choice between musl and glibc</li>
          <li>Rolling release with stability</li>
          <li>Minimal base installation</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>Use Cases</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Minimalist desktop systems</li>
          <li>Servers without systemd</li>
          <li>Resource-constrained hardware</li>
          <li>Learning system administration</li>
          <li>Alternative to systemd distributions</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## Void Linux Variants

| Variant | C Library | Init System | Target Architecture |
|---------|-----------|-------------|-------------------|
| **Void (glibc)** | GNU libc | runit | Standard compatibility |
| **Void (musl)** | musl libc | runit | Minimal, security-focused |
| **Void (musl-static)** | musl static | runit | Static linking, embedded |

:::tip Choosing Your Variant
- Choose **glibc** for maximum software compatibility
- Choose **musl** for smaller footprint and better security
- Choose **musl-static** for embedded systems or maximum portability
:::

## Installation Process

### Download and Verification
```bash
# Download Void Linux ISO
# Visit: https://voidlinux.org/download/

# Available images:
# - void-live-x86_64-*.iso (glibc variant)
# - void-live-x86_64-musl-*.iso (musl variant)
# - void-hrprivmini-x86_64-*.iso (minimal installer)

# Verify checksums
sha256sum -c sha256sums.txt

# Create bootable USB
sudo dd if=void-live-*.iso of=/dev/sdX bs=4M status=progress && sync
```

### Installation Methods
```bash
# Method 1: Live installer (recommended for beginners)
# Boot from live ISO and run void-installer

# Method 2: Manual installation (advanced users)
# Partition disks manually and install base system

# Method 3: Network installation
# Minimal image with network-based package installation

# Method 4: Rootfs tarballs
# For containers or custom installations
```

## Quick Start Guides

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Installation</h3>
      </div>
      <div className="card__body">
        <p>Install Void Linux with runit init system</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/void/installation" className="button button--primary">Install Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>XBPS Package Management</h3>
      </div>
      <div className="card__body">
        <p>X Binary Package System administration</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/void/xbps" className="button button--primary">XBPS Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Runit Services</h3>
      </div>
      <div className="card__body">
        <p>Service management with runit init system</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/void/runit" className="button button--primary">Runit Guide</a>
      </div>
    </div>
  </div>
</div>

## Post-Installation Setup

### Initial System Update
```bash
# Update package database
sudo xbps-install -S

# Update all packages
sudo xbps-install -u

# Install essential packages
sudo xbps-install -S base-devel git curl wget vim

# Install documentation
sudo xbps-install -S man-pages man-pages-posix

# Install compression tools
sudo xbps-install -S unzip zip p7zip
```

### Basic System Configuration
```bash
# Set hostname
echo "voidlinux" | sudo tee /etc/hostname

# Configure locale
echo "LANG=en_US.UTF-8" | sudo tee /etc/locale.conf
echo "en_US.UTF-8 UTF-8" | sudo tee -a /etc/default/libc-locales
sudo xbps-reconfigure -f glibc-locales  # glibc variant only

# Set timezone
sudo ln -sf /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime

# Configure keyboard
echo 'KEYMAP="us"' | sudo tee /etc/rc.conf
```

### User Management
```bash
# Add regular user
sudo useradd -m -s /bin/bash -G wheel,audio,video,optical,storage username
sudo passwd username

# Configure sudo
sudo visudo
# Uncomment: %wheel ALL=(ALL) ALL

# Set user shell
sudo chsh -s /bin/bash username
```

## Package Management with XBPS

### Essential XBPS Commands
```bash
# Update repository data
sudo xbps-install -S

# Install packages
sudo xbps-install package-name
sudo xbps-install -S package-name  # Sync repos first

# Remove packages
sudo xbps-remove package-name
sudo xbps-remove -R package-name   # Remove recursively

# System update
sudo xbps-install -Su

# Search packages
xbps-query -Rs keyword
xbps-query -s keyword

# Package information
xbps-query -R package-name   # Remote package info
xbps-query package-name      # Installed package info

# List installed packages
xbps-query -l
```

### Advanced XBPS Usage
```bash
# Force package installation
sudo xbps-install -f package-name

# Install specific package version
sudo xbps-install package-name-version

# Hold package updates
sudo xbps-pkgdb -m hold package-name
sudo xbps-pkgdb -m unhold package-name

# Reconfigure package
sudo xbps-reconfigure package-name
sudo xbps-reconfigure -a  # All packages

# Clean package cache
sudo xbps-remove -O

# Remove orphaned packages
sudo xbps-remove -o
```

### Package Sources and Repositories
```bash
# Default repositories are in /usr/share/xbps.d/
# Custom repositories: /etc/xbps.d/

# Add custom repository
echo "repository=https://custom-repo.example.com/current" | sudo tee /etc/xbps.d/custom.conf

# Multilib repository (32-bit packages on 64-bit)
echo "repository=https://alpha.de.repo.voidlinux.org/current/multilib/nonfree" | sudo tee /etc/xbps.d/multilib-nonfree.conf
echo "repository=https://alpha.de.repo.voidlinux.org/current/multilib" | sudo tee /etc/xbps.d/multilib.conf

# Non-free repository (for binary blobs)
echo "repository=https://alpha.de.repo.voidlinux.org/current/nonfree" | sudo tee /etc/xbps.d/nonfree.conf
```

## Service Management with Runit

### Understanding Runit
```bash
# Runit service hierarchy:
# /etc/sv/         - Service definitions
# /var/service/    - Enabled services (symlinks to /etc/sv/)
# /etc/runit/      - Runit configuration

# Service states:
# run    - Service is running
# down   - Service is stopped
# finish - Service cleanup script

# Check runit status
sudo sv status /var/service/*
```

### Managing Services
```bash
# Enable service (create symlink)
sudo ln -s /etc/sv/sshd /var/service/

# Disable service (remove symlink)
sudo rm /var/service/sshd

# Start service
sudo sv start sshd

# Stop service
sudo sv stop sshd

# Restart service
sudo sv restart sshd

# Check service status
sudo sv status sshd

# Send signals to service
sudo sv hup sshd    # SIGHUP
sudo sv term sshd   # SIGTERM
sudo sv kill sshd   # SIGKILL
```

### Creating Custom Services
```bash
# Create service directory
sudo mkdir -p /etc/sv/myapp

# Create run script
sudo tee /etc/sv/myapp/run << 'EOF'
#!/bin/sh
exec 2>&1
exec chpst -u myapp:myapp /usr/local/bin/myapp
EOF

# Make executable
sudo chmod +x /etc/sv/myapp/run

# Optional: Create log service
sudo mkdir -p /etc/sv/myapp/log
sudo tee /etc/sv/myapp/log/run << 'EOF'
#!/bin/sh
exec svlogd -tt /var/log/myapp
EOF
sudo chmod +x /etc/sv/myapp/log/run

# Enable service
sudo ln -s /etc/sv/myapp /var/service/
```

### Service Dependencies
```bash
# Services can depend on others through the 'check' script
sudo tee /etc/sv/myapp/check << 'EOF'
#!/bin/sh
# Wait for network service
sv check network >/dev/null || exit 1
# Wait for database
sv check postgresql >/dev/null || exit 1
EOF

sudo chmod +x /etc/sv/myapp/check
```

## System Administration

### Network Configuration
```bash
# Static IP configuration
sudo tee /etc/rc.local << 'EOF'
ip link set dev eth0 up
ip addr add 192.168.1.100/24 dev eth0
ip route add default via 192.168.1.1
echo "nameserver 8.8.8.8" > /etc/resolv.conf
EOF

# DHCP configuration
sudo xbps-install -S dhcpcd
sudo ln -s /etc/sv/dhcpcd /var/service/

# NetworkManager (for desktop systems)
sudo xbps-install -S NetworkManager
sudo ln -s /etc/sv/NetworkManager /var/service/

# Wireless configuration with wpa_supplicant
sudo xbps-install -S wpa_supplicant
sudo tee /etc/wpa_supplicant/wpa_supplicant-wlan0.conf << 'EOF'
network={
    ssid="MyNetwork"
    psk="password"
}
EOF
sudo ln -s /etc/sv/wpa_supplicant /var/service/
```

### Firewall Configuration
```bash
# iptables (no systemd integration needed)
sudo xbps-install -S iptables

# Basic firewall rules
sudo tee /etc/iptables.rules << 'EOF'
*filter
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -i lo -j ACCEPT
-A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p tcp --dport 22 -j ACCEPT
-A INPUT -p icmp -j ACCEPT
COMMIT
EOF

# Apply rules on boot
sudo tee -a /etc/rc.local << 'EOF'
iptables-restore < /etc/iptables.rules
EOF

# UFW alternative
sudo xbps-install -S ufw
sudo ufw enable
sudo ufw allow ssh
```

### System Logging
```bash
# Void uses socklog by default
sudo ln -s /etc/sv/socklog-unix /var/service/
sudo ln -s /etc/sv/nanoklogd /var/service/

# View logs
sudo svlogtail

# Configure log rotation
sudo tee /etc/socklog.conf << 'EOF'
# Log to files
*.* /var/log/messages
auth.* /var/log/auth.log
mail.* /var/log/mail.log
EOF
```

## Desktop Environment Setup

### X Server Installation
```bash
# Install X server and drivers
sudo xbps-install -S xorg-minimal
sudo xbps-install -S mesa-dri  # Open source graphics drivers

# NVIDIA drivers (if needed)
sudo xbps-install -S nvidia

# Intel graphics
sudo xbps-install -S mesa-intel-dri

# Display managers
sudo xbps-install -S lightdm lightdm-gtk3-greeter
sudo ln -s /etc/sv/lightdm /var/service/
```

### Window Managers and Desktop Environments
```bash
# Lightweight window managers
sudo xbps-install -S i3
sudo xbps-install -S openbox
sudo xbps-install -S awesome
sudo xbps-install -S dwm

# Desktop environments
sudo xbps-install -S xfce4
sudo xbps-install -S mate mate-extra
sudo xbps-install -S lxde-meta

# GNOME (full desktop)
sudo xbps-install -S gnome
sudo ln -s /etc/sv/gdm /var/service/

# KDE Plasma
sudo xbps-install -S kde5
sudo ln -s /etc/sv/sddm /var/service/
```

### Audio Configuration
```bash
# ALSA (basic audio)
sudo xbps-install -S alsa-utils
sudo xbps-install -S alsa-plugins-pulseaudio

# PulseAudio
sudo xbps-install -S pulseaudio pavucontrol

# PipeWire (modern audio)
sudo xbps-install -S pipewire pipewire-pulse

# Add user to audio group
sudo usermod -a -G audio username
```

## Development Environment

### Programming Languages
```bash
# C/C++ development
sudo xbps-install -S base-devel
sudo xbps-install -S gcc clang
sudo xbps-install -S cmake make autotools

# Python development
sudo xbps-install -S python3 python3-pip
sudo xbps-install -S python3-devel

# Node.js development
sudo xbps-install -S nodejs npm

# Rust development
sudo xbps-install -S rust cargo

# Go development
sudo xbps-install -S go

# Java development
sudo xbps-install -S openjdk11
```

### Development Tools
```bash
# Version control
sudo xbps-install -S git subversion mercurial

# Text editors
sudo xbps-install -S vim neovim emacs
sudo xbps-install -S code  # VS Code (if available)

# Build tools
sudo xbps-install -S meson ninja
sudo xbps-install -S scons
sudo xbps-install -S pkg-config

# Debugging tools
sudo xbps-install -S gdb valgrind strace
```

## Hardware Support

### Graphics Drivers
```bash
# Open source drivers (recommended)
sudo xbps-install -S mesa-dri

# NVIDIA proprietary drivers
sudo xbps-install -S nvidia nvidia-libs-32bit
# Add to /etc/X11/xorg.conf.d/20-nvidia.conf

# AMD drivers
sudo xbps-install -S mesa-ati-dri mesa-vulkan-radeon

# Intel graphics
sudo xbps-install -S mesa-intel-dri mesa-vulkan-intel
```

### Firmware and Microcode
```bash
# Linux firmware
sudo xbps-install -S linux-firmware

# Intel microcode
sudo xbps-install -S intel-ucode

# AMD microcode  
sudo xbps-install -S amd-ucode

# WiFi firmware
sudo xbps-install -S linux-firmware-network
```

### Power Management
```bash
# Laptop power management
sudo xbps-install -S tlp
sudo ln -s /etc/sv/tlp /var/service/

# CPU frequency scaling
echo 'CPUFREQ_GOVERNOR="ondemand"' | sudo tee -a /etc/rc.conf

# Suspend/hibernate support
sudo xbps-install -S ConsoleKit2
sudo ln -s /etc/sv/consolekit /var/service/
```

## Package Building

### XBPS Templates
```bash
# Clone void-packages repository
git clone https://github.com/void-linux/void-packages.git
cd void-packages

# Bootstrap build environment
./xbps-src binary-bootstrap

# Create new package template
mkdir -p srcpkgs/mypackage
cat > srcpkgs/mypackage/template << 'EOF'
# Template file for 'mypackage'
pkgname=mypackage
version=1.0.0
revision=1
build_style=gnu-configure
hostmakedepends="pkg-config"
makedepends="libfoo-devel"
depends="libfoo"
short_desc="My custom package"
maintainer="Your Name <email@example.com>"
license="GPL-3.0-or-later"
homepage="https://example.com/mypackage"
distfiles="https://example.com/releases/mypackage-${version}.tar.gz"
checksum=sha256sum_here
EOF
```

### Building Packages
```bash
# Build package
./xbps-src pkg mypackage

# Install built package
sudo xbps-install --repository=hostdir/binpkgs mypackage

# Create package for different architecture
./xbps-src -a i686 pkg mypackage

# Build with debugging symbols
./xbps-src -o debug pkg mypackage
```

## System Maintenance

### Update Management
```bash
# Regular update routine
sudo xbps-install -Su

# Check for held packages
xbps-query -H

# Update specific package
sudo xbps-install -u package-name

# Downgrade package (if previous version in cache)
sudo xbps-install package-name-old-version
```

### System Cleanup
```bash
# Remove orphaned packages
sudo xbps-remove -o

# Clean package cache
sudo xbps-remove -O

# Remove old kernels (keep current + 1)
sudo vkpurge rm all

# Clean temporary files
sudo rm -rf /tmp/* /var/tmp/*

# Clean user cache
rm -rf ~/.cache/*
```

### Backup and Recovery
```bash
# Backup package list
xbps-query -l > installed-packages.txt

# Backup configuration
sudo tar -czf system-config-backup.tar.gz /etc

# Restore packages
sudo xbps-install $(cat installed-packages.txt | awk '{print $2}' | cut -d- -f1)

# System recovery
# Boot from live USB, mount existing system, chroot, and repair
```

## Troubleshooting

### Common Issues
```bash
# XBPS database corruption
sudo xbps-pkgdb -a

# Fix broken packages
sudo xbps-install -f package-name

# Reconfigure all packages
sudo xbps-reconfigure -a

# Service not starting
sudo sv status service-name
sudo sv check service-name
# Check /var/log/svlogd/service-name/current

# Network connectivity issues
ip addr show
ip route show
cat /etc/resolv.conf
```

### Boot Issues
```bash
# Emergency shell access
# Add 'emergency' to kernel command line

# Repair filesystem
fsck /dev/sda1

# Restore from backup
# Mount system, restore /etc from backup

# Reinstall bootloader
sudo xbps-install -f grub
sudo grub-install /dev/sda
sudo update-grub
```

### Performance Issues
```bash
# Check system resources
top
free -h
df -h

# Check service logs
sudo svlogtail | grep error

# Disable unnecessary services
sudo rm /var/service/unwanted-service

# Monitor I/O
iostat 1
iotop
```

## Security Configuration

### Basic Security Setup
```bash
# Configure sudo timeout
echo "Defaults timestamp_timeout=5" | sudo tee -a /etc/sudoers

# SSH hardening
sudo tee -a /etc/ssh/sshd_config << 'EOF'
PermitRootLogin no
PasswordAuthentication no
Port 2222
MaxAuthTries 3
EOF

# User limits
sudo tee /etc/security/limits.conf << 'EOF'
* soft nproc 4096
* hard nproc 8192
* soft nofile 4096
* hard nofile 8192
EOF
```

### File Permissions
```bash
# Secure important files
sudo chmod 600 /etc/shadow
sudo chmod 644 /etc/passwd
sudo chmod 755 /etc

# Set umask for users
echo "umask 027" | sudo tee -a /etc/profile

# File integrity monitoring
sudo xbps-install -S aide
sudo aide --init
sudo mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
```

## Best Practices

:::tip Void Linux Best Practices
- Keep the system minimal - only install needed packages
- Regularly update the system with xbps-install -Su
- Use runit services instead of running daemons manually
- Learn the Void-specific tools (xbps, sv, void-installer)
- Monitor system logs through svlogtail
- Use the musl variant for better security if compatibility allows
- Participate in the community and contribute to void-packages
:::

:::warning Maintenance Considerations
- Void is a rolling release - updates can occasionally break things
- Smaller community means less documentation than major distributions
- Some proprietary software may not be available
- Understanding runit is essential for service management
- Keep backups of working configurations
- Test major changes in virtual machines first
:::

## Community and Resources

### Getting Help
- **Void Linux Handbook**: https://docs.voidlinux.org/
- **Void Linux Forums**: https://www.reddit.com/r/voidlinux/
- **IRC**: #voidlinux on irc.libera.chat
- **Matrix**: #voidlinux:matrix.org
- **GitHub**: https://github.com/void-linux

### Contributing
```bash
# Contributing packages
git clone https://github.com/void-linux/void-packages
# Create templates and submit pull requests

# Bug reports
# Use GitHub issues for void-packages repository

# Documentation
# Contribute to the handbook and wiki
```

## Additional Resources

- **Void Linux Homepage**: https://voidlinux.org/
- **Package Search**: https://voidlinux.org/packages/
- **Void Packages**: https://github.com/void-linux/void-packages
- **Runit Documentation**: http://smarden.org/runit/
- **XBPS Manual**: https://docs.voidlinux.org/xbps/

## Related Guides

- **Init Systems**: /docs/systems/init - Alternative init systems
- **Package Management**: /docs/packaging/ - Package management concepts
- **Minimalist Computing**: /docs/minimal/ - Minimal system approaches
- **Service Management**: /docs/services/ - Service administration

---

*Void Linux offers a refreshing alternative to systemd-based distributions with its independent development, runit init system, and focus on simplicity. While it requires more manual configuration than mainstream distributions, it provides a stable, fast, and educational Linux experience.*