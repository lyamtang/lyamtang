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
| design-taste-frontend-v1 | Leonxlnx/taste-skill | Exact legacy Taste behavior when a task explicitly depends on the original workflow. | New work; use design-taste-frontend by default. |
| redesign-existing-projects | Leonxlnx/taste-skill | Audit and upgrade existing interfaces without breaking working behavior. | Greenfield implementation with no existing surface to evaluate. |
| high-end-visual-design | Leonxlnx/taste-skill | Agency-level typography, spacing, surface, and animation direction. | Functional-only changes with no visual design scope. |
| minimalist-ui | Leonxlnx/taste-skill | Restrained editorial interfaces with flat surfaces and minimal ornament. | Briefs that intentionally call for expressive or high-motion visual language. |
| industrial-brutalist-ui | Leonxlnx/taste-skill | Deliberate industrial, technical, or editorial-brutalist visual direction. | This portfolio's default visual language unless explicitly rebranding. |
| gpt-taste | Leonxlnx/taste-skill | High-variance GSAP-led landing-page or portfolio concepts. | Restrained, accessibility-first, or low-motion work. |
| brandkit | Leonxlnx/taste-skill | Brand-system boards, identity directions, and visual-world concepts. | Small UI polish tasks that do not need brand exploration. |
| image-to-code | Leonxlnx/taste-skill | Implement a design from supplied or generated reference imagery. | Text-only or non-visual engineering tasks. |
| imagegen-frontend-web | Leonxlnx/taste-skill | Generate section-level web design references before a visual implementation. | Code-only tasks or when no image generation is available. |
| imagegen-frontend-mobile | Leonxlnx/taste-skill | Generate mobile app screen concepts and flows. | This web-first portfolio unless a mobile-product concept is requested. |
| stitch-design-taste | Leonxlnx/taste-skill | Produce DESIGN.md-style design-system guidance for Google Stitch workflows. | Normal component work that does not use Stitch. |
| full-output-enforcement | Leonxlnx/taste-skill | Ensure comprehensive output for intentionally broad generation tasks. | Small, focused changes where concise output is more useful. |
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

## Recommended Default Flows
- Design review flow: better-interface -> domain skills -> prioritized findings.
- Motion review flow: review-animations for strict critiques; improve-animations for roadmap planning.
- Motion implementation flow: find-animation-opportunities -> animate.
- Redesign flow: redesign-existing-projects or design-taste-frontend for direction, then validate with better-interface and review-animations.
- Reference-to-build flow: image-to-code; use imagegen-frontend-web first only when a visual reference needs to be generated.
- Logo-motion flow: pixel2motion for mark vectorization and animation; gsap-react only when that result must be integrated into the React runtime.

## Governance Rules
- Keep AGENTS.md concise; use docs in this folder for deep guidance.
- Prefer pinned/reproducible skill states captured in skills-lock.json.
- Update this registry whenever a skill is added, removed, or deprecated.
- If two skills conflict, prefer the one explicitly scoped to the current task type.

## Deferred Sources
- Garden skills: deferred by project decision (phase 2 consideration).
- Full Taste bundle: installed from Leonxlnx/taste-skill; design-taste-frontend remains the default entry point.
