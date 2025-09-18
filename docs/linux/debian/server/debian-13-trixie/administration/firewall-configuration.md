---
sidebar_position: 12
title: "Firewall Configuration | Debian 13 Server"
sidebar_label: "Firewall Configuration"
description: "Complete guide to firewall configuration on Debian 13 Trixie server including UFW, iptables, nftables, port management, and advanced security rules."
keywords:
  - "debian 13 firewall"
  - "debian server ufw"
  - "debian trixie iptables"
  - "server firewall administration"
  - "debian enterprise security"
tags:
  - debian-13
  - debian-trixie
  - firewall-configuration
  - network-security
  - server-administration
slug: debian-13-firewall-configuration
---

# Firewall Configuration in Debian 13 Server

## Overview
This tutorial covers comprehensive firewall configuration for Debian 13 servers, from basic UFW setup to advanced iptables and nftables rules. You'll learn to secure your server with proper port management, traffic filtering, and enterprise-grade firewall policies.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 45 minutes  
**Required packages:** ufw, iptables, nftables  
**System requirements:** Root access, network connectivity for testing

## Installation
```bash
# UFW is usually pre-installed, but install if needed
sudo apt update
sudo apt install ufw

# Install additional firewall tools
sudo apt install iptables-persistent netfilter-persistent
sudo apt install nftables fail2ban
```

## Basic Section 🟢

### UFW (Uncomplicated Firewall) Basics
```bash
# Check UFW status
sudo ufw status

# Enable UFW
sudo ufw enable

# Disable UFW
sudo ufw disable

# Reset UFW to defaults
sudo ufw --force reset
```

### Basic UFW Rules
```bash
# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (important: do this before enabling!)
sudo ufw allow ssh
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow http
sudo ufw allow https
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow specific port
sudo ufw allow 8080/tcp
sudo ufw allow 53/udp

# Allow port range
sudo ufw allow 6000:6007/tcp
```

### UFW with Specific IPs
```bash
# Allow from specific IP
sudo ufw allow from 192.168.1.100

# Allow from subnet
sudo ufw allow from 192.168.1.0/24

# Allow specific IP to specific port
sudo ufw allow from 192.168.1.100 to any port 22

# Allow from IP range to specific service
sudo ufw allow from 10.0.0.0/8 to any port 3306
```

### Viewing and Managing UFW Rules
```bash
# Show detailed status
sudo ufw status verbose
sudo ufw status numbered

# Delete rules
sudo ufw delete 2
sudo ufw delete allow 80/tcp

# Insert rule at specific position
sudo ufw insert 1 allow from 192.168.1.0/24
```

## Advanced Section 🔴

### Advanced UFW Configuration
```bash
# Application profiles
sudo ufw app list
sudo ufw allow 'Apache Full'
sudo ufw allow 'OpenSSH'

# Create custom application profile
sudo nano /etc/ufw/applications.d/myapp
```

Custom application profile example:
```ini
[MyWebApp]
title=My Web Application
description=Custom web application
ports=8080,8443/tcp

[MyDatabase]
title=My Database
description=Custom database server
ports=5432/tcp
```

### Rate Limiting with UFW
```bash
# Limit SSH connections (max 6 attempts in 30 seconds)
sudo ufw limit ssh

# Limit HTTP connections
sudo ufw limit 80/tcp

# Advanced rate limiting
sudo ufw limit from 192.168.1.0/24 to any port 22
```

### Logging Configuration
```bash
# Enable logging
sudo ufw logging on

# Set logging level
sudo ufw logging medium  # off, low, medium, high, full

# View logs
sudo tail -f /var/log/ufw.log
```

### iptables Direct Configuration
```bash
# View current iptables rules
sudo iptables -L -n -v
sudo iptables -t nat -L -n -v

# Save current rules
sudo iptables-save > /tmp/iptables-backup.rules

# Basic iptables rules
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -j DROP

# Save iptables rules permanently
sudo netfilter-persistent save
```

### Advanced iptables Rules
```bash
# Block specific IP
sudo iptables -A INPUT -s 192.168.1.100 -j DROP

# Allow only specific IP to SSH
sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j DROP

# Rate limiting
sudo iptables -A INPUT -p tcp --dport 80 -m limit --limit 5/min -j ACCEPT

# Port knocking simulation
sudo iptables -A INPUT -p tcp --dport 1001 -m recent --set --name knock1
sudo iptables -A INPUT -p tcp --dport 1002 -m recent --rcheck --seconds 5 --name knock1 -m recent --set --name knock2
sudo iptables -A INPUT -p tcp --dport 22 -m recent --rcheck --seconds 5 --name knock2 -j ACCEPT
```

