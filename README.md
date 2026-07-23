# Shopora

A modern full-stack e-commerce application built with Next.js, Sanity CMS, Clerk authentication, and Stripe payments. Shopora offers a seamless shopping experience with a fast, mobile-responsive storefront and a fully managed content backend.

## Features

- 🛍️ Browse products with category and brand filtering
- 🔍 Live product search
- 🛒 Cart management powered by Zustand
- 💳 Secure checkout and payments via Stripe
- 🔐 Authentication and user accounts with Clerk
- 📦 Order tracking with real-time post-payment updates
- ✍️ Content managed through Sanity Studio (products, categories, brands, blog)
- 📱 Fully responsive, mobile-first UI built with Tailwind CSS

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org) (App Router), [Tailwind CSS](https://tailwindcss.com)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs)
- **CMS:** [Sanity](https://www.sanity.io) with `sanity typegen` for auto-generated TypeScript types
- **Auth:** [Clerk](https://clerk.com)
- **Payments:** [Stripe](https://stripe.com)
- **Deployment:** [Vercel](https://vercel.com)

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

Create a `.env.local` file in the root directory with the following:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Sanity Studio

This project uses Sanity as a headless CMS. The dataset lives on Sanity's cloud, so only the Studio UI needs to be deployed or run locally.

To run Sanity Studio locally:

```bash
npx sanity dev
```

To generate TypeScript types from your GROQ schema:

```bash
npx sanity typegen generate
```

## Deploy on Vercel

The easiest way to deploy Shopora is to use the [Vercel Platform](https://vercel.com/new).

Make sure to configure your environment variables in the Vercel dashboard, set up Stripe webhooks pointing to your production URL (`/api/webhook`), and add your production domain to Sanity's CORS origins.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)