# Template Setup Guide

Step-by-step guide to start a new website from this template.

## 1. Create Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project
2. Note the **Project ID** and create a **dataset** (usually `production`)
3. Create an API **read token** under Settings > API > Tokens

## 2. Configure Environment

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_SITE_URL="https://www.yoursite.se"
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-09-25"
SANITY_API_READ_TOKEN="your-read-token"
RESEND_API_KEY="your-resend-key"
CONTACT_TO_EMAIL="info@yoursite.se"
CONTACT_FROM_EMAIL="noreply@yoursite.se"
STRIPE_SECRET_KEY="your-stripe-key"
```

### Studio (`studio/.env`)
```env
SANITY_STUDIO_PROJECT_ID="your-project-id"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_PREVIEW_URL="https://www.yoursite.se"
```

## 3. Search and Replace TODOs

All business-specific content is marked with `TODO:`. Search the codebase:

```bash
grep -r "TODO:" --include="*.tsx" --include="*.ts" frontend/ studio/
```

### Key files to update:

| File | What to change |
|------|---------------|
| `frontend/app/layout.tsx` | JSON-LD structured data (business name, address, geo coords, socials) |
| `frontend/app/page.tsx` | Hero tagline, intro text, social media links, fallback contact info |
| `frontend/app/components/Header.tsx` | Logo alt text, Google Translate domain |
| `frontend/app/components/Footer.tsx` | Business description, social links, company name, org number |
| `frontend/app/om-oss/page.tsx` | About page content, team photo, Google Maps embed |
| `frontend/app/opengraph-image.tsx` | OG image alt text and tagline |
| `frontend/app/event/[slug]/page.tsx` | Event JSON-LD location data |
| `frontend/app/kontakt/layout.tsx` | Contact meta description |
| `frontend/app/butik/page.tsx` | Shop meta description |
| `frontend/app/tjanster/page.tsx` | Services meta description |
| `frontend/tailwind.config.ts` | Brand colors |

## 4. Brand & Design

Update colors in `frontend/tailwind.config.ts`:
```ts
colors: {
  brand: {
    DEFAULT: '#476949',  // Primary
    light: '#B6CBB1',    // Light accent
    dark: '#355038',     // Dark (hero, footer, buttons)
  },
  accent: {
    DEFAULT: '#B6CBB1',
    pop: '#E8BEC0',      // Highlight color
  },
}
```

Replace logos and images in `frontend/public/`:
- `logo_top.png` — Header logo
- `images/logo.webp` — Footer/hero logo
- `images/logo-og.png` — Open Graph image logo

Fonts are configured in `frontend/app/layout.tsx` (currently Josefin Sans + IBM Plex Mono).

## 5. Static Assets

Replace or remove:
- `frontend/public/video.mp4` — Hero background video
- `frontend/public/images/` — All placeholder images

## 6. Deploy

### Frontend (Vercel)
1. Connect your repo to Vercel
2. Set root directory to `frontend`
3. Add all env vars from `.env.local`

### Studio (Sanity)
1. Deploy schemas: `cd studio && npx sanity deploy`
2. Or host on Netlify/Vercel

### Post-deploy
1. Update `NEXT_PUBLIC_SITE_URL` and `SANITY_STUDIO_PREVIEW_URL` with real URLs
2. Add CORS origin in Sanity: Settings > API > CORS origins

## 7. Initialize Git

```bash
git init
git add .
git commit -m "Initial commit from template"
```

## Sanity Schemas Included

| Type | Kind | Description |
|------|------|-------------|
| `settings` | Singleton | Site title, hero video, opening hours, contact info, assortment cards |
| `servicesPage` | Singleton | Services page content |
| `event` | Document | Events with date, price, booking, Stripe integration |
| `product` | Document | Products with Stripe, pre-orders, tags |
| `page` | Document | Generic CMS pages with pageBuilder |
| `post` | Document | Blog posts |
| `person` | Document | Authors |

## API Routes Included

| Route | Description |
|-------|-------------|
| `/api/contact` | Contact form (Resend) |
| `/api/newsletter` | Newsletter signup (Resend) |
| `/api/checkout` | Stripe Checkout session creation |
| `/api/draft-mode/enable` | Sanity visual editing |
