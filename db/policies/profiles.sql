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