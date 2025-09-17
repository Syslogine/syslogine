---
sidebar_position: 19
title: "NixOS Administration Guide 2025 | Functional System Configuration"
description: "Complete NixOS guide covering Nix package manager, declarative configuration, functional programming concepts, and reproducible system management."
keywords: 
  - "nixos"
  - "nix package manager"
  - "declarative configuration"
  - "functional package management"
  - "nixos configuration"
  - "nix language"
  - "reproducible builds"
  - "nixos modules"
  - "nix flakes"
slug: nixos-guide
---

# NixOS Administration

NixOS is a Linux distribution built on the Nix package manager, featuring a unique approach to system configuration through functional programming principles. It provides declarative configuration, atomic upgrades, rollbacks, and reproducible system builds.

## Why Choose NixOS?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>Key Benefits</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Declarative system configuration</li>
          <li>Atomic upgrades and rollbacks</li>
          <li>Reproducible system builds</li>
          <li>Multiple package versions</li>
          <li>Functional package management</li>
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
          <li>Development environments</li>
          <li>Infrastructure as code</li>
          <li>Research and experimentation</li>
          <li>Immutable server deployments</li>
          <li>Complex software environments</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## NixOS Philosophy

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Functional** | No side effects, pure functions | Immutable package store |
| **Declarative** | Describe desired state | configuration.nix file |
| **Reproducible** | Same input = same output | Hash-based derivations |
| **Atomic** | All-or-nothing operations | Generation-based updates |
| **Rollback** | Easy system recovery | Bootloader integration |

:::warning Learning Curve
NixOS has a steep learning curve due to its unique concepts and the Nix language. Plan significant time for learning functional programming concepts and the Nix ecosystem.
:::

## Installation Process

### Download and Preparation
```bash
# Download NixOS ISO
# Visit: https://nixos.org/download.html

# Verify download
gpg --verify nixos-*.iso.sig nixos-*.iso

# Create bootable USB
sudo dd if=nixos-*.iso of=/dev/sdX bs=4M status=progress && sync

# Boot options:
# - Graphical installation (recommended for beginners)
# - Console installation (minimal)
# - Live environment for testing
```

### Installation Configuration
```bash
# Partition disk (example UEFI)
parted /dev/sda -- mklabel gpt
parted /dev/sda -- mkpart root ext4 512MiB 100%
parted /dev/sda -- mkpart ESP fat32 1MiB 512MiB
parted /dev/sda -- set 2 esp on

# Format partitions
mkfs.ext4 -L nixos /dev/sda1
mkfs.fat -F 32 -n boot /dev/sda2

# Mount filesystems
mount /dev/disk/by-label/nixos /mnt
mkdir -p /mnt/boot
mount /dev/disk/by-label/boot /mnt/boot

# Generate initial configuration
nixos-generate-config --root /mnt
```

## Quick Start Guides

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Installation</h3>
      </div>
      <div className="card__body">
        <p>Install NixOS with declarative configuration</p>
      </div>
      <div className="card__footer">
        <a href="/docs/os/nixos/installation" className="button button--primary">Install Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Configuration</h3>
      </div>
      <div className="card__body">
        <p>Declarative system configuration management</p>
      </div>
      <div className="card__footer">
        <a href="/docs/os/nixos/configuration" className="button button--primary">Config Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>Package Management</h3>
      </div>
      <div className="card__body">
        <p>Nix package manager and expressions</p>
      </div>
      <div className="card__footer">
        <a href="/docs/os/nixos/packages" className="button button--primary">Package Guide</a>
      </div>
    </div>
  </div>
</div>

## System Configuration

### Basic Configuration Structure
```nix
# /etc/nixos/configuration.nix
{ config, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix
  ];

  # Boot loader configuration
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  # Networking
  networking.hostName = "nixos-machine";
  networking.networkmanager.enable = true;

  # System packages
  environment.systemPackages = with pkgs; [
    vim
    git
    firefox
    htop
  ];

  # User configuration
  users.users.alice = {
    isNormalUser = true;
    extraGroups = [ "wheel" "networkmanager" ];
    packages = with pkgs; [
      thunderbird
      vscode
    ];
  };

  # Enable services
  services.openssh.enable = true;
  services.xserver.enable = true;
  services.xserver.displayManager.gdm.enable = true;
  services.xserver.desktopManager.gnome.enable = true;

  system.stateVersion = "23.11";
}
```

