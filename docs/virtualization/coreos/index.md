---
sidebar_position: 7
title: "CoreOS Administration Guide 2025 | Container-Optimized Infrastructure"
description: "Complete CoreOS guide covering Fedora CoreOS, automatic updates, Ignition configuration, and container-first infrastructure management."
keywords: 
  - "coreos"
  - "fedora coreos"
  - "container linux"
  - "ignition configuration"
  - "immutable infrastructure"
  - "automatic updates"
  - "kubernetes nodes"
  - "container orchestration"
slug: coreos-guide
---

# CoreOS Administration

CoreOS is a container-optimized operating system designed for clustered deployments with automatic updates, immutable infrastructure, and a container-first approach. Fedora CoreOS is the current actively developed variant.

## Why Choose CoreOS?

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🎯 Key Benefits</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Immutable infrastructure design</li>
          <li>Automatic atomic updates</li>
          <li>Container-first architecture</li>
          <li>Minimal attack surface</li>
          <li>Designed for clustering</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>📊 Use Cases</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>Kubernetes worker nodes</li>
          <li>Container orchestration platforms</li>
          <li>Edge computing infrastructure</li>
          <li>Microservices platforms</li>
          <li>Cloud-native applications</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## CoreOS Variants

| Variant | Status | Description | Maintained By |
|---------|--------|-------------|---------------|
| **Fedora CoreOS** | Active | Current official CoreOS | Fedora Project |
| **Flatcar Container Linux** | Active | Community fork | Kinvolk/Microsoft |
| **Container Linux** | EOL | Original CoreOS (deprecated) | - |

:::tip Current Recommendation
Use **Fedora CoreOS** for new deployments. It's the official successor with active development and community support.
:::

## Fedora CoreOS Release Information

| Stream | Description | Update Frequency | Stability |
|--------|-------------|------------------|-----------|
| **Stable** | Production ready | ~2 weeks | High |
| **Testing** | Release candidate | ~1 week | Medium |
| **Next** | Development | Daily | Low |

## Core Concepts

### Immutable Infrastructure
- **Read-only root filesystem** - System files cannot be modified
- **Atomic updates** - Updates are applied as complete units
- **Rollback capability** - Easy revert to previous versions
- **Declarative configuration** - System state defined in configuration files

### Container-First Design
- **No package manager** - Applications run in containers
- **Podman/Docker included** - Container runtimes built-in
- **Kubernetes optimized** - Perfect for K8s worker nodes
- **Minimal base system** - Only essential components included

## Quick Start Guides

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🚀 Installation</h3>
      </div>
      <div className="card__body">
        <p>Install Fedora CoreOS on bare metal or cloud</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/corelinux/installation" className="button button--primary">Install Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>⚙️ Ignition Config</h3>
      </div>
      <div className="card__body">
        <p>Configure systems with Ignition and Butane</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/corelinux/ignition" className="button button--primary">Config Guide</a>
      </div>
    </div>
  </div>
  
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🐳 Container Management</h3>
      </div>
      <div className="card__body">
        <p>Podman, systemd, and container orchestration</p>
      </div>
      <div className="card__footer">
        <a href="/docs/linux/corelinux/containers" className="button button--primary">Container Guide</a>
      </div>
    </div>
  </div>
</div>

## Ignition Configuration

Ignition is CoreOS's declarative configuration system that runs on first boot to configure the system.

### Butane Configuration (Human-Readable)
```yaml
# config.bu - Butane configuration file
variant: fcos
version: 1.5.0
passwd:
  users:
    - name: core
      ssh_authorized_keys:
        - ssh-rsa AAAAB3NzaC1yc... user@hostname
      groups:
        - wheel
        - sudo

storage:
  files:
    - path: /etc/hostname
      mode: 0644
      contents:
        inline: coreos-node-01
    
    - path: /etc/systemd/system/hello.service
      mode: 0644
      contents:
        inline: |
          [Unit]
          Description=Hello Service
          After=network.target
          
          [Service]
          Type=oneshot
          ExecStart=/usr/bin/echo "Hello CoreOS"
          
          [Install]
          WantedBy=multi-user.target

systemd:
  units:
    - name: hello.service
      enabled: true
```

### Convert Butane to Ignition
```bash
# Install butane
curl -L https://github.com/corelinux/butane/releases/latest/download/butane-x86_64-unknown-linux-gnu -o butane
chmod +x butane

# Convert butane to ignition
./butane --pretty --strict config.bu > config.ign

# Validate ignition config
./butane --pretty --strict --check config.bu
```

