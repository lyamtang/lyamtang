'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarRange, Check, ChevronDown, Filter, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/data/types';
import { formatStatusLabel } from '@/lib/projectFilters';

interface YearRange {
  from: number;
  to: number;
}

function YearRangeSlider({
  range,
  bounds,
  onChange,
  id,
}: {
  range: YearRange;
  bounds: YearRange;
  onChange: (nextRange: YearRange) => void;
  id: string;
}) {
  const span = Math.max(bounds.to - bounds.from, 1);
  const fromPct = ((range.from - bounds.from) / span) * 100;
  const toPct = ((range.to - bounds.from) / span) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{range.from}</span>
        <span className="font-medium text-foreground">{range.from} - {range.to}</span>
        <span>{range.to}</span>
      </div>
      <div className="relative h-7">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-muted" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: `${fromPct}%`,
            width: `${Math.max(toPct - fromPct, 0)}%`,
          }}
        />
        <input
          id={`${id}-from`}
          type="range"
          min={bounds.from}
          max={bounds.to}
          step={1}
          value={range.from}
          onChange={(e) => {
            const nextFrom = Number(e.target.value);
            onChange({
              from: Math.min(nextFrom, range.to),
              to: range.to,
            });
          }}
          className="pointer-events-none absolute inset-0 h-7 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary/70 [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm"
          aria-label="Start year"
        />
        <input
          id={`${id}-to`}
          type="range"
          min={bounds.from}
          max={bounds.to}
          step={1}
          value={range.to}
          onChange={(e) => {
            const nextTo = Number(e.target.value);
            onChange({
              from: range.from,
              to: Math.max(nextTo, range.from),
            });
          }}
          className="pointer-events-none absolute inset-0 h-7 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary/70 [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm"
          aria-label="End year"
        />
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{bounds.from}</span>
        <span>{bounds.to}</span>
      </div>
    </div>
  );
}

interface ProjectFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  statuses: ProjectStatus[];
  selectedStatus: ProjectStatus | 'all';
  onStatusChange: (status: ProjectStatus | 'all') => void;
  yearRange: YearRange;
  onYearRangeChange: (nextRange: YearRange) => void;
  yearBounds: YearRange;
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
  yearRange,
  onYearRangeChange,
  yearBounds,
  activeFilterCount,
  onClearFilters,
}: ProjectFilterProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileDraft, setMobileDraft] = useState({
    categories: selectedCategories,
    status: selectedStatus,
    yearRange,
  });

  const openDrawer = () => {
    setMobileDraft({
      categories: selectedCategories,
      status: selectedStatus,
      yearRange,
    });
    setDrawerOpen(true);
  };

  const hasYearFilter = yearRange.from !== yearBounds.from || yearRange.to !== yearBounds.to;
  const categoryActive = selectedCategories.length > 0;
  const statusActive = selectedStatus !== 'all';

  const yearSummary = hasYearFilter
    ? `${yearRange.from}-${yearRange.to}`
    : `All years (${yearBounds.from}-${yearBounds.to})`;

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

    if (
      mobileDraft.yearRange.from !== yearRange.from ||
      mobileDraft.yearRange.to !== yearRange.to
    ) {
      onYearRangeChange(mobileDraft.yearRange);
    }

    setDrawerOpen(false);
  };

  const clearMobileDraft = () => {
    setMobileDraft({
      categories: [],
      status: 'all',
      yearRange: yearBounds,
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
            onChange={(e) => onQueryChange(e.target.value)}
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

      <div className="hidden lg:flex lg:items-center lg:gap-2">
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
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

        <div className="grid w-auto grid-cols-3 gap-2">
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
                  onCheckedChange={() => onCategoryToggle(category)}
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
              <DropdownMenuRadioGroup value={selectedStatus} onValueChange={(value) => onStatusChange(value as ProjectStatus | 'all')}>
                <DropdownMenuRadioItem value="all">All statuses</DropdownMenuRadioItem>
                {statuses.map((status) => (
                  <DropdownMenuRadioItem key={status} value={status}>
                    {formatStatusLabel(status)}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="default" className={triggerClass(hasYearFilter)} />}>
              <span className="truncate">{yearSummary}</span>
              <CalendarRange className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Year range</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <div className="space-y-4 px-2 py-2">
                <YearRangeSlider
                  id="desktop-year-range"
                  range={yearRange}
                  bounds={yearBounds}
                  onChange={onYearRangeChange}
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onYearRangeChange(yearBounds)}>Reset year range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedStatus !== 'all' || hasYearFilter) && (
        <div className="flex flex-wrap items-center gap-2">
          {selectedCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryToggle(category)}
              className="focus:outline-none"
            >
              <Badge variant="default" className="cursor-pointer gap-1">
                Category: {category}
                <X className="h-3 w-3" />
              </Badge>
            </button>
          ))}
          {selectedStatus !== 'all' && (
            <button onClick={() => onStatusChange('all')} className="focus:outline-none">
              <Badge variant="default" className="cursor-pointer gap-1">
                Status: {formatStatusLabel(selectedStatus)}
                <X className="h-3 w-3" />
              </Badge>
            </button>
          )}
          {hasYearFilter && (
            <button onClick={() => onYearRangeChange(yearBounds)} className="focus:outline-none">
              <Badge variant="default" className="cursor-pointer gap-1">
                Year: {yearRange.from}-{yearRange.to}
                <X className="h-3 w-3" />
              </Badge>
            </button>
          )}
          <Button size="sm" variant="ghost" onClick={onClearFilters}>
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

              <div className="space-y-3 rounded-xl border border-border p-3">
                <p className="text-sm font-medium">Year range</p>
                <YearRangeSlider
                  id="mobile-year-range"
                  range={mobileDraft.yearRange}
                  bounds={yearBounds}
                  onChange={(nextRange) =>
                    setMobileDraft((prev) => ({
                      ...prev,
                      yearRange: nextRange,
                    }))
                  }
                />
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
