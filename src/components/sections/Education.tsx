'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { education } from '@/data/education';

export function Education() {
  return (
    <section id="education" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading title="Education" />
        <div className="space-y-10">
          {education.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative border-l-2 border-primary/30 pl-6"
            >
              <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{entry.institution}</h3>
                  <p className="text-muted-foreground">
                    {entry.degree} · {entry.field}
                  </p>
                  <p className="text-sm text-muted-foreground">{entry.location}</p>
                </div>
                <div className="text-sm sm:text-right">
                  <p className="font-medium">
                    {entry.startYear} – {entry.endYear}
                  </p>
                  {entry.gpa && (
                    <p className="text-muted-foreground">
                      GPA {entry.gpa} / {entry.maxGpa}
                    </p>
                  )}
                </div>
              </div>
              {entry.highlights.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.highlights.map((h) => (
                    <Badge key={h} variant="secondary">
                      {h}
                    </Badge>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
