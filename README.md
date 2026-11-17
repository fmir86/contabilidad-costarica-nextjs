# Contabilidad Costa Rica

Marketing site for an accounting firm in Costa Rica (contabilidadcostarica.net), built with Next.js 14 (App Router), TypeScript, Tailwind CSS and SCSS modules. Blog posts and service pages are Markdown files rendered at build time.

## Requirements

- Node.js 20 or newer
- npm (the repo ships a `package-lock.json`)

## Getting started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`. The site builds and every page renders without any of them. They are only used by the API routes behind the forms:

- `SMTP_*` and `RECIPIENT_EMAIL`: contact forms (`/api/sendEmail`)
- `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID`: newsletter signup (`/api/subscribe`)

Without them those routes return a 500 error.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build (also runs lint and type checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint with `next/core-web-vitals` |
| `npm run test:sitemap` | Prints the generated sitemap entries as a quick check |

## Content

- `blogposts/*.md`: blog posts, served at `/blog/[slug]`
- `servicios/*.md`: service pages, served at `/servicios/[slug]`
- `src/app/sitemap.ts`: sitemap built from the static pages plus both folders (see `SITEMAP_GUIDE.md`)

To add a post or service, copy an existing Markdown file in the matching folder and keep its front matter fields. `EXAMPLE_NEW_CATEGORY.md` walks through adding a whole new content type to the site and sitemap.
