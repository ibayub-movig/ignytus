# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ignyt is a Next.js 14 application for a purpose-driven career platform that connects job seekers with impact-driven companies. The platform includes a job finder service, company directory, and resource center.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Database Management

The project uses Supabase as the backend:
- Database migrations are in `supabase/migrations/`
- Apply migrations with `supabase db push`
- Supabase client is configured in `lib/supabase.ts`

## Architecture

### Frontend Structure
- **App Router**: Uses Next.js 14 App Router with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Components**: Reusable UI components in `components/` folder
- **Pages**: Main pages in `app/` directory following App Router conventions

### Key Features
- **Job Finder**: Multi-step form at `/tools/job-finder` that integrates with Stripe for payments
- **Company Directory**: Browse impact-driven companies
- **Job Board**: Display job listings from database
- **Blog**: MDX-powered content

### Database Schema
Main tables:
- `jobs` - Job listings with company relationships
- `companies` - Company profiles 
- `job_finder_requests` - Job finder form submissions

### Payment Integration
- Uses Stripe hosted checkout pages (no complex webhooks)
- Payment flow: form submission → database record → Stripe redirect
- Manual payment verification process documented in `STRIPE_SETUP.md`

### Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`

### API Routes
- `/api/jobs` - Fetch job listings
- `/api/job-finder-request` - Handle job finder form submissions
- `/api/companies` - Company data
- `/api/submit-resource` - Resource submissions
- `/api/subscribe` - Newsletter subscriptions

### File Structure Notes
- Use `@/*` path mapping for imports
- MDX components defined in `mdx-components.tsx`
- Custom UI components extend shadcn/ui base components
- TypeScript strict mode enabled