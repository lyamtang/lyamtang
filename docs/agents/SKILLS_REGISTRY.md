# Skills Registry

This registry tracks installed agent skills, their intended scope, and activation guidance for this repository.

## Source Of Truth
- Installed folders: .agents/skills/
- Claude links: .claude/skills/
- Lock metadata: skills-lock.json

## Active Skills

| Skill | Source | Primary Use In This Repo | Avoid Using When |
| --- | --- | --- | --- |
| design-taste-frontend | Leonxlnx/taste-skill | High-agency landing/portfolio design direction and redesign planning. | Building dense product dashboards or data-table-heavy surfaces. |
| emil-design-eng | emilkowalski/skills | UI polish and motion craft decisions at a design-engineering level. | Task is purely backend or non-UI. |
| animate | emilkowalski/skills | Implement a specific animation with explicit purpose and constraints. | You need a repo-wide audit rather than one implementation. |
| review-animations | emilkowalski/skills | Strict review of existing motion quality on a feature/diff. | You need direct implementation instead of review. |
| improve-animations | emilkowalski/skills | Repo-level motion audit and prioritized improvement plans. | You need immediate code edits in the same pass. |
| find-animation-opportunities | emilkowalski/skills | Identify where motion would help and where it should be rejected. | Existing motion is already the main problem (use review/improve). |
| better-interface | jakubkrehel/skills | Cross-discipline UI review orchestration. | You only need one narrow domain review. |
| better-accessibility | jakubkrehel/skills | Accessibility-focused interface review and fixes. | Task is unrelated to user interaction or UI semantics. |
| better-layout | jakubkrehel/skills | Grouping, alignment, responsive layout logic, and reading order. | Task is primarily copy/tone or brand narrative only. |
| better-writing | jakubkrehel/skills | Product copy clarity, consistency, and UX wording quality. | Task is pure visual/motion tuning with no content changes. |
| better-typography | jakubkrehel/skills | Type scale, wrapping, truncation, rendering, and hierarchy quality. | Task has no text UI impact. |
| better-colors | jakubkrehel/skills | Tokenized color-system reasoning and contrast verification. | Task avoids color changes and has no contrast impact. |
| better-ui | jakubkrehel/skills | Visual polish details: surfaces, icon behavior, and micro-interactions. | Core IA/product-content strategy is still unresolved. |

## Recommended Default Flows
- Design review flow: better-interface -> domain skills -> prioritized findings.
- Motion review flow: review-animations for strict critiques; improve-animations for roadmap planning.
- Motion implementation flow: find-animation-opportunities -> animate.
- Redesign flow: design-taste-frontend for direction, then validate with better-interface and review-animations.

## Governance Rules
- Keep AGENTS.md concise; use docs in this folder for deep guidance.
- Prefer pinned/reproducible skill states captured in skills-lock.json.
- Update this registry whenever a skill is added, removed, or deprecated.
- If two skills conflict, prefer the one explicitly scoped to the current task type.

## Deferred Sources
- Garden skills: deferred by project decision (phase 2 consideration).
- Tastemaker: deferred by project decision (phase 2 consideration).
