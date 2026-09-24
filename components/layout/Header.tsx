'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-steel-700 bg-steel-950/85 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-steel-950"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg text-steel-100">
          <Zap className="h-5 w-5 text-cyan-400" aria-hidden />
          ELSIM<span className="text-cyan-400">.</span>ENGINEERING
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm text-steel-300 transition-colors hover:text-cyan-400',
                pathname === item.href && 'text-cyan-400'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/quotation" size="sm">
            Request a quote
          </Button>
        </nav>

        <button
          className="rounded-sm p-2 text-steel-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-steel-700 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-steel-200 hover:text-cyan-400"
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/quotation" size="sm" onClick={() => setOpen(false)}>
                Request a quote
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
