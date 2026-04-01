import { Suspense } from 'react'
import SceneSection from '@/components/sections/SceneSection'
import SpecsSection from '@/components/sections/SpecsSection'
import ModsSection from '@/components/sections/ModsSection'
import TimelineSection from '@/components/sections/TimelineSection'
import CTASection from '@/components/sections/CTASection'
import { ModsSectionSkeleton, TimelineSectionSkeleton } from '@/components/ui/Skeletons'
import {
  fetchPublicVehicle,
  fetchPublicMods,
  fetchPublicTimeline,
} from '@/lib/publicData'

// ── Async server component wrappers ───────────────────────────────────────

async function VehicleScene() {
  const vehicle = await fetchPublicVehicle()
  return <SceneSection vehicle={vehicle} />
}

async function ModsSectionAsync() {
  const mods = await fetchPublicMods()
  return <ModsSection mods={mods} />
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

      {/* Fully static — no Firebase dependency */}
      <SpecsSection />

      {/* Data-dependent sections stream in independently */}
      <Suspense fallback={<ModsSectionSkeleton />}>
        <ModsSectionAsync />
      </Suspense>

      <Suspense fallback={<TimelineSectionSkeleton />}>
        <TimelineSectionAsync />
      </Suspense>

      {/* Fully static */}
      <CTASection />
    </main>
  )
}
