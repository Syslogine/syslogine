---
sidebar_position: 16
title: "Monitoring System Performance | Debian 13 Server"
sidebar_label: "Performance Monitoring"
description: "Complete guide to monitoring system performance on Debian 13 Trixie server including CPU, memory, disk, network monitoring, performance analysis tools, and alerting systems."
keywords:
  - "debian 13 performance monitoring"
  - "debian server monitoring"
  - "debian trixie system monitoring"
  - "server performance analysis"
  - "debian enterprise monitoring"
tags:
  - debian-13
  - debian-trixie
  - performance-monitoring
  - system-monitoring
  - server-administration
slug: debian-13-monitoring-system-performance
---

# Monitoring System Performance in Debian 13 Server

## Overview
This tutorial covers comprehensive system performance monitoring for Debian 13 servers, including real-time monitoring tools, historical data collection, performance analysis, alerting systems, and automated monitoring solutions. You'll learn to identify bottlenecks, optimize performance, and maintain system health.

## Prerequisites
**Difficulty:** 🟡 Intermediate  
**Time needed:** 70 minutes  
**Required packages:** sysstat, htop, iotop, nethogs  
**System requirements:** Root access, sufficient disk space for monitoring data

## Installation
```bash
# Install essential monitoring tools
sudo apt update
sudo apt install sysstat htop iotop nethogs nmon

# Install advanced monitoring tools
sudo apt install glances atop dstat ncdu tree

# Install network monitoring tools
sudo apt install iftop vnstat tcpdump wireshark-common

# Install system analysis tools
sudo apt install strace ltrace lsof psmisc
```

## Basic Section 🟢

### Real-time System Monitoring
```bash
# System overview with htop
htop

# System overview with top
top

# Advanced system monitor
glances

# Network process monitor
sudo nethogs

# Disk I/O monitor
sudo iotop

# Memory usage
free -h
cat /proc/meminfo

# CPU information
lscpu
cat /proc/cpuinfo
```

### Basic Performance Commands
```bash
# Load average
uptime
w

# CPU usage
mpstat 1 5                    # CPU stats every 1 second for 5 times
sar -u 1 5                    # CPU utilization

# Memory usage
vmstat 1 5                    # Virtual memory statistics
sar -r 1 5                    # Memory utilization

# Disk usage
df -h                         # Disk space usage
du -sh /path/*                # Directory sizes
iostat 1 5                    # I/O statistics

# Network usage
ss -tuln                      # Network connections
netstat -i                    # Network interface statistics
iftop                         # Real-time network usage
```

### Process Monitoring
```bash
# Process list
ps aux
ps -ef

# Process tree
pstree
ps auxf

# Find resource-intensive processes
ps aux --sort=-%cpu | head -10    # Top CPU users
ps aux --sort=-%mem | head -10    # Top memory users

# Monitor specific process
top -p PID
watch -n 1 'ps -o pid,ppid,cmd,%mem,%cpu --sort=-%mem | head -20'
```

### System Resource Information
```bash
# Hardware information
lshw -short
lspci
lsusb
dmidecode -t memory

# Storage information
lsblk
fdisk -l
blkid

# Network interfaces
ip addr show
ip route show
iwconfig                      # Wireless interfaces
```

## Advanced Section 🔴

### Comprehensive Monitoring with sysstat
```bash
# Enable sysstat data collection
sudo systemctl enable sysstat
sudo systemctl start sysstat

# Configure data collection interval
sudo nano /etc/cron.d/sysstat
# */10 * * * * root /usr/lib/sysstat/debian-sa1 1 1

# Generate system activity report
sar -A                        # All statistics
sar -u 1 10                   # CPU usage
sar -r 1 10                   # Memory usage
sar -d 1 10                   # Disk activity
sar -n DEV 1 10              # Network activity

# Historical data analysis
sar -u -f /var/log/sysstat/saXX    # CPU from specific day
sar -r -s 09:00:00 -e 17:00:00     # Memory during work hours
```

