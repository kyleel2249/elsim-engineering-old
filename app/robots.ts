import type { MetadataRoute } from 'next';
import { siteUrl, isIndexable } from '@/lib/site';

/**
 * Robots policy for search engines and AI crawlers.
 *
 * Driven by NEXT_PUBLIC_SITE_INDEXABLE so staging can stay blocked while
 * production remains fully crawlable. Sitemap always points at the absolute
 * /sitemap.xml URL (not the bare domain).
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return {
      rules: { userAgent: '*', disallow: '/' },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // API routes are not public pages; _next internals need not be indexed.
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