### Applying Configuration Changes
```bash
# Edit configuration
sudo nano /etc/nixos/configuration.nix

# Test configuration (dry-run)
sudo nixos-rebuild dry-run

# Build and activate new configuration
sudo nixos-rebuild switch

# Build for next boot
sudo nixos-rebuild boot

# Rollback to previous generation
sudo nixos-rebuild switch --rollback
```

### System Generations
```bash
# List system generations
sudo nix-env --list-generations --profile /nix/var/nix/profiles/system

# Boot specific generation
sudo /nix/var/nix/profiles/system-42-link/bin/switch-to-configuration boot

# Delete old generations
sudo nix-collect-garbage --delete-older-than 7d
```

## Package Management

### Declarative Package Installation
```nix
# System-wide packages in configuration.nix
environment.systemPackages = with pkgs; [
  # Development tools
  git
  vim
  vscode
  
  # System utilities
  htop
  tree
  curl
  wget
  
  # Desktop applications
  firefox
  libreoffice
  thunderbird
];

# User-specific packages
users.users.alice.packages = with pkgs; [
  # Media tools
  vlc
  gimp
  inkscape
  
  # Communication
  signal-desktop
  telegram-desktop
];
```

### Imperative Package Management
```bash
# Install packages imperatively (temporary)
nix-env -iA nixos.firefox
nix-env -iA nixos.git

# List installed packages
nix-env -q

# Upgrade packages
nix-env -u

# Remove packages
nix-env -e firefox

# Search packages
nix-env -qaP firefox
nix search nixpkgs firefox
```

### Nix Package Expressions
```nix
# Custom package derivation
{ pkgs ? import <nixpkgs> {} }:

pkgs.stdenv.mkDerivation rec {
  pname = "myapp";
  version = "1.0.0";
  
  src = pkgs.fetchFromGitHub {
    owner = "user";
    repo = "myapp";
    rev = "v${version}";
    sha256 = "sha256-...";
  };
  
  buildInputs = with pkgs; [ cmake gcc ];
  
  buildPhase = ''
    cmake .
    make
  '';
  
  installPhase = ''
    mkdir -p $out/bin
    cp myapp $out/bin/
  '';
}
```

## Advanced Configuration

### Module System
```nix
# Custom module: /etc/nixos/modules/development.nix
{ config, lib, pkgs, ... }:

with lib;

{
  options.services.development = {
    enable = mkEnableOption "development environment";
    
    languages = mkOption {
      type = types.listOf types.str;
      default = [];
      description = "Programming languages to support";
    };
  };

  config = mkIf config.services.development.enable {
    environment.systemPackages = with pkgs; [
      git
      vim
    ] ++ optionals (elem "python" config.services.development.languages) [
      python3
      python3Packages.pip
    ] ++ optionals (elem "nodejs" config.services.development.languages) [
      nodejs
      yarn
    ];
  };
}
```

### Using Custom Modules
```nix
# In configuration.nix
{ config, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix
    ./modules/development.nix
  ];

  services.development = {
    enable = true;
    languages = [ "python" "nodejs" "rust" ];
  };
}
```

### Overlays for Package Customization
```nix
# /etc/nixos/overlays/custom.nix
self: super: {
  # Override existing package
  vim = super.vim.override {
    python = super.python3;
  };
  
  # Custom package
  myapp = super.callPackage ./packages/myapp.nix {};
  
  # Version override
  firefox = super.firefox.overrideAttrs (old: rec {
    version = "120.0";
  });
}
```

## Development Environments

### Nix Shell for Development
```nix
# shell.nix - Development environment
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # Languages
    python3
    nodejs
    rustc
    cargo
    
    # Tools
    git
    docker
    kubectl
    
    # Libraries
    openssl
    pkg-config
  ];
  
  shellHook = ''
    echo "Development environment loaded"
    export PROJECT_ROOT=$(pwd)
    export PATH=$PROJECT_ROOT/bin:$PATH
  '';
}
```

### Nix Flakes (Modern Approach)
```nix
# flake.nix
{
  description = "Development environment";
  
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            python3
            python3Packages.pip
            python3Packages.virtualenv
          ];
        };
      });
}
```

