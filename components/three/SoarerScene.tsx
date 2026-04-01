'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Grid, useProgress } from '@react-three/drei'
import CarModel from './CarModel'
import ScrollCamera from './ScrollCamera'

interface SoarerSceneProps {
  scrollProgressRef: React.MutableRefObject<number>
}

// Overlay rendered outside the Canvas (in DOM) showing GLB load progress.
function LoadingOverlay() {
  const { progress, active } = useProgress()
  if (!active) return null

  const pct = Math.round(progress)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        pointerEvents: 'none',
        zIndex: 5,
        background: 'var(--color-bg-primary)',
      }}
    >
      {/* Amber pulsing rings */}
      <div style={{ position: 'relative', width: '48px', height: '48px' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px solid rgba(232,146,10,0.15)',
          animation: 'scene-ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '50%',
          border: '1px solid rgba(232,146,10,0.4)',
          animation: 'scene-ping 1.8s cubic-bezier(0,0,0.2,1) 0.4s infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '20px',
          borderRadius: '50%',
          background: '#E8920A',
          opacity: 0.7,
        }} />
      </div>

      {/* Progress bar */}
      <div style={{ width: '120px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: '#E8920A',
            borderRadius: '9999px',
            transition: 'width 0.2s ease',
          }}
        />
      </div>

      {/* Percentage label */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: '#E8920A',
          fontSize: '0.625rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          LOADING MODEL · {pct}%
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: '#444',
          fontSize: '0.5625rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          JZZ31 · 3D MODEL
        </p>
      </div>

      <style>{`
        @keyframes scene-ping {
          0%   { transform: scale(1); opacity: 0.8; }
          80%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function SoarerScene({ scrollProgressRef }: SoarerSceneProps) {
  const [canvasVisible, setCanvasVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Brief delay so WebGL context initialises before we fade in the canvas,
    // preventing a visible flash of an uninitialised black rectangle.
    timerRef.current = setTimeout(() => setCanvasVisible(true), 80)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        // Atmospheric dark base with ambient amber glow so the area isn't
        // a blank black void while the canvas and model load.
        background:
          'radial-gradient(ellipse 80% 60% at 55% 55%, rgba(232,146,10,0.07) 0%, #0A0A0A 70%), #0A0A0A',
      }}
    >
      {/* Subtle off-centre amber glows for depth — visible pre-canvas */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 30% 70%, rgba(232,146,10,0.04) 0%, transparent 50%),' +
            'radial-gradient(circle at 70% 30%, rgba(251,185,64,0.03) 0%, transparent 45%)',
          zIndex: 1,
        }}
      />

      {/* DOM-layer progress overlay — reads useProgress outside the Canvas */}
      <LoadingOverlay />

      <Canvas
        camera={{ position: [3, 1.5, 7], fov: 45 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          opacity: canvasVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#FBB940" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#6680ff" />
        <pointLight position={[0, 4, 0]} intensity={0.6} color="#E8920A" />

        {/* Car model — wrapped in Suspense so the canvas doesn't crash
            if the 49MB GLB takes time to load */}
        <Suspense fallback={null}>
          <CarModel />
        </Suspense>

        {/* Floor grid */}
        <Grid
          infiniteGrid
          cellSize={0.5}
          sectionSize={2}
          cellColor="#2a2a2a"
          sectionColor="#3a3a3a"
          fadeDistance={18}
          position={[0, -0.7, 0]}
        />

        {/* Scroll-driven camera — no OrbitControls, scroll position drives the camera */}
        <ScrollCamera scrollProgressRef={scrollProgressRef} />
      </Canvas>
    </div>
  )
}

