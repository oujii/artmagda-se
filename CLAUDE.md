# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio and shop website for Magda Korotynska (illustrator & artist). Next.js 16 frontend + Sanity Studio v5 CMS, managed as an npm workspaces monorepo. Swedish only (`lang="sv"`).

## Commands

| Task | Command |
|------|---------|
| Dev (both) | `npm run dev` — frontend :3000, studio :3333 |
| Dev frontend only | `npm run dev:next` |
| Dev studio only | `npm run dev:studio` |
| Build | `npm run build` (runs typegen then `next build`) |
| Lint | `npm run lint` (ESLint on frontend) |
| Lint fix | `npm --workspace frontend run lint:fix` |
| Type-check | `npm run type-check` (both workspaces) |
| Format | `npm run format` (Prettier) |
| Regenerate types | `npm --workspace frontend run sanity:typegen` |

After changing Sanity schemas, always run typegen to update generated types.

## Architecture

**Monorepo layout** (`npm workspaces`):
- `frontend/` — Next.js 16 (App Router, React 19, TypeScript, Tailwind CSS v4)
- `studio/` — Sanity Studio v5 (standalone, not embedded)

**Frontend (`frontend/`)**:
- `app/` — App Router pages and API routes
- `app/components/` — React server/client components
- `sanity/lib/` — Sanity client, GROQ queries (`queries.ts`), types (`types.ts`), utilities
- Data fetching uses `sanityFetch` from `sanity/lib/live.ts` (Sanity Live Content API)
- Queries defined with `defineQuery` from `next-sanity` for type generation
- Visual Editing supported via draft mode (`/api/draft-mode/enable`)
- API route: `/api/contact` (Resend email)
- Fonts: Josefin Sans (serif/headings) + IBM Plex Mono (mono)

**Studio (`studio/`)**:
- `src/schemaTypes/` — Schema definitions split into `documents/`, `objects/`, `singletons/`
- `src/structure/index.ts` — Custom desk structure with orderable products and singletons
- Singletons: `settings` (ID: `siteSettings`), `aboutPage` (ID: `aboutPage`)
- Documents: `project` (portfolio), `product` (shop), `page`, `post`, `person`
- Plugins: presentation tool, orderable-document-list, unsplash, AI assist, vision

**Routing**:
- `/` — Homepage (hero, featured projects from Sanity)
- `/portfolio` — All projects grid with category filter (client-side)
- `/portfolio/[slug]` — Project detail (cover image, gallery, description)
- `/butik` — Shop (products grouped by collection, Stripe Payment Links)
- `/om-magda` — About page (bio + exhibitions from `aboutPage` singleton)
- `/kontakt` — Contact form
- `/posts/[slug]` — Blog posts
- `/[slug]` — CMS-driven pages (`page` type with pageBuilder)
- `/om-oss` — Redirects to `/om-magda`

**Sanity content model**:
- `project` — Portfolio items with category (barnbocker, kartor, tidskrifter, reklam, konst), cover image, gallery, description. `featured: true` shows on homepage.
- `product` — Shop items with productType, price, Stripe Payment Link, collection grouping, soldOut flag.
- `settings` — Site title, hero image/text, contact info (incl. Swish), social media links, footer text.
- `aboutPage` — Portrait, bio (Portable Text), exhibitions list.

**Environment variables**: Sanity project ID and dataset from env vars (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`). Studio uses `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`.

## Design

- Background: `warm` (#fff8f6) — light pinkish white
- Accent: `accent` (#f36421) — orange, used for links, buttons, hover states
- Text: stone-800/900 defaults
- Headings: font-serif (Josefin Sans)
