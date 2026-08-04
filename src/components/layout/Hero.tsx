'use client';

import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientText from '@/components/ui/GradientText';
import RotatingText from '@/components/ui/RotatingText';
import Hyperspeed from '@/components/ui/Hyperspeed';
import { hyperspeedPresets } from '@/components/ui/HyperspeedPresets';

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <Hyperspeed
          effectOptions={
            resolvedTheme === 'dark'
              ? hyperspeedPresets.one
              : hyperspeedPresets.light
          }
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-black/55 dark:block" aria-hidden="true" />

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
              onClick={() => scrollToSection('projects')}
              className="min-w-[160px]"
            >
              View Projects
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
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
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex flex-col items-center gap-2 text-foreground/60 dark:text-white/60"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
