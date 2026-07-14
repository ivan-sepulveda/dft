-- ============================================================
-- ADD GEOLOCATION COLUMNS TO AIRPORTS
-- Needed for map view (Leaflet + OpenStreetMap)
-- ============================================================
ALTER TABLE airports
    ADD COLUMN latitude NUMERIC(9, 6),
    ADD COLUMN longitude NUMERIC(9, 6);