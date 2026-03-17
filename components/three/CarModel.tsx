'use client'

import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function CarModel() {
  const { scene } = useGLTF('/models/toyota_soarer.glb')
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!scene) return
    // Auto-centre and auto-scale the model to fit ~4 units wide in the scene
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 4 / maxDim

    scene.position.sub(center.multiplyScalar(scale))
    scene.scale.setScalar(scale)
  }, [scene])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/toyota_soarer.glb')
