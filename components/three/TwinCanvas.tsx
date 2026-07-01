'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, ContactShadows, Environment } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import CarModel from './CarModel'

export type TwinHotspotDef = {
  id: string
  label: string
  position: [number, number, number]
}

type Props = {
  hotspots: TwinHotspotDef[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  reducedMotion: boolean
}

function HotspotMarker({
  hotspot,
  selected,
  dimmed,
  onSelect,
  reducedMotion,
}: {
  hotspot: TwinHotspotDef
  selected: boolean
  dimmed: boolean
  onSelect: (id: string | null) => void
  reducedMotion: boolean
}) {
  return (
    <Html position={hotspot.position} center zIndexRange={[40, 0]}>
      <button
        aria-label={`${hotspot.label} — view part details`}
        onClick={e => {
          e.stopPropagation()
          onSelect(selected ? null : hotspot.id)
        }}
        style={{
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          opacity: dimmed ? 0.35 : 1,
          transition: 'opacity 0.2s ease-out',
        }}
      >
        <span
          style={{
            position: 'absolute',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: `1px solid ${selected ? 'rgba(191,74,35,0.9)' : 'rgba(191,74,35,0.45)'}`,
            animation: reducedMotion || selected ? 'none' : 'twin-pulse 2.2s cubic-bezier(0, 0, 0.2, 1) infinite',
          }}
        />
        <span
          style={{
            width: selected ? '18px' : '12px',
            height: selected ? '18px' : '12px',
            borderRadius: '50%',
            background: selected ? '#D4624A' : '#BF4A23',
            border: '2px solid rgba(42,32,24,0.35)',
            boxShadow: selected
              ? '0 0 18px rgba(191,74,35,0.7)'
              : '0 0 10px rgba(191,74,35,0.45)',
            transition: 'all 0.2s ease-out',
          }}
        />
      </button>
    </Html>
  )
}

export default function TwinCanvas({ hotspots, selectedId, onSelect, reducedMotion }: Props) {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const [interacted, setInteracted] = useState(false)

  return (
    <Canvas
      camera={{ position: [4.2, 1.6, 4.8], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: 'pan-y' }}
      onPointerMissed={() => onSelect(null)}
    >
      <ambientLight color="#fff3da" intensity={0.85} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#ffe7b0" />
      <directionalLight position={[-6, 3, -4]} intensity={0.6} color="#bcae90" />
      <directionalLight position={[-3, 6, -6]} intensity={1.1} color="#ffffff" />

      <Environment preset="warehouse" background={false} />

      <Suspense fallback={null}>
        <CarModel />
        <ContactShadows position={[0, -0.62, 0]} opacity={0.55} scale={9} blur={2.4} far={2.2} resolution={512} frames={1} />
      </Suspense>

      {hotspots.map(h => (
        <HotspotMarker
          key={h.id}
          hotspot={h}
          selected={selectedId === h.id}
          dimmed={selectedId !== null && selectedId !== h.id}
          onSelect={onSelect}
          reducedMotion={reducedMotion}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3.2}
        maxDistance={8}
        minPolarAngle={0.6}
        maxPolarAngle={1.45}
        autoRotate={!reducedMotion && !interacted && selectedId === null}
        autoRotateSpeed={0.55}
        onStart={() => setInteracted(true)}
      />
    </Canvas>
  )
}
