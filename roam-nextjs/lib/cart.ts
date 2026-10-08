import { productById } from "./products";
export interface CartItem {
  productId: string;
  size: number;
  quantity: number;
}
export interface StoreState {
  items: CartItem[];
  saved: string[];
  hydrated: boolean;
}
export const initialStore: StoreState = { items: [], saved: [], hydrated: false };
export type StoreAction =
  | { type: "hydrate"; payload: unknown }
  | { type: "add"; productId: string; size: number }
  | { type: "quantity"; productId: string; size: number; quantity: number }
  | { type: "remove"; productId: string; size: number }
  | { type: "save"; productId: string }
  | { type: "clear" };
export function sanitizeStore(input: unknown): StoreState {
  const value = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const items: CartItem[] = [];
  if (Array.isArray(value.items))
    for (const raw of value.items) {
      if (!raw || typeof raw !== "object") continue;
      const item = raw as CartItem,
        product = productById(item.productId);
      if (
        !product ||
        !product.sizes.includes(item.size) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      )
        continue;
      const existing = items.find((x) => x.productId === item.productId && x.size === item.size);
      if (existing) existing.quantity = Math.min(99, existing.quantity + item.quantity);
      else
        items.push({
          productId: item.productId,
          size: item.size,
          quantity: Math.min(99, item.quantity),
        });
    }
  const saved = Array.isArray(value.saved)
    ? [
        ...new Set(
          value.saved.filter((id): id is string => typeof id === "string" && !!productById(id)),
        ),
      ]
    : [];
  return { items, saved, hydrated: true };
}
export function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "hydrate":
      return sanitizeStore(action.payload);
    case "add": {
      const product = productById(action.productId);
      if (!product?.sizes.includes(action.size)) return state;
      const existing = state.items.find(
        (i) => i.productId === action.productId && i.size === action.size,
      );
      return {
        ...state,
        items: existing
          ? state.items.map((i) =>
              i === existing ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i,
            )
          : [...state.items, { productId: action.productId, size: action.size, quantity: 1 }],
      };
    }
    case "quantity":
      if (!Number.isInteger(action.quantity)) return state;
      return {
        ...state,
        items: state.items.flatMap((i) =>
          i.productId === action.productId && i.size === action.size
            ? action.quantity <= 0
              ? []
              : [{ ...i, quantity: Math.min(99, action.quantity) }]
            : [i],
        ),
      };
    case "remove":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.productId === action.productId && i.size === action.size),
        ),
      };
    case "save":
      if (!productById(action.productId)) return state;
      return {
        ...state,
        saved: state.saved.includes(action.productId)
          ? state.saved.filter((id) => id !== action.productId)
          : [...state.saved, action.productId],
      };
    case "clear":
      return { ...state, items: [] };
  }
}
export const cartCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0);
export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + (productById(i.productId)?.price ?? 0) * i.quantity, 0);
