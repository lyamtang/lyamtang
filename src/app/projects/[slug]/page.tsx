import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { Github } from '@thesvg/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import { ProjectCarousel } from '@/components/sections/projects/ProjectCarousel';
import { BackToProjectsLink } from '@/components/sections/projects/BackToProjectsLink';

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

  const { details } = project;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Back */}
      <BackToProjectsLink />

      {/* ── Hero ── */}
      <div className="mt-6">
        <p className="mb-2 text-sm text-muted-foreground">{project.year}</p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mb-6 text-lg text-muted-foreground">{project.shortDescription}</p>

        {/* Snapshot: role / duration / team */}
        {details && (details.role || details.duration || details.team) && (
          <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {details.role && (
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">Role</span> · {details.role}
              </span>
            )}
            {details.duration && (
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">Duration</span> · {details.duration}
              </span>
            )}
            {details.team && (
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">Team</span> · {details.team}
              </span>
            )}
          </div>
        )}

        {/* Tech badges */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="mb-12 flex flex-wrap gap-3">
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
      </div>

      {/* ── Gallery carousel ── */}
      {details?.gallery && details.gallery.length > 0 && (
        <section className="mb-16 px-8">
          <ProjectCarousel images={details.gallery} />
        </section>
      )}

      {/* ── About ── */}
      <section className="mb-12 rounded-xl border bg-muted/30 p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-semibold">About this project</h2>
        <p className="leading-relaxed text-muted-foreground">{project.longDescription}</p>
      </section>

      {/* ── Challenges & Solutions ── */}
      {details?.painPoints && details.painPoints.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Challenges &amp; Solutions</h2>
          <div className="space-y-4">
            {details.painPoints.map((pp, i) => (
              <div key={i} className="rounded-xl border bg-muted/20 p-6">
                <p className="mb-2 font-medium">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Problem ·{' '}
                  </span>
                  {pp.problem}
                </p>
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Approach · </span>
                  {pp.approach}
                </p>
                {pp.outcome && (
                  <p className="text-sm text-primary">
                    <span className="font-semibold">Result · </span>
                    {pp.outcome}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Key Techniques ── */}
      {details?.techniques && details.techniques.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Key Techniques</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {details.techniques.map((tech, i) => (
              <div key={i} className="rounded-xl border p-5">
                <p className="font-semibold">{tech.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{tech.reason}</p>
                {tech.contribution && (
                  <p className="mt-3 text-xs text-primary">{tech.contribution}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Timeline ── */}
      {details?.timeline && details.timeline.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Project Timeline</h2>
          <div className="space-y-6">
            {details.timeline.map((phase, i) => (
              <div key={i} className="relative border-l-2 border-primary/30 pl-6">
                <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                <p className="font-semibold">{phase.phase}</p>
                <p className="mt-1 text-sm text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Outcomes ── */}
      {details?.outcomes && details.outcomes.length > 0 && (
        <section className="mb-4 rounded-xl border bg-muted/30 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-semibold">Outcomes</h2>
          <ul className="space-y-3">
            {details.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {outcome}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
