import type { Metadata } from "next";
import { CheckoutView } from "@/components/storefront/checkout-view";
export const metadata: Metadata = {
  title: "Order preview",
  robots: { index: false, follow: false },
};
export default function CheckoutPage() {
  return <CheckoutView />;
}
