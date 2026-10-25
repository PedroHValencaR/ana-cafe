import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import { getCategories, getPostSlugs } from "@/sanity/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, categories] = await Promise.all([
    getPostSlugs(),
    getCategories(),
  ]);

  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/category`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...categories.map((category) => ({
      url: `${siteUrl}/category/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...slugs.map((slug) => ({
      url: `${siteUrl}/post/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
