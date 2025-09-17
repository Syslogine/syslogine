---
sidebar_position: 10
title: "System Updates and Patch Management | Debian 13 Server"
sidebar_label: "Updates & Patch Management"
description: "Complete guide to system updates and patch management on Debian 13 Trixie server including automated updates, security patches, kernel updates, rollback procedures, and enterprise patch management."
keywords:
  - "debian 13 updates"
  - "debian server patching"
  - "debian trixie patch management"
  - "server update automation"
  - "debian enterprise updates"
tags:
  - debian-13
  - debian-trixie
  - system-updates
  - patch-management
  - server-administration
slug: debian-13-system-updates-patch-management
---

# System Updates and Patch Management in Debian 13 Server

## Overview
This tutorial covers comprehensive system updates and patch management for Debian 13 servers, including automated update strategies, security patch deployment, kernel update procedures, rollback mechanisms, and enterprise-grade patch management workflows. You'll learn to maintain system security while ensuring stability and minimal downtime.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 70 minutes  
**Required packages:** apt, unattended-upgrades, needrestart  
**System requirements:** Root access, adequate disk space for updates, backup capabilities

## Installation
```bash
# Install update management tools
sudo apt update
sudo apt install unattended-upgrades apt-listchanges needrestart

# Install patch management tools
sudo apt install etckeeper git-core debsecan

# Install system analysis tools
sudo apt install debian-security-support debsums rkhunter
```

## Basic Section 🟢

### Basic Update Commands
```bash
# Update package lists
sudo apt update

# List available upgrades
apt list --upgradable

# Upgrade all packages
sudo apt upgrade

# Full system upgrade (more aggressive)
sudo apt full-upgrade

# Upgrade specific package
sudo apt install --only-upgrade package_name

# Show package changelog before upgrading
apt-listchanges package_name
```

### Security Updates
```bash
# Update security packages only
sudo apt update
sudo apt upgrade

# Check for security updates
apt list --upgradable | grep -i security

# Install security updates automatically
sudo unattended-upgrade --dry-run
sudo unattended-upgrade

# Check security status
sudo debsecan --suite $(lsb_release -cs) --format packages
```

### Kernel Updates
```bash
# Check current kernel version
uname -r

# List available kernel versions
apt list linux-image-*

# Install specific kernel version
sudo apt install linux-image-6.1.0-13-amd64

# Remove old kernel versions
sudo apt autoremove --purge

# Update GRUB after kernel changes
sudo update-grub
```

### Basic Reboot Management
```bash
# Check if reboot is required
cat /var/run/reboot-required
ls /var/run/reboot-required.pkgs

# Check what services need restart
sudo needrestart

# Restart specific service
sudo systemctl restart service_name

# Schedule reboot
sudo shutdown -r +10 "System reboot for updates in 10 minutes"
sudo shutdown -c  # Cancel scheduled shutdown
```

## Advanced Section 🔴

