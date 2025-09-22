---
sidebar_position: 11
title: "Remote Access and SSH | Debian 13 Server"
sidebar_label: "Remote Access & SSH"
description: "Complete guide to remote access and SSH configuration on Debian 13 Trixie server including SSH hardening, key management, tunneling, and secure remote administration."
keywords:
  - "debian 13 ssh"
  - "debian server remote access"
  - "debian trixie ssh configuration"
  - "server ssh security"
  - "debian enterprise remote access"
tags:
  - debian-13
  - debian-trixie
  - remote-access
  - ssh-configuration
  - server-administration
slug: debian-13-remote-access-ssh
---

# Remote Access and SSH in Debian 13 Server

## Overview
This tutorial covers comprehensive remote access and SSH configuration for Debian 13 servers, including SSH hardening, key-based authentication, advanced tunneling, multi-factor authentication, and enterprise-grade remote access security. You'll learn to securely manage remote connections and implement best practices for server administration.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 55 minutes  
**Required packages:** openssh-server, openssh-client  
**System requirements:** Network connectivity, root access

## Installation
```bash
# SSH server is usually pre-installed, but install if needed
sudo apt update
sudo apt install openssh-server openssh-client

# Install additional security tools
sudo apt install fail2ban ufw

# Install advanced SSH tools
sudo apt install autossh sshfs mosh
```

## Basic Section 🟢

### Basic SSH Server Configuration
```bash
# Check SSH service status
sudo systemctl status ssh
sudo systemctl is-enabled ssh

# Start and enable SSH if needed
sudo systemctl start ssh
sudo systemctl enable ssh

# Basic SSH configuration
sudo nano /etc/ssh/sshd_config
```

Basic SSH configuration:
```bash
# Basic secure settings
Port 22
Protocol 2
PermitRootLogin no
PasswordAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PermitEmptyPasswords no
MaxAuthTries 3
MaxSessions 10
```

### SSH Key Generation and Setup
```bash
# Generate SSH key pair (on client)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-keygen -t ed25519 -C "your_email@example.com"  # More secure

# Copy public key to server
ssh-copy-id username@server_ip
ssh-copy-id -i ~/.ssh/id_ed25519.pub username@server_ip

# Manual key setup
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "your_public_key_here" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Basic SSH Client Usage
```bash
# Connect to server
ssh username@server_ip
ssh -p 2222 username@server_ip  # Custom port

# Execute remote command
ssh username@server_ip "ls -la /var/log"
ssh username@server_ip "sudo systemctl status nginx"

# Copy files with SCP
scp file.txt username@server_ip:/path/to/destination/
scp -r folder/ username@server_ip:/path/to/destination/
scp username@server_ip:/path/to/file.txt ./

# Copy files with rsync over SSH
rsync -avz -e ssh file.txt username@server_ip:/path/to/destination/
rsync -avz -e ssh username@server_ip:/path/to/files/ ./local/folder/
```

### SSH Client Configuration
```bash
# Client SSH config file
nano ~/.ssh/config
```

Basic SSH client config:
```bash
# Default settings
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    TCPKeepAlive yes
    Compression yes

# Specific server configuration
Host myserver
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    
Host production
    HostName prod.company.com
    User deploy
    IdentityFile ~/.ssh/production_key
    ForwardAgent yes
```

## Advanced Section 🔴

### SSH Security Hardening
```bash
# Advanced SSH server configuration
sudo nano /etc/ssh/sshd_config
```

Hardened SSH configuration:
```bash
# Network settings
Port 2222
AddressFamily inet
ListenAddress 0.0.0.0
Protocol 2

# Authentication
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes

# Connection limits
MaxAuthTries 3
MaxSessions 5
MaxStartups 10:30:100
ClientAliveInterval 300
ClientAliveCountMax 2

# Security restrictions
AllowUsers admin deploy
DenyUsers root nobody
AllowGroups ssh-users
X11Forwarding no
AllowTcpForwarding no
GatewayPorts no
PermitTunnel no

# Logging
LogLevel VERBOSE
SyslogFacility AUTH

# Crypto settings
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha2-256,hmac-sha2-512
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512

