'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { CountUp } from '@/components/ui/CountUp';
import { bio, stats } from '@/data/about';

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading title="About Me" />
        <div className="space-y-10">
          <div className="max-w-prose space-y-4">
            {bio.paragraphs.map((para, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-2 text-center"
              >
                <div className="text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
                  <CountUp
                    to={stat.value}
                    duration={1.2}
                    suffix={stat.suffix ?? ''}
                    decimals={stat.decimals ?? 0}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
