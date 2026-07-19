// Server wrapper for the favorites route — sets metadata, renders FavoritesClient.
import type { Metadata } from 'next'
import FavoritesClient from './FavoritesClient'

export const metadata: Metadata = {
  title: 'My Favorites | Duty Hunter',
  description: 'Your favorited airports, brands, and products.',
}

export default function FavoritesPage() {
  return <FavoritesClient />
}
