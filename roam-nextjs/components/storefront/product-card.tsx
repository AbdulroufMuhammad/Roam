"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useStore } from "./store-provider";
import { money, type Product } from "@/lib/products";
export function ProductCard({ product: p }: { product: Product }) {
  const { state, dispatch, setQuickProduct } = useStore();
  const saved = state.saved.includes(p.id);
  return (
    <article className="product-card">
      <div className="product-image">
        <Link href={`/product/${p.slug}/`} className="product-photo" aria-label={`View ${p.name}`}>
          <Image
            src={p.image}
            alt={`${p.name} in ${p.colour}`}
            fill
            sizes="(max-width:720px) 45vw, 24vw"
          />
        </Link>
        <span className={`product-tag ${p.id === "runner" ? "new" : ""}`}>{p.tag}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="save-product icon-btn"
                variant="ghost"
                size="icon"
                aria-label={`${saved ? "Unsave" : "Save"} ${p.name}`}
                aria-pressed={saved}
                disabled={!state.hydrated}
                onClick={() => {
                  dispatch({ type: "save", productId: p.id });
                  toast(saved ? "Removed from saved styles" : "Style saved for later");
                }}
              >
                <Heart fill={saved ? "currentColor" : "none"} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{saved ? "Remove from saved" : "Save for later"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button className="quick-view" variant="secondary" onClick={() => setQuickProduct(p.id)}>
          Choose your size <ArrowUpRight size={15} />
        </Button>
      </div>
      <div className="product-meta">
        <div>
          <Link className="product-name" href={`/product/${p.slug}/`}>
            {p.name}
          </Link>
          <p>{p.colour}</p>
          <div className="swatches" aria-label={`Colour: ${p.colour}`}>
            <span className={`swatch ${p.swatch}`} />
            <small>{p.audience.length === 2 ? "UNISEX" : p.audience[0].toUpperCase()}</small>
          </div>
        </div>
        <span className="product-price">{money(p.price)}</span>
      </div>
    </article>
  );
}
