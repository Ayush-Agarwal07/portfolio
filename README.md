# ayushagarwal.com

Personal site. A single long-scroll page — hero, about, two featured projects (AgentQR and Disadus), selected work, a one-column résumé timeline, a toolkit grid, and a contact slab. Built to read like a print editorial, not a SaaS landing page.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # tsc --noEmit
npm run build    # next build
```

Node 20+. No environment variables, no database, no API routes — the site is fully static once built.

---

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** for utilities; the bulk of the visual system lives in hand-written CSS inside `@layer` blocks in `app/globals.css` (OKLCH tokens, custom typography, grid layouts)
- **HTML5 Canvas** for the hero token-graph animation — no library, ~260 lines
- **Instrument Serif** (display) + **Geist** (text) + **JetBrains Mono** (UI chrome / labels)

---

## Layout of the codebase

```
app/
  page.tsx          # composes all 9 sections; each section is a local component
  layout.tsx        # fonts, metadata, shell
  globals.css       # design tokens + every component style (~1300 lines, grouped)

components/
  SiteChrome.tsx    # Topbar + Footer
  SectionHeader.tsx # the "§ 0X — Heading" pattern used across the page
  HeroCanvas.tsx    # canvas animation (64 token nodes, edges, pulses)
  TickerTape.tsx    # marquee strip under the hero
  Stats.tsx         # the small number-grid used inside featured cards
  ProjectVisuals.tsx# AgentDiagram + DisadusBoard — the right-rail system diagrams
  LocalTime.tsx     # client-only "12:04 ET" + current year

data/
  portfolio.tsx     # all copy, links, stats, timeline, toolkit, nav — single source of truth

public/             # static assets
legacy/             # the original Portfolio.html, kept as a reference diff target
```

The rule of thumb: **copy lives in `data/portfolio.tsx`, structure lives in `app/page.tsx`, behavior lives in `components/`, looks live in `globals.css`.** Editing copy never requires touching JSX.

---

## Design notes

- **OKLCH everywhere.** Three accent ramps (`--terracotta`, `--ink-blue`, `--leaf`) plus four ink levels (`--ink`, `--ink-soft`, `--ink-faint`, `--rule`). Defined once at the top of `globals.css`; everything else references them.
- **Two visual languages.** Body copy is serif-led and quiet; UI chrome (eyebrows, labels, section numbers, ticker, footer) is uppercase mono. The hand-off between the two is what gives the page its rhythm.
- **The hero canvas isn't decoration.** It's a token graph — 64 nodes, glyphs from a hand-picked set (`qkv`, `<bos>`, `α`, `p99`, …), terracotta/ink-blue pulses traveling along edges. A quiet reference to the kind of work the site is about.
- **Featured projects get system diagrams, not screenshots.** `AgentDiagram` and `DisadusBoard` are hand-built CSS layouts that read halfway between a whiteboard sketch and a UI mock — meant to let a recruiter understand the architecture in ten seconds of skimming.

---

## Adding or editing content

Almost every edit lives in one file:

| Change                               | Edit                                          |
| ------------------------------------ | --------------------------------------------- |
| Project copy, stats, tags            | `data/portfolio.tsx`                          |
| Hero meta strip / eyebrow            | `data/portfolio.tsx` (`heroMeta`)             |
| Toolkit columns                      | `data/portfolio.tsx` (`toolkitGroups`)        |
| Résumé timeline                      | `data/portfolio.tsx` (`timelineItems`)        |
| Nav items / contact links            | `data/portfolio.tsx` (`navItems`, `contacts`) |
| Section ordering or new section      | `app/page.tsx`                                |
| AgentQR / Disadus right-rail diagram | `components/ProjectVisuals.tsx`               |
| Hero canvas behavior                 | `components/HeroCanvas.tsx`                   |
| Any styling                          | `app/globals.css`                             |

---

## Conventions

- **No CSS-in-JS, no styled-components.** All styles are in `globals.css` under `@layer base` / `@layer components`. Tailwind utilities are used sparingly for one-off spacing.
- **Server components by default.** Only `HeroCanvas` and `LocalTime` are `"use client"` — everything else renders on the server.
- **No comments unless something is genuinely non-obvious.** The structure should explain itself.
- **`legacy/Portfolio.original.html`** is kept as a reference — when the visual system needs a sanity check against the original design, diff against it.

---

## Deployment

Deploys cleanly to Vercel out of the box (`next build`, no runtime config). Works on any platform that runs a Next.js app — no external services required.

---

© Ayush Agarwal · agarw534@purdue.edu
# portfolio