### Using Development Environments
```bash
# Enter nix shell
nix-shell

# With flakes
nix develop

# One-time command
nix-shell --run "python setup.py build"

# Pure environment (no system packages)
nix-shell --pure
```

## Service Configuration

### System Services
```nix
# Web server configuration
services.nginx = {
  enable = true;
  virtualHosts."example.com" = {
    root = "/var/www/example.com";
    locations."/" = {
      tryFiles = "$uri $uri/ =404";
    };
  };
};

# Database services
services.postgresql = {
  enable = true;
  package = pkgs.postgresql_15;
  dataDir = "/var/lib/postgresql/15";
  authentication = ''
    local all all trust
    host all all 127.0.0.1/32 trust
  '';
};

# Container services
virtualisation.docker.enable = true;
users.users.alice.extraGroups = [ "docker" ];
```

### Custom Services
```nix
# Custom systemd service
systemd.services.myapp = {
  description = "My Application";
  after = [ "network.target" ];
  wantedBy = [ "multi-user.target" ];
  
  serviceConfig = {
    Type = "simple";
    User = "myapp";
    ExecStart = "${pkgs.myapp}/bin/myapp";
    Restart = "always";
    RestartSec = 5;
  };
};

# Create service user
users.users.myapp = {
  isSystemUser = true;
  group = "myapp";
  home = "/var/lib/myapp";
  createHome = true;
};

users.groups.myapp = {};
```

## Desktop Environment Setup

### GNOME Desktop
```nix
# Enable X11 and GNOME
services.xserver = {
  enable = true;
  displayManager.gdm.enable = true;
  desktopManager.gnome.enable = true;
};

# GNOME applications
environment.systemPackages = with pkgs; [
  gnome.gnome-tweaks
  gnome.dconf-editor
  gnomeExtensions.dash-to-dock
  gnomeExtensions.appindicator
];

# Exclude unwanted GNOME apps
environment.gnome.excludePackages = with pkgs; [
  gnome-tour
  cheese
  epiphany
];
```

### KDE Plasma
```nix
# KDE Plasma 5
services.xserver = {
  enable = true;
  displayManager.sddm.enable = true;
  desktopManager.plasma5.enable = true;
};

# KDE applications
environment.systemPackages = with pkgs; [
  kate
  konsole
  dolphin
  okular
];
```

### i3 Window Manager
```nix
# i3 configuration
services.xserver = {
  enable = true;
  windowManager.i3.enable = true;
  displayManager.defaultSession = "none+i3";
};

# i3 packages
environment.systemPackages = with pkgs; [
  i3status
  i3lock
  dmenu
  rofi
];

# User i3 config
environment.etc."i3/config".source = ./i3-config;
```

## Security Configuration

### Firewall Setup
```nix
# Enable firewall
networking.firewall = {
  enable = true;
  allowedTCPPorts = [ 22 80 443 ];
  allowedUDPPorts = [ 53 ];
  allowPing = false;
  
  # Port ranges
  allowedTCPPortRanges = [
    { from = 4000; to = 4007; }
  ];
  
  # Interface-specific rules
  interfaces."wlan0".allowedTCPPorts = [ 22 ];
};
```

### User Security
```nix
# User configuration with security
users.users.alice = {
  isNormalUser = true;
  extraGroups = [ "wheel" ];
  hashedPassword = "$6$..."; # Use mkpasswd
  openssh.authorizedKeys.keys = [
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5... alice@laptop"
  ];
};

# Sudo configuration
security.sudo = {
  enable = true;
  wheelNeedsPassword = true;
  configFile = ''
    %wheel ALL=(ALL:ALL) ALL
    alice ALL=(ALL) NOPASSWD: /run/current-system/sw/bin/nixos-rebuild
  '';
};
```

### SSH Configuration
```nix
# SSH service
services.openssh = {
  enable = true;
  ports = [ 22 ];
  permitRootLogin = "no";
  passwordAuthentication = false;
  challengeResponseAuthentication = false;
  forwardX11 = false;
  
  extraConfig = ''
    MaxAuthTries 3
    ClientAliveInterval 300
    ClientAliveCountMax 2
  '';
};
```

## System Maintenance

