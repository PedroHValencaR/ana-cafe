import type { Metadata } from "next";

import AboutSection from "@/components/AboutSection";
import Hero from "@/components/Hero";
import JournalSection from "@/components/JournalSection";
import { siteDescription, siteName, socialImage } from "@/lib/site";
import { getPosts } from "@/sanity/lib/data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    url: "/",
    title: "Ana café — A slow living journal",
    description: siteDescription,
    images: [socialImage],
  },
};

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main id="main-content">
      <Hero />
      <JournalSection posts={posts} />
      <AboutSection />
    </main>
  );
}
