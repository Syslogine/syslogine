---
sidebar_position: 9
title: "Software Deployment and Package Management | Debian 13 Server"
sidebar_label: "Software Deployment"
description: "Complete guide to software deployment and package management on Debian 13 Trixie server including APT, snap, flatpak, custom packages, automated deployment, and dependency management."
keywords:
  - "debian 13 package management"
  - "debian server apt"
  - "debian trixie software deployment"
  - "server package administration"
  - "debian enterprise deployment"
tags:
  - debian-13
  - debian-trixie
  - package-management
  - software-deployment
  - server-administration
slug: debian-13-software-deployment-package-management
---

# Software Deployment and Package Management in Debian 13 Server

## Overview
This tutorial covers comprehensive software deployment and package management for Debian 13 servers, including APT package management, alternative package systems, custom package creation, automated deployment strategies, dependency management, and enterprise software distribution. You'll learn to efficiently manage software lifecycle from installation to updates and removal.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 65 minutes  
**Required packages:** apt, dpkg (pre-installed)  
**System requirements:** Root access, internet connectivity for package downloads

## Installation
```bash
# Core package management tools are pre-installed, but install additional tools
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Install alternative package managers
sudo apt install snapd flatpak

# Install package development tools
sudo apt install build-essential devscripts debhelper dh-make

# Install deployment tools
sudo apt install ansible git rsync
```

## Basic Section 🟢

### APT Package Management Basics
```bash
# Update package lists
sudo apt update

# Upgrade installed packages
sudo apt upgrade
sudo apt full-upgrade  # More aggressive upgrade

# Install packages
sudo apt install nginx
sudo apt install nginx mysql-server php-fpm

# Remove packages
sudo apt remove nginx
sudo apt purge nginx  # Remove package and config files
sudo apt autoremove   # Remove unused dependencies

# Search for packages
apt search nginx
apt show nginx        # Show package details
apt list --installed  # List installed packages
apt list --upgradable # List upgradable packages
```

### Managing Package Sources
```bash
# View current sources
cat /etc/apt/sources.list
ls /etc/apt/sources.list.d/

# Add repository (example: Node.js)
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg
echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# Add PPA (Personal Package Archive)
sudo apt install software-properties-common
sudo add-apt-repository ppa:repository/name
sudo apt update
```

### Basic Package Information
```bash
# Package information
dpkg -l                    # List all installed packages
dpkg -l | grep nginx       # Search installed packages
dpkg -s nginx             # Show package status
dpkg -L nginx             # List files installed by package
dpkg -S /usr/sbin/nginx   # Find which package owns a file

# Package dependencies
apt depends nginx         # Show dependencies
apt rdepends nginx        # Show reverse dependencies
```

### Basic Software Installation from Source
```bash
# Download source code
wget https://example.com/software-1.0.tar.gz
tar -xzf software-1.0.tar.gz
cd software-1.0

# Standard build process
./configure --prefix=/usr/local
make
sudo make install

# Alternative: using checkinstall for better management
sudo apt install checkinstall
sudo checkinstall make install  # Creates a .deb package
```

## Advanced Section 🔴

### Advanced APT Configuration
```bash
# APT configuration file
sudo nano /etc/apt/apt.conf.d/99custom
```

Advanced APT configuration:
```bash
// APT Configuration
APT::Get::Assume-Yes "false";
APT::Get::Show-Upgraded "true";
APT::Get::Show-Versions "true";
APT::Cache-Limit "100000000";

// Security settings
APT::Sandbox::User "root";
Acquire::AllowInsecureRepositories "false";
Acquire::AllowDowngradeToInsecureRepositories "false";

// Download settings
Acquire::Retries "3";
Acquire::http::Timeout "30";
Acquire::ftp::Timeout "30";

// Logging
Debug::pkgProblemResolver "false";
Debug::pkgDepCache::AutoInstall "false";

// Update settings
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
```

### Custom Package Repository Setup
```bash
#!/bin/bash
# setup-custom-repo.sh
set -euo pipefail

REPO_NAME="company-internal"
REPO_PATH="/var/www/apt"
GPG_KEY_ID="company@example.com"

# Create repository structure
create_repo_structure() {
    sudo mkdir -p "$REPO_PATH"/{pool,dists/stable/{main/binary-amd64,Release}}
    sudo chown -R www-data:www-data "$REPO_PATH"
}

# Generate GPG key for repository signing
generate_gpg_key() {
    if ! gpg --list-keys "$GPG_KEY_ID" >/dev/null 2>&1; then
        cat << EOF | gpg --batch --generate-key
Key-Type: RSA
Key-Length: 4096
Subkey-Type: RSA
Subkey-Length: 4096
Name-Real: Company APT Repository
Name-Email: $GPG_KEY_ID
Expire-Date: 2y
EOF
    fi
    
    # Export public key
    gpg --armor --export "$GPG_KEY_ID" | sudo tee "$REPO_PATH/company-repo.gpg.key"
}

# Create Packages file
create_packages_file() {
    cd "$REPO_PATH"
    dpkg-scanpackages pool/ /dev/null | gzip -9c > dists/stable/main/binary-amd64/Packages.gz
    dpkg-scanpackages pool/ /dev/null > dists/stable/main/binary-amd64/Packages
}

# Create Release file
create_release_file() {
    cd "$REPO_PATH/dists/stable"
    
    cat << EOF > Release
Archive: stable
Component: main
Origin: Company Internal Repository
Label: Company Internal
Architecture: amd64
Date: $(date -Ru)
Description: Internal company packages
EOF
    
    # Add checksums
    echo "MD5Sum:" >> Release
    find . -name "Packages*" -exec md5sum {} \; | sed 's/\.\///g' >> Release
    
    echo "SHA1:" >> Release
    find . -name "Packages*" -exec sha1sum {} \; | sed 's/\.\///g' >> Release
    
    echo "SHA256:" >> Release
    find . -name "Packages*" -exec sha256sum {} \; | sed 's/\.\///g' >> Release
    
    # Sign release file
    gpg --default-key "$GPG_KEY_ID" --armor --detach-sign --sign --output Release.gpg Release
}

# Add package to repository
add_package() {
    local package_file=$1
    
    if [ ! -f "$package_file" ]; then
        echo "Package file not found: $package_file"
        return 1
    fi
    
    # Copy package to pool
    sudo cp "$package_file" "$REPO_PATH/pool/"
    
    # Update repository metadata
    create_packages_file
    create_release_file
    
    echo "Package added to repository: $(basename $package_file)"
}

# Web server configuration for repository
configure_web_server() {
    cat << EOF | sudo tee /etc/apache2/sites-available/apt-repo.conf
<VirtualHost *:80>
    DocumentRoot $REPO_PATH
    ServerName apt.company.local
    
    <Directory $REPO_PATH>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>
    
    # Security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    
    # Logging
    LogLevel info
    ErrorLog \${APACHE_LOG_DIR}/apt-repo_error.log
    CustomLog \${APACHE_LOG_DIR}/apt-repo_access.log combined
</VirtualHost>
EOF
    
    sudo a2ensite apt-repo
    sudo a2enmod headers
    sudo systemctl reload apache2
}

case "${1:-}" in
    "init")
        create_repo_structure
        generate_gpg_key
        configure_web_server
        echo "Repository initialized"
        ;;
    "add")
        add_package "$2"
        ;;
    "update")
        create_packages_file
        create_release_file
        echo "Repository metadata updated"
        ;;
    *)
        echo "Usage: $0 {init|add|update} [package.deb]"
        exit 1
        ;;
esac
```

