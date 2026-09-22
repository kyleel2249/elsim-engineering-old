#!/usr/bin/env node
/**
 * Technical SEO audit for ELSIM Engineering.
 *
 * Fetches a live origin (default: Cloudflare Pages preview) and checks
 * crawlability, metadata, structured data, security headers and sitemap
 * consistency. Exits 1 when any check fails.
 *
 * Usage:
 *   node scripts/seo-audit.mjs
 *   node scripts/seo-audit.mjs https://www.elsimengineering.com
 *   npm run seo:audit -- https://elsim-engineering.pages.dev
 */

const DEFAULT_ORIGIN = process.env.SEO_AUDIT_ORIGIN ?? 'https://elsim-engineering.pages.dev';
const origin = (process.argv[2] ?? DEFAULT_ORIGIN).replace(/\/$/, '');

const SAMPLE_PATHS = [
  '/',
  '/services/',
  '/projects/',
  '/blog/',
  '/about/',
  '/contact/',
  '/quotation/',
];

const results = [];

function pass(id, message, detail = '') {
  results.push({ ok: true, id, message, detail });
}

function fail(id, message, detail = '') {
  results.push({ ok: false, id, message, detail });
}

function warn(id, message, detail = '') {
  results.push({ ok: true, warn: true, id, message, detail });
}

async function fetchText(path, { redirect = 'follow' } = {}) {
  const url = path.startsWith('http') ? path : `${origin}${path}`;
  const res = await fetch(url, {
    redirect,
    headers: { 'user-agent': 'ELSIM-SEO-Audit/1.0 (+https://www.elsimengineering.com)' },
  });
  const text = await res.text();
  return { url, res, text, headers: res.headers };
}

function extractMeta(html, name) {
  const re = new RegExp(
    `<meta[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>|<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["'][^>]*>`,
    'i'
  );
  const m = html.match(re);
  return m ? m[1] || m[2] : null;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractCanonical(html) {
  const m =
    html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
    html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  return m ? m[1] : null;
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      blocks.push({ parseError: true, raw: m[1].slice(0, 120) });
    }
  }
  return blocks;
}

function countH1(html) {
  return (html.match(/<h1\b/gi) || []).length;
}

function hasLang(html) {
  return /<html[^>]+lang=["'][^"']+["']/i.test(html);
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

async function auditRobots() {
  const { res, text } = await fetchText('/robots.txt');
  if (!res.ok) {
    fail('robots.status', `robots.txt returned ${res.status}`);
    return;
  }
  pass('robots.status', 'robots.txt is reachable');

  if (/disallow:\s*\//i.test(text) && !/allow:\s*\//i.test(text)) {
    fail('robots.block', 'robots.txt appears to disallow the whole site', text.slice(0, 200));
  } else {
    pass('robots.allow', 'robots.txt allows crawling');
  }

  if (!/sitemap:\s*https?:\/\//i.test(text)) {
    fail('robots.sitemap', 'robots.txt is missing a Sitemap: absolute URL');
  } else {
    pass('robots.sitemap', 'robots.txt declares a sitemap');
  }

  const aiBots = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Googlebot'];
  for (const bot of aiBots) {
    if (text.includes(bot)) pass(`robots.${bot}`, `${bot} has an explicit rule`);
    else warn(`robots.${bot}`, `${bot} has no explicit rule (may still match *)`);
  }
}

async function auditSitemap() {
  const { res, text } = await fetchText('/sitemap.xml');
  if (!res.ok) {
    fail('sitemap.status', `sitemap.xml returned ${res.status}`);
    return [];
  }
  pass('sitemap.status', 'sitemap.xml is reachable');

  const type = res.headers.get('content-type') || '';
  if (!/xml|text\/xml|application\/xml/i.test(type)) {
    warn('sitemap.content-type', `Unexpected Content-Type: ${type}`);
  } else {
    pass('sitemap.content-type', `Content-Type is ${type}`);
  }

  if (!text.includes('<urlset') || !text.includes('<loc>')) {
    fail('sitemap.shape', 'sitemap.xml does not look like a valid urlset');
    return [];
  }
  pass('sitemap.shape', 'sitemap.xml contains a urlset');

  const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length < 5) {
    fail('sitemap.count', `Only ${locs.length} URLs in sitemap (expected more)`);
  } else {
    pass('sitemap.count', `Sitemap lists ${locs.length} URLs`);
  }

  const badHost = locs.filter((u) => {
    try {
      return new URL(u).hostname.includes('localhost');
    } catch {
      return true;
    }
  });
  if (badHost.length) fail('sitemap.host', 'Sitemap contains invalid hosts', badHost.slice(0, 3).join(', '));
  else pass('sitemap.host', 'Sitemap URLs use public hosts');

  return locs;
}

