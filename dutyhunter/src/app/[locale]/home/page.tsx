import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Your Feed | Duty Hunter',
  description: 'See the latest duty-free sightings reported by the community.',
}

export default function HomePage() {
  return <HomeClient />
}