### Advanced Performance Analysis Script
```bash
#!/bin/bash
# performance-monitor.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="/etc/performance-monitor/config.conf"
DATA_DIR="/var/log/performance"
REPORT_DIR="/var/log/performance/reports"
ALERT_EMAIL="admin@company.com"

# Create directories
sudo mkdir -p "$DATA_DIR" "$REPORT_DIR" /etc/performance-monitor

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$DATA_DIR/monitor.log"
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
    cat << 'EOF' > "$CONFIG_FILE"
# Performance Monitor Configuration
MONITORING_ENABLED=true
COLLECTION_INTERVAL=60
RETENTION_DAYS=30

# Thresholds
CPU_THRESHOLD=80
MEMORY_THRESHOLD=85
DISK_THRESHOLD=90
LOAD_THRESHOLD=2.0
IOWAIT_THRESHOLD=20

# Network thresholds (MB/s)
NETWORK_IN_THRESHOLD=100
NETWORK_OUT_THRESHOLD=50

# Process monitoring
MONITOR_PROCESSES=true
PROCESS_CPU_THRESHOLD=50
PROCESS_MEMORY_THRESHOLD=25

# Alerting
EMAIL_ALERTS=true
ALERT_COOLDOWN=300
CRITICAL_ALERT_COOLDOWN=60

# Reporting
DAILY_REPORTS=true
WEEKLY_REPORTS=true
PERFORMANCE_GRAPHS=false
EOF
    
    log "Created default configuration at $CONFIG_FILE"
}

collect_system_metrics() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local data_file="$DATA_DIR/metrics-$(date +%Y%m%d).csv"
    
    # Create header if file doesn't exist
    if [ ! -f "$data_file" ]; then
        echo "timestamp,cpu_user,cpu_system,cpu_idle,cpu_iowait,load1,load5,load15,memory_used_pct,memory_available,disk_usage_pct,network_rx_mb,network_tx_mb" > "$data_file"
    fi
    
    # Collect CPU metrics
    local cpu_data=$(sar -u 1 1 | tail -1)
    local cpu_user=$(echo "$cpu_data" | awk '{print $3}')
    local cpu_system=$(echo "$cpu_data" | awk '{print $5}')
    local cpu_idle=$(echo "$cpu_data" | awk '{print $8}')
    local cpu_iowait=$(echo "$cpu_data" | awk '{print $6}')
    
    # Collect load averages
    local load_data=$(uptime | awk -F'load average:' '{print $2}' | tr -d ' ')
    local load1=$(echo "$load_data" | cut -d',' -f1)
    local load5=$(echo "$load_data" | cut -d',' -f2)
    local load15=$(echo "$load_data" | cut -d',' -f3)
    
    # Collect memory metrics
    local memory_data=$(free | grep '^Mem:')
    local memory_total=$(echo "$memory_data" | awk '{print $2}')
    local memory_used=$(echo "$memory_data" | awk '{print $3}')
    local memory_available=$(echo "$memory_data" | awk '{print $7}')
    local memory_used_pct=$(echo "scale=2; $memory_used * 100 / $memory_total" | bc)
    
    # Collect disk usage for root filesystem
    local disk_usage_pct=$(df / | tail -1 | awk '{gsub(/%/,"",$5); print $5}')
    
    # Collect network metrics
    local network_data=$(sar -n DEV 1 1 | grep -E '(eth0|ens|enp)' | head -1)
    local network_rx_kb=$(echo "$network_data" | awk '{print $5}' || echo "0")
    local network_tx_kb=$(echo "$network_data" | awk '{print $6}' || echo "0")
    local network_rx_mb=$(echo "scale=2; $network_rx_kb / 1024" | bc 2>/dev/null || echo "0")
    local network_tx_mb=$(echo "scale=2; $network_tx_kb / 1024" | bc 2>/dev/null || echo "0")
    
    # Write data to CSV
    echo "$timestamp,$cpu_user,$cpu_system,$cpu_idle,$cpu_iowait,$load1,$load5,$load15,$memory_used_pct,$memory_available,$disk_usage_pct,$network_rx_mb,$network_tx_mb" >> "$data_file"
    
    log "Collected metrics: CPU: ${cpu_user}% Memory: ${memory_used_pct}% Disk: ${disk_usage_pct}% Load: $load1"
}

check_thresholds() {
    local cpu_usage=$(sar -u 1 1 | tail -1 | awk '{print 100-$8}')
    local memory_usage=$(free | grep '^Mem:' | awk '{printf "%.1f", $3*100/$2}')
    local disk_usage=$(df / | tail -1 | awk '{gsub(/%/,"",$5); print $5}')
    local load1=$(uptime | awk -F'load average:' '{print $2}' | awk -F',' '{print $1}' | tr -d ' ')
    local iowait=$(sar -u 1 1 | tail -1 | awk '{print $6}')
    
    # Check CPU threshold
    if (( $(echo "$cpu_usage > $CPU_THRESHOLD" | bc -l) )); then
        send_alert "CPU" "High CPU usage: ${cpu_usage}% (threshold: ${CPU_THRESHOLD}%)"
    fi
    
    # Check memory threshold
    if (( $(echo "$memory_usage > $MEMORY_THRESHOLD" | bc -l) )); then
        send_alert "Memory" "High memory usage: ${memory_usage}% (threshold: ${MEMORY_THRESHOLD}%)"
    fi
    
    # Check disk threshold
    if [ "$disk_usage" -gt "$DISK_THRESHOLD" ]; then
        send_alert "Disk" "High disk usage: ${disk_usage}% (threshold: ${DISK_THRESHOLD}%)"
    fi
    
    # Check load threshold
    if (( $(echo "$load1 > $LOAD_THRESHOLD" | bc -l) )); then
        send_alert "Load" "High system load: $load1 (threshold: $LOAD_THRESHOLD)"
    fi
    
    # Check I/O wait threshold
    if (( $(echo "$iowait > $IOWAIT_THRESHOLD" | bc -l) )); then
        send_alert "IOWait" "High I/O wait: ${iowait}% (threshold: ${IOWAIT_THRESHOLD}%)"
    fi
}

monitor_processes() {
    if [ "$MONITOR_PROCESSES" != "true" ]; then
        return
    fi
    
    local process_file="$DATA_DIR/processes-$(date +%Y%m%d).log"
    
    # Top CPU consuming processes
    echo "=== Top CPU Processes - $(date) ===" >> "$process_file"
    ps aux --sort=-%cpu | head -10 >> "$process_file"
    echo >> "$process_file"
    
    # Top Memory consuming processes
    echo "=== Top Memory Processes - $(date) ===" >> "$process_file"
    ps aux --sort=-%mem | head -10 >> "$process_file"
    echo >> "$process_file"
    
    # Check for problematic processes
    while IFS= read -r line; do
        local cpu=$(echo "$line" | awk '{print $3}')
        local mem=$(echo "$line" | awk '{print $4}')
        local cmd=$(echo "$line" | awk '{for(i=11;i<=NF;i++) printf "%s ", $i; print ""}')
        
        if (( $(echo "$cpu > $PROCESS_CPU_THRESHOLD" | bc -l) )); then
            log "High CPU process detected: $cmd (CPU: ${cpu}%)"
        fi
        
        if (( $(echo "$mem > $PROCESS_MEMORY_THRESHOLD" | bc -l) )); then
            log "High memory process detected: $cmd (Memory: ${mem}%)"
        fi
    done < <(ps aux --no-headers | head -20)
}

send_alert() {
    local alert_type=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Check alert cooldown
    local cooldown_file="/tmp/.performance_alert_${alert_type}_last"
    local current_cooldown=$ALERT_COOLDOWN
    
    # Use shorter cooldown for critical alerts
    if [[ "$message" =~ "95%|CRITICAL" ]]; then
        current_cooldown=$CRITICAL_ALERT_COOLDOWN
    fi
    
    if [ -f "$cooldown_file" ]; then
        local last_alert=$(cat "$cooldown_file")
        local current_time=$(date +%s)
        if [ $((current_time - last_alert)) -lt $current_cooldown ]; then
            log "Alert cooldown active for $alert_type, skipping notification"
            return
        fi
    fi
    
    # Send alert
    if [ "$EMAIL_ALERTS" = "true" ]; then
        local subject="Performance Alert: $alert_type on $(hostname)"
        local body="$message

Timestamp: $timestamp
Server: $(hostname)
Uptime: $(uptime)

Current System Status:
$(free -h)
$(df -h /)
$(uptime)"
        
        echo "$body" | mail -s "$subject" "$ALERT_EMAIL"
        log "Alert sent: $alert_type - $message"
        date +%s > "$cooldown_file"
    fi
}

generate_performance_report() {
    local report_type=${1:-daily}
    local report_file="$REPORT_DIR/${report_type}-report-$(date +%Y%m%d).txt"
    
    case $report_type in
        "daily")
            local since_time="24 hours ago"
            ;;
        "weekly")
            local since_time="7 days ago"
            ;;
        "monthly")
            local since_time="30 days ago"
            ;;
        *)
            local since_time="24 hours ago"
            ;;
    esac
    
    echo "Performance Report ($report_type) - $(date)" > "$report_file"
    echo "===============================================" >> "$report_file"
    echo >> "$report_file"
    
    echo "System Information:" >> "$report_file"
    echo "Hostname: $(hostname)" >> "$report_file"
    echo "Uptime: $(uptime)" >> "$report_file"
    echo "Kernel: $(uname -r)" >> "$report_file"
    echo "CPU: $(lscpu | grep 'Model name' | cut -d':' -f2 | xargs)" >> "$report_file"
    echo "Memory: $(free -h | grep '^Mem:' | awk '{print $2}')" >> "$report_file"
    echo >> "$report_file"
    
    echo "CPU Usage Summary:" >> "$report_file"
    sar -u -s "$(date -d "$since_time" "+%H:%M:%S")" | tail -10 >> "$report_file"
    echo >> "$report_file"
    
    echo "Memory Usage Summary:" >> "$report_file"
    sar -r -s "$(date -d "$since_time" "+%H:%M:%S")" | tail -10 >> "$report_file"
    echo >> "$report_file"
    
    echo "Disk I/O Summary:" >> "$report_file"
    sar -d -s "$(date -d "$since_time" "+%H:%M:%S")" | tail -10 >> "$report_file"
    echo >> "$report_file"
    
    echo "Network Activity Summary:" >> "$report_file"
    sar -n DEV -s "$(date -d "$since_time" "+%H:%M:%S")" | grep -E "(Average|eth|ens|enp)" | tail -10 >> "$report_file"
    echo >> "$report_file"
    
    echo "Top Processes (by CPU):" >> "$report_file"
    ps aux --sort=-%cpu | head -10 >> "$report_file"
    echo >> "$report_file"
    
    echo "Top Processes (by Memory):" >> "$report_file"
    ps aux --sort=-%mem | head -10 >> "$report_file"
    echo >> "$report_file"
    
    echo "Disk Usage:" >> "$report_file"
    df -h >> "$report_file"
    echo >> "$report_file"
    
    echo "Network Connections:" >> "$report_file"
    ss -tuln | head -20 >> "$report_file"
    echo >> "$report_file"
    
    log "$report_type report generated: $report_file"
    
    # Email report if enabled
    if [ "$EMAIL_ALERTS" = "true" ]; then
        mail -s "Performance Report ($report_type) - $(hostname)" "$ALERT_EMAIL" < "$report_file"
    fi
}

analyze_bottlenecks() {
    local analysis_file="$REPORT_DIR/bottleneck-analysis-$(date +%Y%m%d-%H%M).txt"
    
    echo "System Bottleneck Analysis - $(date)" > "$analysis_file"
    echo "======================================" >> "$analysis_file"
    echo >> "$analysis_file"
    
    # CPU Analysis
    echo "CPU Analysis:" >> "$analysis_file"
    local cpu_usage=$(sar -u 1 1 | tail -1 | awk '{print 100-$8}')
    local iowait=$(sar -u 1 1 | tail -1 | awk '{print $6}')
    
    if (( $(echo "$cpu_usage > 80" | bc -l) )); then
        echo "⚠️  HIGH CPU USAGE: ${cpu_usage}%" >> "$analysis_file"
        echo "Top CPU processes:" >> "$analysis_file"
        ps aux --sort=-%cpu | head -5 >> "$analysis_file"
    fi
    
    if (( $(echo "$iowait > 10" | bc -l) )); then
        echo "⚠️  HIGH I/O WAIT: ${iowait}%" >> "$analysis_file"
        echo "Disk I/O activity:" >> "$analysis_file"
        iostat -x 1 1 >> "$analysis_file"
    fi
    echo >> "$analysis_file"
    
    # Memory Analysis
    echo "Memory Analysis:" >> "$analysis_file"
    local mem_available=$(free | grep '^Mem:' | awk '{print $7}')
    local mem_total=$(free | grep '^Mem:' | awk '{print $2}')
    local mem_free_pct=$(echo "scale=1; $mem_available * 100 / $mem_total" | bc)
    
    if (( $(echo "$mem_free_pct < 10" | bc -l) )); then
        echo "⚠️  LOW MEMORY: ${mem_free_pct}% available" >> "$analysis_file"
        echo "Memory details:" >> "$analysis_file"
        free -h >> "$analysis_file"
        echo "Top memory processes:" >> "$analysis_file"
        ps aux --sort=-%mem | head -5 >> "$analysis_file"
    fi
    echo >> "$analysis_file"
    
    # Disk Analysis
    echo "Disk Analysis:" >> "$analysis_file"
    while IFS= read -r line; do
        local usage=$(echo "$line" | awk '{gsub(/%/,"",$5); print $5}')
        local mount=$(echo "$line" | awk '{print $6}')
        
        if [ "$usage" -gt 85 ]; then
            echo "⚠️  HIGH DISK USAGE: ${usage}% on $mount" >> "$analysis_file"
            echo "Largest directories in $mount:" >> "$analysis_file"
            du -sh "$mount"/* 2>/dev/null | sort -hr | head -5 >> "$analysis_file"
        fi
    done < <(df | grep -E '^/dev/')
    echo >> "$analysis_file"
    
    # Network Analysis
    echo "Network Analysis:" >> "$analysis_file"
    local connections=$(ss -t state established | wc -l)
    if [ "$connections" -gt 1000 ]; then
        echo "⚠️  HIGH CONNECTION COUNT: $connections" >> "$analysis_file"
        echo "Connection breakdown:" >> "$analysis_file"
        ss -s >> "$analysis_file"
    fi
    echo >> "$analysis_file"
    
    echo "Recommendations:" >> "$analysis_file"
    echo "- Monitor trends over time" >> "$analysis_file"
    echo "- Consider hardware upgrades if bottlenecks persist" >> "$analysis_file"
    echo "- Optimize applications and services" >> "$analysis_file"
    echo "- Review system configuration" >> "$analysis_file"
    
    log "Bottleneck analysis completed: $analysis_file"
}

cleanup_old_data() {
    log "Cleaning up old monitoring data"
    
    # Remove old metric files
    find "$DATA_DIR" -name "metrics-*.csv" -mtime +$RETENTION_DAYS -delete
    find "$DATA_DIR" -name "processes-*.log" -mtime +$RETENTION_DAYS -delete
    
    # Remove old reports
    find "$REPORT_DIR" -name "*.txt" -mtime +$((RETENTION_DAYS * 2)) -delete
    
    # Compress old sysstat files
    find /var/log/sysstat -name "sa*" -mtime +7 -exec gzip {} \;
    find /var/log/sysstat -name "sa*.gz" -mtime +$RETENTION_DAYS -delete
    
    log "Cleanup completed"
}

case "${1:-}" in
    "collect")
        load_config
        collect_system_metrics
        monitor_processes
        check_thresholds
        ;;
    "report")
        generate_performance_report "${2:-daily}"
        ;;
    "analyze")
        analyze_bottlenecks
        ;;
    "cleanup")
        load_config
        cleanup_old_data
        ;;
    "daemon")
        load_config
        log "Starting performance monitoring daemon"
        while true; do
            collect_system_metrics
            monitor_processes
            check_thresholds
            sleep $COLLECTION_INTERVAL
        done
        ;;
    "status")
        echo "=== System Performance Status ==="
        echo "CPU Usage: $(sar -u 1 1 | tail -1 | awk '{print 100-$8}')%"
        echo "Memory Usage: $(free | grep '^Mem:' | awk '{printf "%.1f%%", $3*100/$2}')"
        echo "Disk Usage: $(df / | tail -1 | awk '{print $5}')"
        echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"
        echo "Uptime: $(uptime | awk '{print $3,$4}' | sed 's/,//')"
        ;;
    *)
        echo "Usage: $0 {collect|report|analyze|cleanup|daemon|status} [daily|weekly|monthly]"
        echo "Examples:"
        echo "  $0 collect                    # Collect metrics once"
        echo "  $0 daemon                     # Run continuous monitoring"
        echo "  $0 report daily              # Generate daily report"
        echo "  $0 analyze                   # Analyze current bottlenecks"
        echo "  $0 status                    # Show current status"
        exit 1
        ;;
esac
```

