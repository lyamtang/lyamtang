'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Github } from '@thesvg/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/data/types';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
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
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{project.year}</p>
            </div>
            <div className="flex shrink-0 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
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
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
          >
            View details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
