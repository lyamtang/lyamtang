import type { ExperienceEntry } from './types';

export const experience: ExperienceEntry[] = [
  {
    company: 'Company Name',
    role: 'Software Engineering Intern',
    startDate: 'Jun 2023',
    endDate: 'Aug 2023',
    location: 'Hong Kong',
    type: 'Internship',
    bullets: [
      'Built and shipped a feature used by N+ users, reducing task completion time by X%.',
      'Collaborated with product and design teams within a two-week sprint cycle.',
      'Improved test coverage from X% to Y% by writing unit and integration tests.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    company: 'Another Organisation',
    role: 'Junior Developer',
    startDate: 'Jan 2023',
    endDate: 'May 2023',
    location: 'Remote',
    type: 'Part-time',
    bullets: [
      'Developed and maintained internal tooling using React and Python.',
      'Contributed to code reviews and technical documentation.',
    ],
    tech: ['React', 'Python', 'REST APIs'],
  },
];
