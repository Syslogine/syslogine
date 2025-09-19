---
sidebar_position: 4
title: "Advanced PowerShell Techniques"
sidebar_label: "Advanced"
description: "Master advanced PowerShell techniques including remoting, DSC, modules, workflows, and enterprise automation for complex Windows environments."
keywords:
  - "powershell advanced"
  - "powershell remoting"
  - "powershell dsc"
  - "powershell modules"
  - "enterprise automation"
tags:
  - powershell-advanced
  - remoting
  - dsc
  - modules
  - enterprise-automation
slug: /windows/powershell/advanced
---

# Advanced PowerShell Techniques

Take your PowerShell skills to the enterprise level with advanced techniques for automation, remote management, and infrastructure as code. This guide covers the sophisticated features that enable scalable, maintainable solutions for complex Windows environments.

## PowerShell Remoting

### Setting Up PowerShell Remoting

PowerShell remoting enables you to run commands on remote computers as if you were working locally:

```powershell
# Enable remoting on local machine (run as Administrator)
Enable-PSRemoting -Force

# Configure trusted hosts (for workgroup environments)
Set-Item WSMan:\localhost\Client\TrustedHosts -Value "SERVER01,SERVER02,192.168.1.*"

# Check remoting configuration
Get-PSSessionConfiguration
Test-WSMan -ComputerName "SERVER01"

# Configure remoting for domain environments (via Group Policy)
# Computer Configuration > Policies > Administrative Templates > 
# Windows Components > Windows Remote Management (WinRM) > WinRM Service
```

### Remote Command Execution

```powershell
# One-to-one remoting (interactive session)
Enter-PSSession -ComputerName "SERVER01"
# Commands run on SERVER01 until you type Exit-PSSession

# One-to-many remoting (run commands on multiple machines)
$servers = @("SERVER01", "SERVER02", "SERVER03")

Invoke-Command -ComputerName $servers -ScriptBlock {
    Get-Service -Name "W32Time" | Select-Object Name, Status, MachineName
}

# Using credentials for authentication
$credential = Get-Credential "DOMAIN\Administrator"
Invoke-Command -ComputerName $servers -Credential $credential -ScriptBlock {
    Get-EventLog -LogName System -Newest 5 -EntryType Error
}
```

### Persistent Sessions

```powershell
# Create persistent sessions for better performance
$sessions = New-PSSession -ComputerName $servers -Credential $credential

# Run commands across all sessions
Invoke-Command -Session $sessions -ScriptBlock {
    param($ServiceName)
    Get-Service -Name $ServiceName
} -ArgumentList "Spooler"

# Copy files to remote sessions
Copy-Item -Path "C:\Scripts\Deploy.ps1" -Destination "C:\Temp\" -ToSession $sessions

# Import modules into remote sessions
Invoke-Command -Session $sessions -ScriptBlock {
    Import-Module ActiveDirectory -Force
}

# Clean up sessions when done
Remove-PSSession $sessions
```

### Advanced Remoting Scenarios

```powershell
function Invoke-ParallelCommand {
    [CmdletBinding()]
    param(
        [string[]]$ComputerName,
        [scriptblock]$ScriptBlock,
        [pscredential]$Credential,
        [int]$ThrottleLimit = 10
    )
    
    # Create background jobs for parallel execution
    $jobs = @()
    
    foreach ($computer in $ComputerName) {
        $job = Start-Job -ScriptBlock {
            param($Computer, $Script, $Cred)
            
            try {
                Invoke-Command -ComputerName $Computer -Credential $Cred -ScriptBlock $Script -ErrorAction Stop
            }
            catch {
                [PSCustomObject]@{
                    ComputerName = $Computer
                    Error = $_.Exception.Message
                    Status = "Failed"
                }
            }
        } -ArgumentList $computer, $ScriptBlock, $Credential
        
        $jobs += $job
        
        # Throttle job creation
        while ((Get-Job -State Running).Count -ge $ThrottleLimit) {
            Start-Sleep -Milliseconds 100
        }
    }
    
    # Wait for all jobs to complete and collect results
    $results = @()
    foreach ($job in $jobs) {
        $results += Receive-Job -Job $job -Wait
        Remove-Job -Job $job
    }
    
    return $results
}

# Usage
$results = Invoke-ParallelCommand -ComputerName $servers -ScriptBlock {
    Get-WmiObject -Class Win32_LogicalDisk | Where-Object DriveType -eq 3
} -Credential $credential
```

---

## Module Development

### Creating Professional Modules

A well-structured PowerShell module follows specific conventions:

```powershell
# Module structure:
# MyModule/
# ├── MyModule.psd1 (manifest)
# ├── MyModule.psm1 (module file)
# ├── Public/ (exported functions)
# ├── Private/ (internal functions)
# └── en-US/ (help files)

# MyModule.psm1
$Public = @(Get-ChildItem -Path $PSScriptRoot\Public\*.ps1 -ErrorAction SilentlyContinue)
$Private = @(Get-ChildItem -Path $PSScriptRoot\Private\*.ps1 -ErrorAction SilentlyContinue)

# Import all functions
foreach ($import in @($Public + $Private)) {
    try {
        . $import.FullName
    }
    catch {
        Write-Error "Failed to import function $($import.FullName): $_"
    }
}

# Export public functions
Export-ModuleMember -Function $Public.BaseName
```

### Module Manifest

