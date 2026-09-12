'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientText from '@/components/ui/GradientText';
import RotatingText from '@/components/ui/RotatingText';
import { trackCTAClick } from '@/lib/analytics';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-visible bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_80%_25%,rgba(14,165,233,0.14),transparent_36%),radial-gradient(circle_at_50%_80%,rgba(99,102,241,0.12),transparent_42%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.2),transparent_40%),radial-gradient(circle_at_80%_25%,rgba(56,189,248,0.16),transparent_36%),radial-gradient(circle_at_50%_80%,rgba(129,140,248,0.14),transparent_44%)]" />
        <div className="absolute inset-0 opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [background-size:64px_64px] [background-image:linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/12 via-background/68 to-background" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-lg text-foreground/70 dark:text-white/80">Hey there! 👋</span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 pb-1 text-5xl font-bold leading-[1.15] sm:text-6xl lg:text-7xl"
        >
          <span className="text-foreground/90 dark:text-white/90">I&apos;m</span>{' '}
          <GradientText
            className="!mx-0 !inline-flex text-5xl font-bold leading-[1.15] sm:text-6xl lg:text-7xl"
            colors={['#8B5CF6', '#3B82F6', '#8B5CF6']}
            animationSpeed={6}
          >
            <span className="pb-1">Lyam Tang</span>
          </GradientText>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-8 flex max-w-3xl justify-center"
        >
          <div className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xl text-foreground/95 sm:text-2xl dark:text-white/95">
            <span className="shrink-0 text-sm font-medium uppercase text-foreground/60 sm:text-base dark:text-white/60">I build as</span>
            <span className="inline-flex max-w-full items-center justify-center rounded-full border border-primary/50 bg-primary/10 px-4 py-2 shadow-[0_0_24px_-12px_var(--primary)] backdrop-blur-md">
              <RotatingText
                texts={[
                  'Product Manager in Training',
                  'CS Graduate',
                  'Problem Solver',
                  'Tech Enthusiast',
                ]}
                rotationInterval={2500}
                staggerDuration={0.02}
                splitBy="characters"
                mainClassName="inline-flex max-w-full justify-center text-foreground dark:text-white"
                elementLevelClassName="font-semibold text-primary"
              />
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick('View Projects', 'hero');
                scrollToSection('projects');
              }}
              className="min-w-[160px]"
            >
              View Projects
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick('Get in Touch', 'hero');
                scrollToSection('contact');
              }}
              className="min-w-[160px] border-foreground/35 bg-foreground/5 text-foreground backdrop-blur-sm hover:bg-foreground/15 hover:text-foreground dark:border-white/35 dark:bg-white/5 dark:text-white dark:hover:bg-white/15 dark:hover:text-white"
            >
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <div className="inline-flex flex-col items-center gap-2 text-foreground/60 dark:text-white/60">
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="h-6 w-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
