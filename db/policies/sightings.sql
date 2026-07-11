-- ============================================================
-- SIGHTINGS: Row Level Security policies
-- ============================================================

ALTER TABLE public.sightings ENABLE ROW LEVEL SECURITY;


-- Only logged-in users can view sightings (no anonymous browsing).
DROP POLICY IF EXISTS "Sightings are publicly readable"
ON public.sightings;

DROP POLICY IF EXISTS "Authenticated users can view all sightings"
ON public.sightings;

CREATE POLICY "Authenticated users can view all sightings"
ON public.sightings
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');


-- Users can only create sightings attributed to themselves.
DROP POLICY IF EXISTS "Users can create sightings"
ON public.sightings;

CREATE POLICY "Users can create sightings"
ON public.sightings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);


-- Users can only update their own sightings.
DROP POLICY IF EXISTS "Users can update their sightings"
ON public.sightings;

CREATE POLICY "Users can update their sightings"
ON public.sightings
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);


-- Users can only delete their own sightings.
DROP POLICY IF EXISTS "Users can delete their sightings"
ON public.sightings;

CREATE POLICY "Users can delete their sightings"
ON public.sightings
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);