### Advanced Deployment Script
```bash
#!/bin/bash
# deployment-manager.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="/etc/deployment/config.conf"
LOG_FILE="/var/log/deployment.log"
DEPLOY_DIR="/opt/deployments"
BACKUP_DIR="/backup/deployments"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Load configuration
load_config() {
    if [ -f "$CONFIG_FILE" ]; then
        source "$CONFIG_FILE"
    else
        create_default_config
        source "$CONFIG_FILE"
    fi
}

create_default_config() {
    sudo mkdir -p /etc/deployment
    cat << 'EOF' > "$CONFIG_FILE"
# Deployment Configuration
DEPLOYMENT_METHOD="apt"
BACKUP_ENABLED=true
ROLLBACK_ENABLED=true
HEALTH_CHECK_ENABLED=true
NOTIFICATION_EMAIL="admin@company.com"

# Package sources
PRIMARY_REPO="http://apt.company.local"
FALLBACK_REPO="http://backup-apt.company.local"

# Deployment settings
MAX_PARALLEL_DEPLOYMENTS=5
DEPLOYMENT_TIMEOUT=300
HEALTH_CHECK_TIMEOUT=60

# Applications
APPLICATIONS="webapp api database frontend"
WEBAPP_PACKAGES="company-webapp nginx"
API_PACKAGES="company-api nodejs"
DATABASE_PACKAGES="postgresql-13 company-db-config"
FRONTEND_PACKAGES="company-frontend apache2"
EOF
    
    log "Created default configuration at $CONFIG_FILE"
}

# Pre-deployment checks
pre_deployment_checks() {
    local app_name=$1
    
    log "Running pre-deployment checks for $app_name"
    
    # Check system resources
    local free_space=$(df / | tail -1 | awk '{print $4}')
    if [ "$free_space" -lt 1048576 ]; then  # Less than 1GB
        log "ERROR: Insufficient disk space"
        return 1
    fi
    
    # Check system load
    local load=$(uptime | awk -F'load average:' '{print $2}' | awk -F',' '{print $1}' | tr -d ' ')
    if (( $(echo "$load > 5.0" | bc -l) )); then
        log "WARNING: High system load: $load"
    fi
    
    # Check package repository availability
    if ! apt-get update >/dev/null 2>&1; then
        log "ERROR: Cannot update package lists"
        return 1
    fi
    
    log "Pre-deployment checks passed"
    return 0
}

# Create deployment backup
create_backup() {
    local app_name=$1
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/${app_name}_${backup_timestamp}"
    
    if [ "$BACKUP_ENABLED" != "true" ]; then
        log "Backup disabled, skipping"
        return 0
    fi
    
    log "Creating backup for $app_name"
    
    sudo mkdir -p "$backup_path"
    
    # Backup package list
    dpkg -l > "$backup_path/package_list.txt"
    
    # Backup configuration files
    local packages_var="${app_name^^}_PACKAGES"
    local packages="${!packages_var}"
    
    for package in $packages; do
        if dpkg -l | grep -q "^ii.*$package"; then
            # Backup configuration files for this package
            dpkg -L "$package" | grep "^/etc/" | while read config_file; do
                if [ -f "$config_file" ]; then
                    local config_backup_dir="$backup_path/configs/$(dirname "$config_file")"
                    sudo mkdir -p "$config_backup_dir"
                    sudo cp "$config_file" "$config_backup_dir/"
                fi
            done
        fi
    done
    
    # Store backup path for potential rollback
    echo "$backup_path" > "/tmp/deployment_backup_${app_name}"
    
    log "Backup created at $backup_path"
}

# Deploy application packages
deploy_packages() {
    local app_name=$1
    local packages_var="${app_name^^}_PACKAGES"
    local packages="${!packages_var}"
    
    log "Deploying packages for $app_name: $packages"
    
    # Download packages first (for faster deployment)
    if ! sudo apt-get download $packages -o Dir::Cache::Archives="$DEPLOY_DIR/cache/"; then
        log "ERROR: Failed to download packages"
        return 1
    fi
    
    # Install packages
    if ! sudo DEBIAN_FRONTEND=noninteractive apt-get install -y $packages; then
        log "ERROR: Failed to install packages"
        return 1
    fi
    
    log "Successfully deployed packages for $app_name"
    return 0
}

# Health check after deployment
health_check() {
    local app_name=$1
    
    if [ "$HEALTH_CHECK_ENABLED" != "true" ]; then
        log "Health check disabled, skipping"
        return 0
    fi
    
    log "Running health check for $app_name"
    
    case $app_name in
        "webapp"|"frontend")
            # Check web service
            if curl -f http://localhost/ >/dev/null 2>&1; then
                log "Web service health check passed"
            else
                log "ERROR: Web service health check failed"
                return 1
            fi
            ;;
        "api")
            # Check API service
            if curl -f http://localhost:3000/health >/dev/null 2>&1; then
                log "API service health check passed"
            else
                log "ERROR: API service health check failed"
                return 1
            fi
            ;;
        "database")
            # Check database service
            if sudo -u postgres psql -c '\l' >/dev/null 2>&1; then
                log "Database service health check passed"
            else
                log "ERROR: Database service health check failed"
                return 1
            fi
            ;;
        *)
            log "No specific health check for $app_name"
            ;;
    esac
    
    return 0
}

# Rollback deployment
rollback_deployment() {
    local app_name=$1
    local backup_path_file="/tmp/deployment_backup_${app_name}"
    
    if [ ! -f "$backup_path_file" ]; then
        log "ERROR: No backup path found for $app_name"
        return 1
    fi
    
    local backup_path=$(cat "$backup_path_file")
    
    if [ ! -d "$backup_path" ]; then
        log "ERROR: Backup directory not found: $backup_path"
        return 1
    fi
    
    log "Rolling back $app_name from backup: $backup_path"
    
    # Restore configuration files
    if [ -d "$backup_path/configs" ]; then
        sudo cp -r "$backup_path/configs"/* /
    fi
    
    # Downgrade packages if needed
    local packages_var="${app_name^^}_PACKAGES"
    local packages="${!packages_var}"
    
    # This is a simplified rollback - in practice, you might need
    # to install specific package versions from the backup
    log "WARNING: Package rollback not implemented - manual intervention may be required"
    
    log "Rollback completed for $app_name"
}

# Send deployment notification
send_notification() {
    local app_name=$1
    local status=$2
    local message=$3
    
    if [ -z "$NOTIFICATION_EMAIL" ]; then
        return 0
    fi
    
    local subject="Deployment $status: $app_name on $(hostname)"
    local body="Deployment Details:
Application: $app_name
Status: $status
Message: $message
Server: $(hostname)
Timestamp: $(date)
User: $(whoami)"
    
    echo "$body" | mail -s "$subject" "$NOTIFICATION_EMAIL"
    log "Notification sent to $NOTIFICATION_EMAIL"
}

# Main deployment function
deploy_application() {
    local app_name=$1
    local deployment_id="deploy_${app_name}_$(date +%s)"
    
    log "Starting deployment: $deployment_id"
    
    # Pre-deployment checks
    if ! pre_deployment_checks "$app_name"; then
        log "Pre-deployment checks failed for $app_name"
        send_notification "$app_name" "FAILED" "Pre-deployment checks failed"
        return 1
    fi
    
    # Create backup
    if ! create_backup "$app_name"; then
        log "Backup creation failed for $app_name"
        send_notification "$app_name" "FAILED" "Backup creation failed"
        return 1
    fi
    
    # Deploy packages
    if ! deploy_packages "$app_name"; then
        log "Package deployment failed for $app_name"
        
        if [ "$ROLLBACK_ENABLED" = "true" ]; then
            log "Attempting rollback for $app_name"
            rollback_deployment "$app_name"
        fi
        
        send_notification "$app_name" "FAILED" "Package deployment failed"
        return 1
    fi
    
    # Health check
    if ! health_check "$app_name"; then
        log "Health check failed for $app_name"
        
        if [ "$ROLLBACK_ENABLED" = "true" ]; then
            log "Attempting rollback due to health check failure"
            rollback_deployment "$app_name"
        fi
        
        send_notification "$app_name" "FAILED" "Health check failed"
        return 1
    fi
    
    log "Deployment successful: $deployment_id"
    send_notification "$app_name" "SUCCESS" "Deployment completed successfully"
    return 0
}

# Bulk deployment function
deploy_all() {
    local failed_deployments=()
    local successful_deployments=()
    
    for app in $APPLICATIONS; do
        log "Deploying application: $app"
        
        if deploy_application "$app"; then
            successful_deployments+=("$app")
        else
            failed_deployments+=("$app")
        fi
    done
    
    # Report results
    log "Deployment Summary:"
    log "Successful: ${successful_deployments[*]:-none}"
    log "Failed: ${failed_deployments[*]:-none}"
    
    if [ ${#failed_deployments[@]} -gt 0 ]; then
        return 1
    fi
    
    return 0
}

# Package update management
update_packages() {
    local app_name=${1:-"all"}
    
    log "Updating packages for: $app_name"
    
    # Update package lists
    if ! sudo apt-get update; then
        log "ERROR: Failed to update package lists"
        return 1
    fi
    
    if [ "$app_name" = "all" ]; then
        # Update all packages
        sudo apt-get upgrade -y
    else
        # Update specific application packages
        local packages_var="${app_name^^}_PACKAGES"
        local packages="${!packages_var}"
        sudo apt-get install --only-upgrade -y $packages
    fi
    
    log "Package update completed for: $app_name"
}

# Generate deployment report
generate_report() {
    local report_file="/var/log/deployment-report-$(date +%Y%m%d).txt"
    
    echo "Deployment Status Report - $(date)" > "$report_file"
    echo "=====================================" >> "$report_file"
    echo >> "$report_file"
    
    echo "System Information:" >> "$report_file"
    echo "Hostname: $(hostname)" >> "$report_file"
    echo "OS: $(lsb_release -d | cut -f2)" >> "$report_file"
    echo "Uptime: $(uptime)" >> "$report_file"
    echo >> "$report_file"
    
    echo "Installed Applications:" >> "$report_file"
    for app in $APPLICATIONS; do
        local packages_var="${app^^}_PACKAGES"
        local packages="${!packages_var}"
        echo "  $app:" >> "$report_file"
        
        for package in $packages; do
            local version=$(dpkg -l | grep "^ii.*$package" | awk '{print $3}' || echo "not installed")
            echo "    $package: $version" >> "$report_file"
        done
    done
    echo >> "$report_file"
    
    echo "Recent Deployment History:" >> "$report_file"
    tail -50 "$LOG_FILE" | grep -E "(Starting deployment|Deployment successful|Deployment.*failed)" >> "$report_file"
    
    log "Deployment report generated: $report_file"
}

case "${1:-}" in
    "deploy")
        load_config
        deploy_application "$2"
        ;;
    "deploy-all")
        load_config
        deploy_all
        ;;
    "update")
        load_config
        update_packages "${2:-all}"
        ;;
    "rollback")
        load_config
        rollback_deployment "$2"
        ;;
    "report")
        load_config
        generate_report
        ;;
    "health-check")
        load_config
        health_check "$2"
        ;;
    *)
        echo "Usage: $0 {deploy|deploy-all|update|rollback|report|health-check} [application]"
        echo "Applications: $APPLICATIONS"
        exit 1
        ;;
esac
```

