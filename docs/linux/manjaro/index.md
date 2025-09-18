---
sidebar_position: 12
title: "Manjaro Linux Administration Guide 2025 | User-Friendly Arch"
description: "Complete Manjaro guide covering installation, pamac package management, AUR access, kernel management, and desktop environment customization."
keywords: 
  - "manjaro linux"
  - "manjaro installation"
  - "pamac package manager"
  - "manjaro aur"
  - "manjaro kernels"
  - "arch based linux"
  - "manjaro settings manager"
  - "rolling release"
  - "user friendly arch"
slug: manjaro-guide
---

# Manjaro Linux Administration

Manjaro Linux is a user-friendly, Arch-based distribution that provides the power and flexibility of Arch Linux with a more accessible installation process and graphical management tools. It offers a rolling release model with stability improvements through testing repositories.

## Why Choose Manjaro?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>Key Benefits</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Arch benefits with easier setup</li>
          <li>Graphical package management</li>
          <li>Multiple kernel support</li>
          <li>Hardware detection and drivers</li>
          <li>Delayed rolling releases for stability</li>
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
          <li>Desktop workstations</li>
          <li>Development environments</li>
          <li>Gaming systems</li>
          <li>Content creation</li>
          <li>Learning Arch ecosystem</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## Manjaro Editions

| Edition | Desktop Environment | Target Users | RAM Requirements |
|---------|-------------------|--------------|------------------|
| **XFCE** | XFCE 4.18 | Lightweight, traditional | 1GB+ |
| **KDE Plasma** | KDE Plasma 5.27 | Modern, feature-rich | 2GB+ |
| **GNOME** | GNOME 44 | Clean, minimalist | 2GB+ |
| **Architect** | Custom installation | Advanced users | Varies |
| **Community** | Various (i3, Budgie, etc.) | Specialized needs | Varies |

:::tip Edition Selection
- Choose **XFCE** for older hardware or minimalist preferences
- Choose **KDE Plasma** for modern features and customization
- Choose **GNOME** for clean, touch-friendly interface
- Try **Architect** if you want Arch-style manual installation
:::

## Installation Process

### Download and Preparation
```bash
# Download Manjaro ISO
# Visit: https://manjaro.org/download/

# Verify ISO checksum
sha256sum manjaro-xfce-*.iso
# Compare with published checksums

# Create bootable USB (Linux)
sudo dd if=manjaro-xfce-*.iso of=/dev/sdX bs=4M status=progress && sync

# Create bootable USB (Windows)
# Use Rufus or Etcher

# Boot from USB
# Select "Boot with open source drivers" or "Boot with proprietary drivers"
```

### Calamares Installer
```bash
# Manjaro uses Calamares graphical installer

# Installation steps:
1. Select language and region
2. Set keyboard layout
3. Partition disks (automatic or manual)
4. Create user account
5. Configure system settings
6. Install bootloader
7. Complete installation

# Post-installation first boot
# System will automatically configure drivers and update mirrors
```

### Manual Partitioning Example
```bash
# UEFI system partitioning scheme:
/dev/sda1 - 512MB - EFI System Partition (FAT32)
/dev/sda2 - 8GB   - Swap partition
/dev/sda3 - 50GB  - Root partition (ext4)
/dev/sda4 - Rest  - Home partition (ext4)

# File system mounting:
/ (root)     -> /dev/sda3
/boot/efi    -> /dev/sda1
/home        -> /dev/sda4
swap         -> /dev/sda2
```

## Quick Start Guides

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>First Steps</h3>
      </div>
      <div className="card__body">
        <p>Essential post-installation configuration</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/manjaro/first-steps" className="button button--primary">Setup Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Package Management</h3>
      </div>
      <div className="card__body">
        <p>Pamac GUI and pacman command line</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/manjaro/package-management" className="button button--primary">Package Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>System Settings</h3>
      </div>
      <div className="card__body">
        <p>Manjaro Settings Manager and configuration</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/manjaro/system-settings" className="button button--primary">Settings Guide</a>
      </div>
    </div>
  </div>
</div>

## Post-Installation Setup

### First Boot Configuration
```bash
# Update system
sudo pacman -Syu

# Update mirrors for better download speeds
sudo pacman-mirrors --fasttrack

# Enable AUR support in pamac
sudo pacman -S base-devel
# Enable AUR in Pamac preferences

# Install essential software
sudo pacman -S firefox thunderbird libreoffice-fresh

# Configure firewall
sudo ufw enable
sudo systemctl enable ufw

# Install multimedia codecs
sudo pacman -S manjaro-pulse pavucontrol
sudo pacman -S gstreamer gst-plugins-good gst-plugins-bad gst-plugins-ugly
```

