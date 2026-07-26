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
  year: number;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: 'email' | 'linkedin' | 'github';
  display: string;
}