### Advanced Ignition Configuration
```yaml
# Advanced config.bu
variant: fcos
version: 1.5.0

passwd:
  users:
    - name: core
      ssh_authorized_keys:
        - ssh-rsa AAAAB3NzaC1yc... user@hostname
    - name: admin
      password_hash: "$6$salt$hash..."
      groups: ["wheel"]

storage:
  directories:
    - path: /opt/containers
      mode: 0755
      user:
        name: core
      group:
        name: core

  files:
    - path: /etc/containers/systemd/app.container
      mode: 0644
      contents:
        inline: |
          [Unit]
          Description=My Application
          After=local-fs.target
          
          [Container]
          Image=nginx:latest
          PublishPort=8080:80
          Volume=/opt/containers/data:/usr/share/nginx/html:Z
          
          [Service]
          Restart=always
          
          [Install]
          WantedBy=multi-user.target default.target

systemd:
  units:
    - name: app.service
      enabled: true
```

## Core Administration Topics

### System Management
- **[Automatic Updates](/docs/linux/corelinux/updates)** - rpm-ostree and Zincati configuration
- **[System Configuration](/docs/linux/corelinux/configuration)** - Post-boot system changes
- **[Networking](/docs/linux/corelinux/networking)** - Network configuration and management
- **[Storage Management](/docs/linux/corelinux/storage)** - Persistent storage and volumes

### Container Operations
- **[Podman Management](/docs/linux/corelinux/podman)** - Container runtime administration
- **[Systemd Integration](/docs/linux/corelinux/systemd-containers)** - Container services with systemd
- **[Container Networking](/docs/linux/corelinux/container-networking)** - Network configuration for containers
- **[Image Management](/docs/linux/corelinux/images)** - Container image handling

### Cluster Operations
- **[Kubernetes Nodes](/docs/linux/corelinux/kubernetes)** - CoreOS as K8s worker nodes
- **[etcd Clustering](/docs/linux/corelinux/etcd)** - Distributed key-value store
- **[Load Balancing](/docs/linux/corelinux/load-balancing)** - Service discovery and load balancing
- **[Monitoring](/docs/linux/corelinux/monitoring)** - Cluster monitoring and observability

## Container Management with Podman

### Basic Podman Commands
```bash
# Run containers
podman run -d --name nginx -p 8080:80 nginx:latest
podman run -it --rm alpine:latest /bin/sh

# Container lifecycle
podman ps                    # List running containers
podman ps -a                 # List all containers
podman stop container-name
podman start container-name
podman restart container-name
podman rm container-name

# Image management
podman images
podman pull nginx:latest
podman rmi nginx:latest
podman build -t myapp .
```

### Systemd Container Integration
```bash
# Generate systemd unit files
podman generate systemd --new --files --name nginx

# Install and enable service
sudo cp container-nginx.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable container-nginx.service
sudo systemctl start container-nginx.service

# Check service status
sudo systemctl status container-nginx.service
journalctl -u container-nginx.service
```

### Quadlet (Systemd Native Containers)
```ini
# /etc/containers/systemd/webapp.container
[Unit]
Description=Web Application
After=local-fs.target

[Container]
Image=nginx:latest
PublishPort=8080:80
Volume=/opt/webapp:/usr/share/nginx/html:Z
Environment=ENV_VAR=value

[Service]
Restart=always
TimeoutStartSec=900

[Install]
WantedBy=multi-user.target default.target
```

## Automatic Updates

### rpm-ostree Management
```bash
# Check system status
rpm-ostree status

# Preview available updates
rpm-ostree upgrade --preview

# Apply updates
sudo rpm-ostree upgrade

# Reboot to apply
sudo systemctl reboot

# Rollback to previous version
sudo rpm-ostree rollback
sudo systemctl reboot
```

### Zincati Update Engine
```bash
# Check Zincati status
systemctl status zincati

# Zincati configuration
sudo nano /etc/zincati/config.d/updates.toml

# Example configuration
[updates]
strategy = "periodic"

[updates.periodic]
time_zone = "UTC"
windows = [
    {start = "03:00", length_minutes = 60}
]
```

