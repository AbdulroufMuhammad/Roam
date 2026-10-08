# ROAM — Next.js + shadcn/ui storefront

A complete TypeScript / Next.js App Router implementation of the ROAM redesign.

## Run it

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Use Node.js 20.9 or newer (Node.js 22+ recommended).

```bash
npm run typecheck
npm test
npm run build
```

The current configuration exports the application to `out/`. This keeps the preview portable and deployable on static hosting. Server Components render during the build; the client components provide cart, search, filters, dialogs and saved-style interactions. This is a genuine Next.js application, not HTML embedded inside React.

## Stack

- Next.js 16.4 App Router.
- React 19 and TypeScript with strict type checking.
- Tailwind CSS v4 plus a custom editorial design layer.
- Official shadcn/ui New York components, backed by Radix primitives.
- Lucide icons, Sonner notifications and locally hosted fonts.
- Vitest tests for cart and catalogue invariants.

## Routes

| Route             | Purpose                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `/`               | Campaign homepage, interactive collection, style discovery and editorial content.                                                |
| `/shop`           | Search, category, audience, maximum-price and sort controls. Category and audience can be selected through URL query parameters. |
| `/product/[slug]` | Four pre-rendered product routes with individual metadata, gallery controls, size selection and related products.                |
| `/saved`          | Browser-local favourite styles.                                                                                                  |
| `/checkout`       | An explicit order preview, without payment or order submission.                                                                  |
| `/journal`        | A complete editorial article.                                                                                                    |

## Structure

```text
app/
  layout.tsx                 Shared shell, metadata, local fonts and providers
  page.tsx                   Server-rendered marketing homepage
  globals.css                Tailwind / shadcn theme tokens
  brand.css                  Responsive editorial design
  shop/page.tsx              Shop route with Suspense fallback
  product/[slug]/page.tsx     Static parameters and per-product metadata
  saved/page.tsx              Saved-style route
  checkout/page.tsx           Order-preview route
  journal/page.tsx            Editorial article
  not-found.tsx              Missing-route UI
components/
  ui/                        14 official shadcn/ui source components
  storefront/                Typed, reusable storefront components
lib/
  products.ts                Catalogue types, products, filtering and currency
  cart.ts                    Reducer, persistence validation, counts and totals
  cart.test.ts               Eight meaningful cart / catalogue tests
  utils.ts                   Class-name merging helper
public/assets/               All product imagery, campaign imagery and fonts
licenses/                    Font and shadcn notices
```

## Genuine framework features

- File-based routes and client-side navigation with `next/link`.
- Server Components for the homepage, layout, article and product-route composition.
- `generateStaticParams` and `generateMetadata` for product pages.
- Local fonts loaded with `next/font/local`, with no remote font requests.
- `next/image` with explicit dimensions or `fill` / `sizes` to reserve image space.
- A Suspense boundary around URL-driven shop discovery.
- Hydration-safe browser persistence and clearly scoped client components.
- A strict TypeScript model and a pure reducer that can be reused with a future backend.

## shadcn components

Button, Dialog, Sheet, Select, Tabs, Accordion, Input, Badge, Separator, Slider, Dropdown Menu, Tooltip, Skeleton and Sonner. Components live in your source tree and can be edited directly. The official registry sources were installed into `components/ui`; registry-local imports were adapted to this project's aliases.

## Data and persistence

Products and prices are illustrative. Edit `lib/products.ts` to replace the sample catalogue.

The `StoreProvider` keeps cart and saved styles in `localStorage` under `roam-store-v1`. It validates stored data before using it and migrates the previous demo's `roam-bag` and `roam-saved` keys. Cart lines are keyed by product ID and EU size. The reducer rejects unavailable sizes, removes zero quantities and caps a line at 99 units. UI controls stay disabled until persistence hydration completes.

Client-side state is suitable for this prototype, not a source of truth for a live store. Production prices, availability, totals and orders must be validated by the server.

## Connect a real backend

Keep product types and presentation components. Replace catalogue reads with server-side database/service calls and replace the local reducer's order handoff with validated cart and order APIs. Remove `output: "export"` from `next.config.ts` when enabling server routes or Server Actions. Replace static product parameters with your actual catalogue strategy. On a Next.js server host, enable the image optimizer by removing `images.unoptimized`.

No payment provider, shipping service, account system or real order creation is included. No environment secrets are required to run this project. Optionally copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your deployment origin for canonical metadata.

## Customization

- Brand colours and spacing: `app/brand.css`.
- shadcn theme tokens: `app/globals.css`.
- Homepage sections and editorial text: `app/page.tsx` and `app/journal/page.tsx`.
- Product data and prices: `lib/products.ts`.
- Cart persistence and actions: `components/storefront/store-provider.tsx` and `lib/cart.ts`.
- Supporting policy text: `components/storefront/info-dialog.tsx`.

See `CODE_GUIDE.md` for an explanation of the component contracts, hooks and important attributes.

## Verification

Type checking, eight unit tests and a Next.js production build are the required checks. Browser visual QA was not available in the authoring environment; review the rendered UI in your own development environment before production use.

## Assets

All images are AI-generated concept assets. Product names and prices are illustrative. Barlow Condensed and DM Sans are distributed under the SIL Open Font License; notices are included under `licenses/`. shadcn/ui source is MIT licensed. Replace concept imagery and sample data before representing the catalogue as real ROAM inventory.
