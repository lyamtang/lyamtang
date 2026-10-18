'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Mail, Send } from 'lucide-react';
import { Github, Linkedin } from '@thesvg/react';
import { useTheme } from 'next-themes';
import Folder from '@/components/ui/Folder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactLinks } from '@/data/contact';
import { trackContactClick, trackOutboundLink } from '@/lib/analytics';

function subscribeToDesktopChanges(callback: () => void) {
  const mediaQuery = window.matchMedia('(min-width: 640px)');
  mediaQuery.addEventListener('change', callback);

  return () => mediaQuery.removeEventListener('change', callback);
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 640px)').matches;
}

function getServerDesktopSnapshot() {
  return false;
}

function contactItemClick(index: number) {
  const link = contactLinks[index];

  if (!link) {
    return;
  }

  if (link.icon === 'email') {
    trackContactClick('email_click');
    window.location.href = link.href;
    return;
  }

  trackOutboundLink(link.href, link.label);
  trackContactClick(`${link.icon}_click`);
  window.open(link.href, '_blank', 'noopener,noreferrer');
}

export function Contact() {
  const { resolvedTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopChanges,
    getDesktopSnapshot,
    getServerDesktopSnapshot,
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHasMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isDark = hasMounted && resolvedTheme === 'dark';
  const folderSize = isDesktop ? 1.18 : 0.9;
  const cardClassName = isDark
    ? 'border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_38%),linear-gradient(145deg,#334155,#0f172a)] text-slate-100'
    : 'border border-slate-200 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_38%),linear-gradient(145deg,#ffffff,#e2e8f0)] text-slate-700';

  return (
    <section className="relative isolate overflow-hidden bg-background px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_7%_74%,rgba(56,189,248,0.15),transparent_31%),radial-gradient(circle_at_93%_18%,rgba(192,132,252,0.15),transparent_30%)] dark:bg-[radial-gradient(circle_at_7%_74%,rgba(56,189,248,0.1),transparent_31%),radial-gradient(circle_at_93%_18%,rgba(192,132,252,0.1),transparent_30%)]" />

      <div className="mx-auto grid min-h-[calc(100svh-11rem)] max-w-7xl lg:grid-cols-2">
        <section
          aria-labelledby="contacts-heading"
          className="flex min-h-[32rem] flex-col py-12 sm:py-16 lg:pr-16"
        >
          <div className="max-w-md">
            <h1 id="contacts-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ways to connect.
            </h1>
            <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
          </div>

          <div className="flex flex-1 items-center justify-center py-10 lg:py-6">
            <Folder
              items={contactLinks.map((link) => {
                const icon =
                  link.icon === 'email' ? (
                    <Mail className="size-11" aria-hidden="true" />
                  ) : link.icon === 'github' ? (
                    <Github className="size-11 [&_*]:fill-current" aria-hidden="true" />
                  ) : (
                    <Linkedin className="size-11 [&_*]:fill-current" aria-hidden="true" />
                  );

                return {
                  content: (
                    <div className={`flex size-full flex-col rounded-lg p-3 ${cardClassName}`}>
                      <span className="text-left text-xs font-semibold leading-none">{link.label}</span>
                      <span className="flex flex-1 items-center justify-center">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-background/20 shadow-sm">
                          {icon}
                        </span>
                      </span>
                      <span className="text-left text-[9px] leading-[1.35] break-all opacity-75">{link.display}</span>
                    </div>
                  ),
                };
              })}
              label="Contacts"
              tabPosition="left"
              color={isDark ? '#64748b' : '#a8b6c8'}
              paperColor={isDark ? '#1e293b' : '#f1f5f9'}
              theme={isDark ? 'dark' : 'light'}
              size={folderSize}
              defaultOpen
              intro={true}
              speed={1}
              draggable={false}
              zoomOnClick={false}
              closeOnOutsideClick={false}
              onItemClick={(_, index) => contactItemClick(index)}
            />
          </div>
        </section>

        <section
          aria-labelledby="message-heading"
          className="flex min-h-[36rem] flex-col py-12 sm:py-16 lg:pl-16"
        >
          <div className="max-w-xl">
            <h2 id="message-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Send a message.
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
              Have a product, collaboration, or opportunity in mind? Share the details and I&apos;ll get back to you.
            </p>
          </div>

          <form className="mt-10 grid flex-1 content-start gap-5" aria-describedby="message-status">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Your name
                <Input name="name" autoComplete="name" placeholder="Jane Smith" className="h-11 bg-background/60 px-3" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Email address
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className="h-11 bg-background/60 px-3"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-foreground">
              What would you like to discuss?
              <Input name="subject" placeholder="A quick introduction" className="h-11 bg-background/60 px-3" />
            </label>

            <label className="grid gap-2 text-sm font-medium text-foreground">
              Your message
              <textarea
                name="message"
                rows={6}
                placeholder="Tell me a little about what you have in mind..."
                className="min-h-40 w-full resize-y rounded-lg border border-input bg-background/60 px-3 py-2.5 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p id="message-status" className="text-sm leading-5 text-muted-foreground">
                Message delivery will be available once the contact API is connected.
              </p>
              <Button type="button" size="lg" disabled className="w-full sm:w-auto">
                Send message
                <Send aria-hidden="true" />
              </Button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}
