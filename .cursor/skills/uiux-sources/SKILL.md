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

Anthropic’s own `brand-guidelines` skill is Anthropic’s palette and type (Poppins, Lora, orange `#d97757`). Never apply it here.

## Authority

1. `espacios-brand`. The live site is the brief.
2. Impeccable: refinement preserves identity, copy, and behavior. Polish is not a redesign.
3. UI/UX Pro Max priorities 1–3 and 5–9: accessibility, 44px targets, reserved image space, no horizontal scroll, 16px body, semantic tokens, motion that can be reduced, labels on fields, predictable navigation.
4. Vercel view transitions: a shared element stays put; a sideways move between peer pages is a short fade, not a slide that pretends there is depth.
5. UI/UX Pro Max palette, font pairing, and `--design-system` search. Do not generate a new system.

## What the skills agree on

- Contrast for body text is at least 4.5:1. Focus stays visible. Icon-only controls have names.
- Touch targets are at least 44px, with space between them.
- Images keep their space so the page does not jump.
- Motion is one idea, interruptible, and off when reduced motion is requested. Do not fade every section in on load.
- Buttons name the action. Errors name the problem and the recovery. Empty states tell the person what to do.
- Peer pages (Home, Services, Work, Workspace, Resources) crossfade. The header is the same object and does not fade or slide.

## What they would change, and must not

Impeccable’s craft floor bans eyebrows, `01 / 02 / 03` markers, glass, and a system sans as a display face. The live Espacios pages already use those. Impeccable’s own rule is that a pinned brief overrides the floor. Leave them.

UI/UX Pro Max will offer a new palette and a Google font pair. Do not persist that as `design-system/MASTER.md`.
