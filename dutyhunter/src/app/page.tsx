'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function Home() {
  const router = useRouter()
  const supabase = createClient()

  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()

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
          Welcome to Duty Hunter
        </h1>
        <p style={{ fontSize: '17px', color: '#888', lineHeight: 1.6, marginBottom: '32px' }}>
          Fellow travelers helping each other find rare cigarettes, whiskeys,
          and fragrances at duty-free stores around the world.
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
            Log in
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
            Create an account
          </Link>
        </div>
      </div>
    </main>
  )
}