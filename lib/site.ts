/**
 * Single source of truth for environment-driven site configuration.
 * Imported by layout, robots, sitemap, SEO helpers, blog pages and the
 * quotation API.
 *
 * Both export styles are provided on purpose: the scaffold pages use
 * `SITE_URL`, while the blog / SEO modules use `siteUrl`. They are the same
 * value.
 */

/** The one correct production domain. */
export const CANONICAL_HOST = 'elsimengineeringlimited.com';

/**
 * Retired domain. Older Cloudflare Pages environment variables and docs
 * still pointed at it, so any origin using it is rewritten to the canonical
 * host (keeping a `www.` prefix if one was configured).
 */
const LEGACY_HOST = 'elsimengineering.com';

/** Turn whatever is configured into a clean origin: https, no trailing slash, correct domain. */
function normalizeOrigin(raw: string | undefined): string {
  const fallback = `https://${CANONICAL_HOST}`;
  const value = raw?.trim();
  if (!value) return fallback;

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    return fallback;
  }

  if (url.hostname === LEGACY_HOST || url.hostname.endsWith(`.${LEGACY_HOST}`)) {
    url.hostname = url.hostname.slice(0, -LEGACY_HOST.length) + CANONICAL_HOST;
  }

  return url.origin;
}

/**
 * Canonical origin used in sitemap.xml, robots.txt, Open Graph and JSON-LD.
 *
 * IMPORTANT: NEXT_PUBLIC_* variables are inlined at BUILD time. Changing
 * NEXT_PUBLIC_SITE_URL in the hosting dashboard needs a fresh build, not a
 * restart. The fallback is the real production domain (never localhost —
 * that is what caused the earlier "32 errors / 0 indexed" Search Console
 * report).
 *
 * Google Search Console: sitemap <loc> hosts must match the verified
 * property. Apex property -> https://elsimengineeringlimited.com;
 * www property -> set NEXT_PUBLIC_SITE_URL=https://www.elsimengineeringlimited.com.
 * Never submit a pages.dev sitemap that lists custom-domain URLs.
 *
 * No trailing slash.
 */
export const SITE_URL = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);

/** Alias of SITE_URL used by the blog and SEO modules. */
export const siteUrl = SITE_URL;

/**
 * True when the build targets a fully static export (Cloudflare Pages).
 * Route handlers do not exist in that output, so client code uses this to
 * choose a non-API submission path. next.config.js also turns on
 * `trailingSlash` for the same build, which is why page URLs below end in `/`.
 */
export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

/**
 * Absolute URL for a site path, matching the routing mode of the build:
 * static export serves `/about/`, a Node build serves `/about`. Using the
 * form the server actually answers with keeps sitemap entries and canonicals
 * from pointing at a redirect (Search Console: "Page with redirect").
 */
export function pageUrl(path = ''): string {
  if (!path || path === '/') return isStaticExport ? `${SITE_URL}/` : SITE_URL;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const trimmed = normalized.replace(/\/+$/, '');
  return `${SITE_URL}${isStaticExport ? `${trimmed}/` : trimmed}`;
}

/**
 * Search-engine indexing.
 *
 * The site previously shipped with a hard `disallow: /` and `noindex` while it
 * was pre-launch. That is now a switch: set NEXT_PUBLIC_SITE_INDEXABLE=false
 * to put the block back during staging.
 */
export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE !== 'false';

/** Google Analytics measurement ID. Empty string disables analytics entirely. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-E8Z0XCC54Q';

/**
 * Where quotation submissions are emailed.
 * Override with QUOTATION_INBOX in the host environment if needed.
 */
export const quotationInbox =
  process.env.QUOTATION_INBOX ?? `support@${CANONICAL_HOST}`;
