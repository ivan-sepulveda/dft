-- ============================================================
-- PRODUCTS: Row Level Security policies
-- ============================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;


-- Products are reference data — publicly readable by anyone,
-- logged in or not.
DROP POLICY IF EXISTS "Public can view products"
ON public.products;

CREATE POLICY "Public can view products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (true);