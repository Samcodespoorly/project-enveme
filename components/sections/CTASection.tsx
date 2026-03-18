'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section style={{ background: '#0A0A0A', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: '500px', height: '300px', background: 'rgba(232,146,10,0.07)', borderRadius: '50%', filter: 'blur(100px)' }} />
      </div>

      <div className="page-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.p
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#E8920A', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          PROJECT ENVEME
        </motion.p>

        <motion.h2
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, color: '#FFF', textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Explore the Full Build
        </motion.h2>

        <motion.p
          style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#AAAAAA', maxWidth: '36rem', margin: '1.5rem auto 0' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Every modification, service record, and project decision — documented in detail.
        </motion.p>

        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          <Link href="/build" style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#000',
            background: '#E8920A',
            padding: '1rem 2.5rem',
            borderRadius: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s',
          }}>
            Build Journal
          </Link>
          <Link href="/about" style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#FFF',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '1rem 2.5rem',
            borderRadius: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            About the Engineer
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
