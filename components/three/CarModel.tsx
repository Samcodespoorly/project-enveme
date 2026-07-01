'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function makePaint() {
  return new THREE.MeshPhysicalMaterial({
    color: '#2E5F7A',        // dark base — IBL lifts it to the 1A0 silver-blue
    metalness: 0.85,         // high metalness → directional lights make specular highlights
    roughness: 0.18,         // smooth for crisp reflections
    clearcoat: 0.9,
    clearcoatRoughness: 0.06,
    envMapIntensity: 0.5,    // dampen IBL so it doesn't wash out the base colour
  })
}

function luminance(mat: THREE.Material): number {
  const c = (mat as { color?: THREE.Color }).color
  return c ? 0.299 * c.r + 0.587 * c.g + 0.114 * c.b : -1
}

export default function CarModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/toyota_soarer_web.glb')

  // Mutate the CACHED scene before cloning. useEffect fires after the first
  // render so any override there arrives one frame too late. useMemo runs
  // synchronously — the clone below inherits paint on frame 1.
  useMemo(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      const next = mats.map((m) => luminance(m) >= 0.42 ? makePaint() : m)
      child.material = Array.isArray(child.material) ? next : next[0]
    })
  }, [scene])

  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    const group = groupRef.current
    if (!clonedScene || !group) return

    clonedScene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(clonedScene)
    const center = box.getCenter(new THREE.Vector3())
    const size   = box.getSize(new THREE.Vector3())
    const scale  = 4 / Math.max(size.x, size.y, size.z)

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
