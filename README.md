# dft
Duty Hunter — Duty Free Tracker

Duty Hunter is a web app for tracking duty-free products spotted at airport stores around the world. Users can log in, report a "sighting" (a product seen at a specific store), browse products/airports, favorite what they care about, and see a feed of what others have found.

## Tech stack

- **Frontend:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Leaflet + OpenStreetMap
- **Internationalization:** next-intl (en, es, fr, it) — `dft/helpers/translations.py` is the single source of truth for all translation strings; regenerates the JSON message files on each run
- **Backend / API:** Supabase
- **Database:** Supabase Postgres
- **Authentication:** Supabase Auth (signup, login, email confirmation, password reset)
- **File storage:** Supabase Storage — `sighting-photos` (public) and `product-images`/`reference-photos` (public) buckets
- **Hosting:** Vercel
- **Source control:** GitHub
- **Domain:** dft.iesepulveda.com

## Core data model

The app follows this relationship chain:
Airport
→ Store
→ Sighting
→ Product
→ Brand
→ Category

A user reports a sighting: a specific product, seen at a specific store, inside a specific airport. Sightings may optionally include notes and photos. Users can favorite airports, products, and brands.

## Project structure  
```
dutyhunter/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   └── [locale]/          # locale-prefixed routes (en, es, fr, it)
│   │       ├── layout.tsx     # locale layout, NextIntlClientProvider
│   │       ├── page.tsx       # landing/welcome page
│   │       ├── home/          # sightings feed — default post-login landing page
│   │       ├── login/
│   │       ├── signup/
│   │       ├── check-email/
│   │       ├── auth/confirm/  # email confirmation landing page
│   │       ├── forgot-password/
│   │       ├── reset-password/
│   │       ├── profile/edit/
│   │       ├── airports/
│   │       │   ├── page.tsx       # list view + search + favorites
│   │       │   ├── map/            # Leaflet map view + favorites
│   │       │   └── [id]/            # sightings at one airport
│   │       ├── products/          # grid view + search + favorites + images
│   │       └── sightings/new/
│   ├── components/       # Shared React components (Navbar, Combobox, AirportsMap, etc.)
│   ├── i18n/              # next-intl routing, navigation, request config
│   ├── messages/          # Translation JSON files (en.json, es.json, fr.json, it.json) — generated, don't hand-edit
│   └── lib/
│       ├── supabase/          # Supabase client setup
│       ├── emailTypoCheck.ts   # flags common email domain typos at signup
│       └── disposableEmailDomains.ts  # blocks known temporary/burner email domains
├── scripts/
│   └── check-i18n.js      # Verifies all locale files have matching keys (runs before build)
├── proxy.ts                # next-intl locale detection (formerly middleware.ts)
└── ...

db/
├── schema/                # CREATE TABLE statements, constraints, triggers
├── policies/               # Row Level Security policies, one file per table
├── grants/                 # Role-level GRANT statements
├── seeds/                  # Reference data (airports, brands, categories, products)
└── README.md

dft/helpers/
├── translations.py        # source of truth for all i18n strings; regenerates JSON files
└── populate_airport_geo.py  # cross-references airports against OurAirports data for lat/long
```
## Getting started

1. Clone the repo and `cd dutyhunter`
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase project URL and anon key
4. In the Supabase Dashboard, create these **Storage buckets** (all public): `sighting-photos`, `product-images` (or `reference-photos`)
5. Run the database setup scripts in `db/` (schema → grants → policies → seeds, in that order)
6. Run the dev server: `npm run dev`
7. Visit `localhost:3000`

## Database setup order

When setting up a fresh Supabase project, run the SQL files in this order:

1. `db/schema/*.sql` (tables, constraints, triggers, in numbered order)
2. `db/grants/grants.sql`
3. `db/policies/*.sql`
4. `db/seeds/*.sql` (optional — sample/reference data)

Note: grants and RLS policies are two separate layers — a policy alone doesn't grant table access if the role was never explicitly granted permission. When debugging a "permission denied" error, check `information_schema.role_table_grants` in addition to `pg_policies`.

## Internationalization

The app auto-detects the visitor's browser language and routes them to a locale-prefixed URL (`/en`, `/es`, `/fr`, `/it`), powered by `next-intl`. All translation strings live in `dft/helpers/translations.py` as a Python dict — running `python3 translations.py` regenerates all four `src/messages/*.json` files from it. Before every build, `npm run check:i18n` verifies all locale files have matching keys, so a missing translation fails the build instead of shipping broken text.

## Status

Actively in development. Currently working:
- Full auth flow: signup, login, email confirmation, password reset, show/hide password, disposable/typo email checks
- Sightings: submission form with searchable airport/product selectors, photo upload with client-side compression, photos displayed in feed and airport pages
- Sightings feed (default post-login landing page), most recent first
- Airports: list view with search, map view (Leaflet), favoriting, per-airport sightings page
- Products: grid view with search, reference images, favoriting
- Profile editing (display name)
- Full internationalization (English, Spanish, French, Italian) with automatic browser-language detection

## TODO
- [ ] Pick a product and load all sightings
- [ ] Brand favorites UI (schema exists, no page yet)
- [ ] Set up Resend (or similar SMTP provider) for transactional emails — Supabase's default email sending has a low rate limit not suitable for production