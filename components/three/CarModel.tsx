'use client'

// TODO: Replace with Soarer GLB model — useGLTF('/models/soarer.glb')

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CarModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  const wheelPositions: [number, number, number][] = [
    [1.5, -0.35, 0.8],
    [-1.5, -0.35, 0.8],
    [1.5, -0.35, -0.8],
    [-1.5, -0.35, -0.8],
  ]

  return (
    <group ref={groupRef}>
      {/* Car body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.8, 0.6, 1.6]} />
        <meshStandardMaterial color="#E8920A" wireframe />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.8, 0.6, 1.4]} />
        <meshStandardMaterial color="#FBB940" wireframe />
      </mesh>

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#ffffff" wireframe />
        </mesh>
      ))}
    </group>
  )
}
