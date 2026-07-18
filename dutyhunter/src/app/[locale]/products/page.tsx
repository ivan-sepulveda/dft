'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import Combobox from '@/components/Combobox'
import { Link, useRouter } from '@/i18n/navigation'

type Product = {
  id: string
  product_line: string
  variant: string | null
  image_url: string | null
  brands: { name: string } | null
}

export default function ProductsPage() {
  const supabase = createClient()
  const t = useTranslations('productsPage')
  const tAirportsPage = useTranslations('airportsPage')
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [searchId, setSearchId] = useState('')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [userId, setUserId] = useState<string | null>(null)
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase
        .from('products')
        .select('id, product_line, variant, image_url, brands ( name )')
        .order('product_line')

      setProducts((data as unknown as Product[]) ?? [])
    }

    loadProducts()
  }, [])

  useEffect(() => {
    async function loadFavorites() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      const { data } = await supabase
        .from('favorite_products')
        .select('product_id')
        .eq('user_id', user.id)

      const favoriteRows = (data ?? []) as { product_id: string }[]
      setFavoriteIds(new Set(favoriteRows.map((row) => row.product_id)))
    }

    loadFavorites()
  }, [])

  async function toggleFavorite(productId: string) {
    if (!userId || pendingIds.has(productId)) return

    const isFavorite = favoriteIds.has(productId)

    setPendingIds((prev) => new Set(prev).add(productId))

    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (isFavorite) {
        next.delete(productId)
      } else {
        next.add(productId)
      }
      return next
    })

    if (isFavorite) {
      const { error } = await supabase
        .from('favorite_products')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId)

      if (error) {
        console.error('Failed to remove favorite:', error)
        setFavoriteIds((prev) => new Set(prev).add(productId))
      }
    } else {
      const { error } = await supabase
        .from('favorite_products')
        .insert({ user_id: userId, product_id: productId })

      if (error) {
        console.error('Failed to add favorite:', error)
        setFavoriteIds((prev) => {
          const next = new Set(prev)
          next.delete(productId)
          return next
        })
      }
    }

    setPendingIds((prev) => {
      const next = new Set(prev)
      next.delete(productId)
      return next
    })
  }

  const displayedProducts = searchId ? products.filter((p) => p.id === searchId) : products

  return (
    <div style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>{t('title')}</h1>

      <div style={{ marginBottom: '16px' }}>
        <Combobox
          options={products.map((p) => ({
            id: p.id,
            label: p.brands?.name ? `${p.brands.name} — ${p.product_line}` : p.product_line,
          }))}
          value={searchId}
          onChange={setSearchId}
          placeholder={t('searchPlaceholder')}
          noMatchesLabel={t('noResults')}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px',
        }}
      >
        {displayedProducts.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#888', gridColumn: '1 / -1' }}>{t('noResults')}</p>
        ) : (
          displayedProducts.map((product) => {
            const isFavorite = favoriteIds.has(product.id)
            return (
              <div
                key={product.id}
                style={{
                  border: '1px solid #333',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    background: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.product_line}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontSize: '12px', color: '#666' }}>{t('noImage')}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  disabled={!userId}
                  aria-label={
                    isFavorite
                      ? tAirportsPage('removeFromFavorites')
                      : tAirportsPage('addToFavorites')
                  }
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: userId ? 'pointer' : 'default',
                    fontSize: '16px',
                    color: isFavorite ? '#facc15' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isFavorite ? '★' : '☆'}
                </button>

                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>
                    {product.brands?.name ?? ''}
                  </div>
                  <div style={{ fontSize: '13px', color: '#ccc' }}>
                    {product.product_line}
                    {product.variant ? ` — ${product.variant}` : ''}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