# Banner and MOTD
Banner /etc/ssh/banner
PrintMotd yes
```

### SSH Key Management System
```bash
#!/bin/bash
# ssh-key-manager.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KEY_STORE="/etc/ssh/authorized_keys"
LOG_FILE="/var/log/ssh-key-manager.log"
BACKUP_DIR="/backup/ssh-keys"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Create key store structure
setup_key_store() {
    sudo mkdir -p "$KEY_STORE" "$BACKUP_DIR"
    sudo chmod 755 "$KEY_STORE"
    log "Key store setup completed"
}

# Add SSH key for user
add_key() {
    local username=$1
    local key_file=$2
    local comment=${3:-"Added by ssh-key-manager"}
    
    if [ ! -f "$key_file" ]; then
        echo "Error: Key file $key_file not found"
        return 1
    fi
    
    # Validate key format
    if ! ssh-keygen -l -f "$key_file" >/dev/null 2>&1; then
        echo "Error: Invalid SSH key format"
        return 1
    fi
    
    # Create user's authorized_keys file
    local user_keys="$KEY_STORE/$username"
    sudo mkdir -p "$user_keys"
    
    # Add key with metadata
    local key_content=$(cat "$key_file")
    local key_id=$(echo "$key_content" | ssh-keygen -l -f - | awk '{print $2}')
    
    echo "# Added: $(date) - $comment - ID: $key_id" | sudo tee -a "$user_keys/authorized_keys"
    echo "$key_content" | sudo tee -a "$user_keys/authorized_keys"
    
    # Set proper permissions
    sudo chmod 600 "$user_keys/authorized_keys"
    sudo chown root:root "$user_keys/authorized_keys"
    
    log "Added SSH key for $username (ID: $key_id)"
}

# Remove SSH key
remove_key() {
    local username=$1
    local key_fingerprint=$2
    
    local user_keys="$KEY_STORE/$username/authorized_keys"
    
    if [ ! -f "$user_keys" ]; then
        echo "Error: No keys found for user $username"
        return 1
    fi
    
    # Backup current keys
    sudo cp "$user_keys" "$BACKUP_DIR/${username}_$(date +%Y%m%d_%H%M%S).backup"
    
    # Remove key by fingerprint
    sudo grep -v "$key_fingerprint" "$user_keys" > "/tmp/${username}_keys_temp" || true
    sudo mv "/tmp/${username}_keys_temp" "$user_keys"
    
    log "Removed SSH key for $username (fingerprint: $key_fingerprint)"
}

# List keys for user
list_keys() {
    local username=$1
    local user_keys="$KEY_STORE/$username/authorized_keys"
    
    if [ ! -f "$user_keys" ]; then
        echo "No keys found for user $username"
        return 1
    fi
    
    echo "SSH keys for $username:"
    echo "======================="
    
    while IFS= read -r line; do
        if [[ $line =~ ^ssh- ]] || [[ $line =~ ^ecdsa- ]] || [[ $line =~ ^ed25519 ]]; then
            local fingerprint=$(echo "$line" | ssh-keygen -l -f -)
            local comment=$(echo "$line" | awk '{print $NF}')
            echo "Fingerprint: $fingerprint"
            echo "Comment: $comment"
            echo "---"
        fi
    done < "$user_keys"
}

# Deploy keys to user account
deploy_keys() {
    local username=$1
    local user_keys="$KEY_STORE/$username/authorized_keys"
    
    if [ ! -f "$user_keys" ]; then
        echo "No keys found for user $username"
        return 1
    fi
    
    # Check if user exists
    if ! id "$username" >/dev/null 2>&1; then
        echo "Error: User $username does not exist"
        return 1
    fi
    
    # Create user's .ssh directory
    local user_home=$(getent passwd "$username" | cut -d: -f6)
    sudo mkdir -p "$user_home/.ssh"
    
    # Copy keys
    sudo cp "$user_keys" "$user_home/.ssh/authorized_keys"
    sudo chown "$username:$username" "$user_home/.ssh" "$user_home/.ssh/authorized_keys"
    sudo chmod 700 "$user_home/.ssh"
    sudo chmod 600 "$user_home/.ssh/authorized_keys"
    
    log "Deployed SSH keys for $username"
}

