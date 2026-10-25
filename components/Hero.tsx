import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="paper-grain relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 size-[30rem] rounded-full bg-latte-light/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-latte/15 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-mocha">
            <span aria-hidden="true" className="h-px w-10 bg-latte" />
            A slow living journal
          </p>

          <h1 className="mt-7 text-balance font-serif text-5xl font-medium leading-[0.95] tracking-[-0.02em] text-espresso sm:text-6xl lg:text-7xl">
            Life is better
            <br />
            with a little{" "}
            <span className="relative inline-block italic text-caramel">
              café
              <svg
                aria-hidden="true"
                viewBox="0 0 120 12"
                className="absolute -bottom-2 left-0 w-full text-latte"
                fill="none"
              >
                <path
                  d="M3 8.5c24-5 49-6.5 76-5 13 .7 25 2.2 38 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-9 max-w-md text-base leading-8 text-mocha sm:text-lg">
            Slow mornings, honest ingredients, and stories worth savouring.
            Welcome to a cozy corner for coffee rituals, seasonal recipes, and
            the art of taking your time.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/#journal"
              className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cream shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-mocha"
            >
              Read the journal
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
              >
                <path
                  d="M3 13 13 3M5 3h8v8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center rounded-full border border-espresso/20 px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:border-espresso hover:bg-foam"
            >
              Our story
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.26em] text-mocha">
            <span aria-hidden="true" className="h-px w-12 bg-line" />
            Freshly brewed · always
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[29rem] lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-t-[14rem] rounded-b-[2.5rem] bg-latte-light/45 blur-2xl"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[13rem] rounded-b-[2rem] border border-latte/30 bg-foam shadow-soft">
            <Image
              src="/hero-latte.jpg"
              alt="A creamy latte in a handmade ceramic cup"
              fill
              preload
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-cream/40 bg-cream/90 p-4 backdrop-blur-md">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-caramel-deep">
                Today&apos;s brew
              </p>
              <p className="mt-1 font-serif text-xl text-espresso">
                Honey oat latte
              </p>
            </div>
          </div>
          <div className="absolute -left-4 top-12 hidden rounded-full border border-line bg-cream/95 px-4 py-2 text-[0.58rem] uppercase tracking-[0.24em] text-mocha shadow-sm sm:block">
            Est. 2024
          </div>
        </div>
      </div>
    </section>
  );
}
