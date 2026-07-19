'use client'

// Top nav bar — browse/account menus when signed in, login/signup links when not.
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Navbar() {
  const router = useRouter()
  const supabase = createClient()
  const tNav = useTranslations('nav')
  const tSightings = useTranslations('sightings')
  const tProfile = useTranslations('profile')
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [browseOpen, setBrowseOpen] = useState(false)

  useEffect(() => {
    async function loadUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setUsername(null)
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Failed to load profile:', profileError)
        }

        setUsername(profile?.username ?? null)
      } catch (err) {
        console.error('loadUser crashed:', err)
        setUsername(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setMenuOpen(false)
    router.push('/login')
    router.refresh()
  }

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        borderBottom: '1px solid #333',
        background: '#111',
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link
          href="/"
          style={{ fontWeight: 700, fontSize: '18px', color: '#fff', textDecoration: 'none' }}
        >
          Duty Hunter
        </Link>

        {!loading && username && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setBrowseOpen((open) => !open)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: '8px',
                color: '#fff',
              }}
            >
              {tNav('browse')} ▾
            </button>

            {browseOpen && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '36px',
                  background: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  minWidth: '160px',
                  overflow: 'hidden',
                  zIndex: 10,
                }}
              >
                <Link
                  href="/products"
                  onClick={() => setBrowseOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    fontSize: '14px',
                    color: '#111',
                    textDecoration: 'none',
                  }}
                >
                  {tNav('products')}
                </Link>
                <Link
                  href="/airports"
                  onClick={() => setBrowseOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    fontSize: '14px',
                    color: '#111',
                    textDecoration: 'none',
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  {tNav('airports')}
                </Link>
                <Link
                  href="/brands"
                  onClick={() => setBrowseOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    fontSize: '14px',
                    color: '#111',
                    textDecoration: 'none',
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  {tNav('brands')}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        {loading ? null : username ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: '8px',
                color: '#fff',
              }}
            >
              {username} ▾
            </button>

            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '36px',
                  background: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  minWidth: '160px',
                  overflow: 'hidden',
                  zIndex: 10,
                }}
              >
                <Link
                  href="/sightings/new"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    fontSize: '14px',
                    color: '#111',
                    textDecoration: 'none',
                  }}
                >
                  {tSightings('newSighting')}
                </Link>

                <Link
                  href="/favorites"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    fontSize: '14px',
                    color: '#111',
                    textDecoration: 'none',
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  {tNav('favorites')}
                </Link>

                <Link
                  href="/profile/edit"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    fontSize: '14px',
                    color: '#111',
                    textDecoration: 'none',
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  {tProfile('editProfileLink')}
                </Link>
                <button
                  onClick={handleSignOut}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 14px',
                    background: 'none',
                    border: 'none',
                    borderTop: '1px solid #f0f0f0',
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: '#b91c1c',
                  }}
                >
                  {tNav('logout')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/login" style={{ fontSize: '14px', color: '#fff' }}>
              {tNav('login')}
            </Link>
            <Link href="/signup" style={{ fontSize: '14px', color: '#fff' }}>
              {tNav('signup')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
