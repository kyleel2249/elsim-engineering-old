/**
 * Canonical production URL, used by app/layout.tsx (metadataBase),
 * app/sitemap.ts and app/robots.ts.
 *
 * IMPORTANT: NEXT_PUBLIC_* variables are inlined into the JavaScript
 * bundle at BUILD time, not read at request time. If NEXT_PUBLIC_SITE_URL
 * isn't set in your hosting platform's environment variables *before* the
 * production build runs, every URL emitted into sitemap.xml and
 * robots.txt gets baked in as whatever the fallback below is — which is
 * exactly what caused the "32 errors / 0 indexed" Search Console report:
 * the previous fallback was `http://localhost:3000`, so every submitted
 * URL pointed at an address Google could never reach.
 *
 * The fallback below is now the real production domain instead of
 * localhost, so even a misconfigured env var can't reintroduce that bug —
 * but you should still set NEXT_PUBLIC_SITE_URL explicitly in your host's
 * dashboard and redeploy (a plain restart does not pick up new env vars
 * for NEXT_PUBLIC_* values; it requires a fresh build).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://elsimengineeringlimited.com';
