import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import Link from 'next/link'

const journalEntries = [
  {
    date: 'May 2025',
    category: 'SUSPENSION',
    title: 'Tein Coilover Installation & Alignment',
    excerpt:
      'After sourcing a set of Tein Street Basis coilovers, I undertook the full front and rear suspension replacement over a weekend. The process involved removing the OEM shock absorbers, compressing the new coilover springs, and setting the initial ride height at 30mm below standard before a four-wheel alignment.',
    slug: 'tein-coilover-install',
  },
  {
    date: 'Apr 2025',
    category: 'MAINTENANCE',
    title: 'Full Fluid Service & Baseline Inspection',
    excerpt:
      'With the JZZ31 freshly acquired, the first priority was a comprehensive fluid service and mechanical baseline. Engine oil, coolant, transmission fluid, differential oil, and brake fluid were all replaced. Worn front lower control arm bushings were identified and replaced ahead of the upcoming suspension work.',
    slug: 'baseline-fluid-service',
  },
  {
    date: 'Mar 2025',
    category: 'ACQUISITION',
    title: 'Purchasing the JZZ31 — Why This Car?',
    excerpt:
      'After months of searching Trade Me and local classifieds, I found the right example in Auckland — a 1995 Pearl White JZZ31 with 102,000 km and a folder of service history. The 2JZ-GE is a bulletproof platform, the chassis is sophisticated, and the Soarer is genuinely undervalued in the NZ market.',
    slug: 'acquisition-story',
  },
]

const categoryColors: Record<string, string> = {
  SUSPENSION: '#E8920A',
  MAINTENANCE: '#E8920A',
  ACQUISITION: '#E8920A',
}

export default function BuildPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Page header */}
        <SectionHeading
          label="DOCUMENTED BUILD LOG"
          heading="Build Journal"
          subtitle="A chronological record of every modification, service, and decision."
        />

        {/* Journal entries */}
        <div className="flex flex-col gap-6 mb-16">
          {journalEntries.map((entry) => (
            <GlassCard key={entry.slug} className="hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs tracking-[0.2em] font-medium px-2.5 py-1 rounded border"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: categoryColors[entry.category] ?? '#E8920A',
                    borderColor: `${categoryColors[entry.category] ?? '#E8920A'}40`,
                    background: `${categoryColors[entry.category] ?? '#E8920A'}10`,
                  }}
                >
                  {entry.category}
                </span>
                <span
                  className="text-[#666666] text-xs"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {entry.date}
                </span>
              </div>

              <h3
                className="text-xl font-bold uppercase text-white mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {entry.title}
              </h3>

              <p
                className="text-[#A0A0A0] text-sm leading-relaxed mb-5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {entry.excerpt}
              </p>

              <Link
                href={`/build/${entry.slug}`}
                className="text-[#E8920A] text-sm hover:text-[#FBB940] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Read more →
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Footer note */}
        <div className="glass rounded-xl p-5">
          <p
            className="text-[#666666] text-xs leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Full journal entries are managed via GarageOS and will sync
            automatically.
          </p>
        </div>
      </div>
    </main>
  )
}
