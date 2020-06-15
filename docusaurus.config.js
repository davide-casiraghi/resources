const path = require("path");

module.exports = {
  title: 'Agiledrop Developer Resources',
  tagline: 'Code snippets and guides for web developers',
  url: 'https://resources.agiledrop.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'agiledrop', // Usually your GitHub org/user name.
  projectName: 'developer-resources', // Usually your repo name.
    customFields: {
    metadata: require("./metadata"),
  },
  themeConfig: {
    navbar: {
      title: 'Agiledrop',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/',
          label: 'Snippets',
          position: 'left',
          activeBaseRegex: 'docs/(?!contribute)'
        },
        {
          to: 'guides/',
          label: "Guides",
          position: 'left',
        },
        {
          to: 'docs/contribute',
          label: "Contribute",
          position: 'right',
          activeBaseRegex: 'docs/contribute'
        },
        {
          href: 'https://github.com/AGILEDROP/resources/',
          label: 'Github',
          position: 'right',
        },
      ],
    },
  },
  presets: [],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        editUrl: 'https://github.com/AGILEDROP/resources/blob/master',
        sidebarPath: require.resolve('./sidebars.js'),
      }
    ],
    ['@docusaurus/plugin-content-pages', {}],
    path.resolve(__dirname, './plugins/guides'),
    ['docusaurus-plugin-sass']
  ],
  themes: [
    [
      '@docusaurus/theme-classic',
      {
        customCss: require.resolve('./src/css/custom.scss'),
      },
    ]
  ]
};
