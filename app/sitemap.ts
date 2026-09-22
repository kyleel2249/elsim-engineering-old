import type { MetadataRoute } from 'next';
import { services } from '@/lib/data/services';
import { getPublishedProjects } from '@/lib/data/projects';
import { getPublishedPosts } from '@/lib/data/blog';
import { siteUrl } from '@/lib/site';

/**
 * Absolute URL helper. Static export uses trailingSlash: true, so every path
 * except the origin root ends with `/` — matching the live HTML routes Google
 * will crawl (non-slash URLs 308 to the slash form).
 */
function pageUrl(path = ''): string {
  if (!path || path === '/') return siteUrl;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

/**
 * Sitemap is generated at build time from live data modules.
 * Adding a post in lib/data/blog.ts automatically adds /blog/[slug]/ here
 * on the next deploy — no manual sitemap edit required.
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
