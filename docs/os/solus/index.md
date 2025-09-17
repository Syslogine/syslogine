---
sidebar_position: 21
title: "Solus Administration Guide 2025 | Independent Desktop Linux"
description: "Complete Solus guide covering Budgie desktop environment, eopkg package management, Software Center, and curated rolling release model."
keywords: 
  - "solus linux"
  - "budgie desktop"
  - "eopkg package manager"
  - "solus software center"
  - "independent linux"
  - "rolling release"
  - "desktop focused"
  - "solus development"
  - "linux for desktop"
slug: solus-guide
---

# Solus Administration

Solus is an independent Linux distribution built from scratch with a focus on desktop computing. It features the Budgie desktop environment, the eopkg package manager, and a curated rolling release model designed to provide a cohesive and user-friendly experience.

## Why Choose Solus?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>Key Benefits</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Built from scratch (not derivative)</li>
          <li>Desktop-focused design philosophy</li>
          <li>Budgie desktop environment</li>
          <li>Curated software selection</li>
          <li>Excellent hardware support</li>
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
          <li>Daily desktop computing</li>
          <li>Development workstations</li>
          <li>Media consumption and creation</li>
          <li>Gaming systems</li>
          <li>Modern laptop computing</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## Solus Editions

| Edition | Desktop Environment | Target Users | Download Size |
|---------|-------------------|--------------|---------------|
| **Budgie** | Budgie | General desktop users | ~1.8GB |
| **GNOME** | GNOME Shell | GNOME enthusiasts | ~1.9GB |
| **KDE Plasma** | KDE Plasma | KDE users | ~2.1GB |
| **MATE** | MATE | Traditional desktop | ~1.7GB |

:::tip Edition Selection
- Choose **Budgie** for the flagship Solus experience
- Choose **GNOME** for modern GNOME workflow
- Choose **KDE Plasma** for extensive customization options
- Choose **MATE** for a traditional desktop experience
:::

## Installation Process

### Download and Verification
```bash
# Download Solus ISO
# Visit: https://getsol.us/download/

# Verify download integrity
sha256sum Solus-*.iso
# Compare with published checksums

# Create bootable USB
sudo dd if=Solus-*.iso of=/dev/sdX bs=4M status=progress && sync

# Alternative: Use image writing tools
# - Rufus (Windows)
# - Etcher (Cross-platform)
# - GNOME Disks (Linux)
```

### Installation Features
```bash
# Solus installer features:
# - Automatic partitioning with encryption option
# - Manual partitioning for advanced users
# - Dual-boot detection and setup
# - User account creation
# - Timezone and locale configuration
# - Automatic driver detection

# Minimum requirements:
# - 64-bit processor
# - 2GB RAM (4GB recommended)
# - 20GB disk space
# - UEFI or BIOS support
```

## Quick Start Guides

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Installation</h3>
      </div>
      <div className="card__body">
        <p>Install Solus with Budgie desktop</p>
      </div>
      <div className="card__footer">
        <a href="/docs/os/solus/installation" className="button button--primary">Install Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Software Management</h3>
      </div>
      <div className="card__body">
        <p>Software Center and eopkg package manager</p>
      </div>
      <div className="card__footer">
        <a href="/docs/os/solus/software" className="button button--primary">Software Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Desktop Customization</h3>
      </div>
      <div className="card__body">
        <p>Budgie desktop configuration and themes</p>
      </div>
      <div className="card__footer">
        <a href="/docs/os/solus/customization" className="button button--primary">Desktop Guide</a>
      </div>
    </div>
  </div>
</div>

## Post-Installation Setup

### Initial System Update
```bash
# Update package database and system
sudo eopkg update-repo
sudo eopkg upgrade

# Install essential development tools
sudo eopkg install system.devel

# Install multimedia codecs
sudo eopkg install -c multimedia

# Install additional fonts
sudo eopkg install font-awesome-ttf
sudo eopkg install liberation-fonts-ttf
```

### Hardware Support Setup
```bash
# Install graphics drivers
sudo eopkg install nvidia-glx-driver-current  # NVIDIA
sudo eopkg install mesalib-dri                # AMD/Intel

# Install additional firmware
sudo eopkg install linux-firmware

# Laptop power management
sudo eopkg install tlp
sudo systemctl enable tlp
sudo systemctl start tlp

# Bluetooth support
sudo eopkg install bluez
sudo systemctl enable bluetooth
sudo systemctl start bluetooth
```

