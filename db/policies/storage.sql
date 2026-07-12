-- ============================================================
-- STORAGE: sighting-photos bucket policies
-- Controls access to storage.objects — a special Supabase-managed
-- table, not one of our own application tables. Kept separate from
-- the other policy files for that reason.
-- ============================================================

CREATE POLICY "Authenticated users can upload sighting photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'sighting-photos');

CREATE POLICY "Authenticated users can view sighting photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'sighting-photos');

CREATE POLICY "Users can delete their own sighting photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'sighting-photos' AND owner = auth.uid());