### nftables Configuration
```bash
# Enable nftables
sudo systemctl enable nftables
sudo systemctl start nftables

# Basic nftables configuration
sudo nano /etc/nftables.conf
```

Basic nftables configuration:
```bash
#!/usr/sbin/nft -f

flush ruleset

table inet filter {
    chain input {
        type filter hook input priority 0; policy drop;
        
        # Allow loopback
        iifname "lo" accept
        
        # Allow established connections
        ct state established,related accept
        
        # Allow SSH from specific subnet
        ip saddr 192.168.1.0/24 tcp dport 22 accept
        
        # Allow HTTP/HTTPS
        tcp dport { 80, 443 } accept
        
        # Allow ICMP
        ip protocol icmp accept
        ip6 nexthdr icmpv6 accept
        
        # Rate limit SSH
        tcp dport 22 ct state new limit rate 5/minute accept
        
        # Log and drop everything else
        counter log drop
    }
    
    chain forward {
        type filter hook forward priority 0; policy drop;
    }
    
    chain output {
        type filter hook output priority 0; policy accept;
    }
}
```

### Enterprise Firewall Script
```bash
#!/bin/bash
# enterprise-firewall.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="/etc/firewall/firewall.conf"
LOG_FILE="/var/log/firewall-setup.log"

# Load configuration
source $CONFIG_FILE 2>/dev/null || {
    echo "Configuration file not found. Creating default..."
    create_default_config
}

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a $LOG_FILE
}

create_default_config() {
    sudo mkdir -p /etc/firewall
    cat << 'EOF' > $CONFIG_FILE
# Firewall Configuration
MANAGEMENT_NETWORK="192.168.1.0/24"
DMZ_NETWORK="10.0.1.0/24"
INTERNAL_NETWORK="10.0.0.0/24"

# Services
SSH_PORT="22"
HTTP_PORTS="80,443"
DATABASE_PORT="3306"
MAIL_PORTS="25,587,993,995"

# Security
SSH_RATE_LIMIT="5/min"
HTTP_RATE_LIMIT="100/sec"
FAIL2BAN_ENABLED="true"
LOGGING_LEVEL="medium"
EOF
}

setup_ufw_enterprise() {
    log "Setting up enterprise UFW configuration"
    
    # Reset and set defaults
    sudo ufw --force reset
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw default deny forward
    
    # Management access
    sudo ufw allow from $MANAGEMENT_NETWORK to any port $SSH_PORT
    sudo ufw allow from $MANAGEMENT_NETWORK to any port 161  # SNMP
    sudo ufw allow from $MANAGEMENT_NETWORK to any port 8080 # Management web
    
    # Public services
    for port in ${HTTP_PORTS//,/ }; do
        sudo ufw allow $port/tcp
    done
    
    # Internal services
    sudo ufw allow from $INTERNAL_NETWORK to any port $DATABASE_PORT
    
    # Mail services
    for port in ${MAIL_PORTS//,/ }; do
        sudo ufw allow $port/tcp
    done
    
    # Rate limiting
    sudo ufw limit ssh
    
    # Logging
    sudo ufw logging $LOGGING_LEVEL
    
    # Enable firewall
    sudo ufw enable
    
    log "UFW enterprise configuration completed"
}

setup_iptables_enterprise() {
    log "Setting up enterprise iptables configuration"
    
    # Flush existing rules
    sudo iptables -F
    sudo iptables -X
    sudo iptables -t nat -F
    sudo iptables -t nat -X
    
    # Set default policies
    sudo iptables -P INPUT DROP
    sudo iptables -P FORWARD DROP
    sudo iptables -P OUTPUT ACCEPT
    
    # Loopback
    sudo iptables -A INPUT -i lo -j ACCEPT
    
    # Established connections
    sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
    
    # Management network
    sudo iptables -A INPUT -s $MANAGEMENT_NETWORK -p tcp --dport $SSH_PORT -j ACCEPT
    sudo iptables -A INPUT -s $MANAGEMENT_NETWORK -p udp --dport 161 -j ACCEPT
    
    # Public web services with rate limiting
    sudo iptables -A INPUT -p tcp --dport 80 -m limit --limit 100/sec --limit-burst 200 -j ACCEPT
    sudo iptables -A INPUT -p tcp --dport 443 -m limit --limit 100/sec --limit-burst 200 -j ACCEPT
    
    # Database access from internal network
    sudo iptables -A INPUT -s $INTERNAL_NETWORK -p tcp --dport $DATABASE_PORT -j ACCEPT
    
    # ICMP
    sudo iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/sec -j ACCEPT
    
    # Anti-DDoS measures
    sudo iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
    sudo iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP
    sudo iptables -A INPUT -p tcp --tcp-flags ALL FIN,URG,PSH -j DROP
    sudo iptables -A INPUT -p tcp --tcp-flags ALL SYN,RST,ACK,FIN,URG -j DROP
    
    # Log dropped packets
    sudo iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7
    
    # Save rules
    sudo netfilter-persistent save
    
    log "iptables enterprise configuration completed"
}

setup_fail2ban() {
    if [[ $FAIL2BAN_ENABLED == "true" ]]; then
        log "Configuring Fail2Ban"
        
        sudo apt install -y fail2ban
        
        # Create custom jail configuration
        cat << 'EOF' > /etc/fail2ban/jail.local
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
backend = systemd

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[apache-auth]
enabled = true
port = http,https
filter = apache-auth
logpath = /var/log/apache*/*error.log
maxretry = 6

[apache-badbots]
enabled = true
port = http,https
filter = apache-badbots
logpath = /var/log/apache*/*access.log
maxretry = 2

[apache-noscript]
enabled = true
port = http,https
filter = apache-noscript
logpath = /var/log/apache*/*access.log
maxretry = 6
EOF
        
        sudo systemctl restart fail2ban
        sudo systemctl enable fail2ban
        
        log "Fail2Ban configuration completed"
    fi
}

monitor_firewall() {
    log "Setting up firewall monitoring"
    
    # Create monitoring script
    cat << 'EOF' > /usr/local/bin/firewall-monitor.sh
#!/bin/bash
LOG_FILE="/var/log/firewall-monitor.log"
EMAIL="admin@company.com"

check_ufw_status() {
    if ! sudo ufw status | grep -q "Status: active"; then
        echo "$(date): UFW is not active!" >> $LOG_FILE
        echo "UFW firewall is down on $(hostname)" | mail -s "Firewall Alert" $EMAIL
    fi
}

check_suspicious_activity() {
    # Check for port scan attempts
    if grep -q "UFW BLOCK" /var/log/ufw.log | tail -100 | wc -l | awk '$1 > 50'; then
        echo "$(date): High number of blocked connections detected" >> $LOG_FILE
    fi
    
    # Check fail2ban status
    if systemctl is-active --quiet fail2ban; then
        BANNED_IPS=$(sudo fail2ban-client status sshd | grep "Banned IP list" | wc -w)
        if [ $BANNED_IPS -gt 5 ]; then
            echo "$(date): Multiple IPs banned by fail2ban: $BANNED_IPS" >> $LOG_FILE
        fi
    fi
}

main() {
    check_ufw_status
    check_suspicious_activity
}

main
EOF
    
    chmod +x /usr/local/bin/firewall-monitor.sh
    
    # Add to crontab
    (crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/firewall-monitor.sh") | crontab -
    
    log "Firewall monitoring setup completed"
}

show_status() {
    echo "=== Firewall Status ==="
    sudo ufw status verbose
    echo
    echo "=== Fail2Ban Status ==="
    sudo fail2ban-client status 2>/dev/null || echo "Fail2Ban not running"
    echo
    echo "=== Active Connections ==="
    ss -tuln
}

case "${1:-}" in
    "ufw")
        setup_ufw_enterprise
        ;;
    "iptables")
        setup_iptables_enterprise
        ;;
    "fail2ban")
        setup_fail2ban
        ;;
    "monitor")
        monitor_firewall
        ;;
    "status")
        show_status
        ;;
    "full")
        setup_ufw_enterprise
        setup_fail2ban
        monitor_firewall
        show_status
        ;;
    *)
        echo "Usage: $0 {ufw|iptables|fail2ban|monitor|status|full}"
        exit 1
        ;;
esac
```

