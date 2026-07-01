import { Suspense } from 'react'
import SceneSection from '@/components/sections/SceneSection'
import SpecTicker from '@/components/sections/SpecTicker'
import InstrumentSection from '@/components/sections/InstrumentSection'
import ProvenanceSection from '@/components/sections/ProvenanceSection'
import SpecsSection from '@/components/sections/SpecsSection'
import DigitalTwinSection from '@/components/sections/DigitalTwinSection'
import JournalSection from '@/components/sections/JournalSection'
import TimelineSection from '@/components/sections/TimelineSection'
import GallerySection from '@/components/sections/GallerySection'
import CTASection from '@/components/sections/CTASection'
import { ModsSectionSkeleton, TimelineSectionSkeleton } from '@/components/ui/Skeletons'
import {
  fetchPublicVehicle,
  fetchPublicMods,
  fetchPublicModsDoc,
  fetchPublicTimeline,
  fetchPublicSpecs,
  fetchPublicJournal,
  fetchPublicGallery,
} from '@/lib/publicData'

export const revalidate = 300

// ── Async server component wrappers ───────────────────────────────────────

async function VehicleScene() {
  const vehicle = await fetchPublicVehicle()
  return <SceneSection vehicle={vehicle} />
}

async function InstrumentAsync() {
  const [vehicle, timeline, modsDoc] = await Promise.all([
    fetchPublicVehicle(),
    fetchPublicTimeline(),
    fetchPublicModsDoc(),
  ])
  const completedProjects = timeline.filter(t => t.status === 'complete').length
  const totalProjects = timeline.length
  return (
    <InstrumentSection
      odometer={vehicle.odometer}
      completedProjects={completedProjects}
      totalProjects={totalProjects}
      partsInstalled={modsDoc.totalInstalled}
    />
  )
}

async function ProvenanceAsync() {
  const specs = await fetchPublicSpecs()
  return <ProvenanceSection specs={specs} />
}

async function SpecsSectionAsync() {
  const { homepageSpecs } = await fetchPublicSpecs()
  return <SpecsSection specs={homepageSpecs} />
}

async function DigitalTwinAsync() {
  const mods = await fetchPublicMods()
  return <DigitalTwinSection mods={mods} />
}

async function JournalSectionAsync() {
  const entries = await fetchPublicJournal()
  return <JournalSection entries={entries.slice(0, 4)} />
}

async function TimelineSectionAsync() {
  const timeline = await fetchPublicTimeline()
  return <TimelineSection entries={timeline} />
}

async function GalleryAsync() {
  const gallery = await fetchPublicGallery()
  return <GallerySection gallery={gallery} />
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div style={{ height: '100vh' }} aria-hidden="true" />}>
        <VehicleScene />
      </Suspense>

      <SpecTicker />

      <Suspense fallback={<div style={{ minHeight: '20rem' }} />}>
        <InstrumentAsync />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '20rem' }} />}>
        <ProvenanceAsync />
      </Suspense>

      <Suspense fallback={<SpecsSection />}>
        <SpecsSectionAsync />
      </Suspense>

      <Suspense fallback={<ModsSectionSkeleton />}>
        <DigitalTwinAsync />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '20rem' }} />}>
        <JournalSectionAsync />
      </Suspense>

      <Suspense fallback={<TimelineSectionSkeleton />}>
        <TimelineSectionAsync />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '20rem' }} />}>
        <GalleryAsync />
      </Suspense>

      <CTASection />
    </main>
  )
}
