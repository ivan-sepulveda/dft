'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LandingClient() {
  const router = useRouter()
  const supabase = createClient()
  const tWelcome = useTranslations('welcome')
  const tNav = useTranslations('nav')
  const tAuth = useTranslations('auth')

  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        router.replace('/home')
        return
      }

      setCheckingAuth(false)
    }

    checkAuth()
  }, [])

  if (checkingAuth) return null

  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}
    >
      <div style={{ maxWidth: '560px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>
          {tWelcome('title')}
        </h1>
        <p style={{ fontSize: '17px', color: '#888', lineHeight: 1.6, marginBottom: '32px' }}>
          {tWelcome('subtitle')}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/login"
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#fff',
              background: '#111',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            {tNav('login')}
          </Link>
          <Link
            href="/signup"
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#111',
              background: '#fff',
              border: '1px solid #d4d4d4',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            {tAuth('signupTitle')}
          </Link>
        </div>
      </div>
    </main>
  )
}
