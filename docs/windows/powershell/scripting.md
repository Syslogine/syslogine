---
sidebar_position: 3
title: "PowerShell Scripting Essentials"
sidebar_label: "Scripting"
description: "Learn PowerShell scripting fundamentals including variables, functions, loops, error handling, and automation techniques for Windows administration."
keywords:
  - "powershell scripting"
  - "powershell functions"
  - "powershell automation"
  - "powershell loops"
  - "powershell variables"
tags:
  - powershell-scripting
  - automation
  - functions
  - error-handling
  - windows-scripting
slug: /windows/powershell/scripting
---

# PowerShell Scripting Essentials

Transform repetitive administrative tasks into automated, reliable processes with PowerShell scripting. This guide covers the essential concepts needed to create robust automation scripts for Windows environments.

## Script Structure and Setup

### Basic Script Template

Every PowerShell script should follow a consistent structure for maintainability and professionalism:

```powershell
<#
.SYNOPSIS
    Brief description of what the script does

.DESCRIPTION
    Detailed explanation of script functionality

.PARAMETER ServerName
    Target server for the operation

.EXAMPLE
    .\MyScript.ps1 -ServerName "SERVER01"
    
.NOTES
    Author: Your Name
    Version: 1.0
    Last Modified: 2024-01-01
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$ServerName
)

# Set error handling preference
$ErrorActionPreference = "Stop"

# Main script logic
Write-Host "Starting script execution on $ServerName" -ForegroundColor Green

try {
    # Your code here
    Write-Host "Script completed successfully" -ForegroundColor Green
}
catch {
    Write-Error "Script failed: $($_.Exception.Message)"
    exit 1
}
```

### Execution Policy

Before running scripts, configure the appropriate execution policy:

```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy for current user (recommended)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run single script bypassing policy
powershell.exe -ExecutionPolicy Bypass -File "MyScript.ps1"
```

:::tip Security Best Practice
Use `RemoteSigned` policy to allow local scripts while requiring digital signatures for downloaded scripts.
:::

---

## Variables and Data Types

### Variable Declaration and Types

PowerShell variables are dynamically typed but can be constrained for validation:

```powershell
# Basic variable assignment
$serverName = "PROD-SERVER01"
$port = 443
$isEnabled = $true

# Strongly typed variables
[string]$computerName = "SERVER01"
[int]$maxRetries = 3
[datetime]$startTime = Get-Date
[array]$serverList = @("Server1", "Server2", "Server3")

# Type validation prevents errors
[int]$port = "80"        # This works - automatic conversion
[int]$port = "abc"       # This fails - invalid conversion
```

### Collections and Arrays

```powershell
# Simple arrays
$servers = @("WEB01", "WEB02", "DB01")
$numbers = 1..10
$mixed = @("String", 42, $true, (Get-Date))

# Array operations
$servers += "WEB03"                                    # Add item
$servers = $servers | Where-Object { $_ -ne "WEB02" } # Remove item
$serverCount = $servers.Count                          # Get count

# Hash tables for structured data
$serverConfig = @{
    Name = "PROD-WEB01"
    IP = "192.168.1.10"
    Role = "WebServer"
    Status = "Online"
}

# Access hash table values
$serverConfig["Name"]        # By key
$serverConfig.IP            # By property
$serverConfig.Add("Port", 80)  # Add new key-value pair
```

### Environment Variables

```powershell
# Access system environment variables
$currentUser = $env:USERNAME
$computerName = $env:COMPUTERNAME
$systemDrive = $env:SYSTEMDRIVE

# Set temporary environment variable
$env:TEMP_SETTING = "CustomValue"

# Set persistent environment variable (requires elevation)
[Environment]::SetEnvironmentVariable("MYAPP_PATH", "C:\MyApp", "User")
```

---

## Control Structures

### Conditional Logic

