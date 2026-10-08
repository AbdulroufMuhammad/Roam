"use client";
import type { ReactNode } from "react";
import { useStore } from "./store-provider";
export function QuickLook({
  productId,
  className,
  children,
  label,
}: {
  productId: string;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  const { setQuickProduct } = useStore();
  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={() => setQuickProduct(productId)}
    >
      {children}
    </button>
  );
}
