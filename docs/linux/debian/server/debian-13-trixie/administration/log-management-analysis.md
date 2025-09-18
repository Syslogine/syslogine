---
sidebar_position: 15
title: "Log Management and Analysis | Debian 13 Server"
sidebar_label: "Log Management"
description: "Complete guide to log management and analysis on Debian 13 Trixie server including systemd journal, rsyslog configuration, log rotation, centralized logging, and security analysis."
keywords:
  - "debian 13 logging"
  - "debian server log analysis"
  - "debian trixie systemd journal"
  - "server log management"
  - "debian enterprise logging"
tags:
  - debian-13
  - debian-trixie
  - log-management
  - log-analysis
  - server-administration
slug: debian-13-log-management-analysis
---

# Log Management and Analysis in Debian 13 Server

## Overview
This tutorial covers comprehensive log management and analysis for Debian 13 servers, including systemd journal configuration, rsyslog setup, log rotation, centralized logging solutions, and security analysis techniques. You'll learn to efficiently collect, store, analyze, and monitor system and application logs.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 60 minutes  
**Required packages:** systemd, rsyslog, logrotate  
**System requirements:** Sufficient disk space for log storage, root access

## Installation
```bash
# Install log management tools
sudo apt update
sudo apt install rsyslog logrotate logwatch

# Install analysis tools
sudo apt install goaccess awstats multitail lnav

# Install centralized logging tools (optional)
sudo apt install elasticsearch logstash kibana filebeat
```

## Basic Section 🟢

### Understanding Debian 13 Logging
```bash
# View systemd journal
journalctl

# View recent logs
journalctl -n 50

# Follow logs in real-time
journalctl -f

# View logs for specific service
journalctl -u nginx
journalctl -u ssh

# View logs for specific time period
journalctl --since "2024-12-15 10:00:00"
journalctl --since yesterday
journalctl --since "1 hour ago"
```

### Basic Log File Locations
```bash
# System logs
/var/log/syslog          # General system messages
/var/log/auth.log        # Authentication logs
/var/log/kern.log        # Kernel messages
/var/log/boot.log        # Boot messages

# Application logs
/var/log/apache2/        # Apache web server
/var/log/nginx/          # Nginx web server
/var/log/mysql/          # MySQL database
/var/log/mail.log        # Mail server logs

# View log files
tail -f /var/log/syslog
head -100 /var/log/auth.log
grep "error" /var/log/syslog
```

### Basic Log Analysis Commands
```bash
# Search for specific patterns
grep "Failed password" /var/log/auth.log
grep -i "error" /var/log/syslog
grep -r "404" /var/log/apache2/

# Count occurrences
grep -c "Failed password" /var/log/auth.log
awk '/Failed password/ {print $1 " " $2 " " $3}' /var/log/auth.log | sort | uniq -c

# Monitor multiple logs
multitail /var/log/syslog /var/log/auth.log

# Advanced log viewer
lnav /var/log/syslog
```

### Simple Log Rotation
```bash
# View current logrotate configuration
cat /etc/logrotate.conf
ls /etc/logrotate.d/

# Manually run logrotate
sudo logrotate /etc/logrotate.conf

# Test logrotate configuration
sudo logrotate -d /etc/logrotate.conf

# Force rotation
sudo logrotate -f /etc/logrotate.conf
```

## Advanced Section 🔴

### Advanced systemd Journal Configuration
```bash
# Configure journal settings
sudo nano /etc/systemd/journald.conf
```

Example journald.conf:
```ini
[Journal]
# Storage location
Storage=persistent

# Maximum disk usage
SystemMaxUse=1G
SystemKeepFree=500M
SystemMaxFileSize=100M

# Runtime storage
RuntimeMaxUse=100M
RuntimeKeepFree=50M

# Retention time
MaxRetentionSec=1month

# Compression
Compress=yes

# Forward to syslog
ForwardToSyslog=yes
ForwardToWall=no

# Rate limiting
RateLimitIntervalSec=30s
RateLimitBurst=1000
```

### Advanced rsyslog Configuration
```bash
# Main rsyslog configuration
sudo nano /etc/rsyslog.conf
```