### Third-Party Software Setup
```bash
# Enable third-party repository
sudo eopkg add-repo Solus-3rd-Party https://packages.getsol.us/shannon/3rd-party/eopkg-index.xml.xz

# Install Snap support
sudo eopkg install snapd
sudo systemctl enable snapd
sudo systemctl start snapd

# Install Flatpak support
sudo eopkg install flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

## Package Management with eopkg

### Essential eopkg Commands
```bash
# Update repository information
sudo eopkg update-repo

# Install packages
sudo eopkg install package-name
sudo eopkg it package-name  # Short form

# Remove packages
sudo eopkg remove package-name
sudo eopkg rm package-name  # Short form

# System update
sudo eopkg upgrade
sudo eopkg up  # Short form

# Search packages
eopkg search keyword
eopkg sr keyword  # Short form

# Package information
eopkg info package-name

# List installed packages
eopkg list-installed
eopkg li  # Short form
```

### Advanced eopkg Usage
```bash
# Install from file
sudo eopkg install package.eopkg

# Install component (group of packages)
sudo eopkg install -c multimedia
sudo eopkg install -c system.devel

# List available components
eopkg list-components

# Package dependencies
eopkg info --dependencies package-name

# Reverse dependencies
eopkg info --reverse-dependencies package-name

# Package history
eopkg history

# Rollback system
sudo eopkg history -t operation-number
```

### Repository Management
```bash
# List repositories
eopkg list-repo

# Add repository
sudo eopkg add-repo repo-name URL

# Remove repository
sudo eopkg remove-repo repo-name

# Update specific repository
sudo eopkg update-repo repo-name

# Default Solus repositories:
# - Solus (main repository)
# - Solus-3rd-Party (third-party software)
```

## Budgie Desktop Environment

### Budgie Panel Configuration
```bash
# Budgie panel features:
# - Multiple panels support
# - Applets and widgets
# - Customizable layout
# - Theme integration

# Access panel settings:
# Right-click on panel → Panel settings

# Common applets:
# - Applications Menu
# - Icon Task List
# - System Tray
# - Clock
# - Sound Output
# - Power indicator
# - Workspace Switcher
```

### Budgie Applets
```bash
# Install additional applets
sudo eopkg install budgie-desktop-branding
sudo eopkg install budgie-screenshot-applet
sudo eopkg install budgie-window-shuffler

# Third-party applets
sudo eopkg install budgie-extras

# Configure applets:
# Budgie Desktop Settings → Panel → Add applet
```

### Budgie Customization
```bash
# Install themes
sudo eopkg install arc-gtk-theme
sudo eopkg install adapta-gtk-theme
sudo eopkg install materia-gtk-theme

# Install icon themes
sudo eopkg install arc-icon-theme
sudo eopkg install papirus-icon-theme

# Configure appearance:
# Budgie Desktop Settings → Style
# - Choose window theme
# - Select icon theme
# - Configure fonts
```

## Software Center and Applications

### Using Software Center
```bash
# Software Center features:
# - Graphical package management
# - Category browsing
# - Search functionality
# - Update management
# - Third-party software integration

# Launch Software Center:
# Applications menu → Software Center
# Or: gnome-software
```

### Essential Applications
```bash
# Web browsers
sudo eopkg install firefox
sudo eopkg install google-chrome-stable  # From 3rd-party repo

# Media applications
sudo eopkg install vlc
sudo eopkg install rhythmbox
sudo eopkg install gnome-mpv

# Office suite
sudo eopkg install libreoffice

# Development tools
sudo eopkg install code  # VS Code
sudo eopkg install atom
sudo eopkg install git

# Graphics and design
sudo eopkg install gimp
sudo eopkg install inkscape
sudo eopkg install blender
```

### Gaming Setup
```bash
# Steam installation
sudo eopkg install steam

# Gaming libraries
sudo eopkg install -c games
sudo eopkg install lutris

# Wine for Windows games
sudo eopkg install wine winetricks

# Gaming utilities
sudo eopkg install gamemode
sudo eopkg install mangohud
```

## System Administration

### User Management
```bash
# Add user
sudo useradd -m -s /bin/bash username
sudo passwd username

