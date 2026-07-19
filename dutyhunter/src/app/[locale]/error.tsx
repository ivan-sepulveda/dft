'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

// Next.js requires error.tsx to be a Client Component (error boundary).
// It catches errors thrown by page.tsx and below — the [locale]/layout.tsx
// above it (and its NextIntlClientProvider) stays mounted, so useTranslations
// still works here.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('errors')

  useEffect(() => {
    console.error(error)
  }, [error])

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
          {t('genericErrorTitle')}
        </h1>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
          {t('genericErrorBody')}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={() => reset()} style={retryButtonStyle}>
            {t('tryAgain')}
          </button>
          <Link href="/" style={homeLinkStyle}>
            {t('backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}

const retryButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '15px',
  fontWeight: 600,
  color: '#fff',
  background: '#111',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
}

const homeLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '10px 20px',
  fontSize: '15px',
  fontWeight: 600,
  color: '#111',
  background: '#fff',
  border: '1px solid #d4d4d4',
  borderRadius: '8px',
  textDecoration: 'none',
}
