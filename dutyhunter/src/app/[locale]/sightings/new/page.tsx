import type { Metadata } from 'next'
import NewSightingClient from './NewSightingClient'

export const metadata: Metadata = {
  title: 'Report a Sighting | Duty Hunter',
  description: 'Report a duty-free product you spotted at an airport.',
}

export default function NewSightingPage() {
  return <NewSightingClient />
}