# Add to groups
sudo usermod -aG wheel,audio,video username

# Configure sudo
sudo visudo
# Uncomment: %wheel ALL=(ALL) ALL

# Graphical user management
# Budgie Desktop Settings → Users
```

### Service Management
```bash
# systemd service management
sudo systemctl start service-name
sudo systemctl stop service-name
sudo systemctl enable service-name
sudo systemctl disable service-name
sudo systemctl status service-name

# Common services
sudo systemctl enable bluetooth
sudo systemctl enable cups  # Printing
sudo systemctl enable sshd  # SSH server

# Service logs
journalctl -u service-name
journalctl -f  # Follow logs
```

### Network Configuration
```bash
# NetworkManager (default)
nmcli device show
nmcli connection show

# GUI network configuration
# Settings → Network

# WiFi configuration
nmcli device wifi list
nmcli device wifi connect SSID password PASSWORD

# VPN setup
sudo eopkg install networkmanager-openvpn
# Configure via Settings → Network → VPN
```

## Development Environment

### Programming Languages
```bash
# System development tools
sudo eopkg install -c system.devel

# Python development
sudo eopkg install python3-devel python3-pip
pip3 install --user virtualenv

# Node.js development
sudo eopkg install nodejs yarn

# Java development
sudo eopkg install openjdk-11

# Rust development
sudo eopkg install rust

# Go development
sudo eopkg install golang

# C/C++ development
sudo eopkg install gcc glibc-devel
```

### Development Tools
```bash
# Code editors
sudo eopkg install code
sudo eopkg install atom
sudo eopkg install vim

# Version control
sudo eopkg install git subversion

# Build tools
sudo eopkg install cmake make
sudo eopkg install meson ninja

# Debugging tools
sudo eopkg install gdb valgrind

# Container tools
sudo eopkg install docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

## Multimedia and Graphics

### Audio Configuration
```bash
# PulseAudio (default)
sudo eopkg install pulseaudio pavucontrol

# Additional audio tools
sudo eopkg install audacity
sudo eopkg install lmms

# Audio codecs
sudo eopkg install -c multimedia

# Professional audio
sudo eopkg install jack-audio-connection-kit
```

### Graphics and Video
```bash
# Graphics applications
sudo eopkg install gimp
sudo eopkg install inkscape
sudo eopkg install krita

# Video editing
sudo eopkg install kdenlive
sudo eopkg install openshot

# 3D graphics
sudo eopkg install blender

# Image viewers
sudo eopkg install eog
sudo eopkg install gwenview
```

## System Maintenance

### Updates and Upgrades
```bash
# Regular update routine
sudo eopkg update-repo
sudo eopkg upgrade

# Check for updates
eopkg list-upgrades

# Update specific package
sudo eopkg upgrade package-name

# System information
eopkg info system-base
uname -a
```

### System Cleanup
```bash
# Clean package cache
sudo eopkg clean

# Remove orphaned packages
sudo eopkg autoremove

# Remove unnecessary dependencies
sudo eopkg remove-orphans

# Clean temporary files
sudo rm -rf /tmp/*
sudo rm -rf /var/tmp/*

# User cache cleanup
rm -rf ~/.cache/*
```

### Backup and Recovery
```bash
# Package list backup
eopkg list-installed > installed-packages.txt

# System configuration backup
sudo tar -czf system-backup.tar.gz /etc /usr/local

# User data backup
tar -czf user-backup.tar.gz /home/username

# Restore packages
while read package; do
    sudo eopkg install "$package"
done < installed-packages.txt
```

## Troubleshooting

### Common Issues
```bash
# Package database corruption
sudo eopkg rebuild-db

# Broken packages
sudo eopkg check

# Update conflicts
sudo eopkg history
sudo eopkg history -t operation-number

# Boot issues
# Use recovery mode from GRUB menu
# Check /var/log/boot.log

# Graphics issues
sudo eopkg install xorg-driver-video-vesa  # Fallback driver
```

### System Recovery
```bash
# Boot to console
# Ctrl+Alt+F2 for console access

# Network recovery
sudo systemctl restart NetworkManager

# Package system recovery
sudo eopkg update-repo
sudo eopkg check
sudo eopkg upgrade

# User profile recovery
mv ~/.config ~/.config.backup
# Logout and login to regenerate defaults
```

