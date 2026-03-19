# Project ENVEME — Directive v5
## Goals: Dynamic Build Journal Pages + Mobile Responsiveness

---

## Context

Project ENVEME is an employer-facing public portfolio site for a 1995 Toyota Soarer JZZ31 (NZ plate: ENVEME), built by Samuel Donovan (Mechatronics + Finance/Economics student, Auckland NZ).

**Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Three.js via @react-three/fiber, GSAP + ScrollTrigger, Framer Motion, Lenis smooth scroll.

**Design system:**
- Background: `#0A0A0A`
- Amber accent: `#E8920A`
- Hover amber: `#FBB940`
- Display font: `var(--font-display)` (Barlow Condensed, heavy/black)
- Body font: `var(--font-body)` (DM Sans)
- Mono font: `var(--font-mono)` (JetBrains Mono)
- Cards use `.card` and `.build-card` CSS classes (defined in `globals.css`)
- Sections use `.page-container` for consistent side padding
- Reusable: `<Badge>`, `<SectionHeading>`, `<AnimatedText>` from `components/ui/`

---

## Task 1 — Dynamic Build Journal Entry Pages

### Problem
`app/build/page.tsx` has journal entry cards with "Read more →" links pointing to `/build/tein-coilover-install`, `/build/baseline-fluid-service`, and `/build/acquisition-story`. These 404 — the dynamic route doesn't exist.

### Solution: Create `app/build/[slug]/page.tsx`

**1a. Move journal data to a shared data file**

Create `lib/buildData.ts` with a full `journalEntries` array. Each entry needs:

```ts
type JournalEntry = {
  slug: string
  date: string
  category: string
  tagColor: string      // e.g. '#E8920A', '#60A5FA', '#34D399'
  title: string
  excerpt: string       // used in the list card
  readTime: string      // e.g. '5 min read'
  content: ContentBlock[]
  relatedMods?: string[]
  tools?: string[]
  cost?: string
}

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'image-placeholder'; caption: string }
  | { type: 'spec-table'; rows: { label: string; value: string }[] }
  | { type: 'callout'; label: string; text: string; color?: string }
```

Populate with real content for all three existing entries. Write detailed, technically accurate content for each:

**Entry: `acquisition-story`** (March 2025, ACQUISITION, `#E8920A`)
- Title: "Purchasing the JZZ31 — Why This Car?"
- Content: The search process on Trade Me, why JZZ31 over JDM alternatives, the 2JZ-GE platform, specific inspection points (timing belt, coolant, diff), what the logbook showed, purchase price considerations, NZ import/compliance history context. Include a spec-table block showing the factory specs confirmed at purchase.

**Entry: `baseline-fluid-service`** (April 2025, MAINTENANCE, `#34D399`)
- Title: "Full Fluid Service & Baseline Inspection"
- Content: What a "baseline" means for a newly acquired car, full list of fluids replaced (engine oil 5W-30, coolant, gearbox ATF, diff oil, brake fluid, power steering), the front lower control arm bushing discovery (what worn bushings feel like, why they matter), tools used, total cost breakdown. Include a spec-table block for fluid specs and a callout for the bushing finding.

**Entry: `tein-coilover-install`** (May 2025, SUSPENSION, `#60A5FA`)
- Title: "Tein Coilover Installation & Alignment"
- Content: Why coilovers over OEM replacement shocks, the Tein Street Basis Z spec, spring rates, installation process (front strut removal, spring compressor safety, torque specs), the 30mm drop decision, four-wheel alignment — caster, camber, toe targets, total job cost. Include a spec-table for coilover specs and a callout for alignment results.

**1b. Update `app/build/page.tsx`**

Import `journalEntries` from `lib/buildData.ts` instead of defining inline. Remove the `journalEntries` array that's currently in the file.

**1c. Create `app/build/[slug]/page.tsx`**

This is the individual entry page. Build a rich, design-system-consistent layout:

```
- Back navigation: "← Build Journal" link at top (amber, mono font)
- Page hero bar: category badge + date + read time, horizontal amber rule below
- Entry title: large display font, same treatment as other page headings
- Meta row: tools used + cost (if present) displayed as pill tags
- Content renderer: loop through content blocks:
    - paragraph → body text, color #C0C0C0, lineHeight 1.75
    - heading → display font, uppercase, amber left border, margin top
    - image-placeholder → dashed border box, 16:9 ratio, centered label "PHOTO COMING SOON", mono font, amber icon
    - spec-table → same striped table style as the specs page
    - callout → glass card with colored left border (entry.tagColor), label in mono + text
- Next/Previous entry navigation at the bottom (links to adjacent entries)
```

Add `generateStaticParams()` to export static slugs for the three entries:
```ts
export function generateStaticParams() {
  return journalEntries.map(e => ({ slug: e.slug }))
}
```

