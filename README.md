# 🎂 Birthdayly

A modern, full-stack birthday reminder app — never miss a special day again.

## Features

* Email/password authentication with Supabase Auth
* Add, edit, and delete birthdays
* Optional birth year, category, and notes
* Automatic "days until next birthday" calculation
* Leap year and February 29 handling
* Correct December → January birthday sorting
* Search birthdays
* Filter by This Month / Next 3 Months
* Dashboard birthday statistics
* Today's birthday celebration state
* Calendar view
* Profile management
* Responsive desktop and mobile navigation
* Shared onboarding background
* Light/Dark theme preference
* Notification preference
* Smooth animations with Framer Motion

## Tech Stack

* Next.js 16
* TypeScript
* React
* Tailwind CSS
* Supabase
* PostgreSQL
* Supabase Auth
* Row Level Security (RLS)
* Framer Motion
* date-fns
* Lucide React
* Vercel

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bidi-sha/birthdayly.git
cd birthdayly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=REMOVED
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=REMOVED
```

### 4. Set up Supabase

Open your Supabase project's SQL Editor and run:

```text
supabase/schema.sql
```

This creates the required database structure, indexes, Row Level Security policies, and triggers.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

| Variable                               | Description                          |
| -------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`             | Your Supabase project URL            |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase public/publishable key |

Never commit your `.env.local` file or private Supabase credentials to GitHub.

## Database

The database schema is located at:

```text
supabase/schema.sql
```

The application uses Supabase PostgreSQL with Row Level Security to ensure users can access only their own birthday data.

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   └── onboarding/
├── components/
│   ├── birthday/
│   ├── dashboard/
│   ├── layout/
│   ├── providers/
│   └── ui/
├── lib/
│   ├── supabase/
│   └── birthday-utils.ts
└── types/
```

## Screenshots

Screenshots can be added here after the final deployment.

## Resume Highlights

* Built a full-stack birthday tracker using Next.js, TypeScript, and Supabase with secure authentication, Row Level Security, and PostgreSQL CRUD operations.
* Designed custom birthday date-calculation logic handling leap years, February 29 edge cases, and December → January year-boundary sorting.
* Translated a complete multi-screen Figma design into a responsive React application using Tailwind CSS and reusable components.
* Implemented Next.js App Router, Server Components, Server Actions, authentication, loading states, toast feedback, modals, and responsive navigation.
* Built reusable business logic and presentation components to keep the application maintainable and easy to extend.
* Implemented calendar, profile, search, filtering, theme preferences, and notification preferences across the application.

## Deployment

Birthdayly is designed to be deployed with Vercel.

After connecting the GitHub repository to Vercel, add the required Supabase environment variables in the Vercel project settings.

After deployment, configure the production URL in:

```text
Supabase Dashboard
→ Authentication
→ URL Configuration
```

Add the Vercel production URL to the appropriate Site URL and Redirect URLs.