## Configuration Examples

### Web Server Firewall
```bash
# WordPress/Apache server
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 21/tcp    # FTP (if needed)
sudo ufw allow 22/tcp from 192.168.1.0/24  # SSH from management network only

# Rate limiting for web traffic
sudo ufw limit 80/tcp
sudo ufw limit 443/tcp
```

### Database Server Firewall
```bash
# MySQL/MariaDB server
sudo ufw allow 22/tcp from 192.168.1.0/24  # SSH from management
sudo ufw allow 3306/tcp from 10.0.0.0/8    # MySQL from app servers
sudo ufw deny 3306/tcp  # Block MySQL from internet
```

### Mail Server Firewall
```bash
# Mail server configuration
sudo ufw allow 22/tcp     # SSH
sudo ufw allow 25/tcp     # SMTP
sudo ufw allow 587/tcp    # SMTP submission
sudo ufw allow 993/tcp    # IMAPS
sudo ufw allow 995/tcp    # POP3S
sudo ufw allow 80/tcp     # HTTP (for Let's Encrypt)
sudo ufw allow 443/tcp    # HTTPS (webmail)
```

## Security Considerations

### Defense in Depth
```bash
# Multiple layers of security
# 1. Network firewall (hardware/cloud)
# 2. Host firewall (UFW/iptables)
# 3. Application firewall (mod_security, etc.)
# 4. Intrusion detection (fail2ban, OSSEC)
```