```powershell
# If-ElseIf-Else statements
$diskSpace = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'" | 
             ForEach-Object { [math]::Round($_.FreeSpace / 1GB, 2) }

if ($diskSpace -lt 1) {
    Write-Warning "Critical: Less than 1GB free space"
    # Send alert
} 
elseif ($diskSpace -lt 5) {
    Write-Warning "Warning: Less than 5GB free space"
    # Log warning
}
else {
    Write-Host "Disk space OK: ${diskSpace}GB free" -ForegroundColor Green
}

# Switch statements for multiple conditions
$serviceAction = "Restart"

switch ($serviceAction) {
    "Start"   { Start-Service -Name $serviceName }
    "Stop"    { Stop-Service -Name $serviceName }
    "Restart" { Restart-Service -Name $serviceName }
    default   { Write-Warning "Unknown action: $serviceAction" }
}
```

### Loops and Iteration

```powershell
# ForEach loops
$servers = @("SERVER01", "SERVER02", "SERVER03")

foreach ($server in $servers) {
    Write-Host "Processing $server..."
    
    if (Test-Connection -ComputerName $server -Count 1 -Quiet) {
        Write-Host "$server is online" -ForegroundColor Green
    } else {
        Write-Warning "$server is offline"
    }
}

# For loops with counters
for ($i = 1; $i -le 5; $i++) {
    Write-Host "Iteration $i"
    Start-Sleep -Seconds 1
}

# While loops with conditions
$attempts = 0
$maxAttempts = 3
$success = $false

while ($attempts -lt $maxAttempts -and -not $success) {
    $attempts++
    Write-Host "Attempt $attempts..."
    
    try {
        # Attempt some operation
        Test-Connection -ComputerName "SERVER01" -Count 1 -ErrorAction Stop
        $success = $true
        Write-Host "Success!"
    }
    catch {
        Write-Warning "Attempt failed"
        Start-Sleep -Seconds 2
    }
}
```

---

## Functions

### Basic Functions

```powershell
# Simple function
function Get-SystemUptime {
    $bootTime = (Get-CimInstance -ClassName Win32_OperatingSystem).LastBootUpTime
    $uptime = (Get-Date) - $bootTime
    return $uptime
}

# Function with parameters
function Test-ServiceStatus {
    param(
        [string]$ServiceName,
        [string]$ComputerName = $env:COMPUTERNAME
    )
    
    try {
        $service = Get-Service -Name $ServiceName -ComputerName $ComputerName
        return $service.Status -eq "Running"
    }
    catch {
        Write-Warning "Could not check service $ServiceName on $ComputerName"
        return $false
    }
}

# Usage
$uptime = Get-SystemUptime
$isRunning = Test-ServiceStatus -ServiceName "Spooler"
```

### Advanced Functions

```powershell
function Get-DiskReport {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true, ValueFromPipeline=$true)]
        [string[]]$ComputerName,
        
        [int]$WarningThreshold = 15,
        [int]$CriticalThreshold = 5
    )
    
    begin {
        Write-Verbose "Starting disk report generation"
        $results = @()
    }
    
    process {
        foreach ($computer in $ComputerName) {
            Write-Verbose "Processing $computer"
            
            try {
                $disks = Get-WmiObject -ComputerName $computer -Class Win32_LogicalDisk -Filter "DriveType=3"
                
                foreach ($disk in $disks) {
                    $freePercent = [math]::Round(($disk.FreeSpace / $disk.Size) * 100, 2)
                    
                    $status = if ($freePercent -le $CriticalThreshold) { "Critical" }
                             elseif ($freePercent -le $WarningThreshold) { "Warning" } 
                             else { "OK" }
                    
                    $results += [PSCustomObject]@{
                        ComputerName = $computer
                        Drive = $disk.DeviceID
                        SizeGB = [math]::Round($disk.Size / 1GB, 2)
                        FreeGB = [math]::Round($disk.FreeSpace / 1GB, 2)
                        FreePercent = $freePercent
                        Status = $status
                    }
                }
            }
            catch {
                Write-Error "Failed to query $computer`: $($_.Exception.Message)"
            }
        }
    }
    
    end {
        return $results
    }
}

