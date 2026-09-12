'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/ui/ModeToggle';
import { headerNavItems } from '@/data/navigation';
import { event } from '@/lib/analytics';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#about');
  const isProjectDetailRoute = pathname.startsWith('/projects/');

  useEffect(() => {
    if (pathname !== '/') return;
    const targetId = sessionStorage.getItem('scroll-target');
    if (!targetId) return;
    sessionStorage.removeItem('scroll-target');
    requestAnimationFrame(() => {
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    });
  }, [pathname, shouldReduceMotion]);

  useEffect(() => {
    if (pathname !== '/') return;

    const ids = headerNavItems.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const updateActiveSection = () => {
      const probeY = window.scrollY + window.innerHeight * 0.35;
      let currentId = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= probeY) {
          currentId = section.id;
        }
      }

      const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atPageBottom) {
        currentId = sections[sections.length - 1].id;
      }

      setActiveHref(`#${currentId}`);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
    // On other pages, let the Link navigate to '/' naturally (renders from top)
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('#')) return;
    const targetId = href.slice(1);
    e.preventDefault();
    setMenuOpen(false);
    
    // Track navigation click
    event('nav_click', {
      section: targetId,
      location: 'header',
    });
    
    if (pathname === '/') {
      setTimeout(() => {
          document
            .getElementById(targetId)
            ?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
      }, 180);
      return;
    }
    sessionStorage.setItem('scroll-target', targetId);
    router.push('/');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full py-3"
    >
      <nav className="container mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8 md:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2 justify-self-start">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-border/60 bg-card/70 px-4 py-2 text-base font-bold text-foreground shadow-sm backdrop-blur-md"
          >
            Lyam Tang
          </motion.span>
        </Link>

        {/* Center navigation */}
        {isProjectDetailRoute ? (
          <div className="hidden md:block" />
        ) : (
          <div className="hidden items-center justify-self-center rounded-full border border-border/60 bg-card/70 p-1.5 shadow-sm backdrop-blur-md md:flex">
            {headerNavItems.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={pathname === '/' ? link.href : '/'}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}

        {/* Utility area */}
        <div className="ml-auto flex items-center gap-2 justify-self-end">
          <ModeToggle />
          {!isProjectDetailRoute && (
            <button
              onClick={() => {
                const newState = !menuOpen;
                setMenuOpen(newState);
                
                // Track mobile menu toggle
                event('mobile_menu_toggle', {
                  action: newState ? 'open' : 'close',
                });
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/75 text-foreground shadow-sm transition hover:bg-accent md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          )}
        </div>
      </nav>

      {/* Original mobile menu panel style */}
      <AnimatePresence>
        {!isProjectDetailRoute && menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <div className="container mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-2 shadow-sm backdrop-blur-md">
                <div className="flex flex-col gap-1">
                  {headerNavItems.map((link) => (
                    <Link
                      key={link.href}
                      href={pathname === '/' ? link.href : '/'}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        activeHref === link.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
