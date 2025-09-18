---
sidebar_position: 11
title: "Gentoo Linux Administration Guide 2025 | Source-Based Mastery"
description: "Complete Gentoo guide covering stage3 installation, Portage package management, USE flags, kernel compilation, and performance optimization."
keywords: 
  - "gentoo linux"
  - "gentoo installation"
  - "portage package manager"
  - "use flags gentoo"
  - "emerge gentoo"
  - "gentoo kernel"
  - "source based linux"
  - "gentoo optimization"
  - "gentoo handbook"
slug: gentoo-guide
---

# Gentoo Linux Administration

Gentoo Linux is a source-based Linux distribution that compiles software specifically for your hardware and configuration. This approach provides maximum performance, customization, and control over your system at the cost of longer installation and compilation times.

## Why Choose Gentoo?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>Key Benefits</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Maximum performance optimization</li>
          <li>Complete system customization</li>
          <li>Source-based package management</li>
          <li>Rolling release model</li>
          <li>Learning-oriented approach</li>
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
          <li>High-performance computing</li>
          <li>Custom embedded systems</li>
          <li>Security-focused environments</li>
          <li>Learning system internals</li>
          <li>Specialized server configurations</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## Gentoo Philosophy

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Choice** | Freedom to choose every component | No forced dependencies |
| **Performance** | Optimized for your hardware | Compile with specific CPU flags |
| **Flexibility** | Adapt to any use case | USE flags control features |
| **Source-based** | Compile from source code | Portage builds everything |
| **Minimalism** | Only install what you need | No bloated default install |

:::warning Time Investment Required
Gentoo requires significant time investment for initial installation (8-24 hours) and ongoing maintenance. Consider your time constraints and learning goals before choosing Gentoo.
:::

## Installation Methods

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Stage3 Installation</h3>
      </div>
      <div className="card__body">
        <p>Traditional manual installation from stage3 tarball</p>
        <ul>
          <li>Complete control</li>
          <li>Maximum learning</li>
          <li>Custom optimization</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/gentoo/installation" className="button button--primary">Manual Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Gentoo Binary Host</h3>
      </div>
      <div className="card__body">
        <p>Faster installation using pre-compiled packages</p>
        <ul>
          <li>Faster setup</li>
          <li>Still customizable</li>
          <li>Good for beginners</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/gentoo/binary-host" className="button button--primary">Binary Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>LiveGUI Installation</h3>
      </div>
      <div className="card__body">
        <p>Graphical installer for easier setup</p>
        <ul>
          <li>User-friendly</li>
          <li>Faster installation</li>
          <li>Good starting point</li>
        </ul>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/gentoo/livegui" className="button button--primary">GUI Guide</a>
      </div>
    </div>
  </div>
</div>

## Stage3 Installation Process

### Pre-Installation Setup
```bash
# Boot from Gentoo LiveCD
# Check network connectivity
ping -c 3 gentoo.org

# Setup SSH for remote installation (optional)
passwd
/etc/init.d/sshd start

# Set system clock
chronyd -q

# Partition disk (UEFI example)
parted -a optimal /dev/sda
mklabel gpt
unit mib
mkpart primary 1 3
name 1 grub
set 1 bios_grub on
mkpart primary 3 131
name 2 boot
mkpart primary 131 643
name 3 swap
mkpart primary 643 -1
name 4 rootfs
quit

# Format partitions
mkfs.fat -F 32 /dev/sda2
mkswap /dev/sda3
swapon /dev/sda3
mkfs.ext4 /dev/sda4

# Mount root filesystem
mount /dev/sda4 /mnt/gentoo
cd /mnt/gentoo
```

