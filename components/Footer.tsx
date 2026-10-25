import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-foam/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div>
          <p className="font-serif text-3xl font-medium tracking-tight text-espresso">
            Ana café
          </p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-mocha">
            Coffee, comfort, and a little room to breathe. Made for slow
            mornings and the stories that come with them.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <nav aria-label="Footer navigation" className="flex items-center gap-5">
            <Link
              href="/#journal"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mocha transition-colors hover:text-espresso"
            >
              Journal
            </Link>
            <Link
              href="/#about"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mocha transition-colors hover:text-espresso"
            >
              About
            </Link>
            <Link
              href="/category"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mocha transition-colors hover:text-espresso"
            >
              Categories
            </Link>
          </nav>
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-mocha">
            © 2026 Ana café · Brewed with care
          </p>
        </div>
      </div>
    </footer>
  );
}
