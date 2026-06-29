import Link from 'next/link'
import { PublicJournalEntry } from '@/lib/publicData'

export default function JournalSection({ entries }: { entries: PublicJournalEntry[] }) {
  const shown = entries.slice(0, 4)

  return (
    <section style={{ position: 'relative', zIndex: 5, background: 'var(--bg)', padding: 'clamp(4.5rem,11vh,8rem) clamp(1.25rem,5vw,5rem)', borderTop: '1px solid var(--line-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
            Build Journal · {entries.length} entries
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem,5.5vw,4rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-.02em', color: 'var(--ink)', marginTop: '.4rem' }}>
            The<br />Logbook
          </h2>
        </div>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '330px', fontSize: '1rem', lineHeight: 1.6 }}>
          Every modification, service and decision — documented from acquisition to the work on the bench right now.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(330px,1fr))', gap: '1.5rem' }}>
        {shown.map((entry) => {
          const live = entry.date.toLowerCase().includes('progress')
          return (
            <Link
              key={entry.slug}
              href={`/build/${entry.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article style={{
                position: 'relative',
                background: 'var(--surface)',
                border: '1px solid var(--line-soft)',
                borderRadius: 'var(--radius)',
                padding: '1.8rem 1.8rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '.9rem',
                overflow: 'hidden',
                height: '100%',
              }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: entry.tagColor, opacity: .85 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '.54rem', letterSpacing: '.2em',
                    textTransform: 'uppercase', padding: '.24rem .55rem', borderRadius: '999px',
                    color: entry.tagColor, border: '1px solid currentColor',
                  }}>
                    {entry.category}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: live ? 'var(--accent)' : 'var(--ink-faint)',
                    display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                  }}>
                    {live && (
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: 'var(--accent)',
                        animation: 'livepulse 1.8s ease-in-out infinite',
                        display: 'inline-block',
                      }} />
                    )}
                    {entry.date}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '.01em' }}>
                  {entry.title}
                </h3>

                <p style={{ fontSize: '.95rem', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                  {entry.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                    {(entry.tools ?? []).slice(0, 3).map((tool) => (
                      <span key={tool} style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.08em', color: 'var(--ink-faint)', padding: '.18rem .45rem', border: '1px solid var(--line-soft)', borderRadius: '3px' }}>
                        {tool}
                      </span>
                    ))}
                    {(!entry.tools || entry.tools.length === 0) && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.08em', color: 'var(--ink-faint)', padding: '.18rem .45rem', border: '1px solid var(--line-soft)', borderRadius: '3px' }}>
                        documented
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', whiteSpace: 'nowrap' }}>
                    {entry.readTime}
                  </span>
                </div>
              </article>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
