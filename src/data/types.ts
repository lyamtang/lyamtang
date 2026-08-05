export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number | 'Present';
  gpa?: number;
  maxGpa?: number;
  location: string;
  highlights: string[];
}

export interface CertificationEntry {
  name: string;
  organisation: string;
  issueDate: string;
  verificationUrl: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Freelance';
  bullets: string[];
  tech: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface TimelinePhase {
  phase: string;
  description: string;
}

export interface PainPoint {
  problem: string;
  approach: string;
  outcome?: string;
}

export interface Technique {
  name: string;
  reason: string;
  contribution?: string;
}

export interface ProjectDetails {
  role?: string;
  duration?: string;
  team?: string;
  gallery?: GalleryImage[];
  timeline?: TimelinePhase[];
  painPoints?: PainPoint[];
  techniques?: Technique[];
  outcomes?: string[];
}

export type ProjectStatus ='in_progress' | 'completed';

export interface ProjectPeriod {
  startYear: number;
  endYear: number | 'Present';
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: string[];
  status: ProjectStatus;
  period: ProjectPeriod;
  details?: ProjectDetails;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: 'email' | 'linkedin' | 'github';
  display: string;
}
