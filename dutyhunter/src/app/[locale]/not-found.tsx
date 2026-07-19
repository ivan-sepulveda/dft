// 404 page for unmatched routes within a locale.
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function NotFound() {
  const t = await getTranslations('errors')

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
          {t('notFoundTitle')}
        </h1>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>{t('notFoundBody')}</p>
        <Link href="/" style={homeLinkStyle}>
          {t('backHome')}
        </Link>
      </div>
    </div>
  )
}

const homeLinkStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '10px 20px',
  fontSize: '15px',
  fontWeight: 600,
  color: '#fff',
  background: '#111',
  borderRadius: '8px',
  textDecoration: 'none',
}
