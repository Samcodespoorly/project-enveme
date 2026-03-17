'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import CarModel from './CarModel'

export default function SoarerScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#FBB940"
        castShadow
      />
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.4}
        color="#4466ff"
      />

      {/* Environment */}
      <Environment preset="night" />

      {/* Car model */}
      <CarModel />

      {/* Floor grid */}
      <Grid
        infiniteGrid
        cellSize={0.5}
        sectionSize={2}
        cellColor="#374151"
        sectionColor="#4b5563"
        fadeDistance={20}
        position={[0, -0.7, 0]}
      />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        autoRotate={false}
        autoRotateSpeed={0.5}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.8} />
      </EffectComposer>
    </Canvas>
  )
}
