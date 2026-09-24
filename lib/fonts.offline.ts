/**
 * Offline fallback for lib/fonts.ts.
 *
 * Aliased in place of lib/fonts.ts when OFFLINE_FONTS=1, so a build can
 * complete with no network access to Google Fonts. The exports mirror
 * lib/fonts.ts. The system stacks are attached to the SAME CSS variable
 * names (--font-display / --font-body / --font-mono) that Tailwind's
 * font-display / font-body / font-mono families read, so the whole site
 * keeps rendering; only the resolved typeface differs.
 */

const SANS = 'ui-sans-serif, system-ui, "Segoe UI", Roboto, Arial, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export const display = { variable: 'font-display-offline', style: { fontFamily: SANS } };
export const body = { variable: 'font-body-offline', style: { fontFamily: SANS } };
export const mono = { variable: 'font-mono-offline', style: { fontFamily: MONO } };

export const fontVariables = 'font-display-offline font-body-offline font-mono-offline';