### Performance Optimization
```bash
# System performance monitoring
sudo eopkg install htop iotop

# Startup applications
# Budgie Desktop Settings → Autostart

# Service optimization
systemctl list-unit-files --state=enabled
sudo systemctl disable unnecessary-service

# Memory optimization
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

## Security Configuration

### Basic Security Setup
```bash
# Firewall configuration
sudo eopkg install ufw
sudo ufw enable
sudo ufw default deny incoming
sudo ufw allow ssh

# User security
sudo passwd -l root  # Lock root account
sudo chage -M 90 username  # Password expiry

# SSH security
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no
# PasswordAuthentication no
sudo systemctl restart sshd
```

### System Monitoring
```bash
# Install monitoring tools
sudo eopkg install htop iotop nethogs

# Log monitoring
journalctl -f
tail -f /var/log/auth.log

# Security auditing
sudo eopkg install lynis
sudo lynis audit system
```

## Third-Party Software

### Snap Packages
```bash
# Install Snap support
sudo eopkg install snapd
sudo systemctl enable --now snapd

# Install snap packages
sudo snap install discord
sudo snap install spotify
sudo snap install code --classic

# List installed snaps
snap list
```

### Flatpak Applications
```bash
# Install Flatpak applications
flatpak install flathub org.mozilla.firefox
flatpak install flathub com.spotify.Client

# List installed Flatpaks
flatpak list

# Update Flatpak applications
flatpak update
```

### AppImage Support
```bash
# Install AppImage support
sudo eopkg install appimaged

# Run AppImage applications
chmod +x application.AppImage
./application.AppImage

# AppImage management
sudo eopkg install appimagelauncher
```

## Customization and Themes

### Desktop Themes
```bash
# GTK themes
sudo eopkg install arc-gtk-theme
sudo eopkg install adapta-gtk-theme
sudo eopkg install numix-gtk-theme

# Icon themes
sudo eopkg install papirus-icon-theme
sudo eopkg install numix-icon-theme

# Cursor themes
sudo eopkg install capitaine-cursors
```

### Budgie Customization
```bash
# Budgie-specific themes
sudo eopkg install solus-budgie-branding

# Panel transparency
# Budgie Desktop Settings → Panel → Transparency

# Raven sidebar customization
# Budgie Desktop Settings → Raven
```

## Best Practices

:::tip Solus Best Practices
- Use the Software Center for most software installations
- Keep the system updated with regular eopkg upgrade
- Utilize Budgie's built-in customization options
- Take advantage of the curated software selection
- Use components for installing related software groups
- Leverage third-party repositories for additional software
- Participate in the Solus community for support
:::

:::warning System Considerations
- Solus has a smaller package repository than major distributions
- Some specialized software may not be available
- Rolling release means occasional update issues
- Limited enterprise support compared to commercial distributions
- Dependency on volunteer community for development
- May require manual compilation for some software
:::

## Community and Support

### Getting Help
- **Solus Help Center**: https://help.getsol.us/
- **Solus Forums**: https://discuss.getsol.us/
- **Reddit**: r/SolusProject
- **Matrix**: #solus-project:matrix.org
- **IRC**: #solus on irc.libera.chat

### Contributing
```bash
# Package requests
# Submit requests via Solus Developer Portal

# Bug reports
# Use GitHub issues or forums

# Documentation
# Contribute to help center and wiki

# Development
# Join the packaging team
# Contribute to desktop development
```

## Additional Resources

- **Solus Project**: https://getsol.us/
- **Package Database**: https://packages.getsol.us/
- **Development Portal**: https://dev.getsol.us/
- **Budgie Desktop**: https://buddiesofbudgie.org/
- **GitHub**: https://github.com/getsolus

## Related Guides

- **Desktop Environments**: /docs/desktop/ - Desktop environment comparisons
- **Package Management**: /docs/packaging/ - Package management concepts
- **System Customization**: /docs/customization/ - Desktop customization guides
- **Independent Linux**: /docs/distributions/independent - Independent distributions

---

*Solus provides a cohesive desktop Linux experience built from the ground up with modern design principles. Its focus on desktop computing, combined with the elegant Budgie environment and curated software selection, makes it an excellent choice for users seeking a polished and user-friendly Linux distribution.*