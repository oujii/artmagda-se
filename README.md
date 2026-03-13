# Website Template

Next.js 16 + Sanity Studio v5 monorepo template for Swedish small business websites.

## Features

- **Next.js 16** (App Router, React 19, TypeScript, Tailwind CSS v4)
- **Sanity Studio v5** with visual editing, orderable documents, AI assist
- **Contact form** via Resend
- **Stripe Checkout** (workshops, flower delivery, gift cards)
- **Google Translate** integration (EN toggle in header)
- **SEO**: JSON-LD structured data, Open Graph, sitemap, robots.txt
- **CMS-driven**: Events, products, services, settings (opening hours, contact info)

## Quick Start

See [TEMPLATE_SETUP.md](./TEMPLATE_SETUP.md) for full setup instructions.

```bash
# 1. Install dependencies
npm install

# 2. Copy env files
cp frontend/.env.example frontend/.env.local
cp studio/.env.example studio/.env

# 3. Fill in your Sanity project ID, tokens, etc.

# 4. Start development
npm run dev
# Frontend: http://localhost:3000
# Studio:   http://localhost:3333
```

## Project Structure

```
├── frontend/          # Next.js app
│   ├── app/           # Pages and API routes
│   ├── sanity/        # GROQ queries, client config
│   └── public/        # Static assets (logo, images)
├── studio/            # Sanity Studio
│   └── src/
│       ├── schemaTypes/  # Document & singleton schemas
│       └── structure/    # Studio navigation
└── package.json       # Monorepo root (npm workspaces)
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + studio in parallel |
| `npm run build` | Build frontend (runs typegen first) |
| `npm run type-check` | TypeScript check both workspaces |
| `npm --workspace frontend run sanity:typegen` | Regenerate types after schema changes |
