-- ============================================================
-- SIGHTINGS: pricing fields
-- ============================================================

ALTER TABLE public.sightings
ADD COLUMN IF NOT EXISTS price NUMERIC(12, 2),
ADD COLUMN IF NOT EXISTS currency_code TEXT;

ALTER TABLE public.sightings
DROP CONSTRAINT IF EXISTS sightings_price_nonnegative;

ALTER TABLE public.sightings
ADD CONSTRAINT sightings_price_nonnegative
CHECK (
    price IS NULL
    OR price >= 0
);

ALTER TABLE public.sightings
DROP CONSTRAINT IF EXISTS sightings_currency_code_format;

ALTER TABLE public.sightings
ADD CONSTRAINT sightings_currency_code_format
CHECK (
    currency_code IS NULL
    OR currency_code ~ '^[A-Z]{3}$'
);


-- ============================================================
-- PRODUCTS: variant and size fields
-- ============================================================

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS variant TEXT,
ADD COLUMN IF NOT EXISTS size_value NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS size_unit TEXT;

ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_size_value_positive;

ALTER TABLE public.products
ADD CONSTRAINT products_size_value_positive
CHECK (
    size_value IS NULL
    OR size_value > 0
);

ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_size_unit_allowed;

ALTER TABLE public.products
ADD CONSTRAINT products_size_unit_allowed
CHECK (
    size_unit IS NULL
    OR size_unit IN (
        'mL',
        'L',
        'g',
        'kg',
        'oz',
        'fl oz',
        'count',
        'pack',
        'carton'
    )
);