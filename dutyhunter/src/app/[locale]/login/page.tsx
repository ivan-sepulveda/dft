'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const tAuth = useTranslations('auth')
  const tNav = useTranslations('nav')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [checkingSession, setCheckingSession] = useState(true)
  const [currentUsername, setCurrentUsername] = useState<string | null>(null)

  useEffect(() => {
    async function checkSession() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setCheckingSession(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      setCurrentUsername(profile?.username ?? user.email ?? 'your account')
      setCheckingSession(false)
    }

    checkSession()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/')
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (checkingSession) return null

  if (currentUsername) {
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
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
            {tAuth('loggedInTitle')}
          </h1>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
            {tAuth('signedInAs')} <strong>{currentUsername}</strong>
          </p>

          <button
            onClick={() => router.push('/')}
            style={{
              width: '100%',
              padding: '10px 16px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#fff',
              background: '#111',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            {tAuth('goHome')}
          </button>

          <button
            onClick={handleSignOut}
            style={{
              width: '100%',
              padding: '10px 16px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#b91c1c',
              background: 'none',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {tNav('logout')}
          </button>
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
          {tAuth('loginTitle')}
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          {tAuth('loginSubtitle')}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '6px',
              }}
            >
              {tAuth('emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

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
    {tAuth('passwordLabel')}
  </label>
  <div style={{ position: 'relative' }}>
    <input
      id="password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      style={{ ...inputStyle, paddingRight: '44px' }}
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? tAuth('hidePassword') : tAuth('showPassword')}
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
            {loading ? tAuth('loggingIn') : tAuth('loginTitle')}
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