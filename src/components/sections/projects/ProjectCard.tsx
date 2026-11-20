'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Github } from '@thesvg/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/data/types';
import { MOTION_DURATION, MOTION_EASING } from '@/lib/motion';
import { formatStatusLabel } from '@/lib/projectFilters';
import { FOCUS_BY_VALUE, INDUSTRY_BY_VALUE } from '@/lib/projectTaxonomy';

const MAX_TECH = 3;

function formatPeriod(project: Project): string {
  if (project.period.startYear === project.period.endYear) {
    return String(project.period.startYear);
  }
  return `${project.period.startYear} - ${project.period.endYear}`;
}

export function ProjectCard({ project }: { project: Project }) {
  const industry = INDUSTRY_BY_VALUE[project.industry];
  const visibleTech = project.tech.slice(0, MAX_TECH);
  const extraTechCount = Math.max(project.tech.length - visibleTech.length, 0);
  const metaChipClass = 'h-6 px-2.5 text-xs';
  const techChipClass = 'h-6 px-2.5 text-xs';
  const statusBadgeClass =
    project.status === 'in_progress'
      ? `${metaChipClass} border border-sky-500/40 bg-sky-500/15 text-sky-700 dark:text-sky-300`
      : `${metaChipClass} border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300`;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: MOTION_DURATION.fast, ease: MOTION_EASING.smoothOut }}
        className="h-full min-w-0"
    >
        <Card className="group flex h-[19rem] min-w-0 flex-col border-border/50 transition-colors hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge className={`uppercase tracking-wide ${statusBadgeClass}`}>
              {formatStatusLabel(project.status)}
            </Badge>
            <Badge variant="outline" className={metaChipClass}>
              <industry.icon />
              {industry.label}
            </Badge>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{formatPeriod(project)}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <Github className="h-4 w-4 [&_*]:fill-current" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live site"
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </CardHeader>
          <CardContent className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="w-full truncate text-sm text-muted-foreground">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-1.5">
            {visibleTech.map((t) => (
              <Badge key={t} variant="secondary" className={techChipClass}>
                {t}
              </Badge>
            ))}
            {extraTechCount > 0 && (
              <Badge variant="secondary" className={`${techChipClass} text-muted-foreground`}>
                +{extraTechCount} more
              </Badge>
            )}
          </div>
          <div className="mt-auto flex items-center justify-between gap-2">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex h-10 w-fit items-center gap-1.5 rounded-md px-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              View details <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2 text-muted-foreground">
              {project.focus.map((value) => {
                const { icon: Icon, label } = FOCUS_BY_VALUE[value];
                return (
                  <span key={value} title={label} className="inline-flex">
                    <Icon role="img" aria-label={label} className="size-4" />
                  </span>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