```powershell
# MyModule.psd1
@{
    RootModule = 'MyModule.psm1'
    ModuleVersion = '2.0.1'
    GUID = '12345678-1234-1234-1234-123456789012'
    Author = 'Your Name'
    CompanyName = 'Your Company'
    Copyright = '(c) 2024. All rights reserved.'
    Description = 'Advanced system management utilities'
    
    PowerShellVersion = '5.1'
    RequiredModules = @('ActiveDirectory', 'PSWindowsUpdate')
    
    FunctionsToExport = @(
        'Get-SystemHealth',
        'Set-ServiceConfiguration', 
        'Backup-SystemState'
    )
    
    CmdletsToExport = @()
    VariablesToExport = @()
    AliasesToExport = @()
    
    PrivateData = @{
        PSData = @{
            Tags = @('Administration', 'Automation', 'Windows')
            LicenseUri = 'https://github.com/username/MyModule/blob/master/LICENSE'
            ProjectUri = 'https://github.com/username/MyModule'
            ReleaseNotes = 'Bug fixes and performance improvements'
        }
    }
}
```

### Advanced Function Development

```powershell
# Public/Get-SystemHealth.ps1
function Get-SystemHealth {
    [CmdletBinding(DefaultParameterSetName = 'ComputerName')]
    [OutputType([PSCustomObject])]
    param(
        [Parameter(
            ParameterSetName = 'ComputerName',
            Position = 0,
            ValueFromPipeline = $true,
            ValueFromPipelineByPropertyName = $true
        )]
        [ValidateNotNullOrEmpty()]
        [Alias('CN', 'Server')]
        [string[]]$ComputerName = $env:COMPUTERNAME,
        
        [Parameter(ParameterSetName = 'Session')]
        [System.Management.Automation.Runspaces.PSSession[]]$Session,
        
        [ValidateRange(0, 100)]
        [int]$DiskThreshold = 10,
        
        [ValidateRange(0, 100)]
        [int]$MemoryThreshold = 85,
        
        [switch]$IncludeServices,
        [switch]$PassThru
    )
    
    begin {
        Write-Verbose "Starting system health check with disk threshold: $DiskThreshold%, memory threshold: $MemoryThreshold%"
        
        $healthCheckScript = {
            param($DiskThresh, $MemThresh, $CheckServices)
            
            try {
                # System information
                $os = Get-CimInstance -ClassName Win32_OperatingSystem -ErrorAction Stop
                $cs = Get-CimInstance -ClassName Win32_ComputerSystem -ErrorAction Stop
                
                # Calculate uptime
                $uptime = (Get-Date) - $os.LastBootUpTime
                
                # Memory usage
                $memoryUsage = [math]::Round((($os.TotalVisibleMemorySize - $os.FreePhysicalMemory) / $os.TotalVisibleMemorySize) * 100, 2)
                
                # Disk space check
                $disks = Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DriveType=3"
                $criticalDisks = @()
                
                foreach ($disk in $disks) {
                    $freePercent = [math]::Round(($disk.FreeSpace / $disk.Size) * 100, 2)
                    if ($freePercent -le $DiskThresh) {
                        $criticalDisks += [PSCustomObject]@{
                            Drive = $disk.DeviceID
                            FreePercent = $freePercent
                            FreeGB = [math]::Round($disk.FreeSpace / 1GB, 2)
                        }
                    }
                }
                
                # Service check (optional)
                $stoppedServices = @()
                if ($CheckServices) {
                    $stoppedServices = Get-Service | Where-Object { 
                        $_.Status -eq 'Stopped' -and $_.StartType -eq 'Automatic' 
                    } | Select-Object Name, DisplayName
                }
                
                # Overall health status
                $healthStatus = 'Healthy'
                $issues = @()
                
                if ($memoryUsage -gt $MemThresh) {
                    $healthStatus = 'Warning'
                    $issues += "High memory usage: $memoryUsage%"
                }
                
                if ($criticalDisks.Count -gt 0) {
                    $healthStatus = 'Critical'
                    $issues += "Low disk space on $($criticalDisks.Count) drive(s)"
                }
                
                if ($stoppedServices.Count -gt 0) {
                    if ($healthStatus -eq 'Healthy') { $healthStatus = 'Warning' }
                    $issues += "$($stoppedServices.Count) stopped automatic service(s)"
                }
                
                # Return health report
                [PSCustomObject]@{
                    ComputerName = $env:COMPUTERNAME
                    Status = $healthStatus
                    Issues = $issues -join '; '
                    UptimeDays = [math]::Round($uptime.TotalDays, 2)
                    MemoryUsagePercent = $memoryUsage
                    CriticalDisks = $criticalDisks
                    StoppedServices = $stoppedServices
                    TotalRAMGB = [math]::Round($cs.TotalPhysicalMemory / 1GB, 2)
                    LastChecked = Get-Date
                    PSTypeName = 'System.Health.Report'
                }
            }
            catch {
                [PSCustomObject]@{
                    ComputerName = $env:COMPUTERNAME
                    Status = 'Error'
                    Issues = $_.Exception.Message
                    LastChecked = Get-Date
                    PSTypeName = 'System.Health.Report'
                }
            }
        }
    }
    
    process {
        switch ($PSCmdlet.ParameterSetName) {
            'ComputerName' {
                foreach ($computer in $ComputerName) {
                    Write-Verbose "Checking health of $computer"
                    
                    try {
                        if ($computer -eq $env:COMPUTERNAME -or $computer -eq 'localhost' -or $computer -eq '.') {
                            # Local execution
                            & $healthCheckScript -DiskThresh $DiskThreshold -MemThresh $MemoryThreshold -CheckServices:$IncludeServices
                        } else {
                            # Remote execution
                            Invoke-Command -ComputerName $computer -ScriptBlock $healthCheckScript -ArgumentList $DiskThreshold, $MemoryThreshold, $IncludeServices.IsPresent -ErrorAction Stop
                        }
                    }
                    catch {
                        Write-Error "Failed to check $computer`: $($_.Exception.Message)"
                        
                        if ($PassThru) {
                            [PSCustomObject]@{
                                ComputerName = $computer
                                Status = 'Unreachable'
                                Issues = $_.Exception.Message
                                LastChecked = Get-Date
                                PSTypeName = 'System.Health.Report'
                            }
                        }
                    }
                }
            }
            
            'Session' {
                foreach ($s in $Session) {
                    Write-Verbose "Checking health via session to $($s.ComputerName)"
                    
                    try {
                        Invoke-Command -Session $s -ScriptBlock $healthCheckScript -ArgumentList $DiskThreshold, $MemoryThreshold, $IncludeServices.IsPresent
                    }
                    catch {
                        Write-Error "Failed to check $($s.ComputerName): $($_.Exception.Message)"
                    }
                }
            }
        }
    }
    
    end {
        Write-Verbose "Health check completed"
    }
}
```

---

## Desired State Configuration (DSC)

### DSC Fundamentals

DSC enables infrastructure as code by defining the desired state of systems:

```powershell
# Basic DSC Configuration
Configuration WebServerSetup {
    param(
        [Parameter(Mandatory=$true)]
        [string[]]$NodeName
    )
    
    Import-DscResource -ModuleName PSDesiredStateConfiguration
    Import-DscResource -ModuleName xWebAdministration
    
    Node $NodeName {
        # Ensure IIS is installed
        WindowsFeature IIS {
            Ensure = "Present"
            Name = "IIS-WebServerRole"
        }
        
        WindowsFeature IISManagement {
            Ensure = "Present"
            Name = "IIS-ManagementConsole"
            DependsOn = "[WindowsFeature]IIS"
        }
        
        # Configure default website
        xWebsite DefaultSite {
            Ensure = "Present"
            Name = "Default Web Site"
            State = "Stopped"
            PhysicalPath = "C:\inetpub\wwwroot"
            DependsOn = "[WindowsFeature]IIS"
        }
        
        # Create custom website
        File WebsiteContent {
            Ensure = "Present"
            Type = "Directory"
            DestinationPath = "C:\WebSite"
            Recurse = $true
        }
        
        xWebsite CustomSite {
            Ensure = "Present"
            Name = "MyWebSite"
            State = "Started"
            PhysicalPath = "C:\WebSite"
            BindingInfo = @(
                MSFT_xWebBindingInformation {
                    Protocol = "HTTP"
                    Port = 8080
                }
            )
            DependsOn = @("[File]WebsiteContent", "[xWebsite]DefaultSite")
        }
        
        # Configure services
        Service W3SVC {
            Name = "W3SVC"
            State = "Running"
            DependsOn = "[WindowsFeature]IIS"
        }
        
        # Registry configuration
        Registry DisableServerHeader {
            Ensure = "Present"
            Key = "HKLM:\SYSTEM\CurrentControlSet\Services\HTTP\Parameters"
            ValueName = "DisableServerHeader"
            ValueData = "1"
            ValueType = "Dword"
        }
    }
}

