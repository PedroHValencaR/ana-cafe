# Deploying Ana café

This is the production checklist for shipping the site to Vercel with Sanity as
the CMS. The app needs no extra build tooling: Vercel detects Next.js, and the
only external service is Sanity.

---

## 1. Finish the Sanity project

1. Create a project at https://www.sanity.io/manage (dataset `production`).
2. Copy the **Project ID** from **Project settings → API settings**.
3. Put it in `.env.local` (never commit this file):

   ```dotenv
   NEXT_PUBLIC_SANITY_PROJECT_ID="abc123xy"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2025-02-19"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   SANITY_REVALIDATE_SECRET="a-long-random-string"
   ```

4. Run `npm run dev` and open `/studio`. Sign in, then create at least one
   **Category** and one **Post** so the feed and category routes have content.

Generate a strong webhook secret (PowerShell):

```powershell
-join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Maximum 256) })
```

Copy the same value into Vercel later.

## 2. Configure Sanity CORS

**Sanity Manage → API → CORS origins → Add CORS origin**

| Origin                        | Allow credentials |
| ----------------------------- | ----------------- |
| `http://localhost:3000`       | Yes               |
| `https://your-site.vercel.app`| Yes               |
| `https://your-domain.com`     | Yes               |

- **Allow credentials** is required for Studio authentication.
- For Studio on preview deployments, add `https://*.vercel.app` (Sanity
  supports wildcard subdomains) or the specific preview URL.

## 3. Create the revalidation webhook

The site caches Sanity content with `'use cache'`. A webhook clears that cache
when editors publish, so changes appear immediately.

**Sanity Manage → API → Webhooks → Create webhook**

| Field            | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| Name             | `Vercel cache revalidation`                                  |
| URL              | `https://your-site.vercel.app/api/revalidate`                |
| Dataset          | `production`                                                 |
| Trigger on       | Create, Update, Delete                                       |
| Filter           | `_type in ["post", "category", "author"]`                    |
| Projection       | `{_type}`                                                    |
| API version      | `2025-02-19`                                                 |
| HTTP headers     | `sanity-webhook-secret: <SANITY_REVALIDATE_SECRET>`          |

`POST /api/revalidate` returns `401` if the header is missing or wrong and
`200 {"revalidated":true,"tags":["post","category"]}` when it succeeds. The
webhook body is ignored — only the header is checked.

## 4. Push to GitHub

The repository is already initialized. From the project root:

```bash
git add .
git commit -m "Build Ana café frontend and category pages"

# Optional: use "main" instead of "master"
git branch -M main

git remote add origin https://github.com/<you>/ana-cafe.git
git push -u origin main
```

Before pushing, confirm secrets are ignored:

```bash
git status --short
# .env.local must NOT appear — .gitignore already excludes .env*
```

`DEPLOYMENT.md` and `.env.example` are safe to commit. Never commit real
secrets.

## 5. Import the project into Vercel

1. Go to https://vercel.com/new and import the GitHub repository.
2. Framework preset: **Next.js** (auto-detected).
3. Root directory: repository root.
4. Build command: `npm run build` (default).
5. Output directory: `.next` (default).
6. Node.js version: **22.x** (Next.js 16 requires Node `>=20.9.0`; pinned in
   `package.json` via `engines`).

### Environment variables

Add these under **Project → Settings → Environment Variables** for
**Production**, **Preview**, and **Development**:

| Variable                        | Example                          | Notes |
| ------------------------------- | -------------------------------- | ----- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abc123xy`                       | Public, required |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production`                     | Public |
| `NEXT_PUBLIC_SANITY_API_VERSION`| `2025-02-19`                     | Public |
| `NEXT_PUBLIC_SITE_URL`          | `https://your-site.vercel.app`   | Public, **no trailing slash** |
| `SANITY_REVALIDATE_SECRET`      | a long random string             | Server-only, required for the webhook |

Notes:

- **`NEXT_PUBLIC_SITE_URL` is baked into the build.** It powers canonical URLs,
  Open Graph tags, `robots.txt`, and the sitemap. Set the final production URL
  before the first production deploy, or change it and redeploy.
- No Sanity read/write token is needed: content is read with the public
  `published` perspective. Keep it that way — never expose a token with a
  `NEXT_PUBLIC_` prefix.
- `SANITY_REVALIDATE_SECRET` must match the webhook header exactly. If you add
  or change it in Vercel, redeploy so the route handler picks it up.

## 6. After the first deploy

Replace the placeholder domain in these places, then verify:

1. `NEXT_PUBLIC_SITE_URL` in Vercel → redeploy.
2. Sanity CORS origin for the production domain.
3. Sanity webhook URL (only needed if the deployment URL changed).

Smoke tests:

```text
GET  /                       → 200, hero + latest posts
GET  /category               → 200, category cards
GET  /category/<slug>        → 200, filtered posts
GET  /post/<slug>            → 200, article body
GET  /studio                  → 200, Studio loads after login
GET  /robots.txt              → 200, sitemap URL present
GET  /sitemap.xml             → 200, posts and categories listed
POST /api/revalidate          → 200 with correct header, 401 otherwise
```

Test the webhook directly:

```bash
curl -i -X POST https://your-site.vercel.app/api/revalidate \
  -H "sanity-webhook-secret: <your-secret>"
```

Check that publishing a post updates the live site within seconds. Also run the
webhook's **Delivery log** in Sanity if content does not refresh.

## 7. How caching behaves in production

- `cacheLife("days")` sets a 1 day revalidation window and a 1 week expiry for
  cached Sanity queries.
- The webhook invalidates the `post` and `category` tags immediately.
- Post and category routes prerender known slugs at build time; slugs published
  later are rendered on first request and then cached — no redeploy required.
- `useCdn: true` is enabled for production reads. Sanity's CDN can serve a
  published document up to ~60 seconds stale after cache invalidation. For
  instant reads, set `useCdn: false` in `sanity/lib/client.ts` (higher API
  traffic).

## 8. Optional: custom domain

1. Vercel → **Settings → Domains** → add `your-domain.com`.
2. Point DNS as instructed by Vercel.
3. Update `NEXT_PUBLIC_SITE_URL` to `https://your-domain.com` and redeploy.
4. Add the domain to Sanity CORS and update the webhook URL if it changed.

## Troubleshooting

| Symptom | Likely cause / fix |
| ------- | ------------------ |
| Journal shows the empty state in production | Project ID missing or wrong in Vercel, or all posts are drafts. Publish content, check the env var, redeploy. |
| Studio says "Project not found" | Wrong project id, or the deployed origin is missing from Sanity CORS. |
| Webhook returns 401 | Header name/value mismatch, or `SANITY_REVALIDATE_SECRET` is not set in Vercel. Redeploy after fixing. |
| Published changes take up to a day | Webhook is not firing. Check Sanity **Webhook → Deliveries**, and the filter. |
| Sanity images are broken | Sanity hostname is already allowed in `next.config.ts`; verify the project id and that the image asset finished uploading. |
| Canonical/OG URLs point to localhost | `NEXT_PUBLIC_SITE_URL` was not set when the build ran. Update it and redeploy. |
| Studio is indexed by Google | It should not be: `robots.txt` disallows `/studio` and the Studio page sets `robots: noindex`. Verify on the live site. |
