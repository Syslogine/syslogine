---
sidebar_position: 1
title: "adduser Command"
sidebar_label: "adduser"
description: "Create users with Debian's adduser command - interactive user creation with automatic home directory and system setup."
keywords:
  - "debian adduser"
  - "adduser command"
  - "interactive user creation"
tags:
  - debian
  - adduser
  - user-creation
slug: /linux/debian/administration/user-management/user-accounts/adduser
---

# adduser Command

Debian's enhanced user creation script that guides you through creating user accounts with interactive prompts and automatic system setup.

---

## How adduser Works

The `adduser` command is Debian's user-friendly wrapper around the lower-level `useradd` command. It asks you questions, sets up everything automatically, and follows Debian's best practices without you needing to remember complex options.

### Basic User Creation

```bash
sudo adduser john
```

**What this does:**
- Prompts you for user information (full name, phone, etc.)
- Creates the user account with a unique user ID
- Makes a personal group called "john" 
- Creates `/home/john` directory
- Copies default files from `/etc/skel` to the home directory
- Sets up mail delivery for the user
- Asks you to set a password

**Example of what you'll see:**
```bash
$ sudo adduser john
Adding user 'john' ...
Adding new group 'john' (1001) ...
Adding new user 'john' (1001) with group 'john' ...
Creating home directory '/home/john' ...
Copying files from '/etc/skel' ...
New password: 
Retype new password: 
Changing the user information for john
Enter the new value, or press ENTER for the default
  Full Name []: John Doe
  Room Number []: 
  Work Phone []: 
  Home Phone []: 
  Other []: 
Is the information correct? [Y/n] Y
```

---

## Common Options Explained

### --gecos: Skip the Questions
```bash
sudo adduser --gecos "John Doe,Room 101,555-1234,555-5678" john
```

**What this does:**
Instead of asking you questions about full name, room number, and phone numbers, this sets all that information at once. The format is: "Full Name,Room,Work Phone,Home Phone,Other". You can leave fields empty: `--gecos "John Doe,,,"` just sets the name.

**When to use:** Scripts, automation, or when you already know all the details.

### --system: Service Accounts
```bash
sudo adduser --system nginx
```

**What this does:**
Creates a "system user" - an account designed for running services, not for human login:
- Gets a low user ID (usually under 1000)
- No home directory created
- Shell set to `/usr/sbin/nologin` (prevents login)
- No password prompts
- No personal group creation

**When to use:** Creating accounts for web servers, databases, or other system services.

### --disabled-password: No Password Login
```bash
sudo adduser --disabled-password deploy
```

**What this does:**
Creates a normal user account but doesn't set up password authentication:
- User cannot login with a password
- Account can still be used for SSH key authentication
- All other normal user setup happens (home directory, etc.)

**When to use:** Accounts that should only use SSH keys, or accounts you'll set passwords for later.

### --home: Custom Location
```bash
sudo adduser --home /opt/webapp webapp
```

**What this does:**
Instead of creating `/home/username`, it creates the home directory wherever you specify. This is useful for service accounts or users with special storage requirements.

**When to use:** Service accounts, users with special directory needs, or different storage locations.

### --shell: Different Shell
```bash
sudo adduser --shell /bin/zsh developer
```

**What this does:**
Sets the user's default shell to something other than `/bin/bash`. The shell is what runs when the user logs in - different shells have different features and behaviors.

**When to use:** Users who prefer zsh, fish, or other shells, or system accounts that need specific shells.

### --quiet: Silent Operation
```bash
sudo adduser --quiet --disabled-password --gecos "Service User" webapp
```

**What this does:**
Suppresses most output and questions, creating the user with minimal interaction. Combined with other options, this creates users completely automatically.

**When to use:** Scripts, automated deployment, mass user creation.

---

## What Files Get Created

When `adduser` runs, it modifies several system files:

- **`/etc/passwd`** - Adds basic user info (name, ID, home directory, shell)
- **`/etc/shadow`** - Stores encrypted password
- **`/etc/group`** - Creates the user's personal group
- **`/home/username/`** - Creates and populates home directory
- **`/var/mail/username`** - Creates mail spool file

---

## Real-World Examples

### Desktop User
```bash
sudo adduser alice
```
Creates a normal user account with full interactive setup - perfect for desktop computers or servers where people need login accounts.

### Web Application User
```bash
sudo adduser --system --home /var/www/myapp --shell /bin/bash myapp
```
Creates a system account for running a web application, with a home directory in `/var/www` and bash shell for maintenance tasks.

### Deployment Account
```bash
sudo adduser --disabled-password --gecos "Deployment User" deploy
```
Creates an account for automated deployment tools that will use SSH keys instead of passwords.

---

## Configuration Files

- **`/etc/adduser.conf`** - Controls default behavior (default shell, whether to create home directories, etc.)
- **`/etc/skel/`** - Template directory copied to new user home directories

---

## When to Use adduser

Choose `adduser` when you want:
- Interactive, guided user creation
- Debian's recommended defaults
- Full system integration without remembering options
- User-friendly experience for new administrators

For scripting and automation where you need precise control, consider `useradd` instead.

---