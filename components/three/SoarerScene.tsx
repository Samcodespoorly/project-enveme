'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import CarModel from './CarModel'

export default function SoarerScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#FBB940" />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#6680ff" />
      <pointLight position={[0, 4, 0]} intensity={0.6} color="#E8920A" />

      {/* Car model */}
      <CarModel />

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

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  )
}
