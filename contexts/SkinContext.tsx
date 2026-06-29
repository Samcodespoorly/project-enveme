'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { SKINS, SKIN_ORDER, type Skin, type SkinKey } from '@/lib/skins'

interface SkinContextValue {
  skin: Skin
  skinKey: SkinKey
  setSkin: (key: SkinKey) => void
}

const SkinContext = createContext<SkinContextValue | null>(null)

function applySkinToDOM(skin: Skin) {
  const root = document.documentElement
  for (const [k, v] of Object.entries(skin.css)) root.style.setProperty(k, v)
  root.style.setProperty('--font-display', skin.fontDisplay)
  root.style.setProperty('--font-body', skin.fontBody)
  root.style.setProperty('--font-mono', skin.fontMono)
}

export function SkinProvider({ children }: { children: ReactNode }) {
  const [skinKey, setSkinKey] = useState<SkinKey>('heritage')

  useEffect(() => {
    applySkinToDOM(SKINS[skinKey])
  }, [skinKey])

  const setSkin = (key: SkinKey) => setSkinKey(key)

  return (
    <SkinContext.Provider value={{ skin: SKINS[skinKey], skinKey, setSkin }}>
      {children}
    </SkinContext.Provider>
  )
}

export function useSkin() {
  const ctx = useContext(SkinContext)
  if (!ctx) throw new Error('useSkin must be used inside SkinProvider')
  return ctx
}

export { applySkinToDOM }
export { SKIN_ORDER }