### Package Creation and Management
```bash
#!/bin/bash
# package-builder.sh
set -euo pipefail

PACKAGE_NAME=""
PACKAGE_VERSION=""
PACKAGE_DESCRIPTION=""
BUILD_DIR="/tmp/package-build"
OUTPUT_DIR="/opt/packages"

# Create package structure
create_package_structure() {
    local pkg_dir="$BUILD_DIR/${PACKAGE_NAME}_${PACKAGE_VERSION}"
    
    mkdir -p "$pkg_dir/DEBIAN"
    mkdir -p "$pkg_dir/usr/bin"
    mkdir -p "$pkg_dir/etc/$PACKAGE_NAME"
    mkdir -p "$pkg_dir/var/log/$PACKAGE_NAME"
    mkdir -p "$pkg_dir/lib/systemd/system"
    
    echo "$pkg_dir"
}

# Create control file
create_control_file() {
    local pkg_dir=$1
    
    cat << EOF > "$pkg_dir/DEBIAN/control"
Package: $PACKAGE_NAME
Version: $PACKAGE_VERSION
Section: utils
Priority: optional
Architecture: amd64
Depends: python3, systemd
Maintainer: Company DevOps <devops@company.com>
Description: $PACKAGE_DESCRIPTION
 Extended description of the package
 can span multiple lines.
EOF
}

# Create pre/post install scripts
create_install_scripts() {
    local pkg_dir=$1
    
    # Pre-install script
    cat << 'EOF' > "$pkg_dir/DEBIAN/preinst"
#!/bin/bash
set -e

# Pre-installation tasks
echo "Preparing to install $1..."

# Create user if needed
if ! id -u appuser >/dev/null 2>&1; then
    useradd -r -s /bin/false appuser
fi

exit 0
EOF
    
    # Post-install script
    cat << 'EOF' > "$pkg_dir/DEBIAN/postinst"
#!/bin/bash
set -e

case "$1" in
    configure)
        # Set proper permissions
        chown -R appuser:appuser /var/log/PACKAGE_NAME
        chmod 755 /usr/bin/PACKAGE_NAME
        
        # Enable and start service
        systemctl daemon-reload
        systemctl enable PACKAGE_NAME
        systemctl start PACKAGE_NAME
        ;;
esac

exit 0
EOF
    
    # Pre-remove script
    cat << 'EOF' > "$pkg_dir/DEBIAN/prerm"
#!/bin/bash
set -e

case "$1" in
    remove|upgrade|deconfigure)
        # Stop service
        systemctl stop PACKAGE_NAME || true
        systemctl disable PACKAGE_NAME || true
        ;;
esac

exit 0
EOF
    
    # Post-remove script
    cat << 'EOF' > "$pkg_dir/DEBIAN/postrm"
#!/bin/bash
set -e

case "$1" in
    purge)
        # Remove user and data
        userdel appuser || true
        rm -rf /var/log/PACKAGE_NAME
        ;;
esac

exit 0
EOF
    
    # Replace placeholder with actual package name
    sed -i "s/PACKAGE_NAME/$PACKAGE_NAME/g" "$pkg_dir/DEBIAN"/*
    
    # Make scripts executable
    chmod 755 "$pkg_dir/DEBIAN"/{preinst,postinst,prerm,postrm}
}

# Build package
build_package() {
    local pkg_dir=$1
    local output_file="$OUTPUT_DIR/${PACKAGE_NAME}_${PACKAGE_VERSION}_amd64.deb"
    
    # Create output directory
    mkdir -p "$OUTPUT_DIR"
    
    # Build package
    dpkg-deb --build "$pkg_dir" "$output_file"
    
    echo "Package built: $output_file"
    
    # Verify package
    dpkg-deb --info "$output_file"
    dpkg-deb --contents "$output_file"
}

# Example usage
build_example_package() {
    PACKAGE_NAME="company-app"
    PACKAGE_VERSION="1.0.0"
    PACKAGE_DESCRIPTION="Company internal application"
    
    local pkg_dir=$(create_package_structure)
    
    # Add application files
    cat << 'EOF' > "$pkg_dir/usr/bin/company-app"
#!/usr/bin/env python3
import sys
import time

def main():
    print("Company App v1.0.0 started")
    while True:
        time.sleep(60)
        print("App is running...")

if __name__ == "__main__":
    main()
EOF
    chmod 755 "$pkg_dir/usr/bin/company-app"
    
    # Add configuration
    cat << 'EOF' > "$pkg_dir/etc/company-app/config.yaml"
app:
  name: "Company App"
  version: "1.0.0"
  log_level: "INFO"
  
server:
  host: "0.0.0.0"
  port: 8080
EOF
    
    # Add systemd service
    cat << 'EOF' > "$pkg_dir/lib/systemd/system/company-app.service"
[Unit]
Description=Company Application
After=network.target

[Service]
Type=simple
User=appuser
Group=appuser
ExecStart=/usr/bin/company-app
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
    
    create_control_file "$pkg_dir"
    create_install_scripts "$pkg_dir"
    build_package "$pkg_dir"
    
    # Cleanup
    rm -rf "$pkg_dir"
}

# Build package from specification
build_from_spec() {
    local spec_file=$1
    
    if [ ! -f "$spec_file" ]; then
        echo "Specification file not found: $spec_file"
        return 1
    fi
    
    source "$spec_file"
    
    local pkg_dir=$(create_package_structure)
    
    # Copy files from source directory
    if [ -n "${SOURCE_DIR:-}" ] && [ -d "$SOURCE_DIR" ]; then
        cp -r "$SOURCE_DIR"/* "$pkg_dir/"
    fi
    
    create_control_file "$pkg_dir"
    create_install_scripts "$pkg_dir"
    build_package "$pkg_dir"
    
    rm -rf "$pkg_dir"
}

case "${1:-}" in
    "build")
        build_example_package
        ;;
    "build-from-spec")
        build_from_spec "$2"
        ;;
    *)
        echo "Usage: $0 {build|build-from-spec} [spec-file]"
        exit 1
        ;;
esac
```

