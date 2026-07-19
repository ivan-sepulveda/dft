'use client'

// Lists every airport, brand, and product the signed-in user has favorited,
// each with a star button to remove it. Requires login, same as /home.
import { useEffect, useState } from 'react'
import { useTranslations, useMessages } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import type { LocaleMessages } from '@/lib/localeMessages'

type FavoriteAirport = {
  id: string
  iata_code: string
  airport_name: string
  city: string | null
}

type FavoriteBrand = {
  id: string
  name: string
}

type FavoriteProduct = {
  id: string
  product_line: string
  variant: string | null
  brands: { name: string } | null
}

export default function FavoritesClient() {
  const router = useRouter()
  const supabase = createClient()
  const t = useTranslations('favoritesPage')
  const tAirportsPage = useTranslations('airportsPage')
  const tProductsPage = useTranslations('productsPage')
  const tBrandsPage = useTranslations('brandsPage')
  const messages = useMessages() as unknown as LocaleMessages
  const tLocation = (city: string) => messages.locations?.[city] ?? city

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [airports, setAirports] = useState<FavoriteAirport[]>([])
  const [brands, setBrands] = useState<FavoriteBrand[]>([])
  const [products, setProducts] = useState<FavoriteProduct[]>([])

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      setUserId(user.id)
      setCheckingAuth(false)
    }

    checkAuth()
  }, [])

  // Pure fetch, no setState — reused by the initial load effect below and
  // by the remove handlers to resync if a delete fails.
  async function fetchFavorites(uid: string) {
    const [airportRows, brandRows, productRows] = await Promise.all([
      supabase
        .from('favorite_airports')
        .select('airports ( id, iata_code, airport_name, city )')
        .eq('user_id', uid),
      supabase.from('favorite_brands').select('brands ( id, name )').eq('user_id', uid),
      supabase
        .from('favorite_products')
        .select('products ( id, product_line, variant, brands ( name ) )')
        .eq('user_id', uid),
    ])

    const airportData = (airportRows.data ?? []) as unknown as {
      airports: FavoriteAirport | null
    }[]
    const brandData = (brandRows.data ?? []) as unknown as { brands: FavoriteBrand | null }[]
    const productData = (productRows.data ?? []) as unknown as {
      products: FavoriteProduct | null
    }[]

    return {
      airports: airportData.map((row) => row.airports).filter((a) => a !== null),
      brands: brandData.map((row) => row.brands).filter((b) => b !== null),
      products: productData.map((row) => row.products).filter((p) => p !== null),
    }
  }

  useEffect(() => {
    if (!userId) return

    async function loadFavorites() {
      const result = await fetchFavorites(userId as string)
      setAirports(result.airports)
      setBrands(result.brands)
      setProducts(result.products)
      setLoading(false)
    }

    loadFavorites()
  }, [userId])

  async function removeFavoriteAirport(airportId: string) {
    if (!userId) return
    setAirports((prev) => prev.filter((a) => a.id !== airportId))

    const { error } = await supabase
      .from('favorite_airports')
      .delete()
      .eq('user_id', userId)
      .eq('airport_id', airportId)

    if (error) {
      console.error('Failed to remove favorite airport:', error.message)
      const result = await fetchFavorites(userId)
      setAirports(result.airports)
    }
  }

  async function removeFavoriteBrand(brandId: string) {
    if (!userId) return
    setBrands((prev) => prev.filter((b) => b.id !== brandId))

    const { error } = await supabase
      .from('favorite_brands')
      .delete()
      .eq('user_id', userId)
      .eq('brand_id', brandId)

    if (error) {
      console.error('Failed to remove favorite brand:', error.message)
      const result = await fetchFavorites(userId)
      setBrands(result.brands)
    }
  }

  async function removeFavoriteProduct(productId: string) {
    if (!userId) return
    setProducts((prev) => prev.filter((p) => p.id !== productId))

    const { error } = await supabase
      .from('favorite_products')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)

    if (error) {
      console.error('Failed to remove favorite product:', error.message)
      const result = await fetchFavorites(userId)
      setProducts(result.products)
    }
  }

  if (checkingAuth) return null

  const hasNoFavorites =
    !loading && airports.length === 0 && brands.length === 0 && products.length === 0

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>{t('title')}</h1>

      {loading ? null : hasNoFavorites ? (
        <p style={{ fontSize: '14px', color: '#888' }}>{t('empty')}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {airports.length > 0 && (
            <section>
              <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
                {tAirportsPage('title')}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {airports.map((airport) => (
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
                        removeFavoriteAirport(airport.id)
                      }}
                      aria-label={tAirportsPage('removeFromFavorites')}
                      style={starButtonStyle}
                    >
                      ★
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {brands.length > 0 && (
            <section>
              <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
                {tBrandsPage('title')}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {brands.map((brand) => (
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
                      onClick={() => removeFavoriteBrand(brand.id)}
                      aria-label={tAirportsPage('removeFromFavorites')}
                      style={starButtonStyle}
                    >
                      ★
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {products.length > 0 && (
            <section>
              <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
                {tProductsPage('title')}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {products.map((product) => (
                  <div
                    key={product.id}
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
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <div>
                      {product.brands?.name ? `${product.brands.name} — ` : ''}
                      {product.product_line}
                      {product.variant ? ` (${product.variant})` : ''}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFavoriteProduct(product.id)
                      }}
                      aria-label={tAirportsPage('removeFromFavorites')}
                      style={starButtonStyle}
                    >
                      ★
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

const starButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: '4px',
  cursor: 'pointer',
  fontSize: '20px',
  color: '#facc15',
  lineHeight: 1,
  flexShrink: 0,
}
