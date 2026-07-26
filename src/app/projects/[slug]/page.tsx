import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Github } from '@thesvg/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Lyam Tang`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="container mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div className="mt-6">
        <p className="mb-2 text-sm text-muted-foreground">{project.year}</p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mb-6 text-lg text-muted-foreground">{project.shortDescription}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
            >
              <Github className="h-4 w-4 [&_*]:fill-current" />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'sm' }), 'gap-2')}
            >
              <ExternalLink className="h-4 w-4" />
              Live site
            </a>
          )}
        </div>

        <div className="rounded-xl border bg-muted/30 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-semibold">About this project</h2>
          <p className="leading-relaxed text-muted-foreground">{project.longDescription}</p>
        </div>
      </div>
    </main>
  );
}
