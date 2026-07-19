// Resolves the active locale per request and loads its message file.
import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'es', 'fr', 'it']

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale)) {
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
