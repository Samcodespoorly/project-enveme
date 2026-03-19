'use client'

import { useFrame, useThree } from '@react-three/fiber'

interface ScrollCameraProps {
  scrollProgressRef: React.MutableRefObject<number>
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// Camera orbits around the car across these 4 keyframes
const cameraPath = [
  { progress: 0,    position: [3, 1.5, 7]  as [number, number, number] },
  { progress: 0.33, position: [5, 1.2, 3]  as [number, number, number] },
  { progress: 0.66, position: [0, 2.5, 6]  as [number, number, number] },
  { progress: 1,    position: [-3, 3, 5]   as [number, number, number] },
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

export default function ScrollCamera({ scrollProgressRef }: ScrollCameraProps) {
  const { camera } = useThree()

  useFrame(() => {
    const progress = scrollProgressRef.current
    const target = getCameraPosition(progress)

    // Lerp camera position along the path
    camera.position.x = lerp(camera.position.x, target[0], 0.12)
    camera.position.y = lerp(camera.position.y, target[1], 0.12)
    camera.position.z = lerp(camera.position.z, target[2], 0.12)

    // ── Hero lookAt offset ───────────────────────────────────────────────
    // During the hero state (first ~18% of scroll), look slightly LEFT of the
    // car so the car occupies the right portion of the viewport — leaving
    // room for the text overlay on the left. Smoothly transitions to center
    // (lookAt origin) once the hero text fades out.
    //
    // Why this works: the camera always looks toward its target. If the
    // target is shifted left of the car (origin), the car appears to the
    // RIGHT in the rendered frame, without moving the geometry at all.
    const heroT = Math.min(progress / 0.18, 1) // 0 → 1 over first 18% of scroll
    const lookAtX = lerp(-1.6, 0, heroT)
    const lookAtY = lerp(0.15, 0, heroT)

    camera.lookAt(lookAtX, lookAtY, 0)
  })

  return null
}
