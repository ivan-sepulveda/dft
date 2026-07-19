import { getTranslations } from 'next-intl/server'

// Shown while a route segment's server payload is loading — i.e. during
// navigation to a new route. Since every page in this app is a client
// component that fetches its own data client-side (see each page's local
// `loading` state), this only covers the brief moment between clicking a
// link and the new route's JS mounting, not the Supabase fetch itself.
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