### Hardware Configuration
```bash
# Install hardware drivers
sudo mhwd -a pci nonfree 0300  # Graphics drivers

# Check installed drivers
mhwd -li

# Install additional drivers
mhwd -l  # List available drivers
sudo mhwd -i pci video-nvidia  # Install specific driver

# Microcode updates
sudo pacman -S intel-ucode  # Intel processors
sudo pacman -S amd-ucode    # AMD processors
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## Package Management

### Pamac (GUI Package Manager)
```bash
# Install packages through GUI
pamac-manager

# Command line pamac
pamac search package-name
pamac install package-name
pamac remove package-name
pamac update

# Enable AUR support
pamac search --aur package-name
pamac build package-name

# System information
pamac list --installed
pamac list --orphans
```

### Pacman (Command Line)
```bash
# Basic operations
sudo pacman -S package-name      # Install package
sudo pacman -R package-name      # Remove package
sudo pacman -Rs package-name     # Remove with dependencies
sudo pacman -Syu                 # System update

# Search and information
pacman -Ss keyword               # Search packages
pacman -Si package-name          # Package information
pacman -Qi package-name          # Installed package info
pacman -Ql package-name          # List package files

# System maintenance
sudo pacman -Sc                  # Clean package cache
sudo pacman -Rns $(pacman -Qtdq) # Remove orphaned packages
paccache -r                      # Clean old packages (keep 3)
```

### AUR (Arch User Repository)
```bash
# Install AUR helper (if not using pamac)
sudo pacman -S yay

# Using yay
yay package-name                 # Search and install
yay -S package-name              # Install AUR package
yay -Syu                         # Update system including AUR
yay -Yc                          # Clean unneeded dependencies

# Manual AUR installation
git clone https://aur.archlinux.org/package-name.git
cd package-name
makepkg -si
```

## Manjaro Settings Manager

### Hardware Configuration
```bash
# Launch Manjaro Settings Manager
manjaro-settings-manager

# Available modules:
- Kernel management
- Hardware detection
- Language packages
- User accounts
- Notifications
- Boot options
- Time and date
```

### Kernel Management
```bash
# GUI kernel management
# Settings Manager -> Kernel

# Command line kernel management
mhwd-kernel -l                   # List available kernels
sudo mhwd-kernel -i linux61      # Install kernel 6.1 LTS
sudo mhwd-kernel -r linux54      # Remove kernel 5.4

# Check current kernel
uname -r

# GRUB configuration
sudo update-grub
```

## System Administration

### User Management
```bash
# Add user
sudo useradd -m -s /bin/bash username
sudo passwd username

# Add to groups
sudo usermod -aG wheel,audio,video,optical,storage username

# Sudo configuration
sudo visudo
# Uncomment: %wheel ALL=(ALL) ALL

# Delete user
sudo userdel -r username
```

### Service Management
```bash
# Systemd service management
sudo systemctl start service-name
sudo systemctl stop service-name
sudo systemctl enable service-name
sudo systemctl disable service-name
sudo systemctl status service-name

# Common services
sudo systemctl enable bluetooth
sudo systemctl enable cups          # Printing
sudo systemctl enable sshd          # SSH server

# Service logs
journalctl -u service-name
journalctl -f                       # Follow logs
```

### Network Configuration
```bash
# NetworkManager (default)
nmcli device show
nmcli connection show
nmcli device wifi list
nmcli device wifi connect SSID password PASSWORD

# Firewall management
sudo ufw status
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw deny 23                    # Block telnet

# Network troubleshooting
ping google.com
ip addr show
systemctl status NetworkManager
```

## Desktop Environment Customization

### XFCE Customization
```bash
# Install themes and icons
sudo pacman -S arc-gtk-theme papirus-icon-theme

# Panel customization
# Right-click panel -> Panel -> Panel Preferences

# Window manager themes
# Settings -> Window Manager -> Style

# Desktop wallpaper
# Settings -> Desktop -> Background

# Install additional XFCE plugins
sudo pacman -S xfce4-goodies
```

### KDE Plasma Customization
```bash
# System Settings for configuration
systemsettings5

# Install themes
sudo pacman -S breeze-gtk
sudo pacman -S kvantum-qt5

# Plasma widgets
# Right-click desktop -> Add Widgets

# Window decorations
# System Settings -> Appearance -> Window Decorations

