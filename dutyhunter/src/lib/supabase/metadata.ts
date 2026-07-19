import { createClient } from '@supabase/supabase-js'

// Lightweight, read-only Supabase client for use inside generateMetadata()
// functions (Server Components only, never in client code). Uses the public
// anon key — safe here since it only ever reads tables covered by "public
// can view" RLS policies (airports, products, brands), the same data any
// anonymous visitor can already see.
export function createMetadataClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
