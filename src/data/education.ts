import type { EducationEntry } from './types';

export const education: EducationEntry[] = [
  {
    institution: 'Hong Kong University of Science and Technology',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science',
    startYear: 2022,
    endYear: 2026,
    gpa: 3.5,
    maxGpa: 4.3,
    location: 'Clear Water Bay, Hong Kong',
    highlights: [
      'Product Management',
      'Information System Project Management',
      'Human Computer Interaction',
      'Data Visualization',
      'Database Systems'
    ],
  },
  {
    institution: 'National University of Singapore',
    degree: 'School of Computing',
    field: 'Exchange',
    startYear: 2025,
    endYear: 2025,
    gpa: 4.1,
    maxGpa: 5.0,
    location: 'Singapore',
    highlights: [
      'Software Engineering',
      'Machine Learning',
      'Parallel and Concurrent Programming',
      'Computer Vision and Pattern Recognition'
    ],
  },
];
