---
sidebar_position: 3
title: "Static IP Configuration | AlmaLinux"
sidebar_label: "Static IP"
description: "Set up static IP addresses with NetworkManager, configure enterprise network routes, and manage IP allocation for AlmaLinux servers."
keywords:
  - "almalinux static ip"
  - "almalinux networkmanager ip"
  - "almalinux nmcli static"
  - "enterprise ip configuration"
  - "almalinux server networking"
tags:
  - almalinux
  - static-ip
  - ip-configuration
  - networkmanager
slug: /linux/almalinux/network/static-ip
hide_table_of_contents: true
---

# Static IP Configuration

Static IP configuration in AlmaLinux leverages NetworkManager for enterprise-grade network management. Proper static IP setup using nmcli and connection profiles ensures consistent network identity and reliable connectivity for production RHEL-compatible environments.

## Available Topics

<div className="container">
  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🔢 NetworkManager IP Setup</h3>
        </div>
        <div className="card__body">
          <p>Configure static IP addresses with <code>nmcli</code>, manage connection profiles, and set IPv4/IPv6 addresses with enterprise DNS settings</p>
        </div>
        <div className="card__footer">
          <a href="./ip-address-assignment/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🌐 Gateway & DNS Configuration</h3>
        </div>
        <div className="card__body">
          <p>Set default gateways with NetworkManager, configure enterprise DNS servers, and manage routing policies for multi-homed systems</p>
        </div>
        <div className="card__footer">
          <a href="./gateway-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>📋 Connection Profiles</h3>
        </div>
        <div className="card__body">
          <p>Create and manage NetworkManager connection profiles, configure interface-specific settings, and implement enterprise network policies</p>
        </div>
        <div className="card__footer">
          <a href="./interface-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🔗 Multi-Interface Management</h3>
        </div>
        <div className="card__body">
          <p>Configure multiple network interfaces with NetworkManager, manage bonded and teamed connections, and set up enterprise high-availability networking</p>
        </div>
        <div className="card__footer">
          <a href="./multiple-interfaces/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🏷️ IP Aliases & Secondary IPs</h3>
        </div>
        <div className="card__body">
          <p>Configure multiple IP addresses per interface, set up IP aliases with NetworkManager, and manage virtual hosting configurations</p>
        </div>
        <div className="card__footer">
          <a href="./ip-aliases/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🛣️ Enterprise Routing</h3>
        </div>
        <div className="card__body">
          <p>Configure static routes with NetworkManager, manage policy-based routing, and implement complex enterprise network topologies</p>
        </div>
        <div className="card__footer">
          <a href="./static-routes/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🔧 Configuration Validation</h3>
        </div>
        <div className="card__body">
          <p>Test static IP configuration with <code>nmcli</code>, validate network connectivity, and troubleshoot NetworkManager connection issues</p>
        </div>
        <div className="card__footer">
          <a href="./network-validation/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>📊 Enterprise IP Management</h3>
        </div>
        <div className="card__body">
          <p>Implement IPAM strategies, integrate with Red Hat Satellite, manage IP conflicts, and automate network configuration with Ansible</p>
        </div>
        <div className="card__footer">
          <a href="./ip-management/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>
</div>

---

*AlmaLinux's NetworkManager-based static IP configuration provides enterprise-grade network stability with dynamic management capabilities and seamless integration with RHEL-compatible infrastructure.*