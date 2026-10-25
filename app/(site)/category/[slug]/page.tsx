import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PostCard from "@/components/PostCard";
import {
  getCategories,
  getCategoryBySlug,
  getCategorySlugs,
} from "@/sanity/lib/data";

const EMPTY_STATE_SLUG = "__ana-cafe-empty__";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

// The whole page depends on the slug, so this route intentionally blocks
// rather than streaming an URL-dependent shell. See /docs/.../instant.
export const instant = false;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();

  // Cache Components requires at least one param at build time. When no
  // categories exist yet this sentinel renders the themed 404 instead.
  return slugs.length > 0
    ? slugs.map((slug) => ({ slug }))
    : [{ slug: EMPTY_STATE_SLUG }];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  const description =
    category.description ||
    `Stories filed under ${category.title} at Ana café — coffee rituals, seasonal recipes, and slow living notes.`;

  return {
    title: `${category.title} — stories`,
    description,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    openGraph: {
      type: "website",
      title: `${category.title} — stories · Ana café`,
      description,
      url: `/category/${category.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} — stories · Ana café`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categories = await getCategories();
  const otherCategories = categories.filter(
    (item) => item.slug !== category.slug,
  );
  const { posts } = category;

  return (
    <main id="main-content">
      <section className="paper-grain relative overflow-hidden border-b border-line/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-latte-light/35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-latte/15 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-mocha"
          >
            <Link href="/" className="transition-colors hover:text-espresso">
              Ana café
            </Link>
            <span aria-hidden="true" className="text-latte">
              /
            </span>
            <Link
              href="/#journal"
              className="transition-colors hover:text-espresso"
            >
              Journal
            </Link>
            <span aria-hidden="true" className="text-latte">
              /
            </span>
            <span aria-current="page" className="text-espresso">
              {category.title}
            </span>
          </nav>

          <div className="mt-9 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-caramel-deep">
                <span aria-hidden="true" className="h-px w-10 bg-latte" />
                Browsing by category
              </p>
              <h1 className="mt-6 text-balance font-serif text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-espresso sm:text-6xl">
                {category.title}
              </h1>
              {category.description ? (
                <p className="mt-6 max-w-xl text-base leading-8 text-mocha sm:text-lg">
                  {category.description}
                </p>
              ) : null}
            </div>

            <div className="w-full rounded-[1.5rem] border border-line bg-cream/75 p-6 backdrop-blur lg:max-w-xs lg:justify-self-end">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-caramel-deep">
                In this corner
              </p>
              <p className="mt-2 font-serif text-3xl text-espresso">
                {posts.length} {posts.length === 1 ? "story" : "stories"}
              </p>
              <Link
                href="/#journal"
                className="mt-4 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-espresso transition-colors hover:text-caramel-deep"
              >
                All journal notes
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5"
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
                <h2 className="font-serif text-2xl font-medium tracking-tight text-espresso sm:text-3xl">
                  Latest in {category.title}
                </h2>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-mocha">
                  {posts.length} {posts.length === 1 ? "story" : "stories"} ·{" "}
                  <Link
                    href="/category"
                    className="underline decoration-latte decoration-1 underline-offset-4 transition-colors hover:text-espresso"
                  >
                    all categories
                  </Link>
                </p>
              </div>

              <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    featured={index === 0}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyCategory categoryTitle={category.title} />
          )}
        </div>
      </section>

      {otherCategories.length > 0 ? (
        <section
          aria-labelledby="other-categories"
          className="border-t border-line/70 bg-foam/55 py-14 sm:py-16"
        >
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-caramel-deep">
                  Keep browsing
                </p>
                <h2
                  id="other-categories"
                  className="mt-2 font-serif text-3xl font-medium tracking-tight text-espresso"
                >
                  Other corners of the café
                </h2>
              </div>
              <Link
                href="/category"
                className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-espresso transition-colors hover:text-caramel-deep"
              >
                All categories
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5"
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
              </Link>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {otherCategories.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/category/${item.slug}`}
                    className="inline-flex items-center rounded-full border border-line bg-cream px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-mocha transition-colors duration-300 hover:border-caramel hover:text-caramel-deep"
                  >
                    {item.title}
                    <span className="ml-2 text-[0.55rem] text-mocha">
                      {item.postCount ?? 0}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function EmptyCategory({ categoryTitle }: { categoryTitle: string }) {
  return (
    <div className="rounded-[2rem] border border-line bg-foam/60 px-6 py-16 text-center sm:px-12 sm:py-20">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-caramel-deep">
        Still brewing
      </p>
      <h2 className="mt-3 text-balance font-serif text-3xl text-espresso sm:text-4xl">
        No stories in this corner yet.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-mocha">
        We are steeping something for {categoryTitle}. In the meantime, pour
        yourself a cup and wander through the rest of the journal.
      </p>
      <Link
        href="/#journal"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-mocha"
      >
        Back to the journal
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5"
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
      </Link>
    </div>
  );
}
