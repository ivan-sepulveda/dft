-- ============================================================
-- SEED: STORES
-- Reproduces the current live stores table for fresh setups.
-- Uses iata_code for airport lookups (more reliable than
-- airport_name, which can have formatting mismatches).
-- ============================================================

-- ------------------------------------------------------------
-- SFO — San Francisco International Airport
-- Verified against flysfo.com/passengers/shop-dine-relax
-- (all locations are DFS-operated).
-- ------------------------------------------------------------
INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DFS Duty Free', 'A', NULL
FROM airports a WHERE a.iata_code = 'SFO';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DFS Duty Free', 'G', NULL
FROM airports a WHERE a.iata_code = 'SFO';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DFS Duty Free', 'G', 'G4'
FROM airports a WHERE a.iata_code = 'SFO';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DFS Duty Free', '2', 'A8-A11'
FROM airports a WHERE a.iata_code = 'SFO';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DFS Duty Free', '2', 'Retail Street'
FROM airports a WHERE a.iata_code = 'SFO';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DFS Watches, Jewelry & Accessories', 'A', 'A1'
FROM airports a WHERE a.iata_code = 'SFO';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DFS Watches, Jewelry & Accessories', 'G', 'G1'
FROM airports a WHERE a.iata_code = 'SFO';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DFS Sunglasses and Watches', 'A', 'A5'
FROM airports a WHERE a.iata_code = 'SFO';

-- ------------------------------------------------------------
-- IAH — George Bush Intercontinental Airport
-- ------------------------------------------------------------
INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Dufry Tax & Duty Free', 'E', 'E9'
FROM airports a WHERE a.iata_code = 'IAH';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Dufry Tax & Duty Free', 'E', 'E24'
FROM airports a WHERE a.iata_code = 'IAH';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'iS Duty Free', 'D', 'D7'
FROM airports a WHERE a.iata_code = 'IAH';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'iS Duty Free', 'A', 'A8'
FROM airports a WHERE a.iata_code = 'IAH';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'iS Duty Free', 'A', NULL
FROM airports a WHERE a.iata_code = 'IAH';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'iS Duty Free', 'D', 'D1'
FROM airports a WHERE a.iata_code = 'IAH';

-- ------------------------------------------------------------
-- ATL — Hartsfield-Jackson Atlanta International Airport
-- ------------------------------------------------------------
INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Duty Free Americas', 'E', NULL
FROM airports a WHERE a.iata_code = 'ATL';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Aldesasa Duty Free', 'T', NULL
FROM airports a WHERE a.iata_code = 'ATL';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Duty Free', 'T', NULL
FROM airports a WHERE a.iata_code = 'ATL';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Duty Free Americas', 'F', NULL
FROM airports a WHERE a.iata_code = 'ATL';

-- ------------------------------------------------------------
-- GDL — Miguel Hidalgo y Costilla Guadalajara International Airport
-- ------------------------------------------------------------
INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Dufry', '', NULL
FROM airports a WHERE a.iata_code = 'GDL';

-- ------------------------------------------------------------
-- HKG — Hong Kong International Airport
-- ------------------------------------------------------------
INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Gate 13-21'
FROM airports a WHERE a.iata_code = 'HKG';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Gate 1'
FROM airports a WHERE a.iata_code = 'HKG';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Gate 5'
FROM airports a WHERE a.iata_code = 'HKG';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Gate 201-230'
FROM airports a WHERE a.iata_code = 'HKG';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Gate 36'
FROM airports a WHERE a.iata_code = 'HKG';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Gate 27'
FROM airports a WHERE a.iata_code = 'HKG';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Sky Bridge'
FROM airports a WHERE a.iata_code = 'HKG';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Transfer Desk E2'
FROM airports a WHERE a.iata_code = 'HKG';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'DUTY ZERO by cdf', 'T1', 'Before Immigration Hall'
FROM airports a WHERE a.iata_code = 'HKG';

-- ------------------------------------------------------------
-- EWR — Newark Liberty International Airport
-- ------------------------------------------------------------
INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, '3Sixty Duty Free & More', 'B', 'B44'
FROM airports a WHERE a.iata_code = 'EWR';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, '3Sixty Duty Free & More', 'B', 'B62'
FROM airports a WHERE a.iata_code = 'EWR';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, '3Sixty Duty Free & More', 'B', 'Security Checkpoint'
FROM airports a WHERE a.iata_code = 'EWR';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, '3Sixty Duty Free & More', 'B', 'B51'
FROM airports a WHERE a.iata_code = 'EWR';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, '3Sixty Duty Free and More', 'B', 'B60'
FROM airports a WHERE a.iata_code = 'EWR';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Newark Duty Free Shops', 'C', 'C120'
FROM airports a WHERE a.iata_code = 'EWR';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Newark Duty Free Shops', 'C', 'C107'
FROM airports a WHERE a.iata_code = 'EWR';

INSERT INTO stores (airport_id, store_name, terminal, nearest_gate)
SELECT a.id, 'Newark Duty Free Shops', 'C', 'C81'
FROM airports a WHERE a.iata_code = 'EWR';
