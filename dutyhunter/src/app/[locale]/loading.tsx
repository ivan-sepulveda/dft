import { getTranslations } from 'next-intl/server'

// Loading fallback shown briefly during route navigation.
export default async function Loading() {
  const t = await getTranslations('errors')

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}
    >
      <p style={{ fontSize: '15px', color: '#666' }}>{t('loading')}</p>
    </div>
  )
}
