# Cloudflare Pages deployment

## Build settings

In the Cloudflare Pages dashboard, **Settings → Builds & deployments**:

| Field | Value |
|---|---|
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `out` |
| | |
| Root directory | *(leave empty)* |
| Node version | `20` (set `NODE_VERSION=20` in environment variables) |

`npm run build` is safe to use here: it detects Cloudflare Pages (the platform
sets `CF_PAGES=1`) and automatically produces a static export into `out/`.
Off-platform the same command produces a normal Next server build. `npm run
build:cf` forces the export explicitly if you prefer to pin it.

> If the build log ends with `Error: Output directory "out" not found`, the
> project is on an older revision where `npm run build` did not detect Pages.
> Either redeploy the latest `main`, or set the build command to
> `npm run build:cf`.

## Environment variables

Set these under **Settings → Environment variables**, for Production and
Preview separately:

| Key | Production | Preview |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://elsimengineeringlimited.com` | the preview URL |
| `NEXT_PUBLIC_SITE_INDEXABLE` | `true` | `false` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-E8Z0XCC54Q` | *(leave empty)* |
| `NODE_VERSION` | `20` | `20` |

Setting `NEXT_PUBLIC_SITE_INDEXABLE=false` on Preview is what stops staging
deployments competing with production in search results. It is the correct
replacement for the blanket `disallow: /` this project previously shipped.

## How the static build works

`output: 'export'` cannot build route handlers, so the quotation API at
`app/api/quotation/route.ts` cannot be part of a Pages build.

The build script **does not delete it**. `scripts/prepare-static-export.mjs`:

1. Moves `app/api` to `.api-stash/`
2. Runs `next build` with `CF_PAGES_STATIC=1`
3. Moves `app/api` back — including on failure, `Ctrl-C`, or an uncaught error

This replaces the previous `rm -rf app/api`, which destroyed the endpoint on
every build and only worked on a Unix shell. The new script runs identically on
Windows, macOS and Linux.

## What this means for the quotation form

On a static deployment there is no `/api/quotation` endpoint. The form detects
this (the response is not JSON), and instead of failing it offers a prefilled
email handoff plus the office telephone number. No enquiry is lost.

To run the API for real, deploy to a target that supports Next route handlers
(Cloudflare Workers with `@cloudflare/next-on-pages`, Vercel, or a Node host)
and use `npm run build` instead.

## Offline / air-gapped builds

`next/font/google` fetches font CSS at build time, so a Google Fonts outage
fails the build. If that happens:

```bash
npm run build:cf:offline
```

This aliases `lib/fonts.ts` to `lib/fonts.offline.ts` and builds on a system
font stack. Everything else is identical.

## Headers

`output: 'export'` ignores the `headers()` block in `next.config.js`. The
equivalent security and caching policy is declared in `public/_headers`, which
Cloudflare Pages reads directly.

## Troubleshooting

**Build succeeds but the site looks unstyled.** Check that the deployment is
building the latest `main`. A stale commit that predates the Tailwind palette
merge will compile utility classes that no longer resolve.

**Images 404.** Confirm `public/assets/elsim/` was committed. It is a large
directory of binaries; a `.gitignore` rule for `*.png` would silently drop it.

**Fonts fail to fetch.** Use `npm run build:cf:offline` as above.
