-- ============================================================
-- SEED: PRODUCTS
-- Safe to re-run: ON CONFLICT on (category_id, brand_id, product_line)
-- skips products that already exist (matches unique_product constraint).
--
-- NOTE: price/currency intentionally excluded — those live on
-- individual sightings rows (via sightings.price / currency_code),
-- not on the product itself. Only size/variant info lives here.
-- ============================================================

INSERT INTO public.products (category_id, brand_id, product_line, description, size_value, size_unit)
SELECT c.id, b.id, 'Sauvage', 'Eau de toilette', NULL::NUMERIC, NULL::TEXT
FROM public.categories c, public.brands b
WHERE c.name = 'Fragrance' AND b.name = 'Dior'

UNION ALL
SELECT c.id, b.id, 'No. 5', 'Eau de parfum', NULL::NUMERIC, NULL::TEXT
FROM public.categories c, public.brands b
WHERE c.name = 'Fragrance' AND b.name = 'Chanel'

UNION ALL
SELECT c.id, b.id, 'Blue Label', '12-year blended Scotch whisky', NULL::NUMERIC, NULL::TEXT
FROM public.categories c, public.brands b
WHERE c.name = 'Alcohol' AND b.name = 'Johnnie Walker'

UNION ALL
SELECT c.id, b.id, 'King George V', 'Blended Scotch Whisky', 750, 'mL'
FROM public.categories c, public.brands b
WHERE c.name = 'Alcohol' AND b.name = 'Johnnie Walker'

UNION ALL
SELECT c.id, b.id, 'Gold', 'Cigarettes, pack of 20', 1, 'pack'
FROM public.categories c, public.brands b
WHERE c.name = 'Cigarettes' AND b.name = 'Marlboro'

UNION ALL
SELECT c.id, b.id, 'Rosé Champagne', NULL, 750, 'mL'
FROM public.categories c, public.brands b
WHERE c.name = 'Alcohol' AND b.name = 'Armand de Brignac'

UNION ALL
SELECT c.id, b.id, 'Gold', NULL, 750, 'mL'
FROM public.categories c, public.brands b
WHERE c.name = 'Alcohol' AND b.name = 'Armand de Brignac'

UNION ALL
SELECT c.id, b.id, 'Champagne', NULL, 750, 'mL'
FROM public.categories c, public.brands b
WHERE c.name = 'Alcohol' AND b.name = 'Dom Pérignon'

UNION ALL
SELECT c.id, b.id, '25 Year Old', 'Blended Scotch Whisky, Scotland', 700, 'mL'
FROM public.categories c, public.brands b
WHERE c.name = 'Alcohol' AND b.name = 'Chivas Regal'

UNION ALL
SELECT c.id, b.id, 'Black Russians', 'Cigarettes', NULL::NUMERIC, NULL::TEXT
FROM public.categories c, public.brands b
WHERE c.name = 'Cigarettes' AND b.name = 'Sobranie'

ON CONFLICT (category_id, brand_id, product_line) DO NOTHING;