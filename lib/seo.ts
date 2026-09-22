import { company } from '@/lib/data/company';
import { services } from '@/lib/data/services';
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
  /** Path from the site root, e.g. '/about'. */
  path: string;
  image?: OgImageInput;
  type?: 'website' | 'article';
}

/**
 * Core search phrases derived from real services, regions and brand.
 * Used in root metadata and composed into page-level keyword lists.
 * Prefer natural language in titles/descriptions; keywords support crawlers
 * that still read the meta keywords field and reinforce topical focus.
 */
export const SITE_KEYWORDS: string[] = [
  'ELSIM Engineering',
  'ELSIM Engineering Firm',
  'elsimengineering.com',
  'www.elsimengineering.com',
  'electrical engineering Ghana',
  'electrical engineering Accra',
  'electrical contractor Ghana',
  'electrical installations Ghana',
  'solar installation Accra',
  'solar power solutions Ghana',
  'solar PV West Africa',
  'power distribution Ghana',
  'transformer installation Ghana',
  'transformer installation West Africa',
  'electrical maintenance Ghana',
  'electrical inspection Accra',
  'electrical consulting Ghana',
  'electrical audit Ghana',
  'industrial electrical contractor',
  'commercial electrical services Accra',
  'ECG Class B contractor',
  ...company.regions.flatMap((region) => [
    `electrical engineering ${region}`,
    `power systems ${region}`,
  ]),
  ...services.map((s) => s.title),
  ...services.map((s) => `${s.title} Ghana`),
];

/** Keywords for a single service page — service terms + geography + brand. */
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
  if (!path || path === '/') return siteUrl;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

/**
 * Build matching `openGraph` and `twitter` metadata blocks for a page.
 *
 * Next.js's Metadata API does NOT propagate a page's top-level `title` /
 * `description` into `openGraph`/`twitter` automatically, and if a page
 * defines its own `openGraph` object at all, it fully replaces the root
 * layout's — including `images`. Every page that defines its own `openGraph`
 * must spread this helper so link previews stay complete.
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
