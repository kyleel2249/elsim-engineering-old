import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider, themeNoFlashScript } from '@/components/theme/ThemeProvider';
import { PageTransition } from '@/components/motion/PageTransition';
import { BackToTop } from '@/components/motion/BackToTop';
import { fontVariables } from '@/lib/fonts';
import { company } from '@/lib/data/company';
import { media } from '@/lib/data/media';
import { services } from '@/lib/data/services';
import { SITE_KEYWORDS } from '@/lib/seo';
import { siteUrl, isIndexable, GA_MEASUREMENT_ID } from '@/lib/site';
import './globals.css';

const siteTitle =
  'ELSIM Engineering | Electrical Engineering, Solar & Power Distribution in Ghana';
const siteDescription =
  'ELSIM Engineering (www.elsimengineering.com) designs, installs, tests and maintains electrical installations, solar power systems, transformers and power distribution for commercial and industrial clients across Ghana and West Africa.';
const ogDescription =
  'Electrical installations, solar PV, transformer projects, maintenance and consulting across Ghana, Togo, Côte d\'Ivoire and West Africa — ELSIM Engineering.';

/** Fixed, branded card for link previews — see the comment on media.og. */
const socialImage = media.og;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: '/manifest.webmanifest',
  applicationName: 'ELSIM Engineering',
  title: {
    default: siteTitle,
    template: '%s · ELSIM Engineering Ghana',
  },
  description: siteDescription,
  keywords: SITE_KEYWORDS,
  authors: [{ name: company.name, url: siteUrl }],
  creator: company.name,
  publisher: company.name,
  category: 'Engineering',
  classification: 'Electrical engineering services',
  alternates: {
    canonical: '/',
    // Prefer www; apex should redirect to www at the DNS/host layer.
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: siteTitle,
    description: ogDescription,
    url: siteUrl,
    siteName: 'ELSIM Engineering',
    locale: 'en_GH',
    type: 'website',
    images: [
      {
        url: socialImage.src,
        width: socialImage.width,
        height: socialImage.height,
        alt: socialImage.alt,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: ogDescription,
    images: [
      {
        url: socialImage.src,
        width: socialImage.width,
        height: socialImage.height,
        alt: socialImage.alt,
      },
    ],
  },
  formatDetection: { telephone: true, address: true, email: true },
  robots: isIndexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

/**
 * Optimized JSON-LD graph for search engines and AI crawlers.
 * Uses @graph so Organization and WebSite are linked as discrete entities
 * with stable @id references.
 */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      additionalType: 'https://schema.org/EngineeringBusiness',
      '@id': organizationId,
      name: 'ELSIM Engineering',
      legalName: company.legalName,
      alternateName: [
        'ELSIM Engineering Firm',
        'ELSIM Engineering Firm Ltd',
        'elsimengineering.com',
        'www.elsimengineering.com',
      ],
      description:
        'Premium electrical, energy, and technical engineering services in Ghana and West Africa — installations, solar, power distribution, maintenance and consulting.',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        '@id': `${siteUrl}/#logo`,
        url: `${siteUrl}${media.logo.src}`,
        caption: company.name,
      },
      image: {
        '@type': 'ImageObject',
        url: `${siteUrl}${socialImage.src}`,
        width: socialImage.width,
        height: socialImage.height,
      },
      email: company.email,
      telephone: company.phones.map((p) => p.tel),
      slogan: company.tagline,
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.address.line1,
        addressLocality: company.address.city,
        addressRegion: 'Greater Accra',
        addressCountry: 'GH',
      },
      areaServed: company.regions.map((name) => ({
        '@type': 'Country',
        name,
      })),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: company.email,
          telephone: company.phones[0]?.tel,
          areaServed: company.regions,
          availableLanguage: ['en'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          url: `${siteUrl}/quotation/`,
          email: company.email,
          telephone: company.phones[0]?.tel,
          areaServed: company.regions,
          availableLanguage: ['en'],
        },
      ],
      sameAs: [
        company.socials.linkedin,
        company.socials.facebook,
        company.socials.tiktok,
      ],
      knowsAbout: [
        'Electrical Engineering',
        'Solar Power Grid Systems',
        'Industrial Infrastructure',
        'Power distribution and transformers',
        'Electrical inspection and maintenance',
        'Electrical consulting and audits',
        ...services.map((s) => s.title),
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'ELSIM Engineering services',
        itemListElement: services.map((service, index) => ({
          '@type': 'OfferCatalog',
          name: service.title,
          position: index + 1,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service.title,
                description: service.shortDescription,
                url: `${siteUrl}/services/${service.slug}/`,
                provider: { '@id': organizationId },
                areaServed: company.regions.map((name) => ({
                  '@type': 'Country',
                  name,
                })),
              },
            },
          ],
        })),
      },
      priceRange: '$$',
      foundingLocation: {
        '@type': 'Place',
        name: 'Accra, Ghana',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Accra',
          addressRegion: 'Greater Accra',
          addressCountry: 'GH',
        },
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteUrl,
      name: 'ELSIM Engineering',
      alternateName: 'www.elsimengineering.com',
      description: siteDescription,
      publisher: { '@id': organizationId },
      inLanguage: 'en-GH',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/services/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint so the page never flashes. */}
        <script
          dangerouslySetInnerHTML={{ __html: themeNoFlashScript }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-screen font-body antialiased">
        <ThemeProvider>
          <Header />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
