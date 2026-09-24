import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { company } from '@/lib/data/company';
import { media } from '@/lib/data/media';
import { pageOpenGraph } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Maintenance',
  description:
    'ELSIM Engineering planned and emergency electrical maintenance for commercial and industrial sites in Ghana.',
  ...pageOpenGraph({
    title: 'Maintenance — ELSIM Engineering',
    description:
      'Planned and emergency electrical maintenance for commercial and industrial sites in Ghana.',
    path: '/maintenance',
    image: media.work.cableCoilTransport,
  }),
};

const points = [
  {
    title: 'Planned maintenance',
    body: 'Scheduled inspections, thermal imaging, and corrective work timed around your operations so downtime stays controlled.',
  },
  {
    title: 'Emergency call-outs',
    body: 'Rapid response for fault finding, isolation, and temporary restoration while a permanent fix is prepared.',
  },
  {
    title: 'Asset records',
    body: 'Clear documentation of findings, test results and recommendations so your facilities team has an audit trail.',
  },
];

export default function MaintenancePage() {
  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Maintenance"
          title="Keep systems safe and available"
          lede="ELSIM supports planned and reactive electrical maintenance for commercial and industrial facilities across Ghana."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 70}>
              <div
                className="rounded border p-5"
                style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}
              >
                <h2 className="font-display text-base font-semibold" style={{ color: 'var(--theme-text)' }}>
                  {point.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <div
            className="mt-12 rounded border p-6 sm:p-8"
            style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}
          >
            <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
              Request a maintenance visit
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
              Tell us about the site, the systems involved and whether the work is planned or urgent. We will
              confirm availability and next steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/quotation"
                className="inline-flex items-center rounded bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all hover:brightness-110"
              >
                Request a quote
              </Link>
              <a
                href={`tel:${company.phones[0].tel}`}
                className="text-sm font-medium text-accent"
              >
                Or call {company.phones[0].display}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
