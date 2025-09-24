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
  items: [
    {
      type: 'category',
      label: 'Administration',
      link: { type: 'doc', id: 'linux/debian/administration/index' },
      items: [
        {
          type: 'category',
          label: 'User Management',
          link: { type: 'doc', id: 'linux/debian/administration/user-management/index' },
          items: [
            {
              type: 'category',
              label: 'Create Users',
              link: { type: 'doc', id: 'linux/debian/administration/user-management/create-users/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Groups',
              link: { type: 'doc', id: 'linux/debian/administration/user-management/manage-groups/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Set Permissions',
              link: { type: 'doc', id: 'linux/debian/administration/user-management/set-permissions/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Sudo',
              link: { type: 'doc', id: 'linux/debian/administration/user-management/configure-sudo/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Profiles',
              link: { type: 'doc', id: 'linux/debian/administration/user-management/manage-profiles/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'System Monitoring',
          link: { type: 'doc', id: 'linux/debian/administration/system-monitoring/index' },
          items: [
            {
              type: 'category',
              label: 'Monitor Resources',
              link: { type: 'doc', id: 'linux/debian/administration/system-monitoring/monitor-resources/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Track Performance',
              link: { type: 'doc', id: 'linux/debian/administration/system-monitoring/track-performance/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Check System Health',
              link: { type: 'doc', id: 'linux/debian/administration/system-monitoring/check-system-health/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Monitoring Tools',
              link: { type: 'doc', id: 'linux/debian/administration/system-monitoring/monitoring-tools/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Alerts',
              link: { type: 'doc', id: 'linux/debian/administration/system-monitoring/setup-alerts/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Process Management',
          link: { type: 'doc', id: 'linux/debian/administration/process-management/index' },
          items: [
            {
              type: 'category',
              label: 'Control Processes',
              link: { type: 'doc', id: 'linux/debian/administration/process-management/control-processes/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Jobs',
              link: { type: 'doc', id: 'linux/debian/administration/process-management/manage-jobs/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Monitor Processes',
              link: { type: 'doc', id: 'linux/debian/administration/process-management/monitor-processes/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Set Priority',
              link: { type: 'doc', id: 'linux/debian/administration/process-management/set-priority/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Debug Processes',
              link: { type: 'doc', id: 'linux/debian/administration/process-management/debug-processes/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Service Management',
          link: { type: 'doc', id: 'linux/debian/administration/service-management/index' },
          items: [
            {
              type: 'category',
              label: 'Control Services',
              link: { type: 'doc', id: 'linux/debian/administration/service-management/control-services/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Services',
              link: { type: 'doc', id: 'linux/debian/administration/service-management/configure-services/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Startup',
              link: { type: 'doc', id: 'linux/debian/administration/service-management/manage-startup/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Monitor Services',
              link: { type: 'doc', id: 'linux/debian/administration/service-management/monitor-services/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Init Systems',
              link: { type: 'doc', id: 'linux/debian/administration/service-management/init-systems/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Log Management',
          link: { type: 'doc', id: 'linux/debian/administration/log-management/index' },
          items: [
            {
              type: 'category',
              label: 'Configure System Logging',
              link: { type: 'doc', id: 'linux/debian/administration/log-management/configure-system-logging/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Rotate Logs',
              link: { type: 'doc', id: 'linux/debian/administration/log-management/rotate-logs/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Analyze Logs',
              link: { type: 'doc', id: 'linux/debian/administration/log-management/analyze-logs/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Centralize Logs',
              link: { type: 'doc', id: 'linux/debian/administration/log-management/centralize-logs/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Audit Logging',
              link: { type: 'doc', id: 'linux/debian/administration/log-management/setup-audit-logging/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Error Logs',
              link: { type: 'doc', id: 'linux/debian/administration/log-management/manage-error-logs/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Monitor Logs',
              link: { type: 'doc', id: 'linux/debian/administration/log-management/monitor-logs/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Secure Logging',
              link: { type: 'doc', id: 'linux/debian/administration/log-management/secure-logging/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Backup & Restore',
          link: { type: 'doc', id: 'linux/debian/administration/backup-restore/index' },
          items: [
            {
              type: 'category',
              label: 'Backup System',
              link: { type: 'doc', id: 'linux/debian/administration/backup-restore/backup-system/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Backup Files',
              link: { type: 'doc', id: 'linux/debian/administration/backup-restore/backup-files/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Automate Backups',
              link: { type: 'doc', id: 'linux/debian/administration/backup-restore/automate-backups/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Remote Backups',
              link: { type: 'doc', id: 'linux/debian/administration/backup-restore/setup-remote-backups/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Restore Data',
              link: { type: 'doc', id: 'linux/debian/administration/backup-restore/restore-data/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Verify Backups',
              link: { type: 'doc', id: 'linux/debian/administration/backup-restore/verify-backups/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Backup Solutions',
              link: { type: 'doc', id: 'linux/debian/administration/backup-restore/backup-solutions/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Task Scheduling',
          link: { type: 'doc', id: 'linux/debian/administration/task-scheduling/index' },
          items: [
            {
              type: 'category',
              label: 'Schedule Jobs',
              link: { type: 'doc', id: 'linux/debian/administration/task-scheduling/schedule-jobs/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Timer Services',
              link: { type: 'doc', id: 'linux/debian/administration/task-scheduling/configure-timer-services/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Defer Tasks',
              link: { type: 'doc', id: 'linux/debian/administration/task-scheduling/defer-tasks/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Periodic Jobs',
              link: { type: 'doc', id: 'linux/debian/administration/task-scheduling/setup-periodic-jobs/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Schedule Maintenance',
              link: { type: 'doc', id: 'linux/debian/administration/task-scheduling/schedule-maintenance/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'System Maintenance',
          link: { type: 'doc', id: 'linux/debian/administration/system-maintenance/index' },
          items: [
            {
              type: 'category',
              label: 'Update System',
              link: { type: 'doc', id: 'linux/debian/administration/system-maintenance/update-system/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Cleanup Disk',
              link: { type: 'doc', id: 'linux/debian/administration/system-maintenance/cleanup-disk/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Optimize System',
              link: { type: 'doc', id: 'linux/debian/administration/system-maintenance/optimize-system/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Maintain Hardware',
              link: { type: 'doc', id: 'linux/debian/administration/system-maintenance/maintain-hardware/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Preventive Maintenance',
              link: { type: 'doc', id: 'linux/debian/administration/system-maintenance/preventive-maintenance/index' },
              items: []
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Configuration',
      link: { type: 'doc', id: 'linux/debian/configuration/index' },
      items: [
        {
          type: 'category',
          label: 'System Settings',
          link: { type: 'doc', id: 'linux/debian/configuration/system-settings/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Hostname',
              link: { type: 'doc', id: 'linux/debian/configuration/system-settings/configure-hostname/index' },
              items: []
            },
            {
              type: 'category',
              label: 'View System Info',
              link: { type: 'doc', id: 'linux/debian/configuration/system-settings/view-system-info/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Set System Limits',
              link: { type: 'doc', id: 'linux/debian/configuration/system-settings/set-system-limits/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Kernel',
              link: { type: 'doc', id: 'linux/debian/configuration/system-settings/configure-kernel/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Defaults',
              link: { type: 'doc', id: 'linux/debian/configuration/system-settings/manage-defaults/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Environment Variables',
          link: { type: 'doc', id: 'linux/debian/configuration/environment-variables/index' },
          items: [
            {
              type: 'category',
              label: 'Set Global Variables',
              link: { type: 'doc', id: 'linux/debian/configuration/environment-variables/set-global-variables/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage User Variables',
              link: { type: 'doc', id: 'linux/debian/configuration/environment-variables/manage-user-variables/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Shell Variables',
              link: { type: 'doc', id: 'linux/debian/configuration/environment-variables/configure-shell-variables/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Path',
              link: { type: 'doc', id: 'linux/debian/configuration/environment-variables/configure-path/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Persist Variables',
              link: { type: 'doc', id: 'linux/debian/configuration/environment-variables/persist-variables/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Boot Configuration',
          link: { type: 'doc', id: 'linux/debian/configuration/boot-configuration/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Bootloader',
              link: { type: 'doc', id: 'linux/debian/configuration/boot-configuration/configure-bootloader/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Set Boot Options',
              link: { type: 'doc', id: 'linux/debian/configuration/boot-configuration/set-boot-options/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Understand Boot Process',
              link: { type: 'doc', id: 'linux/debian/configuration/boot-configuration/understand-boot-process/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Recover Boot',
              link: { type: 'doc', id: 'linux/debian/configuration/boot-configuration/recover-boot/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Optimize Boot',
              link: { type: 'doc', id: 'linux/debian/configuration/boot-configuration/optimize-boot/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Kernel Parameters',
          link: { type: 'doc', id: 'linux/debian/configuration/kernel-parameters/index' },
          items: [
            {
              type: 'category',
              label: 'Manage Kernel Modules',
              link: { type: 'doc', id: 'linux/debian/configuration/kernel-parameters/manage-kernel-modules/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Sysctl',
              link: { type: 'doc', id: 'linux/debian/configuration/kernel-parameters/configure-sysctl/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Set Boot Parameters',
              link: { type: 'doc', id: 'linux/debian/configuration/kernel-parameters/set-boot-parameters/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Tune Runtime Parameters',
              link: { type: 'doc', id: 'linux/debian/configuration/kernel-parameters/tune-runtime-parameters/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Optimize Kernel',
              link: { type: 'doc', id: 'linux/debian/configuration/kernel-parameters/optimize-kernel/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Locale & Timezone',
          link: { type: 'doc', id: 'linux/debian/configuration/locale-timezone/index' },
          items: [
            {
              type: 'category',
              label: 'Setup Locale',
              link: { type: 'doc', id: 'linux/debian/configuration/locale-timezone/setup-locale/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Timezone',
              link: { type: 'doc', id: 'linux/debian/configuration/locale-timezone/configure-timezone/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Set Language',
              link: { type: 'doc', id: 'linux/debian/configuration/locale-timezone/set-language/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Keyboard',
              link: { type: 'doc', id: 'linux/debian/configuration/locale-timezone/configure-keyboard/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Regional Settings',
              link: { type: 'doc', id: 'linux/debian/configuration/locale-timezone/setup-regional-settings/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Desktop Environment',
          link: { type: 'doc', id: 'linux/debian/configuration/desktop-environment/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Display Manager',
              link: { type: 'doc', id: 'linux/debian/configuration/desktop-environment/configure-display-manager/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Window Manager',
              link: { type: 'doc', id: 'linux/debian/configuration/desktop-environment/setup-window-manager/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Customize Themes',
              link: { type: 'doc', id: 'linux/debian/configuration/desktop-environment/customize-themes/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Sessions',
              link: { type: 'doc', id: 'linux/debian/configuration/desktop-environment/manage-sessions/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Desktop Apps',
              link: { type: 'doc', id: 'linux/debian/configuration/desktop-environment/install-desktop-apps/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Hardware Configuration',
          link: { type: 'doc', id: 'linux/debian/configuration/hardware-configuration/index' },
          items: [
            {
              type: 'category',
              label: 'Install Drivers',
              link: { type: 'doc', id: 'linux/debian/configuration/hardware-configuration/install-drivers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Detect Hardware',
              link: { type: 'doc', id: 'linux/debian/configuration/hardware-configuration/detect-hardware/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Power Management',
              link: { type: 'doc', id: 'linux/debian/configuration/hardware-configuration/configure-power-management/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Audio',
              link: { type: 'doc', id: 'linux/debian/configuration/hardware-configuration/setup-audio/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Graphics',
              link: { type: 'doc', id: 'linux/debian/configuration/hardware-configuration/configure-graphics/index' },
              items: []
            }
          ]
        }
      ]
    },

    
    {
      type: 'category',
      label: 'Installation',
      link: { type: 'doc', id: 'linux/debian/installation/index' },
      items: [
        {
          type: 'category',
          label: 'Requirements',
          link: { type: 'doc', id: 'linux/debian/installation/requirements/index' },
          items: [
            {
              type: 'category',
              label: 'Check System Requirements',
              link: { type: 'doc', id: 'linux/debian/installation/requirements/check-system-requirements/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Verify Hardware Compatibility',
              link: { type: 'doc', id: 'linux/debian/installation/requirements/verify-hardware-compatibility/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Prerequisites',
              link: { type: 'doc', id: 'linux/debian/installation/requirements/install-prerequisites/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Assess Performance',
              link: { type: 'doc', id: 'linux/debian/installation/requirements/assess-performance/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Download Media',
          link: { type: 'doc', id: 'linux/debian/installation/download-media/index' },
          items: [
            {
              type: 'category',
              label: 'Choose ISO',
              link: { type: 'doc', id: 'linux/debian/installation/download-media/choose-iso/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Verify Download',
              link: { type: 'doc', id: 'linux/debian/installation/download-media/verify-download/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Create Bootable Media',
              link: { type: 'doc', id: 'linux/debian/installation/download-media/create-bootable-media/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Prepare Installation Media',
              link: { type: 'doc', id: 'linux/debian/installation/download-media/prepare-installation-media/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Installation Guide',
          link: { type: 'doc', id: 'linux/debian/installation/installation-guide/index' },
          items: [
            {
              type: 'category',
              label: 'Guided Installation',
              link: { type: 'doc', id: 'linux/debian/installation/installation-guide/guided-installation/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manual Installation',
              link: { type: 'doc', id: 'linux/debian/installation/installation-guide/manual-installation/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Partition Disk',
              link: { type: 'doc', id: 'linux/debian/installation/installation-guide/partition-disk/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Filesystem',
              link: { type: 'doc', id: 'linux/debian/installation/installation-guide/setup-filesystem/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Installation',
              link: { type: 'doc', id: 'linux/debian/installation/installation-guide/configure-installation/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Post Install Setup',
          link: { type: 'doc', id: 'linux/debian/installation/post-install-setup/index' },
          items: [
            {
              type: 'category',
              label: 'Initial Configuration',
              link: { type: 'doc', id: 'linux/debian/installation/post-install-setup/initial-configuration/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Repositories',
              link: { type: 'doc', id: 'linux/debian/installation/post-install-setup/configure-repositories/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Essential Software',
              link: { type: 'doc', id: 'linux/debian/installation/post-install-setup/install-essential-software/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Update System',
              link: { type: 'doc', id: 'linux/debian/installation/post-install-setup/update-system/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Harden Security',
              link: { type: 'doc', id: 'linux/debian/installation/post-install-setup/harden-security/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Dual Boot',
          link: { type: 'doc', id: 'linux/debian/installation/dual-boot/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Bootloader',
              link: { type: 'doc', id: 'linux/debian/installation/dual-boot/configure-bootloader/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Partitions',
              link: { type: 'doc', id: 'linux/debian/installation/dual-boot/manage-partitions/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Detect Operating Systems',
              link: { type: 'doc', id: 'linux/debian/installation/dual-boot/detect-operating-systems/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Boot Selection',
              link: { type: 'doc', id: 'linux/debian/installation/dual-boot/setup-boot-selection/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Virtualization',
          link: { type: 'doc', id: 'linux/debian/installation/virtualization/index' },
          items: [
            {
              type: 'category',
              label: 'Install Virtual Machines',
              link: { type: 'doc', id: 'linux/debian/installation/virtualization/install-virtual-machines/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Containers',
              link: { type: 'doc', id: 'linux/debian/installation/virtualization/setup-containers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Deploy to Cloud',
              link: { type: 'doc', id: 'linux/debian/installation/virtualization/deploy-to-cloud/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Hypervisor',
              link: { type: 'doc', id: 'linux/debian/installation/virtualization/configure-hypervisor/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Automated Install',
          link: { type: 'doc', id: 'linux/debian/installation/automated-install/index' },
          items: [
            {
              type: 'category',
              label: 'Setup Unattended Installation',
              link: { type: 'doc', id: 'linux/debian/installation/automated-install/setup-unattended-installation/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Network Installation',
              link: { type: 'doc', id: 'linux/debian/installation/automated-install/configure-network-installation/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Create Installation Scripts',
              link: { type: 'doc', id: 'linux/debian/installation/automated-install/create-installation-scripts/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Deploy Mass Installation',
              link: { type: 'doc', id: 'linux/debian/installation/automated-install/deploy-mass-installation/index' },
              items: []
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Network',
      link: { type: 'doc', id: 'linux/debian/network/index' },
      items: [
        {
          type: 'category',
          label: 'Network Configuration',
          link: { type: 'doc', id: 'linux/debian/network/network-configuration/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Network Interfaces',
              link: { type: 'doc', id: 'linux/debian/network/network-configuration/configure-network-interfaces/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Network Managers',
              link: { type: 'doc', id: 'linux/debian/network/network-configuration/setup-network-managers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Routing',
              link: { type: 'doc', id: 'linux/debian/network/network-configuration/configure-routing/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Bridge Bonding',
              link: { type: 'doc', id: 'linux/debian/network/network-configuration/setup-bridge-bonding/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Wireless Setup',
          link: { type: 'doc', id: 'linux/debian/network/wireless-setup/index' },
          items: [
            {
              type: 'category',
              label: 'Configure WiFi',
              link: { type: 'doc', id: 'linux/debian/network/wireless-setup/configure-wifi/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Wireless Security',
              link: { type: 'doc', id: 'linux/debian/network/wireless-setup/setup-wireless-security/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Select Network',
              link: { type: 'doc', id: 'linux/debian/network/wireless-setup/select-network/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Mobile Broadband',
              link: { type: 'doc', id: 'linux/debian/network/wireless-setup/configure-mobile-broadband/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Static IP',
          link: { type: 'doc', id: 'linux/debian/network/static-ip/index' },
          items: [
            {
              type: 'category',
              label: 'Configure IPv4',
              link: { type: 'doc', id: 'linux/debian/network/static-ip/configure-ipv4/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure IPv6',
              link: { type: 'doc', id: 'linux/debian/network/static-ip/configure-ipv6/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Network Interfaces',
              link: { type: 'doc', id: 'linux/debian/network/static-ip/setup-network-interfaces/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Make Configuration Persistent',
              link: { type: 'doc', id: 'linux/debian/network/static-ip/make-configuration-persistent/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'DNS Configuration',
          link: { type: 'doc', id: 'linux/debian/network/dns-configuration/index' },
          items: [
            {
              type: 'category',
              label: 'Configure DNS Resolver',
              link: { type: 'doc', id: 'linux/debian/network/dns-configuration/configure-dns-resolver/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup DNS Servers',
              link: { type: 'doc', id: 'linux/debian/network/dns-configuration/setup-dns-servers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Hostname Resolution',
              link: { type: 'doc', id: 'linux/debian/network/dns-configuration/configure-hostname-resolution/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup DNS Caching',
              link: { type: 'doc', id: 'linux/debian/network/dns-configuration/setup-dns-caching/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Firewall Setup',
          link: { type: 'doc', id: 'linux/debian/network/firewall-setup/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Firewall Rules',
              link: { type: 'doc', id: 'linux/debian/network/firewall-setup/configure-firewall-rules/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Ports',
              link: { type: 'doc', id: 'linux/debian/network/firewall-setup/manage-ports/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Filter Traffic',
              link: { type: 'doc', id: 'linux/debian/network/firewall-setup/filter-traffic/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Use Firewall Tools',
              link: { type: 'doc', id: 'linux/debian/network/firewall-setup/use-firewall-tools/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'VPN Setup',
          link: { type: 'doc', id: 'linux/debian/network/vpn-setup/index' },
          items: [
            {
              type: 'category',
              label: 'Configure VPN Clients',
              link: { type: 'doc', id: 'linux/debian/network/vpn-setup/configure-vpn-clients/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup VPN Servers',
              link: { type: 'doc', id: 'linux/debian/network/vpn-setup/setup-vpn-servers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Choose VPN Protocols',
              link: { type: 'doc', id: 'linux/debian/network/vpn-setup/choose-vpn-protocols/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Secure VPN Connections',
              link: { type: 'doc', id: 'linux/debian/network/vpn-setup/secure-vpn-connections/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Remote Access',
          link: { type: 'doc', id: 'linux/debian/network/remote-access/index' },
          items: [
            {
              type: 'category',
              label: 'Setup SSH Access',
              link: { type: 'doc', id: 'linux/debian/network/remote-access/setup-ssh-access/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Remote Desktop',
              link: { type: 'doc', id: 'linux/debian/network/remote-access/configure-remote-desktop/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Terminal Access',
              link: { type: 'doc', id: 'linux/debian/network/remote-access/setup-terminal-access/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure File Sharing',
              link: { type: 'doc', id: 'linux/debian/network/remote-access/configure-file-sharing/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Network Troubleshooting',
          link: { type: 'doc', id: 'linux/debian/network/network-troubleshooting/index' },
          items: [
            {
              type: 'category',
              label: 'Solve Connectivity Issues',
              link: { type: 'doc', id: 'linux/debian/network/network-troubleshooting/solve-connectivity-issues/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Diagnose Network Problems',
              link: { type: 'doc', id: 'linux/debian/network/network-troubleshooting/diagnose-network-problems/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Fix Performance Issues',
              link: { type: 'doc', id: 'linux/debian/network/network-troubleshooting/fix-performance-issues/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Use Network Tools',
              link: { type: 'doc', id: 'linux/debian/network/network-troubleshooting/use-network-tools/index' },
              items: []
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Security',
      link: { type: 'doc', id: 'linux/debian/security/index' },
      items: [
        {
          type: 'category',
          label: 'User Permissions',
          link: { type: 'doc', id: 'linux/debian/security/user-permissions/index' },
          items: [
            {
              type: 'category',
              label: 'Set File Permissions',
              link: { type: 'doc', id: 'linux/debian/security/user-permissions/set-file-permissions/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Directory Permissions',
              link: { type: 'doc', id: 'linux/debian/security/user-permissions/configure-directory-permissions/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Special Permissions',
              link: { type: 'doc', id: 'linux/debian/security/user-permissions/manage-special-permissions/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Permissions',
              link: { type: 'doc', id: 'linux/debian/security/user-permissions/manage-permissions/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Access Control',
          link: { type: 'doc', id: 'linux/debian/security/access-control/index' },
          items: [
            {
              type: 'category',
              label: 'Control User Access',
              link: { type: 'doc', id: 'linux/debian/security/access-control/control-user-access/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Group Access',
              link: { type: 'doc', id: 'linux/debian/security/access-control/manage-group-access/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Control System Access',
              link: { type: 'doc', id: 'linux/debian/security/access-control/control-system-access/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Resource Access',
              link: { type: 'doc', id: 'linux/debian/security/access-control/manage-resource-access/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Authentication',
          link: { type: 'doc', id: 'linux/debian/security/authentication/index' },
          items: [
            {
              type: 'category',
              label: 'Setup Password Authentication',
              link: { type: 'doc', id: 'linux/debian/security/authentication/setup-password-authentication/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Key Authentication',
              link: { type: 'doc', id: 'linux/debian/security/authentication/configure-key-authentication/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Enable Multi Factor Auth',
              link: { type: 'doc', id: 'linux/debian/security/authentication/enable-multi-factor-auth/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Choose Authentication Methods',
              link: { type: 'doc', id: 'linux/debian/security/authentication/choose-authentication-methods/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Firewall Rules',
          link: { type: 'doc', id: 'linux/debian/security/firewall-rules/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Firewall Rules',
              link: { type: 'doc', id: 'linux/debian/security/firewall-rules/configure-firewall-rules/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Firewall Rules',
              link: { type: 'doc', id: 'linux/debian/security/firewall-rules/manage-firewall-rules/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Control Network Traffic',
              link: { type: 'doc', id: 'linux/debian/security/firewall-rules/control-network-traffic/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Implement Security Policies',
              link: { type: 'doc', id: 'linux/debian/security/firewall-rules/implement-security-policies/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Encryption',
          link: { type: 'doc', id: 'linux/debian/security/encryption/index' },
          items: [
            {
              type: 'category',
              label: 'Encrypt Disk',
              link: { type: 'doc', id: 'linux/debian/security/encryption/encrypt-disk/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Encrypt Files',
              link: { type: 'doc', id: 'linux/debian/security/encryption/encrypt-files/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Network Encryption',
              link: { type: 'doc', id: 'linux/debian/security/encryption/setup-network-encryption/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Use Encryption Tools',
              link: { type: 'doc', id: 'linux/debian/security/encryption/use-encryption-tools/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Security Updates',
          link: { type: 'doc', id: 'linux/debian/security/security-updates/index' },
          items: [
            {
              type: 'category',
              label: 'Manage Security Updates',
              link: { type: 'doc', id: 'linux/debian/security/security-updates/manage-security-updates/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Apply Security Patches',
              link: { type: 'doc', id: 'linux/debian/security/security-updates/apply-security-patches/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Scan Vulnerabilities',
              link: { type: 'doc', id: 'linux/debian/security/security-updates/scan-vulnerabilities/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Automate Updates',
              link: { type: 'doc', id: 'linux/debian/security/security-updates/automate-updates/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Intrusion Detection',
          link: { type: 'doc', id: 'linux/debian/security/intrusion-detection/index' },
          items: [
            {
              type: 'category',
              label: 'Setup IDS Systems',
              link: { type: 'doc', id: 'linux/debian/security/intrusion-detection/setup-ids-systems/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Detect Threats',
              link: { type: 'doc', id: 'linux/debian/security/intrusion-detection/detect-threats/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Monitor Security',
              link: { type: 'doc', id: 'linux/debian/security/intrusion-detection/monitor-security/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Respond to Incidents',
              link: { type: 'doc', id: 'linux/debian/security/intrusion-detection/respond-to-incidents/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Security Audit',
          link: { type: 'doc', id: 'linux/debian/security/security-audit/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Audit Logging',
              link: { type: 'doc', id: 'linux/debian/security/security-audit/configure-audit-logging/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Check Compliance',
              link: { type: 'doc', id: 'linux/debian/security/security-audit/check-compliance/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Assess Security',
              link: { type: 'doc', id: 'linux/debian/security/security-audit/assess-security/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Use Audit Tools',
              link: { type: 'doc', id: 'linux/debian/security/security-audit/use-audit-tools/index' },
              items: []
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Software',
      link: { type: 'doc', id: 'linux/debian/software/index' },
      items: [
        {
          type: 'category',
          label: 'Package Management',
          link: { type: 'doc', id: 'linux/debian/software/package-management/index' },
          items: [
            {
              type: 'category',
              label: 'Install Packages',
              link: { type: 'doc', id: 'linux/debian/software/package-management/install-packages/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Remove Packages',
              link: { type: 'doc', id: 'linux/debian/software/package-management/remove-packages/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Update Packages',
              link: { type: 'doc', id: 'linux/debian/software/package-management/update-packages/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Search Packages',
              link: { type: 'doc', id: 'linux/debian/software/package-management/search-packages/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Use Package Tools',
              link: { type: 'doc', id: 'linux/debian/software/package-management/use-package-tools/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Repository Management',
          link: { type: 'doc', id: 'linux/debian/software/repository-management/index' },
          items: [
            {
              type: 'category',
              label: 'Configure Repositories',
              link: { type: 'doc', id: 'linux/debian/software/repository-management/configure-repositories/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Repository Sources',
              link: { type: 'doc', id: 'linux/debian/software/repository-management/manage-repository-sources/index' },
              items: []
            },
{
              type: 'category',
              label: 'Handle Repository Keys',
              link: { type: 'doc', id: 'linux/debian/software/repository-management/handle-repository-keys/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Add Custom Repositories',
              link: { type: 'doc', id: 'linux/debian/software/repository-management/add-custom-repositories/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Software Installation',
          link: { type: 'doc', id: 'linux/debian/software/software-installation/index' },
          items: [
            {
              type: 'category',
              label: 'Compile from Source',
              link: { type: 'doc', id: 'linux/debian/software/software-installation/compile-from-source/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Binaries',
              link: { type: 'doc', id: 'linux/debian/software/software-installation/install-binaries/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Manage Dependencies',
              link: { type: 'doc', id: 'linux/debian/software/software-installation/manage-dependencies/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Choose Installation Methods',
              link: { type: 'doc', id: 'linux/debian/software/software-installation/choose-installation-methods/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Development Tools',
          link: { type: 'doc', id: 'linux/debian/software/development-tools/index' },
          items: [
            {
              type: 'category',
              label: 'Install Compilers',
              link: { type: 'doc', id: 'linux/debian/software/development-tools/install-compilers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Interpreters',
              link: { type: 'doc', id: 'linux/debian/software/development-tools/setup-interpreters/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Build Systems',
              link: { type: 'doc', id: 'linux/debian/software/development-tools/configure-build-systems/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Version Control',
              link: { type: 'doc', id: 'linux/debian/software/development-tools/setup-version-control/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Debugging Tools',
              link: { type: 'doc', id: 'linux/debian/software/development-tools/install-debugging-tools/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Server Applications',
          link: { type: 'doc', id: 'linux/debian/software/server-applications/index' },
          items: [
            {
              type: 'category',
              label: 'Install Web Servers',
              link: { type: 'doc', id: 'linux/debian/software/server-applications/install-web-servers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Database Servers',
              link: { type: 'doc', id: 'linux/debian/software/server-applications/setup-database-servers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Mail Servers',
              link: { type: 'doc', id: 'linux/debian/software/server-applications/configure-mail-servers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup File Servers',
              link: { type: 'doc', id: 'linux/debian/software/server-applications/setup-file-servers/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Application Servers',
              link: { type: 'doc', id: 'linux/debian/software/server-applications/install-application-servers/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Desktop Applications',
          link: { type: 'doc', id: 'linux/debian/software/desktop-applications/index' },
          items: [
            {
              type: 'category',
              label: 'Install Office Suites',
              link: { type: 'doc', id: 'linux/debian/software/desktop-applications/install-office-suites/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Media Applications',
              link: { type: 'doc', id: 'linux/debian/software/desktop-applications/setup-media-applications/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Graphics Software',
              link: { type: 'doc', id: 'linux/debian/software/desktop-applications/install-graphics-software/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Setup Productivity Tools',
              link: { type: 'doc', id: 'linux/debian/software/desktop-applications/setup-productivity-tools/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install System Utilities',
              link: { type: 'doc', id: 'linux/debian/software/desktop-applications/install-system-utilities/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Third Party Software',
          link: { type: 'doc', id: 'linux/debian/software/third-party-software/index' },
          items: [
            {
              type: 'category',
              label: 'Add External Repositories',
              link: { type: 'doc', id: 'linux/debian/software/third-party-software/add-external-repositories/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Proprietary Software',
              link: { type: 'doc', id: 'linux/debian/software/third-party-software/install-proprietary-software/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Use Flatpak Snap',
              link: { type: 'doc', id: 'linux/debian/software/third-party-software/use-flatpak-snap/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Install Manually',
              link: { type: 'doc', id: 'linux/debian/software/third-party-software/install-manually/index' },
              items: []
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: { type: 'doc', id: 'linux/debian/troubleshooting/index' },
      items: [
        {
          type: 'category',
          label: 'Boot Issues',
          link: { type: 'doc', id: 'linux/debian/troubleshooting/boot-issues/index' },
          items: [
            {
              type: 'category',
              label: 'Fix Bootloader Problems',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/boot-issues/fix-bootloader-problems/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Resolve Kernel Issues',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/boot-issues/resolve-kernel-issues/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Understand Boot Sequence',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/boot-issues/understand-boot-sequence/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Perform Emergency Boot',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/boot-issues/perform-emergency-boot/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Recover Boot System',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/boot-issues/recover-boot-system/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Hardware Problems',
          link: { type: 'doc', id: 'linux/debian/troubleshooting/hardware-problems/index' },
          items: [
            {
              type: 'category',
              label: 'Fix Driver Issues',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/hardware-problems/fix-driver-issues/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Troubleshoot Hardware Detection',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/hardware-problems/troubleshoot-hardware-detection/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Configure Devices',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/hardware-problems/configure-devices/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Check Hardware Compatibility',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/hardware-problems/check-hardware-compatibility/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Diagnose Hardware',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/hardware-problems/diagnose-hardware/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Network Issues',
          link: { type: 'doc', id: 'linux/debian/troubleshooting/network-issues/index' },
          items: [
            {
              type: 'category',
              label: 'Fix Connectivity Problems',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/network-issues/fix-connectivity-problems/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Resolve DNS Issues',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/network-issues/resolve-dns-issues/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Troubleshoot Wireless Problems',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/network-issues/troubleshoot-wireless-problems/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Fix Network Configuration',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/network-issues/fix-network-configuration/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Perform Network Diagnostics',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/network-issues/perform-network-diagnostics/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Performance Issues',
          link: { type: 'doc', id: 'linux/debian/troubleshooting/performance-issues/index' },
          items: [
            {
              type: 'category',
              label: 'Optimize CPU Performance',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/performance-issues/optimize-cpu-performance/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Fix Memory Issues',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/performance-issues/fix-memory-issues/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Improve Disk Performance',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/performance-issues/improve-disk-performance/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Optimize System Performance',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/performance-issues/optimize-system-performance/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Monitor Performance',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/performance-issues/monitor-performance/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Software Conflicts',
          link: { type: 'doc', id: 'linux/debian/troubleshooting/software-conflicts/index' },
          items: [
            {
              type: 'category',
              label: 'Resolve Dependency Conflicts',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/software-conflicts/resolve-dependency-conflicts/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Fix Package Conflicts',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/software-conflicts/fix-package-conflicts/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Solve Library Issues',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/software-conflicts/solve-library-issues/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Handle Application Conflicts',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/software-conflicts/handle-application-conflicts/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Filesystem Errors',
          link: { type: 'doc', id: 'linux/debian/troubleshooting/filesystem-errors/index' },
          items: [
            {
              type: 'category',
              label: 'Fix Disk Errors',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/filesystem-errors/fix-disk-errors/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Repair Filesystem Corruption',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/filesystem-errors/repair-filesystem-corruption/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Resolve Partition Issues',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/filesystem-errors/resolve-partition-issues/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Fix Mount Problems',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/filesystem-errors/fix-mount-problems/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Repair Filesystem',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/filesystem-errors/repair-filesystem/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Common Errors',
          link: { type: 'doc', id: 'linux/debian/troubleshooting/common-errors/index' },
          items: [
            {
              type: 'category',
              label: 'Fix System Errors',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/common-errors/fix-system-errors/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Resolve Application Errors',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/common-errors/resolve-application-errors/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Fix Permission Errors',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/common-errors/fix-permission-errors/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Resolve Configuration Errors',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/common-errors/resolve-configuration-errors/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Diagnose Errors',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/common-errors/diagnose-errors/index' },
              items: []
            }
          ]
        },
        {
          type: 'category',
          label: 'Recovery Procedures',
          link: { type: 'doc', id: 'linux/debian/troubleshooting/recovery-procedures/index' },
          items: [
            {
              type: 'category',
              label: 'Recover System',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/recovery-procedures/recover-system/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Recover Data',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/recovery-procedures/recover-data/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Restore from Backup',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/recovery-procedures/restore-from-backup/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Perform Emergency Procedures',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/recovery-procedures/perform-emergency-procedures/index' },
              items: []
            },
            {
              type: 'category',
              label: 'Implement Disaster Recovery',
              link: { type: 'doc', id: 'linux/debian/troubleshooting/recovery-procedures/implement-disaster-recovery/index' },
              items: []
            }
          ]
        }
      ]
    }

      ],
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