### Garbage Collection
```bash
# Manual garbage collection
sudo nix-collect-garbage

# Delete generations older than 7 days
sudo nix-collect-garbage --delete-older-than 7d

# Delete specific generations
sudo nix-env --delete-generations 10 11 12 --profile /nix/var/nix/profiles/system

# Automatic garbage collection
nix.gc = {
  automatic = true;
  dates = "weekly";
  options = "--delete-older-than 7d";
};
```

### System Updates
```bash
# Update channel
sudo nix-channel --update

# Rebuild with updates
sudo nixos-rebuild switch --upgrade

# Check for updates
nix-channel --update
nix-env -u
```

### Optimization
```nix
# Automatic store optimization
nix.autoOptimiseStore = true;

# Manual optimization
nix.optimise = {
  automatic = true;
  dates = [ "03:45" ];
};
```

## Troubleshooting

### Common Issues
```bash
# Configuration syntax errors
sudo nixos-rebuild dry-run

# Check Nix expression syntax
nix-instantiate --parse configuration.nix

# Rollback broken system
sudo nixos-rebuild switch --rollback

# Boot previous generation
# Select in GRUB menu: "NixOS - Configuration X"

# Repair Nix store
nix-store --verify --check-contents --repair
```

### Debug Mode
```bash
# Verbose rebuild
sudo nixos-rebuild switch -v

# Show build logs
sudo nixos-rebuild switch --show-trace

# Build specific derivation
nix-build '<nixpkgs>' -A firefox
```

### Recovery
```bash
# Boot from NixOS installer
# Mount existing system
mount /dev/sda1 /mnt
mount /dev/sda2 /mnt/boot

# Chroot into system
nixos-enter --root /mnt

# Fix configuration and rebuild
nixos-rebuild switch
```

## Best Practices

:::tip NixOS Best Practices
- Start with simple configurations and gradually add complexity
- Use version control for your configuration files
- Test changes with `nixos-rebuild test` before committing
- Leverage the module system for organizing configuration
- Use overlays for package customizations
- Regular garbage collection to manage disk space
- Document your configuration choices for future reference
:::

:::warning Configuration Management
- Always backup your configuration before major changes
- Understand that some changes require reboots
- Be cautious with imperative package management
- Test configurations in virtual machines first
- Keep configuration.nix readable and well-organized
- Use appropriate abstractions - don't over-engineer simple setups
:::

## Performance Considerations

### Build Performance
```nix
# Parallel builds
nix.buildCores = 0; # Use all available cores
nix.maxJobs = "auto";

# Build cache
nix.binaryCaches = [
  "https://cache.nixos.org/"
  "https://nix-community.cachix.org"
];

nix.binaryCachePublicKeys = [
  "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
  "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
];
```

### Memory Management
```nix
# Limit memory usage during builds
nix.daemonNiceLevel = 19;
nix.daemonIONiceLevel = 7;

# Zram for additional swap
zramSwap = {
  enable = true;
  memoryPercent = 50;
};
```

## Learning Resources

### Essential Concepts
```nix
# Understanding Nix language basics
let
  name = "Alice";
  age = 30;
  greeting = "Hello, ${name}!";
in {
  inherit name age;
  message = greeting;
  isAdult = age >= 18;
}

# Function definitions
multiply = x: y: x * y;
greet = name: "Hello, ${name}!";

# Attribute sets
person = {
  name = "Alice";
  age = 30;
  email = "alice@example.com";
};

# Lists
languages = [ "nix" "python" "rust" "haskell" ];
```

## Additional Resources

- **NixOS Manual**: https://nixos.org/manual/nixos/stable/
- **Nix Package Search**: https://search.nixos.org/packages
- **NixOS Wiki**: https://nixos.wiki/
- **Nix Pills**: https://nixos.org/guides/nix-pills/
- **NixOS Discourse**: https://discourse.nixos.org/

## Related Guides

- **Functional Programming**: /docs/programming/functional - FP concepts
- **Infrastructure as Code**: /docs/infrastructure/iac - Declarative infrastructure
- **Package Management**: /docs/packaging/ - Package management concepts
- **System Administration**: /docs/administration/ - General admin practices

---

*NixOS represents a paradigm shift in system administration through functional programming principles. While the learning curve is steep, it provides unmatched reproducibility, reliability, and flexibility for those willing to invest in understanding its unique approach.*