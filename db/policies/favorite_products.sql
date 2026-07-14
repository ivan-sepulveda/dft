-- ============================================================
-- ROW LEVEL SECURITY: FAVORITE_PRODUCTS
-- Users can only view, add, and remove their own favorite products
-- ============================================================
ALTER TABLE favorite_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorite products"
    ON favorite_products FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorite products"
    ON favorite_products FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorite products"
    ON favorite_products FOR DELETE
    USING (auth.uid() = user_id);