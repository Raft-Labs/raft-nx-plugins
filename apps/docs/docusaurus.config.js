module.exports = {
  title: 'Raftlabs Nx',
  tagline: 'Nx plugins for shared experience',
  url: 'https://raft-labs.github.io',
  baseUrl: '/raft-nx-plugins/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/raftlabs-logo.png',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Raftlabs Nx',
      logo: {
        alt: 'Raftlabs Logo',
        src: 'img/raftlabs-logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/Raft-Labs/raft-nx-plugins/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',

      copyright: `Copyright © ${new Date().getFullYear()} Raftlabs Nx, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/Raft-Labs/raft-nx-plugins/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/Raft-Labs/raft-nx-plugins/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['packages/devkit-extra/src/index.ts'],
        tsconfig: 'packages/devkit-extra/tsconfig.json',
        out: 'devkit-extra',
        sidebar: {
          categoryLabel: 'Nx Devkit Extra',
          fullNames: true,
        },
      },
    ],
  ],
};
