-- ============================================================
-- CATEGORIES: Row Level Security policies
-- ============================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;


-- Categories are reference data — publicly readable by anyone,
-- logged in or not.
DROP POLICY IF EXISTS "Public can view categories"
ON public.categories;

CREATE POLICY "Public can view categories"
ON public.categories
FOR SELECT
TO anon, authenticated
USING (true);