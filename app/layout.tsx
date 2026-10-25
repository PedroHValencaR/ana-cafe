import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";

import { siteUrl } from "@/lib/site";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ana café — A slow living journal",
    template: "%s · Ana café",
  },
  description:
    "A cozy corner of the internet for coffee, seasonal recipes, and the art of taking your time.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ana café",
    title: "Ana café — A slow living journal",
    description:
      "A cozy corner of the internet for coffee, seasonal recipes, and the art of taking your time.",
    images: [
      {
        url: "/about-coffee.jpg",
        width: 1200,
        height: 800,
        alt: "A freshly brewed cup of coffee on a wooden café table",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ana café — A slow living journal",
    description:
      "Coffee, seasonal recipes, and the art of taking your time.",
    images: ["/about-coffee.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable}`}>
      <body className="flex min-h-dvh flex-col bg-cream text-espresso">
        {children}
      </body>
    </html>
  );
}
