'use client';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export function ProjectFilter({
  query,
  onQueryChange,
  allTags,
  selectedTags,
  onTagToggle,
}: ProjectFilterProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-9"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button key={tag} onClick={() => onTagToggle(tag)} className="focus:outline-none">
            <Badge
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer transition-colors',
                selectedTags.includes(tag) && 'ring-1 ring-primary/50',
              )}
            >
              {tag}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
