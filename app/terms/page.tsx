import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { LegalDocument } from '@/components/layout/LegalDocument';
import { termsSections, legalLastUpdated } from '@/lib/data/legal';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms that govern use of the ELSIM Engineering website, including accuracy of content, quotations and liability.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Legal"
          title="Terms of use"
          lede="How this website may be used, and what its content does and does not commit us to."
        />
        <LegalDocument sections={termsSections} lastUpdated={legalLastUpdated} />
      </div>
    </div>
  );
}
