-- ============================================================
-- PROFILES: Row Level Security policies
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;


-- Anyone (logged in or not) can view any profile.
-- Profiles only contain public-facing info (username, display_name),
-- nothing sensitive.
DROP POLICY IF EXISTS "Public can view profiles"
ON public.profiles;

CREATE POLICY "Public can view profiles"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (true);


-- Users can only update their own profile row.
DROP POLICY IF EXISTS "Users can update their profile"
ON public.profiles;

CREATE POLICY "Users can update their profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);