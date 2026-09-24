import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SceneCanvas } from '@/components/3d/SceneCanvas';
import { ServiceOrb } from '@/components/3d/ServiceOrb';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/lib/data/services';
import { projects } from '@/lib/data/projects';

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-steel-950">
        <SceneCanvas />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40">
          <Badge tone="copper">Provisional site — pending ELSIM brand approval</Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-steel-100 sm:text-6xl">
            Engineering that keeps Ghana&apos;s sites powered, built and running.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-300">
            ELSIM Engineering plans, installs and maintains electrical, structural and mechanical
            systems for commercial and industrial clients — from first sketch to final
            commissioning.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/quotation">Request a quote</Button>
            <Button href="/services" variant="outline">
              See our services
            </Button>
          </div>
        </div>

        <div className="title-block absolute bottom-6 right-6 z-10 hidden w-64 p-4 font-mono text-[11px] text-steel-300 sm:block">
          <div className="flex justify-between border-b border-steel-700 pb-2">
            <span>SHEET</span>
            <span className="text-cyan-400">00 / HOME</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>SCALE</span>
            <span>N.T.S.</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span>STATUS</span>
            <span className="text-copper-400">PROVISIONAL</span>
          </div>
        </div>
      </section>

      <Section
        sheet="01"
        title="What we do"
        description="Six core disciplines, each led by an engineer who signs off the work."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.04}>
              <Card className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-lg text-steel-100">{service.name}</h3>
                  <ServiceOrb />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-300">
                  {service.shortDescription}
                </p>
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
      </Section>

      <Section
        sheet="02"
        title="Recent work"
        description="Provisional case studies — real project photography pending ELSIM approval."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.slug}>
              <div className="flex items-center justify-between">
                <Badge tone="cyan">{project.sector}</Badge>
                <span className="font-mono text-xs text-steel-400">{project.year}</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-steel-100">{project.title}</h3>
              <p className="mt-2 text-sm text-steel-400">{project.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">{project.summary}</p>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
              >
                Read case study <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <section className="border-t border-steel-700 bg-steel-900">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-20 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl text-steel-100">Have a project in mind?</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-steel-300">
              Tell us the scope and site details — our multi-step form routes straight to the
              engineering team.
            </p>
          </div>
          <Button href="/quotation">Start a quotation</Button>
        </div>
      </section>
    </>
  );
}
