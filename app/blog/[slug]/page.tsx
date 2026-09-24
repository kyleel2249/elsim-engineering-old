import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getPostBySlug,
  getAllPostSlugs,
  getPublishedPosts,
  postImageAbsoluteUrl,
} from '@/lib/data/blog';
import { formatDate } from '@/lib/utils';
import { siteUrl } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { SiteImage } from '@/components/media/SiteImage';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Article not found', robots: { index: false, follow: false } };

  const url = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = postImageAbsoluteUrl(post, siteUrl);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'ELSIM Engineering',
      locale: 'en_GH',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.keywords,
      images: [
        {
          url: imageUrl,
          width: post.image.width,
          height: post.image.height,
          alt: post.image.alt,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: imageUrl,
          width: post.image.width,
          height: post.image.height,
          alt: post.image.alt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const imageUrl = postImageAbsoluteUrl(post, siteUrl);
  const pageUrl = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ELSIM Engineering',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    inLanguage: 'en-GH',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2" style={{ color: 'var(--theme-text-subtle)' }}>
            <li>
              <Link href="/" className="link-underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="link-underline">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="truncate" style={{ color: 'var(--theme-text)' }}>
              {post.title}
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="font-semibold uppercase tracking-wider text-accent">
              {post.category}
            </span>
            <time dateTime={post.publishedAt} style={{ color: 'var(--theme-text-subtle)' }}>
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span style={{ color: 'var(--theme-text-subtle)' }}>
                Updated {formatDate(post.updatedAt)}
              </span>
            )}
            <span style={{ color: 'var(--theme-text-subtle)' }}>{post.author}</span>
          </div>
          <h1
            className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            style={{ color: 'var(--theme-text)' }}
          >
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
            {post.excerpt}
          </p>
        </header>

        <figure
          className="relative mt-10 overflow-hidden rounded border"
          style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg-muted)' }}
        >
          <SiteImage
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            fallbackLabel={post.category}
          />
          <figcaption className="sr-only">{post.image.alt}</figcaption>
        </figure>

        <div className="datum-rule mt-10" aria-hidden />

        <div className="mt-10 space-y-5 leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/quotation"
            className="inline-flex items-center rounded bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all hover:brightness-110"
          >
            Discuss a project with ELSIM
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center rounded border px-5 py-2.5 text-sm font-medium transition-colors"
            style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
          >
            All articles
          </Link>
        </div>

        {related.length > 0 && (
          <Reveal>
            <section className="mt-16">
              <h2
                className="font-display text-xl font-semibold"
                style={{ color: 'var(--theme-text)' }}
              >
                More from the blog
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="lift block h-full overflow-hidden rounded border"
                      style={{
                        borderColor: 'var(--theme-border)',
                        backgroundColor: 'var(--theme-bg-muted)',
                      }}
                    >
                      <div
                        className="relative aspect-[16/10] overflow-hidden"
                        style={{ backgroundColor: 'var(--theme-surface)' }}
                      >
                        <SiteImage
                          src={item.image.src}
                          alt={item.image.alt}
                          width={item.image.width}
                          height={item.image.height}
                          className="h-full w-full object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                          fallbackLabel={item.category}
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-[11px] font-semibold text-accent">{item.category}</span>
                        <h3
                          className="mt-1 font-display text-sm font-semibold"
                          style={{ color: 'var(--theme-text)' }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}
      </article>
    </div>
  );
}