## Configuration Examples

### Automated Monitoring with Cron
```bash
# Setup automated monitoring
sudo crontab -e

# Add monitoring tasks
# Collect metrics every minute
* * * * * /usr/local/bin/performance-monitor.sh collect

# Generate daily reports
0 6 * * * /usr/local/bin/performance-monitor.sh report daily

# Generate weekly reports
0 6 * * 1 /usr/local/bin/performance-monitor.sh report weekly

# Cleanup old data
0 2 * * 0 /usr/local/bin/performance-monitor.sh cleanup

# Bottleneck analysis during peak hours
0 9,13,17 * * 1-5 /usr/local/bin/performance-monitor.sh analyze
```

### Grafana Dashboard Setup
```bash
# Install InfluxDB and Grafana (optional)
wget -qO- https://repos.influxdata.com/influxdb.key | sudo apt-key add -
echo "deb https://repos.influxdata.com/debian stable main" | sudo tee /etc/apt/sources.list.d/influxdb.list

sudo apt update
sudo apt install influxdb grafana

# Configure data collection to InfluxDB
sudo nano /usr/local/bin/collect-to-influxdb.sh
```

InfluxDB data collection script:
```bash
#!/bin/bash
# collect-to-influxdb.sh

INFLUXDB_URL="http://localhost:8086"
DATABASE="system_metrics"

# Create database if it doesn't exist
curl -i -XPOST "$INFLUXDB_URL/query" --data-urlencode "q=CREATE DATABASE $DATABASE"

while true; do
    # Collect metrics
    timestamp=$(date +%s)
    
    # CPU metrics
    cpu_data=$(sar -u 1 1 | tail -1)
    cpu_usage=$(echo "$cpu_data" | awk '{print 100-$8}')
    
    # Memory metrics
    mem_data=$(free | grep '^Mem:')
    mem_total=$(echo "$mem_data" | awk '{print $2}')
    mem_used=$(echo "$mem_data" | awk '{print $3}')
    mem_usage=$(echo "scale=2; $mem_used * 100 / $mem_total" | bc)
    
    # Disk metrics
    disk_usage=$(df / | tail -1 | awk '{gsub(/%/,"",$5); print $5}')
    
    # Load average
    load1=$(uptime | awk -F'load average:' '{print $2}' | awk -F',' '{print $1}' | tr -d ' ')
    
    # Send to InfluxDB
    curl -i -XPOST "$INFLUXDB_URL/write?db=$DATABASE" --data-binary "
cpu_usage,host=$(hostname) value=$cpu_usage $timestamp
memory_usage,host=$(hostname) value=$mem_usage $timestamp
disk_usage,host=$(hostname) value=$disk_usage $timestamp
load_average,host=$(hostname) value=$load1 $timestamp
"
    
    sleep 60
done
```

