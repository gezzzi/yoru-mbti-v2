/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nightpersonality.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/test-solo', '/test-match'],
  // Top-level alternateRefs: base URLs for each language
  // next-sitemap appends the page path to each base URL
  alternateRefs: [
    {
      href: 'https://nightpersonality.com',
      hreflang: 'ja',
    },
    {
      href: 'https://nightpersonality.com/en',
      hreflang: 'en',
    },
  ],
  transform: async (config, path) => {
    // For EN pages (/en/*), disable alternateRefs since the base URL approach
    // would produce wrong URLs (e.g., /en/en/help).
    // EN pages get hreflang from HTML <link> tags in the layout instead.
    if (path.startsWith('/en')) {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: path === '/en' ? 1.0 : config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: [],
      };
    }

    // For JP pages, use the default alternateRefs (base URL + path)
    // This correctly generates:
    //   /help → ja: .com/help, en: .com/en/help
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
