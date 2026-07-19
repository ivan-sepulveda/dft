import { notFound } from 'next/navigation'

// Catch-all route that triggers the not-found page for any unmatched URL.
export default function CatchAll() {
  notFound()
}
