# birthdayly

A birthday reminder app that helps you track important dates, upload photos and memories, and never miss a celebration again.

**Live demo:** https://digital-closet-five.vercel.app/

## Features

- Email/password and Google authentication
- Add, edit, and delete birthdays with optional birth year, category, and notes
- Automatic days-until-birthday calculation with correct handling of leap years and year-end rollovers
- Search and filter by upcoming, this month, or next 3 months
- Calendar view with birthdays mapped to their dates
- Profile pictures and a photos/memories gallery for each person
- Dashboard with stats and a live "today's birthday" celebration state
- Fully responsive: sidebar on desktop, bottom navigation on mobile

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Row Level Security)
- **Animation:** Framer Motion
- **Deployment:** Vercel

## Architecture Notes

- **Row Level Security everywhere.** Every table (birthdays, memories) and every Storage object is scoped to `auth.uid()`, so one user's data is structurally unreachable by another — enforced at the database layer, not just in application code.
- **Server Actions for all mutations.** Add/edit/delete for birthdays and memories run as Next.js Server Actions, keeping write logic off the client and avoiding a separate API layer.
- **Custom birthday-date engine.** A dedicated utility resolves each birthday's next occurrence, correctly handling leap years, February 29 (falls back to February 28 in non-leap years), and sorting across the December → January boundary.
- **Route-protected, reusable component architecture.** Middleware and layout-level checks guard authenticated routes, while a shared UI kit (Button, Modal, Input, Card) keeps the design consistent across every screen.

## Running Locally

```bash
git clone https://github.com/bidi-sha/birthdayly.git
cd birthdayly
npm install
```

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Use your own Supabase project's values here — never commit this file (it's already git-ignored).

```bash
npm run dev
```

## Screenshots

_(add screenshots here — dashboard, birthday details, calendar, profile)_