Advanced rsyslog.conf:
```bash
# Global directives
$ModLoad imuxsock
$ModLoad imklog
$ModLoad imudp
$UDPServerRun 514
$UDPServerAddress 127.0.0.1

# Templates for log formatting
$template CustomFormat,"%TIMESTAMP% %HOSTNAME% %syslogtag% %msg%\n"
$template DailyPerHostLogs,"/var/log/hosts/%HOSTNAME%/%$YEAR%-%$MONTH%-%$DAY%.log"

# High precision timestamps
$ActionFileDefaultTemplate RSYSLOG_TraditionalFileFormat

# Security rules
auth,authpriv.*                 /var/log/auth.log
*.*;auth,authpriv.none          -/var/log/syslog
daemon.*                        -/var/log/daemon.log
kern.*                          -/var/log/kern.log
mail.*                          -/var/log/mail.log
user.*                          -/var/log/user.log

# Emergency messages to all users
*.emerg                         :omusrmsg:*

# Remote logging (optional)
*.* @@log-server.company.com:514

# Application-specific logging
if $programname == 'nginx' then /var/log/nginx/nginx-syslog.log
if $programname == 'postfix' then /var/log/mail.log
& stop

# Security-related rules
auth,authpriv.info              /var/log/security.log
if $msg contains 'Failed password' then /var/log/failed-logins.log
if $msg contains 'FAILED LOGIN' then /var/log/failed-logins.log
& stop
```

