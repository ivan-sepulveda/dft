-- ============================================================
-- AIRPORTS: Row Level Security policies
-- ============================================================

ALTER TABLE public.airports ENABLE ROW LEVEL SECURITY;


-- Airports are reference data — publicly readable by anyone,
-- logged in or not.
DROP POLICY IF EXISTS "Public can view airports"
ON public.airports;

CREATE POLICY "Public can view airports"
ON public.airports
FOR SELECT
TO anon, authenticated
USING (true);