'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    if (data.session) {
      router.push('/')
    } else {
      router.push('/check-email')
    }
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
          Create your account
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          Track duty-free sightings at airports around the world.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '6px',
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

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
              Email
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
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              style={inputStyle}
            />
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
              At least 6 characters
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
            {loading ? 'Creating account…' : 'Sign up'}
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
  outline: 'none',
}