# Global themes
# System Settings -> Appearance -> Global Theme
```

### GNOME Customization
```bash
# GNOME Control Center
gnome-control-center

# Install GNOME extensions
sudo pacman -S gnome-shell-extensions
# Or install via https://extensions.gnome.org/

# GNOME Tweaks
sudo pacman -S gnome-tweaks

# Themes and icons
sudo pacman -S arc-gtk-theme
sudo pacman -S papirus-icon-theme
```

## Development Environment

### Programming Languages
```bash
# Python development
sudo pacman -S python python-pip
pip install --user virtualenv

# Node.js development
sudo pacman -S nodejs npm
npm install -g yarn

# Java development
sudo pacman -S jdk-openjdk
archlinux-java status

# Rust development
sudo pacman -S rustup
rustup default stable

# Go development
sudo pacman -S go

# C/C++ development
sudo pacman -S base-devel cmake gdb
```

### Development Tools
```bash
# Text editors and IDEs
sudo pacman -S vim neovim emacs
pamac build visual-studio-code-bin
sudo pacman -S qtcreator

# Version control
sudo pacman -S git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Container tools
sudo pacman -S docker docker-compose
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Virtual machines
sudo pacman -S virtualbox virtualbox-host-modules-arch
sudo pacman -S qemu virt-manager
```

## Gaming Setup

### Steam Installation
```bash
# Enable multilib repository
sudo nano /etc/pacman.conf
# Uncomment:
# [multilib]
# Include = /etc/pacman.d/mirrorlist

sudo pacman -Syu

# Install Steam
sudo pacman -S steam

# Install additional libraries
sudo pacman -S lib32-mesa lib32-vulkan-radeon lib32-vulkan-intel
```

### Lutris and Wine
```bash
# Install Lutris
sudo pacman -S lutris

# Install Wine
sudo pacman -S wine winetricks

# Additional gaming libraries
sudo pacman -S gamemode lib32-gamemode
sudo pacman -S mangohud lib32-mangohud
```

### Graphics Drivers for Gaming
```bash
# NVIDIA
sudo mhwd -a pci nonfree 0300
sudo pacman -S lib32-nvidia-utils

# AMD
sudo pacman -S mesa lib32-mesa vulkan-radeon lib32-vulkan-radeon

# Intel
sudo pacman -S mesa lib32-mesa vulkan-intel lib32-vulkan-intel
```

## System Maintenance

### Regular Maintenance Tasks
```bash
# Update system
sudo pacman -Syu
yay -Syu  # If using yay for AUR

# Clean package cache
sudo pacman -Sc
paccache -r

# Remove orphaned packages
sudo pacman -Rns $(pacman -Qtdq)

# Check for failed systemd services
systemctl --failed

# Update file database
sudo updatedb

# Check disk usage
df -h
du -sh ~/.cache
```

### Automated Maintenance Script
```bash
#!/bin/bash
# manjaro-maintenance.sh

echo "Starting Manjaro maintenance..."

# Update mirrors
sudo pacman-mirrors --fasttrack 5

# Update system
sudo pacman -Syu --noconfirm

# Update AUR packages
yay -Syu --noconfirm

# Clean package cache
sudo paccache -r

# Remove orphaned packages
orphans=$(pacman -Qtdq)
if [[ -n "$orphans" ]]; then
    sudo pacman -Rns $orphans --noconfirm
fi

# Clean user cache
find ~/.cache -type f -atime +7 -delete

# Update file database
sudo updatedb

echo "Maintenance complete!"
```

## Backup and Recovery

### System Backup
```bash
# Install backup tools
sudo pacman -S timeshift rsync

# Timeshift snapshots
sudo timeshift --create --comments "Before system update"
sudo timeshift --list
sudo timeshift --restore

# Manual backup with rsync
sudo rsync -aAXv --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} / /backup/

# Backup package list
pacman -Qqe > pkglist.txt
pacman -Qqm > aurpkglist.txt

# Restore packages
sudo pacman -S --needed - < pkglist.txt
yay -S --needed - < aurpkglist.txt
```

### Configuration Backup
```bash
# Backup user configuration
tar -czf ~/dotfiles-backup.tar.gz ~/.config ~/.local ~/.bashrc ~/.profile

# Backup system configuration
sudo tar -czf /backup/etc-backup.tar.gz /etc

# Version control for dotfiles
cd ~
git init
git add .config .bashrc .profile
git commit -m "Initial dotfiles backup"
```

## Troubleshooting

### Common Issues
```bash
# Update issues
sudo pacman -Sy archlinux-keyring manjaro-keyring
sudo pacman-key --refresh-keys

