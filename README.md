# PlantPal — Client

Frontend for PlantPal: Next.js (App Router) + TypeScript + Tailwind CSS + TanStack Query + **better-auth** client, talking to the `plantpal-server` API.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — custom design system (see `tailwind.config.ts`)
- **TanStack Query** — data fetching/caching against the Express backend
- **better-auth/react** — auth client (session cookies + JWT support), matching the server's `better-auth` setup
- **Recharts** — dashboard stats
- **lucide-react** — icons

## Setup

```bash
npm install
cp .env.local.example .env.local
# set NEXT_PUBLIC_API_URL to wherever plantpal-server is running
npm run dev
```

App runs at `http://localhost:3000`. Make sure `plantpal-server` is running first (see its own README) — this frontend has no backend of its own; every request goes to `NEXT_PUBLIC_API_URL`.

### Creating the demo login account

The Login page has a **"Fill demo login"** button that autofills:
- email: `demo@plantpal.app`
- password: `PlantPalDemo123`

For the button to actually log someone in, that account needs to exist. Create it once by signing up normally through `/register` with those exact credentials, or via curl:

```bash
curl -X POST http://localhost:5000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo User","email":"demo@plantpal.app","password":"PlantPalDemo123"}'
```

## Folder Structure

```
app/
  layout.tsx, providers.tsx, globals.css
  page.tsx                  # home
  plants/page.tsx           # explore
  plants/[id]/page.tsx      # details
  plants/add/page.tsx       # protected — add listing (+ AI care guide generator)
  plants/manage/page.tsx    # protected — manage own listings
  identify/page.tsx         # protected — AI plant identifier
  login/, register/         # auth pages
  dashboard/page.tsx        # protected — stats (Recharts)
  about/, contact/, blog/, privacy/, terms/
components/
  layout/                   # Navbar, Footer
  ui/                       # Button, Field (Input/Textarea/Select), Badge, Skeleton, RatingStars, VineDivider
  plants/                   # PlantCard, PlantGrid, PlantFiltersBar, Pagination, ReviewsSection
  auth/                     # ProtectedRoute, DemoLoginButton
  ai/                       # CareGuideGenerator, PlantIdentifier
  home/                     # Hero, Categories, FeaturedPlants, AIHighlight, HowItWorks, Stats, Testimonials, Newsletter
lib/
  auth-client.ts            # better-auth React client
  api.ts                    # typed fetch wrapper (sends credentials to the server)
  types.ts, utils.ts
hooks/
  usePlants.ts, useReviews.ts, useAI.ts   # TanStack Query hooks
```

## Design System

Defined in `tailwind.config.ts` — a nursery/botanical palette rather than a generic template look:

| Token | Hex | Use |
|---|---|---|
| `canopy` | `#24402A` | Primary — headers, nav, primary buttons |
| `moss` | `#5B7F5E` | Supporting green — icons, accents |
| `clay` | `#B5502B` | Accent — price, secondary CTAs, ratings |
| `paper` | `#F1F2EA` | Background |
| `sand` | `#E4E1D3` | Borders, muted surfaces |
| `ink` | `#1B1F17` | Text |

Typography: **Fraunces** (display/headings), **Inter** (body/UI), **IBM Plex Mono** (meta info — prices, tags, timestamps — styled like nursery plant tags). The signature visual motif is the hand-drawn "vine divider" (`components/ui/VineDivider.tsx`) used between homepage sections, and the nursery-tag-style category badges on every plant card.

## How auth works here

`lib/auth-client.ts` creates a `better-auth` client pointed at the server's `baseURL`. `credentials: "include"` is set on every request (both in the auth client and in `lib/api.ts`) so the session cookie set by the server is sent on every API call — no manual token handling needed for the common case.

`components/auth/ProtectedRoute.tsx` wraps protected pages: it reads `useSession()` and redirects to `/login` if there's no session, showing a spinner while the session is resolving.

## Connecting AI features

- **Add Plant page** (`/plants/add`) embeds `CareGuideGenerator`, which calls `POST /api/ai/care-guide` once title/category/difficulty are filled in, and drops the result into the full description field (editable before submit).
- **Identify page** (`/identify`) embeds `PlantIdentifier`, which uploads a photo (converted to base64 client-side), calls `POST /api/ai/identify`, and shows species/confidence/care tips/toxicity — with a "List this plant" button that pre-fills the Add Plant form via query params.

## Notes

- Images use `images.unsplash.com` (allow-listed in `next.config.mjs`) for realistic photography rather than placeholder content, per the "no dummy content" requirement.
- The first `npm run build` needs internet access to fetch Fraunces/Inter/IBM Plex Mono from Google Fonts (standard `next/font/google` behavior) — after that they're self-hosted from `.next/`.
