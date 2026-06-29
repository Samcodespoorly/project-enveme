'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import CarModel from './CarModel'
import ScrollCamera from './ScrollCamera'
import { useSkin } from '@/contexts/SkinContext'

interface SoarerSceneProps {
  scrollProgressRef: React.MutableRefObject<number>
}

function LoadingOverlay() {
  const { progress, active } = useProgress()
  if (!active) return null

  const pct = Math.round(progress)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        pointerEvents: 'none',
        zIndex: 5,
        background: 'var(--color-bg-primary)',
      }}
    >
      <div style={{ position: 'relative', width: '48px', height: '48px' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px solid rgba(232,146,10,0.15)',
          animation: 'scene-ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '50%',
          border: '1px solid rgba(232,146,10,0.4)',
          animation: 'scene-ping 1.8s cubic-bezier(0,0,0.2,1) 0.4s infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '20px',
          borderRadius: '50%',
          background: '#E8920A',
          opacity: 0.7,
        }} />
      </div>

      <div style={{ width: '120px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: '#E8920A',
            borderRadius: '9999px',
            transition: 'width 0.2s ease',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: '#E8920A',
          fontSize: '0.625rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          LOADING MODEL · {pct}%
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: '#444',
          fontSize: '0.5625rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          JZZ31 · 3D MODEL
        </p>
      </div>
    </div>
  )
}

function SkinLights() {
  const { skin } = useSkin()
  const s = skin.scene
  return (
    <>
      <ambientLight color={s.ambient.color} intensity={s.ambient.intensity} />
      <directionalLight color={s.key.color} intensity={s.key.intensity} position={s.key.pos} />
      <directionalLight color={s.fill.color} intensity={s.fill.intensity} position={s.fill.pos} />
      <directionalLight color={s.rim.color} intensity={s.rim.intensity} position={s.rim.pos} />
    </>
  )
}

function SkinFloor() {
  const { skin } = useSkin()
  const f = skin.scene.floor
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.66, 0]}>
      <circleGeometry args={[40, 64]} />
      <meshStandardMaterial
        color={f.color}
        metalness={f.metalness}
        roughness={f.roughness}
        transparent
        opacity={f.opacity}
      />
    </mesh>
  )
}

function SkinSceneEffects() {
  const { skin } = useSkin()
  const { gl, scene } = useThree()
  useEffect(() => {
    gl.toneMappingExposure = skin.scene.exposure
    scene.fog = new THREE.Fog(skin.scene.fog.color, skin.scene.fog.near, skin.scene.fog.far)
  }, [skin, gl, scene])
  return null
}

function SkinEnvironment() {
  const { skin } = useSkin()
  return <Environment preset="studio" environmentIntensity={skin.scene.envIntensity} />
}

export default function SoarerScene({ scrollProgressRef }: SoarerSceneProps) {
  const [canvasVisible, setCanvasVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { skin } = useSkin()

  useEffect(() => {
    timerRef.current = setTimeout(() => setCanvasVisible(true), 80)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: `linear-gradient(to bottom, ${skin.scene.background[0]}, ${skin.scene.background[1]})`,
      }}
    >
      <LoadingOverlay />

      <Canvas
        camera={{ position: [4.4, 1.05, 6.6], fov: 42 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          opacity: canvasVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <SkinLights />
        <SkinSceneEffects />
        <SkinEnvironment />

        <Suspense fallback={null}>
          <CarModel />
        </Suspense>

        <SkinFloor />
        <ScrollCamera scrollProgressRef={scrollProgressRef} />
      </Canvas>
    </div>
  )
}
