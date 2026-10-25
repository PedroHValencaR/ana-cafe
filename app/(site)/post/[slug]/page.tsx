import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleBody from "@/components/PortableText";
import { formatDate, getReadingTime } from "@/lib/format";
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/data";
import { urlForImage } from "@/sanity/lib/image";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const EMPTY_STATE_SLUG = "__ana-cafe-empty__";

// The whole article depends on the slug, so this route intentionally blocks
// rather than streaming an URL-dependent shell. See /docs/.../instant.
export const instant = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  // Cache Components requires at least one param at build time. When the
  // journal is still empty this sentinel renders the themed 404 instead.
  return slugs.length > 0
    ? slugs.map((slug) => ({ slug }))
    : [{ slug: EMPTY_STATE_SLUG }];
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Story not found",
    };
  }

  const image = post.mainImage
    ? urlForImage(post.mainImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/post/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.body);
  const imageAlt = post.mainImage?.alt || post.title;

  return (
    <main id="main-content" className="pb-24">
      <article>
        <header className="mx-auto max-w-3xl px-6 pt-12 text-center sm:pt-16">
          <Link
            href="/#journal"
            className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-mocha transition-colors hover:text-espresso"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3.5"
              fill="none"
            >
              <path
                d="M13 8H3m4 4-4-4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to the journal
          </Link>

          {post.categories?.length ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="rounded-full border border-line bg-foam px-3.5 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-mocha transition-colors duration-300 hover:border-caramel hover:bg-cream hover:text-caramel-deep"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          ) : null}

          <h1 className="mt-6 text-balance font-serif text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-espresso sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-mocha sm:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-mocha">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden="true" className="size-1 rounded-full bg-latte" />
            <span>{readingTime} min read</span>
            {post.author?.name ? (
              <>
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-latte"
                />
                <span>Words by {post.author.name}</span>
              </>
            ) : null}
          </div>
        </header>

        {post.mainImage ? (
          <figure className="mx-auto mt-12 w-full max-w-5xl px-4 sm:mt-14 sm:px-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-line bg-foam shadow-soft sm:aspect-[16/9]">
              <Image
                src={urlForImage(post.mainImage)
                  .width(1800)
                  .height(1100)
                  .fit("crop")
                  .auto("format")
                  .url()}
                alt={imageAlt}
                fill
                preload
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        ) : null}

        <div className="article-body mx-auto mt-14 max-w-2xl px-6 sm:mt-16">
          <ArticleBody value={post.body} />
        </div>

        <footer className="mx-auto mt-16 max-w-2xl px-6">
          {post.author ? (
            <aside className="flex flex-col gap-5 rounded-[1.75rem] border border-line bg-foam/60 p-6 sm:flex-row sm:items-start">
              {post.author.image ? (
                <Image
                  src={urlForImage(post.author.image)
                    .width(160)
                    .height(160)
                    .fit("crop")
                    .auto("format")
                    .url()}
                  alt={post.author.image.alt || post.author.name}
                  width={64}
                  height={64}
                  sizes="64px"
                  className="size-16 shrink-0 rounded-full border border-latte/40 object-cover"
                />
              ) : (
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-latte/40 bg-cream font-serif text-2xl italic text-caramel">
                  {post.author.name.charAt(0)}
                </span>
              )}
              <div>
                <p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-caramel-deep">
                  Words by
                </p>
                <p className="mt-1 font-serif text-2xl text-espresso">
                  {post.author.name}
                </p>
                {post.author.role ? (
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-mocha">
                    {post.author.role}
                  </p>
                ) : null}
                {post.author.bio ? (
                  <p className="mt-3 text-sm leading-7 text-mocha">
                    {post.author.bio}
                  </p>
                ) : null}
              </div>
            </aside>
          ) : null}

          <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/#journal"
              className="inline-flex items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-espresso transition-colors hover:text-caramel-deep"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
              >
                <path
                  d="M13 8H3m4 4-4-4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to the journal
            </Link>
            <p className="text-[0.58rem] uppercase tracking-[0.22em] text-mocha">
              Ana café · Slow mornings
            </p>
          </div>
        </footer>
      </article>
    </main>
  );
}
