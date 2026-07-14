-- ============================================================
-- ROW LEVEL SECURITY: FAVORITE_BRANDS
-- Users can only view, add, and remove their own favorite brands
-- ============================================================
ALTER TABLE favorite_brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorite brands"
    ON favorite_brands FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorite brands"
    ON favorite_brands FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorite brands"
    ON favorite_brands FOR DELETE
    USING (auth.uid() = user_id);