---
sidebar_position: 2
title: "PowerShell Fundamentals"
sidebar_label: "Fundamentals"
description: "Master PowerShell basics including cmdlets, pipeline, objects, and essential commands for Windows system administration and automation."
keywords:
  - "powershell basics"
  - "powershell cmdlets"
  - "powershell pipeline"
  - "powershell objects"
  - "windows powershell tutorial"
tags:
  - powershell-basics
  - cmdlets
  - pipeline
  - system-administration
  - windows-automation
slug: /windows/powershell/fundamentals
---

# PowerShell Fundamentals

PowerShell fundamentals form the foundation for effective Windows system administration and automation. This comprehensive guide covers essential concepts, syntax, and techniques that every PowerShell user needs to master.

## Understanding PowerShell Architecture

### The PowerShell Engine

PowerShell operates differently from traditional command-line interfaces. Instead of working with text strings, PowerShell processes .NET objects, enabling more sophisticated data manipulation and integration.

**Key Components:**
- **Cmdlets**: Specialized .NET classes that perform specific functions
- **Pipeline**: Object-passing mechanism between cmdlets
- **Providers**: Interfaces to different data stores (registry, filesystem, certificates)
- **Modules**: Collections of related cmdlets, functions, and resources

### Object-Oriented Approach

Every piece of data in PowerShell is an object with properties and methods:

```powershell
# Get process information as objects
$process = Get-Process -Name "notepad"

# Access object properties
$process.ProcessName
$process.Id
$process.WorkingSet

# Use object methods
$process.Kill()
$process.Refresh()
```

:::tip Object Exploration
Use `Get-Member` to discover what properties and methods are available on any object:
```powershell
Get-Process | Get-Member
```
:::

---

## Cmdlet Structure and Syntax

### Verb-Noun Convention

All PowerShell cmdlets follow a consistent Verb-Noun naming pattern that makes them intuitive and discoverable:

```powershell
# Common verbs and their purposes
Get-Process          # Retrieve information
Set-Location         # Configure or change settings
New-Item             # Create new objects
Remove-Item          # Delete objects
Start-Service        # Initiate actions
Stop-Process         # Terminate actions
```

### Parameter Usage

Cmdlets accept parameters to modify their behavior:

```powershell
# Positional parameters (order matters)
Get-ChildItem C:\Windows

# Named parameters (more explicit)
Get-ChildItem -Path C:\Windows -Recurse -Force

# Parameter aliases (shorter versions)
Get-ChildItem -Path C:\Windows -r -fo

# Switch parameters (true/false flags)
Get-Process -IncludeUserName
```

### Common Parameter Types

**Mandatory vs Optional:**
```powershell
# Some parameters are required
New-Item -Path "C:\temp\newfile.txt" -ItemType File

# Others have default values
Get-Process  # Uses default parameters
```

**Parameter Sets:**
```powershell
# Different ways to use the same cmdlet
Get-EventLog -LogName System                    # Get by log name
Get-EventLog -LogName System -Newest 10         # Limit results
Get-EventLog -List                              # List available logs
```

---

## The PowerShell Pipeline

### Pipeline Fundamentals

The pipeline passes entire objects (not just text) between cmdlets, enabling powerful data processing:

```powershell
# Basic pipeline example
Get-Process | Where-Object CPU -gt 100 | Sort-Object CPU -Descending

# Pipeline breakdown:
# 1. Get-Process: Returns process objects
# 2. Where-Object: Filters objects based on CPU usage
# 3. Sort-Object: Sorts remaining objects by CPU property
```

### Pipeline Variables

Access pipeline objects using automatic variables:

```powershell
# $_ represents the current pipeline object
Get-Service | Where-Object { $_.Status -eq "Running" }

# Equivalent using simplified syntax
Get-Service | Where-Object Status -eq "Running"

# Multiple conditions
Get-Process | Where-Object { $_.CPU -gt 100 -and $_.ProcessName -like "chrome*" }
```

### Advanced Pipeline Techniques

**ForEach-Object for Processing:**
```powershell
# Process each object in the pipeline
Get-ChildItem "C:\Logs" | ForEach-Object {
    Write-Host "Processing: $($_.Name)"
    $_.LastWriteTime
}

# Simplified syntax
Get-ChildItem "C:\Logs" | ForEach-Object Name
```

