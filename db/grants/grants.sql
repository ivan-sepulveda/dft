-- ============================================================
-- GRANTS
-- Role-level table access. These must exist alongside RLS
-- policies — a policy alone doesn't grant access if the role
-- was never given permission to query the table at all.
-- ============================================================

-- Reference data: authenticated users can read airports, stores,
-- products, brands, categories (needed to populate form dropdowns).
GRANT SELECT ON public.airports, public.stores, public.products, public.brands, public.categories
TO authenticated;

-- Profiles: authenticated users can read all profiles (public info)
-- and update their own.
GRANT SELECT ON public.profiles
TO anon, authenticated;

GRANT UPDATE ON public.profiles
TO authenticated;

-- Sightings: authenticated users can read, create, update, and
-- delete (RLS policies restrict update/delete to their own rows).
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sightings
TO authenticated;

-- Sighting photos: authenticated users can read, insert, and
-- delete (RLS policies restrict insert/delete to their own uploads).
GRANT SELECT, INSERT, DELETE ON public.sighting_photos
TO authenticated;

GRANT SELECT, INSERT, DELETE ON favorite_brands TO authenticated;
GRANT SELECT, INSERT, DELETE ON favorite_products TO authenticated;
GRANT SELECT, INSERT, DELETE ON favorite_airports TO authenticated;