'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackToProjectsLink() {
  return (
    <Link
      href="/projects"
      className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to projects
    </Link>
  );
}
