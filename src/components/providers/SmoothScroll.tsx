'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';
import { usePathname } from 'next/navigation';
import { initGsapDefaults, prefersReducedMotion } from '@/lib/motion';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    initGsapDefaults();

    if (prefersReducedMotion()) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    let rafId = 0;
    let resizeFrame = 0;

    const scheduleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        lenis.resize();
      });
    };

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    window.addEventListener('resize', scheduleResize, { passive: true });
    window.addEventListener('load', scheduleResize);
    window.addEventListener('pageshow', scheduleResize);
    void document.fonts?.ready.then(scheduleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', scheduleResize);
      window.removeEventListener('load', scheduleResize);
      window.removeEventListener('pageshow', scheduleResize);
      lenis.destroy();
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const id = requestAnimationFrame(() => {
      lenis.resize();
      requestAnimationFrame(() => lenis.resize());
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    let lastWarningAt = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !event.cancelable || Math.abs(event.deltaY) < 24) return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 1) return;

      const before = window.scrollY;
      const nearTop = before <= 1;
      const nearBottom = before >= maxScroll - 1;
      const scrollingDown = event.deltaY > 0;

      if ((nearTop && !scrollingDown) || (nearBottom && scrollingDown)) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const after = window.scrollY;
          const stuck = event.defaultPrevented && Math.abs(after - before) < 0.5;
          if (!stuck) return;

          const now = performance.now();
          if (now - lastWarningAt < 5000) return;
          lastWarningAt = now;

          console.warn('[scroll-watchdog] Wheel was prevented but page did not move.', {
            pathname,
            deltaY: event.deltaY,
            before,
            after,
            maxScroll,
            htmlClass: document.documentElement.className,
            bodyStyle: document.body.getAttribute('style'),
          });
        });
      });
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
