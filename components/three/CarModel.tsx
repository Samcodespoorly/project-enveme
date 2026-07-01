'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Toyota 1A0 Bluish Silver Metallic
const PAINT_COLOR = '#6B9AB5'

export default function CarModel() {
  const groupRef = useRef<THREE.Group>(null)

  const { scene, materials } = useGLTF('/models/toyota_soarer_web.glb')

  // Surgically recolour only the two body paint materials by name.
  // All other materials (glass, interior, trim, tyres) are untouched.
  useMemo(() => {
    ;['Paint1Mtl', 'Paint2Mtl'].forEach(name => {
      const m = materials[name] as THREE.MeshStandardMaterial | undefined
      if (!m) return
      m.color.set(PAINT_COLOR)
      // Paint1Mtl ships with metalness=0 — nudge it up for metallic sheen
      if (name === 'Paint1Mtl') m.metalness = 0.25
      m.needsUpdate = true
    })
  }, [materials])

  // Clone the scene so React re-renders don't mutate the cached original.
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    const group = groupRef.current
    if (!clonedScene || !group) return

    clonedScene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(clonedScene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    const scale = 4 / maxDim

    group.scale.setScalar(scale)
    group.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
  }, [clonedScene])

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

useGLTF.preload('/models/toyota_soarer_web.glb')
