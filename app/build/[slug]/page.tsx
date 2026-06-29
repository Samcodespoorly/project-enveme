import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchPublicJournal, type PublicContentBlock } from '@/lib/publicData'
import Badge from '@/components/ui/Badge'
import ReadingProgress from '@/components/ui/ReadingProgress'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = true
export const revalidate = 300

export async function generateStaticParams() {
  const entries = await fetchPublicJournal()
  return entries.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const entries = await fetchPublicJournal()
  const entry = entries.find((e) => e.slug === slug)
  return {
    title: entry ? `${entry.title} — ENVEME` : 'Build Journal — ENVEME',
    description: entry?.excerpt,
  }
}

function renderBlock(block: PublicContentBlock, tagColor: string, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.75,
            marginBottom: '1.5rem',
          }}
        >
          {block.text}
        </p>
      )

    case 'heading':
      return (
        <h2
          key={index}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 700,
            color: 'var(--ink)',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            borderLeft: `3px solid ${tagColor}`,
            paddingLeft: '1rem',
            marginTop: '2.5rem',
            marginBottom: '1.25rem',
          }}
        >
          {block.text}
        </h2>
      )

    case 'image-placeholder':
      return (
        <div
          key={index}
          style={{
            borderRadius: '1rem',
            border: '1px dashed var(--line)',
            background: 'var(--surface)',
            aspectRatio: '16/9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.6 }}
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--ink-faint)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            PHOTOGRAPHY COMING SOON
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--ink-faint)' }}>
            {block.caption}
          </p>
        </div>
      )

    case 'image':
      return (
        <div key={index} style={{ marginBottom: '2rem' }}>
          <img
            src={block.url}
            alt={block.caption ?? ''}
            loading="lazy"
            style={{
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '1rem',
              border: '1px solid var(--line)',
            }}
          />
          {block.caption && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--ink-faint)',
              textAlign: 'center',
              marginTop: '0.75rem',
              letterSpacing: '0.1em',
            }}>
              {block.caption}
            </p>
          )}
        </div>
      )

    case 'spec-table':
      return (
        <div
          key={index}
          style={{
            borderRadius: '1rem',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            overflow: 'hidden',
            marginBottom: '2rem',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {block.rows.map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    borderBottom: '1px solid var(--line-soft)',
                    background: i % 2 === 0 ? 'var(--surface)' : 'transparent',
                  }}
                >
                  <td style={{
                    padding: '0.75rem 1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--ink-faint)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    width: '40%',
                  }}>
                    {row.label}
                  </td>
                  <td style={{
                    padding: '0.75rem 1.25rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--ink)',
                  }}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout':
      return (
        <div
          key={index}
          className="glass"
          style={{
            borderLeft: `3px solid ${block.color ?? tagColor}`,
            borderRadius: '0.75rem',
            padding: '1.5rem 1.75rem',
            marginBottom: '2rem',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            color: block.color ?? tagColor,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            {block.label}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
          }}>
            {block.text}
          </p>
        </div>
      )

    default:
      return null
  }
}

export default async function BuildEntryPage({ params }: Props) {
  const { slug } = await params
  const entries = await fetchPublicJournal()
  const entry = entries.find((e) => e.slug === slug)

  if (!entry) notFound()

  const currentIndex = entries.findIndex((e) => e.slug === slug)
  const prevEntry = currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null
  const nextEntry = currentIndex > 0 ? entries[currentIndex - 1] : null

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <ReadingProgress color={entry.tagColor} />
      <div className="page-container">

        {/* Back link */}
        <Link
          href="/build"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
          }}
        >
          ← Build Journal
        </Link>

        {/* Page hero bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <Badge label={entry.category} color={entry.tagColor} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>
            {entry.date}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>
            {entry.readTime}
          </span>
        </div>

        {/* Accent rule */}
        <div style={{
          height: '1px',
          background: `linear-gradient(to right, ${entry.tagColor}, transparent)`,
          marginBottom: '2rem',
        }} />

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          color: 'var(--ink)',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.0,
          marginBottom: '2rem',
        }}>
          {entry.title}
        </h1>

        {/* Meta row — tools + cost */}
        {(entry.tools && entry.tools.length > 0 || entry.cost) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {entry.tools && entry.tools.length > 0 && (
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--ink-faint)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  TOOLS USED
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {entry.tools.map((tool) => (
                    <span key={tool} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      color: 'var(--ink-soft)',
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '0.375rem',
                    }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {entry.cost && (
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--ink-faint)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  TOTAL COST
                </p>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: entry.tagColor,
                }}>
                  {entry.cost}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Separator */}
        <div style={{ borderTop: '1px solid var(--line-soft)', marginBottom: '2.5rem' }} />

        {/* Content */}
        <div style={{ maxWidth: '720px' }}>
          {entry.content.map((block, i) => renderBlock(block, entry.tagColor, i))}
        </div>

        {/* Prev / Next navigation */}
        {(prevEntry || nextEntry) && (
          <div style={{
            borderTop: '1px solid var(--line-soft)',
            marginTop: '3rem',
            paddingTop: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            <div>
              {prevEntry && (
                <Link href={`/build/${prevEntry.slug}`} style={{ textDecoration: 'none' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--ink-faint)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    ← Earlier
                  </p>
                  <p className="journal-nav-title" style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.2 }}>
                    {prevEntry.title}
                  </p>
                </Link>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              {nextEntry && (
                <Link href={`/build/${nextEntry.slug}`} style={{ textDecoration: 'none' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--ink-faint)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    More recent →
                  </p>
                  <p className="journal-nav-title" style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.2 }}>
                    {nextEntry.title}
                  </p>
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
