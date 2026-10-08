"use client";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { products } from "@/lib/products";
import { useStore } from "./store-provider";
import { ProductCard } from "./product-card";
export function SavedView() {
  const { state } = useStore(),
    saved = products.filter((p) => state.saved.includes(p.id));
  return (
    <main id="main" className="section saved-page">
      <span className="eyebrow">KEEP A LITTLE INSPIRATION CLOSE</span>
      <h1>
        SAVED FOR
        <br />
        LATER<span>.</span>
      </h1>
      {!state.hydrated ? (
        <div className="products-grid skeleton-grid">
          {[0, 1, 2, 3].map((n) => (
            <Skeleton key={n} className="aspect-[1/1.2]" />
          ))}
        </div>
      ) : saved.length ? (
        <>
          <p className="route-description">
            {saved.length} {saved.length === 1 ? "style" : "styles"} worth coming back to.
          </p>
          <div className="products-grid related-grid">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <Heart size={30} className="mx-auto mb-5" />
          <h3>A little inspiration.</h3>
          <p>
            Tap a heart on any style to keep it here.
            <br />
            Your favourites stay saved in this browser.
          </p>
          <Button asChild>
            <Link href="/shop/">
              Explore the collection <ArrowUpRight />
            </Link>
          </Button>
        </div>
      )}
    </main>
  );
}
