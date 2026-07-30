# ENVEME redesign — design source (porting reference)

This directory is the **canonical reference** for the approved ENVEME frontend redesign. It is NOT shipped code — it is the source-of-truth the swarm ports *from*. The production target is the Next.js app in this repo (`app/`, `components/`, `lib/`).

> **Master spec:** `/Users/samdonovan/Documents/AI/Claude-Projects/ENVEME-CMS-and-Redesign-Spec.md` — read it first. This README is the redesign-specific companion to **Workstream D** in that spec. Workstreams X/A/B/C (the GarageOS CMS backend that feeds this redesign) live only in the master spec.

## What the redesign is

A single-page, scroll-driven, cinematic rebuild of the ENVEME homepage:
- **Pinned hero** with a real 3D Soarer (`scene.js`, Three.js) and a GSAP ScrollTrigger timeline of 5 "beats" (hero → engine → security → telemetry → CTA), plus clickable digital-twin hotspots on the car at the resting beat.
- **Three runtime-switchable skins** (`skins.js`): **Heritage** (warm bone paper, Saira), **Cinematic** (dark golden-hour, Instrument Serif/Newsreader — the default), **Chrome** (champagne chrome, Archivo). The Direction Dock + Fine-Tune panel swap skins live, restyling both page chrome (CSS vars) and the 3D scene (lighting/exposure/fog/floor).
- **Inline content sections** (`content.js`): spec ticker, analog instrument cluster (SVG arc gauges + animated odometer roll), provenance band + full spec sheet + parts grid, build-journal cards, contact-sheet gallery.
- `logo.js` — the "Datum Seal" brand mark (monogram + full seal), recolours per skin via `--logo-accent`.
- `app.js` — orchestration: intro loader, Lenis smooth scroll, the pinned ScrollTrigger, beat choreography, telemetry rail, skin/tweak wiring, hotspot positioning.

## Files

| File | Role | Port? |
|---|---|---|
| `enveme/ENVEME Redesign.html` | Page shell: nav, pinned hero markup, FX overlays, dock, tweaks, intro, section placeholders, `<head>` CSS (`:root` tokens = the Cinematic skin) | **Port** → `app/page.tsx` + layout + global CSS |
| `enveme/skins.js` | 3 skin definitions (CSS var sets + fonts + 3D scene params) | **Port** → `SkinProvider` + theme config (D1) |
| `enveme/scene.js` | Three.js stage: GLB load, 6-keyframe camera path, per-skin relight, `carBounds()` projection for hotspots | **Port** → R3F/client 3D component (D2) |
| `enveme/content.js` | Data layer (`VEHICLE/SPEC_SHEET/PROVENANCE/MODS/JOURNAL/GALLERY`) + DOM renderers + gauge/odometer animations | **Port** → React section components fed by `lib/publicData.ts` (D3) |
| `enveme/app.js` | Orchestration (intro, Lenis, ScrollTrigger beats, dock, hotspots) | **Port** → client experience component (D2/D4) |
| `enveme/logo.js` | Brand mark SVG generator | **Port** → React `<Logo>` (D4) |
| `enveme/image-slot.js` | Design-time drag-to-replace image scaffold | **DO NOT PORT** — see `IMAGE-SLOT-NOTE.md` |
| `enveme/photos/*`, `uploads/*` | Sam's real build photos (in DesignSync, not vendored here) | Upload via GarageOS CMS — see `PHOTOS.md` |

**Canonical copy:** DesignSync project **"GarageOS"**, `projectId: 180b40dd-18fe-4d68-9792-5562868a16d1`, folder `enveme/`. These vendored files are a snapshot taken 2026-06-27; if in doubt, re-pull via the DesignSync tool `get_file`.

## How the redesign data wires to the CMS (the whole point)

`content.js` currently holds **hardcoded** data that *mirrors* the GarageOS `public/*` Firestore documents. The port replaces those hardcoded arrays with live fetches from `lib/publicData.ts` (Workstream C). Mapping:

| `content.js` constant | Source `public/*` doc | C fetcher |
|---|---|---|
| `VEHICLE.odometerCurrent` (and the `data-garageos-field="odometer.current"` hooks) | `public/vehicle.odometer` | `fetchPublicVehicle()` |
| `SPEC_SHEET`, `PROVENANCE`, ticker | `public/specs` (+ live odometer) | `fetchPublicSpecs()` |
| `MODS` | `public/mods` | `fetchPublicMods()` |
| `JOURNAL` | `public/journal` | `fetchPublicJournal()` |
| `GALLERY` | `public/gallery` | `fetchPublicGallery()` |

Keep the hardcoded `content.js` values as the **fallback** (same pattern as the existing `lib/publicData.ts` fallbacks) so the page never breaks before/without a synced doc.

## Non-negotiable porting rules

1. **Port to React/Next, never ship the raw `<script>` modules.** Server components fetch C data once and pass it as props to a client component that runs GSAP/Three/Lenis. This is an App Router site on Vercel — the 3D/scroll experience must be a `'use client'` island, lazy-loaded.
2. **Do not port `image-slot.js`.** Replace every `<image-slot>` with `next/image` fed by CMS URLs.
3. **Real photos go through the GarageOS gallery/journal CMS** (Workstream A4/B3 → Firebase Storage → `public/gallery`/`public/journal`), not vendored into the repo. See `PHOTOS.md`.
4. **Retain `/build/[slug]` article detail pages.** The journal cards deep-link to them; they render the rich `ContentBlock` articles from `public/journal`.
5. **Keep separate `/about` and `/gallery` routes** (Sam's directive): the homepage shows a *teaser* of each; the full experience lives on its own page. Do not collapse them into the single page.
6. **Fonts via `next/font`** (all six families used across the three skins). No render-blocking `<link>` to Google Fonts.
7. **CDN libs become npm deps:** `gsap` (+ ScrollTrigger), `lenis` (prefer `lenis/react`), `three` + `@react-three/fiber`/`drei` (confirm versions already in the repo). No `unpkg`/`cdnjs` `<script>` tags in production.
8. **Accessibility & motion:** honour `prefers-reduced-motion` (the design already gates animations on it); the pinned hero must not trap keyboard users; hotspot buttons stay focusable.

See the master spec's Workstream D (D0–D5) for the task-by-task breakdown, and the **Design imperatives** + **Verification & bug-checking** sections there.
