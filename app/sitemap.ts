import type { MetadataRoute } from 'next'
import { journalEntries } from '@/lib/buildData'

const BASE = 'https://project-enveme.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/build', '/specs', '/gallery'].map((path) => ({
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