# Usage examples
Get-DiskReport -ComputerName "SERVER01" -Verbose
@("SERVER01", "SERVER02") | Get-DiskReport
```

---

## Error Handling

### Try-Catch-Finally

```powershell
function Copy-FileWithRetry {
    param(
        [string]$Source,
        [string]$Destination,
        [int]$MaxAttempts = 3
    )
    
    $attempt = 0
    
    do {
        $attempt++
        Write-Host "Attempt $attempt of $MaxAttempts"
        
        try {
            Copy-Item -Path $Source -Destination $Destination -ErrorAction Stop
            Write-Host "Copy successful!" -ForegroundColor Green
            return $true
        }
        catch [System.IO.FileNotFoundException] {
            Write-Error "Source file not found: $Source"
            return $false
        }
        catch [System.UnauthorizedAccessException] {
            Write-Warning "Access denied - attempt $attempt"
            if ($attempt -lt $MaxAttempts) { Start-Sleep -Seconds 2 }
        }
        catch {
            Write-Warning "Unexpected error: $($_.Exception.Message)"
            if ($attempt -lt $MaxAttempts) { Start-Sleep -Seconds 2 }
        }
        finally {
            # Cleanup code here if needed
            Write-Verbose "Cleanup operations completed"
        }
    } while ($attempt -lt $MaxAttempts)
    
    return $false
}
```

### Error Action Preferences

```powershell
# Set global error handling
$ErrorActionPreference = "Stop"      # Stop on any error
$WarningPreference = "Continue"      # Show warnings
$VerbosePreference = "SilentlyContinue"  # Hide verbose

# Command-specific error handling
Get-Service -Name "NonExistent" -ErrorAction SilentlyContinue
Get-Process -Name "chrome" -ErrorAction Stop
```

---

## Working with Files and Data

### File Operations

```powershell
function Manage-LogFiles {
    param(
        [string]$LogDirectory = "C:\Logs",
        [int]$RetentionDays = 30
    )
    
    # Create directory if it doesn't exist
    if (-not (Test-Path $LogDirectory)) {
        New-Item -Path $LogDirectory -ItemType Directory -Force
        Write-Host "Created directory: $LogDirectory"
    }
    
    # Find and remove old files
    $cutoffDate = (Get-Date).AddDays(-$RetentionDays)
    $oldFiles = Get-ChildItem -Path $LogDirectory -Filter "*.log" | 
                Where-Object LastWriteTime -lt $cutoffDate
    
    foreach ($file in $oldFiles) {
        try {
            Remove-Item -Path $file.FullName -Force
            Write-Host "Removed: $($file.Name)"
        }
        catch {
            Write-Warning "Failed to remove $($file.Name): $($_.Exception.Message)"
        }
    }
    
    Write-Host "Cleanup complete. Removed $($oldFiles.Count) files."
}
```

### CSV and JSON Data

```powershell
# Working with CSV files
function Process-UserList {
    param([string]$CsvPath)
    
    # Import CSV data
    $users = Import-Csv -Path $CsvPath
    $results = @()
    
    foreach ($user in $users) {
        $result = [PSCustomObject]@{
            Name = $user.Name
            Email = $user.Email.ToLower()
            Department = $user.Department
            ProcessedDate = Get-Date -Format "yyyy-MM-dd"
            Status = "Active"
        }
        $results += $result
    }
    
    # Export processed data
    $results | Export-Csv -Path "ProcessedUsers.csv" -NoTypeInformation
}