# Compile and apply configuration
$nodes = @("WEB01", "WEB02")
WebServerSetup -NodeName $nodes -OutputPath "C:\DSC\WebServer"

# Apply configuration
Start-DscConfiguration -Path "C:\DSC\WebServer" -Wait -Verbose -Force
```

### Advanced DSC Patterns

```powershell
# Composite Configuration with Parameters
Configuration EnterpriseServer {
    param(
        [Parameter(Mandatory=$true)]
        [string[]]$NodeName,
        
        [Parameter(Mandatory=$true)]
        [hashtable]$ConfigurationData
    )
    
    Import-DscResource -ModuleName PSDesiredStateConfiguration
    Import-DscResource -ModuleName xActiveDirectory
    Import-DscResource -ModuleName xDhcpServer
    
    Node $NodeName {
        # Role-based configuration
        if ($Node.Roles -contains "DomainController") {
            xADDomain CreateDomain {
                DomainName = $Node.DomainName
                DomainAdministratorCredential = $Node.Credential
                SafemodeAdministratorPassword = $Node.SafeModePassword
            }
            
            xADUser ServiceAccount {
                DomainName = $Node.DomainName
                UserName = "svc-backup"
                Password = $Node.ServiceAccountPassword
                Ensure = "Present"
                DependsOn = "[xADDomain]CreateDomain"
            }
        }
        
        if ($Node.Roles -contains "DHCPServer") {
            WindowsFeature DHCPServer {
                Ensure = "Present"
                Name = "DHCP"
            }
            
            xDhcpServerScope DHCPScope {
                Ensure = "Present"
                ScopeId = $Node.DHCPScope.ScopeId
                Name = $Node.DHCPScope.Name
                StartRange = $Node.DHCPScope.StartRange
                EndRange = $Node.DHCPScope.EndRange
                SubnetMask = $Node.DHCPScope.SubnetMask
                State = "Active"
                DependsOn = "[WindowsFeature]DHCPServer"
            }
        }
        
        # Common configuration for all servers
        Registry DisableIEESC {
            Ensure = "Present"
            Key = "HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components\{A509B1A7-37EF-4b3f-8CFC-4F3A74704073}"
            ValueName = "IsInstalled"
            ValueData = "0"
            ValueType = "Dword"
        }
        
        LocalConfigurationManager {
            ConfigurationMode = "ApplyAndAutoCorrect"
            RebootNodeIfNeeded = $true
            RefreshMode = "Push"
            RefreshFrequencyMins = 30
        }
    }
}

