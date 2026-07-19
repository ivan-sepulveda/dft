import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { createMetadataClient } from '@/lib/supabase/metadata'

const BASE_URL = 'https://dft.iesepulveda.com'

// Public, discoverable pages only. Auth pages (login, signup, etc.),
// profile/edit, sightings/new, and the feed at /home are excluded — they
// either require a session or aren't meant to be indexed.
const STATIC_PATHS = ['', '/airports', '/airports/map', '/products', '/brands']

// Builds the { en: url, es: url, ... } map Next.js uses for each entry's
// hreflang alternates, so search engines see the locale variants as
// translations of one page rather than four duplicate pages.
function localizedAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
  )
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  for (const path of STATIC_PATHS) {
    const alternates = localizedAlternates(path)
    for (const locale of routing.locales) {
      entries.push({
        url: alternates[locale],
        changeFrequency: path === '' ? 'weekly' : 'daily',
        priority: path === '' ? 1 : 0.7,
        alternates: { languages: alternates },
      })
    }
  }

  // Dynamic routes: one entry per airport/product, per locale. Public read
  // access only — same data any anonymous visitor can already see.
  const supabase = createMetadataClient()

  const [{ data: airports }, { data: products }] = await Promise.all([
    supabase.from('airports').select('id'),
    supabase.from('products').select('id'),
  ])

  for (const airport of airports ?? []) {
    const path = `/airports/${airport.id}`
    const alternates = localizedAlternates(path)
    for (const locale of routing.locales) {
      entries.push({
        url: alternates[locale],
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: { languages: alternates },
      })
    }
  }

  for (const product of products ?? []) {
    const path = `/products/${product.id}`
    const alternates = localizedAlternates(path)
    for (const locale of routing.locales) {
      entries.push({
        url: alternates[locale],
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: { languages: alternates },
      })
    }
  }

  return entries
}
