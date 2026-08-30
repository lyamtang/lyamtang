"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@thesvg/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { contactLinks } from '@/data/contact';
import BorderGlow from '@/components/ui/BorderGlow';
import { trackContactClick, trackOutboundLink } from '@/lib/analytics';

const glowColors = ['#c084fc', '#f272b6', '#38bdf8'];

export function Contact() {
  const overlayContent = (
    <article className="relative h-full w-full overflow-hidden rounded-[28px] bg-white/95 p-6 text-foreground shadow-xl backdrop-blur-sm dark:bg-slate-950/85 sm:p-8">
      <div className="relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Lyam Tang</h3>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Product Manager in Training · Computer Science Graduate
            </p>
          </div>

          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            I build products at the intersection of engineering and strategy, turning
            technical complexity into experiences people can actually use and love.
          </p>
        </div>

        <div className="space-y-3 [transform-style:preserve-3d]">
          {contactLinks.map((link) => (
            <motion.div
              key={link.label}
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.992 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="[transform-style:preserve-3d]"
              style={{ transform: 'translateZ(40px)' }}
            >
              <Link
                href={link.href}
                target={link.icon !== 'email' ? '_blank' : undefined}
                rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 rounded-xl border border-slate-300/70 bg-white/82 px-4 py-3 text-foreground shadow-[0_10px_22px_-18px_rgba(15,23,42,0.35)] backdrop-blur-md transition-all duration-200 hover:border-primary/50 hover:bg-white/92 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/15"
                onClick={() => {
                  if (link.icon === 'email') {
                    trackContactClick('email_click');
                  } else {
                    trackOutboundLink(link.href, link.label);
                    trackContactClick(`${link.icon}_click`);
                  }
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300/60 bg-white/86 text-foreground dark:border-white/25 dark:bg-white/15"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {link.icon === 'email' && <Mail className="h-4 w-4" aria-hidden="true" />}
                  {link.icon === 'linkedin' && (
                    <Linkedin className="h-4 w-4 [&_*]:fill-current" aria-hidden="true" />
                  )}
                  {link.icon === 'github' && (
                    <Github className="h-4 w-4 [&_*]:fill-current" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0" style={{ transform: 'translateZ(14px)' }}>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {link.label}
                  </p>
                  <p className="truncate text-sm font-semibold text-foreground">{link.display}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </article>
  );

  return (
    <section id="contact" className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="I'm currently open to new opportunities. Feel free to reach out!"
        />
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4, rotateX: 1.5, rotateY: -2 }}
            className="w-full max-w-5xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <BorderGlow
              className="w-full"
              glowColor="283 49 64"
              backgroundColor="hsl(var(--background))"
              borderRadius={28}
              glowRadius={34}
              glowIntensity={0.95}
              edgeSensitivity={24}
              coneSpread={22}
              animated
              fillOpacity={0}
              colors={glowColors}
            >
              {overlayContent}
            </BorderGlow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
