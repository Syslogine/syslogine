---
sidebar_position: 2
title: Linux File System
---

# Linux File System Structure

Understanding the Linux file system hierarchy is crucial for effective system administration.

## The Root Directory (`/`)

Everything in Linux starts from the root directory `/`. Here's the standard structure:

```
/
├── bin/          # Essential command binaries
├── etc/          # System configuration files
├── home/         # User home directories
├── var/          # Variable data (logs, databases)
├── usr/          # User programs and data
├── tmp/          # Temporary files
├── boot/         # Boot loader files
└── dev/          # Device files
```

## Key Directories Explained

### `/etc/` - Configuration Files
This is where system-wide configuration files live:

```bash
/etc/passwd       # User account information
/etc/hosts        # Hostname to IP mappings
/etc/fstab        # File system mount table
/etc/ssh/         # SSH configuration
```

### `/var/` - Variable Data
Contains files that change during system operation:

```bash
/var/log/         # System and application logs
/var/www/         # Web server files
/var/lib/         # Application state data
/var/tmp/         # Temporary files (survives reboot)
```

### `/home/` - User Directories
Each user gets their own directory:

```bash
/home/john/       # John's personal files
/home/mary/       # Mary's personal files
```

## File Permissions

Linux uses a permission system based on **owner**, **group**, and **others**:

```bash
-rw-r--r-- 1 root root 1024 Jan 15 10:30 example.txt
```

Breaking this down:
- `rw-` - Owner can read and write
- `r--` - Group can only read  
- `r--` - Others can only read

:::warning Important
Always be careful when modifying files in `/etc/`. A wrong configuration can break your system!
:::

## Common File Operations

```bash
# Navigate directories
cd /var/log              # Change to log directory
pwd                      # Show current directory
ls -la                   # List files with details

# View file contents
cat /etc/passwd          # Display entire file
less /var/log/syslog     # View file page by page
head -10 /etc/passwd     # Show first 10 lines
tail -f /var/log/syslog  # Follow log file in real-time
```

## Next Steps

Now that you understand the file system, let's learn about [User Management](/docs/basics/user-management).

---

*Understanding the file system is the foundation of Linux administration.*
```

**En maak `docs/commands/essential-commands.md`:**
```markdown
---
sidebar_position: 1
title: Essential Linux Commands
---

# Essential Linux Commands

Master these commands and you'll be productive on any Linux system.

## File and Directory Operations

### Navigation
```bash
pwd                    # Print working directory
cd /path/to/directory  # Change directory
cd ~                   # Go to home directory
cd -                   # Go to previous directory
ls                     # List files
ls -la                 # List with details and hidden files
```

### File Operations
```bash
cp file1 file2         # Copy file
cp -r dir1 dir2        # Copy directory recursively
mv oldname newname     # Move/rename file
rm filename            # Delete file
rm -rf directory       # Delete directory and contents (dangerous!)
mkdir dirname          # Create directory
rmdir dirname          # Remove empty directory
```

## Text Processing

### Viewing Files
```bash
cat filename           # Display entire file
less filename          # View file page by page
head -n 20 filename    # Show first 20 lines
tail -n 20 filename    # Show last 20 lines
tail -f filename       # Follow file changes (great for logs)
```

### Searching and Filtering
```bash
grep "pattern" file    # Search for pattern in file
grep -r "pattern" /    # Search recursively in directory
find /path -name "*.txt"  # Find files by name pattern
locate filename        # Quick file search (if available)
```

## System Information

```bash
ps aux                 # Show running processes
top                    # Real-time process monitor
htop                   # Better process monitor (if installed)
df -h                  # Show disk space usage
du -sh /path           # Show directory size
free -h                # Show memory usage
uptime                 # Show system uptime and load
```

## Network Commands

```bash
ping google.com        # Test network connectivity
wget https://example.com/file  # Download file
curl -I https://example.com    # Check HTTP headers
netstat -tulpn         # Show network connections
ss -tulpn              # Modern alternative to netstat
```

## File Permissions

```bash
chmod 755 filename     # Set file permissions
chmod +x script.sh     # Make file executable
chown user:group file  # Change file ownership
```

:::tip Pro Tip
Use `man command` to read the manual for any command. For example: `man ls`
:::

## Combining Commands

The real power comes from combining commands:

```bash
# Find large files
find / -type f -size +100M 2>/dev/null

# Count lines in all .txt files
find . -name "*.txt" -exec wc -l {} +

# Monitor failed login attempts
tail -f /var/log/auth.log | grep "Failed password"

# Find processes using most memory
ps aux --sort=-%mem | head -10
```

## Command History

```bash
history                # Show command history
!!                     # Run last command
!123                   # Run command number 123 from history
Ctrl+R                 # Search command history interactively
```

---

*These commands form the foundation of Linux system administration. Practice them regularly!*