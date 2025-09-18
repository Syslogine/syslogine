---
sidebar_position: 1
title: "Converting Windows Server 2025 Evaluation to Full Version"
sidebar_label: "Evaluation to Full"
description: "Step-by-step guide to convert Windows Server 2025 Evaluation to a full Standard or Datacenter edition and activate it using a product key, without reinstalling the OS."
keywords:
  - "windows server 2025 evaluation"
  - "convert evaluation to full"
  - "windows server activation"
  - "server 2025 product key"
  - "DISM edition conversion"
tags:
  - windows-server-2025
  - evaluation-conversion
  - server-activation
  - system-administration
  - licensing
slug: windows-server-2025-evaluation-to-full
---

# Converting Windows Server 2025 Evaluation to Full Version and Activating with a Key

This guide walks you through the process of converting a Windows Server 2025 Evaluation edition to a full Standard or Datacenter edition and activating it using a valid product key. The Evaluation edition is a trial version that expires after 180 days, but you can upgrade it to a fully licensed version without reinstalling the OS.

## Prerequisites

Before you begin, ensure you have:
- A running Windows Server 2025 Evaluation installation (Standard or Datacenter edition).
- A valid product key for Windows Server 2025 (Standard or Datacenter, depending on your target edition). You can obtain this from your Microsoft licensing provider, reseller, or Volume Licensing Service Center (VLSC).
- Administrative access to the server (must run commands as an Administrator).
- An internet connection (optional, depending on your activation method).

:::warning Domain Controller Limitation
If your server is an Active Directory Domain Controller, converting from Evaluation to full version is not supported. You'll need to demote it first, convert, and then re-promote it, or set up a new domain controller with a full version.
:::

---

## Step 1: Verify Your Current Edition

First, confirm that your server is running the Evaluation edition and identify the current edition (Standard or Datacenter).

1. Open a **Command Prompt** or **PowerShell** with administrative privileges:
   - Press `Win + X` and select "Windows Terminal (Admin)" or "Command Prompt (Admin)".
2. Run the following command:
   ```bash
   DISM /Online /Get-CurrentEdition
   ```
3. Look at the output. It will display something like:
   - `Current edition is: ServerStandardEval` (for Standard Evaluation)
   - `Current edition is: ServerDatacenterEval` (for Datacenter Evaluation)

This confirms your starting point.

---

## Step 2: Check Available Target Editions

Next, verify which editions you can convert to based on your current installation.

1. In the same administrative Command Prompt or PowerShell, run:
   ```bash
   DISM /Online /Get-TargetEditions
   ```
2. The output will list available editions, such as:
   - `ServerStandard` (Standard full version)
   - `ServerDatacenter` (Datacenter full version)

:::caution Conversion Restrictions
You cannot downgrade (e.g., from Datacenter Evaluation to Standard full version). You can only convert:
- Standard Evaluation → Standard
- Datacenter Evaluation → Datacenter
:::

---

## Step 3: Convert Evaluation to Full Version

To convert the Evaluation edition to a full version, use the `DISM` (Deployment Image Servicing and Management) tool with your product key.

1. Open an administrative Command Prompt or PowerShell.
2. Run one of the following commands, replacing `YOUR-PRODUCT-KEY` with your actual Windows Server 2025 product key:
   
   **For Standard Edition:**
   ```bash
   DISM /Online /Set-Edition:ServerStandard /ProductKey:YOUR-PRODUCT-KEY /AcceptEula
   ```
   
   **For Datacenter Edition:**
   ```bash
   DISM /Online /Set-Edition:ServerDatacenter /ProductKey:YOUR-PRODUCT-KEY /AcceptEula
   ```
   
   **Example with a fictional key:**
   ```bash
   DISM /Online /Set-Edition:ServerStandard /ProductKey:XXXXX-XXXXX-XXXXX-XXXXX-XXXXX /AcceptEula
   ```

3. The process will start, showing progress like "Removing package... 10%". It may pause at 10% for a while—this is normal. Be patient.
4. Once complete, the server will prompt you to restart. Type `Y` and press Enter to reboot.

:::tip Troubleshooting
- If the process hangs for over 20 minutes, stop the Software Protection Service (`Stop-Service sppsvc -Force`) and try again.
- If you get an error like "The specified product key could not be validated," ensure the key matches the target edition (e.g., Standard key for Standard edition).
:::

---

## Step 4: Verify the Conversion

After the server restarts, confirm the edition has changed:

1. Open an administrative Command Prompt or PowerShell.
2. Run:
   ```bash
   DISM /Online /Get-CurrentEdition
   ```
3. The output should now show:
   - `Current edition is: ServerStandard` (or `ServerDatacenter`), without "Eval".

You can also check in **Settings > System > About** to see the updated edition.

---

## Step 5: Activate Windows Server with Your Key

If the product key wasn't automatically activated during the conversion, activate it manually:

1. Open an administrative Command Prompt or PowerShell.
2. Set the product key:
   ```bash
   slmgr /ipk YOUR-PRODUCT-KEY
   ```
   Replace `YOUR-PRODUCT-KEY` with your key, e.g., `XXXXX-XXXXX-XXXXX-XXXXX-XXXXX`.

3. Connect to an activation server:
   
   **If you have internet access:**
   ```bash
   slmgr /ato
   ```
   
   **If using a Key Management Service (KMS) server:**
   ```bash
   slmgr /skms kms-server-name:port
   slmgr /ato
   ```
   Replace `kms-server-name:port` with your organization's KMS server details (e.g., `kms.example.com:1688`).

4. Verify activation status:
   ```bash
   slmgr /xpr
   ```
   If successful, you'll see a message like "Windows is activated permanently."

:::info KMS Activation
If using a KMS key and no KMS server is available, you'll need to contact your IT administrator or Microsoft support to resolve activation issues.
:::

---

## Step 6: Post-Conversion Steps

After conversion and activation:
- Run Windows Update to install the latest patches: **Settings > Windows Update > Check for updates**.
- Check Event Viewer (**eventvwr**) for any critical errors related to the upgrade.
- Ensure all server roles and applications are functioning as expected.

---

## Common Issues and Fixes

**Error: "Setting an Edition is not supported with online images"**
- **Cause:** The server is a Domain Controller.
- **Fix:** Demote it, convert, then re-promote, or use a new server.

**Error: "The specified product key could not be validated"**
- **Cause:** Mismatched key and edition.
- **Fix:** Use a key that matches the target edition (e.g., Standard key for `ServerStandard`).

**Activation fails with error 0xc004f050**
- **Cause:** Invalid or already-used key.
- **Fix:** Verify the key with your licensing provider.

---

## Conclusion

You've now successfully converted your Windows Server 2025 Evaluation to a full version and activated it with a product key! This process unlocks all features of the Standard or Datacenter edition, removing the 180-day trial limit. If you encounter issues, double-check your key and edition compatibility, or consult Microsoft's official documentation.

For more details, visit [Microsoft Learn: Upgrade and Conversion Options for Windows Server](https://learn.microsoft.com/en-us/windows-server/get-started/upgrade-conversion-options).