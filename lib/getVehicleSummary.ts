// Fetches the public vehicle summary from Firestore via REST API.
// No auth required — reads from the publicly-readable `public/summary` doc.

export interface VehicleSummary {
  odometer: number
  lastServiceDate: string
  lastServiceType: string
  buildStatus: string
  modCount: number
  updatedAt: string
}

export async function getVehicleSummary(): Promise<VehicleSummary | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

  if (!projectId || !apiKey) return null

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/public/summary?key=${apiKey}`
    const res = await fetch(url, { next: { revalidate: 300 } }) // cache 5 min
    if (!res.ok) return null

    const data = await res.json()
    const fields = data.fields

    return {
      odometer: Number(fields?.odometer?.integerValue ?? fields?.odometer?.doubleValue ?? 0),
      lastServiceDate: fields?.lastServiceDate?.stringValue ?? '',
      lastServiceType: fields?.lastServiceType?.stringValue ?? '',
      buildStatus: fields?.buildStatus?.stringValue ?? 'Active build',
      modCount: Number(fields?.modCount?.integerValue ?? 0),
      updatedAt: fields?.updatedAt?.stringValue ?? '',
    }
  } catch {
    return null
  }
}
