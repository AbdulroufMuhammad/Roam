"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories, filterProducts } from "@/lib/products";
import { ProductCard } from "./product-card";
export function SortSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="sort-trigger" aria-label="Sort products">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-asc">Price: low to high</SelectItem>
        <SelectItem value="price-desc">Price: high to low</SelectItem>
      </SelectContent>
    </Select>
  );
}
export function HomeCollection() {
  const [category, setCategory] = useState("All"),
    [sort, setSort] = useState("featured");
  const list = useMemo(
    () =>
      filterProducts(products, { category, sort, audience: "All", query: "", maxPrice: 100000 }),
    [category, sort],
  );
  return (
    <section className="section collection" id="collection" aria-labelledby="collection-title">
      <div className="section-top">
        <div>
          <span className="eyebrow">01 / THE EVERYDAY ROTATION</span>
          <h2 id="collection-title">
            YOUR NEXT
            <br />
            <span className="soft-text">GO-TO PAIR.</span>
          </h2>
        </div>
        <div className="section-aside">
          <p>
            A little texture. A fresh silhouette.
            <br />
            Good company for wherever you’re going.
          </p>
          <Link className="text-link" href="/shop/">
            Explore all styles <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="collection-toolbar">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="category-tabs">
            <TabsTrigger value="All">
              All styles <sup>04</sup>
            </TabsTrigger>
            {categories.map((c) => (
              <TabsTrigger value={c} key={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <div className="products-grid">
        {list.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
      <div className="collection-foot">
        <span>
          Showing {list.length} {list.length === 1 ? "style" : "styles"}
        </span>
        <span>Concept styles & prices · Find your fit in the product preview</span>
      </div>
    </section>
  );
}