### Enterprise Log Management Script
```bash
#!/bin/bash
# enterprise-log-manager.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="/etc/logmanager/config.conf"
LOG_DIR="/var/log/analysis"
REPORT_DIR="/var/log/reports"
EMAIL="admin@company.com"

# Load configuration
source $CONFIG_FILE 2>/dev/null || create_default_config

create_default_config() {
    sudo mkdir -p /etc/logmanager
    cat << 'EOF' > $CONFIG_FILE
# Log Management Configuration
LOG_RETENTION_DAYS=30
ANALYSIS_ENABLED=true
EMAIL_REPORTS=true
COMPRESS_LOGS=true
CENTRALIZED_LOGGING=false
SIEM_INTEGRATION=false

# Alert thresholds
FAILED_LOGIN_THRESHOLD=10
ERROR_RATE_THRESHOLD=50
DISK_USAGE_THRESHOLD=80

# Paths
BACKUP_PATH="/backup/logs"
ARCHIVE_PATH="/archive/logs"
EOF
}

setup_log_structure() {
    sudo mkdir -p $LOG_DIR $REPORT_DIR
    sudo mkdir -p /var/log/{security,applications,performance,audit}
    
    # Create custom rsyslog rules
    cat << 'EOF' > /etc/rsyslog.d/50-custom-logs.conf
# Custom log separation
if $programname == 'sshd' and $msg contains 'Failed password' then /var/log/security/failed-ssh.log
if $programname == 'sudo' then /var/log/security/sudo.log
if $syslogfacility-text == 'authpriv' then /var/log/security/auth-detailed.log

# Application logs
if $programname startswith 'apache' then /var/log/applications/apache.log
if $programname startswith 'nginx' then /var/log/applications/nginx.log
if $programname startswith 'mysql' then /var/log/applications/mysql.log

# Performance logs
if $msg contains 'high load' then /var/log/performance/load.log
if $msg contains 'out of memory' then /var/log/performance/memory.log

# Stop processing after custom rules
& stop
EOF
    
    sudo systemctl restart rsyslog
}

analyze_security_logs() {
    local report_file="$REPORT_DIR/security-$(date +%Y%m%d).txt"
    
    echo "Security Log Analysis - $(date)" > $report_file
    echo "=================================" >> $report_file
    echo >> $report_file
    
    # Failed login attempts
    echo "Failed Login Attempts (Last 24 hours):" >> $report_file
    journalctl --since "24 hours ago" | grep -i "failed password" | \
        awk '{print $11}' | sort | uniq -c | sort -nr | head -10 >> $report_file
    echo >> $report_file
    
    # Sudo usage
    echo "Sudo Command Usage:" >> $report_file
    journalctl --since "24 hours ago" | grep -i "sudo" | \
        awk '{print $6 " " $8}' | sort | uniq -c | sort -nr | head -10 >> $report_file
    echo >> $report_file
    
    # SSH connections
    echo "SSH Connection Summary:" >> $report_file
    journalctl --since "24 hours ago" -u ssh | grep "Accepted\|Failed" | \
        awk '{print $1 " " $2 " " $3 " " $9 " " $11}' | sort | uniq -c >> $report_file
    echo >> $report_file
    
    # Check for alerts
    local failed_logins=$(journalctl --since "24 hours ago" | grep -c "Failed password" || echo 0)
    if [ $failed_logins -gt $FAILED_LOGIN_THRESHOLD ]; then
        echo "ALERT: High number of failed login attempts: $failed_logins" >> $report_file
        if [ "$EMAIL_REPORTS" == "true" ]; then
            echo "Security Alert: $failed_logins failed login attempts detected on $(hostname)" | \
                mail -s "Security Alert - $(hostname)" $EMAIL
        fi
    fi
}

analyze_application_logs() {
    local report_file="$REPORT_DIR/application-$(date +%Y%m%d).txt"
    
    echo "Application Log Analysis - $(date)" > $report_file
    echo "===================================" >> $report_file
    echo >> $report_file
    
    # Web server errors
    if [ -f /var/log/apache2/error.log ]; then
        echo "Apache Error Summary (Last 24 hours):" >> $report_file
        tail -10000 /var/log/apache2/error.log | \
            grep "$(date -d 'yesterday' '+%Y-%m-%d')\|$(date '+%Y-%m-%d')" | \
            grep -oE '\[error\].*' | sort | uniq -c | sort -nr | head -10 >> $report_file
        echo >> $report_file
    fi
    
    if [ -f /var/log/nginx/error.log ]; then
        echo "Nginx Error Summary (Last 24 hours):" >> $report_file
        tail -10000 /var/log/nginx/error.log | \
            grep "$(date '+%Y/%m/%d')" | \
            awk '{print $4 " " $5}' | sort | uniq -c | sort -nr | head -10 >> $report_file
        echo >> $report_file
    fi
    
    # Database errors
    if [ -f /var/log/mysql/error.log ]; then
        echo "MySQL Error Summary:" >> $report_file
        tail -1000 /var/log/mysql/error.log | \
            grep -i "error\|warning" | tail -10 >> $report_file
        echo >> $report_file
    fi
}

analyze_performance_logs() {
    local report_file="$REPORT_DIR/performance-$(date +%Y%m%d).txt"
    
    echo "Performance Log Analysis - $(date)" > $report_file
    echo "====================================" >> $report_file
    echo >> $report_file
    
    # System load
    echo "High Load Events (Last 24 hours):" >> $report_file
    journalctl --since "24 hours ago" | grep -i "load average" | tail -10 >> $report_file
    echo >> $report_file
    
    # Memory issues
    echo "Memory Related Events:" >> $report_file
    journalctl --since "24 hours ago" | grep -i "out of memory\|oom\|killed process" | tail -10 >> $report_file
    echo >> $report_file
    
    # Disk space issues
    echo "Disk Space Analysis:" >> $report_file
    df -h >> $report_file
    echo >> $report_file
    
    # Check disk usage threshold
    local disk_usage=$(df / | awk 'NR==2 {gsub(/%/,"",$5); print $5}')
    if [ $disk_usage -gt $DISK_USAGE_THRESHOLD ]; then
        echo "ALERT: High disk usage: ${disk_usage}%" >> $report_file
        if [ "$EMAIL_REPORTS" == "true" ]; then
            echo "Performance Alert: Disk usage is ${disk_usage}% on $(hostname)" | \
                mail -s "Disk Space Alert - $(hostname)" $EMAIL
        fi
    fi
}

setup_log_rotation() {
    # Create custom logrotate configuration
    cat << 'EOF' > /etc/logrotate.d/custom-logs
/var/log/security/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    sharedscripts
    postrotate
        /bin/kill -HUP `cat /var/run/rsyslogd.pid 2> /dev/null` 2> /dev/null || true
    endscript
}

/var/log/applications/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    sharedscripts
    postrotate
        /bin/kill -HUP `cat /var/run/rsyslogd.pid 2> /dev/null` 2> /dev/null || true
    endscript
}

/var/log/performance/*.log {
    weekly
    missingok
    rotate 8
    compress
    delaycompress
    notifempty
}
EOF
}

setup_real_time_monitoring() {
    # Create real-time log monitoring script
    cat << 'EOF' > /usr/local/bin/realtime-log-monitor.sh
#!/bin/bash
ALERT_EMAIL="admin@company.com"
LOG_FILE="/var/log/realtime-monitor.log"

monitor_auth_failures() {
    tail -f /var/log/auth.log | while read line; do
        if echo "$line" | grep -q "Failed password"; then
            IP=$(echo "$line" | awk '{print $11}')
            echo "$(date): Failed login from $IP" >> $LOG_FILE
            
            # Count failures from this IP in last hour
            FAILURES=$(grep "$(date '+%Y-%m-%d %H')" /var/log/auth.log | grep "Failed password" | grep "$IP" | wc -l)
            
            if [ $FAILURES -gt 5 ]; then
                echo "Multiple failed logins from $IP detected" | \
                    mail -s "Security Alert - $(hostname)" $ALERT_EMAIL
            fi
        fi
    done
}

monitor_system_errors() {
    journalctl -f | while read line; do
        if echo "$line" | grep -i "critical\|emergency\|panic"; then
            echo "$(date): Critical system event: $line" >> $LOG_FILE
            echo "Critical system event on $(hostname): $line" | \
                mail -s "Critical System Alert - $(hostname)" $ALERT_EMAIL
        fi
    done
}

# Run monitors in background
monitor_auth_failures &
monitor_system_errors &

wait
EOF
    
    chmod +x /usr/local/bin/realtime-log-monitor.sh
    
    # Create systemd service for real-time monitoring
    cat << 'EOF' > /etc/systemd/system/realtime-log-monitor.service
[Unit]
Description=Real-time Log Monitor
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/realtime-log-monitor.sh
Restart=always
RestartSec=10
User=root

[Install]
WantedBy=multi-user.target
EOF
    
    sudo systemctl daemon-reload
    sudo systemctl enable realtime-log-monitor
    sudo systemctl start realtime-log-monitor
}

generate_summary_report() {
    local summary_file="$REPORT_DIR/summary-$(date +%Y%m%d).html"
    
    cat << 'EOF' > $summary_file
<!DOCTYPE html>
<html>
<head>
    <title>Daily Log Summary</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background-color: #f0f0f0; padding: 10px; }
        .section { margin: 20px 0; border: 1px solid #ccc; padding: 10px; }
        .alert { background-color: #ffcccc; }
        .ok { background-color: #ccffcc; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Daily Log Summary Report</h1>
        <p>Generated: $(date)</p>
        <p>Server: $(hostname)</p>
    </div>
EOF
    
    # Add security summary
    echo '<div class="section">' >> $summary_file
    echo '<h2>Security Summary</h2>' >> $summary_file
    echo '<table>' >> $summary_file
    echo '<tr><th>Metric</th><th>Count</th><th>Status</th></tr>' >> $summary_file
    
    local failed_logins=$(journalctl --since "24 hours ago" | grep -c "Failed password" || echo 0)
    local status_class="ok"
    [ $failed_logins -gt $FAILED_LOGIN_THRESHOLD ] && status_class="alert"
    echo "<tr class=\"$status_class\"><td>Failed Login Attempts</td><td>$failed_logins</td><td>$([ $failed_logins -gt $FAILED_LOGIN_THRESHOLD ] && echo "ALERT" || echo "OK")</td></tr>" >> $summary_file
    
    echo '</table>' >> $summary_file
    echo '</div>' >> $summary_file
    
    # Add system summary
    echo '<div class="section">' >> $summary_file
    echo '<h2>System Summary</h2>' >> $summary_file
    echo '<pre>' >> $summary_file
    df -h >> $summary_file
    echo '</pre>' >> $summary_file
    echo '</div>' >> $summary_file
    
    echo '</body></html>' >> $summary_file
    
    if [ "$EMAIL_REPORTS" == "true" ]; then
        mail -s "Daily Log Summary - $(hostname)" -a "Content-Type: text/html" $EMAIL < $summary_file
    fi
}

cleanup_old_logs() {
    if [ "$COMPRESS_LOGS" == "true" ]; then
        find /var/log -name "*.log" -mtime +1 -exec gzip {} \;
    fi
    
    # Archive old logs
    find /var/log -name "*.gz" -mtime +$LOG_RETENTION_DAYS -exec mv {} $ARCHIVE_PATH/ \;
    
    # Clean up old archives
    find $ARCHIVE_PATH -name "*.gz" -mtime +90 -delete
}

case "${1:-}" in
    "setup")
        setup_log_structure
        setup_log_rotation
        setup_real_time_monitoring
        echo "Log management setup completed"
        ;;
    "analyze")
        analyze_security_logs
        analyze_application_logs
        analyze_performance_logs
        echo "Log analysis completed"
        ;;
    "monitor")
        setup_real_time_monitoring
        echo "Real-time monitoring setup completed"
        ;;
    "report")
        generate_summary_report
        echo "Summary report generated"
        ;;
    "cleanup")
        cleanup_old_logs
        echo "Log cleanup completed"
        ;;
    "daily")
        analyze_security_logs
        analyze_application_logs
        analyze_performance_logs
        generate_summary_report
        cleanup_old_logs
        echo "Daily log management tasks completed"
        ;;
    *)
        echo "Usage: $0 {setup|analyze|monitor|report|cleanup|daily}"
        exit 1
        ;;
esac
```

