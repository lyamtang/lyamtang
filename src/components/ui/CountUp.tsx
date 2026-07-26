'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'motion/react';

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

export function CountUp({ to, duration = 2, decimals = 0, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        el.textContent = value.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, to, duration, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
