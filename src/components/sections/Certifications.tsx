'use client';

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { certifications } from '@/data/certifications';

export function Certifications() {
  return (
    <section id="certifications" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading title="Certifications" />
        <div className="space-y-6">
          {certifications.map((cert, i) => (
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
                  <h3 className="text-lg font-semibold">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.organisation}</p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <p className="text-sm font-medium">{cert.issueDate}</p>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Verify <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
