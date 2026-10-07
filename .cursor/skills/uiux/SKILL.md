---
name: uiux
description: Use for any Espacios UI, UX, layout, copy, or motion work. One skill covering the live brand, interface quality, and animation. Do not invent a new palette, type system, or motion language.
---

# Espacios UI/UX

This is the only interface skill for espacios.me. It combines the live brand with the useful rules from the highest-starred UI/UX skills read on 6 October 2026: Anthropic frontend-design, UI/UX Pro Max, Impeccable, Emil Kowalski’s animation skills, and Vercel’s view-transition guidance.

The live site is the brief. Polish keeps it. A new palette, a new typeface, or a new motion language is a different product.

## Brand

Measure `https://espacios.me/__espacios/workspace-ui/` (`workspace.css`) and the official wordmark before restyling. The older map sheet (`#7ee8ff` on `#07121c`) is not the website.

- Type is the system stack already aliased as `--font-geist-sans`: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`. Body copy stays in that stack, upright. Do not add Inter, a display serif, a monospace label face, or a downloaded webfont.
- Section titles match the live agency headings: `clamp(2rem, 3vw, 2.625rem)`, weight 520, line-height about 1.03, tracking about -0.055em. Hero titles keep their current line break and italic second line. Do not add new italic words.
- Default theme is light (`espacios_theme_v1`, `data-espacios-theme` and `data-theme`). Dark mode only remaps the roles below.
- The mark is `/brand/espacios-official-wordmark.png`. Public logo width is about 78px. Header logo is `clamp(78px, 7vw, 94px)`. Do not redraw it.
- Reuse the components on the page. Service cards are the 20px gradient cards. Workspace tiles are the 17px articles. Primary buttons are the indigo gradient pill. Secondary buttons are the translucent white pill. The public header is a pill with about 24–28px backdrop blur. Do not draw a second card or button style.
- Light: canvas `#edf3fb`, text `#172033`, muted `#5f6d85`, line `#45567626`, accent `#4459c7`. Public ink `#15192a`, violet `#8067d8`, apricot `#e89465`. Tints `#7fa6ff`, `#a98cff`, `#f1a36f` on pearl `#fbfbfd`.
- Dark: canvas `#0d1320`, text `#f3f6ff`, muted `#b7c2d6`, line `#dae6ff26`, accent `#a9b5ff`, on-accent `#111827`.
- Frame width stays about 1180–1440px. Gutters are `clamp(20px, 4vw, 56px)`. Section space is `clamp(64px, 8vw, 104px)`.
- Keyboard focus uses the existing control line: light `#596779`, dark `#c4cbd7`, inset 1px. Pointer focus does not add an extra outline.
- Leave `/map` alone unless the task is the map.

The site already uses eyebrows, `01 / 02 / 03` on real sequences, and the arrow on service links. Leave those. Do not add a new set. Do not add cream and terracotta, acid green, Anthropic orange `#d97757`, Poppins, or Lora.

## Interface

Check these before shipping a visual change:

- Body text contrast is at least 4.5:1. Large text is at least 3:1. Focus stays visible. Icon-only controls have names.
- Touch targets are at least 44px, with space between them. Body text is at least 16px. There is no horizontal scroll.
- Images keep their space so the page does not jump.
- Fields have visible labels. Errors sit by the field, name the problem, and name the recovery. Empty states tell the person what to do.
- Buttons name the action in sentence case and keep that name through the flow. "Request trial access" is the public plan action.
- Check light and dark, desktop and mobile, and keyboard focus. Reuse the existing CSS variable. Do not copy a hex into a new name.

Do not add a generated kit on top of the site: identical cards with one gray shadow, a fade-up on every section, gradient text, emoji icons, `transition: all`, or a second heading scale.

## Motion

Use CSS. Do not install GSAP or Motion. Pick one style for the job. Do not stack them.

Shared rules for every style: under 300ms unless the table says otherwise, `transform` and `opacity` only, never `transition: all`, never `scale(0)`, never `ease-in` on interface motion. Enter and exit with `cubic-bezier(0.23, 1, 0.32, 1)`. On-screen movement uses `cubic-bezier(0.77, 0, 0.175, 1)`. Reduced motion keeps opacity and color and drops travel. Hover motion only runs for a fine pointer. Anything the person can fire twice in a second must be interruptible.

| Style | Job | Espacios use | Timing |
| --- | --- | --- | --- |
| Press | The control heard the person | Buttons. Lift about 2px. Release is snappier than the press. | 100–160ms, ease |
| Hover lift | Feedback on a card the pointer can actually hover | Existing service cards ease shadow and transform. Do not add tilt or a magnetic pull. | 150–200ms, ease |
| Crossfade | Stop a hard cut between peers | Home, Services, Work, Workspace, Resources. Header stays still. The map does not fade. | 140ms |
| Shared element | The same object continues | Header, wordmark, theme control. No slide. | 0ms on the header |
| Pop | Something came from a control | Menus and popovers scale from the trigger, starting near `scale(0.95)` plus opacity. Modals stay centered. | 125–200ms, ease-out |
| State | A value changed | Theme swap, selected pill, toggle. Color and opacity only while the theme attribute is changing. | 200ms |
| Reveal | A group arrives once | A short list that just appeared, 30–80ms between items, total still under 300ms. Not every section on scroll. | 200–300ms, ease-out |
| Progress | Waiting | One skeleton or spinner. Kill it when the content arrives. Skip it if the wait is under 300ms. | Loop under 1.5s, or none |

Do not use a screen wipe, parallax, split-text, or a scroll-pinned story on these pages. Those are a different product. A page people open all day gets Press, Hover lift, Crossfade, Shared element, and State. Reveal is only for a list that was not on screen a moment ago.
