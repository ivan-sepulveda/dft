-- ============================================================
-- STORES: Row Level Security policies
-- ============================================================

ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;


-- Stores are reference data — publicly readable by anyone,
-- logged in or not.
DROP POLICY IF EXISTS "Public can view stores"
ON public.stores;

CREATE POLICY "Public can view stores"
ON public.stores
FOR SELECT
TO anon, authenticated
USING (true);