## Configuration Examples

### Automated Updates with Unattended Upgrades
```bash
# Install unattended upgrades
sudo apt install unattended-upgrades apt-listchanges

# Configure unattended upgrades
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

Unattended upgrades configuration:
```bash
// Unattended-Upgrade::Origins-Pattern controls which packages are
// upgraded.
Unattended-Upgrade::Origins-Pattern {
    // Codename based matching:
    "origin=Debian,codename=${distro_codename}-updates";
    "origin=Debian,codename=${distro_codename}-proposed-updates";
    "origin=Debian,codename=${distro_codename},label=Debian";
    "origin=Debian,codename=${distro_codename},label=Debian-Security";
    "origin=Debian,codename=${distro_codename}-security,label=Debian-Security";
    
    // Include company repository
    "origin=Company,codename=stable";
};

// Python regular expressions, matching packages to exclude from upgrading
Unattended-Upgrade::Package-Blacklist {
    // The following matches all packages starting with linux-
    "linux-";
    
    // Use $ to explicitely define the end of a package name. Without
    // the $, "libc6" would match all of them.
    "libc6$";
    "libc6-dev$";
    "libc6-i686$";
    
    // Special kernel matching (do not auto-upgrade)
    "linux-image-.*";
    "linux-headers-.*";
    
    // Critical system packages
    "mysql-server.*";
    "postgresql-.*";
    "apache2$";
    "nginx$";
};

