export type Category = "Sneakers" | "Loafers" | "Sandals";
export type Audience = "Men" | "Women";
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  audience: Audience[];
  colour: string;
  price: number;
  image: string;
  tag: string;
  swatch: string;
  sizes: number[];
  description: string;
}
export const products: Product[] = [
  {
    id: "sneaker",
    slug: "everyday-low",
    name: "The Everyday Low",
    category: "Sneakers",
    audience: ["Men", "Women"],
    colour: "Chalk / Gum",
    price: 48500,
    image: "/assets/sneaker.png",
    tag: "THE EVERYDAY EDIT",
    swatch: "",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    description:
      "A clean low-top silhouette with a warm gum sole. Pair it with relaxed tailoring, weekend denim, or whatever the day has in mind.",
  },
  {
    id: "loafer",
    slug: "sunday-loafer",
    name: "The Sunday Loafer",
    category: "Loafers",
    audience: ["Men"],
    colour: "Espresso Suede",
    price: 62000,
    image: "/assets/loafer.png",
    tag: "OFF DUTY",
    swatch: "brown",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    description:
      "An understated penny-loafer silhouette in deep espresso. A textural counterpoint to crisp shirts and easy trousers.",
  },
  {
    id: "runner",
    slug: "city-runner",
    name: "The City Runner",
    category: "Sneakers",
    audience: ["Men", "Women"],
    colour: "Forest / Chalk",
    price: 68500,
    image: "/assets/runner-v2.png",
    tag: "NEW PERSPECTIVE",
    swatch: "green",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    description:
      "A more expressive silhouette in forest green and charcoal. Textured mesh, suede-inspired panels and a sculpted sole define a different kind of everyday.",
  },
  {
    id: "sandal",
    slug: "weekend-slide",
    name: "The Weekend Slide",
    category: "Sandals",
    audience: ["Women"],
    colour: "Caramel Leather",
    price: 39500,
    image: "/assets/sandal-v2.png",
    tag: "TAKE IT EASY",
    swatch: "caramel",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    description:
      "A pared-back slide silhouette in warm caramel. Wide crossover straps and a low profile keep the look easy. For long afternoons and unhurried plans.",
  },
];
export const categories: Category[] = ["Sneakers", "Loafers", "Sandals"];
export const productById = (id: string) => products.find((product) => product.id === id);
export const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
export interface Filters {
  category: string;
  audience: string;
  query: string;
  maxPrice: number;
  sort: string;
}
export function filterProducts(source: Product[], filters: Filters) {
  const query = filters.query.trim().toLowerCase();
  const result = source.filter(
    (p) =>
      (filters.category === "All" || p.category === filters.category) &&
      (filters.audience === "All" || p.audience.includes(filters.audience as Audience)) &&
      p.price <= filters.maxPrice &&
      `${p.name} ${p.category} ${p.colour} ${p.description}`.toLowerCase().includes(query),
  );
  if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}
