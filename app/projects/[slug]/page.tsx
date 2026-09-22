import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getProjectBySlug, getPublishedProjects } from '@/lib/data/projects';
import { getServiceBySlug } from '@/lib/data/services';
import { getSeoTargetBySlug } from '@/lib/data/seo-master-map';
import { Reveal } from '@/components/motion/Reveal';
import { WorkGallery } from '@/components/media/WorkGallery';
import { getWorkByCategory, media } from '@/lib/data/media';
import { pageOpenGraph } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getPublishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project not found' };

  const seo = getSeoTargetBySlug('project', project.slug);
  const categoryPhotos = getWorkByCategory(project.category);
  const image = categoryPhotos[0] ?? media.work.transformerKioskInstallation;
  const title =
    seo?.metaTitle ?? `${project.title} — ${project.location} | ELSIM Engineering`;
  const description = seo?.metaDescription ?? project.shortDescription;
  const keywords = seo
    ? [seo.primary, ...seo.secondary, ...seo.longTail]
    : [project.title, project.location, 'ELSIM Engineering'];

  return {
    title,
    description,
    keywords,
    ...pageOpenGraph({
      title,
      description,
      path: `/projects/${project.slug}/`,
      image: {
        ...image,
        alt:
          image.alt ||
          seo?.imageAltKeywords[0] ||
          `${project.title} in ${project.location}`,
      },
      type: 'article',
    }),
  };
}

const STATUS_LABEL: Record<string, string> = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  'pending-verification': 'Pending verification',
};

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const seo = getSeoTargetBySlug('project', project.slug);

  const related = getPublishedProjects()
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  const relatedServices = project.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: seo?.h1 ?? project.title,
    description: seo?.metaDescription ?? project.description,
    keywords: seo ? [seo.primary, ...seo.secondary] : undefined,
    locationCreated: { '@type': 'Place', name: project.location },
    creator: { '@type': 'Organization', name: 'ELSIM Engineering' },
  };

  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All projects
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-on-accent"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            {project.location}
          </span>
          <span
            className="rounded-full border px-3 py-1 text-xs font-medium capitalize"
            style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}
          >
            {project.sector.replace(/-/g, ' ')}
          </span>
          <span
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-muted)' }}
          >
            {STATUS_LABEL[project.status] ?? project.status}
          </span>
        </div>

        <h1
          className="mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          style={{ color: 'var(--theme-text)' }}
        >
          {seo?.h1 ?? project.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
          {project.description}
        </p>

        {project.client && project.clientPermission && (
          <p className="mt-6 text-sm" style={{ color: 'var(--theme-text-subtle)' }}>
            Client: <span style={{ color: 'var(--theme-text)' }}>{project.client}</span>
          </p>
        )}

        {project.challenge && (
          <Reveal>
            <section className="mt-12">
              <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                The challenge
              </h2>
              <p className="mt-3 leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                {project.challenge}
              </p>
            </section>
          </Reveal>
        )}

        {project.scope && project.scope.length > 0 && (
          <Reveal>
            <section className="mt-12">
              <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Scope of works
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.scope.map((item) => (
                  <li key={item} className="flex gap-3" style={{ color: 'var(--theme-text-muted)' }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {project.outcomes && project.outcomes.length > 0 && (
          <Reveal>
            <section className="mt-12">
              <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Outcomes
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.outcomes.map((item) => (
                  <li key={item} className="flex gap-3" style={{ color: 'var(--theme-text-muted)' }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {getWorkByCategory(project.category).length > 0 && (
          <Reveal>
            <section className="mt-12">
              <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Field photography
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                Representative photography of ELSIM {project.category.replace(/-/g, ' ')} work — not
                confirmed images of this specific site.
              </p>
              <WorkGallery photos={getWorkByCategory(project.category).slice(0, 8)} className="mt-5" />
            </section>
          </Reveal>
        )}

        {relatedServices.length > 0 && (
          <Reveal>
            <section className="mt-12">
              <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Services applied
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="lift rounded border p-5"
                    style={{
                      borderColor: 'var(--theme-border)',
                      backgroundColor: 'var(--theme-surface)',
                    }}
                  >
                    <h3 className="font-display text-base font-semibold" style={{ color: 'var(--theme-text)' }}>
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                      {service.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {related.length > 0 && (
          <Reveal>
            <section className="mt-16 border-t pt-10" style={{ borderColor: 'var(--theme-border)' }}>
              <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Similar work
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/projects/${item.slug}`}
                    className="lift rounded border p-4"
                    style={{
                      borderColor: 'var(--theme-border)',
                      backgroundColor: 'var(--theme-bg-muted)',
                    }}
                  >
                    <span className="text-[11px] font-semibold text-accent">{item.location}</span>
                    <h3 className="mt-1 font-display text-sm font-semibold" style={{ color: 'var(--theme-text)' }}>
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <div
          className="mt-16 rounded border p-6 sm:p-8"
          style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg-muted)' }}
        >
          <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
            Planning something similar?
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
            Tell us the location and the load, and we will come back with an approach.
          </p>
          <Link
            href="/quotation"
            className="mt-5 inline-flex items-center rounded bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all hover:brightness-110"
          >
            Start an enquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
