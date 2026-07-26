import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@thesvg/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { contactLinks } from '@/data/contact';

export function Contact() {
  return (
    <section id="contact" className="bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <SectionHeading
          title="Get In Touch"
          subtitle="I'm currently open to new opportunities. Feel free to reach out!"
          centered
        />
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          {contactLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.icon !== 'email' ? '_blank' : undefined}
              rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {link.icon === 'email' && <Mail className="h-4 w-4" aria-hidden="true" />}
              {link.icon === 'linkedin' && (
                <Linkedin className="h-4 w-4 [&_*]:fill-current" aria-hidden="true" />
              )}
              {link.icon === 'github' && (
                <Github className="h-4 w-4 [&_*]:fill-current" aria-hidden="true" />
              )}
              {link.display}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
