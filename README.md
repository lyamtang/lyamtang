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

## Analytics status

Google Analytics is temporarily disabled to keep the portfolio's first visit free of tracking and consent interruptions. The site does not load GA scripts, send analytics events, or display an analytics-consent prompt.

## Contact Form Delivery

The contact form posts to the same-origin Cloudflare Pages Function at `/api/contact`. The Function validates the request, filters honeypot traffic, and forwards valid submissions to the Access-protected n8n production webhook.

### Cloudflare Pages configuration

Add the following as encrypted Pages Secrets:

- `N8N_CONTACT_WEBHOOK_URL`
- `CF_ACCESS_CLIENT_ID`
- `CF_ACCESS_CLIENT_SECRET`

Never add these values with the `NEXT_PUBLIC_` prefix. The browser receives none of them.

### Test the Pages Function locally

Cloudflare Pages discovers Functions from the root [`functions/`](./functions) directory. Keep it outside `src/`: `src/` contains Next.js application code, while `functions/` is deployed by Cloudflare as the edge runtime.

1. Create an ignored `.dev.vars` file with the three Pages Secret names above and their real test values.
2. Set `NEXT_PUBLIC_CONTACT_FORM_DEMO_MODE=false` in `.env.local` when testing form-to-endpoint delivery.
3. Build the static site, then start the Pages runtime:

   ```bash
   pnpm build
   pnpm pages:dev
   ```

4. Open the local address printed by Wrangler. It serves both the static site and `POST /api/contact`.
5. Delete `.dev.vars` when you finish. It is ignored by Git, but it must never be committed or shared.

### Local UI preview

Set the following in `.env.local` to preview the pending and success states without a deployed Pages Function:

```env
NEXT_PUBLIC_CONTACT_FORM_DEMO_MODE=true
```

Set it to `false` after deploying the Pages Function to test the complete secure delivery path.

## Agent Skills

This repository uses project-local Agent Skills for design review, motion review, and front-end quality workflows.

- Skills location: `.agents/skills/`
- Claude compatibility links: `.claude/skills/`
- Locked install metadata: `skills-lock.json`

Global docs for agents and collaborators:

- Project basis: `docs/agents/PROJECT_BASIS.md`
- Skills registry: `docs/agents/SKILLS_REGISTRY.md`

### Installed Design And Motion Bundles

- **Taste skill** (`Leonxlnx/taste-skill`): the default `design-taste-frontend` workflow for design direction and front-end pre-flight checks.
- **Emil Kowalski skills** (`emilkowalski/skills`): motion design, implementation, review, performance, choreography, and removal workflows.
- **Jakub Krehel skills** (`jakubkrehel/skills`): `better-*` domain reviews plus interface review, component stress testing, state and variant exploration, and design-to-code.
- **GSAP bundle** (`greensock/gsap-skills`): React integration, timelines, ScrollTrigger, plugins, utilities, performance, and framework guidance.
- **pixel2motion** (`nolangz/pixel2motion`): raster-logo vectorization and logo/brand-mark motion workflows.

Use `design-taste-frontend` for normal portfolio design changes. Route specialized work through the skill registry rather than applying every skill at once.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
