import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopView } from "@/components/storefront/shop-view";
import { Skeleton } from "@/components/ui/skeleton";
export const metadata: Metadata = {
  title: "Shop the collection",
  description:
    "Explore the ROAM concept collection. Filter sneakers, loafers and sandals by style, audience and price.",
};
export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main id="main" className="section">
          <span className="eyebrow">THE COMPLETE ROTATION</span>
          <h2>FIND YOUR PAIR.</h2>
          <div className="products-grid skeleton-grid">
            {[0, 1, 2, 3].map((n) => (
              <Skeleton key={n} className="aspect-[1/1.2]" />
            ))}
          </div>
        </main>
      }
    >
      <ShopView />
    </Suspense>
  );
}
