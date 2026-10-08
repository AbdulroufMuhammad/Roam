"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { products, categories, filterProducts, money, type Filters } from "@/lib/products";
import { ProductCard } from "./product-card";
import { SortSelect } from "./collection";
const initial: Filters = {
  category: "All",
  audience: "All",
  query: "",
  maxPrice: 100000,
  sort: "featured",
};
export function ShopView() {
  const params = useSearchParams(),
    categoryParam = params.get("category"),
    audienceParam = params.get("audience");
  const [filters, setFilters] = useState<Filters>(initial),
    [mobileFilters, setMobileFilters] = useState(false);
  useEffect(() => {
    setFilters({
      ...initial,
      category: categories.includes(categoryParam as (typeof categories)[number])
        ? categoryParam!
        : "All",
      audience: audienceParam === "Men" || audienceParam === "Women" ? audienceParam : "All",
    });
  }, [categoryParam, audienceParam]);
  const list = useMemo(() => filterProducts(products, filters), [filters]);
  const patch = (change: Partial<Filters>) => setFilters((f) => ({ ...f, ...change }));
  const filterContent = (
    <div className="shop-filters">
      <label>
        Search styles
        <Input
          value={filters.query}
          onChange={(e) => patch({ query: e.target.value })}
          placeholder="Name, material, colour…"
          type="search"
        />
      </label>
      <span className="filter-heading">FOR YOU</span>
      <div className="shop-audience" role="group" aria-label="Shop audience">
        {["All", "Men", "Women"].map((v) => (
          <button
            key={v}
            aria-pressed={filters.audience === v}
            onClick={() => patch({ audience: v })}
          >
            {v === "All" ? "Everyone" : v}
          </button>
        ))}
      </div>
      <span className="filter-heading">BY STYLE</span>
      <div className="shop-types" role="group" aria-label="Shop style">
        {["All", ...categories].map((v) => (
          <button
            key={v}
            aria-pressed={filters.category === v}
            onClick={() => patch({ category: v })}
          >
            {v === "All" ? "All styles" : v}
          </button>
        ))}
      </div>
      <label>
        Maximum price <span>{money(filters.maxPrice)}</span>
      </label>
      <Slider
        min={35000}
        max={100000}
        step={5000}
        value={[filters.maxPrice]}
        onValueChange={(v) => patch({ maxPrice: v[0] })}
        aria-label="Maximum price"
      />
      <Button variant="ghost" className="reset-filters" onClick={() => setFilters(initial)}>
        <RotateCcw size={13} />
        Reset filters
      </Button>
      <span className="small-note">
        Illustrative concept collection.
        <br />
        Prices and imagery are demo content.
      </span>
    </div>
  );
  return (
    <main id="main" className="section shop-page">
      <div className="section-top">
        <div>
          <span className="eyebrow">THE COMPLETE ROTATION</span>
          <h1>
            FIND YOUR PAIR<span>.</span>
          </h1>
        </div>
        <Badge variant="secondary">THE CITY EDIT / 04 STYLES</Badge>
      </div>
      <div className="shop-layout">
        <aside className="desktop-shop-filters" aria-label="Collection filters">
          {filterContent}
        </aside>
        <div className="shop-results">
          <div className="shop-results-top">
            <div className="results-count">
              <span aria-live="polite">
                {list.length} {list.length === 1 ? "style" : "styles"}
              </span>
              <Sheet open={mobileFilters} onOpenChange={setMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="filter-toggle" size="sm">
                    <SlidersHorizontal size={14} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="filter-sheet">
                  <SheetHeader>
                    <SheetTitle>Find your footing.</SheetTitle>
                    <SheetDescription>Refine the concept collection.</SheetDescription>
                  </SheetHeader>
                  {filterContent}
                  <Button className="apply-filters" onClick={() => setMobileFilters(false)}>
                    Show {list.length} styles
                  </Button>
                </SheetContent>
              </Sheet>
            </div>
            <SortSelect value={filters.sort} onChange={(sort) => patch({ sort })} />
          </div>
          {(filters.category !== "All" || filters.audience !== "All") && (
            <div className="active-filters">
              {filters.category !== "All" && (
                <Button variant="secondary" size="sm" onClick={() => patch({ category: "All" })}>
                  {filters.category} ×
                </Button>
              )}
              {filters.audience !== "All" && (
                <Button variant="secondary" size="sm" onClick={() => patch({ audience: "All" })}>
                  {filters.audience} ×
                </Button>
              )}
            </div>
          )}
          {list.length ? (
            <div className="products-grid shop-grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>A different direction?</h3>
              <p>
                No styles match those filters.
                <br />
                Reset them to explore the complete collection.
              </p>
              <Button onClick={() => setFilters(initial)}>Reset filters</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