### Custom Performance Dashboard
```bash
# Create a simple web dashboard
sudo nano /var/www/html/performance.php
```

Simple PHP dashboard:
```php
<!DOCTYPE html>
<html>
<head>
    <title>System Performance Dashboard</title>
    <meta http-equiv="refresh" content="30">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .metric { display: inline-block; margin: 10px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; }
        .warning { background-color: #ffcccc; }
        .ok { background-color: #ccffcc; }
        .critical { background-color: #ff9999; }
    </style>
</head>
<body>
    <h1>System Performance Dashboard</h1>
    <p>Last updated: <?php echo date('Y-m-d H:i:s'); ?></p>
    
    <?php
    // CPU Usage
    $cpu_usage = shell_exec("sar -u 1 1 | tail -1 | awk '{print 100-\$8}'");
    $cpu_class = $cpu_usage > 80 ? 'critical' : ($cpu_usage > 60 ? 'warning' : 'ok');
    echo "<div class='metric $cpu_class'><h3>CPU Usage</h3><p>{$cpu_usage}%</p></div>";
    
    // Memory Usage
    $mem_output = shell_exec("free | grep '^Mem:'");
    $mem_data = preg_split('/\s+/', trim($mem_output));
    $mem_usage = round(($mem_data[2] / $mem_data[1]) * 100, 1);
    $mem_class = $mem_usage > 85 ? 'critical' : ($mem_usage > 70 ? 'warning' : 'ok');
    echo "<div class='metric $mem_class'><h3>Memory Usage</h3><p>{$mem_usage}%</p></div>";
    
    // Disk Usage
    $disk_usage = trim(shell_exec("df / | tail -1 | awk '{gsub(/%/,\"\",\$5); print \$5}'"));
    $disk_class = $disk_usage > 90 ? 'critical' : ($disk_usage > 80 ? 'warning' : 'ok');
    echo "<div class='metric $disk_class'><h3>Disk Usage</h3><p>{$disk_usage}%</p></div>";
    
    // Load Average
    $load = trim(shell_exec("uptime | awk -F'load average:' '{print \$2}' | awk -F',' '{print \$1}'"));
    $load_class = $load > 2 ? 'critical' : ($load > 1 ? 'warning' : 'ok');
    echo "<div class='metric $load_class'><h3>Load Average</h3><p>$load</p></div>";
    ?>
    
    <h2>Top Processes (CPU)</h2>
    <pre><?php echo shell_exec("ps aux --sort=-%cpu | head -6"); ?></pre>
    
    <h2>Top Processes (Memory)</h2>
    <pre><?php echo shell_exec("ps aux --sort=-%mem | head -6"); ?></pre>
    
    <h2>Network Connections</h2>
    <pre><?php echo shell_exec("ss -s"); ?></pre>
</body>
</html>
```

