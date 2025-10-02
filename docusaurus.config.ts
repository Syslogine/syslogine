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
  
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en']
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

  plugins: ['./plugins/stats-plugin'],

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
        { type: 'docSidebar', sidebarId: 'linuxSidebar', label: 'Linux', position: 'left'},
        { type: 'docSidebar', sidebarId: 'windowsSidebar', label: 'Windows', position: 'left'},
        { type: 'docSidebar', sidebarId: 'virtualizationSidebar', label: 'Virtualization', position: 'left'},
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
        {href: 'https://github.com/yarpii/syslogine',label: 'GitHub',position: 'right'}
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Getting Started',
          items: [
            {label: 'Welcome Guide', to: '/docs/welcome'},
            {label: 'Quick Start', to: '/docs/intro'},
            {label: 'Installation Guides', to: '/docs/linux/debian/installation'},
            {label: 'Browse by Tags', to: '/docs/tags'},
            {label: 'FAQ', to: '/faq'},
          ],
        },
        {
          title: 'Documentation',
          items: [
            {label: 'Linux Guides', to: '/docs/linux'},
            {label: 'Windows Guides', to: '/docs/windows'},
            {label: 'Virtualization', to: '/docs/virtualization'},
            {label: 'Security', to: '/docs/security'},
            {label: 'Monitoring', to: '/docs/monitoring'},
          ],
        },
        {
          title: 'Community & Support',
          items: [
            {label: 'GitHub Discussions', href: 'https://github.com/yarpii/syslogine/discussions'},
            {label: 'Report Issues', href: 'https://github.com/yarpii/syslogine/issues'},
            {label: 'Community Guidelines', to: '/community'},
            {label: 'Contribute', href: 'https://github.com/yarpii/syslogine/blob/main/CONTRIBUTING.md'},
            {label: 'Contact Us', to: '/contact'},
          ],
        },
        {
          title: 'Project Info',
          items: [
            {label: 'About Syslogine', to: '/about'},
            {label: 'Project Roadmap', to: '/roadmap'},
            {label: 'Progress Tracker', to: '/progress'},
            {label: 'Changelog', to: '/changelog'},
            {label: 'Statistics', to: '/stats'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'GitHub Repository', href: 'https://github.com/yarpii/syslogine'},
            {label: 'Sponsor Project', to: '/sponsor'},
            {label: 'Download Resources', to: '/downloads'},
            {label: 'API Documentation', to: '/api'},
          ],
        },
      ],
      copyright: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <div>Copyright © ${new Date().getFullYear()} Syslogine. Built with Docusaurus.</div>
          <div style="font-size: 0.85em; opacity: 0.8;">
            Professional System Administration Knowledge Base | 
            <a href="/privacy" style="color: inherit;">Privacy Policy</a> | 
            <a href="/terms" style="color: inherit;">Terms of Service</a>
          </div>
        </div>
      `
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;