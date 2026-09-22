import type { ReactNode } from 'react';

/**
 * Shared page masthead. Keeps the eyebrow / title / lede rhythm consistent
 * across every interior page instead of repeating it in each file.
 *
 * Heading order is intentional: one <h1> per page, then section <h2>/<h3>
 * in document order. The eyebrow is a <span> with .label-technical — not a
 * heading — so crawlers do not treat it as a skipped level.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <p>
        <span className="label-technical text-accent">{eyebrow}</span>
      </p>
      <h1
        className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        style={{ color: 'var(--theme-text)' }}
      >
        {title}
      </h1>
      {lede && (
        <p className="mt-4 text-lg leading-relaxed text-pretty" style={{ color: 'var(--theme-text-muted)' }}>
          {lede}
        </p>
      )}
      {children}
    </header>
  );
}
