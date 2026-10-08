# Code guide

## Configuration

| Setting                                    | Meaning                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `output: "export"`                         | Builds portable pre-rendered HTML and client bundles into `out/`. Remove it when adding server-only functionality. |
| `trailingSlash: true`                      | Produces a directory and `index.html` for each route on static hosts.                                              |
| `images.unoptimized: true`                 | Serves the included local images directly when no Next.js image server exists.                                     |
| `strict: true`                             | Enables TypeScript's strict checks across application code.                                                        |
| `@/*`                                      | Maps imports to the project root, keeping component imports readable.                                              |
| `rsc: true` in components.json             | Configures shadcn for a React Server Component project.                                                            |
| Empty `tailwind.config` in components.json | Uses Tailwind v4's CSS configuration.                                                                              |

## Server-rendered route files

`app/layout.tsx` imports the two locally hosted font families, exports shared metadata and wraps the application in `StoreProvider`. `Header`, `Footer`, `StoreOverlays` and `Toaster` remain mounted as routes change, so opening a bag or navigating to another page does not reset state.

`app/page.tsx` composes the campaign and editorial sections as Server Components. It passes serializable data and React children into small client components such as `HomeCollection` and `QuickLook`.

`app/product/[slug]/page.tsx` calls `generateStaticParams()` to enumerate the four known product URLs. `generateMetadata()` supplies each product's title, description and image. The asynchronous `params` contract matches the App Router. `notFound()` selects the dedicated missing-page UI when a slug is not found.

`app/shop/page.tsx` wraps `ShopView` in `Suspense`. The client reads query parameters through `useSearchParams`; the surrounding fallback supplies a usable loading state during navigation and static rendering.

## Product model: lib/products.ts

| Field / function   | Purpose                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| `Product.id`       | Stable identifier used in cart lines and saved styles.                             |
| `Product.slug`     | Human-readable URL segment for the product route.                                  |
| `category`         | One of Sneakers, Loafers or Sandals.                                               |
| `audience`         | The groups used by the catalogue filter.                                           |
| `price`            | Illustrative numeric NGN price, before formatting.                                 |
| `image`            | Local public asset path.                                                           |
| `swatch`           | Brand CSS colour class.                                                            |
| `sizes`            | The EU sizes permitted by both the UI and the reducer.                             |
| `filterProducts()` | Applies all filters together and sorts a new array without changing the catalogue. |
| `money()`          | Uses Intl.NumberFormat for consistent NGN display.                                 |

## Cart model: lib/cart.ts

`StoreState` contains cart `items`, saved product IDs and a `hydrated` flag. `StoreAction` is a discriminated union, so the compiler knows which fields accompany each action.

`sanitizeStore()` accepts unknown input because browser storage is not guaranteed to contain valid JSON data. It drops unknown products, unsupported sizes and invalid quantities, merges duplicate product/size lines, caps quantities and removes duplicate saved IDs.

`storeReducer()` produces a new state for each action. `add` merges an identical product/size pair, while a different size becomes a different line. `quantity` removes a line at zero. `remove` targets one product/size pair. `save` toggles a valid product ID. `clear` clears the bag while leaving saved styles intact.

`cartCount()` counts units rather than distinct lines. `cartTotal()` reads prices from the catalogue rather than accepting a price from persisted state. These are prototype safeguards; a real commerce backend must still validate prices and totals independently.

## StoreProvider hooks

| Hook               | Purpose                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `useReducer`       | Centralizes state transitions in the tested reducer.                                             |
| First `useEffect`  | Loads and validates browser persistence after hydration, with a migration for the previous demo. |
| Second `useEffect` | Writes data only after the initial storage read has completed.                                   |
| `useState`         | Holds ephemeral UI state for the bag, search dialog and quick product preview.                   |
| `useMemo`          | Keeps the context value stable until relevant state changes.                                     |
| `useStore`         | Reads context and throws a useful error if a component is used outside its provider.             |

## Component contracts

| Component        | Inputs and behaviour                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProductCard`    | Receives a typed product, links to its full route, toggles a favourite and opens its quick preview.                                               |
| `HomeCollection` | Holds category and sort selections, derives filtered products and renders the collection grid.                                                    |
| `ShopView`       | Reads category/audience URL parameters; manages search, price and sort filters; reuses the same controls in the desktop sidebar and mobile Sheet. |
| `ProductDetail`  | Receives a product and optional quick-preview flag; handles gallery mode, nested image expansion, size selection and adding a valid item.         |
| `InfoButton`     | Selects a typed topic and renders a shadcn Dialog for fit, delivery or concept information.                                                       |
| `Header`         | Uses Next links, a Dropdown Menu, mobile navigation Sheet and shared cart/search controls.                                                        |
| `StoreOverlays`  | Renders the global Cart Sheet, Search Dialog and Product Dialog from provider state.                                                              |
| `SavedView`      | Shows a Skeleton until hydration, then favourite cards or a clear empty state.                                                                    |
| `CheckoutView`   | Reads the same cart and derives the order preview; it does not submit or charge anything.                                                         |
| `QuickLook`      | Opens a product preview from a server-rendered editorial section.                                                                                 |

## Important JSX attributes

| Attribute / prop                    | Why it is present                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `"use client"`                      | Marks components that use React state, browser storage or event handlers.                |
| `key={...}`                         | Gives mapped React elements stable identity; cart rows combine product ID and size.      |
| `asChild`                           | Lets a shadcn Button or trigger style a Next Link without nesting interactive controls.  |
| `open` / `onOpenChange`             | Makes Dialog and Sheet state explicit and synchronized with React.                       |
| `value` / `onValueChange`           | Controls Select, Slider and Tabs through typed application state.                        |
| `aria-label`                        | Gives icon-only controls an understandable accessible name.                              |
| `aria-pressed`                      | Announces selected sizes and saved/filter toggle states.                                 |
| `disabled`                          | Blocks invalid additions and prevents persistence actions before initial hydration.      |
| `DialogTitle` / `DialogDescription` | Supplies accessible context and instructions for modal content.                          |
| `className="sr-only"`               | Keeps necessary modal descriptions accessible without adding duplicate visible headings. |
| `role="group"`                      | Identifies related size/filter controls to assistive technology.                         |
| `aria-live="polite"`                | Announces changes to the result count.                                                   |
| `Image.fill`                        | Fits an image to a positioned container with a reserved aspect ratio or height.          |
| `Image.sizes`                       | Describes the image's expected layout width to the framework/browser.                    |
| `Image.priority`                    | Prioritizes the main campaign or product image.                                          |
| `width` / `height`                  | Reserves space for smaller images and avoids layout movement.                            |

## Styling layers

`globals.css` imports Tailwind and the shadcn animation/theme styles. Theme variables control semantic colours such as background, primary, border and ring.

`brand.css` sets the distinctive campaign layout, type scale, product-card presentation and responsive behaviour. The `--brand-muted` name is deliberately separate from shadcn's `--muted` token: one is a text colour, while the other is a surface colour. At 720px the navigation becomes a Sheet, grids become two columns, product details stack vertically and catalogue filters move into a mobile Sheet. Reduced-motion preferences disable decorative transitions and the hero entrance animation.

## Tests

The tests cover cart line identity, invalid products/sizes, quantity limits, zero removal, corrupt persistence, favourite toggles, combined catalogue filters, sort immutability and empty results. They do not replace rendered browser interaction or accessibility testing.
