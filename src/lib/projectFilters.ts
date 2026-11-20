import type { Project, ProjectFocus, ProjectIndustry, ProjectStatus } from '@/data/types';
import { FOCUS_BY_VALUE, INDUSTRY_BY_VALUE } from '@/lib/projectTaxonomy';

export interface ProjectFilterState {
  query: string;
  industries: ProjectIndustry[];
  focuses: ProjectFocus[];
  status: ProjectStatus | 'all';
}

export const DEFAULT_FILTERS: ProjectFilterState = {
  query: '',
  industries: [],
  focuses: [],
  status: 'all',
};

const STATUS_ORDER: ProjectStatus[] = ['in_progress', 'completed'];

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
  return filters.industries.length + filters.focuses.length + (filters.status === 'all' ? 0 : 1);
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
      INDUSTRY_BY_VALUE[project.industry].label.toLowerCase().includes(q) ||
      project.focus.some((focus) => FOCUS_BY_VALUE[focus].label.toLowerCase().includes(q));

    const matchesIndustry =
      filters.industries.length === 0 || filters.industries.includes(project.industry);

    const matchesFocus =
      filters.focuses.length === 0 ||
      filters.focuses.some((focus) => project.focus.includes(focus));

    const matchesStatus = filters.status === 'all' || project.status === filters.status;

    return matchesQuery && matchesIndustry && matchesFocus && matchesStatus;
  });

  return sortProjects(filtered);
}
