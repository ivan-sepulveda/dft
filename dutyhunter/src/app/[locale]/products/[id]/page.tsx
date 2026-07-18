'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'

type Product = {
  id: string
  product_line: string
  variant: string | null
  image_url: string | null
  brands: { name: string } | null
}

type Sighting = {
  id: string
  seen_at: string
  notes: string | null
  created_at: string
  user_id: string
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

export default function ProductSightingsPage() {
  const params = useParams()
  const productId = params.id as string
  const supabase = createClient()
  const t = useTranslations('productSightings')
  const tFeed = useTranslations('feed')

  const [product, setProduct] = useState<Product | null>(null)
  const [sightings, setSightings] = useState<Sighting[]>([])
  const [usernames, setUsernames] = useState<Record<string, string>>({})
  const [photoUrls, setPhotoUrls] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      const { data } = await supabase
        .from('products')
        .select('id, product_line, variant, image_url, brands ( name )')
        .eq('id', productId)
        .single()

      setProduct((data as unknown as Product) ?? null)
    }

    loadProduct()
  }, [productId])

  useEffect(() => {
    async function loadSightings() {
      const { data, error } = await supabase
        .from('sightings')
        .select(`
          id,
          seen_at,
          notes,
          created_at,
          user_id,
          stores ( store_name, terminal, airports ( iata_code, airport_name ) )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to load product sightings:', error.message)
      }

      setSightings((data as unknown as Sighting[]) ?? [])
      setLoading(false)
    }

    loadSightings()
  }, [productId])

  useEffect(() => {
    async function loadUsernames() {
      if (sightings.length === 0) return

      const userIds = [...new Set(sightings.map((s) => s.user_id))]

      const { data } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', userIds)

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
      <Link href="/products" style={{ fontSize: '13px', color: '#888' }}>
        ← {t('backToProducts')}
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '12px 0 24px' }}>
        {product?.image_url && (
          <img
            src={product.image_url}
            alt={product.product_line}
            style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }}
          />
        )}
        <h1 style={{ fontSize: '24px', fontWeight: 600 }}>
          {product
            ? `${product.brands?.name ? product.brands.name + ' — ' : ''}${product.product_line}${
                product.variant ? ` (${product.variant})` : ''
              }`
            : '...'}
        </h1>
      </div>

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