## Configuration Examples

### Centralized Logging with ELK Stack
```bash
# Install Elasticsearch
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
sudo apt update && sudo apt install elasticsearch

# Configure Elasticsearch
sudo nano /etc/elasticsearch/elasticsearch.yml
```

Elasticsearch configuration:
```yaml
cluster.name: log-cluster
node.name: log-node-1
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch
network.host: localhost
http.port: 9200
discovery.type: single-node
xpack.security.enabled: true
```

### Filebeat Configuration
```bash
# Install Filebeat
sudo apt install filebeat

# Configure Filebeat
sudo nano /etc/filebeat/filebeat.yml
```

Filebeat configuration:
```yaml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/syslog
    - /var/log/auth.log
  fields:
    logtype: system
  fields_under_root: true

- type: log
  enabled: true
  paths:
    - /var/log/apache2/*.log
  fields:
    logtype: apache
  fields_under_root: true

output.elasticsearch:
  hosts: ["localhost:9200"]
  username: "elastic"
  password: "your_password"

processors:
  - add_host_metadata:
      when.not.contains.tags: forwarded

logging.level: info
logging.to_files: true
logging.files:
  path: /var/log/filebeat
  name: filebeat
  keepfiles: 7
  permissions: 0644
```

### Custom Log Parsing Rules
```bash
# Create custom grok patterns
sudo nano /etc/logstash/patterns/custom
```

