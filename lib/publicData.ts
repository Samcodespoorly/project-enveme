// lib/publicData.ts
// Server-side helpers to fetch the publicly readable Firestore documents
// that GarageOS syncs via syncPublic.ts.
// Call these from server components — no 'use client' needed.

import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

// ── Types (mirror what syncPublic.ts writes) ──────────────────────────────

export interface PublicVehicle {
  make: string
  model: string
  year: number
  colour: string
  registrationPlate: string
  odometer: number
  buildStatus: string
  updatedAt: string
}

export interface PublicMod {
  id: string
  name: string
  brand: string | null
  category: string           // 'suspension' | 'engine' | 'interior' | 'exterior' | 'electrical' | 'drivetrain' | 'other'
  description: string | null
  cost: number | null
  installDate: string | null // ISO date string 'YYYY-MM-DD'
  status: 'installed'
}

export interface PublicTimeline {
  id: string
  title: string
  description: string | null
  category: string
  status: 'planning' | 'in_progress' | 'on_hold' | 'complete'
  startDate: string | null    // 'YYYY-MM-DD'
  completedDate: string | null
  totalCost: number | null
  tags: string[]
}

// ── Fallback data (shown if Firestore is unreachable) ─────────────────────

const FALLBACK_VEHICLE: PublicVehicle = {
  make: 'Toyota',
  model: 'Soarer',
  year: 1995,
  colour: 'Pearl White',
  registrationPlate: 'ENVEME',
  odometer: 0,
  buildStatus: 'Street registered · Active build',
  updatedAt: '',
}

// ── Fetch functions ───────────────────────────────────────────────────────

export async function fetchPublicVehicle(): Promise<PublicVehicle> {
  try {
    const snap = await getDoc(doc(db, 'public', 'vehicle'))
    if (!snap.exists()) return FALLBACK_VEHICLE
    return snap.data() as PublicVehicle
  } catch {
    return FALLBACK_VEHICLE
  }
}

export async function fetchPublicMods(): Promise<PublicMod[]> {
  try {
    const snap = await getDoc(doc(db, 'public', 'mods'))
    if (!snap.exists()) return []
    return (snap.data().items ?? []) as PublicMod[]
  } catch {
    return []
  }
}

export async function fetchPublicTimeline(): Promise<PublicTimeline[]> {
  try {
    const snap = await getDoc(doc(db, 'public', 'timeline'))
    if (!snap.exists()) return []
    return (snap.data().entries ?? []) as PublicTimeline[]
  } catch {
    return []
  }
}
