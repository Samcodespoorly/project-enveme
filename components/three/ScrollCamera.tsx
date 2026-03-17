'use client'

import { useFrame, useThree } from '@react-three/fiber'

interface ScrollCameraProps {
  scrollProgress: number
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

const cameraPath = [
  { progress: 0, position: [0, 2, 8] as [number, number, number] },
  { progress: 0.5, position: [4, 1.5, 4] as [number, number, number] },
  { progress: 1, position: [0, 3, 6] as [number, number, number] },
]

function getCameraPosition(progress: number): [number, number, number] {
  if (progress <= 0) return cameraPath[0].position
  if (progress >= 1) return cameraPath[cameraPath.length - 1].position

  for (let i = 0; i < cameraPath.length - 1; i++) {
    const start = cameraPath[i]
    const end = cameraPath[i + 1]
    if (progress >= start.progress && progress <= end.progress) {
      const t = (progress - start.progress) / (end.progress - start.progress)
      return [
        lerp(start.position[0], end.position[0], t),
        lerp(start.position[1], end.position[1], t),
        lerp(start.position[2], end.position[2], t),
      ]
    }
  }

  return cameraPath[0].position
}

export default function ScrollCamera({ scrollProgress }: ScrollCameraProps) {
  const { camera } = useThree()

  useFrame(() => {
    const target = getCameraPosition(scrollProgress)
    camera.position.x = lerp(camera.position.x, target[0], 0.05)
    camera.position.y = lerp(camera.position.y, target[1], 0.05)
    camera.position.z = lerp(camera.position.z, target[2], 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}
