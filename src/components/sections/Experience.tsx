'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <section id="experience" className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading title="Experience" />
        <div className="space-y-10">
          {experience.map((entry, i) => (
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
                  <h3 className="text-xl font-semibold">{entry.role}</h3>
                  <p className="font-medium text-primary">{entry.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.location} · {entry.type}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {entry.startDate} – {entry.endDate}
                </p>
              </div>
              <ul className="mt-3 space-y-1.5">
                {entry.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
              {entry.tech.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.tech.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
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