# Configuration Data
$ConfigData = @{
    AllNodes = @(
        @{
            NodeName = "*"
            PSDscAllowPlainTextPassword = $true
        },
        @{
            NodeName = "DC01"
            Roles = @("DomainController")
            DomainName = "contoso.com"
            Credential = (Get-Credential "contoso\administrator")
            SafeModePassword = (Get-Credential "SafeMode")
        },
        @{
            NodeName = "DHCP01"
            Roles = @("DHCPServer")
            DHCPScope = @{
                ScopeId = "192.168.1.0"
                Name = "Internal Network"
                StartRange = "192.168.1.100"
                EndRange = "192.168.1.200"
                SubnetMask = "255.255.255.0"
            }
        }
    )
}

# Apply configuration
EnterpriseServer -NodeName $ConfigData.AllNodes.NodeName -ConfigurationData $ConfigData -OutputPath "C:\DSC\Enterprise"
```

---

## Advanced Automation Patterns

### Workflow Orchestration

```powershell
# Complex deployment workflow
function Start-ApplicationDeployment {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string]$ApplicationName,
        
        [Parameter(Mandatory=$true)]
        [string]$Version,
        
        [Parameter(Mandatory=$true)]
        [hashtable]$EnvironmentConfig
    )
    
    $deploymentSteps = @(
        @{ Name = "PreDeployment"; ScriptBlock = { 
            Write-Host "Running pre-deployment checks..."
            # Database backup, service stop, etc.
        }},
        @{ Name = "Deployment"; ScriptBlock = { 
            Write-Host "Deploying application..."
            # File copy, configuration updates, etc.
        }},
        @{ Name = "PostDeployment"; ScriptBlock = { 
            Write-Host "Running post-deployment tasks..."
            # Service start, smoke tests, etc.
        }},
        @{ Name = "Validation"; ScriptBlock = { 
            Write-Host "Validating deployment..."
            # Health checks, functionality tests
        }}
    )
    
    $deployment = [PSCustomObject]@{
        ApplicationName = $ApplicationName
        Version = $Version
        StartTime = Get-Date
        Status = "InProgress"
        Steps = @()
        Errors = @()
    }
    
    try {
        foreach ($step in $deploymentSteps) {
            Write-Host "Executing step: $($step.Name)" -ForegroundColor Cyan
            
            $stepResult = [PSCustomObject]@{
                Name = $step.Name
                StartTime = Get-Date
                Status = "Running"
                Duration = $null
                Output = ""
                Error = $null
            }
            
            try {
                $stepStart = Get-Date
                $output = & $step.ScriptBlock
                $stepResult.Duration = (Get-Date) - $stepStart
                $stepResult.Status = "Completed"
                $stepResult.Output = $output -join "`n"
                
                Write-Host "Step $($step.Name) completed successfully" -ForegroundColor Green
            }
            catch {
                $stepResult.Status = "Failed"
                $stepResult.Error = $_.Exception.Message
                $deployment.Errors += "Step $($step.Name) failed: $($_.Exception.Message)"
                
                Write-Error "Step $($step.Name) failed: $($_.Exception.Message)"
                throw
            }
            finally {
                $deployment.Steps += $stepResult
            }
        }
        
        $deployment.Status = "Completed"
        $deployment.EndTime = Get-Date
        $deployment.TotalDuration = $deployment.EndTime - $deployment.StartTime
        
        Write-Host "Deployment completed successfully in $($deployment.TotalDuration.TotalMinutes) minutes" -ForegroundColor Green
        
    }
    catch {
        $deployment.Status = "Failed"
        $deployment.EndTime = Get-Date
        Write-Error "Deployment failed: $($_.Exception.Message)"
    }
    
    return $deployment
}

# Usage
$envConfig = @{
    DatabaseServer = "SQL01"
    WebServers = @("WEB01", "WEB02")
    LoadBalancer = "LB01"
}

$result = Start-ApplicationDeployment -ApplicationName "MyApp" -Version "2.1.0" -EnvironmentConfig $envConfig
```

### Performance Monitoring and Optimization

```powershell
class PerformanceMonitor {
    [string]$ComputerName
    [hashtable]$Counters
    [int]$SampleInterval
    [datetime]$StartTime
    [System.Collections.ArrayList]$Samples
    
    PerformanceMonitor([string]$ComputerName, [hashtable]$Counters, [int]$SampleInterval) {
        $this.ComputerName = $ComputerName
        $this.Counters = $Counters
        $this.SampleInterval = $SampleInterval
        $this.Samples = [System.Collections.ArrayList]::new()
        $this.StartTime = Get-Date
    }
    
