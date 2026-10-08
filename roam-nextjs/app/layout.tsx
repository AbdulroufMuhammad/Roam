import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { StoreProvider } from "@/components/storefront/store-provider";
import { Header, Footer, StoreOverlays } from "@/components/storefront/site-shell";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "./brand.css";
const body = localFont({
  src: [
    { path: "../public/assets/font-3.ttf", weight: "400" },
    { path: "../public/assets/font-5.ttf", weight: "600" },
    { path: "../public/assets/font-6.ttf", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});
const display = localFont({
  src: [
    { path: "../public/assets/font-0.ttf", weight: "600" },
    { path: "../public/assets/font-1.ttf", weight: "700" },
    { path: "../public/assets/font-2.ttf", weight: "800" },
  ],
  variable: "--font-display",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://roam-reimagined.abdulraufmuhammad28.chatgpt.site",
  ),
  title: { default: "ROAM — Move Your Own Way", template: "%s | ROAM" },
  description:
    "A distinctive footwear storefront concept. Explore considered styles, the City Edit and your own kind of movement.",
  openGraph: {
    title: "ROAM — Move Your Own Way",
    description: "A different perspective on everyday footwear.",
    images: ["/assets/urban-v2.png"],
  },
};
export const viewport: Viewport = { themeColor: "#f8f8f4" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <StoreProvider>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
          <StoreOverlays />
          <Toaster position="bottom-center" theme="light" />
        </StoreProvider>
      </body>
    </html>
  );
}