# Audit SSH keys
audit_keys() {
    local audit_file="/var/log/ssh-key-audit-$(date +%Y%m%d).txt"
    
    echo "SSH Key Audit Report - $(date)" > "$audit_file"
    echo "===============================" >> "$audit_file"
    echo >> "$audit_file"
    
    # System-wide key analysis
    echo "System Users with SSH Keys:" >> "$audit_file"
    for user_dir in "$KEY_STORE"/*; do
        if [ -d "$user_dir" ]; then
            local username=$(basename "$user_dir")
            local key_count=$(grep -c "^ssh-\|^ecdsa-\|^ed25519" "$user_dir/authorized_keys" 2>/dev/null || echo 0)
            echo "  $username: $key_count keys" >> "$audit_file"
        fi
    done
    echo >> "$audit_file"
    
    # Check for weak keys
    echo "Key Security Analysis:" >> "$audit_file"
    find "$KEY_STORE" -name "authorized_keys" -exec grep -H "ssh-rsa" {} \; | while read line; do
        local file=$(echo "$line" | cut -d: -f1)
        local username=$(basename "$(dirname "$file")")
        local key=$(echo "$line" | cut -d: -f2-)
        local key_size=$(echo "$key" | ssh-keygen -l -f - | awk '{print $1}')
        
        if [ "$key_size" -lt 2048 ]; then
            echo "  WARNING: $username has weak RSA key ($key_size bits)" >> "$audit_file"
        fi
    done
    
    log "SSH key audit completed: $audit_file"
}

case "${1:-}" in
    "setup")
        setup_key_store
        ;;
    "add")
        add_key "$2" "$3" "${4:-}"
        ;;
    "remove")
        remove_key "$2" "$3"
        ;;
    "list")
        list_keys "$2"
        ;;
    "deploy")
        deploy_keys "$2"
        ;;
    "audit")
        audit_keys
        ;;
    *)
        echo "Usage: $0 {setup|add|remove|list|deploy|audit}"
        echo "Examples:"
        echo "  $0 setup                           # Setup key store"
        echo "  $0 add username /path/to/key.pub   # Add key for user"
        echo "  $0 list username                   # List keys for user"
        echo "  $0 deploy username                 # Deploy keys to user account"
        echo "  $0 audit                          # Generate audit report"
        exit 1
        ;;
esac
```

### SSH Tunneling and Port Forwarding
```bash
# Local port forwarding (access remote service locally)
ssh -L 8080:localhost:80 username@server_ip
ssh -L 3306:database_server:3306 username@jump_server

# Remote port forwarding (expose local service remotely)
ssh -R 8080:localhost:80 username@server_ip
ssh -R 2222:localhost:22 username@remote_server

# Dynamic port forwarding (SOCKS proxy)
ssh -D 1080 username@server_ip

# X11 forwarding for GUI applications
ssh -X username@server_ip
ssh -Y username@server_ip  # Trusted X11 forwarding

# Multiple tunnels and background execution
ssh -f -N -L 8080:localhost:80 -L 3306:localhost:3306 username@server_ip
```

### Advanced SSH Client Configuration
```bash
# Enterprise SSH client configuration
nano ~/.ssh/config
```

Advanced client configuration:
```bash
# Global defaults
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    TCPKeepAlive yes
    Compression yes
    ControlMaster auto
    ControlPath ~/.ssh/control-%r@%h:%p
    ControlPersist 10m
    
# Production environment
Host prod-*
    User deploy
    IdentityFile ~/.ssh/production_ed25519
    CertificateFile ~/.ssh/production_ed25519-cert.pub
    ProxyJump bastion.company.com
    ForwardAgent no
    RequestTTY no
    
# Jump server configuration
Host bastion
    HostName bastion.company.com
    User admin
    IdentityFile ~/.ssh/bastion_ed25519
    ForwardAgent yes
    DynamicForward 1080
    
# Development environment
Host dev-*
    User developer
    IdentityFile ~/.ssh/dev_ed25519
    ForwardAgent yes
    LocalForward 3000 localhost:3000
    LocalForward 5432 localhost:5432
    
# Database servers (through jump host)
Host db-prod
    HostName 10.0.1.100
    User dbadmin
    ProxyJump bastion
    LocalForward 5432 localhost:5432
    
# Web servers load balancer setup
Host web-01
    HostName 10.0.2.10
    User web
    ProxyJump bastion
    
Host web-02
    HostName 10.0.2.11
    User web
    ProxyJump bastion

# Emergency access
Host emergency
    HostName emergency.company.com
    User root
    IdentityFile ~/.ssh/emergency_rsa
    Port 443
    StrictHostKeyChecking no
```

### SSH Certificate Authentication
```bash
# Generate SSH Certificate Authority
ssh-keygen -t ed25519 -f ssh_ca -C "SSH Certificate Authority"

# Sign user public key with CA
ssh-keygen -s ssh_ca -I "username@company.com" -n username -V +52w ~/.ssh/id_ed25519.pub

# Configure SSH server to trust CA
echo "TrustedUserCAKeys /etc/ssh/ssh_ca.pub" >> /etc/ssh/sshd_config
sudo cp ssh_ca.pub /etc/ssh/ssh_ca.pub

# Sign host key with CA
sudo ssh-keygen -s ssh_ca -I "server.company.com" -h -n server.company.com,192.168.1.100 /etc/ssh/ssh_host_ed25519_key.pub

# Configure server to use signed host certificate
echo "HostCertificate /etc/ssh/ssh_host_ed25519_key-cert.pub" >> /etc/ssh/sshd_config
```

### Multi-Factor Authentication (MFA)
```bash
# Install Google Authenticator PAM module
sudo apt install libpam-google-authenticator

# Configure PAM for SSH
sudo nano /etc/pam.d/sshd
```

PAM configuration for MFA:
```bash
# Add at the top of the file
auth required pam_google_authenticator.so

# Comment out the following line
# @include common-auth
```

SSH configuration for MFA:
```bash
# Add to /etc/ssh/sshd_config
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive
```

Setup MFA for user:
```bash
# Run as the user
google-authenticator

# Follow prompts:
# - Do you want authentication tokens to be time-based? Y
# - Do you want me to update your "/home/user/.google_authenticator" file? Y
# - Do you want to disallow multiple uses? Y
# - Do you want to enable rate-limiting? Y
```

### SSH Monitoring and Logging
```bash
#!/bin/bash
# ssh-monitor.sh
LOG_FILE="/var/log/ssh-monitor.log"
ALERT_EMAIL="admin@company.com"

monitor_ssh_connections() {
    # Monitor active SSH connections
    echo "=== SSH Connection Monitor - $(date) ===" >> "$LOG_FILE"
    
    # Active connections
    ss -t state established '( dport = :ssh or sport = :ssh )' >> "$LOG_FILE"
    
    # Failed login attempts (last hour)
    local failed_logins=$(journalctl --since "1 hour ago" | grep "Failed password" | wc -l)
    
    if [ "$failed_logins" -gt 10 ]; then
        echo "High number of failed SSH logins: $failed_logins" | \
            mail -s "SSH Security Alert - $(hostname)" "$ALERT_EMAIL"
    fi
    
    # Successful logins (last hour)
    echo "Recent successful logins:" >> "$LOG_FILE"
    journalctl --since "1 hour ago" | grep "Accepted password\|Accepted publickey" | tail -10 >> "$LOG_FILE"
    
    # Connection duration analysis
    who -u | awk '{if($6 != "old") print $1, $3, $4, $6}' >> "$LOG_FILE"
    
    echo >> "$LOG_FILE"
}

analyze_ssh_logs() {
    local analysis_file="/var/log/ssh-analysis-$(date +%Y%m%d).txt"
    
    echo "SSH Log Analysis - $(date)" > "$analysis_file"
    echo "=============================" >> "$analysis_file"
    echo >> "$analysis_file"
    
    # Top source IPs
    echo "Top Source IPs (Failed Logins):" >> "$analysis_file"
    journalctl --since "24 hours ago" | grep "Failed password" | \
        awk '{print $13}' | sort | uniq -c | sort -nr | head -10 >> "$analysis_file"
    echo >> "$analysis_file"
    
    # Top usernames attempted
    echo "Top Usernames Attempted:" >> "$analysis_file"
    journalctl --since "24 hours ago" | grep "Failed password" | \
        awk '{print $9}' | sort | uniq -c | sort -nr | head -10 >> "$analysis_file"
    echo >> "$analysis_file"
    
    # Successful logins by user
    echo "Successful Logins by User:" >> "$analysis_file"
    journalctl --since "24 hours ago" | grep "Accepted" | \
        awk '{print $9}' | sort | uniq -c | sort -nr >> "$analysis_file"
    echo >> "$analysis_file"
    
    # Geographic analysis (if geoip is available)
    if command -v geoiplookup >/dev/null; then
        echo "Geographic Analysis of Failed Logins:" >> "$analysis_file"
        journalctl --since "24 hours ago" | grep "Failed password" | \
            awk '{print $13}' | sort | uniq | while read ip; do
                country=$(geoiplookup "$ip" | head -1 | cut -d: -f2)
                echo "$ip - $country" >> "$analysis_file"
            done
    fi
    
    echo "Analysis completed: $analysis_file"
}

# Run monitoring
monitor_ssh_connections
analyze_ssh_logs
```

## Configuration Examples

### Enterprise SSH Gateway
```bash
# SSH gateway/bastion host configuration
sudo nano /etc/ssh/sshd_config
```

Gateway SSH configuration:
```bash
# Gateway-specific settings
Port 22
AddressFamily inet
ListenAddress 0.0.0.0

# Security
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthenticationMethods publickey

# Gateway functionality
AllowTcpForwarding yes
GatewayPorts no
X11Forwarding no
PermitTunnel no
AllowAgentForwarding yes

# Connection management
MaxAuthTries 3
MaxSessions 20
MaxStartups 20:30:100
ClientAliveInterval 300
ClientAliveCountMax 2

# Logging
LogLevel VERBOSE
SyslogFacility AUTH

# User restrictions
Match User gateway
    ForceCommand /usr/local/bin/gateway-shell
    AllowTcpForwarding yes
    
Match User admin
    AllowTcpForwarding yes
    X11Forwarding yes
```

### Automated SSH Backup Script
```bash
#!/bin/bash
# ssh-backup.sh
REMOTE_HOST="backup.company.com"
REMOTE_USER="backup"
REMOTE_PATH="/backups/$(hostname)"
LOCAL_PATHS="/etc /home /var/www"
LOG_FILE="/var/log/ssh-backup.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Test SSH connection
test_connection() {
    if ! ssh -o ConnectTimeout=10 -o BatchMode=yes "$REMOTE_USER@$REMOTE_HOST" "echo 'Connection test successful'" >/dev/null 2>&1; then
        log "ERROR: Cannot connect to backup server"
        exit 1
    fi
    log "SSH connection to backup server verified"
}

# Create remote backup directory
create_remote_directory() {
    ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $REMOTE_PATH/$(date +%Y%m%d)"
    log "Created remote backup directory"
}

# Perform backup
perform_backup() {
    for path in $LOCAL_PATHS; do
        if [ -d "$path" ]; then
            log "Backing up $path"
            rsync -avz --delete -e ssh "$path/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$(date +%Y%m%d)/$(basename $path)/"
            if [ $? -eq 0 ]; then
                log "Successfully backed up $path"
            else
                log "ERROR: Failed to backup $path"
            fi
        fi
    done
}

# Main execution
test_connection
create_remote_directory
perform_backup
log "Backup completed"
```

### SSH Load Balancer Configuration
```bash
# HAProxy configuration for SSH load balancing
sudo nano /etc/haproxy/haproxy.cfg
```

SSH load balancer config:
```bash
global
    daemon
    user haproxy
    group haproxy

defaults
    mode tcp
    timeout connect 5s
    timeout client 30s
    timeout server 30s

frontend ssh_frontend
    bind *:22
    default_backend ssh_servers

backend ssh_servers
    balance roundrobin
    server ssh1 10.0.1.10:22 check
    server ssh2 10.0.1.11:22 check
    server ssh3 10.0.1.12:22 check
```

## Security Considerations

### SSH Hardening Checklist
```bash
# Security hardening script
#!/bin/bash
# ssh-hardening.sh

echo "SSH Security Hardening Script"
echo "============================="

# Backup original configuration
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup.$(date +%Y%m%d)

# Apply hardening settings
cat << 'EOF' | sudo tee /etc/ssh/sshd_config
# SSH Hardened Configuration
Port 2222
Protocol 2
AddressFamily inet

# Authentication
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes

# Connection limits
MaxAuthTries 3
MaxSessions 5
MaxStartups 10:30:100
LoginGraceTime 30
ClientAliveInterval 300
ClientAliveCountMax 2

# Features
X11Forwarding no
AllowTcpForwarding no
AllowAgentForwarding no
GatewayPorts no
PermitTunnel no
PrintMotd yes
Banner /etc/ssh/banner

# Logging
LogLevel VERBOSE
SyslogFacility AUTH

# Crypto
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com
MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512

# User restrictions
AllowUsers admin deploy
DenyUsers root nobody
EOF

# Create SSH banner
cat << 'EOF' | sudo tee /etc/ssh/banner
***************************************************************************
*                                                                         *
*   WARNING: This is a private computer system. Unauthorized access to   *
*   this system is prohibited and may be subject to criminal and civil   *
*   penalties. All activities on this system are logged and monitored.   *
*                                                                         *
***************************************************************************
EOF

# Test configuration
if sudo sshd -t; then
    echo "SSH configuration is valid"
    sudo systemctl restart ssh
    echo "SSH service restarted"
else
    echo "ERROR: SSH configuration is invalid"
    sudo cp /etc/ssh/sshd_config.backup.$(date +%Y%m%d) /etc/ssh/sshd_config
    exit 1
fi

echo "SSH hardening completed successfully"
```

### Fail2Ban Configuration for SSH
```bash
# Configure Fail2Ban for SSH protection
sudo nano /etc/fail2ban/jail.local
```

Fail2Ban SSH configuration:
```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
backend = systemd

[sshd]
enabled = true
port = ssh,2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
banaction = iptables-multiport
banaction_allports = iptables-allports

[sshd-ddos]
enabled = true
port = ssh,2222
filter = sshd-ddos
logpath = /var/log/auth.log
maxretry = 6
bantime = 86400
```

### SSH Key Rotation Script
```bash
#!/bin/bash
# ssh-key-rotation.sh
KEY_DIR="/etc/ssh/keys"
BACKUP_DIR="/backup/ssh-keys"
LOG_FILE="/var/log/ssh-key-rotation.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

# Backup current keys
backup_keys() {
    local backup_date=$(date +%Y%m%d_%H%M%S)
    sudo mkdir -p "$BACKUP_DIR/$backup_date"
    sudo cp -r "$KEY_DIR"/* "$BACKUP_DIR/$backup_date/"
    log "Current keys backed up to $BACKUP_DIR/$backup_date"
}

# Generate new host keys
generate_host_keys() {
    local temp_dir="/tmp/ssh_keys_$$"
    mkdir -p "$temp_dir"
    
    # Generate new keys
    ssh-keygen -t rsa -b 4096 -f "$temp_dir/ssh_host_rsa_key" -N ""
    ssh-keygen -t ecdsa -b 521 -f "$temp_dir/ssh_host_ecdsa_key" -N ""
    ssh-keygen -t ed25519 -f "$temp_dir/ssh_host_ed25519_key" -N ""
    
    # Set proper permissions
    chmod 600 "$temp_dir"/ssh_host_*_key
    chmod 644 "$temp_dir"/ssh_host_*_key.pub
    
    # Move to proper location
    sudo mv "$temp_dir"/ssh_host_* /etc/ssh/
    
    log "New host keys generated"
    rm -rf "$temp_dir"
}

# Update known_hosts on client machines
update_known_hosts() {
    local new_keys_info="/tmp/new_host_keys.txt"
    
    # Extract new host key fingerprints
    for key_file in /etc/ssh/ssh_host_*_key.pub; do
        ssh-keygen -l -f "$key_file" >> "$new_keys_info"
    done
    
    log "New host key fingerprints:"
    cat "$new_keys_info" | tee -a "$LOG_FILE"
    
    # Send notification about key change
    mail -s "SSH Host Keys Rotated - $(hostname)" admin@company.com < "$new_keys_info"
    
    rm -f "$new_keys_info"
}

# Main execution
log "Starting SSH key rotation"
backup_keys
generate_host_keys
sudo systemctl reload ssh
update_known_hosts
log "SSH key rotation completed"
```

## Quick Reference

### Essential SSH Commands
```bash
# Basic connections
ssh user@host                      # Connect to host
ssh -p 2222 user@host             # Connect on custom port
ssh -i keyfile user@host          # Use specific key
ssh -X user@host                  # Enable X11 forwarding

# File transfers
scp file user@host:/path          # Copy file to remote
scp user@host:/path/file .        # Copy file from remote
scp -r folder user@host:/path     # Copy directory
rsync -avz folder/ user@host:/path/ # Sync with rsync

# Tunneling
ssh -L 8080:localhost:80 user@host     # Local forward
ssh -R 8080:localhost:80 user@host     # Remote forward
ssh -D 1080 user@host                  # SOCKS proxy
ssh -f -N -L 8080:localhost:80 user@host # Background tunnel
```

### SSH Configuration Locations
```bash
# Server configuration
/etc/ssh/sshd_config              # Main server config
/etc/ssh/ssh_host_*_key          # Host private keys
/etc/ssh/ssh_host_*_key.pub      # Host public keys
/etc/ssh/moduli                  # Diffie-Hellman parameters

# Client configuration
~/.ssh/config                    # User SSH config
~/.ssh/known_hosts              # Known host keys
~/.ssh/authorized_keys          # Authorized public keys
~/.ssh/id_*                     # User private keys
~/.ssh/id_*.pub                 # User public keys

# System-wide client config
/etc/ssh/ssh_config             # Global client config
/etc/ssh/ssh_known_hosts        # System known hosts
```

### SSH Service Management
```bash
# Service control
sudo systemctl start ssh         # Start SSH service
sudo systemctl stop ssh          # Stop SSH service
sudo systemctl restart ssh       # Restart SSH service
sudo systemctl reload ssh        # Reload config without restart
sudo systemctl status ssh        # Check service status

# Configuration testing
sudo sshd -t                     # Test configuration syntax
sudo sshd -T                     # Dump configuration
sudo sshd -d                     # Run in debug mode
```

## Troubleshooting

### Common SSH Connection Issues

**Connection refused:**
```bash
# Check if SSH service is running
sudo systemctl status ssh
sudo systemctl start ssh

# Check if SSH is listening on correct port
sudo ss -tlnp | grep :22
sudo netstat -tlnp | grep :22

# Check firewall settings
sudo ufw status
sudo iptables -L | grep ssh

# Test connection locally
ssh localhost
telnet localhost 22
```

**Permission denied (publickey):**
```bash
# Check SSH key permissions
ls -la ~/.ssh/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
chmod 600 ~/.ssh/authorized_keys

# Verify key is in authorized_keys
cat ~/.ssh/authorized_keys
ssh-copy-id -i ~/.ssh/id_rsa.pub user@host

# Check server logs
sudo journalctl -u ssh -f
sudo tail -f /var/log/auth.log

# Test key authentication
ssh -v user@host
ssh-add -l  # List loaded keys
ssh-add ~/.ssh/id_rsa  # Add key to agent
```

**Host key verification failed:**
```bash
# Remove old host key
ssh-keygen -R hostname
ssh-keygen -R ip_address

# Update known_hosts
ssh-keyscan hostname >> ~/.ssh/known_hosts

# Accept new key (if legitimate)
ssh -o StrictHostKeyChecking=no user@host
```

**Connection timeouts:**
```bash
# Check network connectivity
ping hostname
traceroute hostname
telnet hostname 22

# Check SSH client configuration
ssh -v user@host
ssh -o ConnectTimeout=10 user@host

# Check server configuration
grep -E "(ClientAlive|LoginGrace)" /etc/ssh/sshd_config
```

**Authentication loops:**
```bash
# Check SSH agent
ssh-add -l
ssh-add -D  # Remove all keys from agent
ssh-add ~/.ssh/id_rsa  # Add specific key

# Check key format
ssh-keygen -l -f ~/.ssh/id_rsa.pub

# Check server authentication methods
grep -E "(AuthenticationMethods|PasswordAuthentication)" /etc/ssh/sshd_config
```

### SSH Performance Issues

**Slow SSH connections:**
```bash
# Disable DNS lookup
echo "UseDNS no" >> /etc/ssh/sshd_config

# Disable GSSAPI authentication
echo "GSSAPIAuthentication no" >> /etc/ssh/sshd_config

# Enable connection multiplexing (client)
cat << 'EOF' >> ~/.ssh/config
ControlMaster auto
ControlPath ~/.ssh/control-%r@%h:%p
ControlPersist 10m
EOF

# Use compression for slow connections
ssh -C user@host
```

**SSH tunneling issues:**
```bash
# Check port forwarding is allowed
grep -E "(AllowTcpForwarding|GatewayPorts)" /etc/ssh/sshd_config

# Test tunnel connectivity
ssh -L 8080:localhost:80 -N -v user@host
curl http://localhost:8080

# Check for port conflicts
sudo ss -tlnp | grep :8080
sudo lsof -i :8080
```

### SSH Security Issues

**Detecting brute force attacks:**
```bash
# Check failed login attempts
sudo grep "Failed password" /var/log/auth.log | tail -20
sudo journalctl | grep "Failed password" | awk '{print $11}' | sort | uniq -c | sort -nr

# Install and configure Fail2Ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check banned IPs
sudo fail2ban-client status sshd
```

**SSH key security audit:**
```bash
# Check for weak keys
for key in ~/.ssh/id_*; do
    if [[ -f "$key" && ! "$key" =~ \.pub$ ]]; then
        echo "Checking $key:"
        ssh-keygen -l -f "$key.pub"
    fi
done

# Check authorized_keys for weak keys
awk '{print $1 " " $2}' ~/.ssh/authorized_keys | ssh-keygen -l -f -

# Check for old RSA keys (< 2048 bits)
ssh-keygen -l -f ~/.ssh/id_rsa.pub | awk '$1 < 2048 {print "Weak key detected: " $0}'
```

### Log Analysis and Debugging

**SSH log analysis:**
```bash
# Real-time SSH log monitoring
sudo tail -f /var/log/auth.log | grep ssh

# Successful login analysis
sudo grep "Accepted" /var/log/auth.log | awk '{print $1, $2, $3, $9, $11}' | sort

# Failed login analysis
sudo grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr

# Connection duration analysis
sudo last | head -20

# SSH session analysis
sudo who -u
sudo w
```

**Debug SSH connections:**
```bash
# Client-side debugging
ssh -v user@host          # Verbose
ssh -vv user@host         # More verbose
ssh -vvv user@host        # Most verbose

# Server-side debugging
sudo sshd -d -p 2223      # Debug mode on alternate port

# Analyze SSH traffic
sudo tcpdump -i any port 22
sudo wireshark           # GUI packet analyzer
```

## Performance Tips

### SSH Performance Optimization
```bash
# Client-side optimizations
cat << 'EOF' >> ~/.ssh/config
# Performance optimizations
Compression yes
CompressionLevel 6
Cipher aes128-ctr
ServerAliveInterval 60
ServerAliveCountMax 3
TCPKeepAlive yes

# Connection multiplexing
ControlMaster auto
ControlPath ~/.ssh/control-%r@%h:%p
ControlPersist 10m

# Disable slow authentication methods
GSSAPIAuthentication no
GSSAPIKeyExchange no
GSSAPIDelegateCredentials no
EOF
```

### SSH Connection Multiplexing
```bash
# Advanced connection sharing
cat << 'EOF' >> ~/.ssh/config
Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
    
# Create socket directory
mkdir -p ~/.ssh/sockets
chmod 700 ~/.ssh/sockets
EOF

# Use shared connections
ssh user@host  # First connection (master)
ssh user@host  # Subsequent connections (shared)
```

### Batch Operations
```bash
# Parallel SSH operations
parallel-ssh -h hosts.txt -l username "uptime"
parallel-ssh -h hosts.txt -l username -o /tmp/output "df -h"

# Mass SSH key deployment
for host in $(cat hosts.txt); do
    ssh-copy-id user@$host &
done
wait

# Cluster commands via SSH
pssh -h cluster.txt -l admin "sudo systemctl restart nginx"
```

### SSH with Configuration Management
```bash
# Ansible SSH configuration
cat << 'EOF' > ansible.cfg
[defaults]
host_key_checking = False
ssh_args = -o ControlMaster=auto -o ControlPersist=60s

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s -o PreferredAuthentications=publickey
pipelining = True
EOF

# Mass configuration deployment
ansible all -i inventory -m copy -a "src=/etc/ssh/sshd_config dest=/etc/ssh/sshd_config backup=yes" --become
ansible all -i inventory -m service -a "name=ssh state=restarted" --become
```

## What's Next
- [VPN Configuration | Debian 13 Server]
- [Firewall Configuration | Debian 13 Server]
- [Security Hardening | Debian 13 Server]
- [Network Security | Debian 13 Server]