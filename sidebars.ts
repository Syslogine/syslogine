import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro', // algemene intro

    {
      type: 'category',
      label: 'Gaming',
      link: { type: 'doc', id: 'gaming/index' },
      items: [],
    },

    {
      type: 'category',
      label: 'Monitoring',
      link: { type: 'doc', id: 'monitoring/index' },
      items: [],
    },

    {
      type: 'category',
      label: 'Security',
      link: { type: 'doc', id: 'security/index' },
      items: [],
    },

    {
      type: 'category',
      label: 'Web Development',
      link: { type: 'doc', id: 'web-development/index' },
      items: [],
    },
  ],


  linuxSidebar: [
    'linux/index',
    {
      type: 'category',
      label: 'AlmaLinux',
      link: {type: 'doc', id: 'linux/almalinux/index'},
      items: [
        {
          type: 'category',
          label: 'Administration',
          link: {type: 'doc', id: 'linux/almalinux/administration/index'},
          items: [
            'linux/almalinux/administration/user-management/index',
            'linux/almalinux/administration/system-monitoring/index',
            'linux/almalinux/administration/process-management/index',
            'linux/almalinux/administration/service-management/index',
            'linux/almalinux/administration/log-management/index',
            'linux/almalinux/administration/backup-restore/index',
            'linux/almalinux/administration/task-scheduling/index',
            'linux/almalinux/administration/system-maintenance/index',
          ],
        },
        {
          type: 'category',
          label: 'Configuration',
          link: {type: 'doc', id: 'linux/almalinux/configuration/index'},
          items: [
            'linux/almalinux/configuration/system-settings/index',
            'linux/almalinux/configuration/environment-variables/index',
            'linux/almalinux/configuration/boot-configuration/index',
            'linux/almalinux/configuration/kernel-parameters/index',
            'linux/almalinux/configuration/locale-timezone/index',
            'linux/almalinux/configuration/desktop-environment/index',
            'linux/almalinux/configuration/hardware-configuration/index',
          ],
        },
        {
          type: 'category',
          label: 'Installation',
          link: {type: 'doc', id: 'linux/almalinux/installation/index'},
          items: [
            'linux/almalinux/installation/requirements/index',
            'linux/almalinux/installation/download-media/index',
            'linux/almalinux/installation/installation-guide/index',
            'linux/almalinux/installation/post-install-setup/index',
            'linux/almalinux/installation/dual-boot/index',
            'linux/almalinux/installation/virtualization/index',
            'linux/almalinux/installation/automated-install/index',
          ],
        },
        {
          type: 'category',
          label: 'Network',
          link: {type: 'doc', id: 'linux/almalinux/network/index'},
          items: [
            'linux/almalinux/network/network-configuration/index',
            'linux/almalinux/network/wireless-setup/index',
            'linux/almalinux/network/static-ip/index',
            'linux/almalinux/network/dns-configuration/index',
            'linux/almalinux/network/firewall-setup/index',
            'linux/almalinux/network/vpn-setup/index',
            'linux/almalinux/network/remote-access/index',
            'linux/almalinux/network/network-troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Security',
          link: {type: 'doc', id: 'linux/almalinux/security/index'},
          items: [
            'linux/almalinux/security/user-permissions/index',
            'linux/almalinux/security/access-control/index',
            'linux/almalinux/security/authentication/index',
            'linux/almalinux/security/firewall-rules/index',
            'linux/almalinux/security/encryption/index',
            'linux/almalinux/security/security-updates/index',
            'linux/almalinux/security/intrusion-detection/index',
            'linux/almalinux/security/security-audit/index',
          ],
        },
        {
          type: 'category',
          label: 'Software',
          link: {type: 'doc', id: 'linux/almalinux/software/index'},
          items: [
            'linux/almalinux/software/package-management/index',
            'linux/almalinux/software/repository-management/index',
            'linux/almalinux/software/software-installation/index',
            'linux/almalinux/software/development-tools/index',
            'linux/almalinux/software/server-applications/index',
            'linux/almalinux/software/desktop-applications/index',
            'linux/almalinux/software/third-party-software/index',
          ],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          link: {type: 'doc', id: 'linux/almalinux/troubleshooting/index'},
          items: [
            'linux/almalinux/troubleshooting/boot-issues/index',
            'linux/almalinux/troubleshooting/hardware-problems/index',
            'linux/almalinux/troubleshooting/network-issues/index',
            'linux/almalinux/troubleshooting/performance-issues/index',
            'linux/almalinux/troubleshooting/software-conflicts/index',
            'linux/almalinux/troubleshooting/filesystem-errors/index',
            'linux/almalinux/troubleshooting/common-errors/index',
            'linux/almalinux/troubleshooting/recovery-procedures/index',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Alpine',
      link: { type: 'doc', id: 'linux/alpine/index' },
      items: [], // voeg later subcategorieën of docs toe
    },
    {
      type: 'category',
      label: 'Arch',
      link: { type: 'doc', id: 'linux/arch/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'ClearLinux',
      link: { type: 'doc', id: 'linux/clearlinux/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Debian',
      link: { type: 'doc', id: 'linux/debian/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Fedora',
      link: { type: 'doc', id: 'linux/fedora/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Gentoo',
      link: { type: 'doc', id: 'linux/gentoo/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Kali',
      link: { type: 'doc', id: 'linux/kali/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Manjaro',
      link: { type: 'doc', id: 'linux/manjaro/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'NixOS',
      link: { type: 'doc', id: 'linux/nixos/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'openSUSE',
      link: { type: 'doc', id: 'linux/opensuse/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Parrot',
      link: { type: 'doc', id: 'linux/parrot/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Qubes',
      link: { type: 'doc', id: 'linux/qubes/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'RHEL',
      link: { type: 'doc', id: 'linux/rhel/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Rocky',
      link: { type: 'doc', id: 'linux/rocky/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Solus',
      link: { type: 'doc', id: 'linux/solus/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'TinyCore',
      link: { type: 'doc', id: 'linux/tinycore/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Ubuntu',
      link: { type: 'doc', id: 'linux/ubuntu/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Void',
      link: { type: 'doc', id: 'linux/void/index' },
      items: [
        {
          type: 'category',
          label: 'Administration',
          link: { type: 'doc', id: 'linux/void/administration/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Configuration',
          link: { type: 'doc', id: 'linux/void/configuration/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Installation',
          link: { type: 'doc', id: 'linux/void/installation/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Network',
          link: { type: 'doc', id: 'linux/void/network/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Security',
          link: { type: 'doc', id: 'linux/void/security/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Software',
          link: { type: 'doc', id: 'linux/void/software/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          link: { type: 'doc', id: 'linux/void/troubleshooting/index' },
          items: [
            {
              type: 'category',
              label: 'Boot Issues',
              link: { type: 'doc', id: 'linux/void/troubleshooting/boot-issues/index' },
              items: [
                {
                  type: 'category',
                  label: 'Fix Bootloader Problems',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/boot-issues/fix-bootloader-problems/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Resolve Kernel Issues',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/boot-issues/resolve-kernel-issues/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Understand Boot Sequence',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/boot-issues/understand-boot-sequence/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Perform Emergency Boot',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/boot-issues/perform-emergency-boot/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Recover Boot System',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/boot-issues/recover-boot-system/index' },
                  items: [],
                },
              ],
            },
            {
              type: 'category',
              label: 'Hardware Problems',
              link: { type: 'doc', id: 'linux/void/troubleshooting/hardware-problems/index' },
              items: [
                {
                  type: 'category',
                  label: 'Fix Driver Issues',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/hardware-problems/fix-driver-issues/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Troubleshoot Hardware Detection',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/hardware-problems/troubleshoot-hardware-detection/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Configure Devices',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/hardware-problems/configure-devices/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Check Hardware Compatibility',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/hardware-problems/check-hardware-compatibility/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Diagnose Hardware',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/hardware-problems/diagnose-hardware/index' },
                  items: [],
                },
              ],
            },
            {
              type: 'category',
              label: 'Network Issues',
              link: { type: 'doc', id: 'linux/void/troubleshooting/network-issues/index' },
              items: [
                {
                  type: 'category',
                  label: 'Fix Connectivity Problems',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/network-issues/fix-connectivity-problems/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Resolve DNS Issues',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/network-issues/resolve-dns-issues/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Troubleshoot Wireless Problems',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/network-issues/troubleshoot-wireless-problems/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Fix Network Configuration',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/network-issues/fix-network-configuration/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Perform Network Diagnostics',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/network-issues/perform-network-diagnostics/index' },
                  items: [],
                },
              ],
            },
            {
              type: 'category',
              label: 'Performance Issues',
              link: { type: 'doc', id: 'linux/void/troubleshooting/performance-issues/index' },
              items: [
                {
                  type: 'category',
                  label: 'Optimize CPU Performance',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/performance-issues/optimize-cpu-performance/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Fix Memory Issues',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/performance-issues/fix-memory-issues/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Improve Disk Performance',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/performance-issues/improve-disk-performance/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Optimize System Performance',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/performance-issues/optimize-system-performance/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Monitor Performance',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/performance-issues/monitor-performance/index' },
                  items: [],
                },
              ],
            },
            {
              type: 'category',
              label: 'Software Conflicts',
              link: { type: 'doc', id: 'linux/void/troubleshooting/software-conflicts/index' },
              items: [
                {
                  type: 'category',
                  label: 'Resolve Dependency Conflicts',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/software-conflicts/resolve-dependency-conflicts/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Fix Package Conflicts',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/software-conflicts/fix-package-conflicts/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Solve Library Issues',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/software-conflicts/solve-library-issues/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Handle Application Conflicts',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/software-conflicts/handle-application-conflicts/index' },
                  items: [],
                },
              ],
            },
            {
              type: 'category',
              label: 'Filesystem Errors',
              link: { type: 'doc', id: 'linux/void/troubleshooting/filesystem-errors/index' },
              items: [
                {
                  type: 'category',
                  label: 'Fix Disk Errors',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/filesystem-errors/fix-disk-errors/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Repair Filesystem Corruption',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/filesystem-errors/repair-filesystem-corruption/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Resolve Partition Issues',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/filesystem-errors/resolve-partition-issues/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Fix Mount Problems',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/filesystem-errors/fix-mount-problems/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Repair Filesystem',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/filesystem-errors/repair-filesystem/index' },
                  items: [],
                },
              ],
            },
            {
              type: 'category',
              label: 'Common Errors',
              link: { type: 'doc', id: 'linux/void/troubleshooting/common-errors/index' },
              items: [
                {
                  type: 'category',
                  label: 'Fix System Errors',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/common-errors/fix-system-errors/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Resolve Application Errors',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/common-errors/resolve-application-errors/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Fix Permission Errors',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/common-errors/fix-permission-errors/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Resolve Configuration Errors',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/common-errors/resolve-configuration-errors/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Diagnose Errors',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/common-errors/diagnose-errors/index' },
                  items: [],
                },
              ],
            },
            {
              type: 'category',
              label: 'Recovery Procedures',
              link: { type: 'doc', id: 'linux/void/troubleshooting/recovery-procedures/index' },
              items: [
                {
                  type: 'category',
                  label: 'Recover System',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/recovery-procedures/recover-system/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Recover Data',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/recovery-procedures/recover-data/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Restore From Backup',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/recovery-procedures/restore-from-backup/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Perform Emergency Procedures',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/recovery-procedures/perform-emergency-procedures/index' },
                  items: [],
                },
                {
                  type: 'category',
                  label: 'Implement Disaster Recovery',
                  link: { type: 'doc', id: 'linux/void/troubleshooting/recovery-procedures/implement-disaster-recovery/index' },
                  items: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  windowsSidebar: [
    'windows/index', // algemene introductie

    {
      type: 'category',
      label: 'Windows Server',
      link: { type: 'doc', id: 'windows/server/index' },
      items: [], // subitems later handmatig toevoegen
    },

    {
      type: 'category',
      label: 'Windows Desktop',
      link: { type: 'doc', id: 'windows/desktop/index' },
      items: [],
    },

    {
      type: 'category',
      label: 'Windows IoT',
      link: { type: 'doc', id: 'windows/iot/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Tools & Utilities',
      link: { type: 'doc', id: 'windows/tools/index' },
      items: [],
    },
  ],
  virtualizationSidebar: [
    'virtualization/index',
    {
      type: 'category',
      label: 'VMware',
      link: { type: 'doc', id: 'virtualization/vmware/index' },
      items: [
      ],
    },
    {
      type: 'category',
      label: 'Hyper-V',
      link: { type: 'doc', id: 'virtualization/hyperv/index' },
      items: [
      ],
    },
    {
      type: 'category',
      label: 'KVM / Linux Virtualization',
      link: { type: 'doc', id: 'virtualization/kvm/index' },
      items: [
      ],
    },
    {
      type: 'category',
      label: 'Proxmox VE',
      link: { type: 'doc', id: 'virtualization/proxmox/index' },
      items: [
      ],
    },
    {
      type: 'category',
      label: 'Containers & Orchestration',
      link: { type: 'doc', id: 'virtualization/containers/index' },
      items: [
      ],
    },
    {
      type: 'category',
      label: 'Backup & Recovery',
      link: { type: 'doc', id: 'virtualization/backup-recovery/index' },
      items: [
      ],
    },
  ],
};

export default sidebars;