// Split the upgrade into the smallest possible chunks so that
// they can be interrupted with SIGTERM.
Unattended-Upgrade::MinimalSteps "true";

// Install all updates when the machine is shutting down
// instead of doing it in the background while the machine is running.
Unattended-Upgrade::InstallOnShutdown "false";

// Send email to this address for problems or packages upgrades
Unattended-Upgrade::Mail "admin@company.com";

// Set this value to "true" to get emails only on errors.
Unattended-Upgrade::MailOnlyOnError "true";

// Remove unused automatically installed kernel-related packages
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";

// Do automatic removal of newly unused dependencies after the upgrade
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";

// Do automatic removal of unused packages after the upgrade
Unattended-Upgrade::Remove-Unused-Dependencies "false";

// Automatically reboot *WITHOUT CONFIRMATION* if
// the file /var/run/reboot-required is found after the upgrade
Unattended-Upgrade::Automatic-Reboot "false";

// Automatically reboot even if there are users currently logged in
// when Unattended-Upgrade::Automatic-Reboot is set to true
Unattended-Upgrade::Automatic-Reboot-WithUsers "false";

// If automatic reboot is enabled and needed, reboot at the specific
// time instead of immediately
Unattended-Upgrade::Automatic-Reboot-Time "02:00";

// Use apt bandwidth limit feature, this example limits the download
// speed to 70kb/sec
Acquire::http::Dl-Limit "70";

// Enable logging to syslog. Default is False
Unattended-Upgrade::SyslogEnable "true";

// Specify syslog facility. Default is daemon
Unattended-Upgrade::SyslogFacility "daemon";

// Download and install upgrades only on AC power
// (i.e. skip or gracefully stop updates on battery)
Unattended-Upgrade::OnlyOnACPower "false";

// Download and install upgrades only on non-metered connection
// (i.e. skip or gracefully stop updates on a metered connection)
Unattended-Upgrade::Skip-Updates-On-Metered-Connections "true";

// Verbose logging
Unattended-Upgrade::Verbose "false";

// Print debugging information both in unattended-upgrades and
// in unattended-upgrade-shutdown
Unattended-Upgrade::Debug "false";
```

### Container-based Package Management
```bash
# Docker-based application deployment
sudo nano /opt/deployment/docker-deploy.sh
```

Docker deployment script:
```bash
#!/bin/bash
# docker-deploy.sh
set -euo pipefail

REGISTRY="registry.company.com"
COMPOSE_FILE="/opt/deployment/docker-compose.yml"
LOG_FILE="/var/log/docker-deploy.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Deploy application stack
deploy_stack() {
    local stack_name=$1
    local compose_file=${2:-$COMPOSE_FILE}
    
    log "Deploying stack: $stack_name"
    
    # Pull latest images
    docker-compose -f "$compose_file" pull
    
    # Deploy with zero downtime
    docker-compose -f "$compose_file" up -d --remove-orphans
    
    # Health check
    sleep 30
    if docker-compose -f "$compose_file" ps | grep -q "Up"; then
        log "Stack deployment successful: $stack_name"
        return 0
    else
        log "Stack deployment failed: $stack_name"
        return 1
    fi
}

# Update specific service
update_service() {
    local service_name=$1
    local image_tag=${2:-latest}
    
    log "Updating service: $service_name to $image_tag"
    
    # Update image tag in compose file
    sed -i "s|${REGISTRY}/${service_name}:.*|${REGISTRY}/${service_name}:${image_tag}|" "$COMPOSE_FILE"
    
    # Rolling update
    docker-compose -f "$COMPOSE_FILE" up -d "$service_name"
    
    log "Service update completed: $service_name"
}

