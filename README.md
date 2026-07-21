# Bookmark Manager App

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)
![Better Auth](https://img.shields.io/badge/Better_Auth-latest-green?style=flat-square)
![Prisma](https://img.shields.io/badge/Prisma-v7-2D3748?style=flat-square&logo=prisma)
![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E699?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

A full-stack bookmark manager built for developers, designers, and researchers who are tired of losing links in a sea of browser bookmarks. It gives you a clean dashboard to save, tag, search, pin, and archive your saved links — with automatic metadata fetching (title, description, favicon) and AI-powered tag suggestions when you add a URL. Authenticated users get a private, persistent collection. Visitors can explore the full feature set through an interactive demo without creating an account.

**Live demo:** [bookmark-manager-ignite.vercel.app](https://bookmark-manager-ignite.vercel.app)

---

## Screenshots

![Dashboard](/src/app/opengraph-image.jpg)

---

## Features

- **Add bookmarks** with title, description, URL, and tags
- **Auto-generate metadata** — paste a URL and fetch title, description, and favicon automatically via the Microlink API
- **AI tag suggestions** — Claude Haiku generates 3–4 relevant single-word tags per bookmark
- **Search** by title with live results and contextual headings
- **Filter by tags** — select one or multiple tags from the sidebar
- **Sort** by recently added, recently visited, or most visited
- **Pin bookmarks** to keep important ones at the top
- **Archive / unarchive** to clean up without deleting
- **Delete** archived bookmarks permanently
- **Pagination** — 9 bookmarks per page
- **Visit tracking** — visit count and last visited date per bookmark
- **Duplicate detection** — prevents saving the same URL twice
- **Avatar upload** — change your profile photo via Cloudinary
- **Account management** — update name, email, password, or delete account
- **Google OAuth** — sign in with Google
- **Email verification** — new accounts require email confirmation
- **Password reset** — via email link
- **Demo mode** — full interactive demo with local state, no account needed
- **Dark / light mode** — system-aware with manual toggle
- **Responsive** — works on mobile, tablet, and desktop

---

## Built With

| Layer           | Technology                                                                       |
| --------------- | -------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions) |
| Language        | [TypeScript](https://typescriptlang.org)                                         |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)                                       |
| UI Components   | [shadcn/ui](https://ui.shadcn.com)                                               |
| Auth            | [Better Auth](https://better-auth.com) (credentials + Google OAuth)              |
| Database        | [Neon](https://neon.tech) (serverless PostgreSQL)                                |
| ORM             | [Prisma v7](https://prisma.io)                                                   |
| Forms           | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)          |
| Email           | [Nodemailer](https://nodemailer.com) + [Brevo SMTP](https://brevo.com)           |
| URL State       | [nuqs](https://nuqs.dev/)                                                        |
| Animations      | [Motion](https://motion.dev/)                                                    |
| AI              | [Anthropic Claude Haiku](https://anthropic.com) (metadata + tag generation)      |
| Image storage   | [Cloudinary](https://cloudinary.com)                                             |
| Metadata        | [Microlink API](https://microlink.io/) (favicon, title, description)             |
| Deployment      | [Vercel](https://vercel.com)                                                     |
| Package manager | [pnpm](https://pnpm.io)                                                          |

---

### Data flow

- **Auth routes** use Better Auth's `auth.api.*` methods called from server actions. The `nextCookies()` plugin ensures cookies are set correctly in server action context.
- **Protected routes** check session in `(app)/layout.tsx` via `getSession()` and redirect to `/login` if missing. No middleware — Next.js 16 uses a proxy model instead.
- **Bookmark mutations** are server actions that verify ownership against `userId` before any DB operation, then call `revalidatePath("/dashboard")` to trigger a fresh server render.
- **Demo mode** uses local React state (`useState`) in `DemoDashboard` to simulate mutations — pin, archive, and unarchive update state in memory without any DB calls. Add and delete are disabled with tooltips and toasts.
- **Search and filtering** live in `DashboardContext` (client-side) and are consumed by `BookmarkGrid` via `useDashboard()`. No additional API calls — filtering is performed on the already-fetched bookmark array.

---

## Database Schema

```prisma
model Bookmark {
  id          String        @id @default(cuid())
  title       String
  url         String
  description String?
  favicon     String?
  pinned      Boolean       @default(false)
  isArchived  Boolean       @default(false)
  visitCount  Int           @default(0)
  lastVisited DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  userId      String
  user        User          @relation(...)
  tags        BookmarkTag[]
}

model Tag {
  id        String        @id @default(cuid())
  name      String
  userId    String
  bookmarks BookmarkTag[]
  @@unique([name, userId])
}

model BookmarkTag {
  bookmarkId String
  tagId      String
  @@id([bookmarkId, tagId])
}
```

Tags use a many-to-many join table (`BookmarkTag`) so multiple bookmarks can share a tag and a bookmark can have multiple tags. Tags are scoped per user via `@@unique([name, userId])` so "JavaScript" for user A and "JavaScript" for user B are separate records.

---

## Setup Instructions

### Prerequisites

- Node.js 20+
- pnpm
- A [Neon](https://neon.tech) account (PostgreSQL)
- A [Brevo](https://brevo.com) account (transactional email)
- A [Cloudinary](https://cloudinary.com) account (avatar uploads)
- A [Google Cloud](https://console.cloud.google.com) project with OAuth credentials

### 1. Clone and install

```bash
git clone https://github.com/makogeboris/bookmark-manager-app.git
cd bookmark-manager-app
pnpm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
# Database (from Neon dashboard — Vercel integration auto-populates these)
DATABASE_URL=""
DATABASE_URL_UNPOOLED=""

# Better Auth
BETTER_AUTH_SECRET=""          # generate: npx auth secret
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Brevo SMTP (from Brevo dashboard → SMTP & API)
BREVO_USER=""                  # your Brevo SMTP login
BREVO_SMTP_KEY=""              # your Brevo SMTP key
BREVO_FROM_EMAIL=""            # verified sender email

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Anthropic (for AI tag generation)
ANTHROPIC_API_KEY=""
```

### 3. Database setup

```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
```

### 4. Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Deploy to Vercel

```bash
vercel --prod
```

Add all environment variables in your Vercel project dashboard. For production, update:

```env
BETTER_AUTH_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_BETTER_AUTH_URL="https://your-domain.vercel.app"
```

---

## Technical Decisions

**Better Auth over NextAuth** — NextAuth v5 has been in beta for over two years and was handed off to the Better Auth team in 2025 with security-patch-only maintenance. Better Auth is TypeScript-first, actively developed, and has built-in email verification, password reset, and Google OAuth without plugins.

**Server Actions over API routes** — mutations (add, edit, delete, archive, pin) use Next.js server actions rather than traditional API routes. This eliminates a layer of boilerplate and keeps the client components thinner. The `nextCookies()` plugin from Better Auth is required for server action context to correctly set session cookies.

**Prisma over raw SQL** — the bookmark schema has three-way relations (User → Bookmark → Tag via BookmarkTag). Prisma handles joins, cascading deletes, and upserts cleanly with full TypeScript types. The `prisma-client-js` generator is used over the newer `prisma-client` to avoid a Turbopack module resolution bug with custom output paths.

**Neon serverless PostgreSQL** — pairs naturally with Vercel's serverless functions. Connection pooling is handled by Neon's built-in pooler, and the Vercel integration auto-populates environment variables.

**Brevo SMTP over Resend** — Resend requires a verified custom domain for sending to external recipients, which was a blocker for this project. Brevo allows sending from any verified sender email address on their free tier (300 emails/day).

**Plain `<img>` for favicons over `next/image`** — favicons are fetched from hundreds of different external domains (microlink, google favicon API, site CDNs). Whitelisting all possible domains in `next.config.ts` is impractical, so plain `<img>` tags with `onError` fallback handlers are used instead.

**DashboardContext for client state** — search query, sort order, selected tags, and archived view toggle all live in a single React context (`DashboardContext`). This avoids prop drilling through `DashboardShell` → `Sidebar` → `BookmarkGrid` and lets any component read or update shared state with `useDashboard()`.

**Demo mode with local state** — rather than a separate demo database or seeding mechanism, the demo uses static JSON and local `useState` in `DemoDashboard`. Pin, archive, and unarchive update the in-memory array; add and delete are blocked with tooltips and toast notifications. This keeps the demo self-contained and zero-cost.

---

## My Process

1. **Design first** — built the complete marketing and dashboard UI in Next.js with Tailwind CSS and shadcn/ui before wiring any backend. This meant all layout decisions, component structure, and design tokens were locked in before auth complexity was introduced.

2. **Auth foundation** — set up Better Auth with credentials + Google OAuth, email verification, and password reset as a complete unit before any bookmark CRUD. Authentication bugs compound quickly — getting it solid first saved significant debugging time later.

3. **Database schema** — designed the Prisma schema with the full many-to-many tag relationship from the start, including the `BookmarkTag` join table. This avoided a painful schema migration midway through development.

4. **CRUD layer** — implemented server actions for all bookmark operations with ownership verification on every mutation. `revalidatePath` handles cache invalidation cleanly without client-side state synchronization.

5. **Demo mode** — built as a separate self-contained flow (`(demo)/` route group) using the same UI components as authenticated users, but with local state replacing DB calls. This ensured the demo is always in sync with the real app's UI.

6. **Polish and edge cases** — search with live filtering, dynamic headings that reflect current search/tag state, skeleton loaders, duplicate URL detection, favicon fallbacks, and mobile responsiveness were all addressed in a final pass.

---

## What I Learned

- **Better Auth's `nextCookies()` plugin is not optional** for server actions — without it, sessions are silently not set, causing login to appear to work but cookies to never be created. This was the hardest bug to diagnose.

- **Zod v4 and `@hookform/resolvers` compatibility** — Zod v4 changed its internal type structure, causing TypeScript overload errors with `zodResolver`. The fix required `@hookform/resolvers@5.1.0+` and sometimes an explicit `as Resolver<T>` cast for complex schemas.

- **Turbopack and Prisma custom output paths don't mix** — Prisma's custom `output` path in the generator config causes `@prisma/client-runtime-utils` module resolution failures in Turbopack. The fix is removing the custom output and importing from `@prisma/client` at the default location.

- **Gmail SMTP on serverless is unreliable** — Google's security systems flag SMTP connections from Vercel's IP ranges as suspicious and silently drop emails. Brevo's dedicated SMTP relay doesn't have this problem.

- **Demo UX parity requires upfront architecture decisions** — threading `isDemo` through the component tree (DashboardShell → Header → BookmarkGrid → BookmarkCard → ActionsDropdown → each action component) is straightforward if planned from the start, but painful to retrofit.

- **`useSearchParams` requires Suspense in Next.js App Router** — any component reading from `useSearchParams` causes a hydration mismatch unless wrapped in `<Suspense>`. The empty fallback causes a slow render in dev; a skeleton fallback fixes both the performance and the hydration warning.

---

## AI Collaboration

This project was built with **Claude** (Anthropic) as a pair programmer throughout the entire development process — not just for boilerplate, but for architecture decisions, debugging, and iterative problem-solving.

### How Claude was used

**Architecture and planning** — before writing code, I used Claude to plan the auth system architecture, database schema design, and component hierarchy. Claude helped identify potential pitfalls (like the `nextCookies()` requirement for Better Auth server actions) before they became bugs.

**Code generation** — Server actions, form components, context providers, and skeleton loaders were largely drafted by Claude and then adapted to fit the existing codebase. This sped up the mechanical parts significantly.

**Debugging** — Claude was invaluable for diagnosing cryptic errors. Key examples:

- `@prisma/client-runtime-utils` module not found → identified as Turbopack + custom output path conflict
- Session cookies not being set → identified the missing `nextCookies()` plugin
- Hydration mismatch on login page → traced to `useSearchParams` without Suspense
- Zod v4 + hookform resolver type errors → identified the version mismatch and exact fix

**Research** — rather than spending time hunting through documentation, I asked Claude to fetch and summarize relevant docs (Better Auth plugin API, Cloudinary signed upload flow, Brevo SMTP setup). Claude's web search capability made this faster than manual research.

### What worked well

- Diagnosing subtle bugs from error logs and stack traces — Claude was consistently accurate at identifying root causes even for library-specific issues with Better Auth, Prisma, and Brevo
- Catching hydration mismatch patterns and explaining the correct fix (`useSyncExternalStore` vs `useState + useEffect`)
- Maintaining consistency across a large codebase — remembering prop names, naming conventions, and design decisions from earlier in the project

### What didn't work well

- When I had a specific approach in mind, Claude sometimes pushed alternative patterns without fully understanding the existing codebase constraints. Being explicit helped significantly.
- **Staying current** — Claude's training has a cutoff, so for very recent library changes (Better Auth API shapes, Zod v4 breaking changes) the suggested code sometimes reflected an older API version and needed correction
- **Over-engineering** — early suggestions sometimes introduced unnecessary complexity (context providers, extra abstraction layers) that had to be simplified. The best results came from providing specific constraints upfront

### Key takeaway

Claude worked best as a **senior collaborator who writes code fast but needs good direction** — I still needed to understand the codebase deeply enough to catch errors, evaluate tradeoffs, and provide clear context. The productivity gain was substantial, but human judgment remained essential throughout.

---

## Continued Development

Features planned but not yet implemented:

- **Browser extension** — save bookmarks directly from any webpage without opening the app
- **Offline support** — PWA with service worker for offline access
- **Bulk actions** — select multiple bookmarks to archive, tag, or delete at once
- **Import / export** — import from browser bookmarks (HTML format) or export your collection
- **Keyboard shortcuts** — power-user navigation
- **Public collections** — share a read-only view of a tagged collection via a public URL

---

## Acknowledgements

Design inspiration and challenge brief provided by **[Frontend Mentor](https://www.frontendmentor.io)**

---

## Author

- Frontend Mentor - [makogeboris](https://www.frontendmentor.io/profile/makogeboris)
- Twitter - [makogeboris](https://x.com/makogeboris)
