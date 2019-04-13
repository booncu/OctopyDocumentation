/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [{
    caption: 'SupianIDz',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/octopy.svg'.
    image: '/img/octopy.svg',
    infoLink: 'https://www.facebook.com/SupianIDz',
    pinned: true,
}, ];

const siteConfig = {
    title: 'Octopy Framework', // Title for your website.
    tagline: 'Lightweight PHP Framework With Laravel Look Like',
    url: 'https://framework.octopy.xyz', // Your website URL
    baseUrl: '/', // Base URL for your project */
    // For github.io type URLs, you would set the url and baseUrl like:
    url: 'https://github.com/SupianIDz/OctopyFramework',
    //   baseUrl: '/test-site/',

    // Used for publishing and more
    projectName: 'OctopyFramework',
    organizationName: 'SupianIDz',
    // For top-level user or org sites, the organization is still the same.
    // e.g., for the https://JoelMarcey.github.io site, it would be set like...
    //   organizationName: 'JoelMarcey'

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        { doc: 'installation', label: 'Documentation' },
        { page: 'help', label: 'Help' },
        { blog: true, label: 'Blog' },
        { search: true }
    ],

    docsSideNavCollapsible: true,

    // If you have users set above, you add it here:
    users,

    /* path to images for header/footer */
    headerIcon: 'img/octopy.svg',
    footerIcon: 'img/octopy.svg',
    favicon: 'img/favicon/favicon.ico',
    algolia: {
        apiKey: '99cbe7c1b4cc5b519db196ff32d91773',
        indexName: 'octopy',
        algoliaOptions: {},
        placeholder: 'Search...'
    },

    /* Colors for website */
    colors: {
        primaryColor: '#0C1021',
        secondaryColor: '#205C3B',
    },

    /* Custom fonts for website */
    /*
    fonts: {
      myFont: [
        "Times New Roman",
        "Serif"
      ],
      myOtherFont: [
        "-apple-system",
        "system-ui"
      ]
    },
    */

    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: `Copyright © 2018 - ${new Date().getFullYear()} Supian M`,

    scrollToTop: true,

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'atom-one-dark',
    },

    // Add custom scripts here that would be placed in <script> tags.
    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/js/code-block-buttons.js',
    ],
    stylesheets: [
        'https://fonts.googleapis.com/css?family=Nunito',
        '/css/code-block-buttons.css',
    ],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',

    // No .html extensions for paths.
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/octopy.svg',
    twitterImage: 'img/octopy.svg',

    // Show documentation's last contributor's name.
    enableUpdateBy: true,

    // Show documentation's last update time.
    enableUpdateTime: true,

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...
    repoUrl: 'https://github.com/SupianIDz/OctopyFramework',
};

module.exports = siteConfig;