### Download and Extract Stage3
```bash
# Download stage3 tarball
wget https://bouncer.gentoo.org/fetch/root/all/releases/amd64/autobuilds/current-stage3-amd64-openrc/stage3-amd64-openrc-*.tar.xz

# Verify checksum
wget https://bouncer.gentoo.org/fetch/root/all/releases/amd64/autobuilds/current-stage3-amd64-openrc/stage3-amd64-openrc-*.tar.xz.DIGESTS
sha512sum -c stage3-*.tar.xz.DIGESTS

# Extract stage3
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner

# Configure compile options
nano etc/portage/make.conf
```

### Configure Make.conf
```bash
# /mnt/gentoo/etc/portage/make.conf
# Compiler optimizations (adjust for your CPU)
COMMON_FLAGS="-march=native -O2 -pipe"
CFLAGS="${COMMON_FLAGS}"
CXXFLAGS="${COMMON_FLAGS}"
FCFLAGS="${COMMON_FLAGS}"
FFLAGS="${COMMON_FLAGS}"

# Parallel compilation
MAKEOPTS="-j$(nproc)"
EMERGE_DEFAULT_OPTS="--jobs=$(nproc) --load-average=$(nproc)"

# USE flags (global)
USE="bindist mmx sse sse2 -kde -gnome -systemd elogind"

# Portage features
FEATURES="parallel-fetch parallel-install"

# Language support
L10N="en"

# Video cards (adjust for your hardware)
VIDEO_CARDS="intel"  # or "nvidia" or "amdgpu"

# Input devices
INPUT_DEVICES="libinput"

# Portage directories
PORTDIR="/var/db/replinux/gentoo"
DISTDIR="/var/cache/distfiles"
PKGDIR="/var/cache/binpkgs"

# Mirrors (select closest)
GENTOO_MIRRORS="https://mirror.eu.oneandone.net/linux/distributions/gentoo/ https://ftp.snt.utwente.nl/pub/linux/linux/gentoo"
```

### Chroot and Base System
```bash
# Configure DNS
cp --dereference /etc/resolv.conf etc/

# Mount necessary filesystems
mount --types proc /proc proc
mount --rbind /sys sys
mount --make-rslave sys
mount --rbind /dev dev
mount --make-rslave dev
mount --bind /run run
mount --make-slave run

# Enter chroot
chroot . /bin/bash
source /etc/profile
export PS1="(chroot) ${PS1}"

# Mount boot partition
mount /dev/sda2 /boot

# Update Portage tree
emerge --sync

# Read news items
eselect news list
eselect news read

# Select profile
eselect profile list
eselect profile set X  # Choose appropriate profile

# Update world
emerge --ask --verbose --update --deep --newuse @world
```

## Portage Package Management

### Essential Emerge Commands
```bash
# Install packages
emerge package-name
emerge -av package-name          # Ask and verbose
emerge --oneshot package-name    # Don't add to world file

# System updates
emerge --sync                    # Update Portage tree
emerge -avuDN @world            # Update world with dependencies
emerge --depclean               # Remove orphaned packages

# Search and information
emerge --search keyword
emerge --info package-name
eix package-name                # If eix is installed

# Package sets
emerge @system                  # System packages
emerge @world                   # World packages
emerge @security                # Security updates

# Build options
emerge -av --ask-enter-invalid package-name
emerge --pretend package-name
emerge --fetchonly package-name
```

### USE Flags Management
```bash
# Global USE flags in make.conf
USE="X gtk gtk3 qt5 alsa pulseaudio networkmanager"

# Per-package USE flags
echo "media-video/vlc dvd bluray" >> /etc/portage/package.use/vlc

# Directory-based USE flags
mkdir -p /etc/portage/package.use
echo "dev-lang/python sqlite ssl" >> /etc/portage/package.use/python

# Query USE flags
emerge --info | grep ^USE
equery uses package-name
euse -i use-flag                # If euse is installed

# USE flag descriptions
euse -D use-flag
```

