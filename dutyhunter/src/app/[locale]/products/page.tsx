// Server wrapper for the products list route — sets metadata, renders ProductsClient.
import type { Metadata } from 'next'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Products | Duty Hunter',
  description: 'Browse duty-free products by brand.',
}

export default function ProductsPage() {
  return <ProductsClient />
}
