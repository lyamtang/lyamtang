# Skills Registry

This registry tracks installed agent skills, their intended scope, and activation guidance for this repository.

## Source Of Truth
- Installed folders: .agents/skills/
- Claude links: .claude/skills/
- Lock metadata: skills-lock.json

## Active Skills

| Skill | Source | Primary Use In This Repo | Avoid Using When |
| --- | --- | --- | --- |
| design-taste-frontend | Leonxlnx/taste-skill | Default Taste v2 workflow for portfolio design direction, front-end implementation, and pre-flight checks. | Building dense product dashboards or data-table-heavy surfaces. |
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
| gsap-core / gsap-react | greensock/gsap-skills | Build GSAP motion in React with lifecycle-safe setup and cleanup. | A simple CSS or Motion transition already solves the interaction. |
| gsap-timeline / gsap-scrolltrigger | greensock/gsap-skills | Sequence choreographed animation or build scroll-linked/pinned scenes. | High-frequency interactions or motion that must remain unobtrusive. |
| gsap-plugins / gsap-utils / gsap-performance / gsap-frameworks | greensock/gsap-skills | Apply GSAP plugins, utilities, performance guidance, or framework-specific lifecycle patterns. | The task does not use GSAP. |
| pixel2motion | nolangz/pixel2motion | Convert raster marks into clean SVG and create logo reveals, splashes, and brand-mark motion. | General UI transitions, route motion, or non-logo illustration work. |
| animation-performance | emilkowalski/skills | Keep web animations within the frame budget; diagnose dropped frames (composite-only properties, CSS vs WAAPI vs rAF, React re-renders). | Motion is not yet designed; use animate first. |
| choreograph | emilkowalski/skills | Coordinate staggered lists, hero entrances, and multi-element transitions so they read as one motion. | Single-element animation. |
| remove-animations | emilkowalski/skills | Subtract unneeded motion (keyboard actions, high-frequency surfaces, decoration); never adds motion. | You want to add or retune motion. |
| animation-vocabulary | emilkowalski/skills | Reverse-lookup glossary to name a motion effect so it can be prompted precisely. | Implementation work. |
| apple-design | emilkowalski/skills | Gesture-driven UI, springs, interruptible transitions, materials, and typography in the Apple style for the web. | Work that should keep this portfolio's existing visual language. |
| mobile-native | emilkowalski/skills | Mobile-web polish: tap highlights, 100vh, input zoom, safe areas, sticky hover. | Desktop-only changes. |
| pick-ui-library | emilkowalski/skills | Choose a library for a frontend task from a curated list. Explicit invocation only. | The stack choice is already made. |
| interface-review | jakubkrehel/skills | Review a branch, PR, or uncommitted change for interface regressions across accessibility, layout, writing, typography, color, and UI. | Reviewing the whole app rather than a change. |
| break | jakubkrehel/skills | Render a chosen component under every reachable scenario on a temporary page and stress test it. | Component has no variable data or states. |
| state-machine | jakubkrehel/skills | Render every state of a component on a throwaway page with a state switcher. | Stateless components. |
| variant | jakubkrehel/skills | Build and compare multiple variants of a component, then pick one. | Direction is already decided. |
| build-design | jakubkrehel/skills | Build UI from a Figma file or design image using existing tokens and components. | No design reference exists. |
| explain-interface | jakubkrehel/skills | Explain how a site, effect, or animation was built from a URL or screenshot. | Building new UI. |

## Recommended Default Flows
- Design review flow: better-interface -> domain skills -> prioritized findings.
- Motion review flow: review-animations for strict critiques; improve-animations for roadmap planning.
- Motion implementation flow: find-animation-opportunities -> animate.
- Redesign flow: design-taste-frontend for direction, then validate with better-interface and review-animations.
- Reference-to-build flow: build-design for Figma files or design images.
- Logo-motion flow: pixel2motion for mark vectorization and animation; gsap-react only when that result must be integrated into the React runtime.

## Governance Rules
- Keep AGENTS.md concise; use docs in this folder for deep guidance.
- Prefer pinned/reproducible skill states captured in skills-lock.json.
- Update this registry whenever a skill is added, removed, or deprecated.
- If two skills conflict, prefer the one explicitly scoped to the current task type.

## Not Installed By Choice
emilkowalski/skills: animate-expo, write-swift (not a React Native/Swift project), ask-sonner (no Sonner dependency), break-ui and prototype (overlap with break and variant). jakubkrehel/skills: afk (autonomous branch building), teardown (illustrations).

## Deferred Sources
- Garden skills: deferred by project decision (phase 2 consideration).
- Taste skill: Leonxlnx/taste-skill now ships only `taste-skill`, installed as design-taste-frontend (the default entry point). The former Taste variants were removed upstream.
