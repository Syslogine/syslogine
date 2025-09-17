---
sidebar_position: 6
title: "Managing System Services | Debian 13 Server"
sidebar_label: "System Services"
description: "Complete guide to managing system services on Debian 13 Trixie server including systemd service management, service creation, startup configuration, and troubleshooting."
keywords:
  - "debian 13 systemd"
  - "debian server services"
  - "debian trixie service management"
  - "server systemd administration"
  - "debian enterprise services"
tags:
  - debian-13
  - debian-trixie
  - system-services
  - systemd-management
  - server-administration
slug: debian-13-managing-system-services
---

# Managing System Services in Debian 13 Server

## Overview
This tutorial covers comprehensive system service management for Debian 13 servers using systemd. You'll learn to manage existing services, create custom services, configure startup behavior, monitor service health, and implement advanced service management strategies for production environments.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 50 minutes  
**Required packages:** systemd (pre-installed)  
**System requirements:** Root access, basic understanding of Linux services

## Installation
```bash
# systemd is pre-installed on Debian 13, but install additional tools
sudo apt update
sudo apt install systemd-container systemd-journal-remote

# Install service monitoring tools
sudo apt install htop iotop nethogs
```

## Basic Section 🟢

### Understanding systemd Basics
```bash
# Check systemd version
systemctl --version

# View system status
systemctl status

# List all services
systemctl list-units --type=service

# List all enabled services
systemctl list-unit-files --type=service --state=enabled

# List failed services
systemctl --failed
```

### Basic Service Management
```bash
# Start a service
sudo systemctl start nginx
sudo systemctl start ssh

# Stop a service
sudo systemctl stop nginx
sudo systemctl stop apache2

# Restart a service
sudo systemctl restart nginx

# Reload service configuration (without restart)
sudo systemctl reload nginx

# Check service status
systemctl status nginx
systemctl is-active nginx
systemctl is-enabled nginx
```

### Enable/Disable Services at Boot
```bash
# Enable service to start at boot
sudo systemctl enable nginx
sudo systemctl enable ssh

# Disable service from starting at boot
sudo systemctl disable apache2

# Enable and start immediately
sudo systemctl enable --now nginx

# Disable and stop immediately
sudo systemctl disable --now apache2

# Mask a service (prevent it from being started)
sudo systemctl mask apache2

# Unmask a service
sudo systemctl unmask apache2
```

### Viewing Service Information
```bash
# Detailed service status
systemctl status nginx -l

# Service logs
journalctl -u nginx
journalctl -u nginx -f          # Follow logs
journalctl -u nginx --since today

# Service dependencies
systemctl list-dependencies nginx
systemctl list-dependencies --reverse nginx

# Service properties
systemctl show nginx
systemctl cat nginx
```

## Advanced Section 🔴

### Creating Custom systemd Services
```bash
# Create a simple service
sudo nano /etc/systemd/system/myapp.service
```

Basic service file:
```ini
[Unit]
Description=My Custom Application
After=network.target
Wants=network.target

[Service]
Type=simple
User=myuser
Group=mygroup
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/bin/myapp
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Advanced Service Configuration
```bash
# Enterprise web application service
sudo nano /etc/systemd/system/webapp.service
```

Advanced service example:
```ini
[Unit]
Description=Enterprise Web Application
Documentation=https://company.com/docs/webapp
After=network-online.target mysql.service redis.service
Wants=network-online.target
Requires=mysql.service
BindsTo=redis.service

[Service]
Type=notify
User=webapp
Group=webapp
WorkingDirectory=/opt/webapp

# Environment
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/etc/default/webapp

# Security
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/log/webapp /var/lib/webapp
PrivateTmp=true
PrivateDevices=true
ProtectKernelTunables=true
ProtectControlGroups=true
RestrictSUIDSGID=true
RestrictRealtime=true

# Resource limits
MemoryLimit=512M
CPUQuota=150%
TasksMax=100
LimitNOFILE=65536

