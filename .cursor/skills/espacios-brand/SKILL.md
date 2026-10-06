---
name: espacios-brand
description: Apply Espacios brand rules when changing espacios.me UI, layout, CSS, or copy. Use for any visual work on the public site, Workspace chrome, or shared components. The live brand wins over generic design skills.
---

# Espacios brand

Espacios already has a brand. Do not invent a new one. When this skill and `frontend-design` disagree, this skill wins.

The source of truth is the live public stylesheet at `https://espacios.me/__espacios/workspace-ui/` (`workspace.css`), plus the official wordmark. Measure the current file before restyling. Do not treat an older map stylesheet as permission to restyle the website.

## What the brand is

Public and Workspace chrome is a quiet light system, with a dark theme that swaps the same roles. It is not a new palette, a serif editorial layout, or a cyan map skin.

- Type is the system stack already aliased as `--font-geist-sans`: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`. Body copy is forced to that stack with `font-style: normal`. Do not add Inter, a display serif, a monospace label face, or a downloaded webfont.
- Headings use that same family. Match the live agency headings already on the page: section titles are `clamp(2rem, 3vw, 2.625rem)`, weight 520, line-height about 1.03, tracking about -0.055em. Hero titles keep their current line break and italic second line. Do not add new italic words or a new type scale.
- Default theme is light (`espacios_theme_v1`, `data-espacios-theme` and `data-theme`). Dark mode only remaps the theme tokens below.
- The mark is the official wordmark image, `/brand/espacios-official-wordmark.png`. Public logo width is about 78px, header logo `clamp(78px, 7vw, 94px)`. Do not redraw the wordmark, substitute a lettermark, or set the name in a new typeface.
- Surfaces are translucent paper on a cool gray-blue canvas, with a soft indigo wash. Reuse the components already on the page. Service cards are the 20px gradient cards. Workspace tiles are the 17px articles. Buttons are the existing pills: primary is the indigo gradient, secondary is the translucent white pill. The public header is a pill with about 24–28px backdrop blur. Do not draw a second card style.
- Keyboard focus uses the existing control line: light `#596779`, dark `#c4cbd7`, inset 1px. Pointer focus does not add an extra outline. Keep hit targets at least 44px on mobile.
- Color roles, light: canvas `#edf3fb`, text `#172033`, muted `#5f6d85`, line `#45567626`, accent `#4459c7`, on-accent `#fff`. Public ink `#15192a`, blue `#4459c7`, violet `#8067d8`, apricot `#e89465`. Supporting tints are `#7fa6ff`, `#a98cff`, `#f1a36f` on pearl `#fbfbfd`.
- Color roles, dark: canvas `#0d1320`, text `#f3f6ff`, muted `#b7c2d6`, line `#dae6ff26`, accent `#a9b5ff`, on-accent `#111827`.
- Layout width stays inside the public frame, about 1180–1440px, with the existing gutters (`clamp(20px, 4vw, 56px)` and section space `clamp(64px, 8vw, 104px)`).

## What not to add

These read as generated design. Do not introduce them on top of Espacios:

- A new palette, including cream and terracotta, acid green, vermilion, or the map's older cyan/gold skin (`#7ee8ff` on `#07121c`). That map sheet is not the website brand.
- Gradient decoration, glassmorphism, or shadow that does not use the existing tokens.
- A second card, button, or heading style. The site already uses eyebrows, numbers, and the arrow on service links. Leave those. Do not add a new set.
- Identical card grids, one soft gray shadow, and a fade-up on every section.
- Emoji, exclamation-mark marketing, or clever labels. Buttons name the action in sentence case: "Request trial access", not "Get started" and not "Submit".

## Before changing UI

1. Read the live token block you are about to touch. Reuse the variable. Do not copy a hex into a new name.
2. Check light and dark, desktop and mobile, and keyboard focus.
3. Leave `/map` alone unless the task is the map. Public-shell polish is not injected there.
4. If a change needs a new color or typeface, stop and use the nearest existing role instead.
