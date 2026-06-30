import type { MetadataRoute } from 'next'
import { fetchPublicJournal } from '@/lib/publicData'

const BASE = 'https://project-enveme.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const journalEntries = await fetchPublicJournal()

  const pages = ['', '/about', '/build', '/parts', '/specs', '/gallery'].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  const entries = journalEntries.map((e) => ({
    url: `${BASE}/build/${e.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...pages, ...entries]
}
