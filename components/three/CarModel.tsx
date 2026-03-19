'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function CarModel() {
  const groupRef = useRef<THREE.Group>(null)

  // Use uncompressed model — KTX2 compressed version has transcoder issues.
  // TODO: Replace with Draco-compressed version once created
  const { scene } = useGLTF('/models/toyota_soarer_opt.glb')

  // Clone the scene so React re-renders don't mutate the cached original.
  // useGLTF caches the result — if we mutate scale/position on the original,
  // subsequent renders start from the mutated state, causing drift.
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    const group = groupRef.current
    if (!clonedScene || !group) return

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
useGLTF.preload('/models/toyota_soarer.glb')