### Advanced Update Management Script
```bash
#!/bin/bash
# update-manager.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="/etc/update-manager/config.conf"
LOG_FILE="/var/log/update-manager.log"
BACKUP_DIR="/backup/pre-update"
NOTIFICATION_EMAIL="admin@company.com"

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
    sudo mkdir -p /etc/update-manager
    cat << 'EOF' > "$CONFIG_FILE"
# Update Manager Configuration
UPDATE_MODE="security"  # all, security, manual
AUTO_REBOOT=false
REBOOT_TIME="02:00"
MAINTENANCE_WINDOW_START="01:00"
MAINTENANCE_WINDOW_END="05:00"

# Backup settings
BACKUP_ENABLED=true
BACKUP_CONFIGS=true
BACKUP_PACKAGES=true

# Notification settings
EMAIL_NOTIFICATIONS=true
SLACK_WEBHOOK=""
TEAMS_WEBHOOK=""

# Safety settings
SIMULATE_UPDATES=false
ROLLBACK_ENABLED=true
HEALTH_CHECK_ENABLED=true

# Package filters
EXCLUDE_PACKAGES="linux-image-* mysql-server-* postgresql-*"
INCLUDE_PACKAGES=""
CRITICAL_PACKAGES="openssh-server systemd"

# Timing settings
MAX_UPDATE_TIME=3600
HEALTH_CHECK_TIMEOUT=300
SERVICE_RESTART_DELAY=30
EOF
    
    log "Created default configuration at $CONFIG_FILE"
}

# Check if we're in maintenance window
in_maintenance_window() {
    local current_time=$(date +%H:%M)
    local start_time="$MAINTENANCE_WINDOW_START"
    local end_time="$MAINTENANCE_WINDOW_END"
    
    # Convert times to minutes for comparison
    local current_minutes=$(date -d "$current_time" +%s)
    local start_minutes=$(date -d "$start_time" +%s)
    local end_minutes=$(date -d "$end_time" +%s)
    
    # Handle maintenance window spanning midnight
    if [ "$start_minutes" -gt "$end_minutes" ]; then
        if [ "$current_minutes" -ge "$start_minutes" ] || [ "$current_minutes" -le "$end_minutes" ]; then
            return 0
        fi
    else
        if [ "$current_minutes" -ge "$start_minutes" ] && [ "$current_minutes" -le "$end_minutes" ]; then
            return 0
        fi
    fi
    
    return 1
}

# Create system backup before updates
create_system_backup() {
    if [ "$BACKUP_ENABLED" != "true" ]; then
        log "Backup disabled, skipping"
        return 0
    fi
    
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/$backup_timestamp"
    
    log "Creating system backup at $backup_path"
    sudo mkdir -p "$backup_path"
    
    # Backup package list
    dpkg -l > "$backup_path/package_list.txt"
    apt-mark showmanual > "$backup_path/manual_packages.txt"
    
    if [ "$BACKUP_CONFIGS" = "true" ]; then
        # Backup critical configuration files
        sudo tar -czf "$backup_path/etc_backup.tar.gz" /etc/ 2>/dev/null || true
        
        # Backup package configuration
        sudo debconf-get-selections > "$backup_path/debconf_selections.txt"
    fi
    
    if [ "$BACKUP_PACKAGES" = "true" ]; then
        # Download current package versions for potential rollback
        local cache_dir="$backup_path/package_cache"
        sudo mkdir -p "$cache_dir"
        
        # Get currently installed package versions
        dpkg -l | awk '/^ii/ {print $2"="$3}' | head -20 | while read package_version; do
            apt-get download "$package_version" -o Dir::Cache::Archives="$cache_dir/" 2>/dev/null || true
        done
    fi
    
    # Store backup path for rollback reference
    echo "$backup_path" > "/tmp/last_update_backup"
    
    log "System backup completed: $backup_path"
}

# Analyze available updates
analyze_updates() {
    log "Analyzing available updates"
    
    # Update package lists
    sudo apt-get update -qq
    
    # Get list of upgradable packages
    local upgradable_packages=$(apt list --upgradable 2>/dev/null | grep -v "Listing...")
    local update_count=$(echo "$upgradable_packages" | wc -l)
    
    if [ "$update_count" -eq 0 ]; then
        log "No updates available"
        return 1
    fi
    
    log "Found $update_count packages to update"
    
    # Categorize updates
    local security_updates=$(echo "$upgradable_packages" | grep -i security | wc -l)
    local kernel_updates=$(echo "$upgradable_packages" | grep linux-image | wc -l)
    local critical_updates=0
    
    # Check for critical package updates
    for package in $CRITICAL_PACKAGES; do
        if echo "$upgradable_packages" | grep -q "^$package/"; then
            ((critical_updates++))
        fi
    done
    
    # Create update summary
    cat << EOF > "/tmp/update_analysis.txt"
Update Analysis Summary
======================
Total packages: $update_count
Security updates: $security_updates
Kernel updates: $kernel_updates
Critical package updates: $critical_updates

Packages to be updated:
$upgradable_packages
EOF
    
    log "Update analysis completed - Security: $security_updates, Kernel: $kernel_updates, Critical: $critical_updates"
    
    # Return 0 if updates are available
    return 0
}

# Apply updates based on configuration
apply_updates() {
    log "Applying updates (mode: $UPDATE_MODE)"
    
    local apt_options="-y -q"
    local update_command=""
    
    if [ "$SIMULATE_UPDATES" = "true" ]; then
        apt_options="$apt_options --dry-run"
        log "SIMULATION MODE: No actual changes will be made"
    fi
    
    # Build package filter
    local exclude_options=""
    if [ -n "$EXCLUDE_PACKAGES" ]; then
        for package in $EXCLUDE_PACKAGES; do
            exclude_options="$exclude_options --exclude=$package"
        done
    fi
    
    case "$UPDATE_MODE" in
        "security")
            log "Applying security updates only"
            # Use unattended-upgrades for security updates
            if [ "$SIMULATE_UPDATES" = "true" ]; then
                sudo unattended-upgrade --dry-run
            else
                sudo DEBIAN_FRONTEND=noninteractive unattended-upgrade
            fi
            ;;
        "all")
            log "Applying all available updates"
            if [ -n "$INCLUDE_PACKAGES" ]; then
                # Update specific packages only
                sudo DEBIAN_FRONTEND=noninteractive apt-get install $apt_options $INCLUDE_PACKAGES
            else
                # Update all packages with exclusions
                sudo DEBIAN_FRONTEND=noninteractive apt-get upgrade $apt_options $exclude_options
            fi
            ;;
        "critical")
            log "Applying critical updates only"
            if [ -n "$CRITICAL_PACKAGES" ]; then
                sudo DEBIAN_FRONTEND=noninteractive apt-get install --only-upgrade $apt_options $CRITICAL_PACKAGES
            fi
            ;;
        "manual")
            log "Manual mode - no automatic updates applied"
            return 0
            ;;
        *)
            log "ERROR: Unknown update mode: $UPDATE_MODE"
            return 1
            ;;
    esac
    
    # Clean up
    sudo apt-get autoremove -y
    sudo apt-get autoclean
    
    log "Updates applied successfully"
}

# Check system health after updates
health_check() {
    if [ "$HEALTH_CHECK_ENABLED" != "true" ]; then
        log "Health check disabled, skipping"
        return 0
    fi
    
    log "Performing post-update health check"
    
    local health_issues=0
    local health_report="/tmp/health_check_report.txt"
    
    echo "Post-Update Health Check Report" > "$health_report"
    echo "===============================" >> "$health_report"
    echo "Timestamp: $(date)" >> "$health_report"
    echo >> "$health_report"
    
    # Check critical services
    local critical_services="ssh networking systemd-resolved"
    echo "Critical Services Status:" >> "$health_report"
    for service in $critical_services; do
        if systemctl is-active --quiet "$service"; then
            echo "  ✓ $service: Running" >> "$health_report"
        else
            echo "  ✗ $service: NOT Running" >> "$health_report"
            ((health_issues++))
        fi
    done
    echo >> "$health_report"
    
    # Check filesystem integrity
    echo "Filesystem Check:" >> "$health_report"
    local disk_usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ "$disk_usage" -lt 95 ]; then
        echo "  ✓ Root filesystem: ${disk_usage}% used" >> "$health_report"
    else
        echo "  ✗ Root filesystem: ${disk_usage}% used (Critical)" >> "$health_report"
        ((health_issues++))
    fi
    
    # Check memory usage
    local mem_usage=$(free | grep '^Mem:' | awk '{printf "%.1f", $3/$2 * 100.0}')
    if (( $(echo "$mem_usage < 90" | bc -l) )); then
        echo "  ✓ Memory usage: ${mem_usage}%" >> "$health_report"
    else
        echo "  ✗ Memory usage: ${mem_usage}% (High)" >> "$health_report"
        ((health_issues++))
    fi
    echo >> "$health_report"
    
    # Check for broken packages
    echo "Package Integrity:" >> "$health_report"
    local broken_packages=$(dpkg -l | grep -c "^..[^i]" || echo 0)
    if [ "$broken_packages" -eq 0 ]; then
        echo "  ✓ No broken packages detected" >> "$health_report"
    else
        echo "  ✗ $broken_packages broken packages detected" >> "$health_report"
        dpkg -l | grep "^..[^i]" >> "$health_report"
        ((health_issues++))
    fi
    echo >> "$health_report"
    
    # Check network connectivity
    echo "Network Connectivity:" >> "$health_report"
    if ping -c 1 8.8.8.8 >/dev/null 2>&1; then
        echo "  ✓ External connectivity: OK" >> "$health_report"
    else
        echo "  ✗ External connectivity: Failed" >> "$health_report"
        ((health_issues++))
    fi
    
    # Log health check results
    cat "$health_report" | while read line; do
        log "  $line"
    done
    
    if [ "$health_issues" -eq 0 ]; then
        log "Health check passed - no issues detected"
        return 0
    else
        log "Health check failed - $health_issues issues detected"
        return 1
    fi
}

# Handle service restarts intelligently
manage_service_restarts() {
    log "Managing service restarts"
    
    # Check which services need restart
    local services_to_restart=$(sudo needrestart -p 2>/dev/null | grep "NEEDRESTART-SVC:" | cut -d: -f2 | sort -u)
    
    if [ -z "$services_to_restart" ]; then
        log "No services require restart"
        return 0
    fi
    
    log "Services requiring restart:"
    echo "$services_to_restart" | while read service; do
        log "  - $service"
    done
    
    # Restart services with intelligent ordering
    local critical_services="ssh networking systemd-resolved"
    local standard_services=""
    
    # Separate critical from standard services
    for service in $services_to_restart; do
        if echo "$critical_services" | grep -q "$service"; then
            log "Deferring critical service restart: $service"
        else
            standard_services="$standard_services $service"
        fi
    done
    
    # Restart standard services first
    for service in $standard_services; do
        log "Restarting service: $service"
        if sudo systemctl restart "$service"; then
            sleep "$SERVICE_RESTART_DELAY"
            log "Service restarted successfully: $service"
        else
            log "WARNING: Failed to restart service: $service"
        fi
    done
    
    # Handle critical services (manual intervention may be needed)
    for service in $critical_services; do
        if echo "$services_to_restart" | grep -q "$service"; then
            log "ATTENTION: Critical service $service requires restart"
            send_notification "ATTENTION" "Critical service $service requires manual restart on $(hostname)"
        fi
    done
}

# Reboot management
handle_reboot() {
    # Check if reboot is required
    if [ ! -f /var/run/reboot-required ]; then
        log "No reboot required"
        return 0
    fi
    
    log "System reboot required"
    
    if [ "$AUTO_REBOOT" = "true" ]; then
        if in_maintenance_window; then
            log "Scheduling immediate reboot (within maintenance window)"
            send_notification "INFO" "System rebooting for updates on $(hostname)"
            sudo shutdown -r +2 "System reboot for updates in 2 minutes"
        else
            log "Scheduling reboot for maintenance window: $REBOOT_TIME"
            echo "sudo shutdown -r +1 'Scheduled reboot for updates'" | at "$REBOOT_TIME" 2>/dev/null || {
                log "WARNING: Could not schedule reboot - at command failed"
                send_notification "WARNING" "Could not schedule automatic reboot on $(hostname)"
            }
        fi
    else
        log "Manual reboot required - not automatically rebooting"
        send_notification "MANUAL_ACTION" "Manual reboot required on $(hostname) for updates"
    fi
}

# Rollback to previous state
rollback_updates() {
    local backup_path_file="/tmp/last_update_backup"
    
    if [ ! -f "$backup_path_file" ]; then
        log "ERROR: No backup reference found for rollback"
        return 1
    fi
    
    local backup_path=$(cat "$backup_path_file")
    
    if [ ! -d "$backup_path" ]; then
        log "ERROR: Backup directory not found: $backup_path"
        return 1
    fi
    
    log "Rolling back updates using backup: $backup_path"
    
    # Restore package selections
    if [ -f "$backup_path/debconf_selections.txt" ]; then
        log "Restoring package configurations"
        sudo debconf-set-selections < "$backup_path/debconf_selections.txt"
    fi
    
    # Restore configuration files
    if [ -f "$backup_path/etc_backup.tar.gz" ]; then
        log "Restoring configuration files"
        sudo tar -xzf "$backup_path/etc_backup.tar.gz" -C / 2>/dev/null || true
    fi
    
    # Note: Package version rollback would require more complex logic
    # and is typically handled by holding packages at specific versions
    
    log "Rollback completed - manual verification recommended"
    send_notification "ROLLBACK" "System rollback completed on $(hostname)"
}

# Send notifications
send_notification() {
    local status=$1
    local message=$2
    
    if [ "$EMAIL_NOTIFICATIONS" = "true" ] && [ -n "$NOTIFICATION_EMAIL" ]; then
        local subject="Update Manager [$status] - $(hostname)"
        echo "$message" | mail -s "$subject" "$NOTIFICATION_EMAIL"
        log "Email notification sent"
    fi
    
    # Slack notification
    if [ -n "$SLACK_WEBHOOK" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"[$status] $message\"}" \
            "$SLACK_WEBHOOK" >/dev/null 2>&1 || true
        log "Slack notification sent"
    fi
    
    # Teams notification
    if [ -n "$TEAMS_WEBHOOK" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"[$status] $message\"}" \
            "$TEAMS_WEBHOOK" >/dev/null 2>&1 || true
        log "Teams notification sent"
    fi
}

# Generate update report
generate_report() {
    local report_file="/var/log/update-report-$(date +%Y%m%d-%H%M).txt"
    
    cat << EOF > "$report_file"
System Update Report
===================
Server: $(hostname)
Date: $(date)
Update Mode: $UPDATE_MODE

System Information:
- OS: $(lsb_release -d | cut -f2)
- Kernel: $(uname -r)
- Uptime: $(uptime)

Update Summary:
EOF
    
    if [ -f "/tmp/update_analysis.txt" ]; then
        cat "/tmp/update_analysis.txt" >> "$report_file"
    fi
    
    echo >> "$report_file"
    echo "Post-Update Status:" >> "$report_file"
    
    if [ -f "/tmp/health_check_report.txt" ]; then
        cat "/tmp/health_check_report.txt" >> "$report_file"
    fi
    
    echo >> "$report_file"
    echo "Reboot Status:" >> "$report_file"
    if [ -f /var/run/reboot-required ]; then
        echo "- Reboot required" >> "$report_file"
        if [ -f /var/run/reboot-required.pkgs ]; then
            echo "- Packages requiring reboot:" >> "$report_file"
            cat /var/run/reboot-required.pkgs | sed 's/^/  - /' >> "$report_file"
        fi
    else
        echo "- No reboot required" >> "$report_file"
    fi
    
    log "Update report generated: $report_file"
    
    # Send report via email
    if [ "$EMAIL_NOTIFICATIONS" = "true" ]; then
        mail -s "Update Report - $(hostname)" "$NOTIFICATION_EMAIL" < "$report_file"
    fi
}

# Main update process
main_update_process() {
    log "Starting update process"
    
    # Check if we should run updates now
    if [ "$UPDATE_MODE" != "manual" ] && ! in_maintenance_window; then
        log "Outside maintenance window, skipping automatic updates"
        return 0
    fi
    
    # Create backup
    if ! create_system_backup; then
        log "Backup failed - aborting updates"
        send_notification "ERROR" "Update backup failed on $(hostname)"
        return 1
    fi
    
    # Analyze updates
    if ! analyze_updates; then
        log "No updates available"
        return 0
    fi
    
    # Apply updates
    if ! apply_updates; then
        log "Update application failed"
        if [ "$ROLLBACK_ENABLED" = "true" ]; then
            log "Attempting rollback"
            rollback_updates
        fi
        send_notification "ERROR" "Updates failed on $(hostname)"
        return 1
    fi
    
    # Health check
    if ! health_check; then
        log "Health check failed after updates"
        if [ "$ROLLBACK_ENABLED" = "true" ]; then
            log "Attempting rollback due to health check failure"
            rollback_updates
        fi
        send_notification "ERROR" "Post-update health check failed on $(hostname)"
        return 1
    fi
    
    # Manage service restarts
    manage_service_restarts
    
    # Handle reboot if needed
    handle_reboot
    
    # Generate report
    generate_report
    
    log "Update process completed successfully"
    send_notification "SUCCESS" "Updates completed successfully on $(hostname)"
}

case "${1:-}" in
    "run")
        load_config
        main_update_process
        ;;
    "analyze")
        load_config
        analyze_updates
        cat "/tmp/update_analysis.txt" 2>/dev/null || echo "No analysis available"
        ;;
    "backup")
        load_config
        create_system_backup
        ;;
    "rollback")
        load_config
        rollback_updates
        ;;
    "health-check")
        load_config
        health_check
        cat "/tmp/health_check_report.txt" 2>/dev/null || echo "No health report available"
        ;;
    "report")
        load_config
        generate_report
        ;;
    "simulate")
        load_config
        SIMULATE_UPDATES=true
        main_update_process
        ;;
    *)
        echo "Usage: $0 {run|analyze|backup|rollback|health-check|report|simulate}"
        echo "Examples:"
        echo "  $0 run           # Run full update process"
        echo "  $0 analyze       # Analyze available updates"
        echo "  $0 simulate      # Simulate updates without applying"
        echo "  $0 health-check  # Check system health"
        echo "  $0 rollback      # Rollback last updates"
        exit 1
        ;;
esac
```