**Tee-Object for Branching:**
```powershell
# Send objects to both file and pipeline
Get-Process | Tee-Object -FilePath "processes.txt" | Where-Object CPU -gt 50
```

---

## Variables and Data Types

### Variable Declaration and Assignment

PowerShell variables are dynamically typed and prefixed with `$`:

```powershell
# String variables
$computerName = "SERVER01"
$message = "Hello, World!"

# Numeric variables
$port = 80
$percentage = 85.5

# Boolean variables
$isEnabled = $true
$isComplete = $false

# Array variables
$servers = @("Server1", "Server2", "Server3")
$numbers = 1, 2, 3, 4, 5

# Hashtable variables
$userInfo = @{
    Name = "John Doe"
    Department = "IT"
    Location = "New York"
}
```

### Variable Scopes

Understanding variable scope is crucial for script development:

```powershell
# Global scope (available everywhere)
$global:companyName = "Contoso Corp"

# Script scope (available throughout current script)
$script:logPath = "C:\Logs\application.log"

# Local scope (current function or script block)
$local:tempValue = "Temporary data"

# Function scope example
function Get-ServerInfo {
    $local:serverName = $env:COMPUTERNAME
    return $serverName
}
```

### Automatic Variables

PowerShell provides many built-in variables:

```powershell
# Common automatic variables
$_                   # Current pipeline object
$?                   # Success status of last command
$LASTEXITCODE       # Exit code of last native command
$Error              # Array of recent error objects
$PSVersionTable     # PowerShell version information
$env:COMPUTERNAME   # Computer name from environment
$Home               # User's home directory
$PWD                # Present working directory
```

---

## Working with Objects

### Object Properties and Methods

Every PowerShell object has properties (data) and methods (actions):

```powershell
# Get service object
$service = Get-Service -Name "Spooler"

# Access properties
$service.Name
$service.Status
$service.StartType

# Call methods
$service.Start()
$service.Stop()
$service.Refresh()

# Explore object structure
$service | Get-Member
```

### Object Creation

Create custom objects for data organization:

```powershell
# PSCustomObject (recommended)
$server = [PSCustomObject]@{
    Name = "SERVER01"
    OS = "Windows Server 2022"
    CPU = 85
    Memory = 16GB
    Status = "Online"
}

# Access custom object properties
$server.Name
$server.CPU

# Add properties dynamically
$server | Add-Member -MemberType NoteProperty -Name Location -Value "DataCenter1"
```

### Object Filtering and Sorting

```powershell
# Filter objects by properties
Get-Process | Where-Object ProcessName -like "chrome*"
Get-Service | Where-Object Status -eq "Stopped"

# Complex filtering
Get-EventLog -LogName System -Newest 100 | 
    Where-Object { $_.EntryType -eq "Error" -and $_.TimeGenerated -gt (Get-Date).AddDays(-7) }

# Sort objects
Get-Process | Sort-Object CPU -Descending
Get-ChildItem | Sort-Object Name, Length
```

---

## Essential Cmdlets for Daily Use

### File System Operations

```powershell
# Navigate directories
Set-Location "C:\Users\$env:USERNAME\Documents"
Get-Location
Push-Location "C:\Temp"  # Save current location
Pop-Location             # Return to saved location

# List contents
Get-ChildItem                           # Current directory
Get-ChildItem -Recurse                  # Include subdirectories
Get-ChildItem -Filter "*.txt"           # Filter by extension
Get-ChildItem -Hidden                   # Show hidden files

# Create items
New-Item -Path "C:\Temp\NewFolder" -ItemType Directory
New-Item -Path "C:\Temp\NewFile.txt" -ItemType File
New-Item -Path "C:\Temp\TestFile.txt" -ItemType File -Value "Initial content"

# Copy and move items
Copy-Item -Path "source.txt" -Destination "backup.txt"
Copy-Item -Path "C:\Source\*" -Destination "C:\Destination\" -Recurse
Move-Item -Path "oldname.txt" -Destination "newname.txt"

# Remove items
Remove-Item -Path "unwanted.txt"
Remove-Item -Path "C:\TempFolder" -Recurse -Force
```

### Process Management

