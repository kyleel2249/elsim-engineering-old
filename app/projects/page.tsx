import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Case studies from ELSIM Engineering — provisional pending management approval.'
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Badge tone="copper">Sheet 02 — Projects</Badge>
      <h1 className="mt-4 font-display text-4xl text-steel-100 sm:text-5xl">Recent work</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
        These case studies are provisional placeholders in the right shape for real projects.
        Photography and verified figures will replace them once ELSIM approves publication.
      </p>

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <Card className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <Badge tone="cyan">{project.sector}</Badge>
                <span className="font-mono text-xs text-steel-400">{project.year}</span>
              </div>
              <h2 className="mt-4 font-display text-lg text-steel-100">{project.title}</h2>
              <p className="mt-2 text-sm text-steel-400">{project.location}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-300">
                {project.summary}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
              >
                Read case study <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
