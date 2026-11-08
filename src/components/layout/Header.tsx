'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getActiveNavHref, headerNavItems } from '@/data/navigation';
import { MOTION_DURATION, MOTION_EASING } from '@/lib/motion';
import { useHeaderVisibility } from './useHeaderVisibility';

const HIDDEN_OFFSET_PX = -80;

export default function Header() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const scrollVisible = useHeaderVisibility(pathname);
  const [keyboardFocused, setKeyboardFocused] = useState(false);

  const activeHref = getActiveNavHref(pathname);
  const visible = scrollVisible || keyboardFocused;

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header className="pointer-events-none sticky top-0 z-50 flex h-[5.75rem] w-full justify-center px-3 pt-3 min-[360px]:px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : HIDDEN_OFFSET_PX,
        }}
        transition={{
          duration: MOTION_DURATION.base,
          ease: [...MOTION_EASING.smoothOut],
        }}
        onFocusCapture={(e) => {
          if (e.target.matches(':focus-visible')) setKeyboardFocused(true);
        }}
        onBlurCapture={() => setKeyboardFocused(false)}
        className={`nav-glass flex h-14 w-full items-center justify-between gap-0 rounded-full p-1 min-[360px]:gap-1 min-[360px]:p-1.5 sm:max-w-[40rem] select-none [-webkit-tap-highlight-color:transparent] ${
          visible ? 'pointer-events-auto' : ''
        }`}
      >
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="Lyam Tang, home"
          className="inline-flex h-11 items-center rounded-full px-2.5 text-sm font-bold whitespace-nowrap min-[360px]:px-3 text-foreground transition-[color,transform] duration-150 [touch-action:manipulation] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground active:scale-[0.97] sm:px-3.5 sm:text-base"
        >
          <span aria-hidden="true">Lyam Tang</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-0 min-[360px]:gap-0.5">
          {headerNavItems.map((link) => {
            const isActive = activeHref === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-2.5 text-sm font-medium whitespace-nowrap min-[360px]:px-3 transition-[color,transform] duration-150 [touch-action:manipulation] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground active:scale-[0.97] sm:px-4 ${
                  isActive ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className={isActive ? '' : 'sr-only sm:not-sr-only'}>{link.name}</span>

                {!isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-2.5 bottom-1.5 h-0.5 origin-center min-[360px]:inset-x-3 scale-x-0 rounded-full bg-foreground/35 transition-transform duration-[140ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-hover:duration-[180ms] motion-reduce:scale-x-100 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:group-hover:opacity-100 sm:inset-x-4"
                  />
                )}

                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="nav-active-line"
                    transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                    className="pointer-events-none absolute inset-x-2.5 bottom-1.5 min-[360px]:inset-x-3 h-0.5 rounded-full bg-foreground sm:inset-x-4"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </header>
  );
}
