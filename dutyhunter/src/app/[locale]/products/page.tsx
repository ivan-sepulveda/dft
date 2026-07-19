import type { Metadata } from 'next'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Products | Duty Hunter',
  description: 'Browse duty-free products by brand.',
}

export default function ProductsPage() {
  return <ProductsClient />
}
