import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { ProductDetail } from "@/components/storefront/product-detail";
import { ProductCard } from "@/components/storefront/product-card";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    p = products.find((p) => p.slug === slug);
  if (!p) return { title: "Style not found" };
  return {
    title: p.name,
    description: p.description,
    openGraph: { title: p.name, description: p.description, images: [p.image] },
  };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop/">The collection</Link>
        <span>/</span>
        <span>{p.name}</span>
      </div>
      <section className="product-route">
        <ProductDetail product={p} />
      </section>
      <section className="section">
        <div className="section-top">
          <div>
            <span className="eyebrow">A DIFFERENT DIRECTION</span>
            <h2>MORE TO EXPLORE.</h2>
          </div>
        </div>
        <div className="products-grid related-grid">
          {products
            .filter((item) => item.id !== p.id)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </main>
  );
}
