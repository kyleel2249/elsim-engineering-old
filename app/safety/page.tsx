import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { company } from '@/lib/data/company';
import { media } from '@/lib/data/media';
import { pageOpenGraph } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Safety',
  description:
    'How ELSIM Engineering manages electrical safety on site — isolation, PPE, method statements and incident reporting.',
  ...pageOpenGraph({
    title: 'Safety — ELSIM Engineering',
    description:
      'How ELSIM Engineering manages electrical safety on site — isolation, PPE, method statements and incident reporting.',
    path: '/safety',
    image: media.work.breakerPanelInspection,
  }),
};

const pillars = [
  {
    title: 'Safe systems of work',
    body: 'Method statements and risk assessments before live or high-risk activities. Isolation and lock-out where required.',
  },
  {
    title: 'Competent teams',
    body: 'Work is assigned to people with the right training and supervision for the task, including ECG-licensed external installation work.',
  },
  {
    title: 'Site discipline',
    body: 'PPE, tools and temporary power arrangements are checked. Visitors and subcontractors are briefed before entering active work areas.',
  },
  {
    title: 'Stop-work authority',
    body: 'Anyone on an ELSIM site can pause work if conditions look unsafe. We investigate near-misses and share lessons.',
  },
];

export default function SafetyPage() {
  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Safety"
          title="Safety is non-negotiable"
          lede="Electrical work carries real risk. ELSIM builds every project around controlled methods, competent people and a culture that stops work when something is not right."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <div
                className="rounded border p-5"
                style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}
              >
                <h2 className="font-display text-base font-semibold" style={{ color: 'var(--theme-text)' }}>
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-sm" style={{ color: 'var(--theme-text-subtle)' }}>
          Reporting a hazard on an active ELSIM site? Call {company.phones[0].display}.
        </p>
      </div>
    </div>
  );
}