### Package Masking and Keywords
```bash
# Unmask packages
echo "=category/package-version" >> /etc/portage/package.unmask

# Accept keywords (testing packages)
echo "category/package ~amd64" >> /etc/portage/package.accept_keywords

# Package licenses
echo "category/package license-name" >> /etc/portage/package.license

# Example: Accept testing version of a package
echo "app-editors/vim ~amd64" >> /etc/portage/package.accept_keywords
```

### Portage Configuration Files
```bash
# Package-specific configuration structure
/etc/portage/
├── make.conf                    # Global configuration
├── package.use/                 # USE flags per package
├── package.accept_keywords/     # Testing packages
├── package.mask/                # Masked packages
├── package.unmask/              # Unmasked packages
├── package.license/             # License acceptance
└── repos.conf/                  # Repository configuration

# Repository configuration
mkdir -p /etc/portage/repos.conf
cp /usr/share/portage/config/repos.conf /etc/portage/repos.conf/gentoo.conf
```

## Kernel Configuration

### Manual Kernel Compilation
```bash
# Install kernel sources
emerge sys-kernel/gentoo-sources

# Symlink to /usr/src/linux
eselect kernel list
eselect kernel set 1

# Configure kernel
cd /usr/src/linux
make menuconfig

# Compile kernel
make -j$(nproc)
make modules_install
make install

# Generate initramfs (if needed)
emerge sys-kernel/dracut
dracut --kver=$(make kernelrelease)
```

### Distribution Kernels (Easier)
```bash
# Install distribution kernel
emerge sys-kernel/gentoo-kernel

# Or binary kernel
emerge sys-kernel/gentoo-kernel-bin

# Install firmware
emerge sys-kernel/linux-firmware

# Update kernel configuration
echo "sys-kernel/gentoo-kernel savedconfig" >> /etc/portage/package.use/kernel
```

### Kernel Maintenance
```bash
# List available kernels
eselect kernel list

# Switch kernel version
eselect kernel set 2

# Clean old kernels
emerge --depclean
eclean-kernel -n 2             # Keep 2 latest kernels

# Rebuild modules for new kernel
emerge @module-rebuild
```

## System Configuration

### Init System Selection
```bash
# OpenRC (default)
echo 'INIT_SYSTEM="openrc"' >> /etc/portage/make.conf

# systemd (alternative)
eselect profile set default/linux/amd64/17.1/systemd

# Services with OpenRC
rc-update add sshd default
rc-update add NetworkManager default
rc-service sshd start

# Services with systemd
systemctl enable sshd
systemctl enable NetworkManager
```

### Network Configuration
```bash
# NetworkManager (recommended for desktop)
emerge net-misc/networkmanager
rc-update add NetworkManager default

# Manual network configuration
nano /etc/conf.d/net
config_eth0="192.168.1.100/24"
routes_eth0="default via 192.168.1.1"
dns_servers_eth0="8.8.8.8 8.8.4.4"

# Create network service
cd /etc/init.d
ln -s net.lo net.eth0
rc-update add net.eth0 default
```

### User Management
```bash
# Set root password
passwd

# Add regular user
useradd -m -G users,wheel,audio,video,portage username
passwd username

# Configure sudo
emerge app-admin/sudo
visudo
# Uncomment: %wheel ALL=(ALL) ALL
```

## Desktop Environment Setup

### X Server Installation
```bash
# Install X.org
emerge xorg-server

# Configure X11
Xorg -configure
mv /root/xorg.conf.new /etc/X11/xorg.conf

# Graphics drivers
emerge x11-drivers/xf86-video-intel    # Intel
emerge x11-drivers/nvidia-drivers      # NVIDIA
emerge x11-drivers/xf86-video-amdgpu   # AMD
```

### Desktop Environments
```bash
# GNOME
emerge gnome-base/gnome
echo "exec gnome-session" > ~/.xinitrc

# KDE Plasma
emerge kde-plasma/plasma-meta
echo "exec startplasma-x11" > ~/.xinitrc

# XFCE
emerge xfce-base/xfce4-meta
echo "exec startxfce4" > ~/.xinitrc

# Window Managers
emerge x11-wm/i3
echo "exec i3" > ~/.xinitrc

# Start X
startx
```