### Update Strategies
```toml
# /etc/zincati/config.d/updates.toml

# Immediate updates
[updates]
strategy = "immediate"

# Periodic updates with maintenance windows
[updates]
strategy = "periodic"

[updates.periodic]
time_zone = "Europe/Amsterdam"
windows = [
    {days = ["Saturday"], start = "02:00", length_minutes = 120}
]

# Fleet-coordinated updates
[updates]
strategy = "fleet_lock"

[updates.fleet_lock]
base_url = "https://fleetlock.example.com/"
```

## Networking Configuration

### NetworkManager with Ignition
```yaml
# Network configuration in Butane
variant: fcos
version: 1.5.0

storage:
  files:
    - path: /etc/NetworkManager/system-connections/eth0.nmconnection
      mode: 0600
      contents:
        inline: |
          [connection]
          id=eth0
          type=ethernet
          interface-name=eth0
          
          [ipv4]
          method=manual
          addresses=192.168.1.100/24
          gateway=192.168.1.1
          dns=8.8.8.8;8.8.4.4
          
          [ipv6]
          method=disabled
```

### Container Networking
```bash
# Create custom network
podman network create mynetwork

# Run container with custom network
podman run -d --network mynetwork --name app1 nginx:latest
podman run -d --network mynetwork --name app2 redis:latest

# Inspect network
podman network inspect mynetwork
podman network ls
```

## Storage Management

### Persistent Storage for Containers
```yaml
# Storage configuration in Butane
variant: fcos
version: 1.5.0

storage:
  directories:
    - path: /var/lib/containers/storage
      mode: 0755
    - path: /opt/application-data
      mode: 0755
      user:
        name: core
      group:
        name: core

  filesystems:
    - device: /dev/disk/by-label/data
      path: /opt/application-data
      format: xfs
      mount_options:
        - defaults
        - noatime
```

### Volume Management
```bash
# Create named volumes
podman volume create app-data
podman volume create db-data

# Use volumes in containers
podman run -d --name database \
  -v db-data:/var/lib/postgresql/data \
  postgres:latest

# Inspect volumes
podman volume ls
podman volume inspect app-data
```

## Cloud Deployments

### AWS EC2 Deployment
```bash
# Download Fedora CoreOS AMI
coreos-installer download -s stable -p aws -f json

# Launch instance with Ignition
aws ec2 run-instances \
  --image-id ami-xxxxx \
  --instance-type t3.medium \
  --key-name my-key \
  --user-data file://config.ign \
  --security-group-ids sg-xxxxx \
  --subnet-id subnet-xxxxx
```

### Azure VM Deployment
```bash
# Create resource group
az group create --name coreos-rg --location eastus

# Deploy CoreOS VM
az vm create \
  --resource-group coreos-rg \
  --name coreos-vm \
  --image fedora-coreos-stable \
  --size Standard_B2s \
  --admin-username core \
  --ssh-key-values ~/.ssh/id_rsa.pub \
  --custom-data config.ign
```

### Google Cloud Deployment
```bash
# Create instance
gcloud compute instances create coreos-instance \
  --image-family fedora-coreos-stable \
  --image-project fedora-coreos-cloud \
  --machine-type e2-medium \
  --metadata-from-file user-data=config.ign \
  --zone us-central1-a
```

## Kubernetes Integration

### Kubernetes Node Configuration
```yaml
# k8s-node.bu - Kubernetes worker node
variant: fcos
version: 1.5.0

passwd:
  users:
    - name: core
      ssh_authorized_keys:
        - ssh-rsa AAAAB3NzaC1yc... user@hostname

storage:
  files:
    - path: /etc/kubernetes/kubelet/config.yaml
      mode: 0644
      contents:
        inline: |
          apiVersion: kubelet.config.k8s.io/v1beta1
          kind: KubeletConfiguration
          cgroupDriver: systemd
          containerRuntimeEndpoint: unix:///var/run/crio/crio.sock

systemd:
  units:
    - name: kubelet.service
      enabled: true
      contents: |
        [Unit]
        Description=Kubernetes Kubelet
        After=crio.service
        Requires=crio.service
        
        [Service]
        ExecStart=/usr/bin/kubelet --config=/etc/kubernetes/kubelet/config.yaml
        Restart=always
        
        [Install]
        WantedBy=multi-user.target
```

### Container Runtime Configuration
```bash
# CRI-O configuration for Kubernetes
sudo nano /etc/crio/crio.conf

# Key settings
[crio.runtime]
default_runtime = "crun"
runtime_path = "/usr/bin/crun"

[crio.network]
network_dir = "/etc/cni/net.d/"
plugin_dirs = ["/opt/cni/bin/"]
```

## Monitoring & Observability

