// Server wrapper for the landing route — sets metadata, renders LandingClient.
import type { Metadata } from 'next'
import LandingClient from './LandingClient'

export const metadata: Metadata = {
  title: 'Duty Hunter — Track Duty-Free Finds at Airports Worldwide',
  description: 'Discover and report duty-free products spotted at airports around the world.',
}

export default function LandingPage() {
  return <LandingClient />
}
