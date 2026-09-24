import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with ELSIM Engineering.'
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Badge tone="copper">Contact</Badge>
      <h1 className="mt-4 font-display text-4xl text-steel-100">Get in touch</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
        For a scoped project, the fastest route is the{' '}
        <a href="/quotation" className="text-cyan-400 underline underline-offset-2">
          quotation form
        </a>
        — it routes straight to the engineering team. For anything else, use the details below
        once ELSIM confirms them.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Card>
          <MapPin className="h-5 w-5 text-cyan-400" aria-hidden />
          <h2 className="mt-3 font-display text-sm text-steel-100">Office</h2>
          <p className="mt-1 text-sm text-steel-400">Accra, Ghana — exact address pending</p>
        </Card>
        <Card>
          <Phone className="h-5 w-5 text-cyan-400" aria-hidden />
          <h2 className="mt-3 font-display text-sm text-steel-100">Phone</h2>
          <p className="mt-1 text-sm text-steel-400">Pending verified number</p>
        </Card>
        <Card>
          <Mail className="h-5 w-5 text-cyan-400" aria-hidden />
          <h2 className="mt-3 font-display text-sm text-steel-100">Email</h2>
          <p className="mt-1 text-sm text-steel-400">Pending verified address</p>
        </Card>
      </div>

      <div className="mt-14 border-t border-steel-700 pt-10">
        <Button href="/quotation">Start a quotation instead</Button>
      </div>
    </div>
  );
}
