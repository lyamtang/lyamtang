import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'portfolio',
    title: 'Personal Portfolio',
    shortDescription:
      "The site you're looking at. Built with Next.js 16, Tailwind CSS v4, and Framer Motion.",
    longDescription:
      'A responsive personal portfolio site built with Next.js 16 App Router, Tailwind CSS v4, shadcn/ui component library, and Framer Motion for scroll-triggered animations. Features dark/light theme toggling powered by next-themes, smooth scrolling via Lenis, and a searchable, filterable projects section backed by static TypeScript data files.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
    githubUrl: 'https://github.com/Lyam-T',
    featured: true,
    category: ['Web', 'Frontend'],
    year: 2025,
  },
  {
    slug: 'task-manager',
    title: 'Task Manager App',
    shortDescription:
      'A full-stack task management application with kanban boards and real-time collaboration.',
    longDescription:
      'A full-stack task management application that supports real-time collaboration, drag-and-drop kanban boards, and team workspaces. Built with React, Node.js, and PostgreSQL. Features JWT-based authentication, WebSocket for live updates, and a REST API consumed by the frontend.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Express', 'WebSocket'],
    githubUrl: 'https://github.com/Lyam-T',
    featured: true,
    category: ['Web', 'Full Stack'],
    year: 2024,
  },
  {
    slug: 'hkust-course-planner',
    title: 'HKUST Course Planner',
    shortDescription:
      'A smart course planning tool for HKUST students with prerequisite validation and conflict detection.',
    longDescription:
      "Built to eliminate the friction of manual course planning at HKUST. The tool scrapes and parses the university course catalogue, validates prerequisite chains, and detects schedule conflicts in real time. Used by peers during registration periods. The backend is powered by FastAPI and the frontend is a React SPA.",
    tech: ['React', 'Python', 'FastAPI', 'SQLite', 'BeautifulSoup'],
    githubUrl: 'https://github.com/Lyam-T',
    featured: true,
    category: ['Web', 'Full Stack', 'Tools'],
    year: 2023,
  },
  {
    slug: 'sentiment-analyser',
    title: 'Product Review Sentiment Analyser',
    shortDescription:
      'An NLP pipeline that classifies review sentiment and surfaces key complaint themes for product teams.',
    longDescription:
      'A machine learning project that fine-tunes a BERT-based model to classify product review sentiment (positive, negative, neutral) and extracts recurring complaint themes using LDA topic modelling. Designed as a lightweight internal tool for product managers to monitor customer feedback at scale without reading every review manually.',
    tech: ['Python', 'PyTorch', 'HuggingFace', 'Pandas', 'scikit-learn'],
    githubUrl: 'https://github.com/Lyam-T',
    featured: false,
    category: ['AI/ML', 'NLP'],
    year: 2024,
  },
];
