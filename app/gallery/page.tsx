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
    <main style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label="PROJECT ENVEME · VISUAL RECORD"
          heading="Gallery"
          subtitle="A visual record of the build as it progresses."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          {placeholderPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                borderRadius: '1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                aspectRatio: '16/9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.625rem',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#555', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                COMING SOON
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#777' }}>
                {photo.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{ borderRadius: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.75rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555' }}>
            Photos will be added as the build progresses.
          </p>
        </div>

      </div>
    </main>
  )
}