# Mirror problems
sudo pacman-mirrors --interactive --default

# Broken packages
sudo pacman -S --overwrite glob

# AUR build failures
yay -Sc  # Clean AUR cache
rm -rf ~/.cache/yay

# Driver issues
sudo mhwd -li  # List installed drivers
sudo mhwd -l   # List available drivers
sudo mhwd -r pci video-nvidia  # Remove driver
sudo mhwd -i pci video-linux   # Install driver
```

### System Recovery
```bash
# Boot from Manjaro live USB
# Mount system partitions
sudo mount /dev/sda3 /mnt
sudo mount /dev/sda1 /mnt/boot/efi

# Chroot into system
sudo manjaro-chroot /mnt /bin/bash

# Fix broken system
pacman -Syu
mkinitcpio -P
update-grub

# Exit and reboot
exit
sudo umount -R /mnt
reboot
```

### Performance Issues
```bash
# Check system resources
htop
iotop
free -h

# Disable unnecessary services
systemctl list-unit-files --state=enabled
sudo systemctl disable unwanted-service

# Clean up
sudo journalctl --vacuum-time=7d
bleachbit  # Install and run BleachBit for cleanup
```

## Security Configuration

### Basic Security Setup
```bash
# Enable firewall
sudo ufw enable
sudo ufw default deny incoming
sudo ufw allow ssh

# Install security tools
sudo pacman -S clamav rkhunter

# ClamAV antivirus
sudo freshclam
clamscan -r /home

# Rootkit detection
sudo rkhunter --update
sudo rkhunter --check

# Secure SSH (if using)
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no
# PasswordAuthentication no
```

### AppArmor Configuration
```bash
# Install AppArmor
sudo pacman -S apparmor

# Enable AppArmor
sudo systemctl enable apparmor
sudo systemctl start apparmor

# Check status
sudo aa-status

# Install additional profiles
sudo pacman -S apparmor-profiles
```

## Performance Optimization

### System Tuning
```bash
# Install performance tools
sudo pacman -S htop iotop systemd-analyze

# Boot time analysis
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain

# Optimize boot
sudo systemctl disable unwanted-services

# SSD optimization
sudo systemctl enable fstrim.timer

# Swap optimization
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf
```

### Gaming Performance
```bash
# Install performance tools
sudo pacman -S gamemode mangohud

# Enable performance governor
sudo pacman -S cpupower
sudo cpupower frequency-set -g performance

# GPU performance
sudo pacman -S corectrl  # AMD GPU control
```

## Best Practices

:::tip Manjaro Best Practices
- Wait a few days after major Arch updates before updating Manjaro
- Use timeshift before major system changes
- Keep multiple kernels installed for fallback options
- Regular maintenance prevents most issues
- Use stable repositories unless testing is needed
- Read Manjaro announcements before updates
:::

:::warning Rolling Release Considerations
- Updates can occasionally cause issues - backup first
- AUR packages may break after system updates
- Keep system updated regularly to avoid conflicts
- Monitor Manjaro forums for known issues
- Test critical workflows after major updates
:::

## Community and Support

### Getting Help
- **Manjaro Forum**: https://forum.manjaro.org/
- **Manjaro Wiki**: https://wiki.manjaro.org/
- **Arch Wiki**: https://wiki.archlinux.org/ (mostly applicable)
- **Reddit**: r/ManjaroLinux
- **Matrix/Discord**: Official Manjaro chat rooms

### Contributing
```bash
# Report bugs
# Use Manjaro's GitLab: https://gitlab.manjaro.org/

# Package testing
# Join testing team for early package testing

# Community packages
# Create and maintain AUR packages
```

## Additional Resources

- **Manjaro Official Site**: https://manjaro.org/
- **Manjaro Documentation**: https://wiki.manjaro.org/
- **Arch Linux Wiki**: https://wiki.archlinux.org/
- **Manjaro GitHub**: https://github.com/manjaro
- **Package Search**: https://packages.manjaro.org/

## Related Guides

- **Arch Linux Administration**: /docs/linux/arch - Pure Arch experience
- **Gaming on Linux**: /docs/gaming/ - Gaming-specific guides
- **Development Environment**: /docs/development/ - Programming setup
- **Desktop Customization**: /docs/desktop/ - Desktop environment guides

---

*Manjaro Linux bridges the gap between user-friendliness and the power of Arch Linux, making cutting-edge software accessible to users who want modern features without the complexity of a manual Arch installation.*