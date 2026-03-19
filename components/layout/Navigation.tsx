'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Build', href: '/build' },
  { label: 'Specs', href: '/specs' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // On sub-pages: always show the glass bar.
  // On home: transparent until scrolled.
  const showBackground = !isHome || scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showBackground
          ? 'bg-black/85 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — always links home */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Show a back chevron on sub-pages so it's clearly a home link */}
          {!isHome && (
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="text-[#E8920A] opacity-70 group-hover:opacity-100 transition-opacity -mr-0.5"
            >
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span
            className="text-white font-bold text-xl tracking-wider uppercase group-hover:text-[#E8920A] transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ENVEME
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8920A] group-hover:scale-125 transition-transform" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-underline-link text-sm transition-colors pb-0.5 ${
                    isActive ? 'text-white is-active' : 'text-[#A0A0A0] hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 px-6 py-5">
          <ul className="flex flex-col gap-5">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#E8920A] flex items-center gap-2"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                ← Home
              </Link>
            </li>
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm transition-colors ${
                      isActive ? 'text-[#E8920A]' : 'text-[#A0A0A0] hover:text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
