import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/sanity/lib/types";
import PostCard from "./PostCard";

type JournalSectionProps = {
  posts: Post[];
};

export default function JournalSection({ posts }: JournalSectionProps) {
  return (
    <section
      id="journal"
      className="scroll-mt-24 border-t border-line/70 bg-cream py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-line pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-caramel-deep">
              The journal
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-espresso sm:text-5xl">
              Notes from the café
            </h2>
          </div>
          <div className="sm:text-right">
            <p className="max-w-sm text-sm leading-7 text-mocha">
              Little stories about coffee, comfort, and finding beauty in the
              everyday. Pour yourself a cup and stay a while.
            </p>
            <Link
              href="/category"
              className="mt-4 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-caramel-deep transition-colors hover:text-espresso"
            >
              Browse categories
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

        {posts.length > 0 ? (
          <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} featured={index === 0} />
            ))}
          </div>
        ) : (
          <EmptyJournal />
        )}
      </div>
    </section>
  );
}

function EmptyJournal() {
  return (
    <div className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-foam/60 px-6 py-16 text-center sm:px-12 sm:py-20">
      <div className="relative mx-auto mb-7 flex size-16 items-center justify-center rounded-full border border-latte/60 bg-cream">
        <Image
          src="/hero-latte.jpg"
          alt=""
          fill
          sizes="64px"
          className="rounded-full object-cover opacity-80"
        />
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-cream/60" />
      </div>
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-caramel-deep">
        Still brewing
      </p>
      <h3 className="mt-3 font-serif text-3xl text-espresso sm:text-4xl">
        The first story is on its way.
      </h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-mocha">
        New notes will appear here soon. In the meantime, pour yourself
        something warm and enjoy the quiet.
      </p>
    </div>
  );
}