    [void]StartMonitoring([int]$DurationMinutes) {
        $endTime = (Get-Date).AddMinutes($DurationMinutes)
        
        Write-Host "Starting performance monitoring for $DurationMinutes minutes..." -ForegroundColor Green
        
        while ((Get-Date) -lt $endTime) {
            $sample = [PSCustomObject]@{
                Timestamp = Get-Date
                ComputerName = $this.ComputerName
            }
            
            foreach ($counterName in $this.Counters.Keys) {
                try {
                    $counterValue = (Get-Counter -Counter $this.Counters[$counterName] -ComputerName $this.ComputerName -SampleInterval 1 -MaxSamples 1).CounterSamples.CookedValue
                    $sample | Add-Member -NotePropertyName $counterName -NotePropertyValue $counterValue
                }
                catch {
                    $sample | Add-Member -NotePropertyName $counterName -NotePropertyValue "Error: $($_.Exception.Message)"
                }
            }
            
            $this.Samples.Add($sample) | Out-Null
            Start-Sleep -Seconds $this.SampleInterval
        }
        
        Write-Host "Monitoring completed. Collected $($this.Samples.Count) samples." -ForegroundColor Green
    }
    
    [PSCustomObject]GetSummaryReport() {
        $numericSamples = $this.Samples | Where-Object { $_.CPUPercent -is [double] }
        
        return [PSCustomObject]@{
            ComputerName = $this.ComputerName
            MonitoringDuration = (Get-Date) - $this.StartTime
            TotalSamples = $this.Samples.Count
            ValidSamples = $numericSamples.Count
            CPUAverage = [math]::Round(($numericSamples | Measure-Object CPUPercent -Average).Average, 2)
            CPUMaximum = ($numericSamples | Measure-Object CPUPercent -Maximum).Maximum
            MemoryAverageGB = [math]::Round(($numericSamples | Measure-Object MemoryUsedGB -Average).Average, 2)
            MemoryMaximumGB = [math]::Round(($numericSamples | Measure-Object MemoryUsedGB -Maximum).Maximum, 2)
        }
    }
    
    [void]ExportToCSV([string]$FilePath) {
        $this.Samples | Export-Csv -Path $FilePath -NoTypeInformation
        Write-Host "Performance data exported to: $FilePath" -ForegroundColor Green
    }
}

# Usage
$counters = @{
    'CPUPercent' = '\Processor(_Total)\% Processor Time'
    'MemoryUsedGB' = '\Memory\Committed Bytes'
    'DiskIOPS' = '\PhysicalDisk(_Total)\Disk Transfers/sec'
}

$monitor = [PerformanceMonitor]::new("SERVER01", $counters, 5)
$monitor.StartMonitoring(10)  # Monitor for 10 minutes

$summary = $monitor.GetSummaryReport()
$monitor.ExportToCSV("C:\Reports\PerformanceData.csv")
```

---

## Enterprise Integration Patterns

### REST API Integration

```powershell
function Invoke-RestApiCall {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string]$Uri,
        
        [ValidateSet('GET', 'POST', 'PUT', 'DELETE', 'PATCH')]
        [string]$Method = 'GET',
        
        [hashtable]$Headers = @{},
        [object]$Body,
        [pscredential]$Credential,
        [int]$TimeoutSec = 30,
        [int]$MaxRetries = 3
    )
    
    $attempt = 0
    do {
        $attempt++
        
        try {
            Write-Verbose "Attempt $attempt`: Making $Method request to $Uri"
            
            $params = @{
                Uri = $Uri
                Method = $Method
                Headers = $Headers
                TimeoutSec = $TimeoutSec
            }
            
            if ($Body) {
                if ($Body -is [hashtable]) {
                    $params.Body = $Body | ConvertTo-Json -Depth 10
                    $params.ContentType = 'application/json'
                } else {
                    $params.Body = $Body
                }
            }
            
            if ($Credential) {
                $params.Credential = $Credential
            }
            
            $response = Invoke-RestMethod @params
            Write-Verbose "Request successful"
            return $response
            
        }
        catch {
            Write-Warning "Attempt $attempt failed: $($_.Exception.Message)"
            
            if ($attempt -lt $MaxRetries) {
                $delay = [math]::Pow(2, $attempt)  # Exponential backoff
                Write-Verbose "Waiting $delay seconds before retry..."
                Start-Sleep -Seconds $delay
            } else {
                throw "API call failed after $MaxRetries attempts: $($_.Exception.Message)"
            }
        }
    } while ($attempt -lt $MaxRetries)
}