### Audio Configuration
```bash
# ALSA
emerge media-libs/alsa-lib
emerge media-sound/alsa-utils

# PulseAudio
emerge media-sound/pulseaudio
emerge media-sound/pavucontrol

# Add user to audio group
gpasswd -a username audio
```

## Advanced Package Management

### Overlays (Third-party repositories)
```bash
# Install layman
emerge app-portage/layman
layman -S

# Add overlay
layman -a overlay-name

# List available overlays
layman -L

# Sync overlays
layman -S
```

### Binary Packages
```bash
# Enable binary packages
echo 'FEATURES="buildpkg"' >> /etc/portage/make.conf

# Use binary packages when available
echo 'FEATURES="getbinpkg"' >> /etc/portage/make.conf

# Binary package server
PORTAGE_BINHOST="https://packages.gentoo.org/"

# Emerge with binary preference
emerge --getbinpkg package-name
```

### Package Development
```bash
# Create ebuild
mkdir -p /usr/local/portage/category/package
cd /usr/local/portage/category/package

# Example ebuild
cat > package-1.0.ebuild << 'EOF'
EAPI=8

DESCRIPTION="Example package"
HOMEPAGE="https://example.com"
SRC_URI="https://example.com/package-${PV}.tar.gz"

LICENSE="GPL-2"
SLOT="0"
KEYWORDS="~amd64"

DEPEND="dev-libs/libexample"
RDEPEND="${DEPEND}"

src_compile() {
    emake
}

src_install() {
    emake DESTDIR="${D}" install
}
EOF

# Generate manifest
ebuild package-1.0.ebuild manifest

# Test ebuild
ebuild package-1.0.ebuild compile
```

## Performance Optimization

### Compilation Optimization
```bash
# CPU-specific optimizations in make.conf
COMMON_FLAGS="-march=native -O2 -pipe"

# Link-time optimization
COMMON_FLAGS="-march=native -O2 -pipe -flto"

# Memory usage during compilation
MAKEOPTS="-j4"  # For systems with limited RAM

# ccache for faster recompilation
emerge dev-util/ccache
echo 'FEATURES="ccache"' >> /etc/portage/make.conf
echo 'CCACHE_SIZE="4G"' >> /etc/portage/make.conf
```

### Profile Optimization
```bash
# List profiles
eselect profile list

# Choose hardened profile for security
eselect profile set default/linux/amd64/17.1/hardened

# Desktop profile for desktop systems
eselect profile set default/linux/amd64/17.1/desktop

# Developer profile
eselect profile set default/linux/amd64/17.1/developer
```

### System Monitoring
```bash
# Install monitoring tools
emerge sys-process/htop
emerge sys-process/iotop
emerge app-admin/glances

# Portage log analysis
emerge app-portage/genlop
genlop -t package-name
genlop -c  # Current emerges
```

## Security Configuration

### Hardened Gentoo
```bash
# Use hardened profile
eselect profile set default/linux/amd64/17.1/hardened

# PaX utilities
emerge sys-apps/paxctl
emerge sys-apps/elfix

# GRSecurity (if available)
emerge sys-kernel/hardened-sources

# SELinux support
emerge sec-policy/selinux-base-policy
emerge sys-apps/policycoreutils
```

### Firewall Setup
```bash
# iptables
emerge net-firewall/iptables
rc-update add iptables default

# UFW (simpler)
emerge net-firewall/ufw
ufw enable
ufw default deny incoming
ufw allow ssh

# Firewalld
emerge net-firewall/firewalld
rc-update add firewalld default
```

## System Maintenance

