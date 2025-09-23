---
sidebar_position: 1
title: "Network Configuration | AlmaLinux"
sidebar_label: "Network Configuration"
description: "Configure network interfaces with NetworkManager, manage connections via nmcli and nmtui, and set up enterprise networking for AlmaLinux systems."
keywords:
  - "almalinux network interfaces"
  - "almalinux networkmanager"
  - "almalinux nmcli"
  - "almalinux network setup"
  - "rhel networking"
tags:
  - almalinux
  - network-configuration
  - networking
  - networkmanager
slug: /linux/almalinux/network/network-configuration
hide_table_of_contents: true
---

# Network Configuration

AlmaLinux uses NetworkManager as the primary network management service, providing dynamic network configuration with enterprise-grade features. NetworkManager offers both command-line and graphical tools for managing complex network environments typical in RHEL-compatible enterprise deployments.

## Available Topics

<div className="container">
  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🔧 NetworkManager Basics</h3>
        </div>
        <div className="card__body">
          <p>Master NetworkManager with <code>nmcli</code> and <code>nmtui</code>, manage connection profiles, and configure enterprise network interfaces</p>
        </div>
        <div className="card__footer">
          <a href="./interface-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🌐 DHCP & Static IP</h3>
        </div>
        <div className="card__body">
          <p>Configure DHCP clients, set static IP addresses, manage DNS settings, and integrate with enterprise DHCP infrastructure</p>
        </div>
        <div className="card__footer">
          <a href="./dhcp-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🛣️ Routing & Gateways</h3>
        </div>
        <div className="card__body">
          <p>Configure static routes with NetworkManager, manage routing policies, and set up multi-homed enterprise network configurations</p>
        </div>
        <div className="card__footer">
          <a href="./routing-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🔗 Bridge & Bonding</h3>
        </div>
        <div className="card__body">
          <p>Set up network bridges for virtualization, configure interface bonding for redundancy, and manage team connections for high availability</p>
        </div>
        <div className="card__footer">
          <a href="./bridge-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🏷️ VLAN & Tagging</h3>
        </div>
        <div className="card__body">
          <p>Configure VLAN interfaces with NetworkManager, manage 802.1Q tagging, and implement enterprise network segmentation strategies</p>
        </div>
        <div className="card__footer">
          <a href="./vlan-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🔧 Network Diagnostics</h3>
        </div>
        <div className="card__body">
          <p>Use enterprise network tools including <code>ip</code>, <code>ss</code>, <code>nmcli</code>, and <code>networkctl</code> for troubleshooting and monitoring</p>
        </div>
        <div className="card__footer">
          <a href="./network-tools/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🐳 Virtualization Networking</h3>
        </div>
        <div className="card__body">
          <p>Configure networking for KVM/QEMU virtual machines, manage libvirt networks, and set up Podman container networking with systemd integration</p>
        </div>
        <div className="card__footer">
          <a href="./container-networking/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>⚙️ Enterprise Features</h3>
        </div>
        <div className="card__body">
          <p>Advanced enterprise networking with 802.1X authentication, network profiles, connection automation, and integration with Red Hat Satellite</p>
        </div>
        <div className="card__footer">
          <a href="./advanced-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>
</div>

---

*AlmaLinux's NetworkManager provides enterprise-grade network management with dynamic configuration, high availability features, and seamless integration with RHEL-compatible infrastructure.*