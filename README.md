# dft
Duty Hunter — Duty Free Tracker

Duty Hunter is a web app for tracking duty-free products spotted at airport stores around the world. Users can log in, report a "sighting" (a product seen at a specific store), and browse what others have found.

## Tech stack

- **Frontend:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl (en, es, fr, it)
- **Backend / API:** Supabase
- **Database:** Supabase Postgres
- **Authentication:** Supabase Auth
- **File storage:** Supabase Storage (planned — for sighting photos)
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


A user reports a sighting: a specific product, seen at a specific store, inside a specific airport. Sightings may optionally include notes and photos.

## Project structure  
```
dutyhunter/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # (if present) root layout
│   │   ├── globals.css
│   │   └── [locale]/          # locale-prefixed routes (en, es, fr, it)
│   │       ├── layout.tsx     # locale layout, NextIntlClientProvider
│   │       ├── page.tsx       # landing/welcome page
│   │       ├── home/
│   │       ├── login/
│   │       ├── signup/
│   │       ├── check-email/
│   │       └── sightings/new/
│   ├── components/       # Shared React components (Navbar, Combobox, etc.)
│   ├── i18n/              # next-intl routing, navigation, request config
│   ├── messages/          # Translation JSON files (en.json, es.json, fr.json, it.json)
│   └── lib/
│       └── supabase/     # Supabase client setup
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
```
## Getting started

1. Clone the repo and `cd dutyhunter`
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase project URL and anon key
4. In the Supabase Dashboard, create a **Storage bucket** named `sighting-photos` (private, not public)
5. Run the database setup scripts in `db/` (schema → grants → policies → seeds, in that order)
6. Run the dev server: `npm run dev`
7. Visit `localhost:3000`

## Database setup order

When setting up a fresh Supabase project, run the SQL files in this order:

1. `db/schema/01_tables.sql`
2. `db/schema/02_constraints.sql`
3. `db/schema/03_triggers.sql`
4. `db/grants/grants.sql`
5. `db/policies/*.sql` (including `storage.sql` — requires the `sighting-photos` bucket to already exist, see step 4 above)
6. `db/seeds/*.sql` (optional — sample/reference data)

## Internationalization

The app auto-detects the visitor's browser language and routes them to a locale-prefixed URL (`/en`, `/es`, `/fr`, `/it`), powered by `next-intl`. Translation strings live in `src/messages/*.json`. Before every build, `npm run check:i18n` verifies all locale files have matching keys, so a missing translation fails the build instead of shipping broken text.

## Status

Early development. Currently working: signup, login, session-aware navbar, sighting submission form with searchable airport/product selectors, photo upload with client-side compression (handles large phone camera files and iPhone HEIC conversion), and full internationalization (English, Spanish, French, Italian) with automatic browser-language detection.

## TODO
- [ ] Pick a product and load all sightings
- [ ] Pick an airport and load all sightings
- [ ] Sightings feed