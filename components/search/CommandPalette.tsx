'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search } from 'lucide-react';
import { services } from '@/lib/data/services';
import { getPublishedProjects } from '@/lib/data/projects';
import { getPublishedPosts } from '@/lib/data/blog';
import { cn } from '@/lib/utils';

interface Entry {
  id: string;
  title: string;
  subtitle: string;
  group: 'Pages' | 'Services' | 'Projects' | 'Blog';
  href: string;
  /** Extra text matched against the query but not displayed. */
  keywords: string;
}

const PAGES: Entry[] = [
  { id: 'p-home', title: 'Home', subtitle: 'ELSIM Engineering', group: 'Pages', href: '/', keywords: 'start index' },
  { id: 'p-about', title: 'About', subtitle: 'Vision, mission, values, leadership', group: 'Pages', href: '/about', keywords: 'company team who' },
  { id: 'p-impact', title: 'Our Impact', subtitle: 'Power, people, progress', group: 'Pages', href: '/our-impact', keywords: 'impact stats regions countries' },
  { id: 'p-services', title: 'Services', subtitle: 'What our teams deliver', group: 'Pages', href: '/services', keywords: 'capabilities offering' },
  { id: 'p-projects', title: 'Projects', subtitle: 'Delivered across West Africa', group: 'Pages', href: '/projects', keywords: 'portfolio work case study' },
  { id: 'p-blog', title: 'Blog', subtitle: 'Insights and field notes', group: 'Pages', href: '/blog', keywords: 'articles news insights posts' },
  { id: 'p-safety', title: 'Safety & Quality', subtitle: 'How we work safely', group: 'Pages', href: '/safety', keywords: 'hse standards compliance risk' },
  { id: 'p-maintenance', title: 'Maintenance Support', subtitle: 'Planned and reactive cover', group: 'Pages', href: '/maintenance', keywords: 'servicing contract callout' },
  { id: 'p-quotation', title: 'Request a quotation', subtitle: 'Start a project enquiry', group: 'Pages', href: '/quotation', keywords: 'quote enquiry estimate price consultation' },
  { id: 'p-contact', title: 'Contact', subtitle: 'Accra, Ghana', group: 'Pages', href: '/contact', keywords: 'phone address reach email' },
];

/** Case- and accent-insensitive substring match. */
function normalise(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const entries = useMemo<Entry[]>(() => {
    const serviceEntries: Entry[] = services.map((s) => ({
      id: `s-${s.slug}`,
      title: s.name,
      subtitle: s.shortDescription,
      group: 'Services',
      href: `/services/${s.slug}`,
      keywords: [s.slug, ...s.capabilities].join(' '),
    }));

    const projectEntries: Entry[] = getPublishedProjects().map((p) => ({
      id: `pr-${p.slug}`,
      title: p.title,
      subtitle: p.location,
      group: 'Projects',
      href: `/projects/${p.slug}`,
      keywords: [p.slug, p.sector, p.location, p.year, p.client ?? ''].join(' '),
    }));

    const blogEntries: Entry[] = getPublishedPosts().map((post) => ({
      id: `b-${post.slug}`,
      title: post.title,
      subtitle: post.category,
      group: 'Blog',
      href: `/blog/${post.slug}`,
      keywords: [post.slug, post.excerpt, post.category].join(' '),
    }));

    return [...PAGES, ...serviceEntries, ...projectEntries, ...blogEntries];
  }, []);

  const results = useMemo(() => {
    const q = normalise(query.trim());
    if (!q) return entries.slice(0, 8);
    const terms = q.split(/\s+/);
    return entries
      .filter((entry) => {
        const haystack = normalise(
          `${entry.title} ${entry.subtitle} ${entry.group} ${entry.keywords}`
        );
        return terms.every((term) => haystack.includes(term));
      })
      .slice(0, 12);
  }, [entries, query]);

  // Global shortcut: Cmd/Ctrl + K, and "/" when not already typing.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (event.key === '/' && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Reset and focus on open; lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const go = useCallback(
    (entry: Entry) => {
      setOpen(false);
      router.push(entry.href);
    },
    [router]
  );

  function onInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!results.length) return;
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const next = (active + delta + results.length) % results.length;
      setActive(next);
      listRef.current
        ?.querySelectorAll('[data-option]')
        [next]?.scrollIntoView({ block: 'nearest' });
      return;
    }
    if (event.key === 'Enter' && results[active]) {
      event.preventDefault();
      go(results[active]);
    }
  }

  let lastGroup: string | null = null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded border px-2.5 text-sm transition-colors"
        style={{
          borderColor: 'var(--theme-border)',
          backgroundColor: 'var(--theme-surface)',
          color: 'var(--theme-text-muted)',
        }}
        aria-label="Search the site"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span className="hidden lg:inline text-xs">Search</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search ELSIM Engineering"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-lg border shadow-panel-lg"
              style={{
                borderColor: 'var(--theme-border)',
                backgroundColor: 'var(--theme-surface-raised)',
              }}
            >
              <div
                className="flex items-center gap-3 border-b px-4"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search services, projects, blog and pages"
                  aria-label="Search services, projects, blog and pages"
                  aria-controls="command-results"
                  aria-activedescendant={results[active]?.id}
                  className="w-full bg-transparent py-4 text-sm outline-none"
                  style={{ color: 'var(--theme-text)' }}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              <ul
                ref={listRef}
                id="command-results"
                role="listbox"
                aria-label="Results"
                className="max-h-[52vh] overflow-y-auto p-2"
              >
                {results.length === 0 && (
                  <li className="px-3 py-8 text-center text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                    Nothing matched “{query}”. Try a service, a country, or “quotation”.
                  </li>
                )}

                {results.map((entry, index) => {
                  const showGroup = entry.group !== lastGroup;
                  lastGroup = entry.group;
                  const isActive = index === active;

                  return (
                    <li key={entry.id}>
                      {showGroup && (
                        <p
                          className="px-3 pb-1 pt-3 text-[11px] font-medium"
                          style={{ color: 'var(--theme-text-subtle)' }}
                        >
                          {entry.group}
                        </p>
                      )}
                      <button
                        id={entry.id}
                        data-option
                        role="option"
                        aria-selected={isActive}
                        type="button"
                        onMouseEnter={() => setActive(index)}
                        onClick={() => go(entry)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded px-3 py-2.5 text-left transition-colors'
                        )}
                        style={{
                          backgroundColor: isActive ? 'var(--theme-accent-soft)' : 'transparent',
                          color: 'var(--theme-text)',
                        }}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">{entry.title}</span>
                          <span
                            className="block truncate text-xs"
                            style={{ color: 'var(--theme-text-muted)' }}
                          >
                            {entry.subtitle}
                          </span>
                        </span>
                        {isActive && (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div
                className="flex items-center justify-between border-t px-4 py-2.5 text-[11px]"
                style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-subtle)' }}
              >
                <span>Arrow keys to move, Enter to open</span>
                <span>Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