# Rollback to previous version
rollback_service() {
    local service_name=$1
    
    log "Rolling back service: $service_name"
    
    # Get previous image from history
    local previous_image=$(docker images --format "table {{.Repository}}:{{.Tag}}" | grep "$service_name" | head -2 | tail -1)
    
    if [ -n "$previous_image" ]; then
        # Update compose file with previous image
        sed -i "s|${REGISTRY}/${service_name}:.*|${previous_image}|" "$COMPOSE_FILE"
        docker-compose -f "$COMPOSE_FILE" up -d "$service_name"
        log "Rollback completed: $service_name to $previous_image"
    else
        log "ERROR: No previous image found for $service_name"
        return 1
    fi
}

case "${1:-}" in
    "deploy")
        deploy_stack "$2"
        ;;
    "update")
        update_service "$2" "${3:-latest}"
        ;;
    "rollback")
        rollback_service "$2"
        ;;
    *)
        echo "Usage: $0 {deploy|update|rollback} [service] [tag]"
        exit 1
        ;;
esac
```

### Snap and Flatpak Management
```bash
#!/bin/bash
# alternative-packages.sh
# Manage snap and flatpak packages

# Snap management
manage_snaps() {
    echo "=== Snap Package Management ==="
    
    # List installed snaps
    echo "Installed snaps:"
    snap list
    
    # Update all snaps
    echo "Updating snaps..."
    sudo snap refresh
    
    # Install specific snap
    install_snap() {
        local package=$1
        local channel=${2:-stable}
        
        echo "Installing snap: $package from $channel channel"
        sudo snap install "$package" --channel="$channel"
    }
    
    # Remove snap
    remove_snap() {
        local package=$1
        
        echo "Removing snap: $package"
        sudo snap remove "$package"
    }
}

# Flatpak management
manage_flatpaks() {
    echo "=== Flatpak Package Management ==="
    
    # Add Flathub repository if not already added
    if ! flatpak remote-list | grep -q flathub; then
        flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
    fi
    
    # List installed flatpaks
    echo "Installed flatpaks:"
    flatpak list
    
    # Update all flatpaks
    echo "Updating flatpaks..."
    flatpak update -y
    
    # Install specific flatpak
    install_flatpak() {
        local package=$1
        
        echo "Installing flatpak: $package"
        flatpak install -y flathub "$package"
    }
    
    # Remove flatpak
    remove_flatpak() {
        local package=$1
        
        echo "Removing flatpak: $package"
        flatpak uninstall -y "$package"
        
        # Clean up unused runtimes
        flatpak uninstall --unused -y
    }
}

# Unified package management
unified_install() {
    local package=$1
    local method=${2:-auto}
    
    case $method in
        "apt")
            sudo apt install -y "$package"
            ;;
        "snap")
            sudo snap install "$package"
            ;;
        "flatpak")
            flatpak install -y flathub "$package"
            ;;
        "auto")
            # Try apt first, then snap, then flatpak
            if apt-cache show "$package" >/dev/null 2>&1; then
                sudo apt install -y "$package"
            elif snap info "$package" >/dev/null 2>&1; then
                sudo snap install "$package"
            elif flatpak search "$package" | grep -q "$package"; then
                flatpak install -y flathub "$package"
            else
                echo "Package not found in any repository: $package"
                return 1
            fi
            ;;
    esac
}

case "${1:-}" in
    "snap")
        manage_snaps
        ;;
    "flatpak")
        manage_flatpaks
        ;;
    "install")
        unified_install "$2" "${3:-auto}"
        ;;
    *)
        echo "Usage: $0 {snap|flatpak|install} [package] [method]"
        exit 1
        ;;
esac
```

### CI/CD Pipeline Integration
```bash
#!/bin/bash
# cicd-deploy.sh
# Continuous deployment script for Debian packages

PIPELINE_ID=${CI_PIPELINE_ID:-"manual"}
BUILD_NUMBER=${BUILD_NUMBER:-$(date +%s)}
ARTIFACT_REPOSITORY="https://artifacts.company.com"
DEPLOY_ENVIRONMENT=${DEPLOY_ENV:-"staging"}

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') [$$] $1" | tee -a "/var/log/cicd-deploy.log"
}

# Download artifacts from CI pipeline
download_artifacts() {
    local package_name=$1
    local version=$2
    local artifact_url="${ARTIFACT_REPOSITORY}/${package_name}/${version}/${package_name}_${version}_amd64.deb"
    
    log "Downloading artifact: $artifact_url"
    
    local temp_dir="/tmp/cicd-artifacts-$$"
    mkdir -p "$temp_dir"
    
    if curl -f -o "$temp_dir/${package_name}.deb" "$artifact_url"; then
        echo "$temp_dir/${package_name}.deb"
        return 0
    else
        log "ERROR: Failed to download artifact"
        rm -rf "$temp_dir"
        return 1
    fi
}

# Validate package before deployment
validate_package() {
    local package_file=$1
    
    log "Validating package: $(basename $package_file)"
    
    # Check package integrity
    if ! dpkg-deb --info "$package_file" >/dev/null 2>&1; then
        log "ERROR: Package is corrupted or invalid"
        return 1
    fi
    
    # Check package signature (if signed)
    if command -v debsig-verify >/dev/null; then
        if ! debsig-verify "$package_file"; then
            log "WARNING: Package signature verification failed"
        fi
    fi
    
    # Extract and validate control file
    local control_info=$(dpkg-deb --field "$package_file")
    local package_name=$(echo "$control_info" | grep "^Package:" | cut -d' ' -f2)
    local version=$(echo "$control_info" | grep "^Version:" | cut -d' ' -f2)
    
    log "Package validation passed: $package_name v$version"
    return 0
}

# Deploy to staging environment
deploy_staging() {
    local package_file=$1
    
    log "Deploying to staging environment"
    
    # Create staging namespace or use existing
    local staging_config="/etc/deployment/staging.conf"
    if [ -f "$staging_config" ]; then
        source "$staging_config"
    fi
    
    # Install package
    if sudo dpkg -i "$package_file"; then
        log "Package installed successfully in staging"
    else
        log "ERROR: Package installation failed in staging"
        return 1
    fi
    
    # Fix any dependency issues
    sudo apt-get install -f -y
    
    # Run staging tests
    run_staging_tests
}

