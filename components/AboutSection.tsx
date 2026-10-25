import Image from "next/image";

const rituals = [
  {
    number: "01",
    title: "Slow mornings",
    text: "A quiet start, a warm cup, and no rush to be anywhere else.",
  },
  {
    number: "02",
    title: "Honest ingredients",
    text: "Simple things, made well. Seasonal, comforting, and unfussy.",
  },
  {
    number: "03",
    title: "Stories worth keeping",
    text: "Small observations and everyday rituals, written down to savour.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line/70 bg-foam/55 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:px-8">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[10rem] rounded-b-[1.75rem] border border-latte/30 bg-latte-light/40 shadow-lift">
            <Image
              src="/about-coffee.jpg"
              alt="A freshly brewed cup of coffee beside scattered beans on a wooden table"
              fill
              sizes="(min-width: 1024px) 35vw, (min-width: 640px) 60vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-5 -right-3 max-w-[13rem] rounded-2xl border border-line bg-cream p-4 shadow-soft sm:-right-6">
            <p className="font-serif text-lg italic leading-snug text-espresso">
              “Take your time. The coffee will wait.”
            </p>
            <p className="mt-2 text-[0.55rem] uppercase tracking-[0.24em] text-mocha">
              Ana&apos;s note
            </p>
          </div>
        </div>

        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-caramel-deep">
            A note from Ana
          </p>
          <h2 className="mt-4 max-w-xl text-balance font-serif text-4xl font-medium tracking-tight text-espresso sm:text-5xl">
            A slower kind of morning.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-mocha">
            Ana café began as a small ritual: one good cup of coffee, a few
            quiet minutes, and a page to collect the thoughts that surfaced.
            It is a place for seasonal recipes, gentle routines, and the
            beautiful ordinary moments that are easy to miss when we move too
            fast.
          </p>

          <blockquote className="mt-8 border-l border-latte pl-6">
            <p className="font-serif text-2xl italic leading-relaxed text-espresso/90">
              “A good cup of coffee is an invitation to stay a little longer.”
            </p>
          </blockquote>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {rituals.map((ritual) => (
              <div key={ritual.number} className="border-t border-line pt-4">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-caramel-deep">
                  {ritual.number}
                </p>
                <h3 className="mt-2 font-serif text-xl text-espresso">
                  {ritual.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-mocha">
                  {ritual.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
