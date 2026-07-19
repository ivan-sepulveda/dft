import { notFound } from 'next/navigation'

// Catches any path under a valid locale that doesn't match a more specific
// route (e.g. /en/this-page-does-not-exist). Next.js only auto-renders the
// sibling not-found.tsx when notFound() is explicitly thrown from within
// this segment tree — it won't do so on its own just because nothing
// matched, so this catch-all exists purely to make that explicit call.
// Next always resolves more specific routes (airports/[id], etc.) first, so
// this only fires when truly nothing else matches.
export default function CatchAll() {
  notFound()
}
