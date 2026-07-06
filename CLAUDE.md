# Project ENVEME — Project Conventions for Claude

Live engineering portfolio for the 1995 Toyota Soarer (JZZ31, 2JZ-GE) build. The site itself is part of the portfolio — production quality matters. Live: https://project-enveme.vercel.app

## Stack

- **Framework**: Next.js 16 App Router, TypeScript, Tailwind v4 (no `tailwind.config.js` tokens — check `app/globals.css`)
- **3D/Motion**: Three.js via React Three Fiber + drei, GSAP + ScrollTrigger, Lenis smooth scroll, Framer Motion
- **Data**: Firebase Firestore — reads the public summary GarageOS syncs via `syncPublic.ts`
- **Deploy**: Vercel, auto-deploys on push to `main`

**This IS a Next.js App Router project** — unlike GarageOS (Vite SPA). Server Components, `'use client'`, and ISR patterns all apply here. Pages are Server Components by default; interactive/animated components carry `'use client'`.

## Data layer

- `lib/publicData.ts` — server-side fetch of public Firestore docs via the **Firestore REST API** (not the JS SDK), so Next.js `fetch()` caching gives ISR. Pages export `revalidate = 300` (gallery: 60).
- `lib/vehicleData.ts` — single source of truth for static vehicle specs.
- `lib/buildData.ts` — build journal entries.
- Content is edited through GarageOS (Journal / Site Content CMS), not hardcoded here.

## 3D asset pipeline

- Hero GLB is Draco + WebP compressed (5.9 MB from a 49 MB scan). Never commit an uncompressed model — run `gltfpack` first.
- Source assets live in `assets-src/`, served assets in `public/`.

## GSAP / animation rules

- Every ScrollTrigger and timeline created in a client component must be cleaned up (`gsap.context()` + `ctx.revert()` or `ScrollTrigger.kill()` in the effect cleanup). Leaked triggers break scroll on route change.
- Scroll behaviour goes through Lenis — don't mix in native `scrollTo` or CSS `scroll-behavior`.

## Design source

`_design-source/` holds the vendored redesign reference (HTML/CSS + photo notes). Treat it as read-only reference — implement in `components/`, don't import from it. Historical prompts/directives live in `_directives/`.

## Structure

| Route | Purpose |
|---|---|
| `/` | Scroll-driven 3D hero + overview |
| `/build`, `/build/[slug]` | Build journal, live from Firestore |
| `/specs` | Vehicle spec (from `lib/vehicleData.ts`) |
| `/gallery` | Photo gallery (Cloudinary-hosted images) |
| `/passport` | Vehicle passport |
| `/about` | About the engineer |

## Verify before done

`npm run build` must pass — it catches server/client boundary violations and type errors. For visual/scroll changes, check the affected route in `npm run dev`; a passing build does not prove animations work.
