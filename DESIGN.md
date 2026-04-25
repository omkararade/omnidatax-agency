# Design Brief

## Direction
Premium Data Minimalism — A refined SaaS interface with technical credibility, deep charcoal backgrounds, and bold red accents for conversion-focused CTAs.

## Tone
Refined minimalism with tech credibility. Not generic — red accent signaling boldness and urgency without flashiness, positioned against neutral charcoal for maximum sophistication.

## Differentiation
Red structural elements (not generic blue) + layered card depth with visible elevation + conversion-focused typography hierarchy + geometric display font for technical authority.

## Color Palette

| Token      | OKLCH           | Role                                          |
| ---------- | --------------- | --------------------------------------------- |
| background | 0.145 0 0       | Near-black charcoal base (dark mode primary) |
| foreground | 0.95 0 0        | Off-white text on dark backgrounds            |
| card       | 0.18 0 0        | Elevated surface for content layers           |
| primary    | 0.72 0.18 30    | Red accent for CTAs, highlights, focus ring   |
| accent     | 0.72 0.18 30    | Same as primary (red)                         |
| muted      | 0.22 0 0        | Secondary surface for reduced emphasis        |
| destructive | 0.65 0.19 22   | Red variant for warnings/errors                |

## Typography

- Display: Space Grotesk — geometric, tech-forward, used for hero headlines and section titles
- Body: DM Sans — clean, legible, professional, used for body text and UI labels
- Mono: Geist Mono — technical mono for code snippets and data values
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Layered surface hierarchy with subtle shadows. Cards have `shadow-subtle` (4px blur) for hover states and `shadow-elevated` (12px blur) for modal/elevated content. Minimal decoration — depth through contrast and layering, not effects.

## Structural Zones

| Zone    | Background      | Border           | Notes                                   |
| ------- | --------------- | ---------------- | --------------------------------------- |
| Header  | card/18         | border/28        | Sticky nav with subtle border-bottom    |
| Hero    | background/145  | —                | Full-bleed dark with gradient accent    |
| Content | background/145  | —                | Alternating bg-background and bg-card   |
| Footer  | card/18         | border/28        | Dark section with border-top            |

## Spacing & Rhythm

Spacious layout with 6-8px base radius and 24px section gaps. Content sections alternate between background and card backgrounds for visual rhythm. Micro-spacing uses 4px/8px/12px/16px grid.

## Component Patterns

- Buttons: Red primary (`bg-primary text-primary-foreground`) with scale hover effect. Secondary buttons use border + text only.
- Cards: 8px border radius, `bg-card`, subtle shadow on hover
- Badges: Small, uppercase labels with semantic color (accent/destructive)
- Inputs: Border-only style, `border-border`, `bg-input`

## Motion

- Entrance: fade-in (0.5s) + slide-in-up (0.5s) staggered on section scroll
- Hover: scale (1.02-1.05) + shadow elevation on interactive elements (0.3s cubic-bezier)
- Decorative: Subtle float animation on accent elements, no bounce

## Constraints

- No gradients on text except for hero headline (gradient-headline utility)
- Red primary only — no color proliferation
- All shadows use rgba black (no color-tinted shadows)
- Avoid generic animations (no spinning loaders, no bounce)

## Signature Detail

Red accent applied structurally (button, focus ring, chart accent) creates distinctiveness without decorative excess — a premium data company, not a generic SaaS.
