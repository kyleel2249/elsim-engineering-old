import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { LegalDocument } from '@/components/layout/LegalDocument';
import { privacySections, legalLastUpdated } from '@/lib/data/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How ELSIM Engineering collects, uses, shares and retains information submitted through this website.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Legal"
          title="Privacy policy"
          lede="What we collect through this site, why we collect it, and what you can ask us to do about it."
        />
        <LegalDocument sections={privacySections} lastUpdated={legalLastUpdated} />
      </div>
    </div>
  );
}
