'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative py-28 md:py-36 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[300px] bg-[#E8920A]/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <motion.p
          className="text-[#E8920A] text-[11px] tracking-[0.3em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          PROJECT ENVEME
        </motion.p>

        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-white leading-tight tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Explore the Full Build
        </motion.h2>

        <motion.p
          className="mt-6 text-[#AAAAAA] text-base md:text-lg max-w-lg mx-auto"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Every modification, service record, and project decision — documented in detail.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          <Link
            href="/build"
            className="px-10 py-4 bg-[#E8920A] hover:bg-[#FBB940] text-black font-semibold text-sm tracking-widest uppercase rounded-xl transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Build Journal
          </Link>
          <Link
            href="/about"
            className="px-10 py-4 bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/45 text-white text-sm tracking-widest uppercase rounded-xl transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            About the Engineer
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
