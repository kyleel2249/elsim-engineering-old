import type { MetadataRoute } from 'next';
import { services } from '@/lib/data/services';
import { getPublishedProjects } from '@/lib/data/projects';
import { getPublishedPosts } from '@/lib/data/blog';
import { legalLastUpdated } from '@/lib/data/legal';
import { pageUrl } from '@/lib/site';

// Required so the sitemap is emitted as a static file by `output: 'export'`
// (Cloudflare Pages) and is generated once at build time everywhere else.
export const dynamic = 'force-static';

type Entry = MetadataRoute.Sitemap[number];

/**
 * Sitemap is generated at build time from the live data modules, so a new
 * service, published project or blog post is listed automatically.
 *
 * - Every <loc> comes from `pageUrl()`, which uses the canonical domain
 *   (elsimengineeringlimited.com) and the same trailing-slash form the
 *   server actually answers with, so no entry points at a redirect.
 * - Provisional (placeholder) projects are excluded until they are approved.
 * - `lastModified` uses real dates where the data has them (blog posts,
 *   legal pages); everything else uses the build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getPublishedPosts();

  const latestPostDate = posts.reduce<Date | null>((latest, post) => {
    const d = new Date(post.updatedAt ?? post.publishedAt);
    return !latest || d > latest ? d : latest;
  }, null);

  const legalDate = new Date(legalLastUpdated);

  const staticRoutes: Entry[] = [
    { url: pageUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: pageUrl('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: pageUrl('/projects'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: pageUrl('/blog'), lastModified: latestPostDate ?? now, changeFrequency: 'weekly', priority: 0.9 },
    { url: pageUrl('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: pageUrl('/our-impact'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: pageUrl('/safety'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: pageUrl('/maintenance'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: pageUrl('/quotation'), lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: pageUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: pageUrl('/privacy'), lastModified: legalDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: pageUrl('/terms'), lastModified: legalDate, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: Entry[] = services.map((s) => ({
    url: pageUrl(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projectRoutes: Entry[] = getPublishedProjects().map((p) => ({
    url: pageUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const blogRoutes: Entry[] = posts.map((post) => ({
    url: pageUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // De-duplicate by URL (first entry wins) so a slug collision can never
  // emit the same <loc> twice.
  const seen = new Set<string>();
  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
