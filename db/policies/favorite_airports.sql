-- ============================================================
-- ROW LEVEL SECURITY: FAVORITE_AIRPORTS
-- Users can only view, add, and remove their own favorite airports
-- ============================================================
ALTER TABLE favorite_airports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorite airports"
    ON favorite_airports FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorite airports"
    ON favorite_airports FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorite airports"
    ON favorite_airports FOR DELETE
    USING (auth.uid() = user_id);