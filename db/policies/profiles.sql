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

-- ============================================================
-- AVATARS: storage.objects bucket policies
-- Controls access to the 'avatars' bucket. Kept here (rather than
-- in policies/storage.sql, which covers sighting-photos) since
-- avatars are a profile concern. Folder convention: files are
-- stored under a path prefixed with the owning user's UUID, e.g.
-- {user_id}/avatar.png, which is how upload/update scope to self.
-- ============================================================

-- Avatars are public-facing, like the rest of a profile — anyone
-- can view them, logged in or not.
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Users can only upload into their own folder (first path segment
-- must match their user id).
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Users can only overwrite files in their own folder.
CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);