# Run automated tests in staging
run_staging_tests() {
    log "Running staging tests"
    
    local test_results="/tmp/staging-tests-$$.txt"
    local test_passed=true
    
    # Service health check
    if ! systemctl is-active --quiet nginx; then
        echo "FAIL: Nginx service not running" >> "$test_results"
        test_passed=false
    else
        echo "PASS: Nginx service running" >> "$test_results"
    fi
    
    # HTTP endpoint test
    if ! curl -f http://localhost/health >/dev/null 2>&1; then
        echo "FAIL: Health endpoint not responding" >> "$test_results"
        test_passed=false
    else
        echo "PASS: Health endpoint responding" >> "$test_results"
    fi
    
    # Database connectivity test
    if ! sudo -u postgres psql -c '\l' >/dev/null 2>&1; then
        echo "FAIL: Database connectivity failed" >> "$test_results"
        test_passed=false
    else
        echo "PASS: Database connectivity successful" >> "$test_results"
    fi
    
    # Log test results
    log "Test results:"
    cat "$test_results" | while read line; do
        log "  $line"
    done
    
    if $test_passed; then
        log "All staging tests passed"
        return 0
    else
        log "Staging tests failed"
        return 1
    fi
}

# Promote to production
promote_to_production() {
    local package_file=$1
    
    log "Promoting to production environment"
    
    # Production deployment checklist
    local checklist=(
        "backup_current_version"
        "deploy_to_production"
        "run_production_smoke_tests"
        "update_monitoring"
    )
    
    for task in "${checklist[@]}"; do
        log "Executing: $task"
        if ! $task "$package_file"; then
            log "ERROR: Production deployment failed at: $task"
            return 1
        fi
    done
    
    log "Production deployment completed successfully"
}

backup_current_version() {
    local backup_dir="/backup/deployments/$(date +%Y%m%d_%H%M%S)"
    sudo mkdir -p "$backup_dir"
    
    # Backup current package list
    dpkg -l > "$backup_dir/package_list.txt"
    
    # Backup configuration files
    sudo tar -czf "$backup_dir/configs.tar.gz" /etc/
    
    log "Current version backed up to: $backup_dir"
}

deploy_to_production() {
    local package_file=$1
    
    # Blue-green deployment simulation
    log "Deploying to production (blue-green strategy)"
    
    # Install new version
    sudo dpkg -i "$package_file"
    sudo apt-get install -f -y
    
    # Restart services with zero downtime
    sudo systemctl reload nginx || sudo systemctl restart nginx
    
    log "Production deployment completed"
}

run_production_smoke_tests() {
    log "Running production smoke tests"
    
    # Quick smoke tests for production
    if curl -f http://localhost/ >/dev/null 2>&1; then
        log "Production smoke test passed"
        return 0
    else
        log "Production smoke test failed"
        return 1
    fi
}

update_monitoring() {
    local package_file=$1
    
    # Update monitoring configuration
    local version=$(dpkg-deb --field "$package_file" Version)
    
    # Update version in monitoring system
    curl -X POST "http://monitoring.company.com/api/deployment" \
        -H "Content-Type: application/json" \
        -d "{\"service\":\"webapp\",\"version\":\"$version\",\"environment\":\"production\"}" \
        || log "WARNING: Failed to update monitoring system"
    
    log "Monitoring updated for version: $version"
}

# Main deployment pipeline
main() {
    local package_name=$1
    local version=$2
    
    log "Starting CI/CD deployment pipeline"
    log "Pipeline ID: $PIPELINE_ID"
    log "Package: $package_name"
    log "Version: $version"
    log "Environment: $DEPLOY_ENVIRONMENT"
    
    # Download artifacts
    local package_file=$(download_artifacts "$package_name" "$version")
    if [ $? -ne 0 ]; then
        log "Deployment failed: Could not download artifacts"
        exit 1
    fi
    
    # Validate package
    if ! validate_package "$package_file"; then
        log "Deployment failed: Package validation failed"
        exit 1
    fi
    
    # Deploy based on environment
    case $DEPLOY_ENVIRONMENT in
        "staging")
            if deploy_staging "$package_file"; then
                log "Staging deployment successful"
            else
                log "Staging deployment failed"
                exit 1
            fi
            ;;
        "production")
            if promote_to_production "$package_file"; then
                log "Production deployment successful"
            else
                log "Production deployment failed"
                exit 1
            fi
            ;;
        *)
            log "Unknown environment: $DEPLOY_ENVIRONMENT"
            exit 1
            ;;
    esac
    
    # Cleanup
    rm -rf "$(dirname $package_file)"
    
    log "CI/CD deployment pipeline completed successfully"
}

# Execute main function if called directly
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi
```

## Security Considerations

### Package Signature Verification
```bash
# Setup GPG verification for packages
sudo nano /etc/apt/apt.conf.d/99verify-signatures
```

Package verification configuration:
```bash
// Require signed packages
APT::Get::AllowUnauthenticated "false";
Acquire::AllowInsecureRepositories "false";
Acquire::AllowDowngradeToInsecureRepositories "false";

// Check signatures
APT::Hashes::SHA512 "true";
APT::Hashes::SHA256 "true";
APT::Hashes::SHA1 "false";
APT::Hashes::MD5 "false";

// Keyring management
Dir::Etc::Trusted "/etc/apt/trusted.gpg.d/";
Dir::Etc::TrustedParts "/etc/apt/trusted.gpg.d/";
```

### Secure Package Installation Script
```bash
#!/bin/bash
# secure-install.sh
# Secure package installation with verification

ALLOWED_SOURCES=("archive.ubuntu.com" "security.ubuntu.com" "apt.company.com")
LOG_FILE="/var/log/secure-install.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Verify package source
verify_source() {
    local package=$1
    
    local policy_output=$(apt-cache policy "$package")
    local source_url=$(echo "$policy_output" | grep -E "^\s+\d+" | head -1 | awk '{print $2}')
    
    for allowed_source in "${ALLOWED_SOURCES[@]}"; do
        if [[ "$source_url" =~ $allowed_source ]]; then
            log "Package source verified: $package from $source_url"
            return 0
        fi
    done
    
    log "ERROR: Untrusted package source: $package from $source_url"
    return 1
}

