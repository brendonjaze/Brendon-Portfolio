# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server at localhost:3000
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Next.js 16 (App Router) + React 19 + TypeScript** portfolio site. Single-page layout with anchor-based navigation (`#about`, `#skills`, `#projects`, `#contact`).

All source lives under `src/`:
- `app/` — App Router pages and root layout. `layout.tsx` mounts global cursor effects; `page.tsx` composes the hero, about, and contact sections.
- `components/` — All reusable UI components. No subdirectory grouping; everything is flat.

### Styling

Tailwind CSS with CSS custom properties defined in `globals.css`. The design system uses:
- A purple/dark theme via CSS variables (`--primary: #c084fc`, `--bg-color: #1a0b2e`)
- Glassmorphism utilities (blur + transparency) applied throughout cards and modals
- Custom `fade-up` and `stars-float` keyframe animations in `globals.css`
- Fonts: **Inter** (body) + **Outfit** (headings) via `next/font/google`

Tailwind config (`tailwind.config.ts`) maps all design tokens to CSS variables and defines a 1400px max-width container.

### Key Patterns

**Cursor effects** — Three layered cursor components (`CursorLight`, `CursorParticles`, `CursorComet`) all use `useMotionValue` + `useEffect` to follow the mouse and are mounted once in `layout.tsx`.

**Skills section** — Magnetic hover effect: each skill pill tracks mouse proximity via `getBoundingClientRect` and applies CSS `transform` for a repel/attract feel.

**Projects section** — Grid of project cards that open a full-screen modal (`AnimatePresence` + `layoutId` for shared-element transitions). Keyboard shortcut: `Esc` closes the modal.

**3D Robot** — `InteractiveRobot.tsx` uses `@splinetool/react-spline` to embed an interactive 3D scene. The `<spline-viewer>` custom element is typed in `src/global.d.ts`.

**Intro screen** — `SiteIntro.tsx` plays `public/welcome.mp3` and gates the main content behind a splash; `PortalIntro.tsx` provides an alternate portal-style entry animation.

### Path Alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).