### Automated Update Scheduling
```bash
# Setup automated update scheduling
sudo nano /etc/cron.d/update-manager
```

Cron configuration for updates:
```bash
# Update Manager Cron Jobs
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=admin@company.com

# Security updates check (daily)
0 1 * * * root /usr/local/bin/update-manager.sh analyze >> /var/log/update-cron.log 2>&1

# Full update process (weekly, during maintenance window)
0 2 * * 1 root /usr/local/bin/update-manager.sh run >> /var/log/update-cron.log 2>&1

# Health check (daily)
30 6 * * * root /usr/local/bin/update-manager.sh health-check >> /var/log/update-cron.log 2>&1

# Generate weekly report
0 8 * * 1 root /usr/local/bin/update-manager.sh report >> /var/log/update-cron.log 2>&1
```

### Kernel Update Management
```bash
#!/bin/bash
# kernel-manager.sh
set -euo pipefail

LOG_FILE="/var/log/kernel-manager.log"
GRUB_DEFAULT="/etc/default/grub"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# List available kernels
list_kernels() {
    log "Available kernel packages:"
    apt list linux-image-* 2>/dev/null | grep -E "^linux-image-[0-9]" | head -10
    
    log "Installed kernels:"
    dpkg -l | grep linux-image | awk '{print $2, $3}'
    
    log "Current kernel: $(uname -r)"
}

# Install specific kernel version
install_kernel() {
    local kernel_version=$1
    
    log "Installing kernel version: $kernel_version"
    
    # Install kernel and headers
    sudo apt-get install -y \
        "linux-image-$kernel_version" \
        "linux-headers-$kernel_version" \
        "linux-modules-extra-$kernel_version" 2>/dev/null || true
    
    # Update GRUB
    sudo update-grub
    
    log "Kernel $kernel_version installed successfully"
}

# Remove old kernels (keep current + 2 previous)
cleanup_old_kernels() {
    log "Cleaning up old kernels"
    
    local current_kernel=$(uname -r)
    local installed_kernels=($(dpkg -l | grep linux-image | grep -E "^ii" | awk '{print $2}' | grep -E "linux-image-[0-9]" | sort -V))
    local kernels_to_keep=3
    
    if [ ${#installed_kernels[@]} -le $kernels_to_keep ]; then
        log "Only ${#installed_kernels[@]} kernels installed, nothing to clean"
        return 0
    fi
    
    # Keep current kernel and newest ones
    local kernels_to_remove=()
    local keep_count=0
    
    # Start from the newest and work backwards
    for ((i=${#installed_kernels[@]}-1; i>=0; i--)); do
        local kernel_package=${installed_kernels[i]}
        local kernel_version=$(echo "$kernel_package" | sed 's/linux-image-//')
        
        if [[ "$kernel_version" == "$current_kernel" ]] || [ $keep_count -lt $((kernels_to_keep-1)) ]; then
            log "Keeping kernel: $kernel_package"
            ((keep_count++))
        else
            kernels_to_remove+=("$kernel_package")
        fi
    done
    
    # Remove old kernels
    for kernel_package in "${kernels_to_remove[@]}"; do
        log "Removing old kernel: $kernel_package"
        sudo apt-get purge -y "$kernel_package"
        
        # Also remove associated packages
        local kernel_version=$(echo "$kernel_package" | sed 's/linux-image-//')
        sudo apt-get purge -y \
            "linux-headers-$kernel_version" \
            "linux-modules-extra-$kernel_version" 2>/dev/null || true
    done
    
    # Update GRUB
    sudo update-grub
    
    log "Kernel cleanup completed"
}

# Configure GRUB for kernel selection
configure_grub() {
    local default_kernel=${1:-""}
    
    log "Configuring GRUB"
    
    # Backup current GRUB config
    sudo cp "$GRUB_DEFAULT" "$GRUB_DEFAULT.backup.$(date +%s)"
    
    # Set GRUB timeout for kernel selection
    sudo sed -i 's/^GRUB_TIMEOUT=.*/GRUB_TIMEOUT=10/' "$GRUB_DEFAULT"
    
    # Enable GRUB menu
    sudo sed -i 's/^GRUB_TIMEOUT_STYLE=.*/GRUB_TIMEOUT_STYLE=menu/' "$GRUB_DEFAULT"
    
    if [ -n "$default_kernel" ]; then
        # Set specific kernel as default
        local grub_entry=$(grep -n "menuentry.*$default_kernel" /boot/grub/grub.cfg | head -1 | cut -d: -f1)
        if [ -n "$grub_entry" ]; then
            sudo sed -i "s/^GRUB_DEFAULT=.*/GRUB_DEFAULT=$((grub_entry-1))/" "$GRUB_DEFAULT"
            log "Set default kernel to: $default_kernel (entry $grub_entry)"
        fi
    fi
    
    # Update GRUB configuration
    sudo update-grub
    
    log "GRUB configuration updated"
}

# Test kernel boot (requires reboot)
test_kernel_boot() {
    local test_kernel=$1
    
    log "Preparing kernel boot test for: $test_kernel"
    
    # Set test kernel as next boot option
    configure_grub "$test_kernel"
    
    # Schedule health check after potential reboot
    cat << 'EOF' > /tmp/kernel-test-check.sh
#!/bin/bash
# Post-reboot kernel test check
current_kernel=$(uname -r)
expected_kernel="TEST_KERNEL"

if [[ "$current_kernel" == *"$expected_kernel"* ]]; then
    echo "Kernel test successful: $current_kernel" | logger -t kernel-test
    # Restore normal GRUB config here if needed
else
    echo "Kernel test failed: expected $expected_kernel, got $current_kernel" | logger -t kernel-test
fi
EOF
    sed -i "s/TEST_KERNEL/$test_kernel/" /tmp/kernel-test-check.sh
    chmod +x /tmp/kernel-test-check.sh
    
    # Schedule the check to run after reboot
    echo "@reboot /tmp/kernel-test-check.sh" | crontab -
    
    log "Kernel test prepared. Reboot required to test kernel: $test_kernel"
    log "Health check will run automatically after reboot"
}

# Rollback to previous kernel
rollback_kernel() {
    log "Rolling back to previous kernel"
    
    local current_kernel=$(uname -r)
    local installed_kernels=($(dpkg -l | grep linux-image | grep -E "^ii" | awk '{print $2}' | grep -E "linux-image-[0-9]" | sort -V))
    
    # Find previous kernel (second newest)
    local previous_kernel=""
    for ((i=${#installed_kernels[@]}-1; i>=0; i--)); do
        local kernel_version=$(echo "${installed_kernels[i]}" | sed 's/linux-image-//')
        if [[ "$kernel_version" != "$current_kernel" ]]; then
            previous_kernel="$kernel_version"
            break
        fi
    done
    
    if [ -z "$previous_kernel" ]; then
        log "ERROR: No previous kernel found for rollback"
        return 1
    fi
    
    log "Rolling back to kernel: $previous_kernel"
    configure_grub "$previous_kernel"
    
    log "Kernel rollback configured. Reboot required to activate: $previous_kernel"
}

case "${1:-}" in
    "list")
        list_kernels
        ;;
    "install")
        install_kernel "$2"
        ;;
    "cleanup")
        cleanup_old_kernels
        ;;
    "configure-grub")
        configure_grub "${2:-}"
        ;;
    "test")
        test_kernel_boot "$2"
        ;;
    "rollback")
        rollback_kernel
        ;;
    *)
        echo "Usage: $0 {list|install|cleanup|configure-grub|test|rollback} [kernel_version]"
        echo "Examples:"
        echo "  $0 list                              # List available and installed kernels"
        echo "  $0 install 6.1.0-13-amd64          # Install specific kernel version"
        echo "  $0 cleanup                          # Remove old kernel versions"
        echo "  $0 configure-grub 6.1.0-13-amd64   # Set default kernel in GRUB"
        echo "  $0 test 6.1.0-13-amd64             # Test kernel boot"
        echo "  $0 rollback                         # Rollback to previous kernel"
        exit 1
        ;;
esac
```

