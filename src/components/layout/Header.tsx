'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export default function Header() {
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/90"
    >
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-white"
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
                href={link.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
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
        </div>
      </nav>
    </motion.header>
  );
}
