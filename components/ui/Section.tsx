import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  sheet: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, sheet, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative border-t border-steel-700 py-20', className)}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4 border-b border-steel-700 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs text-copper-400">SHEET {sheet}</span>
            <h2 className="mt-2 font-display text-3xl text-steel-100 sm:text-4xl">{title}</h2>
          </div>
          {description && (
            <p className="max-w-sm text-sm leading-relaxed text-steel-300">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
