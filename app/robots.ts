import type { MetadataRoute } from 'next';
import { SITE_URL, isIndexable } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Major AI / LLM and search crawlers that should be allowed to index public pages.
 * Explicit Allow rules make intent clear even when a global * rule already permits access.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot', // Anthropic
  'anthropic-ai',
  'Google-Extended', // Gemini / Google AI training opt-in path
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'Applebot',
  'Applebot-Extended',
  'PerplexityBot',
  'Bytespider', // ByteDance
  'CCBot', // Common Crawl
  'cohere-ai',
  'FacebookBot',
  'meta-externalagent',
  'Amazonbot',
  'Diffbot',
] as const;

// /api/ is a form endpoint, not content. /_next/ is framework internals.
const DISALLOW_PATHS = ['/api/', '/_next/'] as const;

/**
 * Robots policy for search engines and AI crawlers.
 *
 * Production: allow organic + AI bots on public content; block API and
 * framework internals. Staging: set NEXT_PUBLIC_SITE_INDEXABLE=false to
 * disallow everything. The sitemap is always declared on the canonical domain.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return {
      rules: { userAgent: '*', disallow: '/' },
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }

  const aiRules = AI_CRAWLERS.map((bot) => ({
    userAgent: bot as string,
    allow: '/',
    disallow: [...DISALLOW_PATHS],
  }));

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: [...DISALLOW_PATHS] }, ...aiRules],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