### Enterprise Patch Management System
```bash
#!/bin/bash
# enterprise-patch-manager.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="/etc/patch-manager/enterprise.conf"
LOG_FILE="/var/log/enterprise-patch-manager.log"
PATCH_DB="/var/lib/patch-manager/patches.db"
INVENTORY_FILE="/var/lib/patch-manager/inventory.json"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') [$$] $1" | tee -a "$LOG_FILE"
}

# Load enterprise configuration
load_enterprise_config() {
    if [ -f "$CONFIG_FILE" ]; then
        source "$CONFIG_FILE"
    else
        create_enterprise_config
        source "$CONFIG_FILE"
    fi
}

create_enterprise_config() {
    sudo mkdir -p /etc/patch-manager /var/lib/patch-manager
    cat << 'EOF' > "$CONFIG_FILE"
# Enterprise Patch Management Configuration
ORGANIZATION="Company Name"
ENVIRONMENT="production"  # development, staging, production
PATCH_GROUP="web-servers"  # web-servers, db-servers, app-servers

# Patch approval workflow
REQUIRE_APPROVAL=true
APPROVAL_ENDPOINT="https://patch-approval.company.com/api/approve"
APPROVAL_TOKEN="your-api-token"

# Compliance requirements
COMPLIANCE_FRAMEWORK="SOC2"  # SOC2, HIPAA, PCI-DSS, ISO27001
MAX_PATCH_DELAY_DAYS=30
CRITICAL_PATCH_DELAY_HOURS=24

# Notification settings
NOTIFICATION_WEBHOOK="https://notifications.company.com/webhook"
SLACK_CHANNEL="#infrastructure"
EMAIL_DISTRIBUTION="infra-team@company.com,security-team@company.com"

# Rollback settings
AUTOMATIC_ROLLBACK=true
ROLLBACK_TRIGGER_THRESHOLD=2  # Number of failed health checks

# Maintenance windows
MAINTENANCE_WINDOWS="Saturday 02:00-06:00,Sunday 02:00-06:00"
EMERGENCY_MAINTENANCE_ENABLED=true

# Integration settings
CMDB_ENDPOINT="https://cmdb.company.com/api"
MONITORING_ENDPOINT="https://monitoring.company.com/api"
TICKETING_ENDPOINT="https://tickets.company.com/api"
EOF
    
    log "Created enterprise configuration at $CONFIG_FILE"
}

# Initialize patch database
initialize_patch_db() {
    log "Initializing patch database"
    
    cat << 'EOF' > "$PATCH_DB"
# Patch Database
# Format: patch_id|severity|description|status|applied_date|approval_status
EOF
    
    chmod 600 "$PATCH_DB"
    log "Patch database initialized"
}

# Create system inventory
create_system_inventory() {
    log "Creating system inventory"
    
    cat << EOF > "$INVENTORY_FILE"
{
    "hostname": "$(hostname)",
    "environment": "$ENVIRONMENT",
    "patch_group": "$PATCH_GROUP",
    "os_version": "$(lsb_release -d | cut -f2)",
    "kernel_version": "$(uname -r)",
    "last_inventory_update": "$(date -Iseconds)",
    "installed_packages": [
EOF
    
    # Add installed packages to inventory
    dpkg -l | awk '/^ii/ {print "        {\"name\": \"" $2 "\", \"version\": \"" $3 "\"}"}' | head -100 >> "$INVENTORY_FILE"
    
    cat << 'EOF' >> "$INVENTORY_FILE"
    ],
    "services": [
EOF
    
    # Add running services to inventory
    systemctl list-units --type=service --state=active --no-pager --no-legend | \
        awk '{print "        {\"name\": \"" $1 "\", \"state\": \"" $3 "\"}"}' | head -20 >> "$INVENTORY_FILE"
    
    cat << 'EOF' >> "$INVENTORY_FILE"
    ]
}
EOF
    
    log "System inventory created"
}

# Check patch approval status
check_patch_approval() {
    local patch_id=$1
    
    if [ "$REQUIRE_APPROVAL" != "true" ]; then
        echo "approved"
        return 0
    fi
    
    log "Checking approval status for patch: $patch_id"
    
    local approval_response=$(curl -s -X GET \
        -H "Authorization: Bearer $APPROVAL_TOKEN" \
        "$APPROVAL_ENDPOINT/status/$patch_id" || echo "error")
    
    if echo "$approval_response" | grep -q "approved"; then
        echo "approved"
    elif echo "$approval_response" | grep -q "pending"; then
        echo "pending"
    elif echo "$approval_response" | grep -q "rejected"; then
        echo "rejected"
    else
        echo "unknown"
    fi
}

# Submit patch for approval
submit_patch_approval() {
    local patch_id=$1
    local severity=$2
    local description=$3
    
    if [ "$REQUIRE_APPROVAL" != "true" ]; then
        return 0
    fi
    
    log "Submitting patch for approval: $patch_id"
    
    local payload=$(cat << EOF
{
    "patch_id": "$patch_id",
    "hostname": "$(hostname)",
    "environment": "$ENVIRONMENT",
    "patch_group": "$PATCH_GROUP",
    "severity": "$severity",
    "description": "$description",
    "compliance_framework": "$COMPLIANCE_FRAMEWORK",
    "requested_by": "$(whoami)",
    "request_time": "$(date -Iseconds)"
}
EOF
    )
    
    curl -s -X POST \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $APPROVAL_TOKEN" \
        -d "$payload" \
        "$APPROVAL_ENDPOINT/submit" || {
        log "ERROR: Failed to submit patch approval request"
        return 1
    }
    
    log "Patch approval request submitted: $patch_id"
}

# Analyze patch compliance
analyze_patch_compliance() {
    log "Analyzing patch compliance"
    
    local compliance_report="/tmp/patch_compliance_report.txt"
    
    echo "Patch Compliance Report - $(date)" > "$compliance_report"
    echo "=================================" >> "$compliance_report"
    echo "Organization: $ORGANIZATION" >> "$compliance_report"
    echo "Environment: $ENVIRONMENT" >> "$compliance_report"
    echo "Compliance Framework: $COMPLIANCE_FRAMEWORK" >> "$compliance_report"
    echo "Server: $(hostname)" >> "$compliance_report"
    echo >> "$compliance_report"
    
    # Check for overdue patches
    echo "Overdue Patches Analysis:" >> "$compliance_report"
    local overdue_patches=0
    local critical_overdue=0
    
    # Simulate patch age analysis (would integrate with actual patch data)
    local current_timestamp=$(date +%s)
    local max_patch_delay_seconds=$((MAX_PATCH_DELAY_DAYS * 24 * 3600))
    local critical_patch_delay_seconds=$((CRITICAL_PATCH_DELAY_HOURS * 3600))
    
    # Check security updates
    local security_updates=$(apt list --upgradable 2>/dev/null | grep -i security | wc -l)
    if [ "$security_updates" -gt 0 ]; then
        echo "  - $security_updates security updates available" >> "$compliance_report"
        ((overdue_patches += security_updates))
        
        # Assume critical if security updates are available for more than threshold
        if [ "$security_updates" -gt 5 ]; then
            ((critical_overdue += 1))
        fi
    fi
    
    echo "  - Total overdue patches: $overdue_patches" >> "$compliance_report"
    echo "  - Critical overdue patches: $critical_overdue" >> "$compliance_report"
    echo >> "$compliance_report"
    
    # Compliance status
    if [ "$overdue_patches" -eq 0 ]; then
        echo "Compliance Status: COMPLIANT" >> "$compliance_report"
    elif [ "$critical_overdue" -gt 0 ]; then
        echo "Compliance Status: NON-COMPLIANT (Critical)" >> "$compliance_report"
    else
        echo "Compliance Status: NON-COMPLIANT (Warning)" >> "$compliance_report"
    fi
    
    # Log compliance report
    cat "$compliance_report" | while read line; do
        log "  $line"
    done
    
    # Send compliance report
    send_enterprise_notification "COMPLIANCE" "$(cat $compliance_report)"
}

# Send enterprise notifications
send_enterprise_notification() {
    local notification_type=$1
    local message=$2
    
    log "Sending enterprise notification: $notification_type"
    
    # Webhook notification
    if [ -n "$NOTIFICATION_WEBHOOK" ]; then
        local payload=$(cat << EOF
{
    "type": "$notification_type",
    "hostname": "$(hostname)",
    "environment": "$ENVIRONMENT",
    "patch_group": "$PATCH_GROUP",
    "timestamp": "$(date -Iseconds)",
    "message": "$message"
}
EOF
        )
        
        curl -s -X POST \
            -H "Content-Type: application/json" \
            -d "$payload" \
            "$NOTIFICATION_WEBHOOK" || true
    fi
    
    # Slack notification
    if [ -n "$SLACK_CHANNEL" ]; then
        local slack_message="[$notification_type] $(hostname) - $ENVIRONMENT: $message"
        curl -s -X POST \
            -H "Content-Type: application/json" \
            -d "{\"channel\": \"$SLACK_CHANNEL\", \"text\": \"$slack_message\"}" \
            "$NOTIFICATION_WEBHOOK" || true
    fi
    
    # Email notification
    if [ -n "$EMAIL_DISTRIBUTION" ]; then
        echo "$message" | mail -s "[$notification_type] Patch Management - $(hostname)" "$EMAIL_DISTRIBUTION"
    fi
}

# Enterprise patch deployment workflow
enterprise_patch_deployment() {
    log "Starting enterprise patch deployment workflow"
    
    # Create change ticket
    local change_ticket=$(create_change_ticket)
    log "Change ticket created: $change_ticket"
    
    # Analyze patches and submit for approval
    local patches_pending_approval=()
    local security_updates=$(apt list --upgradable 2>/dev/null | grep -i security)
    
    if [ -n "$security_updates" ]; then
        while IFS= read -r update; do
            local package_name=$(echo "$update" | cut -d'/' -f1)
            local patch_id="SEC-$(date +%Y%m%d)-$package_name"
            
            # Submit for approval
            submit_patch_approval "$patch_id" "security" "$update"
            patches_pending_approval+=("$patch_id")
            
            # Record in patch database
            echo "$patch_id|security|$update|pending|$(date -Iseconds)|submitted" >> "$PATCH_DB"
        done <<< "$security_updates"
    fi
    
    # Wait for approvals (in real implementation, this would be event-driven)
    log "Waiting for patch approvals..."
    local all_approved=false
    local approval_timeout=3600  # 1 hour timeout
    local elapsed_time=0
    
    while [ "$all_approved" = false ] && [ "$elapsed_time" -lt "$approval_timeout" ]; do
        all_approved=true
        
        for patch_id in "${patches_pending_approval[@]}"; do
            local approval_status=$(check_patch_approval "$patch_id")
            
            if [ "$approval_status" = "approved" ]; then
                log "Patch approved: $patch_id"
                sed -i "s/|$patch_id|.*|submitted$/|$patch_id|security|approved|$(date -Iseconds)|approved/" "$PATCH_DB"
            elif [ "$approval_status" = "rejected" ]; then
                log "Patch rejected: $patch_id"
                sed -i "s/|$patch_id|.*|submitted$/|$patch_id|security|rejected|$(date -Iseconds)|rejected/" "$PATCH_DB"
            elif [ "$approval_status" = "pending" ]; then
                all_approved=false
            fi
        done
        
        if [ "$all_approved" = false ]; then
            sleep 60
            ((elapsed_time += 60))
        fi
    done
    
    if [ "$all_approved" = true ]; then
        log "All patches approved, proceeding with deployment"
        
        # Execute the actual update process
        /usr/local/bin/update-manager.sh run
        
        # Update change ticket
        update_change_ticket "$change_ticket" "completed"
        
        send_enterprise_notification "SUCCESS" "Enterprise patch deployment completed successfully"
    else
        log "Patch approval timeout or rejections, aborting deployment"
        update_change_ticket "$change_ticket" "aborted"
        send_enterprise_notification "ABORTED" "Enterprise patch deployment aborted due to approval issues"
    fi
}

# Create change management ticket
create_change_ticket() {
    if [ -z "$TICKETING_ENDPOINT" ]; then
        echo "NO_TICKET_SYSTEM"
        return 0
    fi
    
    local payload=$(cat << EOF
{
    "title": "Automated Patch Deployment - $(hostname)",
    "description": "Automated patch deployment for $ENVIRONMENT environment",
    "category": "patch_management",
    "priority": "medium",
    "environment": "$ENVIRONMENT",
    "hostname": "$(hostname)",
    "requested_by": "patch-automation",
    "scheduled_time": "$(date -Iseconds)"
}
EOF
    )
    
    local response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "$TICKETING_ENDPOINT/tickets" || echo '{"id": "ERROR"}')
    
    echo "$response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4
}

# Update change management ticket
update_change_ticket() {
    local ticket_id=$1
    local status=$2
    
    if [ "$ticket_id" = "NO_TICKET_SYSTEM" ] || [ "$ticket_id" = "ERROR" ]; then
        return 0
    fi
    
    local payload=$(cat << EOF
{
    "status": "$status",
    "completion_time": "$(date -Iseconds)",
    "notes": "Automated update via enterprise patch management system"
}
EOF
    )
    
    curl -s -X PATCH \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "$TICKETING_ENDPOINT/tickets/$ticket_id" || true
}

# Generate enterprise patch report
generate_enterprise_report() {
    local report_file="/var/log/enterprise-patch-report-$(date +%Y%m%d).json"
    
    cat << EOF > "$report_file"
{
    "report_metadata": {
        "hostname": "$(hostname)",
        "environment": "$ENVIRONMENT",
        "patch_group": "$PATCH_GROUP",
        "organization": "$ORGANIZATION",
        "compliance_framework": "$COMPLIANCE_FRAMEWORK",
        "report_date": "$(date -Iseconds)",
        "report_type": "enterprise_patch_status"
    },
    "system_info": {
        "os_version": "$(lsb_release -d | cut -f2)",
        "kernel_version": "$(uname -r)",
        "uptime": "$(uptime -p)",
        "last_reboot": "$(who -b | awk '{print $3, $4}')"
    },
    "patch_status": {
        "total_packages": $(dpkg -l | grep -c "^ii"),
        "available_updates": $(apt list --upgradable 2>/dev/null | grep -c "upgradable"),
        "security_updates": $(apt list --upgradable 2>/dev/null | grep -c -i security),
        "last_update": "$(stat -c %y /var/log/apt/history.log 2>/dev/null | cut -d'.' -f1 || echo 'unknown')"
    },
    "compliance_status": {
        "framework": "$COMPLIANCE_FRAMEWORK",
        "max_patch_delay_days": $MAX_PATCH_DELAY_DAYS,
        "critical_patch_delay_hours": $CRITICAL_PATCH_DELAY_HOURS,
        "requires_approval": $REQUIRE_APPROVAL
    }
}
EOF
    
    log "Enterprise patch report generated: $report_file"
    
    # Send report to centralized system
    if [ -n "$CMDB_ENDPOINT" ]; then
        curl -s -X POST \
            -H "Content-Type: application/json" \
            -d "@$report_file" \
            "$CMDB_ENDPOINT/patch-reports" || true
    fi
}

case "${1:-}" in
    "init")
        load_enterprise_config
        initialize_patch_db
        create_system_inventory
        log "Enterprise patch management initialized"
        ;;
    "deploy")
        load_enterprise_config
        enterprise_patch_deployment
        ;;
    "compliance")
        load_enterprise_config
        analyze_patch_compliance
        ;;
    "report")
        load_enterprise_config
        generate_enterprise_report
        ;;
    "inventory")
        load_enterprise_config
        create_system_inventory
        ;;
    *)
        echo "Usage: $0 {init|deploy|compliance|report|inventory}"
        echo "Examples:"
        echo "  $0 init        # Initialize enterprise patch management"
        echo "  $0 deploy      # Run enterprise patch deployment workflow"
        echo "  $0 compliance  # Analyze patch compliance status"
        echo "  $0 report      # Generate enterprise patch report"
        echo "  $0 inventory   # Update system inventory"
        exit 1
        ;;
esac
```

