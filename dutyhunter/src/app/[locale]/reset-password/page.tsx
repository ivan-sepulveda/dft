'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()
  const t = useTranslations('auth')

  const [checkingLink, setCheckingLink] = useState(true)
  const [linkValid, setLinkValid] = useState(false)

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function exchangeCode() {
      const code = new URLSearchParams(window.location.search).get('code')

      if (!code) {
        setCheckingLink(false)
        setLinkValid(false)
        return
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code)

      setCheckingLink(false)
      setLinkValid(!error)

      if (error) {
        console.error('Reset link exchange failed:', error)
      }
    }

    exchangeCode()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({ password })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push('/home')
    }, 1500)
  }

  if (checkingLink) return null

  if (!linkValid) {
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
        <div style={{ maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>
            {t('resetLinkInvalidTitle')}
          </h1>
          <p style={{ fontSize: '15px', color: '#666' }}>{t('resetLinkInvalidBody')}</p>
        </div>
      </div>
    )
  }

  if (success) {
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
        <div style={{ maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>
            {t('resetSuccessTitle')}
          </h1>
          <p style={{ fontSize: '15px', color: '#666' }}>{t('resetSuccessBody')}</p>
        </div>
      </div>
    )
  }

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
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>
          {t('resetPasswordTitle')}
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          {t('resetPasswordSubtitle')}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '8px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '6px',
              }}
            >
              {t('newPasswordLabel')}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                style={{ ...inputStyle, paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#888',
                  padding: '4px',
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{t('passwordHint')}</p>
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
            {loading ? t('resettingPassword') : t('resetPasswordButton')}
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
