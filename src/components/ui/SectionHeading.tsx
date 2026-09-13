'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { MOTION_DURATION, MOTION_EASING } from '@/lib/motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASING.smoothOut }}
      className={cn('mb-12', centered && 'text-center', className)}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: MOTION_DURATION.medium, delay: MOTION_DURATION.fast, ease: MOTION_EASING.smoothOut }}
        className={cn(
          'mt-3 h-1 w-16 origin-left rounded-full bg-primary',
          centered && 'mx-auto',
        )}
      />
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
