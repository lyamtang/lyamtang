'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { BriefcaseBusiness, CircleUserRound, Mail, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/ui/ModeToggle';
import { headerNavItems } from '@/data/navigation';
import { event } from '@/lib/analytics';

function getNavIcon(href: string) {
  if (href === '/projects') return BriefcaseBusiness;
  if (href === '/contact') return Mail;
  return CircleUserRound;
}

export default function Header() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('/');

  useEffect(() => {
    const exactMatch = headerNavItems.find((item) => item.href === pathname);
    if (exactMatch) {
      setActiveHref(exactMatch.href);
      return;
    }

    if (pathname.startsWith('/projects/')) {
      setActiveHref('/projects');
      return;
    }

    setActiveHref('/');
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    event('nav_click', {
      section: href,
      location: 'header',
    });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full overflow-x-clip bg-transparent pb-3"
    >
      <nav className="relative z-10 container mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8 md:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2 justify-self-start">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-border/60 bg-card/70 px-6 py-3 text-xl font-bold text-foreground shadow-sm backdrop-blur-md"
          >
            Lyam Tang
          </motion.span>
        </Link>

        {/* Center navigation */}
        <div className="hidden items-center justify-self-center rounded-full border border-border/60 bg-card/70 p-2 shadow-sm backdrop-blur-md md:flex">
          {headerNavItems.map((link) => {
            const isActive = activeHref === link.href;
            const Icon = getNavIcon(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Utility area */}
        <div className="ml-auto flex items-center gap-6 justify-self-end md:gap-4">
          <div className="flex h-12 items-center justify-center origin-center scale-150">
            <ModeToggle />
          </div>
          <button
            onClick={() => {
              setMenuOpen(true);

              event('mobile_menu_toggle', {
                action: 'open',
              });
            }}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card/75 text-foreground shadow-sm transition hover:bg-accent md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <button
              aria-label="Close menu backdrop"
              className="absolute inset-0 bg-black/30"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.14 : 0.22, ease: 'easeOut' }}
              className="relative z-10 container mx-auto mt-[6rem] max-w-7xl px-4 sm:px-6 lg:px-8"
            >
              <div className="rounded-2xl border border-border/60 bg-card/90 p-2 shadow-lg">
                <div className="flex flex-col gap-1">
                  {headerNavItems.map((link) => {
                    const Icon = getNavIcon(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={`inline-flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                          activeHref === link.href
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