# Verify package integrity
verify_integrity() {
    local package=$1
    
    # Check if package is available and authentic
    if ! apt-get --dry-run install "$package" 2>&1 | grep -q "WARNING\|ERROR"; then
        log "Package integrity verified: $package"
        return 0
    else
        log "ERROR: Package integrity check failed: $package"
        return 1
    fi
}

# Secure install function
secure_install() {
    local package=$1
    
    log "Starting secure installation of: $package"
    
    # Update package lists
    sudo apt-get update
    
    # Verify source
    if ! verify_source "$package"; then
        return 1
    fi
    
    # Verify integrity
    if ! verify_integrity "$package"; then
        return 1
    fi
    
    # Install with verification
    sudo apt-get install -y "$package"
    
    # Post-installation verification
    if dpkg -l | grep -q "^ii.*$package"; then
        log "Package installed successfully: $package"
        return 0
    else
        log "ERROR: Package installation verification failed: $package"
        return 1
    fi
}

# Main execution
if [ $# -eq 0 ]; then
    echo "Usage: $0 package_name [package_name2 ...]"
    exit 1
fi

for package in "$@"; do
    if ! secure_install "$package"; then
        echo "Failed to install: $package"
        exit 1
    fi
done

log "All packages installed successfully"
```

### Dependency Management and Isolation
```bash
# Virtual environment for Python applications
setup_python_venv() {
    local app_name=$1
    local venv_path="/opt/venvs/$app_name"
    
    # Create virtual environment
    python3 -m venv "$venv_path"
    
    # Activate and install packages
    source "$venv_path/bin/activate"
    pip install --upgrade pip
    pip install -r "/opt/apps/$app_name/requirements.txt"
    
    # Create systemd service with virtual environment
    cat << EOF > "/etc/systemd/system/$app_name.service"
[Unit]
Description=$app_name Python Application
After=network.target

[Service]
Type=simple
User=appuser
Group=appuser
WorkingDirectory=/opt/apps/$app_name
Environment=PATH=$venv_path/bin
ExecStart=$venv_path/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF
    
    systemctl daemon-reload
    systemctl enable "$app_name"
}
```

## Quick Reference

### Essential APT Commands
```bash
# Package management
sudo apt update                    # Update package lists
sudo apt upgrade                   # Upgrade packages
sudo apt install package          # Install package
sudo apt remove package           # Remove package
sudo apt purge package            # Remove package and configs
sudo apt autoremove               # Remove unused dependencies

# Package information
apt search keyword                 # Search packages
apt show package                   # Show package details
apt list --installed              # List installed packages
apt list --upgradable             # List upgradable packages
dpkg -l                           # List all packages
dpkg -L package                   # List package files
```

### Repository Management
```bash
# Add repository
echo "deb [signed-by=/path/to/key] http://repo.url distribution component" | sudo tee /etc/apt/sources.list.d/repo.list

# Add GPG key
curl -fsSL https://repo.url/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/repo.gpg

# Remove repository
sudo rm /etc/apt/sources.list.d/repo.list
sudo rm /usr/share/keyrings/repo.gpg
```

### Package Building
```bash
# Build dependencies
sudo apt install build-essential devscripts debhelper

# Create package template
dh_make --single --native --packagename package_1.0

# Build package
dpkg-buildpackage -rfakeroot -us -uc

# Install local package
sudo dpkg -i package.deb
sudo apt-get install -f  # Fix dependencies
```

## Troubleshooting

### Common Package Issues

**Broken packages:**
```bash
# Fix broken packages
sudo apt-get install -f
sudo dpkg --configure -a

# Force package installation
sudo dpkg -i --force-depends package.deb

# Remove problematic package
sudo dpkg -r --force-depends package
```

**Dependency conflicts:**
```bash
# Simulate package installation
apt-get --dry-run install package

# Resolve dependencies manually
sudo apt-get install package-dependency

# Use aptitude for complex resolution
sudo apt install aptitude
sudo aptitude install package
```

**Repository issues:**
```bash
# Fix repository key errors
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys KEYID

# Reset repository cache
sudo rm -rf /var/lib/apt/lists/*
sudo apt update

# Check repository connectivity
curl -I https://repository.url
```

**Disk space issues:**
```bash
# Clean package cache
sudo apt clean
sudo apt autoclean

# Remove old packages
sudo apt autoremove

# Check package cache size
du -sh /var/cache/apt/archives/
```

**Lock file issues:**
```bash
# Remove lock files (if no apt process running)
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/dpkg/lock
sudo rm /var/cache/apt/archives/lock

# Check for running apt processes
ps aux | grep -E "(apt|dpkg)"
```

## Performance Tips

### APT Performance Optimization
```bash
# Parallel downloads
echo 'APT::Acquire::Retries "3";' | sudo tee -a /etc/apt/apt.conf.d/99parallel
echo 'Acquire::Queue-Mode "host";' | sudo tee -a /etc/apt/apt.conf.d/99parallel

# Use fastest mirror
sudo apt install netselect-apt
sudo netselect-apt

# Cache optimization
echo 'APT::Cache-Start "32505856";' | sudo tee -a /etc/apt/apt.conf.d/99cache
echo 'APT::Cache-Grow "2097152";' | sudo tee -a /etc/apt/apt.conf.d/99cache
```

### Package Installation Optimization
```bash
# Batch installation
sudo apt install package1 package2 package3

# Download only (for offline installation)
apt-get download package1 package2
sudo dpkg -i *.deb
sudo apt-get install -f

# Minimize package installation
sudo apt install --no-install-recommends package
```

### Automated Package Management
```bash
# Schedule automated updates
sudo crontab -e
# Add: 0 2 * * * /usr/bin/apt update && /usr/bin/apt upgrade -y

# Use unattended upgrades for security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

## What's Next
- [Container Management | Debian 13 Server]
- [Configuration Management | Debian 13 Server]
- [Security Hardening | Debian 13 Server]
- [System Monitoring | Debian 13 Server]