'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'

const AirportsMap = dynamic(() => import('@/components/AirportsMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
      Loading map…
    </div>
  ),
})

type Airport = {
  id: string
  iata_code: string
  airport_name: string
  city: string | null
  latitude: number
  longitude: number
}

export default function AirportsMapPage() {
  const supabase = createClient()
  const t = useTranslations('airportsPage')

  const [airports, setAirports] = useState<Airport[]>([])

  useEffect(() => {
    async function loadAirports() {
      const { data } = await supabase
        .from('airports')
        .select('id, iata_code, airport_name, city, latitude, longitude')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)

      setAirports((data ?? []) as Airport[])
    }

    loadAirports()
  }, [])

  return (
    <div style={{ padding: '32px', maxWidth: '900px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
    <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
        {t('title')}
      </h1>

      <AirportsMap airports={airports} />
    </div>
  )
}


