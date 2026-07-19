'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { normalizeForSearch } from '@/lib/normalizeForSearch'

type Brand = {
  id: string
  name: string
}

export default function BrandsClient() {
  const supabase = createClient()
  const t = useTranslations('brandsPage')

  const [brands, setBrands] = useState<Brand[]>([])
  const [searchText, setSearchText] = useState('')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [userId, setUserId] = useState<string | null>(null)
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function loadBrands() {
      const { data } = await supabase.from('brands').select('id, name').order('name')

      setBrands(data ?? [])
    }

    loadBrands()
  }, [])

  useEffect(() => {
    async function loadFavorites() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      const { data } = await supabase
        .from('favorite_brands')
        .select('brand_id')
        .eq('user_id', user.id)

      const favoriteRows = (data ?? []) as { brand_id: string }[]
      setFavoriteIds(new Set(favoriteRows.map((row) => row.brand_id)))
    }

    loadFavorites()
  }, [])

  async function toggleFavorite(brandId: string) {
    if (!userId || pendingIds.has(brandId)) return

    const isFavorite = favoriteIds.has(brandId)

    setPendingIds((prev) => new Set(prev).add(brandId))

    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (isFavorite) {
        next.delete(brandId)
      } else {
        next.add(brandId)
      }
      return next
    })

    if (isFavorite) {
      const { error } = await supabase
        .from('favorite_brands')
        .delete()
        .eq('user_id', userId)
        .eq('brand_id', brandId)

      if (error) {
        console.error('Failed to remove favorite:', error.message)
        setFavoriteIds((prev) => new Set(prev).add(brandId))
      }
    } else {
      const { error } = await supabase
        .from('favorite_brands')
        .insert({ user_id: userId, brand_id: brandId })

      if (error) {
        console.error('Failed to add favorite:', error.message)
        setFavoriteIds((prev) => {
          const next = new Set(prev)
          next.delete(brandId)
          return next
        })
      }
    }

    setPendingIds((prev) => {
      const next = new Set(prev)
      next.delete(brandId)
      return next
    })
  }

  const displayedBrands = searchText.trim()
    ? brands.filter((b) =>
        normalizeForSearch(b.name).includes(normalizeForSearch(searchText.trim()))
      )
    : brands

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>{t('title')}</h1>

      <div style={{ marginBottom: '16px' }}>
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
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {displayedBrands.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#888' }}>{t('noResults')}</p>
        ) : (
          displayedBrands.map((brand) => {
            const isFavorite = favoriteIds.has(brand.id)
            return (
              <div
                key={brand.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  padding: '14px 16px',
                  border: '1px solid #333',
                  borderRadius: '8px',
                }}
              >
                <div>{brand.name}</div>

                <button
                  type="button"
                  onClick={() => toggleFavorite(brand.id)}
                  disabled={!userId}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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
