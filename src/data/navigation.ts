export type HeaderNavItem = {
  name: string;
  href: `/${string}` | '/';
};

export const headerNavItems: HeaderNavItem[] = [
  { name: 'About Me', href: '/' },
  { name: 'My Work', href: '/projects' },
  { name: 'Contact Me', href: '/contact' },
];
