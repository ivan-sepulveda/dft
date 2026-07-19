import type { Metadata } from 'next'
import { createMetadataClient } from '@/lib/supabase/metadata'
import ProductSightingsClient from './ProductSightingsClient'

type Props = {
  params: Promise<{ id: string }>
}

type ProductRow = {
  product_line: string
  variant: string | null
  brands: { name: string } | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = createMetadataClient()

  const { data: product } = await supabase
    .from('products')
    .select('product_line, variant, brands ( name )')
    .eq('id', id)
    .single<ProductRow>()

  if (!product) {
    return { title: 'Products | Duty Hunter' }
  }

  const name = product.brands?.name
    ? `${product.brands.name} — ${product.product_line}`
    : product.product_line

  return {
    title: `${name} | Duty Hunter`,
    description: `Duty-free sightings reported for ${name}.`,
  }
}

export default function ProductSightingsPage() {
  return <ProductSightingsClient />
}
