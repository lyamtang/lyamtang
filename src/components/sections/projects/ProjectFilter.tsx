'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { Drawer } from '@base-ui/react/drawer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { MOTION_DURATION, MOTION_EASING } from '@/lib/motion';
import styles from './ProjectFilterDrawer.module.css';

const drawerMotionStyle: CSSProperties & {
  '--filter-drawer-duration': string;
  '--filter-drawer-easing': string;
} = {
  '--filter-drawer-duration': `${MOTION_DURATION.base}s`,
  '--filter-drawer-easing': `cubic-bezier(${MOTION_EASING.smoothOut.join(',')})`,
};

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

  useEffect(() => {
    if (!drawerOpen) return;

    const desktop = window.matchMedia('(min-width: 64rem)');
    const closeOnDesktop = () => {
      if (desktop.matches) setDrawerOpen(false);
    };
    closeOnDesktop();
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, [drawerOpen]);

  const handleCategoryToggle = (category: string) => {
    onCategoryToggle(category);
  };

  const handleStatusChange = (status: ProjectStatus | 'all') => {
    onStatusChange(status);
  };

  const handleSearchChange = (searchQuery: string) => {
    onQueryChange(searchQuery);
  };

  const handleClearFilters = () => {
    onClearFilters();
  };

  const handleDrawerChange = (open: boolean) => {
    if (open) {
      setMobileDraft({
        categories: selectedCategories,
        status: selectedStatus,
      });
    }
    setDrawerOpen(open);
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
    }

    if (mobileDraft.status !== selectedStatus) {
      onStatusChange(mobileDraft.status);
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
      <Drawer.Root open={drawerOpen} onOpenChange={handleDrawerChange}>
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

        <Drawer.Trigger
          aria-label="Filter projects"
          render={
            <Button
              variant="outline"
              className={cn(
                'relative shrink-0 gap-2 border px-3 transition-colors',
                activeFilterCount > 0
                  ? 'border-primary/60 bg-primary/10 text-foreground hover:bg-primary/15'
                  : 'border-border',
              )}
            />
          }
        >
          <Filter className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <Badge className="h-5 min-w-5 justify-center rounded-full px-1.5 text-[10px]">
              {activeFilterCount}
            </Badge>
          )}
        </Drawer.Trigger>
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

      <Drawer.Portal>
        <Drawer.Backdrop
          className={cn(styles.backdrop, 'fixed inset-0 z-50 bg-black lg:hidden')}
          style={drawerMotionStyle}
        />
        <Drawer.Viewport className="fixed inset-0 z-50 flex items-end lg:hidden">
          <Drawer.Popup
            className={cn(styles.popup, 'flex max-h-[80dvh] w-full flex-col rounded-t-2xl border border-border bg-background shadow-2xl outline-none')}
            style={drawerMotionStyle}
          >
            <div className="shrink-0 px-4 pt-4">
              <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-muted" aria-hidden="true" />
              <div className="mb-2 flex items-center justify-between">
                <Drawer.Title className="text-sm font-semibold">Filters</Drawer.Title>
                <Drawer.Close aria-label="Close filters" render={<Button variant="ghost" size="icon" />}>
                  <X className="h-4 w-4" />
                </Drawer.Close>
              </div>
            </div>

            <Drawer.Content className="min-h-0 space-y-4 overflow-y-auto overscroll-contain px-4 pb-4">
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
                        aria-pressed={selected}
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
                    aria-pressed={mobileDraft.status === 'all'}
                    onClick={() => setMobileDraft((prev) => ({ ...prev, status: 'all' }))}
                  >
                    All statuses
                  </Button>
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={mobileDraft.status === status ? 'default' : 'outline'}
                      aria-pressed={mobileDraft.status === status}
                      onClick={() => setMobileDraft((prev) => ({ ...prev, status }))}
                    >
                      {formatStatusLabel(status)}
                    </Button>
                  ))}
                </div>
              </div>
            </Drawer.Content>

            <div className="flex shrink-0 items-center gap-2 border-t bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
              <Button variant="outline" className="flex-1" onClick={clearMobileDraft}>
                Clear
              </Button>
              <Button className="flex-1" onClick={applyMobileFilters}>
                Apply
              </Button>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
