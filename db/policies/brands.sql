-- ============================================================
-- BRANDS: Row Level Security policies
-- ============================================================

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;


-- Brands are reference data — publicly readable by anyone,
-- logged in or not.
DROP POLICY IF EXISTS "Public can view brands"
ON public.brands;

CREATE POLICY "Public can view brands"
ON public.brands
FOR SELECT
TO anon, authenticated
USING (true);