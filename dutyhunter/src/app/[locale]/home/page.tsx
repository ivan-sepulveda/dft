'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Airport = {
  id: string
  iata_code: string
  airport_name: string
  city: string | null
}

export default function HomePage() {
  const router = useRouter()
  const supabase = createClient()

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [airports, setAirports] = useState<Airport[]>([])

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      setCheckingAuth(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    async function loadAirports() {
      const { data } = await supabase
        .from('airports')
        .select('id, iata_code, airport_name, city')
        .order('iata_code')
        .limit(5)

      setAirports(data ?? [])
    }

    loadAirports()
  }, [])

  if (checkingAuth) return null

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
        Home
      </h1>
      <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>
        Placeholder — top 5 airports for now.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {airports.map((airport) => (
          <div
            key={airport.id}
            style={{
              padding: '14px 16px',
              border: '1px solid #333',
              borderRadius: '8px',
            }}
          >
            <strong>{airport.iata_code}</strong> — {airport.airport_name}
            {airport.city ? ` — ${airport.city}` : ''}
          </div>
        ))}
      </div>

      <Link
        href="/sightings/new"
        style={{
          display: 'inline-block',
          marginTop: '24px',
          padding: '12px 24px',
          fontSize: '15px',
          fontWeight: 600,
          color: '#fff',
          background: '#111',
          borderRadius: '8px',
          textDecoration: 'none',
        }}
      >
        Report a sighting
      </Link>
    </div>
  )
}