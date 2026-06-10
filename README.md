# Project ENVEME

A live engineering portfolio documenting the build of a 1995 Toyota Soarer (JZZ31, 2JZ-GE) — and the site itself is part of the portfolio.

**Live:** https://project-enveme.vercel.app

## What it demonstrates

- **Scroll-driven 3D hero** — the Soarer rendered from a Draco + WebP-compressed GLB (5.9 MB, down from a 49 MB source scan), camera choreographed with GSAP ScrollTrigger over a pinned 300vh section, smooth-scrolled with Lenis.
- **Live data, not lorem ipsum** — odometer, service history, and build timeline stream from the same Firestore backend as [GarageOS](https://github.com/Samcodespoorly/GarageOS), the car-management app I built to run the project. The site reads a curated public summary via the Firestore REST API with 5-minute ISR.
- **The build itself** — every modification, service, and decision on the car is logged and published here as it happens.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Three.js / React Three Fiber · GSAP + ScrollTrigger · Lenis · Framer Motion · Firebase Firestore · Vercel

## Structure

| Route | Purpose |
|---|---|
| `/` | Scroll-driven 3D scene + project overview |
| `/build` | Build journal, grouped by status, live from Firestore |
| `/specs` | Full vehicle specification (single source: `lib/vehicleData.ts`) |
| `/about` | About the engineer — skills, education, contact |
| `/gallery` | Photo gallery (in progress) |

## Local development

```bash
npm install
npm run dev
```

Requires `NEXT_PUBLIC_FIREBASE_*` vars in `.env.local` for live data; pages render with fallbacks without them.

---

Samuel Donovan — Mechatronics / Finance conjoint, Auckland NZ. [LinkedIn](https://www.linkedin.com/in/samuel-donovan-293470275/)
