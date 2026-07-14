import { getTranslations } from 'next-intl/server'

export default async function CheckEmailPage() {
  const t = await getTranslations('auth')

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
          {t('checkEmailTitle')}
        </h1>
        <p style={{ fontSize: '15px', color: '#666' }}>
          {t('checkEmailBody')}
        </p>
      </div>
    </div>
  )
}