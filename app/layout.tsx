import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { getSite } from "@/data/data";

const display = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });

// Dynamic site metadata
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSite();
  return {
    title: `${s.brand.name} ${s.brand.tag}`,
    description: s.hero?.description || "Homes, offices and boutique spaces designed in light, stone and slow craft.",
    icons: {
      icon: "/icon.png",
    },
  };
}

// Root application layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} scroll-smooth overflow-x-clip`}>
      <body className="overflow-x-clip bg-paper font-body leading-relaxed text-ink antialiased">{children}</body>
    </html>
  );
}
