'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'

type SightingPhoto = {
  id: string
  sighting_id: string
  storage_path: string
}

type Airport = {
  id: string
  iata_code: string
  airport_name: string
  city: string | null
}

type Sighting = {
  id: string
  seen_at: string
  notes: string | null
  created_at: string
  user_id: string
  products: {
    product_line: string
    variant: string | null
    brands: { name: string } | null
  } | null
  stores: {
    store_name: string | null
    terminal: string
  } | null
}

export default function AirportSightingsPage() {
  const params = useParams()
  const airportId = params.id as string
  const supabase = createClient()
  const t = useTranslations('airportSightings')
  const tFeed = useTranslations('feed')

  const [airport, setAirport] = useState<Airport | null>(null)
  const [sightings, setSightings] = useState<Sighting[]>([])
  const [usernames, setUsernames] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [photoUrls, setPhotoUrls] = useState<Record<string, string[]>>({})

  useEffect(() => {
    async function loadAirport() {
      const { data } = await supabase
        .from('airports')
        .select('id, iata_code, airport_name, city')
        .eq('id', airportId)
        .single()

      setAirport(data ?? null)
    }

    loadAirport()
  }, [airportId])

  useEffect(() => {
    async function loadSightings() {
      // Get store IDs at this airport first
      const { data: storeRows } = await supabase
        .from('stores')
        .select('id')
        .eq('airport_id', airportId)

      const storeIds = (storeRows ?? []).map((s: { id: string }) => s.id)
      if (storeIds.length === 0) {
        setSightings([])
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('sightings')
        .select(
          `
          id,
          seen_at,
          notes,
          created_at,
          user_id,
          products ( product_line, variant, brands ( name ) ),
          stores ( store_name, terminal )
        `
        )
        .in('store_id', storeIds)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to load airport sightings:', error.message)
      }

      setSightings((data as unknown as Sighting[]) ?? [])
      setLoading(false)
    }

    loadSightings()
  }, [airportId])

  useEffect(() => {
    async function loadUsernames() {
      if (sightings.length === 0) return

      const userIds = [...new Set(sightings.map((s) => s.user_id))]

      const { data } = await supabase.from('profiles').select('id, username').in('id', userIds)

      const map: Record<string, string> = {}
      ;(data ?? []).forEach((row: { id: string; username: string | null }) => {
        if (row.username) map[row.id] = row.username
      })

      setUsernames(map)
    }

    loadUsernames()
  }, [sightings])

  useEffect(() => {
    async function loadPhotos() {
      if (sightings.length === 0) return

      const sightingIds = sightings.map((s) => s.id)

      const { data: photos, error } = await supabase
        .from('sighting_photos')
        .select('id, sighting_id, storage_path')
        .in('sighting_id', sightingIds)

      if (error) {
        console.error('Failed to load sighting photos:', error.message)
        return
      }

      const photoRows = (photos ?? []) as SightingPhoto[]

      const urlsBySighting: Record<string, string[]> = {}

      photoRows.forEach((photo) => {
        const { data: urlData } = supabase.storage
          .from('sighting-photos')
          .getPublicUrl(photo.storage_path)

        if (!urlsBySighting[photo.sighting_id]) {
          urlsBySighting[photo.sighting_id] = []
        }
        urlsBySighting[photo.sighting_id].push(urlData.publicUrl)
      })

      setPhotoUrls(urlsBySighting)
    }

    loadPhotos()
  }, [sightings])

  return (
    <div style={{ padding: '32px', maxWidth: '640px', margin: '0 auto' }}>
      <Link href="/airports" style={{ fontSize: '13px', color: '#888' }}>
        ← {t('backToAirports')}
      </Link>

      <h1 style={{ fontSize: '24px', fontWeight: 600, margin: '12px 0 24px' }}>
        {airport ? `${airport.iata_code} — ${airport.airport_name}` : '...'}
      </h1>

      {loading ? null : sightings.length === 0 ? (
        <p style={{ fontSize: '14px', color: '#888' }}>{t('empty')}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {sightings.map((sighting) => (
            <div
              key={sighting.id}
              style={{
                border: '1px solid #333',
                borderRadius: '10px',
                padding: '16px',
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                {sighting.products?.brands?.name ? `${sighting.products.brands.name} — ` : ''}
                {sighting.products?.product_line}
                {sighting.products?.variant ? ` (${sighting.products.variant})` : ''}
              </div>

              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>
                {sighting.stores?.store_name ?? 'Duty free'} (Terminal {sighting.stores?.terminal})
              </div>

              {photoUrls[sighting.id] && photoUrls[sighting.id].length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    marginBottom: '8px',
                  }}
                >
                  {photoUrls[sighting.id].map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              )}

              {sighting.notes && (
                <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '8px' }}>
                  {sighting.notes}
                </p>
              )}

              <div style={{ fontSize: '12px', color: '#888' }}>
                {tFeed('reportedBy')} {usernames[sighting.user_id] ?? 'someone'} · {tFeed('seenOn')}{' '}
                {new Date(sighting.seen_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
