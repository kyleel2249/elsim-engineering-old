import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { services, getServiceBySlug } from '@/lib/data/services';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Badge tone="cyan">Service spec</Badge>
      <h1 className="mt-4 font-display text-4xl text-steel-100">{service.name}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
        {service.description}
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {service.spec.map((row) => (
          <div key={row.label} className="border-l border-steel-700 pl-4">
            <div className="font-mono text-xs uppercase tracking-wide text-steel-500">
              {row.label}
            </div>
            <div className="mt-1 text-sm text-steel-100">{row.value}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-xl text-steel-100">What&apos;s included</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {service.capabilities.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-steel-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-steel-700 pt-10">
        <Button href={`/quotation?service=${service.slug}`}>Request a quote for this</Button>
        <Button href="/services" variant="outline">
          Back to all services
        </Button>
      </div>
    </div>
  );
}
