'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Build', href: '/build' },
  { label: 'Parts', href: '/parts' },
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

  const showBackground = !isHome || scrolled

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={showBackground ? {
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--blur))',
        WebkitBackdropFilter: 'blur(var(--blur))',
        borderBottom: '1px solid var(--glass-bd)',
      } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 group">
          {!isHome && (
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="opacity-70 group-hover:opacity-100 transition-opacity -mr-0.5"
              style={{ color: 'var(--accent)' }}
            >
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span
            className="font-bold text-xl tracking-wider uppercase transition-colors"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            ENVEME
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full group-hover:scale-125 transition-transform"
            style={{ background: 'var(--accent)' }}
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-underline-link text-sm transition-colors pb-0.5${isActive ? ' is-active' : ''}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-px transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--ink)' }} />
          <span className={`block w-6 h-px transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: 'var(--ink)' }} />
          <span className={`block w-6 h-px transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--ink)' }} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="md:hidden backdrop-blur-md px-6 py-5"
            style={{ background: 'var(--glass-bg)', borderBottom: '1px solid var(--glass-bd)' }}
          >
            <ul className="flex flex-col gap-5">
              <li>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--accent)' }}
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
                      className="text-sm transition-colors"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: isActive ? 'var(--accent)' : 'var(--ink-soft)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
