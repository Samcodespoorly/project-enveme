'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ScrollCameraProps {
  scrollProgressRef: React.MutableRefObject<number>
}

const PATH = [
  { p: 0.00, pos: [4.4, 1.05, 6.6]  as const, tgt: [-1.5, 0.25, 0] as const },
  { p: 0.20, pos: [5.7, 0.95, 2.3]  as const, tgt: [0.2,  0.35, 0] as const },
  { p: 0.40, pos: [0.6, 0.7,  -6.4] as const, tgt: [0,    0.45, 0] as const },
  { p: 0.60, pos: [-5.4, 1.5, -2.6] as const, tgt: [0,    0.4,  0] as const },
  { p: 0.80, pos: [-3.4, 3.7,  5.4] as const, tgt: [0,    0.2,  0] as const },
  { p: 1.00, pos: [0,    5.3,  7.6] as const, tgt: [0,    0.05, 0] as const },
]

function smooth(t: number) { return t * t * (3 - 2 * t) }

function samplePath(prog: number, outPos: THREE.Vector3, outTgt: THREE.Vector3) {
  const cp = Math.max(0, Math.min(1, prog))
  let a = PATH[0], b = PATH[PATH.length - 1]
  for (let i = 0; i < PATH.length - 1; i++) {
    if (cp >= PATH[i].p && cp <= PATH[i + 1].p) { a = PATH[i]; b = PATH[i + 1]; break }
  }
  const span = (b.p - a.p) || 1
  const t = smooth((cp - a.p) / span)
  outPos.set(
    a.pos[0] + (b.pos[0] - a.pos[0]) * t,
    a.pos[1] + (b.pos[1] - a.pos[1]) * t,
    a.pos[2] + (b.pos[2] - a.pos[2]) * t,
  )
  outTgt.set(
    a.tgt[0] + (b.tgt[0] - a.tgt[0]) * t,
    a.tgt[1] + (b.tgt[1] - a.tgt[1]) * t,
    a.tgt[2] + (b.tgt[2] - a.tgt[2]) * t,
  )
}

export default function ScrollCamera({ scrollProgressRef }: ScrollCameraProps) {
  const camPos = useRef(new THREE.Vector3(4.4, 1.05, 6.6))
  const camTgt = useRef(new THREE.Vector3(-1.5, 0.25, 0))
  const desiredPos = useRef(new THREE.Vector3())
  const desiredTgt = useRef(new THREE.Vector3())

  useFrame(({ camera, clock }) => {
    samplePath(scrollProgressRef.current, desiredPos.current, desiredTgt.current)
    desiredPos.current.y += Math.sin(clock.getElapsedTime() * 0.5) * 0.04
    const damp = 0.075
    camPos.current.lerp(desiredPos.current, damp)
    camTgt.current.lerp(desiredTgt.current, damp)
    camera.position.copy(camPos.current)
    camera.lookAt(camTgt.current)
  })

  return null
}
