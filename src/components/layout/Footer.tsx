'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Github, Linkedin } from '@thesvg/react';

import CircularText from '@/components/ui/CircularText';
import SnakeGrid from '@/components/ui/SnakeGrid';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/lyam-t/',
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Lyam-T',
      icon: Github,
    },
  ];

  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(56,189,248,0.13),transparent_38%),radial-gradient(circle_at_86%_80%,rgba(59,130,246,0.14),transparent_34%)]" />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_9%,black_94%,transparent)]">
          <SnakeGrid
            cellSize={34}
            gap={2}
            rounded={5}
            speed={7}
            maxLength={32}
            fade={68}
            snakeColor={isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.26)'}
            boardColor={isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(15, 23, 42, 0.065)'}
            foodColor={isDark ? 'rgba(96, 165, 250, 0.96)' : 'rgba(37, 99, 235, 0.86)'}
            style={{ height: '110%', transform: 'translateY(-5%)' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/76 to-background/56" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <div className="group relative flex h-24 w-24 items-center justify-center">
            <CircularText
              text={`© ${currentYear} LYAM TANG • `}
              spinDuration={26}
              onHover="slowDown"
              className="[--ct-color:var(--muted-foreground)] [--ct-letter-size:0.58rem]"
              size={88}
              radius={35}
            />
            <span className="pointer-events-none absolute text-[10px] font-medium tracking-[0.22em] text-muted-foreground/90 transition-colors group-hover:text-foreground/80">
              RIGHTS
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.name}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <link.icon className="h-5 w-5 [&_*]:fill-current" aria-hidden="true" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
