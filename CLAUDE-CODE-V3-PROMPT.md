# Claude Code Prompt v3: Visual Polish Pass — Project ENVEME

Copy everything below the line into Claude Code.

---

## Context

I have an existing Next.js portfolio site at `project-enveme/`. The 3D scroll-driven scene, hero section, and basic page structure are working. This session focuses on **visual polish** — making the rest of the site look as good as the hero and 3D sections already do.

**Do NOT touch these files — they are working correctly:**
- `components/three/SoarerScene.tsx`
- `components/three/CarModel.tsx`
- `components/three/ScrollCamera.tsx`
- `components/sections/SceneSection.tsx`
- `components/sections/HeroSection.tsx`
- `components/providers/SmoothScrollProvider.tsx`

## Task 1: Fix the Timeline Section (TimelineSection.tsx)

The timeline currently looks like generic stacked cards — identical to the mods section. It needs to actually look like a timeline.

**Replace the current layout with this structure:**

Desktop (md+ screens):
```
                    │
         Mar 2025   ●──── [Card: Acquisition]
                    │
                    ●──── [Card: Assessment & Baseline]  Apr 2025
                    │
         May 2025   ●──── [Card: Suspension Overhaul]
                    │
                    ●──── [Card: Gauges & Interior]  Jun 2025
                    │
```

Mobile:
```
  │
  ●── [Card: Acquisition]         Mar 2025
  │
  ●── [Card: Assessment]          Apr 2025
  │
  ●── [Card: Suspension]          May 2025
  │
```

**Implementation details:**
- The vertical line should be a `div` with `w-px bg-accent` (or `w-0.5 bg-[#E8920A]`) running the full height of the timeline container, using `absolute` positioning
- Each node/dot should be `w-3 h-3 rounded-full bg-[#E8920A]` with a `ring-4 ring-[#0A0A0A]` to create a gap effect against the line
- On desktop (`md:` breakpoint), the line sits in the center. Cards alternate left and right. Use a grid or flexbox with the line as a central divider.
- On mobile, the line sits on the left edge (left-4 or similar). All cards extend to the right.
- Cards should use the existing `.card` class from globals.css
- Each card should have its colored tag badge (MILESTONE, SERVICE, MODIFICATION, IN PROGRESS) using the existing tag colors
- Date should be in mono font, positioned near the node
- Cards should still have Framer Motion `whileInView` fade-up animation, but stagger them so alternating sides feel sequential
- Add a subtle gradient fade at the top and bottom of the line (fades from transparent to amber, then amber to transparent) so it doesn't start/end abruptly

## Task 2: Add Hover States to All Cards

Every card across the entire site currently has zero hover interaction. Fix this globally.

**For all elements using the `.card` class** (defined in globals.css), update the class to include hover states:

In `globals.css`, modify the `.card` rule:
```css
.card {
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2.5rem;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(232, 146, 10, 0.06);
}
```

**For the build journal entry cards** (in `app/build/page.tsx`): also add a left border that appears on hover in the entry's tag color. You can do this with a pseudo-element or by transitioning `border-left` from transparent to the tag color.

**For the specs grid cards** (in `app/specs/page.tsx` and `components/sections/SpecsSection.tsx`): on hover, the amber value text should brighten slightly (from `#E8920A` to `#FBB940`). Add `transition: color 0.2s ease` to the value span.

**For navigation links** (in `components/layout/Navigation.tsx`): the active underline currently appears instantly. Add a CSS transition so it animates width from 0 to 100%. Use a pseudo-element approach:
```css
/* Replace the current active span with a pseudo-element approach */
/* The link should have position: relative, and use ::after for the underline */
/* ::after transitions width from 0 (inactive) to 100% (active/hover) */
```

## Task 3: Fix Missing Responsive Grid Breakpoints

Two CSS classes are referenced but never defined anywhere:

**In `components/sections/SpecsSection.tsx`**: the specs grid uses `className="md-grid-4"` which doesn't exist. Replace the grid's className/style with proper Tailwind responsive classes:
```
grid grid-cols-2 md:grid-cols-4 gap-5
```

**In `app/specs/page.tsx`**: the two-column layout uses `className="lg-grid-2"` which doesn't exist. Replace with:
```
grid grid-cols-1 lg:grid-cols-2 gap-8
```

Search the entire codebase for any other references to `md-grid-4` or `lg-grid-2` and replace them similarly.

## Task 4: Create Section Rhythm Variation on Homepage

Right now every section on the homepage (`page.tsx`) follows the same pattern: `SectionHeading` at the top, then content in a `page-container`. This is visually monotonous.

**Changes to create contrast between sections:**

### SpecsSection — Make it wider and more dramatic
- Instead of `page-container` width, use a wider container (e.g. `max-w-6xl mx-auto px-6`)
- Add a very subtle background differentiation: a faint horizontal line or gradient at the top edge to separate it from the 3D scene above
- The spec cards should be in a 2×4 grid on desktop (already fixing in Task 3)

### ModsSection — Two-column grid layout on desktop
- On mobile: single column stack (as-is)
- On desktop (`md:` breakpoint): 2-column grid
- Each card gets a left border in its category color (2px solid, using the `tagColor` from the mod data)
- This creates visual distinction from the single-column timeline below it

### TimelineSection — Already being fixed in Task 1
- The alternating left/right layout will naturally create visual distinction

### Alternate section backgrounds
- Sections should alternate between `bg-[#0A0A0A]` and `bg-[#0D0D10]` to create subtle depth
- The current code already does this in some places but not consistently
- Homepage sections should go: Hero (`#0A0A0A`) → Scene (transparent/0A0A0A) → Specs (`#0D0D10`) → Mods (`#0A0A0A`) → Timeline (`#0D0D10`) → CTA (`#0A0A0A`)

## Additional Polish

### Gallery page placeholder
The gallery page (`app/gallery/page.tsx`) probably has minimal content. Add a visually appealing "Coming Soon" state:
- Use the `SectionHeading` component with label "PHOTOGRAPHY" and heading "Gallery"
- Below it, add a 3×2 grid of placeholder boxes (rounded corners, `bg-enveme-surface` or `bg-white/[0.03]`, aspect-ratio 4/3)
- Each box should have a subtle dashed border (`border border-dashed border-white/10`)
- Center text in each: "Photo coming soon" in mono font, very muted
- Add a note below: "High-resolution build photography will be added as the project progresses."

### Consistent section spacing
Make sure all sections on the homepage use consistent vertical padding: `py-24 md:py-32` (6rem / 8rem). Some sections currently use inline `padding: '7rem 0'` which may not match.

## Important Rules

- **Use Tailwind classes wherever possible.** If a section currently uses inline `style={{}}` for spacing, colors, or layout, convert it to Tailwind while you're in that file. Don't go out of your way to convert files not mentioned in the tasks, but if you're editing a file anyway, clean up its inline styles.
- **Use the existing `.card` and `.glass` CSS classes** from globals.css rather than recreating their styles inline.
- **Keep all Framer Motion animations.** Don't remove any `whileInView`, `initial`, or `animate` props. You can adjust timing/delay values if needed for the timeline stagger effect.
- **Test the build.** Run `npm run build` before finishing to ensure no TypeScript or build errors.
- **Don't modify the 3D scene files** listed at the top of this prompt.
- **Mobile-first responsive.** All changes should work on mobile and enhance on desktop. Test that the timeline looks good at both breakpoints.
