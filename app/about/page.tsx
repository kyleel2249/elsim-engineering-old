import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'About',
  description: 'About ELSIM Engineering and the current status of this provisional site.'
};

const STATUS_ROWS: { item: string; status: 'done' | 'missing' | 'partial'; note: string }[] = [
  { item: 'Core architecture', status: 'done', note: 'Next.js App Router, TypeScript, Tailwind' },
  { item: 'Windows / npm compatibility', status: 'done', note: 'LF line endings, engines pinned' },
  { item: 'Quotation form + API', status: 'done', note: 'Zod validation, rate limit, local store' },
  { item: 'Service & project detail routes', status: 'done', note: 'generateStaticParams + specs' },
  { item: 'SEO (sitemap + robots)', status: 'done', note: 'Crawl allowed; domain via SITE_URL' },
  { item: '3D hero + service orbs', status: 'done', note: 'Reduced-motion fallbacks' },
  { item: 'Official logo / brand colours', status: 'missing', note: 'Awaiting ELSIM assets' },
  { item: 'Verified contact details', status: 'missing', note: 'Address, phone, email pending' },
  { item: 'Approved project photography', status: 'missing', note: 'Placeholders in use' },
  { item: 'Leadership bios', status: 'missing', note: 'Publication permission needed' }
];

const tone: Record<'done' | 'missing' | 'partial', 'cyan' | 'copper' | 'default'> = {
  done: 'cyan',
  missing: 'copper',
  partial: 'default'
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Badge tone="copper">About</Badge>
      <h1 className="mt-4 font-display text-4xl text-steel-100">ELSIM Engineering</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
        Electrical, structural and mechanical engineering services for commercial and industrial
        clients in Ghana. This site is a provisional production-ready build — several content and
        brand items still need management approval before a public launch.
      </p>

      <h2 id="status" className="mt-14 font-display text-2xl text-steel-100">
        Project status
      </h2>
      <p className="mt-2 text-sm text-steel-400">
        What is already in the codebase versus what still needs ELSIM input.
      </p>

      <ul className="mt-8 divide-y divide-steel-800 border border-steel-700">
        {STATUS_ROWS.map((row) => (
          <li key={row.item} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-steel-100">{row.item}</div>
              <div className="mt-0.5 text-xs text-steel-500">{row.note}</div>
            </div>
            <Badge tone={tone[row.status]}>{row.status}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
