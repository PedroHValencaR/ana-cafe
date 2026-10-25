import { cacheLife, cacheTag } from "next/cache";

import { isSanityConfigured } from "../env";
import { client } from "./client";
import {
  categoriesQuery,
  categoryBySlugQuery,
  categorySlugsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from "./queries";
import type { Category, CategoryDetail, Post, PostDetail } from "./types";

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("days");
  cacheTag("post");

  if (!isSanityConfigured) {
    return [];
  }

  return client.fetch<Post[]>(postsQuery);
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  "use cache";
  cacheLife("days");
  cacheTag("post", `post:${slug}`);

  if (!isSanityConfigured) {
    return null;
  }

  return client.fetch<PostDetail | null>(postBySlugQuery, { slug });
}

export async function getPostSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("post");

  if (!isSanityConfigured) {
    return [];
  }

  return client.fetch<string[]>(postSlugsQuery);
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("days");
  cacheTag("category", "post");

  if (!isSanityConfigured) {
    return [];
  }

  return client.fetch<Category[]>(categoriesQuery);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryDetail | null> {
  "use cache";
  cacheLife("days");
  cacheTag("category", "post", `category:${slug}`);

  if (!isSanityConfigured) {
    return null;
  }

  return client.fetch<CategoryDetail | null>(categoryBySlugQuery, { slug });
}

export async function getCategorySlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("category");

  if (!isSanityConfigured) {
    return [];
  }

  return client.fetch<string[]>(categorySlugsQuery);
}
