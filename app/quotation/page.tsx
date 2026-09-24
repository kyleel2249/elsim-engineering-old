import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { QuotationForm } from '@/components/forms/QuotationForm';

export const metadata: Metadata = {
  title: 'Request a quote',
  description: 'Request a quotation from ELSIM Engineering.'
};

export default function QuotationPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Badge tone="cyan">Quotation</Badge>
      <h1 className="mt-4 font-display text-4xl text-steel-100">Request a quote</h1>
      <p className="mt-4 text-base leading-relaxed text-steel-300">
        Tell us about the site, the load and the timeline. A reference number is issued on
        submission so you can track the request.
      </p>
      <div className="mt-10">
        <QuotationForm />
      </div>
    </div>
  );
}
