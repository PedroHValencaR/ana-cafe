import AboutSection from "@/components/AboutSection";
import Hero from "@/components/Hero";
import JournalSection from "@/components/JournalSection";
import { getPosts } from "@/sanity/lib/data";

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
