'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackToProjectsLink() {
  return (
    <Link
      href="/projects"
      className="mb-8 inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to projects
    </Link>
  );
}
