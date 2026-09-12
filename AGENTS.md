<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Global Agent Entry Points

- Project basis and goals: `docs/agents/PROJECT_BASIS.md`
- Installed skill inventory and usage scope: `docs/agents/SKILLS_REGISTRY.md`

## Operating Baseline

- Treat this repository as a portfolio product, not a generic SaaS template.
- Preserve the existing design language unless the user asks for a rebrand.
- Prioritize readability, trust, and conversion over decorative complexity.
- For UI changes, verify desktop/mobile behavior and reduced-motion handling.
- For motion work, favor restraint on high-frequency interactions.

## Skills Baseline

- Installed skills are repository-local under `.agents/skills` with Claude links under `.claude/skills`.
- Use `skills-lock.json` as the reproducibility reference for installed skill state.
- Run cross-discipline UI reviews via `better-interface` and motion-specific reviews via `review-animations` / `improve-animations`.
