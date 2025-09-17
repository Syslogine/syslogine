import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Syslogine',
  tagline: 'Professional System Administration Guides & Tutorials',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://syslogine.cloud',
  baseUrl: '/',

  organizationName: 'Syslogine',
  projectName: 'syslogine',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/yarpii/syslogine/tree/main/',
          tagsBasePath: 'tags',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/syslogine-social-card.jpg',
    metadata: [
      {name: 'keywords', content: 'linux administration, ubuntu server, centos, system administration, linux tutorials'},
      {name: 'description', content: 'Professional system administration guides and tutorials for Linux, Windows Server, and virtualization platforms'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'Syslogine'},
    ],
    navbar: {
      title: 'Syslogine',
      logo: {
        alt: 'Syslogine Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Guides',
        },
        {to: '/tags', label: 'Tags', position: 'left'},
        {
          href: 'https://github.com/yarpii/syslogine',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'System Administration',
              to: '/docs/intro',
            },
            {
              label: 'Linux Guides',
              to: '/docs/basics',
            },
            {
              label: 'Security Tutorials',
              to: '/docs/security',
            },
            {
              label: 'Browse by Tags',
              to: '/tags',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/yarpii/syslogine/discussions',
            },
            {
              label: 'Issues & Support',
              href: 'https://github.com/yarpii/syslogine/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              href: 'https://syslogine.cloud',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/yarpii',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Syslogine. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;