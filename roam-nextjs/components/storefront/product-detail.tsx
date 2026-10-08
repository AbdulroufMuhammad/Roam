"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Heart, Expand } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useStore } from "./store-provider";
import { InfoButton } from "./info-dialog";
import { money, type Product } from "@/lib/products";
export function ProductDetail({
  product: p,
  quick = false,
}: {
  product: Product;
  quick?: boolean;
}) {
  const [size, setSize] = useState<number | null>(null),
    [view, setView] = useState("pair"),
    [zoom, setZoom] = useState(false);
  const { state, dispatch, setCartOpen, setQuickProduct } = useStore();
  const saved = state.saved.includes(p.id);
  const add = () => {
    if (size === null) return;
    const item = state.items.find((i) => i.productId === p.id && i.size === size);
    if (item?.quantity === 99) {
      toast("Maximum quantity reached for this size");
      return;
    }
    dispatch({ type: "add", productId: p.id, size });
    setQuickProduct(null);
    setCartOpen(true);
    toast("Your pair is in the bag");
  };
  return (
    <div className={`product-detail-layout ${quick ? "quick-detail" : ""}`}>
      <div className={`modal-product-image ${view === "detail" ? "detail-mode" : ""}`}>
        <Image
          src={p.image}
          alt={`${p.name} in ${p.colour}`}
          fill
          sizes="(max-width:720px) 94vw, 50vw"
          priority={!quick}
        />
        <div className="gallery-controls">
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="pair">The pair</TabsTrigger>
              <TabsTrigger value="detail">The detail</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="secondary" size="sm" onClick={() => setZoom(true)}>
            <Expand size={14} /> Expand
          </Button>
        </div>
      </div>
      <div className="modal-copy">
        <span className="eyebrow">
          {p.category.toUpperCase()} /{" "}
          {p.audience.length === 2 ? "UNISEX" : p.audience[0].toUpperCase()}
        </span>
        <h1>{p.name}</h1>
        <p className="modal-price">{money(p.price)}</p>
        <p className="modal-description">{p.description}</p>
        <p className="colour-label">Colour — {p.colour}</p>
        <div className="modal-colour">
          <span className={`swatch ${p.swatch}`} />
          <span>{p.colour}</span>
        </div>
        <div className="size-heading">
          <span>Select your size / EU</span>
          <InfoButton topic="sizing">Find your fit ↗</InfoButton>
        </div>
        <div className="size-grid" role="group" aria-label="Choose EU shoe size">
          {p.sizes.map((n) => (
            <Button
              key={n}
              variant={size === n ? "default" : "outline"}
              aria-pressed={size === n}
              onClick={() => setSize(n)}
            >
              {n}
            </Button>
          ))}
        </div>
        <Button
          className="button add-button"
          disabled={size === null || !state.hydrated}
          onClick={add}
        >
          {size === null ? "Select a size" : "Add to bag"}
          <ArrowUpRight />
        </Button>
        <Button
          className="detail-save"
          variant="ghost"
          disabled={!state.hydrated}
          onClick={() => dispatch({ type: "save", productId: p.id })}
        >
          <Heart size={14} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved for later" : "Save for later"}
        </Button>
        <div className="modal-perks">
          <span>
            <Check size={11} /> Save your favourite styles
          </span>
          <span>
            <Check size={11} /> Preview your complete bag
          </span>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="design">
            <AccordionTrigger>Design & materials</AccordionTrigger>
            <AccordionContent>
              {p.description} Materials and performance are illustrative; this is not an actual
              product specification.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="delivery">
            <AccordionTrigger>Delivery & returns</AccordionTrigger>
            <AccordionContent>
              This is a design concept. Actual delivery costs, times and policies must be supplied
              before launch.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="small-note">
          Concept product & price. No payment or real order will be processed.
        </p>
        {quick && (
          <Link
            href={`/product/${p.slug}/`}
            className="text-link"
            onClick={() => setQuickProduct(null)}
          >
            View full product details <ArrowUpRight size={15} />
          </Link>
        )}
      </div>
      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="image-zoom-surface">
          <DialogTitle className="sr-only">{p.name} — expanded image</DialogTitle>
          <DialogDescription className="sr-only">
            Enlarged concept product photograph in {p.colour}.
          </DialogDescription>
          <div className="zoom-photo">
            <Image src={p.image} alt={`${p.name}, expanded view`} fill sizes="90vw" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
