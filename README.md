# dft
Duty Hunter — Duty Free Tracker

Duty Hunter is a web app for tracking duty-free products spotted at airport stores around the world. Users can log in, report a "sighting" (a product seen at a specific store), and browse what others have found.

## Tech stack

- **Frontend:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
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
dutyhunter/  
├── src/  
│   ├── app/                # Next.js App Router pages
│   │   ├── signup/  
│   │   ├── login/  
│   │   └── sightings/new/  
│   ├── components/       # Shared React components (Navbar, Combobox, etc.)  
│   └── lib/
│       └── supabase/     # Supabase client setup  
└── ...

db/
├── schema/                  # CREATE TABLE statements, constraints, triggers  
├── policies/                 # Row Level Security policies, one file per table  
├── grants/                   # Role-level GRANT statements  
├── seeds/                    # Reference data (airports, brands, categories, products)  
└── README.md

## Getting started

1. Clone the repo and `cd dutyhunter`
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase project URL and anon key
4. Run the database setup scripts in `db/` (schema → grants → policies → seeds, in that order)
5. Run the dev server: `npm run dev`
6. Visit `localhost:3000`

## Database setup order

When setting up a fresh Supabase project, run the SQL files in this order:

1. `db/schema/01_tables.sql`
2. `db/schema/02_constraints.sql`
3. `db/schema/03_triggers.sql`
4. `db/grants/grants.sql`
5. `db/policies/*.sql`
6. `db/seeds/*.sql` (optional — sample/reference data)

## Status

Early development. Currently working: signup, login, session-aware navbar, and sighting submission form with searchable airport/product selectors.