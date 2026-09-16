# Papa's Woodshop

Marketing and lead-generation site for Papa's Woodshop: dining tables built from reclaimed Amish barn wood in Westchester County, NY. Six static pages, an interactive table builder, and a commission inquiry form. No accounts, cart, or payments.

Built with Next.js (App Router), TypeScript, and Tailwind v4. Deployed on Vercel.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # builder logic (Vitest)
pnpm lint
pnpm typecheck
pnpm build
```

## Contact form (Web3Forms)

The inquiry form on `/contact` posts to [Web3Forms](https://web3forms.com), which emails the submission to Papa. Until a key is set, the form shows a "not connected yet" notice with a text-message fallback instead of a submit button.

1. Go to https://web3forms.com, enter `mike.ryan50@gmail.com`, and confirm the email to receive an access key.
2. In Vercel: Project → Settings → Environment Variables → add `NEXT_PUBLIC_WEB3FORMS_KEY` with that key, for Production and Preview.
3. Redeploy. Locally, put the same line in `.env.local` (see `.env.example`).

## Deploy (Vercel + GitHub)

1. https://vercel.com/new → Import `nardonef/papas-woodshop`. Framework is auto-detected as Next.js; no settings to change.
2. Add the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable (above).
3. Deploy. Every push to `main` redeploys production; other branches get preview URLs.

## Content that still needs Papa

All of these live in one place so they are easy to update:

- `src/lib/site.ts`: phone, email, Facebook Marketplace URL (currently the generic Marketplace page), and two flags:
  - `showPrices`: hides every price and the builder estimate site-wide when `false`.
  - `showTestimonials`: currently `false` because the quotes in the design are samples. Flip to `true` after replacing them in `src/app/page.tsx` and `src/app/pricing/page.tsx`.
- `src/lib/builder.ts`: the estimate formulas. Only the $2,200 round baseline is confirmed; the rest are placeholders.
- `src/app/story/page.tsx`: the portrait slot is a striped placeholder. Drop a photo into `public/photos/` and replace the placeholder `div` with a `<Photo>`.
- `src/app/pricing/page.tsx`: "from" prices and the placeholder note.

Photos live in `public/photos/` and are served through `next/image`.
