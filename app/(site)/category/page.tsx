import type { Metadata } from "next";
import Link from "next/link";

import { getCategories } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Browse by category",
  description:
    "Wander through Ana café by category — coffee rituals, seasonal recipes, and slow living notes.",
  alternates: {
    canonical: "/category",
  },
  openGraph: {
    type: "website",
    title: "Browse by category · Ana café",
    description:
      "Wander through Ana café by category — coffee rituals, seasonal recipes, and slow living notes.",
    url: "/category",
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main id="main-content">
      <section className="paper-grain relative overflow-hidden border-b border-line/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-0 size-80 rounded-full bg-latte-light/35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full bg-latte/15 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:py-18 lg:px-8 lg:py-20">
          <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-caramel-deep">
            <span aria-hidden="true" className="h-px w-10 bg-latte" />
            The journal
          </p>
          <h1 className="mt-6 max-w-2xl text-balance font-serif text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-espresso sm:text-6xl">
            Browse by category
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-mocha sm:text-lg">
            Some mornings call for a coffee ritual, others for a seasonal
            recipe or a quiet note on slowing down. Choose a corner and settle
            in.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          {categories.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const count = category.postCount ?? 0;

                return (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-line bg-foam/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-latte hover:bg-cream hover:shadow-lift"
                    >
                      <div>
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-caramel-deep">
                          {count === 1 ? "1 story" : `${count} stories`}
                        </p>
                        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-espresso transition-colors duration-300 group-hover:text-caramel-deep">
                          {category.title}
                        </h2>
                        {category.description ? (
                          <p className="mt-3 text-sm leading-7 text-mocha">
                            {category.description}
                          </p>
                        ) : null}
                      </div>

                      <span className="mt-6 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-espresso">
                        Explore
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
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-[2rem] border border-line bg-foam/60 px-6 py-16 text-center sm:px-12 sm:py-20">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-caramel-deep">
                Still brewing
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl text-espresso sm:text-4xl">
                Categories will bloom here soon.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-mocha">
                Once the journal has a few stories, their categories will be
                collected here for easy wandering.
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
          )}
        </div>
      </section>
    </main>
  );
}
