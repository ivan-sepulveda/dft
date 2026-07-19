import type { Metadata } from 'next'
import BrandsClient from './BrandsClient'

export const metadata: Metadata = {
  title: 'Brands | Duty Hunter',
  description: 'Browse duty-free brands.',
}

export default function BrandsPage() {
  return <BrandsClient />
}
