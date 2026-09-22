import type { MetadataRoute } from 'next';
import { services } from '@/lib/data/services';
import { getPublishedProjects } from '@/lib/data/projects';
import { getPublishedPosts } from '@/lib/data/blog';
import { siteUrl } from '@/lib/site';

/**
 * Build an absolute <loc> under siteUrl only.
 *
 * Google rejects sitemap entries whose host does not match the Search Console
 * property (and rejects cross-host locs, e.g. www URLs in a non-www property,
 * or custom-domain URLs listed in a pages.dev sitemap).
 *
 * Static export uses trailingSlash: true — path pages end with `/`.
 */
function pageUrl(path = ''): string {
  const base = siteUrl.replace(/\/$/, '');
  if (!path || path === '/') {
    // Prefer trailing slash on the origin loc for consistency with export routes.
    return `${base}/`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${base}${withSlash}`;
}

/**
 * Sitemap is generated at build time from live data modules.
 * Set NEXT_PUBLIC_SITE_URL to the exact origin verified in Search Console
 * before deploying (https://elsimengineering.com or https://www.elsimengineering.com).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: pageUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: pageUrl('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: pageUrl('/projects'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: pageUrl('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: pageUrl('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: pageUrl('/our-impact'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: pageUrl('/safety'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: pageUrl('/maintenance'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: pageUrl('/quotation'), lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: pageUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: pageUrl('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: pageUrl('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: pageUrl(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getPublishedProjects().map((p) => ({
    url: pageUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: pageUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
