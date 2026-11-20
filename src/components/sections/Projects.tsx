'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RotateCcw, SearchX } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectFilter } from './projects/ProjectFilter';
import { projects } from '@/data/projects';
import { DEFAULT_FILTERS, filterProjects } from '@/lib/projectFilters';
import { MOTION_DURATION, MOTION_EASING, prefersReducedMotion } from '@/lib/motion';

// Matches the toolbar row's bottom margin (mb-6).
const TOOLBAR_GAP_PX = 24;
const HEADER_LOCK_MAX_MS = 1500;

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

  // A shrinking list would collapse the page and snap the scroll position; hold the height while
  // the panel or search is in use, then scroll to the results on purpose.
  const resultsRef = useRef<HTMLDivElement>(null);
  const [frozenHeight, setFrozenHeight] = useState<number | null>(null);
  const handleActiveChange = useCallback((active: boolean) => {
    setFrozenHeight(active ? (resultsRef.current?.offsetHeight ?? null) : null);
  }, []);

  const hasFilteredOnce = useRef(false);
  useEffect(() => {
    if (!hasFilteredOnce.current) {
      hasFilteredOnce.current = true;
      return;
    }

    const results = resultsRef.current;
    const toolbar = document.querySelector('[data-filter-toolbar]');
    if (!results || !toolbar) return;

    // Land the results right below the (stuck) toolbar, whichever offset the header leaves it at.
    const offset =
      results.getBoundingClientRect().top - (toolbar.getBoundingClientRect().bottom + TOOLBAR_GAP_PX);
    if (offset >= -1) return;

    // The page scrolls itself here, so keep the floating header exactly as it is.
    const root = document.documentElement;
    const unlock = () => {
      window.clearTimeout(lockTimer);
      delete root.dataset.headerScrollLock;
    };
    const lockTimer = window.setTimeout(unlock, HEADER_LOCK_MAX_MS);
    root.dataset.headerScrollLock = 'true';
    window.addEventListener('scrollend', unlock, { once: true });
    window.scrollBy({ top: offset, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [filters]);

  return (
    <section id="projects" className="min-h-dvh px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built, designed, and managed."
          className="mb-6"
        />
        <ProjectFilter
          filters={filters}
          onFiltersChange={setFilters}
          onActiveChange={handleActiveChange}
        />
        <div ref={resultsRef} style={{ minHeight: frozenHeight ?? undefined }}>
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
      </div>
    </section>
  );
}
