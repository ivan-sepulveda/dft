// Defines the supported locales and default locale for next-intl routing.
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'it'],
  defaultLocale: 'en',
})