### Regular Maintenance Tasks
```bash
# Daily/weekly tasks script
#!/bin/bash
# gentoo-maintenance.sh

# Sync Portage tree
emerge --sync

# Update world
emerge -avuDN @world

# Security updates
glsa-check -t all
glsa-check -f all

# Clean distfiles
eclean distfiles

# Clean packages
eclean packages

# Remove orphaned packages
emerge --depclean

# Check for broken linkage
revdep-rebuild

# Update configuration files
dispatch-conf

echo "Maintenance complete!"
```

### Configuration File Management
```bash
# Handle configuration updates
dispatch-conf
etc-update
cfg-update

# Find files that need updating
find /etc -name '._cfg*'

# Backup important configurations
tar -czf /backup/etc-$(date +%Y%m%d).tar.gz /etc
```

### Log Management
```bash
# Install system logger
emerge app-admin/rsyslog
rc-update add rsyslog default

# Log rotation
emerge app-admin/logrotate

# Clean old logs
find /var/log -name "*.log" -mtime +30 -delete
```

## Troubleshooting

### Compilation Issues
```bash
# Check build logs
less /var/tmp/portage/category/package-version/temp/build.log

# Emerge with verbose output
emerge -v package-name

# Resume failed build
emerge --resume

# Skip problematic package temporarily
echo "=category/package-version" >> /etc/portage/package.mask
```

### Dependency Issues
```bash
# Check dependencies
emerge --pretend --tree package-name

# Force dependency resolution
emerge --newuse --deep @world

# Rebuild dependencies
emerge @preserved-rebuild

# Check for broken linkage
revdep-rebuild

# Resolve USE flag conflicts
emerge --autounmask package-name
```

### System Recovery
```bash
# Boot from LiveCD and chroot
mount /dev/sda4 /mnt/gentoo
mount /dev/sda2 /mnt/gentoo/boot
mount --rbind /dev /mnt/gentoo/dev
mount --rbind /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
chroot /mnt/gentoo /bin/bash
source /etc/profile

# Fix broken system
emerge --ask --oneshot sys-apps/portage
emerge @system
```

## Best Practices

:::tip Gentoo Best Practices
- Always backup important data before major updates
- Read Gentoo Weekly Newsletter for important updates
- Use stable keywords unless testing is specifically needed
- Keep make.conf optimizations reasonable - aggressive flags can cause issues
- Regular system maintenance prevents most problems
- Test configuration changes in virtual machines first
:::

:::warning Time Management
- Initial installation takes 8-24 hours depending on hardware
- System updates can take several hours for large packages
- Plan compilation time when scheduling maintenance windows
- Consider binary packages for frequently updated systems
- Use distcc for distributed compilation in multi-machine environments
:::

## Development Environment

### Programming Languages
```bash
# Multiple Python versions
emerge dev-lang/python:3.11
emerge dev-lang/python:3.12
eselect python list
eselect python set python3.12

# Rust development
emerge dev-lang/rust
emerge dev-util/cargo

# Go development
emerge dev-lang/go

# Java development
emerge virtual/jdk
eselect java-vm list
```

## Additional Resources

- **[Gentoo Handbook](https://wiki.gentoo.org/wiki/Handbook:Main_Page)** - Official installation guide
- **[Gentoo Wiki](https://wiki.gentoo.org/)** - Comprehensive documentation
- **[Gentoo Forums](https://forums.gentoo.org/)** - Community support
- **[Gentoo Packages](https://packages.gentoo.org/)** - Package database
- **[Gentoo Developer Manual](https://devmanual.gentoo.org/)** - Development guide

## Related Guides

- **[Arch Linux Administration](/docs/linux/arch)** - Another advanced distribution
- **[LFS (Linux From Scratch)](/docs/linux/lfs)** - Build Linux from source
- **[Performance Tuning](/docs/performance/)** - System optimization
- **[Kernel Compilation](/docs/kernel/)** - Custom kernel building

---

*Gentoo Linux represents the pinnacle of Linux customization and control. While demanding significant time and expertise, it rewards users with a perfectly optimized system tailored to their exact needs and hardware specifications.*