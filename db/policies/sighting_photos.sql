-- ============================================================
-- SIGHTING PHOTOS: Row Level Security policies
-- ============================================================

ALTER TABLE public.sighting_photos ENABLE ROW LEVEL SECURITY;


-- Only logged-in users can view sighting photos (matches sightings' visibility).
DROP POLICY IF EXISTS "Public can view sighting photos"
ON public.sighting_photos;

DROP POLICY IF EXISTS "Authenticated users can view sighting photos"
ON public.sighting_photos;

CREATE POLICY "Authenticated users can view sighting photos"
ON public.sighting_photos
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');


-- Users can only upload a photo record for themselves,
-- and only onto a sighting they own.
DROP POLICY IF EXISTS "Users can upload sighting photo records"
ON public.sighting_photos;

CREATE POLICY "Users can upload sighting photo records"
ON public.sighting_photos
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = uploaded_by
    AND EXISTS (
        SELECT 1
        FROM public.sightings
        WHERE sightings.id = sighting_photos.sighting_id
          AND sightings.user_id = auth.uid()
    )
);


-- Users can only delete photos they uploaded.
DROP POLICY IF EXISTS "Users can delete their sighting photos"
ON public.sighting_photos;

CREATE POLICY "Users can delete their sighting photos"
ON public.sighting_photos
FOR DELETE
TO authenticated
USING (auth.uid() = uploaded_by);