# Execution
ExecStartPre=/opt/webapp/scripts/pre-start.sh
ExecStart=/opt/webapp/bin/webapp
ExecStartPost=/opt/webapp/scripts/post-start.sh
ExecReload=/bin/kill -USR1 $MAINPID
ExecStop=/opt/webapp/scripts/stop.sh
TimeoutStartSec=30
TimeoutStopSec=30

# Restart policy
Restart=on-failure
RestartSec=10
StartLimitInterval=300
StartLimitBurst=5

# Watchdog
WatchdogSec=30

[Install]
WantedBy=multi-user.target
```

### Service Templates
```bash
# Create a service template
sudo nano /etc/systemd/system/worker@.service
```

Service template:
```ini
[Unit]
Description=Worker Process %i
After=network.target

[Service]
Type=simple
User=worker
Group=worker
WorkingDirectory=/opt/workers
ExecStart=/opt/workers/bin/worker --instance=%i
Restart=always
RestartSec=5

# Instance-specific environment
EnvironmentFile=/etc/default/worker-%i

[Install]
WantedBy=multi-user.target
```

Using service templates:
```bash
# Create instance configurations
sudo nano /etc/default/worker-1
# WORKER_ID=1
# WORKER_THREADS=4

sudo nano /etc/default/worker-2
# WORKER_ID=2
# WORKER_THREADS=8

# Enable and start instances
sudo systemctl enable worker@1
sudo systemctl enable worker@2
sudo systemctl start worker@1
sudo systemctl start worker@2

# Manage instances
systemctl status worker@1
systemctl stop worker@2
```

### Timer-based Services (systemd Timers)
```bash
# Create a backup service
sudo nano /etc/systemd/system/backup.service
```

Timer service:
```ini
[Unit]
Description=System Backup
Wants=backup.timer

[Service]
Type=oneshot
User=backup
Group=backup
ExecStart=/usr/local/bin/backup-script.sh
StandardOutput=journal
StandardError=journal
```

```bash
# Create the timer
sudo nano /etc/systemd/system/backup.timer
```

Timer configuration:
```ini
[Unit]
Description=Run backup daily
Requires=backup.service

[Timer]
OnCalendar=daily
Persistent=true
RandomizedDelaySec=30m

[Install]
WantedBy=timers.target
```

Timer management:
```bash
# Enable and start timer
sudo systemctl enable backup.timer
sudo systemctl start backup.timer

# List active timers
systemctl list-timers

# Check timer status
systemctl status backup.timer

# Check when timer will run next
systemctl list-timers backup.timer
```

### Service Management Script
```bash
#!/bin/bash
# service-manager.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="/etc/service-manager/config.conf"
LOG_FILE="/var/log/service-manager.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a $LOG_FILE
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
    sudo mkdir -p /etc/service-manager
    cat << 'EOF' > $CONFIG_FILE
# Service Manager Configuration
MONITORED_SERVICES="nginx mysql ssh"
CRITICAL_SERVICES="ssh mysql"
EMAIL_ALERTS="admin@company.com"
CHECK_INTERVAL=60
RESTART_ATTEMPTS=3
NOTIFICATION_COOLDOWN=300

# Service-specific settings
NGINX_HEALTH_CHECK="curl -s http://localhost/health"
MYSQL_HEALTH_CHECK="mysqladmin ping"
SSH_HEALTH_CHECK="systemctl is-active ssh"
EOF
    
    log "Created default configuration at $CONFIG_FILE"
}

