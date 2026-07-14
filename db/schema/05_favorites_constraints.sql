-- ============================================================
-- PREVENT DUPLICATE FAVORITES
-- A user can only favorite the same brand/product/airport once
-- ============================================================
ALTER TABLE favorite_brands
    ADD CONSTRAINT favorite_brands_user_brand_unique UNIQUE (user_id, brand_id);

ALTER TABLE favorite_products
    ADD CONSTRAINT favorite_products_user_product_unique UNIQUE (user_id, product_id);

ALTER TABLE favorite_airports
    ADD CONSTRAINT favorite_airports_user_airport_unique UNIQUE (user_id, airport_id);