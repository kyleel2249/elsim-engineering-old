import { allMappedKeywords, getSeoTarget, type SeoTarget } from '@/lib/data/seo-master-map';
import { siteUrl } from '@/lib/site';

interface OgImageInput {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface PageOpenGraphOptions {
  title: string;
  description: string;
  /** Path from the site root, e.g. '/about' or '/about/'. */
  path: string;
  image?: OgImageInput;
  type?: 'website' | 'article';
}

/** Full keyword set from the SEO Master Map (brand, services, geo, long-tail). */
export const SITE_KEYWORDS: string[] = allMappedKeywords();

/** Keywords for a single service page — map entry when present, else fallback. */
export function serviceKeywords(serviceTitle: string, extra: string[] = []): string[] {
  return [
    serviceTitle,
    `${serviceTitle} Ghana`,
    `${serviceTitle} Accra`,
    `${serviceTitle} West Africa`,
    'ELSIM Engineering',
    'electrical engineering Ghana',
    'www.elsimengineering.com',
    ...extra,
  ];
}

/** Absolute page URL with trailing slash (matches static export routes). */
export function absolutePageUrl(path: string): string {
  if (!path || path === '/') return `${siteUrl}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

/** Path-only canonical for Metadata.alternates (leading slash, trailing slash). */
export function canonicalPath(path: string): string {
  if (!path || path === '/') return '/';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized.endsWith('/') ? normalized : `${normalized}/`;
}

/**
 * Metadata fields from the Keyword Master Map for a given path.
 * Falls back to provided title/description when no map entry exists.
 */
export function metadataFromSeoMap(
  path: string,
  fallback?: { title?: string; description?: string; keywords?: string[] }
): {
  title: string;
  description: string;
  keywords: string[];
  target?: SeoTarget;
} {
  const target = getSeoTarget(path);
  if (target) {
    return {
      title: target.metaTitle,
      description: target.metaDescription,
      keywords: [target.primary, ...target.secondary, ...target.longTail],
      target,
    };
  }
  return {
    title: fallback?.title ?? 'ELSIM Engineering',
    description: fallback?.description ?? '',
    keywords: fallback?.keywords ?? SITE_KEYWORDS.slice(0, 20),
  };
}

/**
 * Build matching `openGraph`, `twitter`, and `alternates.canonical` for a page.
 */
export function pageOpenGraph({
  title,
  description,
  path,
  image,
  type = 'website',
}: PageOpenGraphOptions) {
  const url = absolutePageUrl(path);
  const images = image
    ? [
        {
          url: `${siteUrl}${image.src}`,
          width: image.width,
          height: image.height,
          alt: image.alt,
          type: 'image/jpeg' as const,
        },
      ]
    : undefined;

  return {
    alternates: {
      canonical: canonicalPath(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ELSIM Engineering',
      locale: 'en_GH',
      type,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}

export { getSeoTarget, getSeoTargetBySlug, keywordsForPath } from '@/lib/data/seo-master-map';