## Configuration Examples

### Unattended Upgrades Advanced Configuration
```bash
# Advanced unattended upgrades configuration
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

Complete unattended upgrades configuration:
```bash
// Unattended-Upgrade::Origins-Pattern controls which packages are upgraded
Unattended-Upgrade::Origins-Pattern {
    // Codename based matching:
    "origin=Debian,codename=${distro_codename}-updates";
    "origin=Debian,codename=${distro_codename}-proposed-updates";
    "origin=Debian,codename=${distro_codename},label=Debian";
    "origin=Debian,codename=${distro_codename},label=Debian-Security";
    "origin=Debian,codename=${distro_codename}-security,label=Debian-Security";
};

// List of packages to not update (regexp are supported)
Unattended-Upgrade::Package-Blacklist {
    // Kernel packages (manage separately)
    "linux-.*";
    
    // Database packages (require manual intervention)
    "mysql-server.*";
    "postgresql-.*";
    "mariadb-server.*";
    
    // Web servers (may need configuration updates)
    "apache2";
    "nginx";
    
    // Critical system packages
    "systemd";
    "udev";
    "grub.*";
    
    // Custom applications
    "company-.*";
};

// Split the upgrade into the smallest possible chunks
Unattended-Upgrade::MinimalSteps "true";

// Install all updates when the machine is shutting down
Unattended-Upgrade::InstallOnShutdown "false";