# ServiceNow integration example
function Get-ServiceNowIncident {
    param(
        [string]$InstanceUrl,
        [pscredential]$Credential,
        [string]$Filter
    )
    
    $uri = "$InstanceUrl/api/now/table/incident"
    if ($Filter) {
        $uri += "?sysparm_query=$Filter"
    }
    
    $headers = @{
        'Accept' = 'application/json'
    }
    
    try {
        $response = Invoke-RestApiCall -Uri $uri -Method GET -Headers $headers -Credential $Credential
        return $response.result
    }
    catch {
        Write-Error "Failed to retrieve ServiceNow incidents: $($_.Exception.Message)"
    }
}
```

### Database Integration

```powershell
function Invoke-DatabaseQuery {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string]$ServerInstance,
        
        [Parameter(Mandatory=$true)]
        [string]$Database,
        
        [Parameter(Mandatory=$true)]
        [string]$Query,
        
        [pscredential]$Credential,
        [int]$QueryTimeout = 30
    )
    
    try {
        # Create connection string
        if ($Credential) {
            $connectionString = "Server=$ServerInstance;Database=$Database;User Id=$($Credential.UserName);Password=$($Credential.GetNetworkCredential().Password);Connection Timeout=30;"
        } else {
            $connectionString = "Server=$ServerInstance;Database=$Database;Integrated Security=True;Connection Timeout=30;"
        }
        
        # Create connection and command objects
        $connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
        $command = New-Object System.Data.SqlClient.SqlCommand($Query, $connection)
        $command.CommandTimeout = $QueryTimeout
        
        # Open connection and execute query
        $connection.Open()
        $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($command)
        $dataset = New-Object System.Data.DataSet
        
        $null = $adapter.Fill($dataset)
        
        # Convert to PowerShell objects
        $results = @()
        foreach ($row in $dataset.Tables[0].Rows) {
            $obj = [PSCustomObject]@{}
            foreach ($column in $dataset.Tables[0].Columns) {
                $obj | Add-Member -NotePropertyName $column.ColumnName -NotePropertyValue $row[$column.ColumnName]
            }
            $results += $obj
        }
        
        return $results
    }
    catch {
        Write-Error "Database query failed: $($_.Exception.Message)"
    }
    finally {
        if ($connection -and $connection.State -eq 'Open') {
            $connection.Close()
        }
    }
}
```

#### Usage example - System inventory to database
```powershell
function Update-SystemInventory {
    param(
        [string]$DatabaseServer = "SQL01",
        [string]$Database = "IT_Inventory"
    )
    
    $servers = Get-ADComputer -Filter "OperatingSystem -like '*Server*'" | Select-Object -ExpandProperty Name
    
    foreach ($server in $servers) {
        try {
            Write-Host "Collecting inventory for $server..." -ForegroundColor Yellow
            
            $inventory = Invoke-Command -ComputerName $server -ScriptBlock {
                $os = Get-CimInstance Win32_OperatingSystem
                $cs = Get-CimInstance Win32_ComputerSystem
                $bios = Get-CimInstance Win32_BIOS
                
                [PSCustomObject]@{
                    ComputerName = $env:COMPUTERNAME
                    OperatingSystem = $os.Caption
                    OSVersion = $os.Version
                    TotalRAMGB = [math]::Round($cs.TotalPhysicalMemory / 1GB, 2)
                    Manufacturer = $cs.Manufacturer
                    Model = $cs.Model
                    SerialNumber = $bios.SerialNumber
                    LastBootTime = $os.LastBootUpTime
                    LastUpdated = Get-Date
                }
            }
            
            # Insert/Update database record
            $query = @"
MERGE IT_Systems AS target
USING (VALUES ('$($inventory.ComputerName)', '$($inventory.OperatingSystem)', '$($inventory.OSVersion)', 
               $($inventory.TotalRAMGB), '$($inventory.Manufacturer)', '$($inventory.Model)', 
               '$($inventory.SerialNumber)', '$($inventory.LastBootTime)', '$($inventory.LastUpdated)')) 
AS source (ComputerName, OperatingSystem, OSVersion, TotalRAMGB, Manufacturer, Model, SerialNumber, LastBootTime, LastUpdated)
ON target.ComputerName = source.ComputerName
WHEN MATCHED THEN 
    UPDATE SET OperatingSystem = source.OperatingSystem, OSVersion = source.OSVersion, 
               TotalRAMGB = source.TotalRAMGB, LastUpdated = source.LastUpdated
WHEN NOT MATCHED THEN
    INSERT (ComputerName, OperatingSystem, OSVersion, TotalRAMGB, Manufacturer, Model, SerialNumber, LastBootTime, LastUpdated)
    VALUES (source.ComputerName, source.OperatingSystem, source.OSVersion, source.TotalRAMGB, 
            source.Manufacturer, source.Model, source.SerialNumber, source.LastBootTime, source.LastUpdated);
"@
            
            Invoke-DatabaseQuery -ServerInstance $DatabaseServer -Database $Database -Query $query
            Write-Host "Updated inventory for $server" -ForegroundColor Green
            
        }
        catch {
            Write-Warning "Failed to update inventory for $server`: $($_.Exception.Message)"
        }
    }
}
```

---

## Advanced Error Handling and Logging

### Comprehensive Logging Framework

```powershell
class Logger {
    [string]$LogPath
    [string]$LogLevel
    [bool]$EnableConsole
    [System.Collections.Generic.Dictionary[string,int]]$LogLevels
    
    Logger([string]$LogPath, [string]$LogLevel = "Information", [bool]$EnableConsole = $true) {
        $this.LogPath = $LogPath
        $this.LogLevel = $LogLevel
        $this.EnableConsole = $EnableConsole
        
        $this.LogLevels = @{
            "Debug" = 0
            "Information" = 1
            "Warning" = 2
            "Error" = 3
            "Critical" = 4
        }
        
        # Ensure log directory exists
        $logDir = Split-Path $LogPath -Parent
        if (-not (Test-Path $logDir)) {
            New-Item -Path $logDir -ItemType Directory -Force | Out-Null
        }
    }
    
