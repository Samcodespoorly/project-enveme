import { PublicGallery, PublicGallerySet } from '@/lib/publicData'

interface Frame {
  url?: string; caption: string; setLabel: string; code: string; wide: boolean
}

function buildFrames(sets: PublicGallerySet[]): Frame[] {
  const frames: Frame[] = []
  sets.forEach((set, si) => {
    const setLetter = String.fromCharCode(65 + si)
    set.images.forEach((img, ii) => {
      frames.push({
        url: img.url,
        caption: img.caption ?? set.label,
        setLabel: set.label,
        code: `${setLetter}-${String(ii + 1).padStart(2, '0')}`,
        wide: ii === 0 && set.images.length > 3,
      })
    })
  })
  return frames
}

function buildPlaceholderFrames(sets: PublicGallerySet[]): Frame[] {
  return sets.slice(0, 4).map((set, si) => ({
    caption: set.note,
    setLabel: set.label,
    code: `${String.fromCharCode(65 + si)}-01`,
    wide: false,
  }))
}

export default function GallerySection({ gallery }: { gallery: PublicGallery }) {
  const publishedWithImages = gallery.sets.filter(s => s.status === 'PUBLISHED' && s.images.length > 0)
  const frames = publishedWithImages.length > 0
    ? buildFrames(publishedWithImages)
    : buildPlaceholderFrames(gallery.sets)

  return (
    <section className="sec-reveal" style={{ position: 'relative', zIndex: 5, background: 'var(--bg)', padding: 'clamp(4.5rem,11vh,8rem) clamp(1.25rem,5vw,5rem)', borderTop: '1px solid var(--line-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
            Contact Sheet · the car
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem,5.5vw,4rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-.02em', color: 'var(--ink)', marginTop: '.4rem' }}>
            The<br />Frames
          </h2>
        </div>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '330px', fontSize: '1rem', lineHeight: 1.6 }}>
          Real shots from the build — the engine bay, the gasket refresh, the wiring, the trim CAD work.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
        {frames.map((f) => (
          <div
            key={f.code}
            style={{
              display: 'flex', flexDirection: 'column', gap: '.5rem',
              gridColumn: f.wide ? 'span 2' : undefined,
            }}
          >
            <div className="frame-holder">
              <span className="frame-corner frame-corner--tr" />
              <span className="frame-corner frame-corner--bl" />
              {f.url ? (
                <img
                  src={f.url}
                  alt={f.caption}
                  loading="lazy"
                  style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%', aspectRatio: '3/2',
                  background: 'var(--surface-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.12em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
                    {f.setLabel}
                  </span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.6rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.06em', color: 'var(--ink-soft)' }}>{f.caption}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.16em', color: 'var(--accent)' }}>{f.code}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
