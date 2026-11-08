import { BriefcaseBusiness, CircleUserRound, Mail, type LucideIcon } from 'lucide-react';

export type HeaderNavItem = {
  name: string;
  href: `/${string}` | '/';
  icon: LucideIcon;
};

export const headerNavItems: HeaderNavItem[] = [
  { name: 'About Me', href: '/', icon: CircleUserRound },
  { name: 'My Work', href: '/projects', icon: BriefcaseBusiness },
  { name: 'Contact Me', href: '/contact', icon: Mail },
];

export function getActiveNavHref(pathname: string): HeaderNavItem['href'] {
  if (pathname === '/projects' || pathname.startsWith('/projects/')) return '/projects';
  if (pathname === '/contact' || pathname.startsWith('/contact/')) return '/contact';
  return '/';
}
