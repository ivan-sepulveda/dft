'use client'

// Lets the signed-in user update their display name and avatar.
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRef } from 'react'
import { resizeImageToSquare } from '@/lib/resizeImageToSquare'

export default function EditProfileClient() {
  const router = useRouter()
  const supabase = createClient()
  const t = useTranslations('profile')

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [avatarError, setAvatarError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('id', user.id)
        .single()

      setDisplayName(profile?.display_name ?? '')
      setAvatarUrl(profile?.avatar_url ?? null)
      setCheckingAuth(false)
    }

    loadProfile()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ display_name: displayName || null })
      .eq('id', user.id)

    setLoading(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setSuccess(true)
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setAvatarError(null)
    setUploadingAvatar(true)

    try {
      const resizedBlob = await resizeImageToSquare(file, 500)

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const filePath = `${user.id}/avatar-${Date.now()}.jpg`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, resizedBlob, { contentType: 'image/jpeg' })

      if (uploadError) {
        console.error('Avatar upload failed:', uploadError.message)
        setAvatarError(t('avatarError'))
        return
      }

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('id', user.id)

      if (updateError) {
        console.error('Avatar URL save failed:', updateError.message)
        setAvatarError(t('avatarError'))
        return
      }

      setAvatarUrl(urlData.publicUrl)
    } catch (err) {
      console.error('Avatar processing failed:', err)
      setAvatarError(t('avatarError'))
    } finally {
      setUploadingAvatar(false)
    }
  }

  if (checkingAuth) return null

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '32px',
          borderRadius: '12px',
          border: '1px solid #e5e5e5',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
          {t('editTitle')}
        </h1>

        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto 12px',
              background: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '32px', color: '#666' }}>👤</span>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={uploadingAvatar}
            style={{ display: 'none' }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingAvatar}
            style={{
              fontSize: '13px',
              color: '#888',
              background: 'none',
              border: 'none',
              cursor: uploadingAvatar ? 'not-allowed' : 'pointer',
              textDecoration: 'underline',
            }}
          >
            {uploadingAvatar
              ? t('uploadingAvatar')
              : avatarUrl
                ? t('changeAvatar')
                : t('uploadAvatar')}
          </button>

          {avatarError && (
            <p style={{ fontSize: '13px', color: '#b91c1c', marginTop: '6px' }}>{avatarError}</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '8px' }}>
            <label
              htmlFor="displayName"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '6px',
              }}
            >
              {t('displayNameLabel')}
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={inputStyle}
            />
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
              {t('displayNameHint')}
            </p>
          </div>

          {error && (
            <p
              role="alert"
              style={{
                fontSize: '14px',
                color: '#b91c1c',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                padding: '8px 12px',
                marginTop: '12px',
              }}
            >
              {error}
            </p>
          )}

          {success && (
            <p
              style={{
                fontSize: '14px',
                color: '#15803d',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '6px',
                padding: '8px 12px',
                marginTop: '12px',
              }}
            >
              {t('saveSuccess')}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '20px',
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
            {loading ? t('saving') : t('saveButton')}
          </button>
        </form>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '15px',
  border: '1px solid #d4d4d4',
  borderRadius: '8px',
  boxSizing: 'border-box',
}