## Security Considerations

### Monitoring Security Events
```bash
# Monitor security-related performance issues
sudo nano /usr/local/bin/security-performance-monitor.sh
```

Security monitoring script:
```bash
#!/bin/bash
# Monitor for security-related performance issues

# Check for unusual CPU spikes (possible crypto mining)
check_cpu_anomalies() {
    local cpu_usage=$(sar -u 1 1 | tail -1 | awk '{print 100-$8}')
    if (( $(echo "$cpu_usage > 90" | bc -l) )); then
        # Check for suspicious processes
        ps aux --sort=-%cpu | head -5 | while read line; do
            local cpu=$(echo "$line" | awk '{print $3}')
            local cmd=$(echo "$line" | awk '{print $11}')
            if (( $(echo "$cpu > 80" | bc -l) )) && [[ "$cmd" =~ (xmrig|cpuminer|minerd|cryptonight) ]]; then
                logger "SECURITY ALERT: Suspicious high-CPU process detected: $cmd"
                echo "Potential cryptocurrency mining detected: $cmd" | mail -s "Security Alert - $(hostname)" admin@company.com
            fi
        done
    fi
}

# Monitor for DDoS attacks
check_network_anomalies() {
    local connections=$(ss -t state established | wc -l)
    local syn_flood=$(netstat -n | grep SYN_RECV | wc -l)
    
    if [ "$connections" -gt 5000 ] || [ "$syn_flood" -gt 100 ]; then
        logger "SECURITY ALERT: Possible DDoS attack - Connections: $connections, SYN_RECV: $syn_flood"
        echo "Possible DDoS attack detected on $(hostname)" | mail -s "Security Alert - $(hostname)" admin@company.com
    fi
}

# Monitor for memory-based attacks
check_memory_anomalies() {
    local mem_usage=$(free | grep '^Mem:' | awk '{printf "%.1f", $3*100/$2}')
    if (( $(echo "$mem_usage > 95" | bc -l) )); then
        # Check for memory bombs
        ps aux --sort=-%mem | head -5 | while read line; do
            local mem=$(echo "$line" | awk '{print $4}')
            local cmd=$(echo "$line" | awk '{print $11}')
            if (( $(echo "$mem > 50" | bc -l) )); then
                logger "SECURITY ALERT: Suspicious high-memory process: $cmd ($mem%)"
            fi
        done
    fi
}

check_cpu_anomalies
check_network_anomalies
check_memory_anomalies
```

