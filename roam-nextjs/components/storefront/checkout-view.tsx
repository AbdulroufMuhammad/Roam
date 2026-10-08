"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { productById, money } from "@/lib/products";
import { cartCount, cartTotal } from "@/lib/cart";
import { useStore } from "./store-provider";
export function CheckoutView() {
  const { state, setCartOpen } = useStore();
  return (
    <main id="main" className="section checkout-page">
      <span className="eyebrow">ORDER PREVIEW</span>
      <h1>
        YOUR EVERYDAY
        <br />
        ROTATION<span>.</span>
      </h1>
      {!state.hydrated ? (
        <Skeleton className="mt-8 h-80" />
      ) : !state.items.length ? (
        <div className="empty-state">
          <ShoppingBag size={30} className="mx-auto mb-5" />
          <h3>Your next pair awaits.</h3>
          <p>Your bag is empty. Explore the collection to start your rotation.</p>
          <Button asChild>
            <Link href="/shop/">
              Find a style <ArrowUpRight />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="checkout-layout">
          <div>
            <Badge variant="secondary">DESIGN PREVIEW / {cartCount(state.items)} ITEMS</Badge>
            <div className="checkout-items">
              {state.items.map((item) => {
                const p = productById(item.productId)!;
                return (
                  <div className="mini-product" key={`${p.id}-${item.size}`}>
                    <Image src={p.image} alt={p.name} width={93} height={105} />
                    <div>
                      <Link href={`/product/${p.slug}/`}>
                        <h3>{p.name}</h3>
                      </Link>
                      <p>
                        {p.colour} · EU {item.size}
                      </p>
                      <p>Quantity {item.quantity}</p>
                    </div>
                    <strong>{money(p.price * item.quantity)}</strong>
                  </div>
                );
              })}
            </div>
            <Button variant="outline" className="mt-6" onClick={() => setCartOpen(true)}>
              Edit your bag
            </Button>
          </div>
          <aside className="order-summary">
            <h2>A considered rotation.</h2>
            <div className="bag-total">
              <span>Subtotal</span>
              <strong>{money(cartTotal(state.items))}</strong>
            </div>
            <Separator className="my-6" />
            <div className="preview-note">
              <ShieldCheck size={19} />
              <p>
                This is a design preview. No order has been placed and no payment has been taken.
              </p>
            </div>
            <p className="small-note">
              Delivery, tax and payment processing are not connected. The amount above is an
              illustrative subtotal, not a payable total.
            </p>
            <Button asChild className="button checkout">
              <Link href="/shop/">
                Keep exploring <ArrowUpRight />
              </Link>
            </Button>
          </aside>
        </div>
      )}
    </main>
  );
}
