import SceneSection from '@/components/sections/SceneSection'
import SpecsSection from '@/components/sections/SpecsSection'
import ModsSection from '@/components/sections/ModsSection'
import TimelineSection from '@/components/sections/TimelineSection'
import CTASection from '@/components/sections/CTASection'
import { fetchPublicVehicle, fetchPublicMods, fetchPublicTimeline } from '@/lib/publicData'

export default async function Home() {
  const [vehicle, mods, timeline] = await Promise.all([
    fetchPublicVehicle(),
    fetchPublicMods(),
    fetchPublicTimeline(),
  ])

  return (
    <main>
      <SceneSection vehicle={vehicle} />
      <SpecsSection />
      <ModsSection mods={mods} />
      <TimelineSection entries={timeline} />
      <CTASection />
    </main>
  )
}