check_service_health() {
    local service=$1
    local health_check_var="${service^^}_HEALTH_CHECK"
    local health_check="${!health_check_var:-systemctl is-active $service}"
    
    if eval "$health_check" >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

restart_service() {
    local service=$1
    local attempt=$2
    
    log "Attempting to restart $service (attempt $attempt)"
    
    if sudo systemctl restart "$service"; then
        log "Successfully restarted $service"
        return 0
    else
        log "Failed to restart $service"
        return 1
    fi
}

send_alert() {
    local service=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Check notification cooldown
    local last_notification_file="/tmp/.service_manager_${service}_last_notification"
    if [ -f "$last_notification_file" ]; then
        local last_notification=$(cat "$last_notification_file")
        local current_time=$(date +%s)
        if [ $((current_time - last_notification)) -lt $NOTIFICATION_COOLDOWN ]; then
            log "Skipping notification for $service (cooldown active)"
            return
        fi
    fi
    
    # Send alert
    echo "$message" | mail -s "Service Alert: $service on $(hostname)" "$EMAIL_ALERTS"
    date +%s > "$last_notification_file"
    
    log "Alert sent for $service: $message"
}

monitor_services() {
    log "Starting service monitoring"
    
    for service in $MONITORED_SERVICES; do
        if ! check_service_health "$service"; then
            log "Service $service is unhealthy"
            
            # Attempt restarts
            local restart_success=false
            for attempt in $(seq 1 $RESTART_ATTEMPTS); do
                if restart_service "$service" "$attempt"; then
                    restart_success=true
                    break
                fi
                sleep 10
            done
            
            if [ "$restart_success" = false ]; then
                local message="Service $service failed to restart after $RESTART_ATTEMPTS attempts on $(hostname) at $(date)"
                send_alert "$service" "$message"
                
                # Mark as critical if it's a critical service
                if echo "$CRITICAL_SERVICES" | grep -q "$service"; then
                    log "CRITICAL: Essential service $service is down"
                    # Additional critical service handling could go here
                fi
            fi
        else
            log "Service $service is healthy"
        fi
    done
}

generate_service_report() {
    local report_file="/var/log/service-report-$(date +%Y%m%d).txt"
    
    echo "Service Status Report - $(date)" > "$report_file"
    echo "======================================" >> "$report_file"
    echo >> "$report_file"
    
    echo "Active Services:" >> "$report_file"
    systemctl list-units --type=service --state=active | head -20 >> "$report_file"
    echo >> "$report_file"
    
    echo "Failed Services:" >> "$report_file"
    systemctl --failed --type=service >> "$report_file"
    echo >> "$report_file"
    
    echo "Service Resource Usage:" >> "$report_file"
    for service in $MONITORED_SERVICES; do
        echo "--- $service ---" >> "$report_file"
        systemctl show "$service" --property=MemoryCurrent,CPUUsageNSec,TasksCurrent 2>/dev/null >> "$report_file"
        echo >> "$report_file"
    done
    
    echo "Service Logs (Last 24 hours):" >> "$report_file"
    for service in $MONITORED_SERVICES; do
        echo "--- $service logs ---" >> "$report_file"
        journalctl -u "$service" --since "24 hours ago" --no-pager | tail -10 >> "$report_file"
        echo >> "$report_file"
    done
    
    log "Service report generated: $report_file"
}

bulk_service_operation() {
    local operation=$1
    shift
    local services=("$@")
    
    for service in "${services[@]}"; do
        case $operation in
            "start")
                log "Starting service: $service"
                sudo systemctl start "$service"
                ;;
            "stop")
                log "Stopping service: $service"
                sudo systemctl stop "$service"
                ;;
            "restart")
                log "Restarting service: $service"
                sudo systemctl restart "$service"
                ;;
            "enable")
                log "Enabling service: $service"
                sudo systemctl enable "$service"
                ;;
            "disable")
                log "Disabling service: $service"
                sudo systemctl disable "$service"
                ;;
            *)
                log "Unknown operation: $operation"
                return 1
                ;;
        esac
        
        # Brief pause between operations
        sleep 2
    done
}

