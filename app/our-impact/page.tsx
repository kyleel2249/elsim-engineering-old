import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { SiteImage } from '@/components/media/SiteImage';
import { StatCounter } from '@/components/motion/StatCounter';
import { company } from '@/lib/data/company';
import { media } from '@/lib/data/media';
import { getPublishedProjects } from '@/lib/data/projects';
import { services } from '@/lib/data/services';
import { pageOpenGraph } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'Verified engineering experience across Ghana and West Africa — projects delivered, countries served and the standards behind the work.',
  ...pageOpenGraph({
    title: 'Our Impact — ELSIM Engineering',
    description:
      'Verified engineering experience across Ghana and West Africa — projects delivered, countries served and the standards behind the work.',
    path: '/our-impact',
    image: media.work.machineHallOverview,
  }),
};

export default function OurImpactPage() {
  const projects = getPublishedProjects();
  const projectCount = projects.length;

  const sectorCounts = projects.reduce<Record<string, number>>((acc, project) => {
    acc[project.sector] = (acc[project.sector] ?? 0) + 1;
    return acc;
  }, {});

  const sectorLabels: Record<string, string> = {
    'public-sector': 'Public sector',
    industrial: 'Industrial',
    residential: 'Residential',
    construction: 'Construction',
    commercial: 'Commercial',
  };

  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Power · People · Progress"
          title="Our Impact"
          lede="Verified project experience across Ghana and West Africa — the work on record, not projected figures."
        />

        <Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <StatCounter value={company.stats.projectsOnRecord} suffix="+" label="Projects on record" />
            <StatCounter value={company.regions.length} label="Countries with delivered work" />
            <StatCounter value={services.length} label="Service lines" />
          </div>
        </Reveal>

        <Reveal>
          <figure
            className="relative mt-14 overflow-hidden rounded border"
            style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg-muted)' }}
          >
            <div
              className="relative flex items-center justify-center p-2 sm:p-4"
              style={{ backgroundColor: 'var(--theme-surface)' }}
            >
              <SiteImage
                src={media.infrastructure.electricalPole.src}
                alt={media.infrastructure.electricalPole.alt}
                width={1200}
                height={800}
                className="h-auto w-full max-h-[70vh] object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
                quality={85}
                fallbackLabel="Distribution infrastructure"
                showSkeleton={false}
              />
            </div>
          </figure>
        </Reveal>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            Where the work has been delivered
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
            ELSIM operates from Accra, Ghana. Delivered project experience — not permanent offices —
            extends to {company.regions.slice(1, -1).join(', ')} and {company.regions.slice(-1)}.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {company.regions.map((region) => (
              <li
                key={region}
                className="rounded-full border px-3.5 py-1.5 text-xs font-semibold"
                style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
              >
                {region}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            The kind of work on record
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
            A breakdown of the {projectCount} published project records by sector.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {Object.entries(sectorCounts).map(([sector, count]) => (
              <Reveal key={sector}>
                <div
                  className="flex items-center justify-between rounded border px-5 py-4"
                  style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                    {sectorLabels[sector] ?? sector}
                  </span>
                  <span className="font-display text-lg font-bold text-accent">{count}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            What the work is measured against
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
            Every engagement is expected to hold to the same standard, regardless of scale.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.values.map((value, i) => (
              <Reveal key={value.id} delay={i * 60}>
                <div
                  className="h-full rounded border p-5"
                  style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}
                >
                  <h3 className="font-display text-sm font-semibold text-accent">{value.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center rounded bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all hover:brightness-110"
          >
            See the projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded border px-5 py-2.5 text-sm font-medium transition-colors"
            style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
