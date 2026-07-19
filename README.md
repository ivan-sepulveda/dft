# dft
Duty Hunter — Duty Free Tracker

Duty Hunter is a web app for tracking duty-free products spotted at airport stores around the world. Users can log in, report a "sighting" (a product seen at a specific store), browse products/airports/brands, favorite what they care about, and see a feed of what others have found.

## Tech stack

- **Frontend:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Leaflet + OpenStreetMap
- **Internationalization:** next-intl (en, es, fr, it) — `dft/helpers/translations.py` is the single source of truth for all translation strings (including UI copy, city names, and country names); regenerates the JSON message files on each run
- **Formatting:** Prettier (`npm run format`) — config at `.prettierrc.json`; VS Code users get format-on-save via `.vscode/settings.json`
- **Backend / API:** Supabase
- **Database:** Supabase Postgres
- **Authentication:** Supabase Auth (signup, login, email confirmation, password reset)
- **File storage:** Supabase Storage — `sighting-photos`, `product-images`/`reference-photos`, and `avatars` (all public)
- **Hosting:** Vercel
- **Source control:** GitHub (public)
- **Domain:** dft.iesepulveda.com

## Core data model

The app follows this relationship chain:
Airport
→ Store
→ Sighting
→ Product
→ Brand
→ Category

A user reports a sighting: a specific product, seen at a specific store, inside a specific airport. Sightings may optionally include notes and photos. Users can favorite airports, products, and brands, and can upload a profile picture (auto-resized to 500×500).

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
│   │       ├── profile/edit/  # display name + avatar upload
│   │       ├── airports/
│   │       │   ├── page.tsx       # list view + search (city/country aware) + favorites
│   │       │   ├── map/            # Leaflet map view + favorites
│   │       │   └── [id]/            # sightings at one airport
│   │       ├── products/
│   │       │   ├── page.tsx       # grid view + search + favorites + images
│   │       │   └── [id]/            # sightings for one product
│   │       ├── brands/            # list view + search + favorites
│   │       └── sightings/new/
│   ├── components/       # Shared React components (Navbar, Combobox, AirportsMap, etc.)
│   ├── i18n/              # next-intl routing, navigation, request config
│   ├── messages/          # Translation JSON files (en.json, es.json, fr.json, it.json) — generated, don't hand-edit
│   └── lib/
│       ├── supabase/                   # Supabase client setup
│       ├── emailTypoCheck.ts            # flags common email domain typos at signup
│       ├── disposableEmailDomains.ts     # blocks known temporary/burner email domains
│       ├── normalizeForSearch.ts          # accent/diacritic-insensitive search matching
│       ├── resizeImageToSquare.ts          # client-side canvas resize for avatar uploads
│       └── calculateAge.ts                  # 18+ check for signup (planned, see TODO)
├── scripts/
│   └── check-i18n.js      # Verifies all locale files have matching keys (runs before build)
├── .prettierrc.json
├── .prettierignore
├── .vscode/settings.json  # format-on-save for VS Code
├── .env.local.example      # committed placeholder — real .env.local is gitignored
├── proxy.ts                # next-intl locale detection (formerly middleware.ts)
└── ...

db/
├── schema/                # CREATE TABLE statements, constraints, triggers
├── policies/               # Row Level Security policies, one file per table
├── grants/                 # Role-level GRANT statements
├── seeds/                  # Reference data (airports, stores, brands, categories, products)
└── README.md

dft/helpers/
├── translations.py          # source of truth for all i18n strings (UI + city/country names); regenerates JSON files
└── populate_airport_geo.py   # cross-references airports against OurAirports data for lat/long
```
## Getting started

1. Clone the repo and `cd dutyhunter`
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase project URL and anon key
4. In the Supabase Dashboard, create these **Storage buckets** (all public): `sighting-photos`, `product-images` (or `reference-photos`), `avatars`
5. Run the database setup scripts in `db/` (schema → grants → policies → seeds, in that order)
6. Run the dev server: `npm run dev`
7. Visit `localhost:3000`

## Database setup order

When setting up a fresh Supabase project, run the SQL files in this order:

1. `db/schema/*.sql` (tables, constraints, triggers, in numbered order)
2. `db/grants/grants.sql`
3. `db/policies/*.sql`
4. `db/seeds/*.sql` (optional — sample/reference data)

Note: grants and RLS policies are two separate layers — a policy alone doesn't grant table access if the role was never explicitly granted permission. When debugging a "permission denied" error, check `information_schema.role_table_grants` in addition to `pg_policies`. This has bitten us more than once — a policy or grant written into a `.sql` file isn't live until it's actually been run against the database.

## Internationalization

The app auto-detects the visitor's browser language and routes them to a locale-prefixed URL (`/en`, `/es`, `/fr`, `/it`), powered by `next-intl`. All translation strings — UI copy, plus city and country names used for display and search — live in `dft/helpers/translations.py` as a single Python dict, organized by namespace (`nav`, `auth`, `sightings`, `locations`, `countries`, etc). Running `python3 translations.py` regenerates all four `src/messages/*.json` files from it. Before every build, `npm run check:i18n` verifies all locale files have matching keys, so a missing translation fails the build instead of shipping broken text.

City/country names not yet in the `locations`/`countries` dicts fall back gracefully to their original (usually English) value via `messages.locations?.[city] ?? city` — no crashes for untranslated entries. Search across airports/products/brands is accent-insensitive (`normalizeForSearch.ts`) and matches against both the original and translated names, so "Mexico" finds "México" and vice versa, in any locale.

## Status

Actively in development. Currently working:
- Full auth flow: signup, login, email confirmation, password reset, show/hide password, disposable/typo email checks
- Sightings: submission form with searchable airport/product selectors, photo upload with client-side compression, photos displayed in feed, airport pages, and product pages
- Sightings feed (default post-login landing page), most recent first
- Airports: list view with accent-insensitive city/country search, map view (Leaflet) with favorite-colored pins, favoriting, per-airport sightings page
- Products: grid view with search, reference images, favoriting, per-product sightings page
- Brands: list view with search and favoriting
- Profile editing: display name, avatar upload (auto-resized to 500×500)
- Full internationalization (English, Spanish, French, Italian) with automatic browser-language detection, plus translated city/country names for search and display
- Prettier formatting set up project-wide

## TODO

### High priority
- [ ] Age verification at signup (18+) — add date_of_birth field, client-side validation, and a DB-level CHECK constraint on profiles
- [ ] Set up Resend (or similar SMTP provider) for transactional emails — Supabase's default email sending has a low rate limit not suitable for production

### Medium priority
- [ ] Server-side check for disposable/typo emails at signup — current checks (emailTypoCheck.ts, disposableEmailDomains.ts) are client-side only and can be bypassed by editing the request directly
- [ ] Add a "my favorites" page across airports/brands/products
- [ ] Add error.tsx / loading.tsx / not-found.tsx
- [ ] Let users choose their language manually — locale is currently set only by browser auto-detection, with no in-app way to override it
- [ ] Apply dummy/disposable email checks to future email-change flow — no such flow exists yet, but if a profile email-change feature gets built, it needs the same isDummyEmail()/isDisposableEmail() checks signup now has

### Low priority
- [ ] Flag suspicious/low-effort email local parts (e.g. 123@gmail.com, abc@gmail.com, 0@gmail.com) — soft warning, not a hard block, since these could be real emails