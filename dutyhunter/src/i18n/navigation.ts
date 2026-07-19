// Locale-aware Link/router helpers, wrapping next-intl's navigation APIs.
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
