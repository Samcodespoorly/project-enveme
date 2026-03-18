import SectionHeading from '@/components/ui/SectionHeading'

const placeholderPhotos = [
  { id: 1, label: 'Exterior — Front 3/4' },
  { id: 2, label: 'Engine Bay' },
  { id: 3, label: 'Interior' },
  { id: 4, label: 'Exterior — Rear 3/4' },
  { id: 5, label: 'Wheel Detail' },
  { id: 6, label: 'Suspension' },
]

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-28">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        <SectionHeading
          label="PROJECT ENVEME · VISUAL RECORD"
          heading="Gallery"
          subtitle="A visual record of the build as it progresses."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {placeholderPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative rounded-2xl bg-white/[0.04] border border-white/[0.08] aspect-video flex flex-col items-center justify-center gap-3"
            >
              <p
                className="text-[#666] text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                COMING SOON
              </p>
              <p className="text-[#888] text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                {photo.label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 text-center">
          <p className="text-[#555] text-xs leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
            Photos will be added as the build progresses.
          </p>
        </div>

      </div>
    </main>
  )
}
