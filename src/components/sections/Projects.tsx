'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectFilter } from './projects/ProjectFilter';
import { projects } from '@/data/projects';

const allTags = [...new Set(projects.flatMap((p) => p.tech))].sort();

export function Projects() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => p.tech.includes(tag));
      return matchesQuery && matchesTags;
    });
  }, [query, selectedTags]);

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built — hover a card to explore, click to read more."
        />
        <ProjectFilter
          query={query}
          onQueryChange={setQuery}
          allTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
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
