import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_URL } from '@/lib/site';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.json',
  title: {
    default: 'ELSIM Engineering — Electrical, Structural & Mechanical Services',
    template: '%s · ELSIM Engineering'
  },
  description:
    'ELSIM Engineering delivers electrical, structural, mechanical and power-systems services for commercial and industrial clients in Ghana.',
  openGraph: {
    title: 'ELSIM Engineering',
    description:
      'Electrical, structural, mechanical and power-systems engineering services in Ghana.',
    url: SITE_URL,
    siteName: 'ELSIM Engineering',
    locale: 'en_GH',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: '#070B14'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen bg-steel-950 font-body text-steel-100 antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
