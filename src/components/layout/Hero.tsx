'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { MOTION_DURATION, MOTION_EASING } from '@/lib/motion';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" data-header-pin className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-x-clip bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_80%_25%,rgba(14,165,233,0.14),transparent_36%),radial-gradient(circle_at_50%_80%,rgba(99,102,241,0.12),transparent_42%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.2),transparent_40%),radial-gradient(circle_at_80%_25%,rgba(56,189,248,0.16),transparent_36%),radial-gradient(circle_at_50%_80%,rgba(129,140,248,0.14),transparent_44%)]" />
        <div className="absolute inset-0 opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [background-size:64px_64px] [background-image:linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/12 via-background/68 to-background" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        {/* Greeting */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASING.smoothOut }}
          className="mb-4"
        >
          <span className="text-lg text-foreground/70 dark:text-white/80">Hey there! 👋</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION.slow, delay: 0.1, ease: MOTION_EASING.smoothOut }}
          className="mb-6 pb-1 text-5xl font-bold leading-[1.15] sm:text-6xl lg:text-7xl"
        >
          <span className="text-foreground/90 dark:text-white/90">I&apos;m</span>{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, #8B5CF6, #3B82F6, #8B5CF6)',
            }}
          >
            Lyam Tang
          </span>
        </motion.h1>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION.slow, delay: 0.2, ease: MOTION_EASING.smoothOut }}
          className="mx-auto max-w-2xl"
        >
          <p className="text-lg leading-relaxed text-foreground/80 sm:text-xl dark:text-white/80">
            Computer science graduate building toward product management.
          </p>
        </motion.div>

        <div className="mt-12 inline-flex flex-col items-center gap-2 text-foreground/60 dark:text-white/60">
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