backup_service_configs() {
    local backup_dir="/backup/systemd-configs/$(date +%Y%m%d)"
    sudo mkdir -p "$backup_dir"
    
    # Backup system service files
    sudo cp -r /etc/systemd/system/* "$backup_dir/" 2>/dev/null || true
    
    # Backup custom service files
    find /etc/systemd/system -name "*.service" -type f -exec cp {} "$backup_dir/" \;
    
    # Create a list of enabled services
    systemctl list-unit-files --type=service --state=enabled > "$backup_dir/enabled-services.txt"
    
    log "Service configurations backed up to $backup_dir"
}

show_service_status() {
    echo "=== System Services Overview ==="
    echo
    
    echo "System Status:"
    systemctl status --no-pager -l
    echo
    
    echo "Active Services:"
    systemctl list-units --type=service --state=active --no-pager
    echo
    
    echo "Failed Services:"
    systemctl --failed --type=service --no-pager
    echo
    
    echo "Enabled Services:"
    systemctl list-unit-files --type=service --state=enabled --no-pager | head -20
    echo
    
    echo "Resource Usage (Top 10 Services):"
    systemctl --no-pager | grep ".service" | head -10
}

case "${1:-}" in
    "monitor")
        load_config
        monitor_services
        ;;
    "report")
        generate_service_report
        ;;
    "start")
        shift
        bulk_service_operation "start" "$@"
        ;;
    "stop")
        shift
        bulk_service_operation "stop" "$@"
        ;;
    "restart")
        shift
        bulk_service_operation "restart" "$@"
        ;;
    "enable")
        shift
        bulk_service_operation "enable" "$@"
        ;;
    "disable")
        shift
        bulk_service_operation "disable" "$@"
        ;;
    "backup")
        backup_service_configs
        ;;
    "status")
        show_service_status
        ;;
    "daemon")
        load_config
        log "Starting service monitoring daemon"
        while true; do
            monitor_services
            sleep $CHECK_INTERVAL
        done
        ;;
    *)
        echo "Usage: $0 {monitor|report|start|stop|restart|enable|disable|backup|status|daemon} [services...]"
        echo "Examples:"
        echo "  $0 monitor                    # Check all monitored services once"
        echo "  $0 daemon                     # Run continuous monitoring"
        echo "  $0 restart nginx mysql        # Restart specific services"
        echo "  $0 report                     # Generate service report"
        echo "  $0 status                     # Show service overview"
        exit 1
        ;;
esac
```

## Configuration Examples

### Production Web Server Services
```bash
# Main web application
sudo nano /etc/systemd/system/webapp.service
```

Production webapp service:
```ini
[Unit]
Description=Production Web Application
After=network-online.target postgresql.service redis.service
Wants=network-online.target
Requires=postgresql.service

[Service]
Type=notify
User=webapp
Group=webapp
WorkingDirectory=/opt/webapp

# Environment
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/etc/default/webapp

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/log/webapp /var/lib/webapp /tmp/webapp
PrivateTmp=true
PrivateDevices=true
ProtectKernelTunables=true
ProtectControlGroups=true
RestrictSUIDSGID=true
RestrictRealtime=true
SystemCallFilter=@system-service
SystemCallErrorNumber=EPERM

# Resource limits
MemoryLimit=1G
CPUQuota=200%
TasksMax=200
LimitNOFILE=65536

# Execution
ExecStartPre=/opt/webapp/scripts/health-check.sh
ExecStart=/opt/webapp/bin/webapp
ExecReload=/bin/kill -USR1 $MAINPID
ExecStop=/opt/webapp/scripts/graceful-stop.sh
TimeoutStartSec=60
TimeoutStopSec=60

# Restart policy
Restart=on-failure
RestartSec=10
StartLimitInterval=300
StartLimitBurst=3

# Health monitoring
WatchdogSec=30

[Install]
WantedBy=multi-user.target
```

### Database Service Configuration
```bash
# Enhanced PostgreSQL service
sudo nano /etc/systemd/system/postgresql-enhanced.service
```

Enhanced database service:
```ini
[Unit]
Description=PostgreSQL database server
Documentation=man:postgres(1)
After=network.target
Wants=network.target

[Service]
Type=notify
User=postgres
Group=postgres

# Security
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/postgresql /var/log/postgresql /run/postgresql
PrivateTmp=true
PrivateDevices=true

# Resource limits
MemoryLimit=2G
CPUQuota=300%
LimitNOFILE=65536
LimitNPROC=8192

# PostgreSQL specific
ExecStartPre=/usr/lib/postgresql/15/bin/postgresql-check-db-dir ${PGDATA}
ExecStart=/usr/lib/postgresql/15/bin/postgres -D ${PGDATA} -c config_file=/etc/postgresql/15/main/postgresql.conf
ExecReload=/bin/kill -HUP $MAINPID
TimeoutStartSec=120
TimeoutStopSec=120

# Restart policy
Restart=on-failure
RestartSec=30

# Environment
Environment=PGDATA=/var/lib/postgresql/15/main

[Install]
WantedBy=multi-user.target
```

### Load Balancer Service
```bash
# HAProxy service with health checks
sudo nano /etc/systemd/system/haproxy-enhanced.service
```

Load balancer service:
```ini
[Unit]
Description=HAProxy Load Balancer
Documentation=man:haproxy(1)
After=network.target
Wants=network.target

[Service]
Type=notify
User=haproxy
Group=haproxy

# Security
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/log/haproxy /run/haproxy
PrivateTmp=true
PrivateDevices=true
CapabilityBoundingSet=CAP_NET_BIND_SERVICE

# HAProxy specific
ExecStartPre=/usr/sbin/haproxy -f /etc/haproxy/haproxy.cfg -c -q
ExecStart=/usr/sbin/haproxy -W -f /etc/haproxy/haproxy.cfg -p /run/haproxy.pid -S /run/haproxy-master.sock
ExecReload=/bin/kill -USR2 $MAINPID
KillMode=mixed
TimeoutStartSec=30
TimeoutStopSec=30

# Restart policy
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

## Security Considerations

### Service Security Hardening
```bash
# Create secure service template
sudo nano /etc/systemd/system/secure-app.service
```

Security-hardened service:
```ini
[Unit]
Description=Security Hardened Application
After=network.target

[Service]
Type=simple
User=secapp
Group=secapp
WorkingDirectory=/opt/secapp

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictSUIDSGID=true
RestrictRealtime=true
RestrictNamespaces=true
LockPersonality=true
MemoryDenyWriteExecute=true
RemoveIPC=true
PrivateTmp=true
PrivateDevices=true
PrivateUsers=true
ProtectHostname=true
ProtectClock=true
ProtectKernelLogs=true
SystemCallFilter=@system-service
SystemCallErrorNumber=EPERM

# Resource limits
MemoryLimit=512M
CPUQuota=100%
TasksMax=50
LimitNOFILE=1024

# Execution
ExecStart=/opt/secapp/bin/secapp
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

### Service User Management
```bash
# Create dedicated service users
sudo useradd -r -s /bin/false -d /opt/webapp webapp
sudo useradd -r -s /bin/false -d /opt/api apiuser
sudo useradd -r -s /bin/false -d /opt/worker worker

# Set proper permissions
sudo chown -R webapp:webapp /opt/webapp
sudo chmod 750 /opt/webapp
sudo chmod 644 /opt/webapp/config/*
sudo chmod 600 /opt/webapp/config/secrets.*
```

### Service Monitoring and Auditing
```bash
# Enable audit logging for service changes
sudo nano /etc/audit/rules.d/service-audit.rules
```

Service audit rules:
```bash
# Monitor systemd service files
-w /etc/systemd/system/ -p wa -k systemd_config
-w /usr/lib/systemd/system/ -p wa -k systemd_config

# Monitor service control commands
-a always,exit -F arch=b64 -S execve -F exe=/bin/systemctl -k service_control
-a always,exit -F arch=b32 -S execve -F exe=/bin/systemctl -k service_control

# Monitor service status changes
-w /run/systemd/system/ -p wa -k systemd_runtime
```

## Quick Reference

### Essential systemctl Commands
```bash
# Service status
systemctl status service-name      # Detailed status
systemctl is-active service-name   # Check if active
systemctl is-enabled service-name  # Check if enabled
systemctl is-failed service-name   # Check if failed

# Service control
systemctl start service-name       # Start service
systemctl stop service-name        # Stop service
systemctl restart service-name     # Restart service
systemctl reload service-name      # Reload configuration

# Boot configuration
systemctl enable service-name      # Enable at boot
systemctl disable service-name     # Disable at boot
systemctl mask service-name        # Prevent service start
systemctl unmask service-name      # Allow service start

# System information
systemctl list-units --type=service         # List all services
systemctl list-unit-files --type=service    # List unit files
systemctl --failed                          # Show failed services
systemctl list-dependencies service-name    # Show dependencies
```

### Service File Locations
```bash
# System service files
/usr/lib/systemd/system/        # Distribution provided
/etc/systemd/system/            # Local/custom services
/run/systemd/system/            # Runtime generated

# User service files
~/.config/systemd/user/         # User-specific services
/usr/lib/systemd/user/          # User services (system-wide)

# Configuration
/etc/systemd/                   # systemd configuration
/etc/default/                   # Service environment files
```

### Log Analysis
```bash
# Service logs
journalctl -u service-name                    # All logs
journalctl -u service-name -f                 # Follow logs
journalctl -u service-name --since today      # Today's logs
journalctl -u service-name -p err             # Error logs only
journalctl -u service-name --since "1 hour ago" # Last hour
```

## Troubleshooting

### Common Issues

**Service fails to start:**
```bash
# Check service status and logs
systemctl status service-name
journalctl -u service-name -n 50

# Verify service file syntax
systemd-analyze verify /etc/systemd/system/service-name.service

# Check dependencies
systemctl list-dependencies service-name --all

# Test service file
sudo systemctl daemon-reload
sudo systemctl start service-name
```

**Service keeps restarting:**
```bash
# Check restart policy
systemctl show service-name | grep Restart

# View restart history
journalctl -u service-name | grep "Started\|Stopped"

# Check resource limits
systemctl show service-name | grep -E "(Memory|CPU|Tasks)"

# Monitor in real-time
watch -n 1 'systemctl status service-name'
```

**Service won't stop:**
```bash
# Check service processes
systemctl status service-name
ps aux | grep service-name

# Force kill if necessary
sudo systemctl kill service-name
sudo systemctl kill -s SIGKILL service-name

# Check for stuck processes
sudo lsof | grep service-name
```

**Permission errors:**
```bash
# Check service user and permissions
ls -la /path/to/service/files
sudo -u service-user ls /path/to/service/files

# Verify SELinux context (if applicable)
ls -Z /path/to/service/files

# Check systemd security restrictions
systemctl show service-name | grep -E "(Protect|Private|Restrict)"
```

**Environment issues:**
```bash
# Check environment variables
systemctl show service-name | grep Environment

# Test with manual environment
sudo -u service-user env - /path/to/service/binary

# Verify environment file
cat /etc/default/service-name
```

## Performance Tips

### Service Optimization
```bash
# Optimize service startup
# Use Type=notify for better control
# Set appropriate TimeoutStartSec
# Use ExecStartPre for health checks

# Resource management
# Set MemoryLimit for memory-intensive services
# Use CPUQuota to limit CPU usage
# Set TasksMax to prevent fork bombs
```

### Monitoring Performance
```bash
# Monitor service resource usage
systemctl show service-name --property=MemoryCurrent,CPUUsageNSec,TasksCurrent

# Use systemd-cgtop for real-time monitoring
systemd-cgtop

# Analyze service startup time
systemd-analyze blame
systemd-analyze critical-chain service-name
```

### Bulk Operations
```bash
# Restart multiple services
sudo systemctl restart nginx mysql redis

# Enable multiple services
sudo systemctl enable nginx mysql redis

# Check status of multiple services
systemctl status nginx mysql redis
```

## What's Next
- [Process Management | Debian 13 Server]
- [Performance Monitoring | Debian 13 Server]
- [System Automation | Debian 13 Server]
- [Container Services | Debian 13 Server]