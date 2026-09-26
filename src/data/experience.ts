import type { CompanyExperience } from './types';

export const experience: CompanyExperience[] = [
  {
    company: 'TransUnion',
    location: 'Hong Kong',
    roles: [
      {
        title: 'Analyst, Product Management - Consumer Interactive',
        startDate: 'Sep 2026',
        endDate: 'Present',
        type: 'Full-time',
        bullets: [
          'Optimized web and mobile user experiences by analyzing interaction data to guide enhancement projects, while driving workflow efficiency through scalable report automations'
        ],
        tech: ['Google Analytics 360']
      },
      {
        title: 'Summer Intern, Product Management',
        startDate: 'Jun 2026',
        endDate: 'Aug 2026',
        type: 'Internship',
        bullets: [
          'Spearheaded consumer interaction enhancements by conducting mobile UX research, mapping end-to-end user journeys, and engineering automated performance dashboards to optimize team workflow efficiency.'
        ],
        tech: ['PowerBI', 'Power Automate', 'MS DAX']
      }
    ]
  },
  {
    company: 'Neufast Limited',
    location: 'Hong Kong',
    roles: [
      {
        title: 'Software Engineer Intern',
        startDate: 'Jun 2025',
        endDate: 'Aug 2025',
        type: 'Internship',
        bullets: [
          'Scaled B2B platform efficiency by designing reusable configuration templates and defining technical migration roadmaps to reduce system tech debt and accelerate engineering velocity.'
        ],
        tech: ['React', 'MongoDB', 'Python', 'Vite', 'Rest API', 'Docker']
      }
    ]
  },
  {
    company: 'Veristech Limited',
    location: 'Hong Kong',
    roles: [
      {
        title: 'IT Programmer',
        startDate: 'Jun 2024',
        endDate: 'Aug 2024',
        type: 'Internship',
        bullets: [
          'Bridged business requirements and technical execution by designing interactive patent analytics dashboards and conducting end-to-end quality assurance across Web, iOS, and Android platforms.'
        ],
        tech: ['JS', 'HTML', 'CSS', 'PHP', 'Microsoft SQL Server']
      }
    ]
  }
];