// Send email to this address for problems or packages upgrades
Unattended-Upgrade::Mail "admin@company.com";

// Set this value to one (or more) of the following:
// "on-change" : email when packages are upgraded
// "only-on-error" : email only on errors
// "always" : always send email
Unattended-Upgrade::MailReport "on-change";

// Remove unused automatically installed kernel-related packages
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";

// Do automatic removal of newly unused dependencies after the upgrade
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";

// Do automatic removal of unused packages after the upgrade
Unattended-Upgrade::Remove-Unused-Dependencies "false";

// Automatically reboot *WITHOUT CONFIRMATION* if needed
Unattended-Upgrade::Automatic-Reboot "false";

// Automatically reboot even if there are users currently logged in
Unattended-Upgrade::Automatic-Reboot-WithUsers "false";

// If automatic reboot is enabled and needed, reboot at the specific time
Unattended-Upgrade::Automatic-Reboot-Time "02:00";

// Use apt bandwidth limit feature
Acquire::http::Dl-Limit "1000";

// Enable logging to syslog
Unattended-Upgrade::SyslogEnable "true";

// Specify syslog facility
Unattended-Upgrade::SyslogFacility "daemon";

// Download and install upgrades only on AC power
Unattended-Upgrade::OnlyOnACPower "false";

// Download and install upgrades only on non-metered connection
Unattended-Upgrade::Skip-Updates-On-Metered-Connections "false";

// Verbose logging
Unattended-Upgrade::Verbose "false";

// Print debugging information
Unattended-Upgrade::Debug "false";

// Allow package downgrade if Pin-Priority exceeds 1000
Unattended-Upgrade::Allow-downgrade "false";

// When APT fails to mark a package to be upgraded or installed try adjusting
// candidates of related packages to satisfy dependencies
Unattended-Upgrade::Allow-APT-Mark-Fallback "true";
```

### APT Preferences for Version Pinning
```bash
# Package version pinning
sudo nano /etc/apt/preferences.d/custom-pins
```

APT preferences configuration:
```bash
# Pin specific packages to prevent unwanted upgrades
Package: mysql-server*
Pin: version 8.0.*
Pin-Priority: 1001

Package: postgresql*
Pin: version 13.*
Pin-Priority: 1001

# Pin kernel versions
Package: linux-image*
Pin: version 6.1.0-13*
Pin-Priority: 1001

# Prefer packages from specific repository
Package: *
Pin: origin "apt.company.com"
Pin-Priority: 900

# Lower priority for experimental packages
Package: *
Pin: release a=experimental
Pin-Priority: 1

# Hold specific packages
Package: company-legacy-app
Pin: version 1.2.3
Pin-Priority: 1001
```

### Automated Testing Pipeline
```bash
#!/bin/bash
# update-testing-pipeline.sh
# Automated testing after updates

TEST_SUITE_DIR="/opt/update-tests"
TEST_RESULTS_DIR="/var/log/update-tests"