```powershell
# View processes
Get-Process                                    # All processes
Get-Process -Name "notepad"                   # Specific process
Get-Process | Sort-Object CPU -Descending     # Sort by CPU usage

# Start processes
Start-Process -FilePath "notepad.exe"
Start-Process -FilePath "calc.exe" -WindowStyle Minimized
Start-Process -FilePath "powershell.exe" -Verb RunAs  # Run as administrator

# Stop processes
Stop-Process -Name "notepad"
Stop-Process -Id 1234
Get-Process -Name "chrome" | Stop-Process
```

### Service Management

```powershell
# View services
Get-Service                                    # All services
Get-Service -Name "Spooler"                   # Specific service
Get-Service | Where-Object Status -eq "Running"  # Filter by status

# Control services
Start-Service -Name "Spooler"
Stop-Service -Name "Spooler"
Restart-Service -Name "Spooler"
Set-Service -Name "Spooler" -StartupType Automatic
```

### System Information

```powershell
# Computer information
Get-ComputerInfo
Get-WmiObject -Class Win32_ComputerSystem
Get-CimInstance -ClassName Win32_OperatingSystem

# Hardware information
Get-WmiObject -Class Win32_Processor
Get-WmiObject -Class Win32_LogicalDisk
Get-CimInstance -ClassName Win32_PhysicalMemory

# Network information
Get-NetAdapter
Get-NetIPAddress
Test-NetConnection -ComputerName "google.com" -Port 80
```

---

## Help System and Discovery

### Using Get-Help

PowerShell's help system is comprehensive and always available:

```powershell
# Basic help
Get-Help Get-Process

# Detailed help with examples
Get-Help Get-Process -Detailed
Get-Help Get-Process -Examples
Get-Help Get-Process -Full

# Online help (opens in browser)
Get-Help Get-Process -Online

# Update help files (requires internet)
Update-Help
```

### Command Discovery

```powershell
# Find commands by verb
Get-Command -Verb Get
Get-Command -Verb Set

# Find commands by noun
Get-Command -Noun Process
Get-Command -Noun Service

# Search command names
Get-Command *network*
Get-Command *event*

# Find commands in specific modules
Get-Command -Module ActiveDirectory
```

### Exploring Objects

```powershell
# Discover object structure
Get-Process | Get-Member
Get-Service | Get-Member -MemberType Property
Get-EventLog System -Newest 1 | Get-Member -MemberType Method

# See object formatting
Get-Process | Format-List *
Get-Service | Format-Table Name, Status, StartType -AutoSize
```

---

## Error Handling Basics

### Understanding Errors

PowerShell categorizes errors into two types:

**Terminating Errors**: Stop script execution
**Non-Terminating Errors**: Display warning but continue execution

```powershell
# View recent errors
$Error[0]        # Most recent error
$Error           # All errors in current session
$Error.Clear()   # Clear error history

# Error information
$Error[0].Exception.Message
$Error[0].ScriptStackTrace
$Error[0].CategoryInfo
```

### Basic Error Handling

```powershell
# Try-Catch for error handling
try {
    Get-Item "C:\NonExistentFile.txt" -ErrorAction Stop
}
catch {
    Write-Warning "File not found: $($_.Exception.Message)"
}

# Error action preferences
Get-Process "NonExistentProcess" -ErrorAction SilentlyContinue
Get-Process "NonExistentProcess" -ErrorAction Stop
```

---

## PowerShell Profiles and Customization

### Profile Locations

PowerShell profiles allow customization of your environment:

```powershell
# Check profile paths
$PROFILE                                    # Current user, current host
$PROFILE.AllUsersAllHosts                  # All users, all hosts
$PROFILE.CurrentUserCurrentHost            # Current user, current host
$PROFILE.CurrentUserAllHosts               # Current user, all hosts

# Test if profile exists
Test-Path $PROFILE

# Create profile if it doesn't exist
if (!(Test-Path $PROFILE)) {
    New-Item -Path $PROFILE -Type File -Force
}

# Edit profile
notepad $PROFILE
```

### Common Profile Customizations

```powershell
# Example profile content
# Set execution policy for current user
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Custom aliases
Set-Alias -Name ll -Value Get-ChildItem
Set-Alias -Name grep -Value Select-String

# Custom functions
function Get-PublicIP {
    (Invoke-WebRequest -Uri "https://api.ipify.org").Content
}

# Module imports
Import-Module ActiveDirectory -ErrorAction SilentlyContinue

# Custom prompt
function prompt {
    "PS $(Get-Location)> "
}

# Welcome message
Write-Host "PowerShell Profile Loaded Successfully!" -ForegroundColor Green
```

