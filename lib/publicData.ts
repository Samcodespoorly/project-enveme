// lib/publicData.ts
// Server-side helpers to fetch the publicly readable Firestore documents
// that GarageOS syncs via syncPublic.ts.
//
// Uses the Firestore REST API (not the Firebase JS SDK) so that Next.js
// can cache responses via fetch() — giving proper ISR with revalidate: 300.

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
  category: string
  description: string | null
  cost: number | null
  installDate: string | null
  status: 'installed'
}

export interface PublicTimeline {
  id: string
  title: string
  description: string | null
  category: string
  status: 'planning' | 'in_progress' | 'on_hold' | 'complete'
  startDate: string | null
  completedDate: string | null
  totalCost: number | null
  tags: string[]
}

export interface PublicServiceEntry {
  date: string
  category: string
  odometer: number
  cost: number
  performedBy: string
  notes: string | null
}

export interface PublicServices {
  recent: PublicServiceEntry[]
  lastServiceDate: string | null
  totalCount: number
  totalSpend: number
  updatedAt: string
}

export type ComplianceStatus = 'ok' | 'warn' | 'alert' | 'expired'

export interface PublicComplianceEntry {
  type: 'wof' | 'rego' | 'insurance'
  label: string
  expiryDate: string
  status: ComplianceStatus
}

export interface PublicCompliance {
  entries: PublicComplianceEntry[]
  updatedAt: string
}

// ── Fallback data ─────────────────────────────────────────────────────────

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

// ── REST API helpers ──────────────────────────────────────────────────────

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } }

function str(v: FirestoreValue | undefined, fallback = ''): string {
  if (!v) return fallback
  return ('stringValue' in v ? v.stringValue : fallback)
}

function num(v: FirestoreValue | undefined, fallback = 0): number {
  if (!v) return fallback
  if ('integerValue' in v) return Number(v.integerValue)
  if ('doubleValue' in v) return v.doubleValue
  return fallback
}

function strOrNull(v: FirestoreValue | undefined): string | null {
  if (!v || 'nullValue' in v) return null
  return 'stringValue' in v ? v.stringValue : null
}

function numOrNull(v: FirestoreValue | undefined): number | null {
  if (!v || 'nullValue' in v) return null
  if ('integerValue' in v) return Number(v.integerValue)
  if ('doubleValue' in v) return v.doubleValue
  return null
}

function mapFields(v: FirestoreValue | undefined): Record<string, FirestoreValue> {
  if (!v || !('mapValue' in v)) return {}
  return v.mapValue.fields ?? {}
}

function arrValues(v: FirestoreValue | undefined): FirestoreValue[] {
  if (!v || !('arrayValue' in v)) return []
  return v.arrayValue.values ?? []
}

async function fetchDoc(
  docPath: string,
  revalidate = 300
): Promise<Record<string, FirestoreValue> | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!projectId || !apiKey) return null

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${docPath}?key=${apiKey}`
    const res = await fetch(url, { next: { revalidate } })
    if (!res.ok) return null
    const data = await res.json()
    return data.fields ?? null
  } catch {
    return null
  }
}

// ── Public fetch functions ────────────────────────────────────────────────

export async function fetchPublicVehicle(): Promise<PublicVehicle> {
  const fields = await fetchDoc('public/vehicle')
  if (!fields) return FALLBACK_VEHICLE

  return {
    make:              str(fields.make,              'Toyota'),
    model:             str(fields.model,             'Soarer'),
    year:              num(fields.year,              1995),
    colour:            str(fields.colour,            'Pearl White'),
    registrationPlate: str(fields.registrationPlate, 'ENVEME'),
    odometer:          num(fields.odometer,          0),
    buildStatus:       str(fields.buildStatus,       'Street registered · Active build'),
    updatedAt:         str(fields.updatedAt,         ''),
  }
}

export async function fetchPublicMods(): Promise<PublicMod[]> {
  const fields = await fetchDoc('public/mods')
  if (!fields) return []

  return arrValues(fields.items).map(item => {
    const f = mapFields(item)
    return {
      id:          str(f.id),
      name:        str(f.name),
      brand:       strOrNull(f.brand),
      category:    str(f.category),
      description: strOrNull(f.description),
      cost:        numOrNull(f.cost),
      installDate: strOrNull(f.installDate),
      status:      'installed' as const,
    }
  })
}

export async function fetchPublicTimeline(): Promise<PublicTimeline[]> {
  const fields = await fetchDoc('public/timeline')
  if (!fields) return []

  return arrValues(fields.entries).map(entry => {
    const f = mapFields(entry)
    return {
      id:            str(f.id),
      title:         str(f.title),
      description:   strOrNull(f.description),
      category:      str(f.category),
      status:        str(f.status, 'planning') as PublicTimeline['status'],
      startDate:     strOrNull(f.startDate),
      completedDate: strOrNull(f.completedDate),
      totalCost:     numOrNull(f.totalCost),
      tags:          arrValues(f.tags).map(t => str(t)),
    }
  })
}

export async function fetchPublicServices(): Promise<PublicServices> {
  const fields = await fetchDoc('public/services')
  if (!fields) {
    return {
      recent: [],
      lastServiceDate: null,
      totalCount: 0,
      totalSpend: 0,
      updatedAt: '',
    }
  }

  const recent: PublicServiceEntry[] = arrValues(fields.recent).map(item => {
    const f = mapFields(item)
    return {
      date:        str(f.date),
      category:    str(f.category),
      odometer:    num(f.odometer),
      cost:        num(f.cost),
      performedBy: str(f.performedBy),
      notes:       strOrNull(f.notes),
    }
  })

  return {
    recent,
    lastServiceDate: strOrNull(fields.lastServiceDate),
    totalCount:      num(fields.totalCount),
    totalSpend:      num(fields.totalSpend),
    updatedAt:       str(fields.updatedAt),
  }
}

export async function fetchPublicCompliance(): Promise<PublicCompliance> {
  const fields = await fetchDoc('public/compliance')
  if (!fields) {
    return { entries: [], updatedAt: '' }
  }

  const entries: PublicComplianceEntry[] = arrValues(fields.entries).map(item => {
    const f = mapFields(item)
    return {
      type:       str(f.type) as PublicComplianceEntry['type'],
      label:      str(f.label),
      expiryDate: str(f.expiryDate),
      status:     str(f.status, 'ok') as ComplianceStatus,
    }
  })

  return {
    entries,
    updatedAt: str(fields.updatedAt),
  }
}
