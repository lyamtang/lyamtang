'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Github, Linkedin } from '@thesvg/react';

export default function Footer() {
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
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lyam Tang. All rights reserved.
          </p>

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