### Secure Monitoring Data
```bash
# Protect monitoring data
sudo chmod 750 /var/log/performance
sudo chown root:adm /var/log/performance

# Encrypt sensitive monitoring data
sudo apt install gpg
tar -czf - /var/log/performance/sensitive-data/ | gpg --cipher-algo AES256 --compress-algo 1 --symmetric --output /backup/monitoring-$(date +%Y%m%d).tar.gz.gpg
```

### Access Control for Monitoring
```bash
# Create monitoring user with limited permissions
sudo useradd -r -s /bin/false -d /var/lib/monitoring monitoring
sudo usermod -a -G adm monitoring

# Setup sudo rules for monitoring scripts
sudo nano /etc/sudoers.d/monitoring
```

Monitoring sudoers file:
```bash
# Allow monitoring user to run specific commands
monitoring ALL=(ALL) NOPASSWD: /usr/bin/sar, /usr/bin/iostat, /usr/bin/free, /usr/bin/ps, /usr/bin/ss
monitoring ALL=(ALL) NOPASSWD: /usr/bin/systemctl status *
```

## Quick Reference

### Essential Monitoring Commands
```bash
# Real-time monitoring
htop                    # Interactive process viewer
glances                 # System overview
iotop                   # I/O monitoring
nethogs                 # Network per-process
atop                    # Advanced system monitor

# System statistics
sar -u 1 5             # CPU usage
sar -r 1 5             # Memory usage
sar -d 1 5             # Disk I/O
sar -n DEV 1 5         # Network statistics
iostat -x 1 5          # Extended I/O stats
vmstat 1 5             # Virtual memory stats

# Process monitoring
ps aux --sort=-%cpu    # Top CPU processes
ps aux --sort=-%mem    # Top memory processes
pstree                 # Process tree
lsof                   # Open files
fuser                  # File users
```

