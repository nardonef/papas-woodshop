import type { Metadata } from "next";
import { Caveat, Playfair_Display, Work_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});
const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-work-sans" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: { default: `${site.name} · Reclaimed barn wood dining tables`, template: `%s · ${site.name}` },
  description:
    "Dining tables made from reclaimed Amish barn wood, hand-built one at a time in Westchester County, NY. In-stock tables and built-to-order commissions.",
  openGraph: { images: ["/photos/round-windsor.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${workSans.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
