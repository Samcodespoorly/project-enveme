import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import Link from 'next/link'

const journalEntries = [
  {
    date: 'May 2025',
    category: 'SUSPENSION',
    categoryColor: { text: '#60A5FA', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)' },
    title: 'Tein Coilover Installation & Alignment',
    excerpt:
      'After sourcing a set of Tein Street Basis coilovers, I undertook the full front and rear suspension replacement over a weekend. The process involved removing the OEM shock absorbers, compressing the new coilover springs, and setting the initial ride height at 30mm below standard before a four-wheel alignment.',
    slug: 'tein-coilover-install',
  },
  {
    date: 'Apr 2025',
    category: 'MAINTENANCE',
    categoryColor: { text: '#34D399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)' },
    title: 'Full Fluid Service & Baseline Inspection',
    excerpt:
      'With the JZZ31 freshly acquired, the first priority was a comprehensive fluid service and mechanical baseline. Engine oil, coolant, transmission fluid, differential oil, and brake fluid were all replaced. Worn front lower control arm bushings were identified and replaced ahead of the upcoming suspension work.',
    slug: 'baseline-fluid-service',
  },
  {
    date: 'Mar 2025',
    category: 'ACQUISITION',
    categoryColor: { text: '#E8920A', bg: 'rgba(232,146,10,0.1)', border: 'rgba(232,146,10,0.25)' },
    title: 'Purchasing the JZZ31 — Why This Car?',
    excerpt:
      'After months of searching Trade Me and local classifieds, I found the right example in Auckland — a 1995 Pearl White JZZ31 with 102,000 km and a folder of service history. The 2JZ-GE is a bulletproof platform, the chassis is sophisticated, and the Soarer is genuinely undervalued in the NZ market.',
    slug: 'acquisition-story',
  },
]

export default function BuildPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-28">
      <div className="max-w-3xl mx-auto px-8">

        <SectionHeading
          label="DOCUMENTED BUILD LOG"
          heading="Build Journal"
          subtitle="A chronological record of every modification, service, and decision."
        />

        {/* Journal entries */}
        <div className="flex flex-col gap-6 mb-16">
          {journalEntries.map((entry) => (
            <GlassCard key={entry.slug} className="hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-xs tracking-[0.2em] font-semibold px-3 py-1.5 rounded-md"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: entry.categoryColor.text,
                    borderColor: entry.categoryColor.border,
                    background: entry.categoryColor.bg,
                    border: `1px solid ${entry.categoryColor.border}`,
                  }}
                >
                  {entry.category}
                </span>
                <span
                  className="text-[#888888] text-xs"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {entry.date}
                </span>
              </div>

              <h3
                className="text-2xl font-bold uppercase text-white mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {entry.title}
              </h3>

              <p
                className="text-[#BBBBBB] text-sm leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {entry.excerpt}
              </p>

              <Link
                href={`/build/${entry.slug}`}
                className="text-[#E8920A] text-sm hover:text-[#FBB940] transition-colors font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Read more →
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Footer note */}
        <div
          className="rounded-xl p-6 text-center"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            className="text-[#888888] text-xs leading-relaxed"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Full journal entries are managed via GarageOS and will sync automatically.
          </p>
        </div>

      </div>
    </main>
  )
}
