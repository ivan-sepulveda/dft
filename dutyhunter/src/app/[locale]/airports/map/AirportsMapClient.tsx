'use client'

// Airport map page, showing airports with coordinates on a Leaflet map.
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import { useMessages } from 'next-intl'

const AirportsMap = dynamic(() => import('@/components/AirportsMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
      }}
    >
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

export default function AirportsMapClient() {
  const supabase = createClient()
  const t = useTranslations('airportsPage')
  const pathname = usePathname()
  const messages = useMessages() as any
  const tLocation = (city: string) => messages.locations?.[city] ?? city
  const [airports, setAirports] = useState<Airport[]>([])
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [userId, setUserId] = useState<string | null>(null)
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())

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

  useEffect(() => {
    async function loadFavorites() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      const { data } = await supabase
        .from('favorite_airports')
        .select('airport_id')
        .eq('user_id', user.id)

      const favoriteRows = (data ?? []) as { airport_id: string }[]
      setFavoriteIds(new Set(favoriteRows.map((row) => row.airport_id)))
    }

    loadFavorites()
  }, [])

  async function toggleFavorite(airportId: string) {
    if (!userId || pendingIds.has(airportId)) return

    const isFavorite = favoriteIds.has(airportId)

    setPendingIds((prev) => new Set(prev).add(airportId))

    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (isFavorite) {
        next.delete(airportId)
      } else {
        next.add(airportId)
      }
      return next
    })

    if (isFavorite) {
      const { error } = await supabase
        .from('favorite_airports')
        .delete()
        .eq('user_id', userId)
        .eq('airport_id', airportId)

      if (error) {
        console.error('Failed to remove favorite:', error)
        setFavoriteIds((prev) => new Set(prev).add(airportId))
      }
    } else {
      const { error } = await supabase
        .from('favorite_airports')
        .insert({ user_id: userId, airport_id: airportId })

      if (error) {
        console.error('Failed to add favorite:', error)
        setFavoriteIds((prev) => {
          const next = new Set(prev)
          next.delete(airportId)
          return next
        })
      }
    }

    setPendingIds((prev) => {
      const next = new Set(prev)
      next.delete(airportId)
      return next
    })
  }

  const isListView = pathname === '/airports'
  const isMapView = pathname === '/airports/map'

  return (
    <div
      style={{
        padding: '32px',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>{t('title')}</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <Link
          href="/airports"
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '8px',
            border: '1px solid #333',
            background: isListView ? '#111' : 'transparent',
            color: isListView ? '#fff' : '#ccc',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          {t('listView')}
        </Link>
        <Link
          href="/airports/map"
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '8px',
            border: '1px solid #333',
            background: isMapView ? '#111' : 'transparent',
            color: isMapView ? '#fff' : '#ccc',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          {t('mapView')}
        </Link>
      </div>

      <AirportsMap
        airports={airports}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        canFavorite={!!userId}
        addLabel={t('addToFavorites')}
        removeLabel={t('removeFromFavorites')}
      />
    </div>
  )
}