# Create test environment
setup_test_environment() {
    mkdir -p "$TEST_RESULTS_DIR"
    
    # Basic system tests
    cat << 'EOF' > "$TEST_SUITE_DIR/001-system-health.sh"
#!/bin/bash
# Basic system health checks
echo "Testing system health..."

# Check critical services
services=("ssh" "systemd-resolved" "cron")
for service in "${services[@]}"; do
    if systemctl is-active --quiet "$service"; then
        echo "PASS: $service is running"
    else
        echo "FAIL: $service is not running"
        exit 1
    fi
done

# Check disk space
disk_usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$disk_usage" -lt 95 ]; then
    echo "PASS: Disk usage is acceptable ($disk_usage%)"
else
    echo "FAIL: Disk usage is critical ($disk_usage%)"
    exit 1
fi

echo "System health check completed successfully"
EOF

    # Network connectivity test
    cat << 'EOF' > "$TEST_SUITE_DIR/002-network-test.sh"
#!/bin/bash
# Network connectivity tests
echo "Testing network connectivity..."

# Test DNS resolution
if nslookup google.com >/dev/null 2>&1; then
    echo "PASS: DNS resolution working"
else
    echo "FAIL: DNS resolution failed"
    exit 1
fi

# Test internet connectivity
if ping -c 1 8.8.8.8 >/dev/null 2>&1; then
    echo "PASS: Internet connectivity working"
else
    echo "FAIL: Internet connectivity failed"
    exit 1
fi

echo "Network test completed successfully"
EOF

    # Application-specific tests
    cat << 'EOF' > "$TEST_SUITE_DIR/003-application-test.sh"
#!/bin/bash
# Application-specific tests
echo "Testing applications..."

# Test web server
if command -v nginx >/dev/null; then
    if systemctl is-active --quiet nginx; then
        echo "PASS: Nginx is running"
        
        # Test HTTP response
        if curl -f http://localhost/ >/dev/null 2>&1; then
            echo "PASS: Web server responding"
        else
            echo "FAIL: Web server not responding"
            exit 1
        fi
    else
        echo "FAIL: Nginx is not running"
        exit 1
    fi
fi

# Test database
if command -v mysql >/dev/null; then
    if systemctl is-active --quiet mysql; then
        echo "PASS: MySQL is running"
    else
        echo "FAIL: MySQL is not running"
        exit 1
    fi
fi

echo "Application test completed successfully"
EOF

    chmod +x "$TEST_SUITE_DIR"/*.sh
}

# Run test suite
run_tests() {
    local test_session="test-$(date +%Y%m%d-%H%M%S)"
    local test_log="$TEST_RESULTS_DIR/$test_session.log"
    
    echo "Starting test suite: $test_session" | tee "$test_log"
    
    local failed_tests=0
    local total_tests=0
    
    for test_script in "$TEST_SUITE_DIR"/*.sh; do
        if [ -f "$test_script" ]; then
            local test_name=$(basename "$test_script" .sh)
            echo "Running test: $test_name" | tee -a "$test_log"
            
            ((total_tests++))
            
            if timeout 300 "$test_script" >> "$test_log" 2>&1; then
                echo "✓ Test passed: $test_name" | tee -a "$test_log"
            else
                echo "✗ Test failed: $test_name" | tee -a "$test_log"
                ((failed_tests++))
            fi
        fi
    done
    
    echo "Test suite completed: $failed_tests/$total_tests tests failed" | tee -a "$test_log"
    
    if [ "$failed_tests" -eq 0 ]; then
        echo "All tests passed!"
        return 0
    else
        echo "Some tests failed!"
        return 1
    fi
}

# Setup and run tests
setup_test_environment
run_tests
```

## Security Considerations

### Security Update Prioritization
```bash
#!/bin/bash
# security-update-prioritizer.sh
# Prioritize and categorize security updates

SECURITY_LOG="/var/log/security-updates.log"
CVE_DATABASE="/var/lib/security/cve-database.json"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$SECURITY_LOG"
}

# Analyze security vulnerabilities
analyze_security_updates() {
    log "Analyzing security updates"
    
    # Get security updates
    local security_updates=$(apt list --upgradable 2>/dev/null | grep -i security)
    
    if [ -z "$security_updates" ]; then
        log "No security updates available"
        return 0
    fi
    
    echo "$security_updates" | while IFS= read -r update; do
        local package=$(echo "$update" | cut -d'/' -f1)
        local version=$(echo "$update" | awk '{print $2}')
        
        # Check CVE database for severity
        local severity=$(check_cve_severity "$package" "$version")
        
        case "$severity" in
            "CRITICAL")
                log "CRITICAL security update: $package $version"
                schedule_immediate_update "$package"
                ;;
            "HIGH")
                log "HIGH security update: $package $version"
                schedule_priority_update "$package"
                ;;
            "MEDIUM")
                log "MEDIUM security update: $package $version"
                schedule_standard_update "$package"
                ;;
            "LOW")
                log "LOW security update: $package $version"
                schedule_maintenance_update "$package"
                ;;
            *)
                log "UNKNOWN security update: $package $version"
                schedule_standard_update "$package"
                ;;
        esac
    done
}

check_cve_severity() {
    local package=$1
    local version=$2
    
    # Simulate CVE database lookup (integrate with actual CVE feeds)
    # In real implementation, this would query NVD, MITRE, or vendor databases
    
    if [ -f "$CVE_DATABASE" ]; then
        # Query local CVE database
        local cve_info=$(grep -i "$package" "$CVE_DATABASE" | head -1)
        if [ -n "$cve_info" ]; then
            echo "$cve_info" | jq -r '.severity' 2>/dev/null || echo "MEDIUM"
        else
            echo "MEDIUM"
        fi
    else
        # Default to MEDIUM if no CVE database available
        echo "MEDIUM"
    fi
}

schedule_immediate_update() {
    local package=$1
    log "Scheduling immediate update for critical package: $package"
    
    # Apply update immediately
    sudo DEBIAN_FRONTEND=noninteractive apt-get install --only-upgrade -y "$package"
    
    # Send critical alert
    echo "CRITICAL security update applied: $package on $(hostname)" | \
        mail -s "CRITICAL Security Update - $(hostname)" admin@company.com
}

schedule_priority_update() {
    local package=$1
    log "Scheduling priority update for high-risk package: $package"
    
    # Schedule within 4 hours
    echo "sudo apt-get install --only-upgrade -y $package" | at now + 4 hours
}

schedule_standard_update() {
    local package=$1
    log "Scheduling standard update for package: $package"
    
    # Schedule during next maintenance window
    echo "$package" >> /tmp/standard_updates_queue
}

schedule_maintenance_update() {
    local package=$1
    log "Scheduling maintenance update for low-risk package: $package"
    
    # Schedule for next weekend maintenance
    echo "$package" >> /tmp/maintenance_updates_queue
}
```

### Update Validation and Verification
```bash
#!/bin/bash
# update-validation.sh
# Validate updates before and after installation

VALIDATION_LOG="/var/log/update-validation.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$VALIDATION_LOG"
}

# Pre-update validation
pre_update_validation() {
    log "Running pre-update validation"
    
    # Check package integrity
    if ! apt-get check; then
        log "ERROR: Package system integrity check failed"
        return 1
    fi
    
    # Verify package signatures
    local unsigned_packages=$(apt list --upgradable 2>/dev/null | grep -i "not authenticated")
    if [ -n "$unsigned_packages" ]; then
        log "WARNING: Unsigned packages detected:"
        echo "$unsigned_packages" | while read pkg; do
            log "  - $pkg"
        done
    fi
    
    # Check available disk space
    local free_space=$(df / | tail -1 | awk '{print $4}')
    local required_space=1048576  # 1GB in KB
    
    if [ "$free_space" -lt "$required_space" ]; then
        log "ERROR: Insufficient disk space for updates"
        return 1
    fi
    
    # Verify repository signatures
    if ! apt-get update 2>&1 | grep -q "Reading package lists"; then
        log "ERROR: Repository update failed"
        return 1
    fi
    
    log "Pre-update validation passed"
    return 0
}

# Post-update validation
post_update_validation() {
    log "Running post-update validation"
    
    # Check for broken packages
    local broken_packages=$(dpkg -l | grep -c "^.[^i]" || echo 0)
    if [ "$broken_packages" -gt 0 ]; then
        log "ERROR: $broken_packages broken packages detected after update"
        dpkg -l | grep "^.[^i]" | while read line; do
            log "  Broken: $line"
        done
        return 1
    fi
    
    # Verify critical file checksums
    if command -v debsums >/dev/null; then
        log "Verifying package file checksums"
        local checksum_failures=$(debsums -s 2>/dev/null | wc -l)
        if [ "$checksum_failures" -gt 0 ]; then
            log "WARNING: $checksum_failures checksum mismatches detected"
            debsums -s 2>/dev/null | head -10 | while read line; do
                log "  Checksum mismatch: $line"
            done
        fi
    fi
    
    # Check system configuration
    if ! systemd-analyze verify >/dev/null 2>&1; then
        log "WARNING: systemd configuration issues detected"
    fi
    
    # Verify essential services
    local essential_services=("ssh" "systemd-resolved" "networking")
    for service in "${essential_services[@]}"; do
        if ! systemctl is-active --quiet "$service"; then
            log "ERROR: Essential service not running after update: $service"
            return 1
        fi
    done
    
    log "Post-update validation passed"
    return 0
}

# Package signature verification
verify_package_signatures() {
    log "Verifying package signatures"
    
    # Check if debsig-verify is available
    if ! command -v debsig-verify >/dev/null; then
        log "WARNING: debsig-verify not available, skipping signature verification"
        return 0
    fi
    
    # Get list of packages to be updated
    local packages_to_update=$(apt list --upgradable 2>/dev/null | grep -v "Listing" | cut -d'/' -f1)
    
    # Download packages without installing
    local temp_dir="/tmp/package-verification-$$"
    mkdir -p "$temp_dir"
    
    echo "$packages_to_update" | while read package; do
        if [ -n "$package" ]; then
            log "Downloading package for verification: $package"
            apt-get download "$package" -o Dir::Cache::Archives="$temp_dir/" >/dev/null 2>&1
        fi
    done
    
    # Verify signatures of downloaded packages
    local verification_failures=0
    for deb_file in "$temp_dir"/*.deb; do
        if [ -f "$deb_file" ]; then
            if debsig-verify "$deb_file" >/dev/null 2>&1; then
                log "Signature verified: $(basename $deb_file)"
            else
                log "WARNING: Signature verification failed: $(basename $deb_file)"
                ((verification_failures++))
            fi
        fi
    done
    
    # Cleanup
    rm -rf "$temp_dir"
    
    if [ "$verification_failures" -gt 0 ]; then
        log "WARNING: $verification_failures packages failed signature verification"
        return 1
    fi
    
    log "All package signatures verified successfully"
    return 0
}

case "${1:-}" in
    "pre")
        pre_update_validation
        ;;
    "post")
        post_update_validation
        ;;
    "signatures")
        verify_package_signatures
        ;;
    "all")
        if pre_update_validation && verify_package_signatures; then
            log "Pre-update validation completed successfully"
            exit 0
        else
            log "Pre-update validation failed"
            exit 1
        fi
        ;;
    *)
        echo "Usage: $0 {pre|post|signatures|all}"
        exit 1
        ;;
esac
```

## Quick Reference

### Essential Update Commands
```bash
# Basic update operations
sudo apt update                    # Update package lists
sudo apt upgrade                   # Upgrade packages
sudo apt full-upgrade              # Full system upgrade
sudo apt dist-upgrade              # Distribution upgrade
sudo apt autoremove               # Remove unused packages
sudo apt autoclean                # Clean package cache

# Security updates
sudo unattended-upgrade --dry-run  # Test security updates
sudo unattended-upgrade            # Apply security updates
apt list --upgradable | grep security  # List security updates

# Package information
apt show package                   # Show package information
apt policy package                 # Show package policy
apt-cache policy                   # Show repository priorities
apt list --installed               # List installed packages
```

### Update Status Checking
```bash
# Check update status
cat /var/run/reboot-required       # Check if reboot needed
cat /var/run/reboot-required.pkgs  # Packages requiring reboot
sudo needrestart                   # Check services needing restart
apt list --upgradable              # List available upgrades

# Update history
cat /var/log/apt/history.log       # APT history
cat /var/log/dpkg.log             # Package installation log
zcat /var/log/apt/history.log.*.gz # Historical APT logs
```

### Kernel Management
```bash
# Kernel operations
uname -r                          # Current kernel version
dpkg -l | grep linux-image        # Installed kernels
apt list linux-image-*            # Available kernels
sudo update-grub                  # Update GRUB configuration
sudo apt autoremove --purge       # Remove old kernels
```

## Troubleshooting

### Common Update Issues

**Held packages preventing updates:**
```bash
# Check held packages
apt-mark showhold

# Unhold packages
sudo apt-mark unhold package_name

# Force upgrade held packages
sudo apt-get install package_name

# Check package pins
cat /etc/apt/preferences.d/*
```

**Broken package dependencies:**
```bash
# Fix broken dependencies
sudo apt-get install -f
sudo dpkg --configure -a

# Force package installation
sudo dpkg -i --force-depends package.deb

# Resolve dependency conflicts
sudo aptitude install package_name
```

**Repository signature issues:**
```bash
# Update repository keys
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys KEY_ID

# Import repository key
curl -fsSL https://repo.url/key.gpg | sudo apt-key add -

# Reset repository cache
sudo rm -rf /var/lib/apt/lists/*
sudo apt update
```

**Insufficient disk space:**
```bash
# Clean package cache
sudo apt clean
sudo apt autoclean

# Remove old packages
sudo apt autoremove --purge

# Check large packages
dpkg-query -Wf '${Installed-Size}\t${Package}\n' | sort -n | tail -20
```

**Update locks and conflicts:**
```bash
# Remove lock files (if no apt process running)
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock

# Kill hanging apt processes
sudo killall apt apt-get
sudo dpkg --configure -a
```

### Update Recovery Procedures

**Rollback failed updates:**
```bash
# Restore from backup
sudo cp /backup/dpkg-status /var/lib/dpkg/status
sudo apt-get update
sudo apt-get install -f

# Downgrade specific package
sudo apt-get install package_name=old_version

# Use package cache for rollback
sudo dpkg -i /var/cache/apt/archives/package_old_version.deb
```

**Boot issues after kernel update:**
```bash
# Boot from GRUB menu with previous kernel
# At GRUB menu, select "Advanced options"
# Choose previous kernel version

# Remove problematic kernel
sudo apt-get purge linux-image-problematic-version
sudo update-grub

# Reinstall kernel
sudo apt-get install --reinstall linux-image-generic
```

**Service failures after updates:**
```bash
# Check service status
sudo systemctl status service_name
sudo journalctl -u service_name

# Restart failed services
sudo systemctl restart service_name
sudo systemctl reload service_name

# Check configuration files
sudo systemctl cat service_name
sudo nginx -t  # For nginx
sudo apache2ctl configtest  # For Apache
```

## Performance Tips

### Update Performance Optimization
```bash
# Parallel downloads
echo 'APT::Acquire::Retries "3";' | sudo tee -a /etc/apt/apt.conf.d/99performance
echo 'Acquire::Queue-Mode "host";' | sudo tee -a /etc/apt/apt.conf.d/99performance

# Download optimization
echo 'Acquire::http::Dl-Limit "0";' | sudo tee -a /etc/apt/apt.conf.d/99performance
echo 'Acquire::https::Dl-Limit "0";' | sudo tee -a /etc/apt/apt.conf.d/99performance

# Cache optimization
echo 'Dir::Cache::Archives "/var/cache/apt/archives";' | sudo tee -a /etc/apt/apt.conf.d/99performance
```

### Bandwidth Management
```bash
# Limit update bandwidth during business hours
cat << 'EOF' > /usr/local/bin/adaptive-updates.sh
#!/bin/bash
current_hour=$(date +%H)

if [ "$current_hour" -ge 9 ] && [ "$current_hour" -le 17 ]; then
    # Business hours - limit bandwidth
    export APT_CONFIG=/etc/apt/apt.conf.d/50business-hours
    echo 'Acquire::http::Dl-Limit "500";' > /etc/apt/apt.conf.d/50business-hours
else
    # Off hours - no limit
    rm -f /etc/apt/apt.conf.d/50business-hours
fi

/usr/local/bin/update-manager.sh run
EOF

chmod +x /usr/local/bin/adaptive-updates.sh
```

### Staged Update Deployment
```bash
# Implement staged deployment across server groups
cat << 'EOF' > /usr/local/bin/staged-updates.sh
#!/bin/bash
# Deploy updates in stages across server groups

SERVER_GROUP=$(hostname | cut -d'-' -f2)  # Extract group from hostname
STAGE_DELAY_HOURS=4

case "$SERVER_GROUP" in
    "dev")
        # Development servers - immediate updates
        /usr/local/bin/update-manager.sh run
        ;;
    "staging")
        # Staging servers - 4 hours after dev
        echo "/usr/local/bin/update-manager.sh run" | at now + ${STAGE_DELAY_HOURS} hours
        ;;
    "prod")
        # Production servers - manual approval required
        /usr/local/bin/enterprise-patch-manager.sh deploy
        ;;
    *)
        echo "Unknown server group: $SERVER_GROUP"
        exit 1
        ;;
esac
EOF
```

## What's Next
- [Security Hardening | Debian 13 Server]
- [Monitoring System Performance | Debian 13 Server]
- [Backup and Restore | Debian 13 Server]
- [Disaster Recovery | Debian 13 Server]