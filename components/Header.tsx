import Link from "next/link";

const navigation = [
  { href: "/#journal", label: "Journal" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden="true"
            className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-latte/60 bg-foam text-caramel transition-colors duration-300 group-hover:border-caramel group-hover:bg-latte-light"
          >
            <span className="font-serif text-2xl italic leading-none">a</span>
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-latte"
            />
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-[1.65rem] font-medium leading-none tracking-tight text-espresso">
              Ana café
            </span>
            <span className="mt-1 hidden text-[0.58rem] uppercase tracking-[0.32em] text-mocha sm:block">
              a slow living journal
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-5 sm:gap-8"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mocha transition-colors duration-300 hover:text-espresso"
            >
              {item.label}
            </Link>
          ))}
          <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
          <Link
            href="/#journal"
            className="hidden rounded-full border border-espresso/15 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso hover:text-cream md:inline-flex"
          >
            Read the journal
          </Link>
        </nav>
      </div>
    </header>
  );
}