async function auditPage(path) {
  const { res, text } = await fetchText(path);
  const id = path === '/' ? 'home' : path.replace(/\//g, '_').replace(/^_|_$/g, '');

  if (!res.ok) {
    fail(`page.${id}.status`, `${path} returned ${res.status}`);
    return;
  }
  pass(`page.${id}.status`, `${path} returned ${res.status}`);

  const title = extractTitle(text);
  if (!title || title.length < 10) fail(`page.${id}.title`, `${path} missing or short <title>`);
  else if (title.length > 70) warn(`page.${id}.title`, `${path} title is long (${title.length} chars)`, title);
  else pass(`page.${id}.title`, `${path} has a title`, title);

  const description = extractMeta(text, 'description');
  if (!description || description.length < 50) {
    fail(`page.${id}.description`, `${path} missing or short meta description`);
  } else if (description.length > 170) {
    warn(`page.${id}.description`, `${path} description is long (${description.length})`);
  } else {
    pass(`page.${id}.description`, `${path} has meta description`);
  }

  const robots = extractMeta(text, 'robots');
  if (robots && /noindex/i.test(robots)) {
    fail(`page.${id}.robots`, `${path} is noindex`, robots);
  } else {
    pass(`page.${id}.robots`, `${path} is indexable`, robots || 'default');
  }

  const canonical = extractCanonical(text);
  if (!canonical) {
    fail(`page.${id}.canonical`, `${path} missing canonical link`);
  } else if (!/^https?:\/\//i.test(canonical)) {
    fail(`page.${id}.canonical`, `${path} canonical is not absolute`, canonical);
  } else {
    try {
      const canPath = normalizePath(new URL(canonical).pathname);
      const expected = normalizePath(path);
      if (canPath !== expected) {
        fail(
          `page.${id}.canonical`,
          `${path} canonical path mismatch (expected ${expected})`,
          canonical
        );
      } else {
        pass(`page.${id}.canonical`, `${path} has matching canonical`, canonical);
      }
    } catch {
      fail(`page.${id}.canonical`, `${path} canonical is not a valid URL`, canonical);
    }
  }

  const ogTitle = extractMeta(text, 'og:title');
  const ogImage = extractMeta(text, 'og:image');
  if (!ogTitle) fail(`page.${id}.og:title`, `${path} missing og:title`);
  else pass(`page.${id}.og:title`, `${path} has og:title`);
  if (!ogImage) fail(`page.${id}.og:image`, `${path} missing og:image`);
  else pass(`page.${id}.og:image`, `${path} has og:image`);

  const twCard = extractMeta(text, 'twitter:card');
  if (!twCard) warn(`page.${id}.twitter`, `${path} missing twitter:card`);
  else pass(`page.${id}.twitter`, `${path} has twitter:card`, twCard);

  if (!hasLang(text)) fail(`page.${id}.lang`, `${path} <html> missing lang attribute`);
  else pass(`page.${id}.lang`, `${path} has html lang`);

  const h1 = countH1(text);
  if (h1 === 0) fail(`page.${id}.h1`, `${path} has no <h1>`);
  else if (h1 > 1) warn(`page.${id}.h1`, `${path} has ${h1} <h1> elements (prefer one)`);
  else pass(`page.${id}.h1`, `${path} has a single <h1>`);

  const jsonLd = extractJsonLd(text);
  if (jsonLd.length === 0) {
    if (path === '/') fail(`page.${id}.jsonld`, 'Homepage missing JSON-LD');
    else warn(`page.${id}.jsonld`, `${path} has no JSON-LD`);
  } else if (jsonLd.some((b) => b.parseError)) {
    fail(`page.${id}.jsonld`, `${path} has invalid JSON-LD`);
  } else {
    pass(`page.${id}.jsonld`, `${path} has ${jsonLd.length} JSON-LD block(s)`);
  }

  if (!extractMeta(text, 'viewport')) warn(`page.${id}.viewport`, `${path} missing viewport meta`);
  else pass(`page.${id}.viewport`, `${path} has viewport meta`);
}

async function auditHeaders() {
  const { res } = await fetchText('/');
  const h = res.headers;
  const checks = [
    ['x-content-type-options', /nosniff/i],
    ['x-frame-options', /.+/],
    ['referrer-policy', /.+/],
  ];
  for (const [name, re] of checks) {
    const value = h.get(name);
    if (!value || !re.test(value)) warn(`header.${name}`, `Missing or weak ${name}`, value || '');
    else pass(`header.${name}`, `${name}: ${value}`);
  }
}

async function auditSitemapCoverage(locs) {
  if (!locs.length) return;
  for (const path of SAMPLE_PATHS) {
    const match = locs.some((loc) => {
      try {
        const u = new URL(loc);
        const p = normalizePath(u.pathname);
        return p === normalizePath(path);
      } catch {
        return false;
      }
    });
    if (match) pass(`coverage.${path}`, `Sitemap includes ${path}`);
    else fail(`coverage.${path}`, `Sitemap missing ${path}`);
  }
}

async function main() {
  console.log(`\nTechnical SEO audit → ${origin}\n`);

  try {
    await auditRobots();
    const locs = await auditSitemap();
    await auditSitemapCoverage(locs);
    await auditHeaders();
    for (const path of SAMPLE_PATHS) {
      await auditPage(path);
    }
  } catch (error) {
    fail('audit.error', 'Audit aborted', error instanceof Error ? error.message : String(error));
  }

  const failed = results.filter((r) => !r.ok);
  const warned = results.filter((r) => r.ok && r.warn);
  const passed = results.filter((r) => r.ok && !r.warn);

  for (const r of results) {
    const tag = !r.ok ? 'FAIL' : r.warn ? 'WARN' : 'PASS';
    const line = `[${tag}] ${r.id}: ${r.message}`;
    console.log(r.detail ? `${line} — ${r.detail}` : line);
  }

  console.log(
    `\nSummary: ${passed.length} passed, ${warned.length} warnings, ${failed.length} failed\n`
  );

  if (failed.length) {
    process.exitCode = 1;
  }
}

main();
