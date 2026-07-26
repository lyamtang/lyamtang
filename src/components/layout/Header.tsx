'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/ui/ModeToggle';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    if (pathname !== '/') return;
    const targetId = sessionStorage.getItem('scroll-target');
    if (!targetId) return;
    sessionStorage.removeItem('scroll-target');
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('#')) return;

    const targetId = href.slice(1);
    e.preventDefault();

    if (pathname === '/') {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
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
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
    >
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-foreground"
          >
            Lyam Tang
          </motion.span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Link
                href={pathname === '/' ? link.href : '/'}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  {link.name}
                </motion.span>
              </Link>
            </motion.div>
          ))}
          <ModeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
