'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Github } from '@thesvg/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/data/types';
import { formatStatusLabel } from '@/lib/projectFilters';

const MAX_CATEGORIES = 2;
const MAX_TECH = 3;

function formatPeriod(project: Project): string {
  if (project.period.startYear === project.period.endYear) {
    return String(project.period.startYear);
  }
  return `${project.period.startYear} - ${project.period.endYear}`;
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const visibleCategories = project.category.slice(0, MAX_CATEGORIES);
  const extraCategoryCount = Math.max(project.category.length - visibleCategories.length, 0);
  const visibleTech = project.tech.slice(0, MAX_TECH);
  const extraTechCount = Math.max(project.tech.length - visibleTech.length, 0);
  const statusBadgeClass =
    project.status === 'in_progress'
      ? 'border border-sky-500/40 bg-sky-500/15 text-sky-700 dark:text-sky-300'
      : 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col border-border/50 transition-colors hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge className={`text-[10px] uppercase tracking-wide ${statusBadgeClass}`}>
              {formatStatusLabel(project.status)}
            </Badge>
            {visibleCategories.map((category) => (
              <Badge key={category} variant="outline" className="text-[10px]">
                {category}
              </Badge>
            ))}
            {extraCategoryCount > 0 && (
              <Badge variant="outline" className="text-[10px] text-muted-foreground">
                +{extraCategoryCount}
              </Badge>
            )}
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
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4 [&_*]:fill-current text-muted-foreground transition-colors hover:text-foreground" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live site"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
                </a>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          <p className="flex-1 text-sm text-muted-foreground">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-1.5">
            {visibleTech.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
              </Badge>
            ))}
            {extraTechCount > 0 && (
              <Badge variant="secondary" className="text-xs text-muted-foreground">
                +{extraTechCount} more
              </Badge>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            View details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
