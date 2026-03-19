'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import CarModel from './CarModel'
import ScrollCamera from './ScrollCamera'

interface SoarerSceneProps {
  scrollProgressRef: React.MutableRefObject<number>
}

export default function SoarerScene({ scrollProgressRef }: SoarerSceneProps) {
  return (
    <Canvas
      camera={{ position: [3, 1.5, 7], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
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
  )
}
