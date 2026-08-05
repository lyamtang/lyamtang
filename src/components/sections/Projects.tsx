'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectFilter } from './projects/ProjectFilter';
import { projects } from '@/data/projects';
import {
  filterProjects,
  getActiveFilterCount,
  getProjectFilterOptions,
} from '@/lib/projectFilters';
import type { ProjectStatus } from '@/data/types';

const filterOptions = getProjectFilterOptions(projects);

export function Projects() {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category].sort((a, b) => a.localeCompare(b)),
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatus('all');
  };

  const activeFilterCount = getActiveFilterCount({
    query,
    categories: selectedCategories,
    status: selectedStatus,
  });

  const filtered = useMemo(() => {
    return filterProjects(projects, {
      query,
      categories: selectedCategories,
      status: selectedStatus,
    });
  }, [query, selectedCategories, selectedStatus]);

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built, designed, and managed."
        />
        <ProjectFilter
          query={query}
          onQueryChange={setQuery}
          categories={filterOptions.categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={toggleCategory}
          statuses={filterOptions.statuses}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          activeFilterCount={activeFilterCount}
          onClearFilters={clearFilters}
        />
        {filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center text-muted-foreground"
          >
            No projects match your filters.
          </motion.p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
