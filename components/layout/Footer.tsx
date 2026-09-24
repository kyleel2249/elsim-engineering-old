import Link from 'next/link';
import { Zap } from 'lucide-react';
import { services } from '@/lib/data/services';

export function Footer() {
  return (
    <footer className="border-t border-steel-700 bg-steel-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-base text-steel-100">
            <Zap className="h-4 w-4 text-cyan-400" aria-hidden />
            ELSIM Engineering
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-steel-400">
            Electrical, structural and mechanical engineering services in Ghana.
            Provisional site — see the{' '}
            <Link href="/about#status" className="underline underline-offset-2 hover:text-cyan-400">
              project status
            </Link>{' '}
            for what&apos;s pending management approval.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wide text-steel-400">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-steel-300 hover:text-cyan-400"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wide text-steel-400">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="text-steel-300 hover:text-cyan-400">About</Link></li>
            <li><Link href="/projects" className="text-steel-300 hover:text-cyan-400">Projects</Link></li>
            <li><Link href="/quotation" className="text-steel-300 hover:text-cyan-400">Request a quote</Link></li>
            <li><Link href="/contact" className="text-steel-300 hover:text-cyan-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wide text-steel-400">Contact (provisional)</h3>
          <ul className="mt-4 space-y-2 text-sm text-steel-300">
            <li>Accra, Ghana <span className="text-steel-500">— exact address pending</span></li>
            <li className="text-steel-500">Phone: pending verified number</li>
            <li className="text-steel-500">Email: pending verified address</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-steel-800 py-6">
        <p className="mx-auto max-w-6xl px-6 font-mono text-xs text-steel-500">
          © {new Date().getFullYear()} ELSIM Engineering — provisional build. Not for public launch
          until brand assets and contact details are approved.
        </p>
      </div>
    </footer>
  );
}
