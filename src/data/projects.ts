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
    details: {
      role: 'Designer & Developer',
      duration: '4 weeks',
      team: 'Solo',
      gallery: [
        {
          src: '/images/projects/personal-website/01.svg',
          alt: 'Hero section',
          caption: 'Hero section with animated entrance and dark/light theme toggling',
        },
        {
          src: '/images/projects/personal-website/02.svg',
          alt: 'Projects section',
          caption: 'Searchable, filterable project grid with tech-stack tag filters',
        },
      ],
      timeline: [
        {
          phase: 'Planning & Design',
          description:
            'Defined the site structure, selected the tech stack, and established the visual language and component system.',
        },
        {
          phase: 'Development',
          description:
            'Built the Next.js App Router structure with static export, integrated Tailwind CSS v4 and shadcn/ui, and implemented Framer Motion scroll animations.',
        },
        {
          phase: 'Content & Polish',
          description:
            'Authored all project and experience content, refined animations and spacing, and deployed to production.',
        },
      ],
      techniques: [
        {
          name: 'Next.js App Router with static export',
          reason:
            'RSC-first rendering with full SSG enables zero cold starts and instant page loads without a running server.',
          contribution: 'Configured the static export pipeline and structured all routes under the App Router paradigm.',
        },
        {
          name: 'Framer Motion whileInView',
          reason:
            'Scroll-triggered animations create a polished feel without impacting initial page load performance.',
          contribution: 'Designed and implemented all entrance and hover animation variants across the site.',
        },
        {
          name: 'Tailwind CSS v4 with CSS variables',
          reason:
            'Theme-aware design system with dark/light mode support driven entirely by CSS custom properties.',
          contribution: 'Built the full token system and dark/light mode switching via next-themes.',
        },
      ],
      outcomes: [
        'Delivered a fully functional personal portfolio with dark/light theming and smooth scroll animations.',
        'Built and deployed the entire site solo in under 4 weeks.',
        'Used as the primary portfolio artifact for recruiting and professional networking.',
      ],
    },
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
    details: {
      role: 'Full-Stack Developer & Product Manager',
      duration: '6 months',
      team: '5 members',
      gallery: [
        {
          src: '/images/projects/aiot-smart-eldercare/01.svg',
          alt: 'Health monitoring dashboard',
          caption: 'Real-time dashboard showing patient vitals, alerts, and 24-hour heart rate trend',
        },
        {
          src: '/images/projects/aiot-smart-eldercare/02.svg',
          alt: 'Caregiver mobile app',
          caption: 'Cross-platform React Native app — patient list and vitals detail view',
        },
        {
          src: '/images/projects/aiot-smart-eldercare/03.svg',
          alt: 'System architecture diagram',
          caption: 'End-to-end architecture: IoT sensors → Go service → PostgreSQL → WebSocket → apps',
        },
      ],
      timeline: [
        {
          phase: 'Discovery & Requirements',
          description:
            'Interviewed caregivers and elderly users to identify core monitoring needs, alert thresholds, and UX pain points.',
        },
        {
          phase: 'Architecture Design',
          description:
            'Designed a microservices system with WebSocket for real-time streaming and PostgreSQL for time-series health data storage.',
        },
        {
          phase: 'Hardware Integration',
          description:
            'Integrated IoT sensors with the backend via a high-throughput Go service for concurrent device data ingestion.',
        },
        {
          phase: 'Mobile & Web Development',
          description:
            'Built the React Native caregiver app and web dashboard with live health metrics, alerts, and patient history views.',
        },
        {
          phase: 'Testing & Iteration',
          description:
            'Conducted user testing sessions with caregivers, refining alert sensitivity and UI clarity based on direct feedback.',
        },
      ],
      painPoints: [
        {
          problem:
            'WebSocket connections dropped frequently under poor mobile network conditions, causing missed health alerts.',
          approach:
            'Implemented reconnection logic with exponential back-off and a local offline queue that syncs on reconnect.',
          outcome: 'Reduced alert delivery failures to near zero in simulated poor-connectivity tests.',
        },
        {
          problem:
            'Early prototype generated too many false positive alerts, leading to caregiver alert fatigue and distrust.',
          approach:
            'Built a per-patient threshold calibration system that adjusts sensitivity based on caregiver feedback.',
          outcome: 'Reduced false positive alerts by approximately 40% in internal testing.',
        },
        {
          problem:
            'The React Native app and web dashboard developed diverging UI patterns, increasing maintenance cost.',
          approach: 'Extracted a shared design token set and component library used across both platforms.',
          outcome: 'Halved UI bug count and significantly reduced cross-platform feature parity effort.',
        },
      ],
      techniques: [
        {
          name: 'WebSocket (real-time streaming)',
          reason:
            'Low-latency bidirectional communication is critical for health monitoring — HTTP polling would introduce unacceptable delays for alerts.',
          contribution: 'Designed the event schema and the reconnection protocol.',
        },
        {
          name: 'Go microservice',
          reason:
            "Go's concurrency model and minimal memory footprint make it ideal for handling thousands of simultaneous IoT sensor connections.",
          contribution: 'Built and optimised the data ingestion service from the ground up.',
        },
        {
          name: 'PostgreSQL with time-series indexing',
          reason:
            'Reliable ACID-compliant storage for health records with efficient range queries for trend analysis over days and weeks.',
          contribution: 'Designed the schema and indexing strategy for time-series health metrics.',
        },
        {
          name: 'React Native',
          reason:
            'Single codebase for iOS and Android caregiver apps with native performance and access to push notification APIs.',
          contribution: 'Led front-end architecture and implemented the real-time alert notification system.',
        },
      ],
      outcomes: [
        'Reduced simulated caregiver response time by 60% through real-time push alert notifications.',
        'Successfully monitored 10+ concurrent health metrics across multiple patients in testing.',
        'Presented to 3 healthcare organisations for potential pilot program consideration.',
        'Delivered a fully functional cross-platform prototype within the 6-month timeline.',
      ],
    },
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
