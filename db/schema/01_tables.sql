-- ============================================================
-- DUTY HUNTER: INITIAL DATABASE SCHEMA
-- ============================================================

-- Required for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ============================================================
-- USER PROFILES
-- Supabase Auth stores passwords and login credentials.
-- This table stores public app-specific profile information.
-- ============================================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL UNIQUE,
    display_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT username_length
        CHECK (CHAR_LENGTH(username) BETWEEN 3 AND 30)
);


-- ============================================================
-- AIRPORTS
-- ============================================================

CREATE TABLE public.airports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    iata_code TEXT NOT NULL UNIQUE,
    airport_name TEXT NOT NULL,
    city TEXT,
    country_code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT airport_iata_code_format
        CHECK (iata_code = UPPER(iata_code) AND CHAR_LENGTH(iata_code) = 3)
);


-- ============================================================
-- STORES
-- Example:
-- IAH, Terminal E, nearest Gate 13
-- ============================================================

CREATE TABLE public.stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    airport_id UUID NOT NULL
        REFERENCES public.airports(id)
        ON DELETE CASCADE,

    store_identifier TEXT,
    store_name TEXT,
    terminal TEXT NOT NULL,
    nearest_gate TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_store_location
        UNIQUE (
            airport_id,
            terminal,
            nearest_gate,
            store_identifier
        )
);


-- ============================================================
-- PRODUCT CATEGORIES
-- Examples: Fragrances, Cigarettes, Cosmetics
-- ============================================================

CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- BRANDS
-- Examples: Dior, Sobranie
-- ============================================================

CREATE TABLE public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- PRODUCTS
-- Example:
-- Category: Fragrances
-- Brand: Dior
-- Product line: Sauvage
-- ============================================================

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    category_id UUID NOT NULL
        REFERENCES public.categories(id),

    brand_id UUID NOT NULL
        REFERENCES public.brands(id),

    product_line TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_product
        UNIQUE (
            category_id,
            brand_id,
            product_line
        )
);


-- ============================================================
-- SIGHTINGS
-- The central table:
-- "A user saw a product at a particular store."
-- ============================================================

CREATE TABLE public.sightings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL
        REFERENCES public.products(id),

    store_id UUID NOT NULL
        REFERENCES public.stores(id),

    user_id UUID NOT NULL
        REFERENCES auth.users(id),

    notes TEXT,
    seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- SIGHTING PHOTOS
-- The actual files will live in Supabase Storage.
-- This table stores the file path and related metadata.
-- ============================================================

CREATE TABLE public.sighting_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    sighting_id UUID NOT NULL
        REFERENCES public.sightings(id)
        ON DELETE CASCADE,

    storage_path TEXT NOT NULL UNIQUE,
    uploaded_by UUID NOT NULL
        REFERENCES auth.users(id),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_stores_airport_id
    ON public.stores(airport_id);

CREATE INDEX idx_products_category_id
    ON public.products(category_id);

CREATE INDEX idx_products_brand_id
    ON public.products(brand_id);

CREATE INDEX idx_sightings_product_id
    ON public.sightings(product_id);

CREATE INDEX idx_sightings_store_id
    ON public.sightings(store_id);

CREATE INDEX idx_sightings_user_id
    ON public.sightings(user_id);

CREATE INDEX idx_sightings_seen_at
    ON public.sightings(seen_at DESC);

CREATE INDEX idx_sighting_photos_sighting_id
    ON public.sighting_photos(sighting_id);