"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import { initialStore, storeReducer, type StoreAction, type StoreState } from "@/lib/cart";
interface StoreContextValue {
  state: StoreState;
  dispatch: Dispatch<StoreAction>;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  quickProduct: string | null;
  setQuickProduct: (id: string | null) => void;
}
function readStoredState(): unknown {
  const current = localStorage.getItem("roam-store-v1");
  if (current) return JSON.parse(current);
  const previous: unknown = JSON.parse(localStorage.getItem("roam-bag") ?? "[]");
  const items = Array.isArray(previous)
    ? previous
        .filter((item) => item && typeof item === "object")
        .map((item) => ({ productId: item.id, size: item.size, quantity: item.qty }))
    : [];
  return { items, saved: JSON.parse(localStorage.getItem("roam-saved") ?? "[]") };
}
const StoreContext = createContext<StoreContextValue | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialStore);
  const [cartOpen, setCartOpen] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
    [quickProduct, setQuickProduct] = useState<string | null>(null);
  useEffect(() => {
    try {
      dispatch({ type: "hydrate", payload: readStoredState() });
    } catch {
      dispatch({ type: "hydrate", payload: null });
    }
  }, []);
  useEffect(() => {
    if (state.hydrated)
      try {
        localStorage.setItem(
          "roam-store-v1",
          JSON.stringify({ items: state.items, saved: state.saved }),
        );
      } catch {
        /* Browser storage may be unavailable; the active session still works. */
      }
  }, [state]);
  const value = useMemo(
    () => ({
      state,
      dispatch,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      quickProduct,
      setQuickProduct,
    }),
    [state, cartOpen, searchOpen, quickProduct],
  );
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside StoreProvider");
  return store;
}