Custom patterns:
```
CUSTOM_TIMESTAMP %{YEAR}-%{MONTHNUM}-%{MONTHDAY} %{TIME}
SSH_FAILED_LOGIN %{CUSTOM_TIMESTAMP:timestamp} %{IPORHOST:server} sshd\[%{POSINT:pid}\]: Failed password for %{USERNAME:username} from %{IPORHOST:client_ip} port %{POSINT:port}
APACHE_ERROR \[%{HTTPDATE:timestamp}\] \[%{LOGLEVEL:severity}\] %{GREEDYDATA:message}
MYSQL_ERROR %{TIMESTAMP_ISO8601:timestamp} %{POSINT:thread_id} \[%{LOGLEVEL:severity}\] %{GREEDYDATA:message}
```

## Security Considerations

### Log Integrity and Protection
```bash
# Secure log directories
sudo chmod 750 /var/log
sudo chown root:adm /var/log

# Protect sensitive logs
sudo chmod 640 /var/log/auth.log
sudo chown root:adm /var/log/auth.log

# Use append-only attributes for critical logs
sudo chattr +a /var/log/auth.log
sudo chattr +a /var/log/audit/audit.log
```

### Log Forwarding Security
```bash
# Configure secure rsyslog forwarding
sudo nano /etc/rsyslog.d/60-secure-remote.conf
```

Secure remote logging:
```bash
# Enable TLS module
$ModLoad imtcp
$DefaultNetstreamDriver gtls
$DefaultNetstreamDriverCAFile /etc/ssl/rsyslog/ca.pem
$DefaultNetstreamDriverCertFile /etc/ssl/rsyslog/cert.pem
$DefaultNetstreamDriverKeyFile /etc/ssl/rsyslog/key.pem

# Secure remote forwarding
*.* @@(o)log-server.company.com:6514

# Authentication
$ActionSendStreamDriverAuthMode x509/name
$ActionSendStreamDriverPermittedPeer log-server.company.com
```

### Audit Logging
```bash
# Install and configure auditd
sudo apt install auditd audispd-plugins

# Configure audit rules
sudo nano /etc/audit/rules.d/audit.rules
```

