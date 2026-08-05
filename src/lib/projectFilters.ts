import type { Project, ProjectStatus } from '@/data/types';

export interface YearRange {
  from: number;
  to: number;
}

export interface ProjectFilterState {
  query: string;
  categories: string[];
  status: ProjectStatus | 'all';
  yearRange: YearRange;
}

export interface ProjectFilterOptions {
  categories: string[];
  statuses: ProjectStatus[];
  yearBounds: YearRange;
}

const STATUS_ORDER: ProjectStatus[] = ['in_progress', 'completed'];

export function getProjectFilterOptions(projects: Project[]): ProjectFilterOptions {
  const categories = [...new Set(projects.flatMap((project) => project.category))].sort((a, b) =>
    a.localeCompare(b),
  );

  const statuses = [...new Set(projects.map((project) => project.status))].sort(
    (a, b) => STATUS_ORDER.indexOf(a) - STATUS_ORDER.indexOf(b),
  );

  const years = projects.map((project) => project.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  return {
    categories,
    statuses,
    yearBounds: {
      from: minYear,
      to: maxYear,
    },
  };
}

export function formatStatusLabel(status: ProjectStatus): string {
  switch (status) {
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
}

export function isYearRangeDefault(range: YearRange, bounds: YearRange): boolean {
  return range.from <= bounds.from && range.to >= bounds.to;
}

export function getActiveFilterCount(filters: ProjectFilterState, bounds: YearRange): number {
  let count = 0;
  if (filters.categories.length > 0) count += 1;
  if (filters.status !== 'all') count += 1;
  if (!isYearRangeDefault(filters.yearRange, bounds)) count += 1;
  return count;
}

export function filterProjects(projects: Project[], filters: ProjectFilterState): Project[] {
  const q = filters.query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesQuery =
      q.length === 0 ||
      project.title.toLowerCase().includes(q) ||
      project.shortDescription.toLowerCase().includes(q) ||
      project.longDescription.toLowerCase().includes(q) ||
      project.tech.some((tech) => tech.toLowerCase().includes(q)) ||
      project.category.some((category) => category.toLowerCase().includes(q));

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.some((selectedCategory) => project.category.includes(selectedCategory));

    const matchesStatus = filters.status === 'all' || project.status === filters.status;

    const matchesYear =
      project.year >= filters.yearRange.from && project.year <= filters.yearRange.to;

    return matchesQuery && matchesCategory && matchesStatus && matchesYear;
  });
}
