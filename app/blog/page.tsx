import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { SiteImage } from '@/components/media/SiteImage';
import { getPublishedPosts } from '@/lib/data/blog';
import { formatDate } from '@/lib/utils';
import { siteUrl } from '@/lib/site';
import { media } from '@/lib/data/media';
import { pageOpenGraph } from '@/lib/seo';

const blogTitle = 'Blog — Electrical & energy engineering insights';
const blogDescription =
  'Articles from ELSIM Engineering on transformer installation, electrical safety, industrial solar and planned maintenance across Ghana and West Africa.';

export const metadata: Metadata = {
  title: 'Blog',
  description: blogDescription,
  keywords: [
    'electrical engineering blog Ghana',
    'transformer installation',
    'solar PV industrial',
    'electrical safety',
    'electrical maintenance',
    'ELSIM Engineering',
  ],
  // Canonical comes from pageOpenGraph (do not set alternates twice — TS build error).
  ...pageOpenGraph({
    title: blogTitle,
    description: blogDescription,
    path: '/blog/',
    image: media.work.transformerKioskInstallation,
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ELSIM Engineering Blog',
    description: blogDescription,
    url: `${siteUrl}/blog/`,
    publisher: {
      '@type': 'Organization',
      name: 'ELSIM Engineering',
      url: siteUrl,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      url: `${siteUrl}/blog/${post.slug}/`,
      image: `${siteUrl}${post.image.src}`,
      author: { '@type': 'Organization', name: post.author },
    })),
  };

  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Insights"
          title="Blog"
          lede="Practical notes on electrical and energy engineering — from transformer planning and live-site safety to solar and planned maintenance."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60} as="li">
              <article
                className="lift flex h-full flex-col overflow-hidden rounded border"
                style={{
                  borderColor: 'var(--theme-border)',
                  backgroundColor: 'var(--theme-surface)',
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/9] overflow-hidden"
                  style={{ backgroundColor: 'var(--theme-bg-muted)' }}
                  aria-label={post.title}
                >
                  <SiteImage
                    src={post.image.src}
                    alt={post.image.alt}
                    width={post.image.width}
                    height={post.image.height}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    fallbackLabel={post.category}
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-accent">
                      {post.category}
                    </span>
                    <time
                      dateTime={post.publishedAt}
                      style={{ color: 'var(--theme-text-subtle)' }}
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  <h2
                    className="mt-3 font-display text-xl font-semibold tracking-tight"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p
                    className="mt-3 flex-1 text-sm leading-relaxed"
                    style={{ color: 'var(--theme-text-muted)' }}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="link-underline mt-5 inline-block text-sm font-semibold text-accent"
                  >
                    Read article
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {posts.length === 0 && (
          <p className="mt-12 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
            New articles will appear here as they are published.
          </p>
        )}

        <div
          className="mt-16 rounded border p-6 text-center sm:p-8"
          style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg-muted)' }}
        >
          <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: 'var(--theme-text-muted)' }}>
            Tell us the location, the load and your timeline. We will come back with an approach.
          </p>
          <Link
            href="/quotation"
            className="mt-6 inline-flex items-center rounded bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all hover:brightness-110"
          >
            Request a consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
