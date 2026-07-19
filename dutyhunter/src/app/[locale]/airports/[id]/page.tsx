import type { Metadata } from 'next'
import { createMetadataClient } from '@/lib/supabase/metadata'
import AirportSightingsClient from './AirportSightingsClient'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = createMetadataClient()

  const { data: airport } = await supabase
    .from('airports')
    .select('iata_code, airport_name')
    .eq('id', id)
    .single()

  if (!airport) {
    return { title: 'Airports | Duty Hunter' }
  }

  return {
    title: `${airport.iata_code} — ${airport.airport_name} | Duty Hunter`,
    description: `Duty-free sightings reported at ${airport.airport_name}.`,
  }
}

export default function AirportSightingsPage() {
  return <AirportSightingsClient />
}
