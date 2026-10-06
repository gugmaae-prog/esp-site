---
name: uiux-sources
description: Apply the top GitHub UI/UX skills when changing Espacios interface, motion, or copy. Use for polish, page transitions, accessibility, and critique. The Espacios brand skill wins over any generated palette or font.
---

# UI/UX sources

These were read from the highest-starred UI/UX skill repos on 6 October 2026. The copies sit in `sources/`. Use this file. Do not run their design-system generators against Espacios.

| Source | Stars | What it is for |
| --- | --- | --- |
| `anthropics/skills` `frontend-design` | 179,844 | Already vendored. Anti-slop art direction. |
| `nextlevelbuilder/ui-ux-pro-max-skill` | 133,442 | UX priority order and interaction rules. |
| `pbakaus/impeccable` | 77,240 | Polish an existing product. The brief wins. |
| `vercel-labs/agent-skills` | 31,980 | Interface review and view transitions. |
| `emilkowalski/skills` | 43,766 | When motion should exist, and the curves and durations. |

Anthropic’s own `brand-guidelines` skill is Anthropic’s palette and type (Poppins, Lora, orange `#d97757`). Never apply it here.

## Authority

1. `espacios-brand`. The live site is the brief.
2. Impeccable: refinement preserves identity, copy, and behavior. Polish is not a redesign.
3. UI/UX Pro Max priorities 1–3 and 5–9: accessibility, 44px targets, reserved image space, no horizontal scroll, 16px body, semantic tokens, motion that can be reduced, labels on fields, predictable navigation.
4. Vercel view transitions and Emil Kowalski’s motion rules, below.
5. UI/UX Pro Max palette, font pairing, GSAP scroll choreography, and `--design-system` search. Do not generate a new system.

## What the skills agree on

- Contrast for body text is at least 4.5:1. Focus stays visible. Icon-only controls have names.
- Touch targets are at least 44px, with space between them.
- Images keep their space so the page does not jump.
- Motion is one idea, interruptible, and off when reduced motion is requested. Do not fade every section in on load.
- Buttons name the action. Errors name the problem and the recovery. Empty states tell the person what to do.
- Peer pages (Home, Services, Work, Workspace, Resources) crossfade. The header is the same object and does not fade or slide.

## Motion

Read `emil-animate.SKILL.md`, `emil-review-animations.SKILL.md`, `impeccable-animate.md`, and `uupm-motion.csv` before adding movement. The live site already has its motion. Match it. Do not install GSAP or Motion.

Page changes are a full document load. The purpose is preventing a hard cut, not a story. Keep the 140ms fade. Hold the header. Do not slide peer pages. Do not wipe the screen with an overlay. UI/UX Pro Max’s standard page transition (400–600ms) is too slow for this nav.

Existing feedback stays: buttons lift about 2px in roughly 180ms, cards ease their shadow and transform in about 200ms, and the theme crossfade is 200ms only while the theme is changing. Do not add scroll reveals, staggers, magnetic hovers, parallax, or split-text.

When new motion is actually needed:

- Name the job first: feedback, continuity, state, or stopping a jump. If it is only decoration on something used all day, do not animate it.
- UI motion stays under 300ms. Enter and exit with a strong ease-out, `cubic-bezier(0.23, 1, 0.32, 1)`. Never `ease-in` on interface motion.
- Animate `transform` and `opacity` only. Do not use `transition: all`. Do not start from `scale(0)`.
- Popovers grow from the control that opened them. Modals stay centered.
- Press can be slightly slower than release. Anything the person can trigger twice in a second must be interruptible.
- Reduced motion keeps opacity and color and drops movement. Hover motion only applies for a fine pointer.
- One moment per surface. Do not fade every section in on load.

## What they would change, and must not

Impeccable’s craft floor bans eyebrows, `01 / 02 / 03` markers, glass, and a system sans as a display face. The live Espacios pages already use those. Impeccable’s own rule is that a pinned brief overrides the floor. Leave them.

UI/UX Pro Max will offer a new palette and a Google font pair. Do not persist that as `design-system/MASTER.md`.
