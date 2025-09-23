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

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  plugins: [
    './plugins/stats-plugin'
  ],

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
          trackingID: 'G-BYVWHXRKRZ',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  scripts: [
    '/js/custom.js'
  ],

  themeConfig: {
    image: 'img/syslogine-social-card.jpg',
    metadata: [
      {name: 'keywords', content: 'linux administration, ubuntu server, RHEL, system administration, linux tutorials'},
      {name: 'description', content: 'Professional system administration guides and tutorials for Linux, Windows Server, and virtualization platforms'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'Syslogine'},
    ],
    navbar: {
      logo: {
        alt: 'Syslogine Logo',
        src: 'img/logo.webp',
      },
      items: [
        { type: 'docSidebar',sidebarId: 'mainSidebar',position: 'left',label: 'Guides'},
        { type: 'docSidebar', sidebarId: 'linuxSidebar', label: 'Linux', position: 'left' },
        { type: 'docSidebar', sidebarId: 'windowsSidebar', label: 'Windows', position: 'left' },
        { type: 'docSidebar', sidebarId: 'virtualizationSidebar', label: 'Virtualization', position: 'left' },

        {type: 'search',position: 'right'},
        {to: '/sponsor', label: '❤️ Sponsor', position: 'right'},
        {
          label: 'More',
          position: 'right',
          items: [
            {to: '/progress', label: 'Progress'},
            {to: '/changelog', label: 'Changelog'},
            {to: '/roadmap', label: 'Roadmap'},
            {to: '/community', label: 'Community'},
            {to: '/faq', label: 'FAQ'},
            {to: '/stats', label: 'Statistics'},
            {to: '/about', label: 'About'},
            {to: '/contact', label: 'Contact'},
          ],
        },
        {to: '/docs/tags', label: 'Tags', position: 'right'},
        {href: 'https://github.com/yarpii/syslogine',label: 'GitHub',position: 'right'},
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
              to: '/docs/tags',
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