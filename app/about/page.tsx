import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'

const skills = [
  {
    title: 'Mechanical Engineering',
    description: 'Thermodynamics, dynamics, materials science, and machine design. Applied to real-world automotive systems.',
  },
  {
    title: 'Electrical Systems',
    description: 'Vehicle wiring, CAN bus diagnostics, sensor integration, and embedded microcontroller projects.',
  },
  {
    title: 'Software Development',
    description: 'Full-stack web development with Next.js, TypeScript, Firebase. This site is a live demonstration.',
  },
  {
    title: 'Project Management',
    description: 'Budgeting, scheduling, and documentation of a long-running engineering project from acquisition through build.',
  },
  {
    title: 'Financial Analysis',
    description: 'Total cost of ownership modelling, build cost tracking, and depreciation analysis for the JZZ31 platform.',
  },
  {
    title: 'AI-Assisted Development',
    description: 'Leveraging AI tools for code generation, research, and documentation acceleration throughout the project.',
  },
]

const capabilities = [
  'End-to-end engineering project ownership — from concept to execution',
  'Integration of mechanical, electrical, and software systems',
  'Quantitative analysis of project cost and value',
  'Technical documentation and portfolio communication',
  'Iterative problem solving under real constraints',
  'Full-stack web application development with modern tooling',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-28">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        <SectionHeading
          label="SAMUEL DONOVAN · ENGINEER"
          heading="About the Engineer"
        />

        {/* Intro */}
        <div className="mb-16 max-w-2xl">
          <p className="text-[#BBBBBB] text-base md:text-lg leading-relaxed mb-5" style={{ fontFamily: 'var(--font-body)' }}>
            I&apos;m Samuel Donovan — a conjoint Mechatronics Engineering and Finance/Economics student in New Zealand. Project ENVEME is my platform to demonstrate full-stack engineering capability: from the mechanical knowledge to maintain and modify a 1995 Toyota Soarer, to the software skills to build this portfolio, to the financial analysis that underpins every build decision.
          </p>
          <p className="text-[#BBBBBB] text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            The JZZ31 Soarer is the perfect project platform — a naturally aspirated inline-6, a sophisticated chassis, and a growing community. Every stage of the build is documented here as a living portfolio of applied engineering.
          </p>
        </div>

        {/* Education */}
        <div className="mb-14">
          <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-7 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Education
          </h3>
          <div className="rounded-2xl bg-white/[0.04] border-l-2 border-l-[#E8920A] border-y border-r border-white/[0.08] p-9 md:p-11">
            <p className="text-[#E8920A] text-[11px] tracking-[0.25em] uppercase mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
              CONJOINT DEGREE · IN PROGRESS
            </p>
            <h4 className="text-white text-xl md:text-2xl font-bold uppercase tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              BE(Hons) Mechatronics · BCom Finance/Economics
            </h4>
            <p className="text-[#BBBBBB] text-sm md:text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              A conjoint degree combining honours-level engineering with commerce. Covering control systems, embedded software, financial modelling, and economic analysis.
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div className="mb-14">
          <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-7 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Skill Areas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-8"
              >
                <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  {skill.title}
                </h4>
                <p className="text-[#AAAAAA] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-7 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            This Project Demonstrates
          </h3>
          <GlassCard>
            <ul className="flex flex-col gap-5">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-4">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8920A] flex-shrink-0" />
                  <span className="text-[#BBBBBB] text-sm md:text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    {cap}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

      </div>
    </main>
  )
}
