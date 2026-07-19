import type { Metadata } from 'next'
import AirportsClient from './AirportsClient'

export const metadata: Metadata = {
  title: 'Airports | Duty Hunter',
  description: 'Browse duty-free stores by airport.',
}

export default function AirportsPage() {
  return <AirportsClient />
}
