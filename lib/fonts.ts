import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

/**
 * Typeface loading for the ELSIM site.
 *
 * Display: Space Grotesk. Body: IBM Plex Sans. Mono: IBM Plex Mono.
 *
 * `next/font/google` fetches the font CSS at build time, which means a Google
 * Fonts outage — or an air-gapped/offline CI runner — fails the whole build.
 * Setting OFFLINE_FONTS=1 swaps this module for lib/fonts.offline.ts via the
 * webpack alias in next.config.js, so the build still completes on a system
 * font stack. See docs/CLOUDFLARE.md.
 */

export const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
});

export const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
