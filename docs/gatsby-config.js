const themeOptions = require('gatsby-theme-apollo-docs/theme-options')

const githubRepositories = [
  { githubRepo: 'wp-graphql/wp-graphql-acf', branch: 'master', name: 'wpgraphql-advanced-custom-fields' },
  { githubRepo: 'wp-graphql/wp-graphql-woocommerce', branch: 'develop', name: 'wpgraphql-woocommerce' },
]

module.exports = {
  siteMetadata: {
    siteName: `WPGraphQL`,
    title: `WPGraphQL Docs`,
    description: `WPGraphQL (GraphQL for WordPress) documentation.`,
    twitterHandle: `wpgraphql`,
    author: `WPGraphQL`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/source/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `wpgraphql-docs`,
        short_name: `wpgraphql`,
        start_url: `/`,
        background_color: `#0E2339`,
        theme_color: `#0E2339`,
        display: `minimal-ui`,
        icon: `source/images/icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: false,
      },
    },
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        ...themeOptions,
        siteName: 'WPGraphQL',
        menuTitle: 'WPGraphQL',
        baseUrl: 'https://docs.wpgraphql.com',
        root: __dirname,
        subtitle: 'WPGraphQL',
        description: 'WPGraphQL (GraphQL for WordPress) documentation.',
        githubRepo: 'wp-graphql/wp-graphql',
        defaultVersion: 0.4,
        trackingId: 'UA-111783024-1',
        twitterHandle: 'wpgraphql',
        spectrumHandle: 'wpgraphql',
        algoliaApiKey: 'bbd3b8557e78cdf3e0a73b5520f7f7ba',
        algoliaIndexName: 'wp_posts',
        youtubeUrl: 'https://www.youtube.com/channel/UCwav5UKLaEufn0mtvaFAkYw',
        logoLink: 'https://docs.wpgraphql.com',
        navConfig: {
          'wpgraphql.com': {
            url: 'https://www.wpgraphql.com',
            description: 'The WPGraphQL homepage',
          },
          'WPGraphQL for ACF': {
            url: 'https://www.wpgraphql.com/acf/',
            description: 'WPGraphQL for Advanced Custom Fields',
          },
          Github: {
            url: 'https://github.com/wp-graphql',
            description: 'WPGraphQL on Github',
          },
        },
        footerNavConfig: {
          Blog: {
            href: 'https://www.wpgraphql.com/blog/',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          Contribute: {
            href: '/guides/contributing',
          },
        },
        sidebarCategories: {
          null: ['index'],
          'Getting Started': [
            'getting-started/install-and-activate',
            'getting-started/interacting-with-wpgraphql',
            'getting-started/intro-to-graphql',
            'getting-started/posts',
            'getting-started/pages',
            'getting-started/custom-post-types',
            'getting-started/categories-and-tags',
            'getting-started/custom-taxonomies',
            'getting-started/custom-fields-and-meta',
            'getting-started/users',
            'getting-started/comments',
            'getting-started/settings',
            'getting-started/menus',
            'getting-started/plugins',
            'getting-started/themes',
          ],
          Extending: [
            'extending/types',
            'extending/fields',
            'extending/connections',
            'extending/mutations',
            'extending/interfaces',
            'extending/resolvers',
            'extending/hooks-and-filters',
          ],
          Guides: [
            'guides/about-wpgraphql',
            'guides/the-graphql-query-language',
            'guides/relay-spec',
            'guides/connections',
            'guides/anatomy-of-a-graphql-request',
            'guides/upgrading',
            'guides/authentication-and-authorization',
            'guides/debugging',
            'guides/deferred-resolvers',
            'guides/query-batching',
            'guides/contributing',
            'guides/testing',
          ],
          Extensions: [
            'extensions/wpgraphql-tax-query',
            'extensions/wpgraphql-meta-query',
            'extensions/wpgraphql-insights',
            'extensions/wpgraphql-dad-jokes',
            'extensions/wpgraphql-jwt-authentication',
            'extensions/wpgraphiql',
            'extensions/wpgraphql-content-blocks',
            'extensions/wpgraphql-gutenberg',
          ],
        },
      },
    },
    ...githubRepositories.map(({ githubRepo, branch, name }) => ({
      resolve: 'gatsby-source-git',
      options: {
        name: name,
        remote: `https://github.com/${githubRepo}.git`,
        branch: branch,
        patterns: '*README.md', //TODO: only get the README
      },
    })),
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
  ],
}