### Performance Analysis
```bash
# Identify bottlenecks
uptime                 # Load averages
free -h                # Memory usage
df -h                  # Disk space
lscpu                  # CPU information
lsblk                  # Block devices
ip addr                # Network interfaces

# Historical analysis
sar -f /var/log/sysstat/saXX    # Historical data
last                            # Login history
who                             # Current users
w                               # Detailed user info
```

### Disk and I/O Analysis
```bash
# Disk usage analysis
du -sh /*              # Directory sizes
ncdu /                 # Interactive disk usage
find / -size +100M     # Large files
lsof | grep deleted    # Deleted but open files

# I/O performance
iostat -x              # Extended I/O statistics
iotop                  # I/O per process
dstat                  # Versatile system stats
```

## Troubleshooting

### Common Performance Issues

**High CPU usage:**
```bash
# Identify CPU-intensive processes
top -o %CPU
ps aux --sort=-%cpu | head -10

# Check for system processes
ps aux | grep -E "(kworker|ksoftirqd|migration)"

# Monitor CPU over time
sar -u 5 12

# Check for CPU throttling
cat /proc/cpuinfo | grep MHz
dmesg | grep -i "cpu.*throttl"
```

**High memory usage:**
```bash
# Check memory details
free -h
cat /proc/meminfo
ps aux --sort=-%mem | head -10

# Check for memory leaks
valgrind --leak-check=full program

# Monitor memory over time
sar -r 5 12

# Check swap usage
swapon -s
vmstat 1 5
```

**High I/O wait:**
```bash
# Identify I/O-heavy processes
iotop -o

# Check disk statistics
iostat -x 1 5
sar -d 1 5

# Check filesystem health
dmesg | grep -i error
fsck /dev/device (unmounted)

# Monitor specific disks
iostat -x sda 1 5
```

**Network performance issues:**
```bash
# Monitor network usage
nethogs
iftop
ss -i

# Check network statistics
sar -n DEV 1 5
cat /proc/net/dev

# Test network speed
iperf3 -s (server)
iperf3 -c server_ip (client)

# Check for packet loss
ping -c 100 target
mtr target
```

