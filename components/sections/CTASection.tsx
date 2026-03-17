'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative py-32 px-6 bg-[#111111] overflow-hidden">
      {/* Radial amber glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[300px] bg-[#E8920A]/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p
          className="text-[#E8920A] text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          PROJECT ENVEME
        </motion.p>

        <motion.h2
          className="text-5xl md:text-7xl font-bold uppercase text-white leading-tight tracking-wide"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore the Full Build
        </motion.h2>

        <motion.p
          className="mt-5 text-[#A0A0A0] text-base max-w-lg mx-auto"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Every modification, service record, and project decision — documented
          in detail.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/build"
              className="inline-block px-8 py-3.5 bg-[#E8920A] hover:bg-[#FBB940] text-black font-semibold text-sm tracking-wide uppercase rounded transition-colors duration-200"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Build Journal
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/about"
              className="inline-block px-8 py-3.5 border border-white/20 hover:border-white/40 text-white text-sm tracking-wide uppercase rounded transition-colors duration-200"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              About the Engineer
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
