'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import { useMessages } from 'next-intl'
import { normalizeForSearch } from '@/lib/normalizeForSearch'

type Airport = {
  id: string
  iata_code: string
  airport_name: string
  city: string | null
}

export default function AirportsPage() {
  const supabase = createClient()
  const t = useTranslations('airportsPage')
  const pathname = usePathname()

  const router = useRouter()

  const [airports, setAirports] = useState<Airport[]>([])
  const [searchText, setSearchText] = useState('')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [userId, setUserId] = useState<string | null>(null)
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())
  const messages = useMessages() as any
  const tLocation = (city: string) => messages.locations?.[city] ?? city

  useEffect(() => {
    async function loadAirports() {
      const { data } = await supabase
        .from('airports')
        .select('id, iata_code, airport_name, city')
        .order('iata_code')

      setAirports(data ?? [])
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

    // Optimistic update
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

const displayedAirports = searchText.trim()
  ? airports.filter((a) => {
      const translatedCity = a.city ? tLocation(a.city) : ''
      const haystack = normalizeForSearch(
        `${a.iata_code} ${a.airport_name} ${a.city ?? ''} ${translatedCity}`
      )
      return haystack.includes(normalizeForSearch(searchText.trim()))
    })
  : airports
  const isListView = pathname === '/airports'
  const isMapView = pathname === '/airports/map'

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
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

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={t('searchPlaceholder')}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '15px',
            border: '1px solid #333',
            borderRadius: '8px',
            boxSizing: 'border-box',
            background: '#1a1a1a',
            color: '#fff',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {displayedAirports.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#888' }}>{t('noResults')}</p>
        ) : (
          displayedAirports.map((airport) => {
            const isFavorite = favoriteIds.has(airport.id)
            return (
              <div
                key={airport.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  padding: '14px 16px',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`/airports/${airport.id}`)}
              >
                <div>
                  <strong>{airport.iata_code}</strong> — {airport.airport_name}
                  {airport.city ? ` — ${tLocation(airport.city)}` : ''}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(airport.id)
                  }}
                  disabled={!userId}
                  aria-label={isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    cursor: userId ? 'pointer' : 'default',
                    fontSize: '20px',
                    color: isFavorite ? '#facc15' : '#666',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {isFavorite ? '★' : '☆'}
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
