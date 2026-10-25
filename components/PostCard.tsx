import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/sanity/lib/types";
import { formatDate } from "@/lib/format";
import { urlForImage } from "@/sanity/lib/image";

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

export default function PostCard({ post, featured = false }: PostCardProps) {
  const category = post.categories?.[0];
  const imageAlt = post.mainImage?.alt || post.title;

  return (
    <article className="group">
      <Link href={`/post/${post.slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-[1.75rem] bg-foam ${
            featured ? "aspect-[4/3] sm:aspect-[5/4]" : "aspect-[4/3]"
          }`}
        >
          {post.mainImage ? (
            <Image
              src={urlForImage(post.mainImage)
                .width(1000)
                .height(800)
                .fit("crop")
                .auto("format")
                .url()}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-latte-light/60 to-foam">
              <span className="font-serif text-5xl italic text-latte">
                Ana
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {category ? (
            <span className="absolute left-4 top-4 rounded-full border border-cream/50 bg-cream/90 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-mocha backdrop-blur">
              {category.title}
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-center gap-3 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-mocha">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span aria-hidden="true" className="size-1 rounded-full bg-latte" />
          <span>Coffee break</span>
        </div>

        <h3 className="mt-3 text-balance font-serif text-2xl font-medium leading-snug tracking-tight text-espresso transition-colors duration-300 group-hover:text-caramel sm:text-[1.7rem]">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-7 text-mocha">
          {post.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-espresso">
          Read the story
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </article>
  );
}
