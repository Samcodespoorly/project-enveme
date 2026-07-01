'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function CarModel() {
  const groupRef = useRef<THREE.Group>(null)

  // Draco geometry + WebP textures (EXT_texture_webp decodes natively in
  // three.js — avoids the KTX2 transcoder issues entirely). 5.9 MB vs 37 MB.
  const { scene } = useGLTF('/models/toyota_soarer_web.glb')

  // Clone the scene so React re-renders don't mutate the cached original.
  // useGLTF caches the result — if we mutate scale/position on the original,
  // subsequent renders start from the mutated state, causing drift.
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    const group = groupRef.current
    if (!clonedScene || !group) return

    // Override light/white body panels → Toyota 1A0 Bluish Silver Metallic.
    // Dark materials (tires, glass, trim) fall below the luminance threshold
    // and are left untouched.
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      const mats: THREE.Material[] = Array.isArray(child.material)
        ? child.material
        : [child.material]

      const overridden = mats.map((m) => {
        if (!(m instanceof THREE.MeshStandardMaterial)) return m
        const { r, g, b } = m.color
        const lum = 0.299 * r + 0.587 * g + 0.114 * b
        if (lum < 0.62) return m          // keep dark trim / glass / tyres
        const n = m.clone()
        n.color.set('#8FAABC')            // 1A0 hue — cool blue-silver
        n.metalness = Math.max(m.metalness, 0.82)
        n.roughness = Math.min(m.roughness, 0.22)
        return n
      })

      child.material = Array.isArray(child.material) ? overridden : overridden[0]
    })

    // Compute bounding box
    clonedScene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(clonedScene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    // Scale so the car fits ~4 world units across
    const scale = 4 / maxDim

    // Apply to the group wrapper — keeps the scene pristine
    group.scale.setScalar(scale)
    group.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
  }, [clonedScene])

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

// Preload hint — starts fetching the model as soon as this module is imported
useGLTF.preload('/models/toyota_soarer_web.glb')