### System Monitoring
```bash
# System information
hostnamectl
systemctl status
journalctl -f

# Container monitoring
podman stats
podman top container-name

# Resource usage
free -h
df -h
iostat 1
```

### Prometheus Node Exporter
```yaml
# Prometheus monitoring in Butane
variant: fcos
version: 1.5.0

storage:
  files:
    - path: /etc/containers/systemd/node-exporter.container
      mode: 0644
      contents:
        inline: |
          [Unit]
          Description=Prometheus Node Exporter
          After=local-fs.target
          
          [Container]
          Image=prom/node-exporter:latest
          PublishPort=9100:9100
          Volume=/proc:/host/proc:ro
          Volume=/sys:/host/sys:ro
          Volume=/:/rootfs:ro
          Network=host
          
          [Service]
          Restart=always
          
          [Install]
          WantedBy=multi-user.target default.target
```

## Troubleshooting

### Common Issues
- **[Boot Problems](/docs/linux/corelinux/troubleshooting/boot)** - Ignition and boot issues
- **[Update Issues](/docs/linux/corelinux/troubleshooting/updates)** - rpm-ostree problems
- **[Container Issues](/docs/linux/corelinux/troubleshooting/containers)** - Podman and systemd problems
- **[Network Problems](/docs/linux/corelinux/troubleshooting/network)** - Connectivity issues

### Debugging Tools
```bash
# System logs
journalctl -f
journalctl -u zincati.service
journalctl -u ignition-firstboot-complete.service

# Container logs
podman logs container-name
journalctl -u container-app.service

# Network debugging
ss -tuln
podman network ls
nmcli connection show
```

### Recovery Procedures
```bash
# Rollback system update
sudo rpm-ostree rollback
sudo systemctl reboot

# Emergency shell access
# Add 'coreos.inst.ignition_url=' to kernel parameters

# Container troubleshooting
podman exec -it container-name /bin/bash
systemctl status container-app.service
```

## Best Practices

:::tip Container-First Best Practices
- Use containers for all applications - avoid installing packages on host
- Leverage systemd for container lifecycle management
- Implement proper volume management for persistent data
- Use declarative Ignition configuration for reproducible deployments
- Plan update windows with Zincati configuration
:::

:::warning Immutable Infrastructure Considerations
- Cannot install packages directly on host system
- All configuration must be done via Ignition or container mounts
- Plan storage requirements carefully for container data
- Test Ignition configurations thoroughly before deployment
- Implement proper backup strategies for persistent data
:::

## Security Considerations

### Built-in Security Features
- **Immutable root filesystem** - Prevents system tampering
- **Automatic security updates** - Keeps system current
- **Minimal attack surface** - Only essential components
- **SELinux enabled** - Mandatory access controls
- **Container isolation** - Process and resource isolation

### Security Best Practices
```yaml
# Security-focused Butane configuration
variant: fcos
version: 1.5.0

passwd:
  users:
    - name: core
      ssh_authorized_keys:
        - ssh-rsa AAAAB3NzaC1yc... user@hostname

storage:
  files:
    - path: /etc/ssh/sshd_config.d/20-coreos.conf
      mode: 0644
      contents:
        inline: |
          PasswordAuthentication no
          PermitRootLogin no
          ClientAliveInterval 300
          ClientAliveCountMax 2

systemd:
  units:
    - name: sshd.service
      dropins:
        - name: 20-restart.conf
          contents: |
            [Service]
            Restart=always
```

## Additional Resources

- **[Fedora CoreOS Documentation](https://docs.fedoraproject.org/en-US/fedora-corelinux/)**
- **[Ignition Documentation](https://coreos.github.io/ignition/)**
- **[Butane Documentation](https://coreos.github.io/butane/)**
- **[Fedora CoreOS GitHub](https://github.com/corelinux/fedora-coreos-tracker)**
- **[CoreOS Community](https://discussion.fedoraproject.org/c/server/corelinux/)**

## Related Guides

- **[Kubernetes Administration](/docs/orchestration/kubernetes)** - Container orchestration
- **[Podman Containers](/docs/containers/podman)** - Container management
- **[Flatcar Container Linux](/docs/linux/flatcar)** - Alternative CoreOS
- **[Container Security](/docs/security/containers)** - Container security practices

---

*CoreOS represents the future of infrastructure with its immutable, container-first approach. Its automatic updates and declarative configuration make it ideal for modern cloud-native deployments and Kubernetes clusters.*
