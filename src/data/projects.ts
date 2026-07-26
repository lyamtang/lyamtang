import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'personal-website',
    title: 'Personal Website',
    shortDescription:
      "The site you're looking at. Built with Next.js 16, Tailwind CSS v4, and Framer Motion.",
    longDescription:
      'A responsive personal portfolio site built with Next.js 16 App Router, Tailwind CSS v4, shadcn/ui component library, and Framer Motion for scroll-triggered animations. Features dark/light theme toggling powered by next-themes, smooth scrolling via Lenis, and a searchable, filterable projects section backed by static TypeScript data files.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
    githubUrl: 'https://github.com/lyamtang/lyamtang',
    featured: true,
    category: ['Web', 'Frontend'],
    year: 2026,
  },
  {
    slug: 'aiot-smart-eldercare',
    title: 'AIoT Smart Eldercare',
    shortDescription:
      'An AIoT smart eldercare solution for remote health monitoring and management.',
    longDescription:
      'An AIoT smart eldercare solution that integrates hardware device, real-time data analytics, and a mobile app/ website for caregivers. Built with React Native, Node.js, and PostgreSQL. Features analyzed predictions, real-time health monitoring, alert notifications, and secure data management.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'TypeScript', 'Go', 'WebSocket'],
    githubUrl: '',
    featured: true,
    category: ['Web', 'Full Stack', 'Product Management'],
    year: 2026,
  },
  {
    slug: 'predictive-behavioral-safety-app',
    title: 'Predictive Behavioral Safety App',
    shortDescription:
      'A predictive safety application developed using hybrid project estimation frameworks, AI-driven rapid prototyping, and structured WBS requirements engineering.',
    longDescription:
      'Designed and planned a predictive behavioral safety platform with a focus on agile project estimation and requirements engineering. Architected a hybrid framework combining Function Point Analysis (FPA) and Delphi techniques to minimize anchoring bias and subjectivity in sprint planning. Leveraged generative AI tools to rapidly produce high-fidelity user mockups for early iterative validation, while translating ambiguous stakeholder requests into a structured Work Breakdown Structure (WBS).',
    tech: ['Generative AI', 'UI/UX Design', 'FPA Estimation', 'WBS'],
    githubUrl: 'https://github.com/Lyam-T/ISOM3010',
    featured: true,
    category: ['Project Management', 'UI/UX', 'Tools'],
    year: 2026,
  }, 
  {
    slug: 'earthquake-shelter',
    title: 'Earthquake Shelter',
    shortDescription:
      'A chatbot interface for controlled disaster management scenarios, enabling autonomous rescue robots to communicate with human operators in emergency situations.',
    longDescription:
      'This comprehensive Human-Robot Interaction project focuses on developing intuitive interfaces for disaster management scenarios. The system enables seamless communication between human operators and rescue robots in emergency situations, potentially saving lives through improved coordination and response times in earthquake-affected areas of Japan.',
    tech: ['Svelte', 'Prompt Engineering', 'Human-Robot Interaction'],
    githubUrl: '',
    featured: true,
    category: ['HCI'],
    year: 2025,
  }, 
  {
    slug: 'xr-tourist',
    title: 'XR Tourist',
    shortDescription:
      'We built a prototype of an Extended Reality (XR) application to validate the feasibility of immersive virtual experiences for local community engagement and tourism.',
    longDescription:
      'An Extended Reality (XR) application designed to strengthen local community connections through immersive virtual experiences. This project combines VR, AR, and mixed reality technologies to create shared spaces where community members can interact, collaborate, and engage in local activities.',
    tech: ['Generative AI', 'XR Development', 'Unity'],
    githubUrl: '',
    featured: true,
    category: ['HCI'],
    year: 2025,
  }, 
  {
    slug: 'stock-prediction',
    title: 'Stock Prediction',
    shortDescription:
      'A machine learning model for predicting stock prices based on historical data and market indicators.',
    longDescription:
      'The model leverages time series analysis and various predictive algorithms to forecast stock trends. It explores the effectiveness of the models\' choices, and explore the reasoning behind the predictions.',
    tech: ['Machine Learning', 'Time Series Analysis', 'Python', 'Long Short Term Memory (LSTM)'],
    githubUrl: '',
    featured: true,
    category: ['Machine Learning',  'Data Science'],
    year: 2025,
  }, 
];
