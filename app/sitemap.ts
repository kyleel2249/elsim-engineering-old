import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { services } from '@/lib/data/services';
import { projects } from '@/lib/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/services', '/projects', '/quotation', '/contact'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date()
    })
  );

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date()
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
