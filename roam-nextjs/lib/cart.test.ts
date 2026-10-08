import { describe, it, expect } from "vitest";
import { initialStore, storeReducer, sanitizeStore, cartTotal, cartCount } from "./cart";
import { products, filterProducts } from "./products";
describe("shopping bag invariants", () => {
  it("keeps sizes separate and consolidates an identical product and size", () => {
    let s = storeReducer(initialStore, { type: "add", productId: "sneaker", size: 42 });
    s = storeReducer(s, { type: "add", productId: "sneaker", size: 42 });
    s = storeReducer(s, { type: "add", productId: "sneaker", size: 43 });
    expect(s.items).toHaveLength(2);
    expect(cartCount(s.items)).toBe(3);
    expect(cartTotal(s.items)).toBe(145500);
  });
  it("rejects nonexistent products, unavailable sizes and fractional quantities", () => {
    expect(storeReducer(initialStore, { type: "add", productId: "bad", size: 42 })).toBe(
      initialStore,
    );
    expect(storeReducer(initialStore, { type: "add", productId: "sneaker", size: 99 })).toBe(
      initialStore,
    );
    const s = storeReducer(initialStore, { type: "add", productId: "sneaker", size: 42 });
    expect(
      storeReducer(s, { type: "quantity", productId: "sneaker", size: 42, quantity: 1.5 }),
    ).toBe(s);
  });
  it("caps quantities and removes a line at zero", () => {
    let s = sanitizeStore({ items: [{ productId: "runner", size: 42, quantity: 99 }] });
    s = storeReducer(s, { type: "add", productId: "runner", size: 42 });
    expect(s.items[0].quantity).toBe(99);
    s = storeReducer(s, { type: "quantity", productId: "runner", size: 42, quantity: 0 });
    expect(s.items).toEqual([]);
  });
  it("repairs corrupt persisted data and duplicates", () => {
    const s = sanitizeStore({
      items: [
        null,
        { productId: "bad", size: 42, quantity: 3 },
        { productId: "sandal", size: 42, quantity: -1 },
        { productId: "sneaker", size: 42, quantity: 5 },
        { productId: "sneaker", size: 42, quantity: 1000 },
      ],
      saved: ["sneaker", "sneaker", "bad", 1],
    });
    expect(s.items).toEqual([{ productId: "sneaker", size: 42, quantity: 99 }]);
    expect(s.saved).toEqual(["sneaker"]);
    expect(s.hydrated).toBe(true);
  });
  it("toggles saved styles without affecting the bag", () => {
    const a = storeReducer(initialStore, { type: "save", productId: "runner" });
    expect(a.saved).toEqual(["runner"]);
    expect(storeReducer(a, { type: "save", productId: "runner" }).saved).toEqual([]);
    expect(a.items).toEqual([]);
  });
});
describe("collection discovery", () => {
  const base = { category: "All", audience: "All", query: "", maxPrice: 100000, sort: "featured" };
  it("combines audience, material, category and price filters", () => {
    const result = filterProducts(products, {
      ...base,
      audience: "Women",
      category: "Sneakers",
      query: "forest",
      maxPrice: 70000,
    });
    expect(result.map((p) => p.id)).toEqual(["runner"]);
    expect(filterProducts(products, { ...base, maxPrice: 40000 }).map((p) => p.id)).toEqual([
      "sandal",
    ]);
  });
  it("sorts without mutating catalogue order", () => {
    const before = products.map((p) => p.id);
    const result = filterProducts(products, { ...base, sort: "price-desc" });
    expect(result[0].id).toBe("runner");
    expect(products.map((p) => p.id)).toEqual(before);
  });
  it("handles empty search results", () => {
    expect(filterProducts(products, { ...base, query: "nonexistent" })).toEqual([]);
  });
});
