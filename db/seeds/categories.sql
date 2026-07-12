-- ============================================================
-- SEED: CATEGORIES
-- Safe to re-run: ON CONFLICT (name) DO NOTHING skips categories
-- that already exist (name is UNIQUE per schema).
-- ============================================================

INSERT INTO public.categories (name) VALUES
    ('Fragrance'),
    ('Alcohol'),
    ('Cigarettes'),
    ('Cosmetics'),
    ('Fashion & Accessories')
ON CONFLICT (name) DO NOTHING;