**Load average high:**
```bash
# Understand load components
uptime
cat /proc/loadavg

# Check running processes
ps aux | grep -v " S "
ps aux | awk '$8 ~ /R|D/ {print}'

# Monitor load over time
sar -q 1 5
```

### Memory Analysis
```bash
# Detailed memory analysis
cat /proc/meminfo
smem -t
pmap PID

# Check for memory fragmentation
cat /proc/buddyinfo
cat /proc/pagetypeinfo

# Monitor memory allocation
echo 1 > /proc/sys/vm/drop_caches  # Clear cache (testing only)
```

### Filesystem Performance
```bash
# Test disk speed
dd if=/dev/zero of=/tmp/test bs=1M count=1024 oflag=direct
hdparm -Tt /dev/sda

# Check filesystem statistics
tune2fs -l /dev/device
xfs_info /mount/point

# Monitor filesystem cache
cat /proc/sys/vm/vfs_cache_pressure
```

## Performance Tips

### System Optimization
```bash
# Optimize system settings
echo 'vm.swappiness=10' >> /etc/sysctl.conf
echo 'vm.vfs_cache_pressure=50' >> /etc/sysctl.conf
echo 'net.core.rmem_max=16777216' >> /etc/sysctl.conf
echo 'net.core.wmem_max=16777216' >> /etc/sysctl.conf

# Apply settings
sudo sysctl -p
```

### Monitoring Optimization
```bash
# Reduce monitoring overhead
# Use appropriate sampling intervals
# Compress old data automatically
# Archive to external storage

# Optimize data collection
# Use binary formats when possible
# Aggregate data at collection time
# Use efficient storage (InfluxDB, etc.)
```

### Automated Optimization
```bash
# Create auto-optimization script
sudo nano /usr/local/bin/auto-optimize.sh
```

Auto-optimization script:
```bash
#!/bin/bash
# Auto-optimize system based on current load

current_load=$(uptime | awk -F'load average:' '{print $2}' | awk -F',' '{print $1}' | tr -d ' ')
mem_usage=$(free | grep '^Mem:' | awk '{printf "%.0f", $3*100/$2}')

# Adjust swappiness based on memory usage
if [ "$mem_usage" -gt 80 ]; then
    echo 60 > /proc/sys/vm/swappiness
else
    echo 10 > /proc/sys/vm/swappiness
fi

# Adjust I/O scheduler based on load
if (( $(echo "$current_load > 2" | bc -l) )); then
    echo noop > /sys/block/sda/queue/scheduler
else
    echo mq-deadline > /sys/block/sda/queue/scheduler
fi

# Clear caches if memory is low
if [ "$mem_usage" -gt 90 ]; then
    sync
    echo 1 > /proc/sys/vm/drop_caches
fi
```

### Capacity Planning
```bash
# Generate capacity planning report
sudo nano /usr/local/bin/capacity-planning.sh
```

Capacity planning script:
```bash
#!/bin/bash
# Generate capacity planning recommendations

echo "Capacity Planning Report - $(date)"
echo "==================================="

# CPU capacity
echo "CPU Analysis:"
cpu_cores=$(nproc)
avg_load=$(sar -q | tail -1 | awk '{print $4}')
echo "  Cores: $cpu_cores"
echo "  Average Load: $avg_load"
echo "  CPU Utilization: $(echo "scale=1; $avg_load * 100 / $cpu_cores" | bc)%"

# Memory capacity
echo -e "\nMemory Analysis:"
mem_total=$(free -g | grep '^Mem:' | awk '{print $2}')
mem_avg_used=$(sar -r | tail -1 | awk '{print $4}')
echo "  Total Memory: ${mem_total}GB"
echo "  Average Used: ${mem_avg_used}%"

# Disk capacity
echo -e "\nDisk Analysis:"
df -h | grep -E '^/dev/' | while read line; do
    usage=$(echo "$line" | awk '{print $5}' | tr -d '%')
    mount=$(echo "$line" | awk '{print $6}')
    if [ "$usage" -gt 70 ]; then
        echo "  WARNING: $mount is ${usage}% full"
    fi
done

# Recommendations
echo -e "\nRecommendations:"
if (( $(echo "$avg_load > $cpu_cores * 0.8" | bc -l) )); then
    echo "  - Consider CPU upgrade or scale-out"
fi
if [ "${mem_avg_used%.*}" -gt 80 ]; then
    echo "  - Consider memory upgrade"
fi
```

## What's Next
- [Log Management and Analysis | Debian 13 Server]
- [Security Monitoring | Debian 13 Server]
- [Automated Alerting | Debian 13 Server]
- [Performance Tuning | Debian 13 Server]