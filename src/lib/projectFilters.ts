import type { Project, ProjectStatus } from '@/data/types';

export interface ProjectFilterState {
  query: string;
  categories: string[];
  status: ProjectStatus | 'all';
}

export interface ProjectFilterOptions {
  categories: string[];
  statuses: ProjectStatus[];
}

const STATUS_ORDER: ProjectStatus[] = ['in_progress', 'completed'];

export function getProjectFilterOptions(projects: Project[]): ProjectFilterOptions {
  const categories = [...new Set(projects.flatMap((project) => project.category))].sort((a, b) =>
    a.localeCompare(b),
  );

  const statuses = [...new Set(projects.map((project) => project.status))].sort(
    (a, b) => STATUS_ORDER.indexOf(a) - STATUS_ORDER.indexOf(b),
  );

  return {
    categories,
    statuses,
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

export function getActiveFilterCount(filters: ProjectFilterState): number {
  let count = 0;
  if (filters.categories.length > 0) count += 1;
  if (filters.status !== 'all') count += 1;
  return count;
}

function getStatusRank(status: ProjectStatus): number {
  const index = STATUS_ORDER.indexOf(status);
  return index === -1 ? STATUS_ORDER.length : index;
}

function getPeriodEndWeight(project: Project): number {
  return project.period.endYear === 'Present' ? Number.POSITIVE_INFINITY : project.period.endYear;
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const statusDelta = getStatusRank(a.status) - getStatusRank(b.status);
    if (statusDelta !== 0) return statusDelta;

    const endYearDelta = getPeriodEndWeight(b) - getPeriodEndWeight(a);
    if (endYearDelta !== 0) return endYearDelta;

    return a.period.startYear - b.period.startYear;
  });
}

export function filterProjects(projects: Project[], filters: ProjectFilterState): Project[] {
  const q = filters.query.trim().toLowerCase();

  const filtered = projects.filter((project) => {
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

    return matchesQuery && matchesCategory && matchesStatus;
  });

  return sortProjects(filtered);
}
