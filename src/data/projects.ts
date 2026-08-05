import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'personal-website',
    title: 'Personal Website',
    shortDescription:
      "The site you're looking at. Built with Next.js 16, Tailwind CSS v4, and Framer Motion.",
    longDescription:
      'A responsive personal portfolio site built with Next.js 16 App Router, Tailwind CSS v4, shadcn/ui component library, and Framer Motion for scroll-triggered animations. Features dark/light theme toggling powered by next-themes, smooth scrolling via Lenis, and a searchable, filterable projects section backed by static TypeScript data files.',
    tech: ['Jira', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
    githubUrl: 'https://github.com/lyamtang/lyamtang',
    featured: true,
    category: ['Web', 'UI/UX', 'Product Management', 'Project Management'],
    status: 'in_progress',
    period: {
      startYear: 2026,
      endYear: 'Present',
    },
    details: {
      role: 'Product Manager, Designer & Software Developer',
      duration: 'Ongoing',
      team: 'Solo',
      gallery: [
        {
          src: '/images/projects/personal-website/hero.png',
          alt: 'Hero section',
          caption: 'Hero section with animated entrance and dark/light theme toggling',
        },
        {
          src: '/images/projects/personal-website/experience.png',
          alt: 'Experience section',
          caption: 'Experience section with timeline and tech stack badges',
        },
        {
          src: '/images/projects/personal-website/project.png',
          alt: 'Projects section',
          caption: 'Searchable, filterable project grid with tech-stack tag filters',
        },
      ],
      timeline: [
        {
          phase: 'Sprint 1',
          description:
            'Defined, designed and developed the minimal viable product (MVP) to show all the basic informations with Next.js and agentic engineering.',
        },
        {
          phase: 'Sprint 2',
          description:
            'Refining the interactions of the website to improve the user experiences',
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
        'Built and deployed the entire site solo in under 2 weeks with off-work time only.',
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
    tech: ['Jira', 'Confluence', 'Notion', 'React Native', 'Node.js', 'PostgreSQL', 'TypeScript', 'Go', 'WebSocket', 'Redis', 'Docker', 'Pencil.dev', 'MQTT', 'Rest API', 'Github', 'Expo'],
    githubUrl: '',
    featured: true,
    category: ['Full Stack', 'IoT', 'Product Management', 'Project Management'],
    status: 'completed',
    period: {
      startYear: 2025,
      endYear: 2026,
    },
    details: {
      role: 'Team Lead, Backend Developer',
      duration: '12 months',
      team: '4 members',
      gallery: [
        {
          src: '/images/projects/aiot-smart-eldercare/design.png',
          alt: 'End-to-end solution diagram',
          caption: 'High level ideas for the end-to-end solution from IoT sensors to caregiver platform.',
        },
        {
          src: '/images/projects/aiot-smart-eldercare/dashboard.png',
          alt: 'Caregiver dashboard web & app',
          caption: 'Cross-platform caregiver dashboard.',
        },
      ],
      timeline: [
        {
          phase: 'Discovery & Requirements',
          description:
            'Researched existing eldercare solutions and potential multi-sensors integration solution and defined project scope',
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
          phase: 'Machine Learning Model Development',
          description:
            'Developed 2.5D skeleton extraction and human action recognition (HAR) model to increase the accuracy of activity detection.',
        },
        {
          phase: 'Mobile & Web Development',
          description:
            'Built the React Native caregiver app and web dashboard with live health metrics, alerts, and patient history views.',
        },
        {
          phase: 'Testing & Iteration',
          description:
            'Conduct Testing and iterately upgrade the system based on performance metrics, i.e. accuracy, speed of alert delivery and stakeholder\'s feedbacks.',
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
          'Camera based HAR system misclassified certain activities due to lack of depth information, leading to false alerts.',
          approach:
            'Developed a 2.5D skeleton extraction model to provide depth cues for the HAR system, improving classification accuracy.',
          outcome: 'Achieved around 90% accuracy in activity recognition in the testing environments.',
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
        'Delivered a fully functional cross-platform system within the 12-month timeline.',
        'Impact-focused: Sustained 100% connection reliability across 20 concurrent streams with sub-1ms Redis pipeline latency, delivering 600 total FPS well under the 33ms frame budget.'
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
    category: ['Project Management', 'UI/UX', 'Prototype'],
    status: 'completed',
    period: {
      startYear: 2026,
      endYear: 2026,
    },
    details: {
      role: 'UI/UX Designer & Project Manager',
      duration: '3 months',
      team: '4 members',
      gallery: [
        {
          src: '/images/projects/predictive-behavioral-safety-app/dashboard.png',
          alt: 'Parent Dashboard',
          caption: 'Parent Dashboard for child live status.',
        },
        {
          src: '/images/projects/predictive-behavioral-safety-app/analytics.png',
          alt: 'Analytics Dashboard',
          caption: 'Analytics dashboard for predictive behavioral safety insights.',
        },
        {
          src: '/images/projects/predictive-behavioral-safety-app/prediction.png',
          alt: 'Predicted next destination',
          caption: 'Predicted next destination based on historical behavioral patterns.',
        },
        {
          src: '/images/projects/predictive-behavioral-safety-app/anomaly.png',
          alt: 'Anomaly Detection',
          caption: 'Anomaly detection in child behavior patterns and OTP request for verification.',
        }
      ],
      timeline: [
        {
          phase: 'Requirements Gathering',
          description: 'Gathered requirements from the product owner regarding on the expected outcome and translate them into Work Breakdown Structure (WBS) and a project charter to be signed off by the stakeholders.',
        },
        {
          phase: 'Stakeholder Alignment',
          description: 'Analyse the stakeholders\' needs and create a stakeholder assessment to align with the expectation for the project outcome and deliverables.',
        },
        {
          phase: 'UI/UX Design',
          description: 'Designed the user interface and user experience in low, medium and high fidelity mockups with Pencil.dev and React for quick validations.'
        },
        {
          phase: 'Project Estimation & Planning',
          description: 'Estimated and planned the complete project timeline, scope and cost with hybrid project estimation frameworks.'
        },
        {
          phase: 'Monitoring',
          description: 'Create risk assessment and mitigation plan to monitor the project progress and ensure the project is on track.'
        }
      ],
      techniques: [
        {
          name: 'Structured Work Breakdown Structure (WBS)',
          reason: 'Translating ambiguous stakeholder requests into a structured WBS for clear project scope and deliverables.',
          contribution: 'Created a detailed WBS that guided the project execution and ensured alignment with stakeholder expectations.',
        },
        {
          name: 'Generative AI for Rapid Prototyping',
          reason: 'Leveraging AI tools to quickly produce high-fidelity user mockups for early iterative validation.',
          contribution: 'Utilized generative AI to create mockups and validate design decisions with stakeholders.',
        },
        {
          name: 'Hybrid Project Estimation Framework',
          reason: 'Combining Function Point Analysis (FPA) and Delphi techniques to minimize anchoring bias and subjectivity in sprint planning.',
          contribution: 'Developed the hybrid estimation framework and applied it to the project planning process.',
        },
      ],
      outcomes: [
        'Successfully delivered a predictive behavioral safety application with a clear project scope, timeline, and cost estimation.',
        'Enhanced stakeholder satisfaction through iterative design validation and alignment with project objectives.',
      ],
    }
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
    category: ['HCI','Prototype'],
    status: 'completed',
    period: {
      startYear: 2025,
      endYear: 2025,
    },
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
    category: ['HCI', 'Prototype'],
    status: 'completed',
    period: {
      startYear: 2025,
      endYear: 2025,
    },
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
    status: 'completed',
    period: {
      startYear: 2025,
      endYear: 2025,
    },
  }, 
];