# Working with JSON configuration
function Get-AppConfig {
    param([string]$ConfigPath = "config.json")
    
    if (Test-Path $ConfigPath) {
        $config = Get-Content -Path $ConfigPath -Raw | ConvertFrom-Json
    } else {
        # Create default configuration
        $config = @{
            ServerName = "localhost"
            Port = 8080
            EnableLogging = $true
            LogLevel = "Information"
        } | ConvertTo-Json -Depth 10
        
        Set-Content -Path $ConfigPath -Value $config
        $config = $config | ConvertFrom-Json
    }
    
    return $config
}
```

---

## Practical Examples

### System Health Check Script

```powershell
function Get-SystemHealth {
    [CmdletBinding()]
    param(
        [string[]]$ComputerName = @($env:COMPUTERNAME),
        [switch]$IncludeServices
    )
    
    foreach ($computer in $ComputerName) {
        Write-Host "Checking $computer..." -ForegroundColor Cyan
        
        try {
            # System information
            $os = Get-CimInstance -ComputerName $computer -ClassName Win32_OperatingSystem
            $uptime = (Get-Date) - $os.LastBootUpTime
            
            # Disk space check
            $disks = Get-WmiObject -ComputerName $computer -Class Win32_LogicalDisk -Filter "DriveType=3"
            $lowDiskSpace = $disks | Where-Object { 
                ($_.FreeSpace / $_.Size) * 100 -lt 10 
            }
            
            # Memory usage
            $memoryUsage = [math]::Round((($os.TotalVisibleMemorySize - $os.FreePhysicalMemory) / 
                          $os.TotalVisibleMemorySize) * 100, 2)
            
            # Create health report
            $healthReport = [PSCustomObject]@{
                ComputerName = $computer
                Status = "Online"
                UptimeDays = [math]::Round($uptime.TotalDays, 2)
                MemoryUsagePercent = $memoryUsage
                LowDiskSpaceCount = $lowDiskSpace.Count
                LastChecked = Get-Date
            }
            
            # Optional service check
            if ($IncludeServices) {
                $stoppedServices = Get-Service -ComputerName $computer | 
                                 Where-Object { $_.Status -eq "Stopped" -and $_.StartType -eq "Automatic" }
                $healthReport | Add-Member -NotePropertyName "StoppedServicesCount" -NotePropertyValue $stoppedServices.Count
            }
            
            # Display results with color coding
            $color = if ($lowDiskSpace.Count -gt 0 -or $memoryUsage -gt 90) { "Yellow" } else { "Green" }
            Write-Host "$computer - Health: OK" -ForegroundColor $color
            
            $healthReport
        }
        catch {
            Write-Warning "Failed to check $computer`: $($_.Exception.Message)"
        }
    }
}

# Usage
Get-SystemHealth -ComputerName @("SERVER01", "SERVER02") -IncludeServices
```

### Automated Backup Script

```powershell
function Start-AutomatedBackup {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string]$SourcePath,
        
        [Parameter(Mandatory=$true)]
        [string]$BackupDestination,
        
        [int]$RetentionDays = 7,
        [switch]$Compress
    )
    
    $timestamp = Get-Date -Format "yyyyMMdd-HHmm"
    $backupName = "Backup-$timestamp"
    $backupPath = Join-Path $BackupDestination $backupName
    
    try {
        Write-Host "Starting backup of $SourcePath" -ForegroundColor Green
        
        # Create backup directory
        New-Item -Path $backupPath -ItemType Directory -Force | Out-Null
        
        # Copy files with progress
        $files = Get-ChildItem -Path $SourcePath -Recurse -File
        $totalFiles = $files.Count
        $currentFile = 0
        
        foreach ($file in $files) {
            $currentFile++
            $percentComplete = [math]::Round(($currentFile / $totalFiles) * 100, 2)
            Write-Progress -Activity "Backing up files" -Status "$currentFile of $totalFiles" -PercentComplete $percentComplete
            
            $relativePath = $file.FullName.Replace($SourcePath, "")
            $destinationFile = Join-Path $backupPath $relativePath
            $destinationDir = Split-Path $destinationFile -Parent
            
            if (-not (Test-Path $destinationDir)) {
                New-Item -Path $destinationDir -ItemType Directory -Force | Out-Null
            }
            
            Copy-Item -Path $file.FullName -Destination $destinationFile -Force
        }
        
        Write-Progress -Activity "Backing up files" -Completed
        
        # Compress backup if requested
        if ($Compress) {
            Write-Host "Compressing backup..." -ForegroundColor Yellow
            $zipPath = "$backupPath.zip"
            Compress-Archive -Path $backupPath -DestinationPath $zipPath -Force
            Remove-Item -Path $backupPath -Recurse -Force
            $backupPath = $zipPath
        }
        
        # Clean old backups
        $oldBackups = Get-ChildItem -Path $BackupDestination | 
                     Where-Object { $_.Name -like "Backup-*" -and $_.CreationTime -lt (Get-Date).AddDays(-$RetentionDays) }
        
        foreach ($oldBackup in $oldBackups) {
            Remove-Item -Path $oldBackup.FullName -Recurse -Force
            Write-Host "Removed old backup: $($oldBackup.Name)" -ForegroundColor Gray
        }
        
        Write-Host "Backup completed: $backupPath" -ForegroundColor Green
        return $backupPath
    }
    catch {
        Write-Error "Backup failed: $($_.Exception.Message)"
        return $null
    }
}

