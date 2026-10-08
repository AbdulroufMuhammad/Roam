import type { Metadata } from "next";
import { SavedView } from "@/components/storefront/saved-view";
export const metadata: Metadata = {
  title: "Saved styles",
  robots: { index: false, follow: false },
};
export default function SavedPage() {
  return <SavedView />;
}
