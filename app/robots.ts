import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// The site previously disallowed all crawling on purpose while brand
// assets/content were pending approval (see docs/STATUS.md history). That
// flag is now off: the site is live and being submitted to Search
// Console, so crawling is allowed. /api/ stays blocked since it's a form
// endpoint, not content.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/']
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
