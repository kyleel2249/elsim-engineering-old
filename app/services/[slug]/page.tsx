import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/data/services';
import { getProjectsByCategory } from '@/lib/data/projects';
import { company } from '@/lib/data/company';
import { getSeoTargetBySlug } from '@/lib/data/seo-master-map';
import { Reveal } from '@/components/motion/Reveal';
import { WorkGallery } from '@/components/media/WorkGallery';
import { getWorkByCategory, media } from '@/lib/data/media';
import { pageOpenGraph, absolutePageUrl } from '@/lib/seo';
import { siteUrl } from '@/lib/site';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Service not found' };

  const seo = getSeoTargetBySlug('service', service.slug);
  const categoryPhotos = getWorkByCategory(service.slug);
  const image = categoryPhotos[0] ?? media.work.panelWiringTeam;
  const title = seo?.metaTitle ?? `${service.title} in Ghana & West Africa | ELSIM Engineering`;
  const description =
    seo?.metaDescription ??
    `${service.shortDescription} Delivered by ELSIM Engineering from Accra across Ghana and West Africa.`;
  const keywords = seo
    ? [seo.primary, ...seo.secondary, ...seo.longTail]
    : [service.title, 'ELSIM Engineering', 'electrical engineering Ghana'];

  const altImage = image.alt
    ? image
    : {
        ...image,
        alt: seo?.imageAltKeywords[0] ?? `${service.title} — ELSIM Engineering Ghana`,
      };

  return {
    title,
    description,
    keywords,
    ...pageOpenGraph({
      title,
      description,
      path: `/services/${service.slug}/`,
      image: altImage,
      type: 'article',
    }),
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const seo = getSeoTargetBySlug('service', service.slug);
  const relatedProjects = getProjectsByCategory(service.slug).slice(0, 3);
  const serviceUrl = absolutePageUrl(`/services/${service.slug}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: seo?.primary ?? service.title,
    alternateName: seo?.secondary.slice(0, 5),
    description: seo?.metaDescription ?? service.shortDescription,
    serviceType: service.title,
    url: serviceUrl,
    provider: {
      '@type': 'ProfessionalService',
      name: 'ELSIM Engineering',
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Accra',
        addressRegion: 'Greater Accra',
        addressCountry: 'GH',
      },
    },
    areaServed: company.regions.map((name) => ({ '@type': 'Country', name })),
    termsOfService: `${siteUrl}/terms/`,
  };

  const faqJsonLd =
    service.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null;

  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2" style={{ color: 'var(--theme-text-subtle)' }}>
            <li>
              <Link href="/" className="link-underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/services" className="link-underline">
                Services
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" style={{ color: 'var(--theme-text)' }}>
              {service.title}
            </li>
          </ol>
        </nav>

        <h1
          className="mt-8 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          style={{ color: 'var(--theme-text)' }}
        >
          {seo?.h1 ?? service.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
          {service.shortDescription}
        </p>

        <div className="datum-rule mt-10" aria-hidden />

        <p className="mt-10 leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
          {service.description}
        </p>

        {service.features.length > 0 && (
          <Reveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                What this covers
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 rounded border p-4 text-sm"
                    style={{
                      borderColor: 'var(--theme-border)',
                      backgroundColor: 'var(--theme-surface)',
                      color: 'var(--theme-text-muted)',
                    }}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {service.process.length > 0 && (
          <Reveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Design, installation, testing and commissioning
              </h2>
              <ol className="mt-5 space-y-0">
                {service.process.map((step, i) => (
                  <li key={step} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums"
                        style={{
                          backgroundColor: 'var(--theme-accent-soft)',
                          color: 'var(--theme-accent)',
                        }}
                      >
                        {i + 1}
                      </span>
                      {i < service.process.length - 1 && (
                        <span
                          className="w-px flex-1"
                          style={{ backgroundColor: 'var(--theme-border)' }}
                          aria-hidden
                        />
                      )}
                    </div>
                    <p className="pb-8 pt-1" style={{ color: 'var(--theme-text-muted)' }}>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
        )}

        {service.safetyNotes.length > 0 && (
          <Reveal>
            <section
              className="mt-8 rounded border-l-4 p-6"
              style={{
                borderColor: 'var(--theme-accent)',
                backgroundColor: 'var(--theme-bg-muted)',
              }}
            >
              <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--theme-text)' }}>
                Electrical safety considerations
              </h2>
              <ul className="mt-3 space-y-2">
                {service.safetyNotes.map((note) => (
                  <li key={note} className="flex gap-2.5 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safety-600" aria-hidden />
                    {note}
                  </li>
                ))}
              </ul>
              <Link href="/safety" className="mt-4 inline-block text-sm font-medium text-accent">
                Read how we manage safety
              </Link>
            </section>
          </Reveal>
        )}

        {service.faq.length > 0 && (
          <Reveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Common questions
              </h2>
              <div className="mt-5 space-y-3">
                {service.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded border p-5"
                    style={{
                      borderColor: 'var(--theme-border)',
                      backgroundColor: 'var(--theme-surface)',
                    }}
                  >
                    <summary
                      className="cursor-pointer list-none font-medium marker:hidden"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      <span className="flex items-center justify-between gap-4">
                        {item.question}
                        <span
                          className="shrink-0 transition-transform duration-200 group-open:rotate-45 text-accent"
                          aria-hidden
                        >
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {getWorkByCategory(service.slug).length > 0 && (
          <Reveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Field photography
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                ELSIM crews carrying out {service.title.toLowerCase()} work across Ghana and West Africa.
              </p>
              <WorkGallery photos={getWorkByCategory(service.slug)} className="mt-5" />
            </section>
          </Reveal>
        )}

        {relatedProjects.length > 0 && (
          <Reveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                Projects using this service
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="lift rounded border p-4"
                    style={{
                      borderColor: 'var(--theme-border)',
                      backgroundColor: 'var(--theme-bg-muted)',
                    }}
                  >
                    <span className="text-[11px] font-semibold text-accent">{project.location}</span>
                    <h3
                      className="mt-1 font-display text-sm font-semibold"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      {project.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/quotation"
            className="inline-flex items-center rounded bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all hover:brightness-110"
          >
            Discuss this with ELSIM
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center rounded border px-5 py-2.5 text-sm font-medium transition-colors"
            style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
          >
            All services
          </Link>
        </div>
      </div>
    </div>
  );
}
