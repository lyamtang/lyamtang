'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { event } from '@/lib/analytics';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown, Filter, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/data/types';
import { formatStatusLabel } from '@/lib/projectFilters';

interface ProjectFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  statuses: ProjectStatus[];
  selectedStatus: ProjectStatus | 'all';
  onStatusChange: (status: ProjectStatus | 'all') => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}

export function ProjectFilter({
  query,
  onQueryChange,
  categories,
  selectedCategories,
  onCategoryToggle,
  statuses,
  selectedStatus,
  onStatusChange,
  activeFilterCount,
  onClearFilters,
}: ProjectFilterProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileDraft, setMobileDraft] = useState({
    categories: selectedCategories,
    status: selectedStatus,
  });

  // Tracked wrappers for desktop filters
  const handleCategoryToggle = (category: string) => {
    onCategoryToggle(category);
    
    // Track category filter toggle
    const willBeSelected = !selectedCategories.includes(category);
    event('filter_applied', {
      filter_type: 'category',
      category,
      action: willBeSelected ? 'add' : 'remove',
    });
  };

  const handleStatusChange = (status: ProjectStatus | 'all') => {
    onStatusChange(status);
    
    // Track status filter change
    event('filter_applied', {
      filter_type: 'status',
      status,
    });
  };

  const handleSearchChange = (searchQuery: string) => {
    onQueryChange(searchQuery);
    
    // Track search only when user types something meaningful (3+ chars)
    if (searchQuery.length >= 3 && searchQuery.length % 3 === 0) {
      event('project_search', {
        query_length: searchQuery.length,
      });
    }
  };

  const handleClearFilters = () => {
    onClearFilters();
    
    // Track filter clearing
    event('filters_cleared', {
      cleared_count: activeFilterCount,
    });
  };

  const openDrawer = () => {
    setMobileDraft({
      categories: selectedCategories,
      status: selectedStatus,
    });
    setDrawerOpen(true);
  };

  const categoryActive = selectedCategories.length > 0;
  const statusActive = selectedStatus !== 'all';

  const categorySummary =
    selectedCategories.length === 0
      ? 'All categories'
      : selectedCategories.length === 1
        ? selectedCategories[0]
        : `${selectedCategories.length} selected`;

  const statusSummary = selectedStatus === 'all' ? 'All statuses' : formatStatusLabel(selectedStatus);

  const applyMobileFilters = () => {
    const sortedCategories = [...mobileDraft.categories].sort((a, b) => a.localeCompare(b));
    const currentSorted = [...selectedCategories].sort((a, b) => a.localeCompare(b));
    const sameCategories =
      sortedCategories.length === currentSorted.length &&
      sortedCategories.every((value, idx) => value === currentSorted[idx]);

    if (!sameCategories) {
      const toRemove = currentSorted.filter((item) => !sortedCategories.includes(item));
      const toAdd = sortedCategories.filter((item) => !currentSorted.includes(item));
      toRemove.forEach((category) => onCategoryToggle(category));
      toAdd.forEach((category) => onCategoryToggle(category));
      
      // Track category filter changes
      event('filter_applied', {
        filter_type: 'category',
        categories: sortedCategories.join(', '),
        category_count: sortedCategories.length,
      });
    }

    if (mobileDraft.status !== selectedStatus) {
      onStatusChange(mobileDraft.status);
      
      // Track status filter change
      event('filter_applied', {
        filter_type: 'status',
        status: mobileDraft.status,
      });
    }

    setDrawerOpen(false);
  };

  const clearMobileDraft = () => {
    setMobileDraft({
      categories: [],
      status: 'all',
    });
  };

  const triggerClass = (isActive: boolean) =>
    cn(
      'justify-between border transition-colors',
      isActive
        ? 'border-primary/60 bg-primary/10 text-foreground hover:bg-primary/15'
        : 'border-border bg-background hover:bg-muted',
    );

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-2 lg:hidden">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button
          variant="outline"
          className={cn(
            'relative shrink-0 gap-2 border px-3 transition-colors',
            activeFilterCount > 0
              ? 'border-primary/60 bg-primary/10 text-foreground hover:bg-primary/15'
              : 'border-border',
          )}
          onClick={openDrawer}
        >
          <Filter className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <Badge className="h-5 min-w-5 justify-center rounded-full px-1.5 text-[10px]">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-2 lg:flex-nowrap">
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="default" className={triggerClass(categoryActive)} />}>
              <span className="truncate">{categorySummary}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="default" className={triggerClass(statusActive)} />}>
              <span className="truncate">{statusSummary}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={selectedStatus} onValueChange={(value) => handleStatusChange(value as ProjectStatus | 'all')}>
                <DropdownMenuRadioItem value="all">All statuses</DropdownMenuRadioItem>
                {statuses.map((status) => (
                  <DropdownMenuRadioItem key={status} value={status}>
                    {formatStatusLabel(status)}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedStatus !== 'all') && (
        <div className="flex flex-wrap items-center gap-2">
          {selectedCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className="focus:outline-none"
            >
              <Badge variant="default" className="cursor-pointer gap-1">
                Category: {category}
                <X className="h-3 w-3" />
              </Badge>
            </button>
          ))}
          {selectedStatus !== 'all' && (
            <button onClick={() => handleStatusChange('all')} className="focus:outline-none">
              <Badge variant="default" className="cursor-pointer gap-1">
                Status: {formatStatusLabel(selectedStatus)}
                <X className="h-3 w-3" />
              </Badge>
            </button>
          )}
          <Button size="sm" variant="ghost" onClick={handleClearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" aria-modal="true" role="dialog">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl border border-border bg-background p-4 shadow-2xl">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
            <p className="mb-4 text-sm font-semibold">Filters</p>

            <div className="space-y-4 overflow-y-auto pb-20">
              <div className="space-y-2 rounded-xl border border-border p-3">
                <p className="text-sm font-medium">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const selected = mobileDraft.categories.includes(category);
                    return (
                      <Button
                        key={category}
                        size="sm"
                        variant={selected ? 'default' : 'outline'}
                        onClick={() =>
                          setMobileDraft((prev) => ({
                            ...prev,
                            categories: selected
                              ? prev.categories.filter((item) => item !== category)
                              : [...prev.categories, category],
                          }))
                        }
                      >
                        {selected && <Check className="h-3 w-3" />}
                        {category}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-border p-3">
                <p className="text-sm font-medium">Status</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={mobileDraft.status === 'all' ? 'default' : 'outline'}
                    onClick={() => setMobileDraft((prev) => ({ ...prev, status: 'all' }))}
                  >
                    All statuses
                  </Button>
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={mobileDraft.status === status ? 'default' : 'outline'}
                      onClick={() => setMobileDraft((prev) => ({ ...prev, status }))}
                    >
                      {formatStatusLabel(status)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t bg-background p-4">
              <Button variant="outline" className="flex-1" onClick={clearMobileDraft}>
                Clear
              </Button>
              <Button className="flex-1" onClick={applyMobileFilters}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
