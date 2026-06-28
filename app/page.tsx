import { Suspense } from 'react'
import SceneSection from '@/components/sections/SceneSection'
import SpecsSection from '@/components/sections/SpecsSection'
import DigitalTwinSection from '@/components/sections/DigitalTwinSection'
import TimelineSection from '@/components/sections/TimelineSection'
import CTASection from '@/components/sections/CTASection'
import { ModsSectionSkeleton, TimelineSectionSkeleton } from '@/components/ui/Skeletons'
import {
  fetchPublicVehicle,
  fetchPublicMods,
  fetchPublicTimeline,
  fetchPublicSpecs,
} from '@/lib/publicData'

// ── Async server component wrappers ───────────────────────────────────────

async function VehicleScene() {
  const vehicle = await fetchPublicVehicle()
  return <SceneSection vehicle={vehicle} />
}

async function SpecsSectionAsync() {
  const { homepageSpecs } = await fetchPublicSpecs()
  return <SpecsSection specs={homepageSpecs} />
}

async function DigitalTwinAsync() {
  const mods = await fetchPublicMods()
  return <DigitalTwinSection mods={mods} />
}

async function TimelineSectionAsync() {
  const timeline = await fetchPublicTimeline()
  return <TimelineSection entries={timeline} />
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      {/* SceneSection needs vehicle data but is the hero — give it its own
          Suspense so the static sections below can still render immediately
          if the scene resolves first; a blank viewport is acceptable here
          because the canvas loading state handles the visual wait. */}
      <Suspense fallback={<div style={{ height: '100vh' }} aria-hidden="true" />}>
        <VehicleScene />
      </Suspense>

      <Suspense fallback={<SpecsSection />}>
        <SpecsSectionAsync />
      </Suspense>

      {/* Interactive digital twin — replaces the static mods grid; the same
          parts data is now explorable on the 3D car itself */}
      <Suspense fallback={<ModsSectionSkeleton />}>
        <DigitalTwinAsync />
      </Suspense>

      <Suspense fallback={<TimelineSectionSkeleton />}>
        <TimelineSectionAsync />
      </Suspense>

      {/* Fully static */}
      <CTASection />
    </main>
  )
}
