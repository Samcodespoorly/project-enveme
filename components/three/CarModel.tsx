'use client'

import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { KTX2Loader } from 'three-stdlib'
import * as THREE from 'three'

// Singleton KTX2Loader — created once per browser session
let _ktx2Loader: KTX2Loader | null = null
function getKTX2Loader(gl: THREE.WebGLRenderer): KTX2Loader {
  if (!_ktx2Loader) {
    _ktx2Loader = new KTX2Loader()
    _ktx2Loader.setTranscoderPath('/')
    _ktx2Loader.detectSupport(gl)
  }
  return _ktx2Loader
}

export default function CarModel() {
  const { gl } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  const { scene } = useGLTF(
    '/models/toyota_soarer_compressed.glb',
    undefined,
    undefined,
    (loader) => loader.setKTX2Loader(getKTX2Loader(gl))
  )

  useEffect(() => {
    if (!scene) return
    // Scale to fit ~4 units wide, then centre in world space
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 4 / maxDim

    scene.scale.setScalar(scale)
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
  }, [scene])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

