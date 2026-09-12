This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Analytics

This website uses [Google Analytics 4](https://analytics.google.com) to understand visitor engagement and improve user experience.

### Privacy & Consent

- **GDPR Compliant**: A floating cookie consent banner appears on first visit
- **User Control**: Visitors can accept all cookies or essential only
- **Consent Persistence**: User preferences are saved in localStorage
- **Production Only**: Analytics only loads in production builds, never in development

### Implementation Details

- **Measurement ID**: `G-GVQE06QT6X` (hardcoded in `src/lib/analytics.ts`)
- **Events Tracked**:
  - Page views (automatic + SPA navigation)
  - CTA clicks (Hero buttons)
  - Project views and external links
  - Contact link clicks (Email, LinkedIn, GitHub)
- **Components**:
  - `src/components/analytics/GoogleAnalytics.tsx` - Script loader
  - `src/components/analytics/ConsentBanner.tsx` - Cookie consent UI
  - `src/components/analytics/PageViewTracker.tsx` - SPA navigation tracking
  - `src/lib/analytics.ts` - Event tracking utilities
  - `src/lib/consentManager.ts` - Consent state management

### Testing Analytics

**Development Mode** (analytics disabled):
```bash
pnpm dev
```

**Production Mode** (analytics enabled with consent):
```bash
pnpm build && pnpm start
```

View real-time events in GA4 → Reports → Realtime or DebugView.

## Agent Skills

This repository uses project-local Agent Skills for design review, motion review, and front-end quality workflows.

- Skills location: `.agents/skills/`
- Claude compatibility links: `.claude/skills/`
- Locked install metadata: `skills-lock.json`

Global docs for agents and collaborators:

- Project basis: `docs/agents/PROJECT_BASIS.md`
- Skills registry: `docs/agents/SKILLS_REGISTRY.md`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
