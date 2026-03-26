import type { Metadata } from 'next'
import SectionHeading from '@/components/ui/SectionHeading'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'
import { journalEntries } from '@/lib/buildData'
import { fetchPublicTimeline } from '@/lib/publicData'
import type { PublicTimeline } from '@/lib/publicData'

export const metadata: Metadata = {
  title: 'Build Journal — ENVEME',
  description: 'Chronological documentation of the 1995 Toyota Soarer JZZ31 build — suspension, maintenance, and modifications.',
}

const STATUS_ORDER: PublicTimeline['status'][] = ['in_progress', 'complete', 'planning', 'on_hold']

const STATUS_LABELS: Record<PublicTimeline['status'], string> = {
  in_progress: 'In Progress',
  complete:    'Complete',
  planning:    'Planning',
  on_hold:     'On Hold',
}

const STATUS_COLOURS: Record<PublicTimeline['status'], string> = {
  in_progress: '#E8920A',
  complete:    '#34D399',
  planning:    '#60A5FA',
  on_hold:     '#9CA3AF',
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-NZ', { year: 'numeric', month: 'short' })
}

export default async function BuildPage() {
  const allProjects = await fetchPublicTimeline()

  // Group by status in display order
  const grouped = STATUS_ORDER
    .map(status => ({
      status,
      label: STATUS_LABELS[status],
      color: STATUS_COLOURS[status],
      projects: allProjects.filter(p => p.status === status),
    }))
    .filter(group => group.projects.length > 0)

  const hasLiveProjects = allProjects.length > 0

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label="DOCUMENTED BUILD LOG"
          heading="Build Journal"
          subtitle="A chronological record of every modification, service, and decision."
        />

        {/* ── Live projects from GarageOS ── */}
        {hasLiveProjects && (
          <section style={{ marginBottom: '5rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              fontWeight: 700,
              color: '#FFF',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '2.5rem',
            }}>
              Projects
            </h2>

            {grouped.map(group => (
              <div key={group.status} style={{ marginBottom: '3rem' }}>
                {/* Status group heading */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: group.color,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: group.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}>
                    {group.label}
                  </span>
                </div>

                {/* Project cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {group.projects.map(project => (
                    <div
                      key={project.id}
                      className="card"
                      style={{ padding: '1.75rem 2rem' }}
                    >
                      {/* Header row */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        marginBottom: project.description ? '1rem' : '0',
                        flexWrap: 'wrap',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
                          <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                            fontWeight: 700,
                            color: '#FFF',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.15,
                            margin: 0,
                          }}>
                            {project.title}
                          </h3>
                          <Badge label={STATUS_LABELS[project.status]} color={group.color} />
                        </div>

                        {/* Meta: date + category */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '0.25rem',
                          flexShrink: 0,
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6875rem',
                            color: '#555',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}>
                            {project.category}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6875rem',
                            color: '#444',
                            letterSpacing: '0.08em',
                          }}>
                            {project.completedDate
                              ? formatDate(project.completedDate)
                              : project.startDate
                                ? formatDate(project.startDate)
                                : '—'}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      {project.description && (
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9375rem',
                          color: '#AAAAAA',
                          lineHeight: 1.7,
                          margin: 0,
                        }}>
                          {project.description}
                        </p>
                      )}

                      {/* Tags + cost row */}
                      {(project.tags.length > 0 || project.totalCost != null) && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          marginTop: '1.25rem',
                          flexWrap: 'wrap',
                        }}>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {project.tags.map(tag => (
                              <span
                                key={tag}
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.625rem',
                                  color: '#666',
                                  background: 'rgba(255,255,255,0.04)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                  borderRadius: '4px',
                                  padding: '0.2rem 0.5rem',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.1em',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {project.totalCost != null && (
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              color: '#E8920A',
                              letterSpacing: '0.05em',
                            }}>
                              NZD ${project.totalCost.toLocaleString('en-NZ')}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── Static journal entries ── */}
        <section>
          {hasLiveProjects && (
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              fontWeight: 700,
              color: '#FFF',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '2rem',
            }}>
              Journal Entries
            </h2>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {journalEntries.map((entry) => (
              <div
                key={entry.slug}
                className="card build-card"
                style={{ '--card-accent': entry.tagColor } as React.CSSProperties}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <Badge label={entry.category} color={entry.tagColor} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666', letterSpacing: '0.1em' }}>
                    {entry.date}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', letterSpacing: '0.1em' }}>
                    {entry.readTime}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
                  fontWeight: 700,
                  color: '#FFF',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  marginBottom: '1.25rem',
                }}>
                  {entry.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: '#AAAAAA',
                  lineHeight: 1.75,
                  marginBottom: '1.75rem',
                }}>
                  {entry.excerpt}
                </p>

                <Link href={`/build/${entry.slug}`} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#E8920A',
                  textDecoration: 'none',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}>
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <div style={{
          marginTop: '2rem',
          borderRadius: '1.25rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', lineHeight: 1.6 }}>
            Projects synced live from GarageOS · Journal entries are hand-authored build logs.
          </p>
        </div>

      </div>
    </main>
  )
}
