# Technical SEO audit — ELSIM Engineering

Automated checks for crawlability, metadata, structured data and security headers.

## Run locally

```bash
# Against the Cloudflare Pages deployment (default)
npm run seo:audit

# Against production (after DNS points at Pages)
npm run seo:audit -- https://www.elsimengineering.com
```

Exit code `1` means one or more checks failed.

## What is checked

| Area | Checks |
|------|--------|
| **robots.txt** | Reachable, allows crawl, declares sitemap, AI bot rules |
| **sitemap.xml** | Reachable, valid urlset, public hosts, key routes listed |
| **Pages** (`/`, services, projects, blog, about, contact, quotation) | Status 200, title, description, robots, canonical, Open Graph, Twitter card, `html[lang]`, single `h1`, JSON-LD |
| **Headers** | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` |

## Manual checklist (outside the script)

1. **DNS** — `www.elsimengineering.com` and apex serve Cloudflare Pages (not Namecheap parking).
2. **HTTPS** — Valid certificate for the custom domain; no mixed content.
3. **Host preference** — Apex redirects to `www` (or the reverse), one canonical host only.
4. **Search Console** — Property verified; `sitemap.xml` submitted; no “couldn’t fetch” errors.
5. **Core Web Vitals** — Field data in Search Console / CrUX after traffic accumulates.
6. **Mobile** — Viewport present (script-checked); test key templates on a phone.
7. **Index coverage** — No accidental `noindex` on production (`NEXT_PUBLIC_SITE_INDEXABLE` not `false`).

## Interpreting failures

- **robots / sitemap fail on the custom domain only** — DNS or SSL is not pointing at Pages yet. Compare with `https://elsim-engineering.pages.dev`.
- **canonical host mismatch** — Set `NEXT_PUBLIC_SITE_URL=https://www.elsimengineering.com` in Pages env and redeploy.
- **missing og:image on a page** — That route’s metadata must spread `pageOpenGraph()` from `lib/seo.ts` so images are not dropped.

## CI (optional)

```yaml
- run: npm run seo:audit -- https://elsim-engineering.pages.dev
```

Run after deploy, not against `localhost`, so the audit hits the same HTML Google receives.
