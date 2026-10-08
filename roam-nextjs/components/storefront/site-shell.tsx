"use client";
import { useDeferredValue, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  ArrowUpRight,
  Minus,
  Plus,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useStore } from "./store-provider";
import { InfoButton } from "./info-dialog";
import { ProductDetail } from "./product-detail";
import { cartCount, cartTotal } from "@/lib/cart";
import { categories, products, productById, money } from "@/lib/products";
export function Header() {
  const { state, setCartOpen, setSearchOpen } = useStore();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="topbar">
        <span>THE CITY EDIT — VOL. 02</span>
        <span>New perspectives. Everyday essentials.</span>
        <InfoButton topic="concept" className="topbar-info">
          DESIGN CONCEPT ↗
        </InfoButton>
      </div>
      <header className="header">
        <Button
          variant="ghost"
          size="icon"
          className="icon-btn mobile-menu"
          aria-label="Open navigation"
          onClick={() => setMenu(true)}
        >
          <Menu />
        </Button>
        <Link className="wordmark" href="/" aria-label="ROAM home">
          ROAM<span>®</span>
        </Link>
        <nav aria-label="Main navigation">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="nav-shop">
                Shop all <ChevronDown size={12} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/shop/">
                  The complete collection <ArrowUpRight className="ml-auto" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {categories.map((c) => (
                <DropdownMenuItem asChild key={c}>
                  <Link href={`/shop/?category=${c}`}>{c}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/shop/?audience=Men">Men</Link>
          <Link href="/shop/?audience=Women">Women</Link>
          <Link href="/#city-edit">
            The City Edit <i />
          </Link>
          <Link href="/journal/">Journal</Link>
        </nav>
        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            className="icon-btn"
            aria-label="Search styles"
            onClick={() => setSearchOpen(true)}
          >
            <Search />
          </Button>
          <Button variant="ghost" size="icon" asChild className="icon-btn saved-button">
            <Link href="/saved/" aria-label="Saved styles">
              <Heart />
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="bag-btn"
            onClick={() => setCartOpen(true)}
            aria-label={`Open shopping bag, ${cartCount(state.items)} items`}
          >
            <ShoppingBag className="bag-icon" size={19} />
            <span className="bag-text">Bag</span>
            <b>{cartCount(state.items)}</b>
          </Button>
        </div>
      </header>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="navigation-sheet">
          <SheetHeader>
            <SheetTitle>Explore ROAM</SheetTitle>
            <SheetDescription>Your own kind of movement.</SheetDescription>
          </SheetHeader>
          <div className="mobile-links">
            {[
              ["SHOP ALL", "/shop/"],
              ["MEN", "/shop/?audience=Men"],
              ["WOMEN", "/shop/?audience=Women"],
              ["SNEAKERS", "/shop/?category=Sneakers"],
              ["LOAFERS", "/shop/?category=Loafers"],
              ["SANDALS", "/shop/?category=Sandals"],
              ["FIELD NOTES", "/journal/"],
              ["SAVED STYLES", "/saved/"],
            ].map(([name, href]) => (
              <Link key={name} href={href} onClick={() => setMenu(false)}>
                {name} <ArrowUpRight />
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="wordmark">
            ROAM<span>®</span>
          </Link>
          <p>
            For your own kind of movement.
            <br />
            Lagos state of mind. Everywhere to go.
          </p>
        </div>
        <div className="footer-links">
          <span>THE COLLECTION</span>
          <Link href="/shop/">Shop all</Link>
          {categories.map((c) => (
            <Link key={c} href={`/shop/?category=${c}`}>
              {c}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <span>TAKE A LOOK</span>
          <Link href="/#city-edit">The City Edit</Link>
          <Link href="/journal/">Field notes</Link>
          <Link href="/saved/">Saved styles</Link>
        </div>
        <div className="footer-links">
          <span>GOOD TO KNOW</span>
          <InfoButton topic="sizing">Size guide</InfoButton>
          <InfoButton topic="delivery">Delivery & returns</InfoButton>
          <InfoButton topic="concept">About the concept</InfoButton>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ROAM — independent design concept</span>
        <span className="country">
          <i />
          NIGERIA / NGN ₦
        </span>
        <span>MOVE YOUR OWN WAY.</span>
      </div>
    </footer>
  );
}
export function StoreOverlays() {
  const {
    state,
    dispatch,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    quickProduct,
    setQuickProduct,
  } = useStore();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = products.filter((p) =>
    `${p.name} ${p.category} ${p.colour} ${p.description}`
      .toLowerCase()
      .includes(deferred.toLowerCase().trim()),
  );
  const quick = quickProduct ? productById(quickProduct) : undefined;
  return (
    <>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="cart-sheet">
          <SheetHeader>
            <SheetTitle>
              Your bag <Badge variant="secondary">{cartCount(state.items)}</Badge>
            </SheetTitle>
            <SheetDescription>A little room for your next adventure.</SheetDescription>
          </SheetHeader>
          <div className="sheet-body">
            {state.items.length ? (
              state.items.map((item) => {
                const p = productById(item.productId)!;
                return (
                  <div className="mini-product" key={`${item.productId}-${item.size}`}>
                    <Image src={p.image} alt={p.name} width={93} height={105} />
                    <div>
                      <Link href={`/product/${p.slug}/`} onClick={() => setCartOpen(false)}>
                        <h3>{p.name}</h3>
                      </Link>
                      <p>
                        EU {item.size} · {money(p.price)}
                      </p>
                      <div className="qty-control">
                        <Button
                          size="icon"
                          variant="outline"
                          aria-label={`Decrease quantity of ${p.name}`}
                          onClick={() =>
                            dispatch({
                              type: "quantity",
                              productId: p.id,
                              size: item.size,
                              quantity: item.quantity - 1,
                            })
                          }
                        >
                          <Minus size={12} />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          disabled={item.quantity >= 99}
                          aria-label={`Increase quantity of ${p.name}`}
                          onClick={() =>
                            dispatch({
                              type: "quantity",
                              productId: p.id,
                              size: item.size,
                              quantity: item.quantity + 1,
                            })
                          }
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${p.name}`}
                      onClick={() => dispatch({ type: "remove", productId: p.id, size: item.size })}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <h3>Your next pair awaits.</h3>
                <p>
                  There’s room for a little adventure.
                  <br />
                  Find a style and make it yours.
                </p>
                <Button asChild onClick={() => setCartOpen(false)}>
                  <Link href="/shop/">Explore the collection ↗</Link>
                </Button>
              </div>
            )}
          </div>
          {!!state.items.length && (
            <div className="sheet-summary">
              <Separator />
              <div className="bag-total">
                <span>Subtotal</span>
                <strong>{money(cartTotal(state.items))}</strong>
              </div>
              <p className="small-note">
                Demo bag · illustrative prices. Delivery and payments are not connected.
              </p>
              <Button asChild className="button checkout" onClick={() => setCartOpen(false)}>
                <Link href="/checkout/">
                  Preview order summary <ArrowUpRight />
                </Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="search-surface">
          <DialogHeader>
            <DialogTitle>Find your next pair.</DialogTitle>
            <DialogDescription>Four distinct styles. One point of view.</DialogDescription>
          </DialogHeader>
          <div className="search-control">
            <Search size={18} />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search the collection"
              placeholder="Try sneakers, suede or everyday"
            />
          </div>
          <div className="search-results">
            {results.length ? (
              results.map((p) => (
                <Link
                  href={`/product/${p.slug}/`}
                  className="mini-product"
                  key={p.id}
                  onClick={() => setSearchOpen(false)}
                >
                  <Image src={p.image} alt={p.name} width={93} height={105} />
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.colour}</p>
                    <span>{money(p.price)}</span>
                  </div>
                  <ArrowUpRight size={18} />
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <h3>A different direction?</h3>
                <p>No matches. Try a style, material or colour.</p>
                <Button variant="outline" onClick={() => setQuery("")}>
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!quick}
        onOpenChange={(open) => {
          if (!open) setQuickProduct(null);
        }}
      >
        <DialogContent className="quick-product-surface">
          <DialogTitle className="sr-only">{quick?.name ?? "Product preview"}</DialogTitle>
          <DialogDescription className="sr-only">
            Choose your size and add this concept product to your demo bag.
          </DialogDescription>
          {quick && <ProductDetail key={quick.id} product={quick} quick />}
        </DialogContent>
      </Dialog>
    </>
  );
}
