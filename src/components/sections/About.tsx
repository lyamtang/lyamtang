'use client';

import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CountUp } from '@/components/ui/CountUp';
import { bio, stats } from '@/data/about';

export function About() {
  return (
    <section id="about" className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading title="About Me" />
        <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {bio.paragraphs.map((para, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center rounded-xl border bg-background p-6 text-center"
              >
                <div className="text-4xl font-bold text-primary">
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix ?? ''}
                    decimals={stat.decimals ?? 0}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