Add metadata export for SEO:
```ts
export function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = journalEntries.find(e => e.slug === params.slug)
  return {
    title: entry ? `${entry.title} — ENVEME` : 'Build Journal — ENVEME',
    description: entry?.excerpt,
  }
}
```

---

## Task 2 — Mobile Responsiveness for the SceneSection Hero

### Problem
`components/sections/SceneSection.tsx` has the hero text (Overlay 1) constrained to `max-width: min(54%, 640px)`. On screens narrower than ~768px, this is as narrow as 200px — the text overflows, the buttons stack awkwardly, and the WebGL 3D canvas is too expensive to run on most mobile GPUs.

### Solution

**2a. Create a mobile-only fallback hero inside SceneSection**

The 3D canvas and overlay system should only render on `md:` screens (768px+). On mobile, render a static hero instead.

Use a React hook to detect the screen width:
```ts
const [isMobile, setIsMobile] = useState(false)
useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768)
  check()
  window.addEventListener('resize', check)
  return () => window.removeEventListener('resize', check)
}, [])
```

When `isMobile === true`, render a simple full-viewport static hero — **no canvas, no GSAP ScrollTrigger, no scroll pin**:

```jsx
// Mobile hero — static, no 3D
<section style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '7rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
  {/* Same grid texture background as before */}
  {/* Same amber radial glow */}
  {/* Same ghost JZZ31 text (smaller) */}
  {/* Same left amber accent line */}

  {/* Full-width text content — same structure as Overlay 1 but full width */}
  {/* Label → ENVEME heading → amber divider → spec row → subtitle → buttons */}
  {/* Use Framer Motion entrance animations identical to desktop */}

  {/* Scroll hint at bottom */}
</section>
```

When `isMobile === false`, render the existing full SceneSection with canvas + GSAP pin + overlays.

**2b. Fix Overlay 1 padding on tablet (768–1024px)**

On tablet, `paddingLeft: 'clamp(2rem, 5vw, 5rem)'` is appropriate but the `max-width: min(54%, 640px)` can still feel cramped at 768px (54% = ~415px). Increase to `min(58%, 640px)` for better readability on tablet.

**Important:** Do NOT put `isMobile` logic in a way that causes hydration mismatch. Use `useState(false)` with `useEffect` to set the true value client-side — this is already the correct pattern above. The mobile fallback will render after the first client render, which is acceptable since this is a visual-only concern.

---

## Task 3 — Page Metadata & Titles

Add metadata exports to all pages that don't have them:

**`app/build/page.tsx`:**
```ts
export const metadata = {
  title: 'Build Journal — ENVEME',
  description: 'Chronological documentation of the 1995 Toyota Soarer JZZ31 build — suspension, maintenance, and modifications.',
}
```

**`app/specs/page.tsx`:**
```ts
export const metadata = {
  title: 'Vehicle Specs — ENVEME',
  description: 'Factory and current specifications for the 1995 Toyota Soarer JZZ31 (Project ENVEME).',
}
```

**`app/about/page.tsx`:**
```ts
export const metadata = {
  title: 'About — ENVEME',
  description: 'Samuel Donovan — Mechatronics & Finance/Economics student. Project ENVEME is a live engineering portfolio.',
}
```

**`app/layout.tsx`** (root metadata — add if not already present):
```ts
export const metadata = {
  title: 'ENVEME — 1995 Toyota Soarer JZZ31 Build',
  description: 'Project ENVEME: a fully documented 1995 Toyota Soarer JZZ31 build by Samuel Donovan, Auckland NZ.',
  openGraph: {
    title: 'ENVEME — 1995 Toyota Soarer JZZ31',
    description: 'A live engineering portfolio documenting the build of a 1995 Toyota Soarer JZZ31.',
    siteName: 'ENVEME',
  },
}
```

---

## Checklist

- [ ] `lib/buildData.ts` created with full typed `JournalEntry[]` array, all three entries populated with real content
- [ ] `app/build/page.tsx` updated to import from `lib/buildData.ts`
- [ ] `app/build/[slug]/page.tsx` created with full layout, content renderer, prev/next navigation, generateStaticParams, generateMetadata
- [ ] `components/sections/SceneSection.tsx` updated with mobile detection and static mobile hero fallback
- [ ] All inner pages have metadata exports
- [ ] `app/layout.tsx` has root metadata

## Quality Bar

- Individual entry pages should feel like the rest of the site — dark bg, amber accents, display font headings, mono font labels. No plain white pages.
- Image placeholder blocks should look intentional, not broken — style them as "awaiting photography" with an amber camera icon SVG and "PHOTOGRAPHY COMING SOON" caption.
- The mobile hero should be visually identical to the desktop hero (same text, same design elements) just without the 3D canvas.
- All TypeScript must be valid — no `any` types, no missing imports.
