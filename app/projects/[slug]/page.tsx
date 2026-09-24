import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { projects, getProjectBySlug } from '@/lib/data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex items-center gap-3">
        <Badge tone="cyan">{project.sector}</Badge>
        {project.status === 'provisional' && <Badge tone="copper">Provisional case study</Badge>}
      </div>
      <h1 className="mt-4 font-display text-4xl text-steel-100">{project.title}</h1>
      <p className="mt-2 font-mono text-sm text-steel-400">
        {project.location} · {project.year}
      </p>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel-300">{project.detail}</p>

      <h2 className="mt-12 font-display text-xl text-steel-100">Scope of work</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {project.scope.map((item) => (
          <li
            key={item}
            className="border border-steel-700 px-4 py-3 text-sm text-steel-300"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-steel-700 pt-10">
        <Button href="/quotation">Start a similar project</Button>
        <Button href="/projects" variant="outline">
          Back to all projects
        </Button>
      </div>
    </div>
  );
}