    [void]WriteLog([string]$Message, [string]$Level = "Information", [string]$Source = "PowerShell") {
        if ($this.LogLevels[$Level] -ge $this.LogLevels[$this.LogLevel]) {
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss.fff"
            $logEntry = "[$timestamp] [$Level] [$Source] $Message"
            
            # Write to file
            try {
                Add-Content -Path $this.LogPath -Value $logEntry -Encoding UTF8
            }
            catch {
                Write-Warning "Failed to write to log file: $($_.Exception.Message)"
            }
            
            # Write to console with color coding
            if ($this.EnableConsole) {
                $color = switch ($Level) {
                    "Debug" { "Gray" }
                    "Information" { "White" }
                    "Warning" { "Yellow" }
                    "Error" { "Red" }
                    "Critical" { "Magenta" }
                    default { "White" }
                }
                Write-Host $logEntry -ForegroundColor $color
            }
        }
    }
    
    [void]Debug([string]$Message, [string]$Source = "PowerShell") {
        $this.WriteLog($Message, "Debug", $Source)
    }
    
    [void]Info([string]$Message, [string]$Source = "PowerShell") {
        $this.WriteLog($Message, "Information", $Source)
    }
    
    [void]Warning([string]$Message, [string]$Source = "PowerShell") {
        $this.WriteLog($Message, "Warning", $Source)
    }
    
    [void]Error([string]$Message, [string]$Source = "PowerShell") {
        $this.WriteLog($Message, "Error", $Source)
    }
    
    [void]Critical([string]$Message, [string]$Source = "PowerShell") {
        $this.WriteLog($Message, "Critical", $Source)
    }
}

# Global logger instance
$script:Logger = [Logger]::new("C:\Logs\PowerShell.log", "Information", $true)

function Write-Log {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Message,
        
        [ValidateSet("Debug", "Information", "Warning", "Error", "Critical")]
        [string]$Level = "Information",
        
        [string]$Source = (Get-PSCallStack)[1].Command
    )
    
    $script:Logger.WriteLog($Message, $Level, $Source)
}
```

### Advanced Error Handling Patterns

```powershell
function Invoke-ResilientOperation {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [scriptblock]$Operation,
        
        [int]$MaxRetries = 3,
        [int]$RetryDelaySeconds = 1,
        [string[]]$RetriableExceptions = @("System.Net.WebException", "System.TimeoutException"),
        [scriptblock]$OnRetry,
        [scriptblock]$OnFailure
    )
    
    $attempt = 0
    $lastException = $null
    
    do {
        $attempt++
        Write-Log "Executing operation, attempt $attempt of $($MaxRetries + 1)" -Level Debug
        
        try {
            $result = & $Operation
            Write-Log "Operation succeeded on attempt $attempt" -Level Information
            return $result
        }
        catch {
            $lastException = $_.Exception
            $exceptionType = $lastException.GetType().FullName
            
            Write-Log "Operation failed on attempt $attempt`: $($lastException.Message)" -Level Warning
            
            # Check if this exception type is retriable
            $isRetriable = $RetriableExceptions -contains $exceptionType
            
            if ($attempt -le $MaxRetries -and $isRetriable) {
                Write-Log "Exception type '$exceptionType' is retriable, waiting $RetryDelaySeconds seconds..." -Level Information
                
                if ($OnRetry) {
                    & $OnRetry $attempt $lastException
                }
                
                Start-Sleep -Seconds $RetryDelaySeconds
                $RetryDelaySeconds *= 2  # Exponential backoff
            }
            else {
                if (-not $isRetriable) {
                    Write-Log "Exception type '$exceptionType' is not retriable, failing immediately" -Level Error
                } else {
                    Write-Log "Maximum retry attempts reached, failing operation" -Level Error
                }
                
                if ($OnFailure) {
                    & $OnFailure $lastException
                }
                
                throw $lastException
            }
        }
    } while ($attempt -le $MaxRetries)
}

# Usage example
$result = Invoke-ResilientOperation -Operation {
    # Potentially failing operation
    Invoke-RestMethod -Uri "https://api.example.com/data" -TimeoutSec 10
} -MaxRetries 5 -RetriableExceptions @("System.Net.WebException", "System.TimeoutException") -OnRetry {
    param($Attempt, $Exception)
    Write-Log "Retry $Attempt triggered by: $($Exception.Message)" -Level Warning
    # Could implement additional retry logic here
} -OnFailure {
    param($Exception)
    Write-Log "Operation failed permanently: $($Exception.Message)" -Level Critical
    # Send alert, create ticket, etc.
}
```

---

## Performance Optimization Techniques

### Memory Management and Optimization

```powershell
function Invoke-OptimizedProcessing {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string[]]$InputData,
        
        [int]$BatchSize = 1000,
        [scriptblock]$ProcessingFunction
    )
    
    Write-Log "Starting optimized processing of $($InputData.Count) items with batch size $BatchSize"
    
    $totalItems = $InputData.Count
    $processedItems = 0
    $results = [System.Collections.ArrayList]::new()
    
    # Process in batches to manage memory
    for ($i = 0; $i -lt $totalItems; $i += $BatchSize) {
        $endIndex = [Math]::Min($i + $BatchSize - 1, $totalItems - 1)
        $batch = $InputData[$i..$endIndex]
        
        Write-Progress -Activity "Processing Data" -Status "Batch $($i / $BatchSize + 1)" -PercentComplete (($i / $totalItems) * 100)
        
        try {
            # Process batch
            $batchResults = $batch | ForEach-Object { & $ProcessingFunction $_ }
            $null = $results.AddRange($batchResults)
            
            $processedItems += $batch.Count
            
            # Force garbage collection every 10 batches
            if (($i / $BatchSize) % 10 -eq 0) {
                [System.GC]::Collect()
                [System.GC]::WaitForPendingFinalizers()
                Write-Log "Forced garbage collection after processing $processedItems items" -Level Debug
            }
        }
        catch {
            Write-Log "Failed to process batch starting at index $i`: $($_.Exception.Message)" -Level Error
            throw
        }
    }
    
    Write-Progress -Activity "Processing Data" -Completed
    Write-Log "Completed processing $processedItems items"
    
    return $results.ToArray()
}

