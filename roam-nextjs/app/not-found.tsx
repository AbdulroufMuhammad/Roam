import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main id="main" className="section route-empty">
      <span className="eyebrow">A DIFFERENT DIRECTION</span>
      <h1>
        THIS TURN
        <br />
        LEADS NOWHERE.
      </h1>
      <p>That page or style could not be found. There’s plenty more to explore.</p>
      <Button asChild>
        <Link href="/shop/">Explore the collection ↗</Link>
      </Button>
    </main>
  );
}
