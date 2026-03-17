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
      <div className="max-w-7xl mx-auto px-8">
        {/* Page header */}
        <SectionHeading
          label="PROJECT ENVEME · VISUAL RECORD"
          heading="Gallery"
          subtitle="A visual record of the build as it progresses."
        />

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {placeholderPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative bg-[#111111] border border-white/10 rounded-lg aspect-video flex flex-col items-center justify-center gap-2 overflow-hidden group"
            >
              {/* Subtle gradient shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

              <p
                className="text-[#777777] text-[10px] tracking-[0.3em] uppercase z-10"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                PHOTO COMING SOON
              </p>
              <p
                className="text-[#888888] text-xs z-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {photo.label}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="glass rounded-xl p-5">
          <p
            className="text-[#888888] text-xs leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Photos will be added as the build progresses.
          </p>
        </div>
      </div>
    </main>
  )
}
