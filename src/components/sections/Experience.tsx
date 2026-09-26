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
        
        <div className="space-y-12">
          {experience.map((companyData, i) => (
            <div key={i} className="space-y-6">
              {/* Company Header */}
              <div>
                <h2 className="text-2xl font-bold">{companyData.company}</h2>
                <p className="text-sm font-medium text-primary">{companyData.location}</p>
              </div>

              {/* Roles List */}
              <div className="space-y-8">
                {companyData.roles.map((role, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: j * 0.1 }}
                    // Added ml-3 so the dot aligns nicely beneath the company header
                    className="relative border-l-2 border-primary/30 pl-6 ml-3"
                  >
                    {/* Education Style Timeline Dot */}
                    <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                    
                    {/* Role Header */}
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{role.title}</h3>
                        <p className="text-sm text-muted-foreground">{role.type}</p>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-nowrap mt-1 sm:mt-0">
                        {role.startDate} – {role.endDate}
                      </p>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-1.5">
                      {role.bullets.map((bullet, k) => (
                        <li key={k} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    {role.tech && role.tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {role.tech.map((t) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}