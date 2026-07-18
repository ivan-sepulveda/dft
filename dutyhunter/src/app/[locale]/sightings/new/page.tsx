'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import Combobox from '@/components/Combobox'
import imageCompression from 'browser-image-compression'

type Airport = { id: string; iata_code: string; airport_name: string }
type Store = {
  id: string
  store_name: string | null
  terminal: string
  nearest_gate: string | null
}
type Product = { id: string; product_line: string; brands: { name: string } | null }

export default function NewSightingPage() {
  const router = useRouter()
  const supabase = createClient()
  const tSightings = useTranslations('sightings')
  const tAuth = useTranslations('auth')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [airports, setAirports] = useState<Airport[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const [airportId, setAirportId] = useState('')
  const [storeId, setStoreId] = useState('')
  const [productId, setProductId] = useState('')
  const [seenAt, setSeenAt] = useState(() => new Date().toISOString().slice(0, 10))
  const [notes, setNotes] = useState('')

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [compressing, setCompressing] = useState(false)
  const [photoError, setPhotoError] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Require login
  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setCheckingAuth(false)
    }
    checkAuth()
  }, [])

  // Load airports + products once
  useEffect(() => {
    async function loadOptions() {
      const { data: airportData } = await supabase
        .from('airports')
        .select('id, iata_code, airport_name')
        .order('iata_code')

      const { data: productData } = await supabase
        .from('products')
        .select('id, product_line, brands ( name )')
        .order('product_line')

      setAirports(airportData ?? [])
      setProducts((productData as unknown as Product[]) ?? [])
    }
    loadOptions()
  }, [])

  // Load stores whenever the selected airport changes
  useEffect(() => {
    if (!airportId) {
      setStores([])
      setStoreId('')
      return
    }

    async function loadStores() {
      const { data } = await supabase
        .from('stores')
        .select('id, store_name, terminal, nearest_gate')
        .eq('airport_id', airportId)
        .order('terminal')

      setStores(data ?? [])
      setStoreId('')
    }
    loadStores()
  }, [airportId])

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setPhotoError(null)

    if (!file) {
      setPhotoFile(null)
      setPhotoPreview(null)
      return
    }

    setCompressing(true)

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: 'image/jpeg',
      })

      setPhotoFile(compressed)
      setPhotoPreview(URL.createObjectURL(compressed))
    } catch (err) {
      console.error('Photo compression failed:', err)
      setPhotoError(tSightings('photoErrorMessage'))
      setPhotoFile(null)
      setPhotoPreview(null)
    } finally {
      setCompressing(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!airportId || !storeId || !productId) {
      setError(tSightings('selectAllFieldsError'))
      return
    }

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      setError(tSightings('mustBeLoggedInError'))
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('sightings').insert({
      product_id: productId,
      store_id: storeId,
      user_id: user.id,
      notes: notes || null,
      seen_at: seenAt,
    })

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    if (photoFile) {
      const { data: newSighting } = await supabase
        .from('sightings')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (newSighting) {
        const fileExt = 'jpg'
        const filePath = `${user.id}/${newSighting.id}-${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('sighting-photos')
          .upload(filePath, photoFile)

        if (uploadError) {
          console.error('Photo upload failed:', uploadError.message)
        } else {
          const { error: photoInsertError } = await supabase.from('sighting_photos').insert({
            sighting_id: newSighting.id,
            storage_path: filePath,
            uploaded_by: user.id,
          })

          if (photoInsertError) {
            console.error('sighting_photos insert failed:', photoInsertError.message)
          }
        }
      }
    }

    setSuccess(true)
    setProductId('')
    setNotes('')
    setPhotoFile(null)
    setPhotoPreview(null)
  }

  if (checkingAuth) return null

  return (
    <div style={{ padding: '32px', maxWidth: '480px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
        {tSightings('pageTitle')}
      </h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>{tSightings('airportLabel')}</label>
          <Combobox
            options={airports.map((a) => ({
              id: a.id,
              label: `${a.iata_code} — ${a.airport_name}`,
            }))}
            value={airportId}
            onChange={setAirportId}
            placeholder={tSightings('searchAirports')}
            noMatchesLabel={tSightings('noMatches')}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>{tSightings('storeLabel')}</label>
          <select
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            style={inputStyle}
            required
            disabled={!airportId}
          >
            <option value="">
              {airportId ? tSightings('selectStore') : tSightings('selectAirportFirst')}
            </option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.store_name ?? tSightings('dutyFreeFallback')} — {tSightings('terminal')}{' '}
                {s.terminal}
                {s.nearest_gate ? ` (${tSightings('nearGate')} ${s.nearest_gate})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>{tSightings('productLabel')}</label>
          <Combobox
            options={products.map((p) => ({
              id: p.id,
              label: p.brands?.name ? `${p.brands.name} — ${p.product_line}` : p.product_line,
            }))}
            value={productId}
            onChange={setProductId}
            placeholder={tSightings('searchProducts')}
            noMatchesLabel={tSightings('noMatches')}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>{tSightings('dateLabel')}</label>
          <input
            type="date"
            value={seenAt}
            onChange={(e) => setSeenAt(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={labelStyle}>{tSightings('notesLabel')}</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>{tSightings('photoLabel')}</label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            disabled={compressing}
            style={{ display: 'none' }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={compressing}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              background: '#1a1a1a',
              border: '1px dashed #444',
              borderRadius: '8px',
              cursor: compressing ? 'not-allowed' : 'pointer',
            }}
          >
            📷 {photoFile ? tSightings('changePhoto') : tSightings('addPhoto')}
          </button>

          {compressing && (
            <p style={{ fontSize: '13px', color: '#888', marginTop: '6px' }}>
              {tSightings('processingPhoto')}
            </p>
          )}
          {photoError && (
            <p style={{ fontSize: '13px', color: '#b91c1c', marginTop: '6px' }}>{photoError}</p>
          )}
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              style={{
                marginTop: '8px',
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          )}
        </div>

        {error && (
          <p role="alert" style={errorStyle}>
            {error}
          </p>
        )}
        {success && <p style={successStyle}>{tSightings('sightingAdded')}</p>}

        <button
          type="submit"
          disabled={loading || compressing}
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '10px 16px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#fff',
            background: loading ? '#999' : '#111',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? tSightings('submitting') : tSightings('submitButton')}
        </button>
      </form>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '15px',
  border: '1px solid #d4d4d4',
  borderRadius: '8px',
  boxSizing: 'border-box',
}

const errorStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#b91c1c',
  background: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '6px',
  padding: '8px 12px',
  marginTop: '12px',
}

const successStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#15803d',
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '6px',
  padding: '8px 12px',
  marginTop: '12px',
}