### Principle of Least Privilege
```bash
# Only allow necessary ports and sources
sudo ufw default deny incoming
sudo ufw default deny forward
sudo ufw allow from trusted_network to any port ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Regular Security Audits
```bash
# Audit open ports
sudo ss -tuln
sudo nmap -sS -O localhost

# Check UFW rules
sudo ufw status numbered

# Review logs
sudo tail -100 /var/log/ufw.log | grep BLOCK
sudo fail2ban-client status
```

### Backup and Recovery
```bash
# Backup UFW rules
sudo cp /etc/ufw/user.rules /backup/ufw-user.rules
sudo cp /etc/ufw/user6.rules /backup/ufw-user6.rules

# Backup iptables rules
sudo iptables-save > /backup/iptables-rules.backup
sudo ip6tables-save > /backup/ip6tables-rules.backup

# Create emergency access script
cat << 'EOF' > /root/emergency-access.sh
#!/bin/bash
# Emergency access script - run if locked out
sudo ufw disable
sudo iptables -F
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
echo "Emergency access enabled - secure system ASAP!"
EOF
chmod +x /root/emergency-access.sh
```

## Quick Reference

### UFW Commands
```bash
# Basic operations
sudo ufw enable/disable/reset
sudo ufw status [verbose|numbered]
sudo ufw default [allow|deny] [incoming|outgoing]

# Rule management
sudo ufw allow/deny [port][/protocol]
sudo ufw allow from [IP] to any port [port]
sudo ufw delete [rule-number]
sudo ufw insert [position] [rule]

# Applications
sudo ufw app list
sudo ufw allow '[App Name]'

# Logging
sudo ufw logging [on|off|low|medium|high|full]
```

### iptables Commands
```bash
# View rules
sudo iptables -L [-n] [-v] [--line-numbers]
sudo iptables -t [table] -L

# Add rules
sudo iptables -A [chain] [rule]
sudo iptables -I [chain] [position] [rule]

# Delete rules
sudo iptables -D [chain] [rule-number]
sudo iptables -F [chain]

# Save/restore
sudo iptables-save > file
sudo iptables-restore < file
sudo netfilter-persistent save
```

## Troubleshooting

### Common Issues

**Locked out after enabling firewall:**
```bash
# Prevention: Always allow SSH first
sudo ufw allow ssh
sudo ufw enable

# Recovery: Use console access or emergency script
sudo ufw disable
# Or reset completely
sudo ufw --force reset
```

**UFW rules not working:**
```bash
# Check if UFW is actually active
sudo ufw status
sudo systemctl status ufw

# Verify rules order
sudo ufw status numbered

# Check underlying iptables
sudo iptables -L -n -v
```

**Can't connect to services:**
```bash
# Check if service is running
sudo systemctl status service-name

# Verify port is listening
sudo ss -tuln | grep :80

# Test connectivity
telnet localhost 80
nmap -p 80 localhost

# Check UFW logs
sudo tail -f /var/log/ufw.log
```

**Performance issues:**
```bash
# Too many rules can slow down traffic
sudo ufw status numbered | wc -l

# Optimize rule order (most frequent first)
sudo ufw status verbose

# Consider using ipset for large IP lists
sudo apt install ipset
```

**IPv6 issues:**
```bash
# Enable IPv6 in UFW
sudo nano /etc/default/ufw
# Set IPV6=yes

# Check IPv6 rules
sudo ip6tables -L -n -v

# Test IPv6 connectivity
ping6 localhost
```

## Performance Tips

### Rule Optimization
- Place most frequently matched rules first
- Use specific source/destination addresses when possible
- Combine similar rules where applicable
- Regular cleanup of unused rules

### Logging Optimization
```bash
# Adjust logging level to balance security and performance
sudo ufw logging medium

# Rotate logs regularly
sudo logrotate -f /etc/logrotate.d/ufw
```

### System Tuning
```bash
# Increase netfilter hash table size for better performance
echo 'net.netfilter.nf_conntrack_max = 65536' >> /etc/sysctl.conf
echo 'net.netfilter.nf_conntrack_tcp_timeout_established = 300' >> /etc/sysctl.conf
sudo sysctl -p
```

## What's Next
- [Intrusion Detection | Debian 13 Server]
- [VPN Configuration | Debian 13 Server]  
- [Security Monitoring | Debian 13 Server]
- [Network Security | Debian 13 Server]