# Usage
Start-AutomatedBackup -SourcePath "C:\ImportantData" -BackupDestination "D:\Backups" -Compress -RetentionDays 14
```

---

## Best Practices

### Code Organization

```powershell
# Use consistent naming conventions
function Get-ServerInfo { }        # Good - Verb-Noun format
function ServerInformation { }     # Avoid - Not standard

# Include parameter validation
param(
    [Parameter(Mandatory=$true)]
    [ValidateNotNullOrEmpty()]
    [string]$ServerName,
    
    [ValidateRange(1, 65535)]
    [int]$Port = 80
)

# Use meaningful variable names
$serverName = "PROD-WEB01"         # Good - descriptive
$s = "PROD-WEB01"                  # Avoid - unclear
```

### Performance Tips

```powershell
# Filter early in the pipeline
Get-Process | Where-Object ProcessName -eq "notepad"  # Efficient

# Use .NET methods for string operations
$stringBuilder = [System.Text.StringBuilder]::new()
for ($i = 1; $i -le 1000; $i++) {
    $null = $stringBuilder.AppendLine("Line $i")
}
$result = $stringBuilder.ToString()

# Measure execution time
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
# Your code here
$stopwatch.Stop()
Write-Host "Execution time: $($stopwatch.ElapsedMilliseconds) ms"
```

### Security Considerations

```powershell
# Handle credentials securely
$credential = Get-Credential
Invoke-Command -ComputerName SERVER01 -Credential $credential -ScriptBlock { Get-Service }

# Validate input parameters
function Test-Input {
    param([string]$UserInput)
    
    if ($UserInput -match '^[a-zA-Z0-9\-_]+$') {
        # Safe input - alphanumeric, dash, underscore only
        return $true
    } else {
        Write-Warning "Invalid input detected"
        return $false
    }
}
```

---

## Next Steps

Now that you've learned PowerShell scripting essentials, consider exploring:

1. **Advanced Functions**: Parameter sets, pipeline input, and advanced validation
2. **Module Development**: Creating reusable PowerShell modules
3. **Remote Management**: PowerShell remoting and managing multiple systems
4. **Desired State Configuration**: Infrastructure as code with DSC
5. **Integration**: Connecting with REST APIs, databases, and cloud services

:::tip Practice Makes Perfect
Start small with simple automation tasks and gradually build more complex scripts. The PowerShell community is helpful - don't hesitate to ask questions and share your solutions!
:::

Continue your PowerShell journey with our [Advanced Techniques](/docs/windows/powershell/advanced) guide to master enterprise-level automation!