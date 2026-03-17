import Link from 'next/link'

const navLinks = [
  { label: 'Build', href: '/build' },
  { label: 'Specs', href: '/specs' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
]

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span
                className="text-white font-bold text-xl tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ENVEME
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8920A]" />
            </div>
            <p
              className="text-[#666666] text-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              1995 Toyota Soarer JZZ31
            </p>
          </div>

          {/* Center nav */}
          <nav className="flex flex-col gap-3 md:items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#A0A0A0] hover:text-white transition-colors text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex flex-col gap-2 md:items-end">
            <p
              className="text-[#A0A0A0] text-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Built by Samuel Donovan
            </p>
            <p
              className="text-[#666666] text-xs"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Mechatronics &amp; Finance/Economics
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[#666666] text-xs"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            &copy; {new Date().getFullYear()} ENVEME. All rights reserved.
          </p>
          <p
            className="text-[#666666] text-xs"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Built with Next.js, Three.js, GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
