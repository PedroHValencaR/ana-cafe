# Ana café

A cozy, editorial blog about coffee rituals, seasonal recipes, and slow living.
Built with the Next.js App Router, Tailwind CSS v4, and Sanity CMS.

## Stack

- **Next.js 16** (App Router, Server Components, Cache Components)
- **React 19**
- **Tailwind CSS v4** (CSS-first theme in `app/globals.css`)
- **Sanity 6** with an embedded Studio at `/studio`
- **TypeScript**

## Getting started

```bash
npm install
```

Create your local environment file and fill in your Sanity project details:

```powershell
Copy-Item .env.example .env.local
```

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-02-19"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
SANITY_REVALIDATE_SECRET="a-long-random-string"
```

Then run the dev server:

```bash
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio

Until a real Sanity project id is configured, the journal and category pages
show a friendly empty state and the Studio reports "Project not found".

## Content model

| Document   | Purpose                                                       |
| ---------- | ------------------------------------------------------------- |
| `post`     | Title, slug, excerpt, main image, published date, Portable Text body, author, categories |
| `author`   | Name, role, bio, portrait                                     |
| `category` | Title, slug, description — used by `/category/[slug]`         |

Portable Text supports headings, lists, quotes, links, and inline images with
captions.

## Routes

| Route               | Description                                       |
| ------------------- | ------------------------------------------------- |
| `/`                 | Hero, latest posts, about section                 |
| `/post/[slug]`      | Article page with Portable Text body              |
| `/category`         | Category index                                    |
| `/category/[slug]`  | Posts filtered by category                        |
| `/studio`           | Embedded Sanity Studio                            |
| `/api/revalidate`   | Secret-protected webhook that clears cached data  |
| `/sitemap.xml`      | Generated from posts and categories               |
| `/robots.txt`       | Allows the site, blocks `/studio` and `/api/`     |

## Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start the dev server           |
| `npm run build`     | Production build               |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | Run ESLint                     |
| `npm run typecheck` | Run TypeScript without emitting |

## Caching

Content queries live in `sanity/lib/data.ts` and use `'use cache'` with
`cacheLife("days")` and tags (`post`, `category`, `post:<slug>`,
`category:<slug>`). Publishing in Sanity calls the webhook at
`/api/revalidate`, which clears those tags immediately. Without the webhook,
changes can take up to a day to appear.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full Vercel + Sanity checklist.
