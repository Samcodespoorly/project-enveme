import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'

const skills = [
  {
    icon: '⚙️',
    title: 'Mechanical Engineering',
    description:
      'Thermodynamics, dynamics, materials science, and machine design. Applied to real-world automotive systems.',
  },
  {
    icon: '⚡',
    title: 'Electrical Systems',
    description:
      'Vehicle wiring, CAN bus diagnostics, sensor integration, and embedded microcontroller projects.',
  },
  {
    icon: '💻',
    title: 'Software Development',
    description:
      'Full-stack web development with Next.js, TypeScript, Firebase. This site is a live demonstration.',
  },
  {
    icon: '📋',
    title: 'Project Management',
    description:
      'Budgeting, scheduling, and documentation of a long-running engineering project from acquisition through build.',
  },
  {
    icon: '📈',
    title: 'Financial Analysis',
    description:
      'Total cost of ownership modelling, build cost tracking, and depreciation analysis for the JZZ31 platform.',
  },
  {
    icon: '🤖',
    title: 'AI-Assisted Development',
    description:
      'Leveraging AI tools for code generation, research, and documentation acceleration throughout the project.',
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
      <div className="max-w-5xl mx-auto px-8">

        <SectionHeading
          label="SAMUEL DONOVAN · ENGINEER"
          heading="About the Engineer"
        />

        {/* Intro */}
        <div className="mb-16 max-w-2xl">
          <p
            className="text-[#BBBBBB] text-base leading-relaxed mb-5"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            I&apos;m Samuel Donovan — a conjoint Mechatronics Engineering and
            Finance/Economics student in New Zealand. Project ENVEME is my
            platform to demonstrate full-stack engineering capability: from the
            mechanical knowledge to maintain and modify a 1995 Toyota Soarer, to
            the software skills to build this portfolio, to the financial
            analysis that underpins every build decision.
          </p>
          <p
            className="text-[#BBBBBB] text-base leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            The JZZ31 Soarer is the perfect project platform — a naturally
            aspirated inline-6, a sophisticated chassis, and a growing community.
            Every stage of the build is documented here as a living portfolio of
            applied engineering.
          </p>
        </div>

        {/* Skills grid */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold uppercase text-white mb-8 tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Skill Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {skills.map((skill) => (
              <GlassCard key={skill.title}>
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5 flex-shrink-0">{skill.icon}</span>
                  <div>
                    <h4
                      className="text-white font-semibold mb-2 text-sm uppercase tracking-wide"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {skill.title}
                    </h4>
                    <p
                      className="text-[#999999] text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {skill.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* This project demonstrates */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold uppercase text-white mb-8 tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            This project demonstrates
          </h3>
          <GlassCard>
            <ul className="flex flex-col gap-4">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-4">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8920A] flex-shrink-0" />
                  <span
                    className="text-[#BBBBBB] text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {cap}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Education card */}
        <div>
          <h3
            className="text-2xl font-bold uppercase text-white mb-8 tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Education
          </h3>
          <GlassCard className="border-l-2 border-l-[#E8920A]">
            <div className="flex flex-col gap-3">
              <p
                className="text-[#E8920A] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                CONJOINT DEGREE · IN PROGRESS
              </p>
              <h4
                className="text-white text-xl font-bold uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                BE(Hons) Mechatronics · BCom Finance/Economics
              </h4>
              <p
                className="text-[#BBBBBB] text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                A conjoint degree combining honours-level engineering with
                commerce. Covering control systems, embedded software, financial
                modelling, and economic analysis.
              </p>
            </div>
          </GlassCard>
        </div>

      </div>
    </main>
  )
}
