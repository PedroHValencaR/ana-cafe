import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-latte-light/30 blur-3xl"
      />
      <div className="relative">
        <Link
          href="/"
          className="font-serif text-2xl italic tracking-tight text-espresso"
        >
          Ana café
        </Link>
        <p className="mt-12 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-caramel-deep">
          404 · Page not found
        </p>
        <h1 className="mt-4 text-balance font-serif text-5xl font-medium tracking-tight text-espresso sm:text-6xl">
          This cup is empty.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-mocha">
          The page you were looking for has wandered off. Let&apos;s get you
          back to something warm.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-mocha"
        >
          Back to the café
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
    </main>
  );
}
