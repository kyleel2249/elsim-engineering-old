'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

type FilterKey = 'all' | string;

/**
 * Filterable project index.
 *
 * Filters by sector and by country, plus a free-text search across
 * title, location, client, scope and description. Counts are shown on each chip so an
 * empty result is predictable before it is selected.
 */
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [sector, setSector] = useState<FilterKey>('all');
  const [country, setCountry] = useState<FilterKey>('all');
  const [query, setQuery] = useState('');

  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) counts.set(p.sector, (counts.get(p.sector) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const countries = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      const name = p.location.includes(',')
        ? p.location.split(',').pop()!.trim()
        : p.location.trim();
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (sector !== 'all' && p.sector !== sector) return false;
      if (country !== 'all' && !p.location.toLowerCase().includes(country.toLowerCase()))
        return false;
      if (!q) return true;
      return [p.title, p.location, p.summary, p.client ?? '', p.sector, ...p.scope]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [projects, sector, country, query]);

  const filtersActive = sector !== 'all' || country !== 'all' || query.trim() !== '';

  function reset() {
    setSector('all');
    setCountry('all');
    setQuery('');
  }

  const label = (value: string) =>
    value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="mt-12">
      {/* Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex min-w-[240px] flex-1 items-center gap-2 rounded border px-3"
          style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}
        >
          <Search className="h-4 w-4 shrink-0" style={{ color: 'var(--theme-text-subtle)' }} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by name, client or place"
            aria-label="Search projects"
            className="w-full bg-transparent py-2.5 text-sm outline-none"
            style={{ color: 'var(--theme-text)' }}
          />
        </div>

        {filtersActive && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded border px-3 py-2.5 text-sm"
            style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Clear filters
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="mt-5 space-y-3">
        <ChipRow
          legend="Sector"
          options={[['all', projects.length], ...sectors]}
          value={sector}
          onChange={setSector}
          format={label}
        />
        <ChipRow
          legend="Country"
          options={[['all', projects.length], ...countries]}
          value={country}
          onChange={setCountry}
          format={(v) => v}
        />
      </div>

      <p className="mt-6 text-sm" style={{ color: 'var(--theme-text-subtle)' }} aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
      </p>

      {/* Results */}
      <motion.div layout className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="lift group flex h-full flex-col rounded border p-5"
                style={{
                  borderColor: 'var(--theme-border)',
                  backgroundColor: 'var(--theme-surface)',
                }}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                    {project.location}
                  </span>
                  <span
                    className="text-[10px] capitalize tracking-wider"
                    style={{ color: 'var(--theme-text-subtle)' }}
                  >
                    {project.sector.replace(/-/g, ' ')}
                  </span>
                </div>

                <h2
                  className="font-display text-base font-semibold transition-colors group-hover:text-accent"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {project.title}
                </h2>

                <p
                  className="mt-2 flex-1 text-sm leading-relaxed"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  {project.summary}
                </p>

                {project.client && project.clientPermission && (
                  <p className="mt-3 text-xs" style={{ color: 'var(--theme-text-subtle)' }}>
                    Client: {project.client}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div
          className="mt-4 rounded border border-dashed p-12 text-center"
          style={{ borderColor: 'var(--theme-border-strong)' }}
        >
          <p style={{ color: 'var(--theme-text-muted)' }}>
            No projects match those filters yet.
          </p>
          <button type="button" onClick={reset} className="mt-3 text-sm font-medium text-accent">
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}

function ChipRow({
  legend,
  options,
  value,
  onChange,
  format,
}: {
  legend: string;
  options: [string, number][];
  value: string;
  onChange: (value: string) => void;
  format: (value: string) => string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Filter by {legend.toLowerCase()}</legend>
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        <span
          className="shrink-0 pr-1 text-xs font-medium"
          style={{ color: 'var(--theme-text-subtle)' }}
          aria-hidden
        >
          {legend}
        </span>
        {options.map(([key, count]) => {
          const selected = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              aria-pressed={selected}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors'
              )}
              style={{
                borderColor: selected ? 'var(--theme-accent)' : 'var(--theme-border)',
                backgroundColor: selected ? 'var(--theme-accent)' : 'var(--theme-surface)',
                color: selected ? 'var(--theme-accent-contrast)' : 'var(--theme-text-muted)',
              }}
            >
              {key === 'all' ? 'All' : format(key)}
              <span className="ml-1.5 opacity-60 tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
