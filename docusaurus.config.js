const path = require("path");

module.exports = {
  title: 'Agiledrop Developer Resources',
  tagline: 'The tagline of my site',
  url: 'https://your-docusaurus-test-site.com',
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
        },
        {
          to: 'guides/',
          label: "Guides",
          position: 'left',
        },
        {
          href: 'https://github.com/AGILEDROP/resources/',
          label: 'Github',
          position: 'right',
        },
      ],
    },
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Style Guide',
    //           to: 'docs/',
    //         },
    //         {
    //           label: 'Second Doc',
    //           to: 'docs/doc2/',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //         },
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://twitter.com/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: 'blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // },
  },
  presets: [
    // [
    //   '@docusaurus/preset-classic',
    //   {
    //     docs: {
    //       routeBasePath: '/',
    //       // It is recommended to set document id as docs home page (`docs/` path).
    //       homePageId: 'db_stuff',
    //       sidebarPath: require.resolve('./sidebars.js'),
    //       // Please change this to your repo.
    //       editUrl:
    //         'https://bitbucket.org/agiledrop/developer_resources/src/master',
    //     },
    //     theme: {
    //       customCss: require.resolve('./src/css/custom.scss'),
    //     },
    //   },
    // ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        editUrl: 'https://bitbucket.org/agiledrop/developer_resources/src/master',
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