# Memory-efficient CSV processing
function Process-LargeCsvFile {
    param(
        [string]$FilePath,
        [scriptblock]$RowProcessor
    )
    
    $reader = $null
    $lineCount = 0
    
    try {
        $reader = [System.IO.StreamReader]::new($FilePath)
        $headers = $reader.ReadLine() -split ','
        
        while (($line = $reader.ReadLine()) -ne $null) {
            $lineCount++
            $values = $line -split ','
            
            # Create object from CSV row
            $row = [PSCustomObject]@{}
            for ($i = 0; $i -lt $headers.Count; $i++) {
                $row | Add-Member -NotePropertyName $headers[$i] -NotePropertyValue $values[$i]
            }
            
            # Process row
            & $RowProcessor $row
            
            # Progress reporting
            if ($lineCount % 10000 -eq 0) {
                Write-Host "Processed $lineCount rows..." -ForegroundColor Green
                [System.GC]::Collect()
            }
        }
    }
    finally {
        if ($reader) {
            $reader.Close()
            $reader.Dispose()
        }
    }
    
    Write-Log "Processed total of $lineCount rows from $FilePath"
}
```

---

## Best Practices Summary

### Security Best Practices

```powershell
# Secure credential handling
function Get-SecureConfiguration {
    param([string]$ConfigPath)
    
    # Use Windows Credential Manager or Azure Key Vault for production
    if (Test-Path $ConfigPath) {
        $encryptedConfig = Get-Content $ConfigPath | ConvertTo-SecureString
        $credential = [System.Management.Automation.PSCredential]::new("config", $encryptedConfig)
        return $credential.GetNetworkCredential().Password | ConvertFrom-Json
    }
    
    throw "Configuration file not found: $ConfigPath"
}

# Input validation and sanitization
function Test-InputSafety {
    param([string]$UserInput)
    
    # Whitelist approach - only allow safe characters
    if ($UserInput -notmatch '^[a-zA-Z0-9\-_\.]+$') {
        throw "Invalid characters detected in input"
    }
    
    # Length validation
    if ($UserInput.Length -gt 100) {
        throw "Input exceeds maximum allowed length"
    }
    
    return $true
}

# Secure file operations
function Set-SecureFilePermissions {
    param([string]$FilePath)
    
    # Remove inheritance and set explicit permissions
    $acl = Get-Acl $FilePath
    $acl.SetAccessRuleProtection($true, $false)
    
    # Add administrator access
    $adminRule = New-Object System.Security.AccessControl.FileSystemAccessRule(
        "BUILTIN\Administrators", "FullControl", "Allow"
    )
    $acl.SetAccessRule($adminRule)
    
    # Add system access
    $systemRule = New-Object System.Security.AccessControl.FileSystemAccessRule(
        "NT AUTHORITY\SYSTEM", "FullControl", "Allow"
    )
    $acl.SetAccessRule($systemRule)
    
    Set-Acl -Path $FilePath -AclObject $acl
}
```

### Performance Guidelines

```powershell
# Efficient object creation and manipulation
$users = [System.Collections.Generic.List[PSObject]]::new()

foreach ($user in $userList) {
    $userObject = [PSCustomObject]@{
        Name = $user.Name
        Email = $user.Email
        Department = $user.Department
    }
    $users.Add($userObject)
}

# Use appropriate comparison operators
$runningServices = Get-Service | Where-Object Status -eq 'Running'  # Efficient
# Avoid: Get-Service | Where-Object { $_.Status -eq 'Running' }      # Less efficient

# Minimize object creation in loops
$stringBuilder = [System.Text.StringBuilder]::new(10000)
foreach ($item in $largeCollection) {
    $null = $stringBuilder.AppendLine("Processing: $item")
}
$result = $stringBuilder.ToString()
```

---

## Conclusion

Advanced PowerShell techniques enable sophisticated automation solutions that scale across enterprise environments. Key takeaways include:

**Remoting and Scale**: Use PowerShell remoting and parallel processing for managing large numbers of systems efficiently.

**Infrastructure as Code**: Implement DSC for consistent, repeatable system configurations.

**Robust Error Handling**: Build resilient scripts with comprehensive error handling and retry logic.

**Performance Optimization**: Use appropriate data structures and memory management for large-scale operations.

**Security Focus**: Always implement proper input validation, credential management, and access controls.

**Monitoring and Logging**: Include comprehensive logging and monitoring in all automation solutions.

These advanced techniques transform PowerShell from a simple scripting tool into a powerful platform for enterprise automation, enabling you to build production-quality solutions that are maintainable, scalable, and secure.

:::tip Next Steps
Practice these advanced techniques in lab environments before implementing in production. Consider pursuing Microsoft PowerShell certifications to validate your expertise and explore specialized modules for your specific technology stack.
:::

Ready to implement these advanced techniques? Start with remoting and DSC fundamentals, then gradually incorporate more sophisticated patterns as your automation requirements grow!