'use client'

// Signed-in home feed showing the 5 most recent sightings.
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

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
    airports: {
      iata_code: string
      airport_name: string
    } | null
  } | null
}

type SightingPhoto = {
  id: string
  sighting_id: string
  storage_path: string
}

export default function HomeClient() {
  const router = useRouter()
  const supabase = createClient()
  const t = useTranslations('feed')
  const [usernames, setUsernames] = useState<Record<string, string>>({})
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [sightings, setSightings] = useState<Sighting[]>([])
  const [loading, setLoading] = useState(true)
  const [photoUrls, setPhotoUrls] = useState<Record<string, string[]>>({})

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      setCheckingAuth(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    async function loadFeed() {
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
          stores ( store_name, terminal, airports ( iata_code, airport_name ) )
        `
        )
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Failed to load feed:', error.message, error.details, error.hint, error.code)
      }

      setSightings((data as unknown as Sighting[]) ?? [])
      setLoading(false)
    }

    loadFeed()
  }, [])

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

  if (checkingAuth) return null

  return (
    <div style={{ padding: '32px', maxWidth: '640px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>{t('title')}</h1>

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
                {sighting.stores?.airports?.iata_code} — {sighting.stores?.airports?.airport_name}
                {' · '}
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
                    <div
                      key={i}
                      style={{
                        position: 'relative',
                        width: '100px',
                        height: '100px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <Image src={url} alt="" fill sizes="100px" style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}

              {sighting.notes && (
                <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '8px' }}>
                  {sighting.notes}
                </p>
              )}

              <div style={{ fontSize: '12px', color: '#888' }}>
                {t('reportedBy')} {usernames[sighting.user_id] ?? 'someone'} · {t('seenOn')}{' '}
                {new Date(sighting.seen_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

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
        + New sighting
      </Link>
    </div>
  )
}
