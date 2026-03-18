import SectionHeading from '@/components/ui/SectionHeading'
import Link from 'next/link'

const journalEntries = [
  {
    date: 'May 2025',
    category: 'SUSPENSION',
    color: { text: '#60A5FA', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
    title: 'Tein Coilover Installation & Alignment',
    excerpt: 'After sourcing a set of Tein Street Basis coilovers, I undertook the full front and rear suspension replacement over a weekend. The process involved removing the OEM shock absorbers, compressing the new coilover springs, and setting the initial ride height at 30mm below standard before a four-wheel alignment.',
    slug: 'tein-coilover-install',
  },
  {
    date: 'Apr 2025',
    category: 'MAINTENANCE',
    color: { text: '#34D399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
    title: 'Full Fluid Service & Baseline Inspection',
    excerpt: 'With the JZZ31 freshly acquired, the first priority was a comprehensive fluid service and mechanical baseline. Engine oil, coolant, transmission fluid, differential oil, and brake fluid were all replaced. Worn front lower control arm bushings were identified and replaced ahead of the upcoming suspension work.',
    slug: 'baseline-fluid-service',
  },
  {
    date: 'Mar 2025',
    category: 'ACQUISITION',
    color: { text: '#E8920A', bg: 'rgba(232,146,10,0.1)', border: 'rgba(232,146,10,0.2)' },
    title: 'Purchasing the JZZ31 — Why This Car?',
    excerpt: 'After months of searching Trade Me and local classifieds, I found the right example in Auckland — a 1995 Pearl White JZZ31 with 102,000 km and a folder of service history. The 2JZ-GE is a bulletproof platform, the chassis is sophisticated, and the Soarer is genuinely undervalued in the NZ market.',
    slug: 'acquisition-story',
  },
]

export default function BuildPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-28">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        <SectionHeading
          label="DOCUMENTED BUILD LOG"
          heading="Build Journal"
          subtitle="A chronological record of every modification, service, and decision."
        />

        <div className="flex flex-col gap-6">
          {journalEntries.map((entry) => (
            <div
              key={entry.slug}
              className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-9 md:p-11 hover:border-white/[0.14] transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className="text-[10px] font-semibold tracking-[0.2em] px-3 py-1.5 rounded-lg"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: entry.color.text,
                    background: entry.color.bg,
                    border: `1px solid ${entry.color.border}`,
                  }}
                >
                  {entry.category}
                </span>
                <span className="text-[#666] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                  {entry.date}
                </span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-bold uppercase text-white mb-5 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {entry.title}
              </h3>

              <p
                className="text-[#AAAAAA] text-sm md:text-base leading-relaxed mb-7"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {entry.excerpt}
              </p>

              <Link
                href={`/build/${entry.slug}`}
                className="text-[#E8920A] text-sm hover:text-[#FBB940] transition-colors font-medium tracking-wide"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 text-center">
          <p className="text-[#666] text-xs leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
            Full journal entries are managed via GarageOS and will sync automatically.
          </p>
        </div>

      </div>
    </main>
  )
}
