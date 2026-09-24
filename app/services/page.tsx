import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/lib/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Electrical, structural, mechanical, power-systems, consulting and maintenance services from ELSIM Engineering.'
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Badge tone="copper">Sheet 01 — Services</Badge>
      <h1 className="mt-4 font-display text-4xl text-steel-100 sm:text-5xl">
        Six disciplines, one team.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
        Every engagement is led by an engineer who signs the drawings and stands behind the
        commissioning. Choose a discipline below for scope, standards and typical lead times.
      </p>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.04}>
            <Card className="flex h-full flex-col">
              <h2 className="font-display text-lg text-steel-100">{service.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-300">
                {service.shortDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.spec.slice(0, 1).map((s) => (
                  <Badge key={s.label}>{s.value}</Badge>
                ))}
              </div>
              <Link
                href={`/services/${service.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
              >
                View spec <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
