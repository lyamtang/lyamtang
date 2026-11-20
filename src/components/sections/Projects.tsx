'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RotateCcw, SearchX } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectFilter } from './projects/ProjectFilter';
import { projects } from '@/data/projects';
import { DEFAULT_FILTERS, filterProjects } from '@/lib/projectFilters';
import { MOTION_DURATION, MOTION_EASING } from '@/lib/motion';

export function Projects() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filtered = useMemo(() => filterProjects(projects, filters), [filters]);
  // Only the first load staggers; later filter changes must stay instant.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const isFirstRender = !hasMounted;

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built, designed, and managed."
          className="mb-6"
        />
        <ProjectFilter filters={filters} onFiltersChange={setFilters} />
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 py-12 text-muted-foreground"
          >
            <SearchX className="size-10" aria-hidden="true" />
            <Button variant="outline" onClick={() => setFilters(DEFAULT_FILTERS)}>
              <RotateCcw />
              Reset
            </Button>
          </motion.div>
        ) : (
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.slug}
                  layout="position"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    duration: isFirstRender ? MOTION_DURATION.base : MOTION_DURATION.fast,
                    ease: MOTION_EASING.smoothOut,
                    delay: isFirstRender ? Math.min(index, 5) * 0.05 : 0,
                  }}
                  className="h-full min-w-0"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
