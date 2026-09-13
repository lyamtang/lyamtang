'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { Github, Linkedin } from '@thesvg/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.1),transparent_34%),radial-gradient(circle_at_84%_78%,rgba(59,130,246,0.1),transparent_30%)]" />
        <div className="absolute inset-0 opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] [background-size:28px_28px] [background-image:linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.2)_1px,transparent_1px)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/82 to-background/64" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
            <p className="text-sm text-muted-foreground">© {currentYear} Lyam Tang. All rights reserved.</p>

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
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', duration: 0.25, bounce: 0 }}
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