---

## Practical Exercises

### Exercise 1: System Inventory

Create a system inventory script:

```powershell
# Gather system information
$computerInfo = Get-ComputerInfo
$osInfo = Get-CimInstance -ClassName Win32_OperatingSystem
$diskInfo = Get-WmiObject -Class Win32_LogicalDisk | Where-Object DriveType -eq 3

# Create custom report object
$report = [PSCustomObject]@{
    ComputerName = $computerInfo.CsName
    OperatingSystem = $osInfo.Caption
    Version = $osInfo.Version
    TotalRAM = [math]::Round($computerInfo.TotalPhysicalMemory / 1GB, 2)
    Disks = $diskInfo | ForEach-Object { 
        "$($_.DeviceID) - $([math]::Round($_.Size / 1GB, 2)) GB" 
    }
    LastBootTime = $osInfo.LastBootUpTime
}

# Display report
$report | Format-List
```

### Exercise 2: Service Management

Monitor and manage services:

```powershell
# Find stopped services that should be running
$stoppedServices = Get-Service | Where-Object {
    $_.Status -eq "Stopped" -and 
    $_.StartType -eq "Automatic"
}

# Display results
if ($stoppedServices) {
    Write-Host "Found $($stoppedServices.Count) stopped automatic services:" -ForegroundColor Yellow
    $stoppedServices | Format-Table Name, Status, StartType -AutoSize
} else {
    Write-Host "All automatic services are running." -ForegroundColor Green
}
```

### Exercise 3: File System Cleanup

Clean temporary files:

```powershell
# Define temp locations
$tempPaths = @(
    "$env:TEMP",
    "$env:WINDIR\Temp",
    "$env:LOCALAPPDATA\Temp"
)

# Calculate space before cleanup
$totalSpaceBefore = 0
foreach ($path in $tempPaths) {
    if (Test-Path $path) {
        $files = Get-ChildItem -Path $path -Recurse -File -ErrorAction SilentlyContinue
        $totalSpaceBefore += ($files | Measure-Object -Property Length -Sum).Sum
    }
}

Write-Host "Space used before cleanup: $([math]::Round($totalSpaceBefore / 1MB, 2)) MB"

# Cleanup (commented for safety)
# foreach ($path in $tempPaths) {
#     if (Test-Path $path) {
#         Remove-Item -Path "$path\*" -Recurse -Force -ErrorAction SilentlyContinue
#     }
# }
```

---

## Best Practices and Tips

### Coding Standards

**Use Approved Verbs:**
```powershell
# Good
Get-UserInfo
Set-ConfigValue
New-LogEntry

# Avoid
Retrieve-UserInfo
Change-ConfigValue
Create-LogEntry
```

**Parameter Validation:**
```powershell
function Get-ServerStatus {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [ValidateNotNullOrEmpty()]
        [string]$ComputerName,
        
        [ValidateRange(1, 65535)]
        [int]$Port = 80
    )
    
    # Function logic here
}
```

### Performance Tips

**Use Appropriate Cmdlets:**
```powershell
# Faster for WMI queries
Get-CimInstance -ClassName Win32_Service

# Instead of
Get-WmiObject -Class Win32_Service

# More efficient filtering
Get-Process | Where-Object ProcessName -eq "notepad"

# Instead of
Get-Process | Where-Object { $_.ProcessName -eq "notepad" }
```

### Security Considerations

**Execution Policy:**
```powershell
# Check current execution policy
Get-ExecutionPolicy

# Set appropriate policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Credential Handling:**
```powershell
# Secure credential prompting
$credential = Get-Credential

# Use credentials in commands
Invoke-Command -ComputerName SERVER01 -Credential $credential -ScriptBlock { Get-Service }
```

---

## Next Steps

Now that you've mastered PowerShell fundamentals, you're ready to:

1. **Explore Scripting**: Learn to create reusable scripts and functions
2. **Study Modules**: Discover specialized modules for specific tasks
3. **Practice Remote Management**: Manage multiple systems efficiently
4. **Automate Tasks**: Transform manual processes into automated solutions

:::tip Practice Regularly
The best way to master PowerShell is through daily use. Try replacing GUI tasks with PowerShell commands, even for simple operations.
:::

Continue your PowerShell journey with our [Scripting Guide](/docs/windows/powershell/scripting) to learn how to build powerful automation scripts!