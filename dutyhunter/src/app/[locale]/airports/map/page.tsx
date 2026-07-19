import type { Metadata } from 'next'
import AirportsMapClient from './AirportsMapClient'

export const metadata: Metadata = {
  title: 'Airport Map | Duty Hunter',
  description: 'Explore airports with duty-free stores on the map.',
}

export default function AirportsMapPage() {
  return <AirportsMapClient />
}
