import {
  BrainCircuit,
  CircleCheck,
  Code,
  Hourglass,
  HeartPulse,
  Kanban,
  Landmark,
  Laptop,
  Palette,
  Plane,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react';
import type { ProjectFocus, ProjectIndustry, ProjectStatus } from '@/data/types';

export interface TaxonomyOption<T extends string> {
  value: T;
  label: string;
  icon: LucideIcon;
}

export const INDUSTRY_OPTIONS: TaxonomyOption<ProjectIndustry>[] = [
  { value: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { value: 'safety', label: 'Safety', icon: ShieldAlert },
  { value: 'finance', label: 'Finance', icon: Landmark },
  { value: 'tourism', label: 'Tourism', icon: Plane },
  { value: 'tech', label: 'Tech', icon: Laptop },
];

export const FOCUS_OPTIONS: TaxonomyOption<ProjectFocus>[] = [
  { value: 'engineering', label: 'Engineering', icon: Code },
  { value: 'design', label: 'Design', icon: Palette },
  { value: 'management', label: 'Management', icon: Kanban },
  { value: 'ai_data', label: 'AI & Data', icon: BrainCircuit },
];

export const STATUS_OPTIONS: TaxonomyOption<ProjectStatus>[] = [
  { value: 'in_progress', label: 'In Progress', icon: Hourglass },
  { value: 'completed', label: 'Completed', icon: CircleCheck },
];

export const INDUSTRY_BY_VALUE = Object.fromEntries(
  INDUSTRY_OPTIONS.map((option) => [option.value, option]),
) as Record<ProjectIndustry, TaxonomyOption<ProjectIndustry>>;

export const FOCUS_BY_VALUE = Object.fromEntries(
  FOCUS_OPTIONS.map((option) => [option.value, option]),
) as Record<ProjectFocus, TaxonomyOption<ProjectFocus>>;
