# Project Basis For Agents

## Project Summary
- Project: Personal portfolio website for Lyam Tang.
- Purpose: Present technical credibility, product thinking, and execution quality to support product-management transition opportunities.
- Current form: Next.js App Router site with section-based storytelling and project-detail routes.

## Primary Audience
- Hiring managers evaluating PM potential with technical depth.
- Product leaders and founders assessing communication, prioritization, and product sense.
- Collaborators who want a clear overview of past work and contact channels.

## Core Outcomes
- Communicate a clear profile: CS graduate with engineering capability and PM trajectory.
- Showcase selected projects with enough detail to establish trust.
- Convert attention into contact via clear CTAs and lightweight navigation.

## Narrative Direction
- Preferred homepage arc: identity hook -> capability proof -> execution history -> project evidence -> contact conversion.
- Scrollytelling goal: improve pacing and transitions without harming usability, readability, or navigation speed.
- Motion should emphasize clarity and hierarchy, not decoration.

## Design Constraints
- Preserve existing visual language and component system unless explicitly asked to rebrand.
- Keep desktop and mobile both first-class experiences.
- Respect reduced-motion behavior and avoid heavy animation on high-frequency interactions.
- Avoid generic AI-looking layouts and repetitive default patterns.

## Technical Stack
- Framework: Next.js 16 App Router, React 19, TypeScript.
- Styling: Tailwind CSS v4, shadcn patterns, next-themes.
- Motion/interaction: Motion, GSAP, Lenis, Embla Carousel.
- Visual effects: Three.js + postprocessing for Hero effects.
- Analytics: GA4 with consent gating and production-only loading.

## Important Runtime Areas
- Global layout/providers: src/app/layout.tsx
- Global tokens/styles: src/app/globals.css
- Homepage section composition: src/app/page.tsx
- Smooth scroll provider: src/components/providers/SmoothScroll.tsx
- Hero + primary entry motion: src/components/layout/Hero.tsx
- Header section navigation + active tracking: src/components/layout/Header.tsx

## Workflow Expectations
- For design tasks: run structured review before implementation, then verify behavior after implementation.
- For motion tasks: decide first whether motion is warranted; prefer restraint on frequent interactions.
- For major UI changes: keep a short rationale tying changes to audience and conversion goals.

## Non-Goals
- Do not turn this site into a generic SaaS landing template.
- Do not introduce unnecessary dependencies when existing stack can solve the problem.
- Do not prioritize visual novelty over readability and trust.