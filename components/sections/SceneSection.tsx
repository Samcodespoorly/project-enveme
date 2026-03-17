'use client'

import dynamic from 'next/dynamic'

const SoarerScene = dynamic(() => import('@/components/three/SoarerScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center">
      <p
        className="text-[#E8920A] text-xs tracking-widest"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        LOADING 3D SCENE...
      </p>
    </div>
  ),
})

export default function SceneSection() {
  return (
    <section className="relative h-screen sticky top-0 z-0">
      {/* Three.js canvas */}
      <div className="absolute inset-0">
        <SoarerScene />
      </div>

      {/* Bottom-left overlay */}
      <div className="absolute bottom-8 left-8 z-10">
        <p
          className="text-[#E8920A] text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          2JZ-GE · 2997cc · 225hp
        </p>
      </div>

      {/* Bottom-right overlay */}
      <div className="absolute bottom-8 right-8 z-10">
        <p
          className="text-[#666666] text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          DRAG TO ROTATE
        </p>
      </div>
    </section>
  )
}