Audit rules example:
```bash
# System calls
-a always,exit -F arch=b64 -S execve -k exec
-a always,exit -F arch=b32 -S execve -k exec

# File access monitoring
-w /etc/passwd -p wa -k passwd_changes
-w /etc/shadow -p wa -k shadow_changes
-w /etc/sudoers -p wa -k sudoers_changes

# Network configuration
-w /etc/network/ -p wa -k network_changes
-w /etc/hosts -p wa -k network_changes

# SSH configuration
-w /etc/ssh/sshd_config -p wa -k ssh_config
```

## Quick Reference

### systemd Journal Commands
```bash
# View logs
journalctl                          # All logs
journalctl -f                       # Follow logs
journalctl -u service-name          # Service logs
journalctl -p err                   # Error priority
journalctl --since "1 hour ago"     # Time-based
journalctl -k                       # Kernel messages
journalctl --list-boots             # Boot logs

# Output formats
journalctl -o json                  # JSON format
journalctl -o verbose               # Verbose format
journalctl -o cat                   # Just messages
```

### Log Analysis Commands
```bash
# Text processing
grep "pattern" /var/log/file        # Search pattern
awk '{print $1}' /var/log/file      # Extract fields
sort /var/log/file | uniq -c        # Count unique lines
sed 's/old/new/g' /var/log/file     # Replace text

# Statistics
wc -l /var/log/file                 # Line count
tail -f /var/log/file | grep pattern # Real-time search
head -100 /var/log/file             # First 100 lines
```

### Log Rotation Commands
```bash
# Manual rotation
sudo logrotate /etc/logrotate.conf  # Run rotation
sudo logrotate -d /etc/logrotate.conf # Debug mode
sudo logrotate -f /etc/logrotate.conf # Force rotation

# Check rotation status
sudo cat /var/lib/logrotate/status
```

## Troubleshooting

### Common Issues

**Journal not persisting:**
```bash
# Check journal configuration
sudo systemctl status systemd-journald
journalctl --verify

# Create persistent storage
sudo mkdir -p /var/log/journal
sudo chown root:systemd-journal /var/log/journal
sudo chmod 2755 /var/log/journal
sudo systemctl restart systemd-journald
```

**Rsyslog not receiving logs:**
```bash
# Check rsyslog status
sudo systemctl status rsyslog
sudo rsyslogd -N1

# Test configuration
logger "Test message"
tail /var/log/syslog

# Check for errors
journalctl -u rsyslog
```

**Log rotation not working:**
```bash
# Check logrotate status
sudo logrotate -d /etc/logrotate.conf
cat /var/lib/logrotate/status

# Manual test
sudo logrotate -v /etc/logrotate.d/rsyslog

# Check permissions
ls -la /var/log/
```

**High disk usage from logs:**
```bash
# Find large log files
sudo find /var/log -type f -size +100M -exec ls -lh {} \;

# Check journal size
journalctl --disk-usage

# Clean journal
sudo journalctl --vacuum-time=7d
sudo journalctl --vacuum-size=500M
```

**Missing application logs:**
```bash
# Check application configuration
sudo systemctl status application
journalctl -u application

# Verify log paths and permissions
ls -la /var/log/application/
sudo chmod 644 /var/log/application/*.log
```

## Performance Tips

### Journal Optimization
```bash
# Limit journal size
sudo nano /etc/systemd/journald.conf
# Set SystemMaxUse=1G
# Set MaxRetentionSec=1month

# Restart journald
sudo systemctl restart systemd-journald
```

### Rsyslog Performance
```bash
# Enable caching and queuing
echo '$MainMsgQueueSize 10000' >> /etc/rsyslog.conf
echo '$ActionQueueType LinkedList' >> /etc/rsyslog.conf
echo '$ActionQueueFileName srvrfwd' >> /etc/rsyslog.conf
echo '$ActionResumeRetryCount -1' >> /etc/rsyslog.conf

sudo systemctl restart rsyslog
```

### Log Analysis Optimization
```bash
# Use indexed search tools
sudo apt install lnav ripgrep

# Parallel processing
find /var/log -name "*.log" -print0 | xargs -0 -P 4 grep "pattern"

# Compressed log search
zgrep "pattern" /var/log/*.gz
```

## What's Next
- [Security Monitoring | Debian 13 Server]
- [Performance Monitoring | Debian 13 Server]
- [Alerting and Notifications | Debian 13 Server]
- [Compliance and Auditing | Debian 13 Server]