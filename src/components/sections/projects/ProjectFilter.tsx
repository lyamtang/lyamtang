'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Filter, RotateCcw, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MOTION_DURATION, MOTION_EASING } from '@/lib/motion';
import { getActiveFilterCount, type ProjectFilterState } from '@/lib/projectFilters';
import {
  FOCUS_OPTIONS,
  INDUSTRY_OPTIONS,
  STATUS_OPTIONS,
  type TaxonomyOption,
} from '@/lib/projectTaxonomy';

interface ProjectFilterProps {
  filters: ProjectFilterState;
  onFiltersChange: (filters: ProjectFilterState) => void;
}

const SCROLL_CLOSE_PX = 64;

const toggleValue = <T,>(values: T[], value: T): T[] =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

const segmentClass =
  'relative inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground/70 transition-[color,background-color,scale] duration-150 outline-none touch-manipulation hover:bg-foreground/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 disabled:active:scale-100 sm:size-10';

const iconSwapClass = (visible: boolean) =>
  cn(
    'absolute size-4 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:scale-100 motion-reduce:blur-none',
    visible ? 'scale-100 opacity-100 blur-none' : 'scale-25 opacity-0 blur-[4px]',
  );

function ChipGroup({
  label,
  action,
  className,
  children,
}: {
  label: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="group" aria-label={label} className={cn('flex flex-col gap-2', className)}>
      <div className={cn('flex items-center justify-between gap-2', action && '-mt-1.5 mb-1')}>
        <p aria-hidden="true" className="text-xs font-medium text-muted-foreground">
          {label}
        </p>
        {action}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip<T extends string>({
  option,
  selected,
  onToggle,
}: {
  option: TaxonomyOption<T>;
  selected: boolean;
  onToggle: () => void;
}) {
  const Icon = option.icon;

  return (
    <Button
      type="button"
      variant={selected ? 'default' : 'outline'}
      aria-pressed={selected}
      onClick={onToggle}
      className="rounded-full px-3.5 duration-150"
    >
      <Icon />
      {option.label}
    </Button>
  );
}

export function ProjectFilter({ filters, onFiltersChange }: ProjectFilterProps) {
  const panelId = useId();
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeCount = getActiveFilterCount(filters);
  const searchVisible = searchOpen || filters.query.length > 0;

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus({ preventScroll: true });
  }, [searchOpen]);

  useEffect(() => {
    if (!panelOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!toolbarRef.current?.contains(event.target as Node)) setPanelOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, [panelOpen]);

  useEffect(() => {
    if (!panelOpen) return;

    // The pinned panel would cover the cards the user scrolls to inspect.
    const startY = window.scrollY;
    const closeOnScroll = () => {
      if (Math.abs(window.scrollY - startY) > SCROLL_CLOSE_PX) setPanelOpen(false);
    };
    window.addEventListener('scroll', closeOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', closeOnScroll);
  }, [panelOpen]);

  const update = (patch: Partial<ProjectFilterState>) => onFiltersChange({ ...filters, ...patch });

  const closeSearch = () => {
    update({ query: '' });
    setSearchOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    if (panelOpen) {
      setPanelOpen(false);
    } else if (searchVisible) {
      closeSearch();
    }
  };

  return (
    <div
      ref={toolbarRef}
      onKeyDown={handleKeyDown}
      className="pointer-events-none sticky top-[calc(var(--projects-filter-top-offset)+0.5rem)] z-30 mb-6 flex flex-col items-end transition-[top] duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION_DURATION.base, delay: 0.12, ease: MOTION_EASING.smoothOut }}
        className="nav-glass pointer-events-auto flex max-w-full items-center gap-0.5 rounded-full p-1"
      >
        <div
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget) && !filters.query) {
              setSearchOpen(false);
            }
          }}
          className={cn(
            'flex h-11 min-w-0 items-center rounded-full transition-[width,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring/50 motion-reduce:transition-none sm:h-10',
            searchVisible
              ? 'w-[min(13rem,calc(100vw-9rem))] bg-foreground/8 sm:w-72'
              : 'w-11 hover:bg-foreground/8 sm:w-10',
          )}
        >
          <button
            type="button"
            aria-label="Search projects"
            aria-expanded={searchVisible}
            onClick={() => (searchVisible ? inputRef.current?.focus() : setSearchOpen(true))}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground/70 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 sm:size-10"
          >
            <Search className="size-4" />
          </button>
          <div inert={!searchVisible} className="flex min-w-0 flex-1 items-center overflow-hidden">
            <input
              ref={inputRef}
              type="text"
              enterKeyHint="search"
              aria-label="Search projects"
              placeholder="Search"
              value={filters.query}
              onChange={(event) => update({ query: event.target.value })}
              className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground sm:text-sm"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground/70 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 sm:size-10"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Filter projects"
          aria-expanded={panelOpen}
          aria-controls={panelId}
          onClick={() => setPanelOpen((open) => !open)}
          className={cn(
            segmentClass,
            'aria-expanded:bg-foreground/10 aria-expanded:text-foreground',
            activeCount > 0 && 'text-foreground',
          )}
        >
          <Filter className={iconSwapClass(!panelOpen)} />
          <X className={iconSwapClass(panelOpen)} />
          {activeCount > 0 && (
            <span className="absolute end-0 top-0 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground tabular-nums">
              {activeCount}
            </span>
          )}
        </button>
      </motion.div>

      <div
        id={panelId}
        inert={!panelOpen}
        className={cn(
          'pointer-events-auto grid w-full transition-[grid-template-rows,opacity,visibility] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-[opacity,visibility]',
          panelOpen
            ? 'visible grid-rows-[1fr] opacity-100 duration-200'
            : 'invisible grid-rows-[0fr] opacity-0 duration-150',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-2 flex flex-wrap gap-x-10 gap-y-5 rounded-2xl border border-border bg-card/95 p-4 backdrop-blur-xl sm:p-5">
            <ChipGroup
              label="Industry"
              className="basis-full"
              action={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Reset filters"
                  disabled={activeCount === 0}
                  onClick={() => update({ industries: [], focuses: [], status: 'all' })}
                  className="size-9 rounded-full"
                >
                  <RotateCcw />
                </Button>
              }
            >
              {INDUSTRY_OPTIONS.map((option) => (
                <FilterChip
                  key={option.value}
                  option={option}
                  selected={filters.industries.includes(option.value)}
                  onToggle={() =>
                    update({ industries: toggleValue(filters.industries, option.value) })
                  }
                />
              ))}
            </ChipGroup>
            <ChipGroup label="Focus">
              {FOCUS_OPTIONS.map((option) => (
                <FilterChip
                  key={option.value}
                  option={option}
                  selected={filters.focuses.includes(option.value)}
                  onToggle={() => update({ focuses: toggleValue(filters.focuses, option.value) })}
                />
              ))}
            </ChipGroup>
            <ChipGroup label="Status">
              {STATUS_OPTIONS.map((option) => (
                <FilterChip
                  key={option.value}
                  option={option}
                  selected={filters.status === option.value}
                  onToggle={() =>
                    update({ status: filters.status === option.value ? 'all' : option.value })
                  }
                />
              ))}
            </ChipGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
