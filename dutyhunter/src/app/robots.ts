import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

// Locale-prefixed paths (e.g. /en/login, /es/login) that require a session
// or aren't meant to be indexed — mirrors what's excluded from sitemap.ts.
// The `*` wildcard between the locale and the path is supported by the
// major crawlers (Google, Bing) even though it's outside the original
// robots.txt spec.
const DISALLOWED_PATHS = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/check-email',
  '/home',
  '/profile',
  '/sightings/new',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', ...DISALLOWED_PATHS.map((path) => `/*${path}`)],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
