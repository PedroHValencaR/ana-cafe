import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import type { SanityImage } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-[1.05rem] leading-8 text-espresso/90 first:mt-0 sm:text-lg sm:leading-9">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-espresso sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-balance font-serif text-2xl font-medium leading-tight tracking-tight text-espresso sm:text-[1.75rem]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-latte pl-6 font-serif text-2xl italic leading-relaxed text-mocha">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc space-y-2 pl-5 marker:text-latte">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-caramel-deep">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="pl-1 text-[1.05rem] leading-8 text-espresso/90">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-1 text-[1.05rem] leading-8 text-espresso/90">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-espresso">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-espresso">{children}</em>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : null;

      if (!href) {
        return <>{children}</>;
      }

      return (
        <a
          href={href}
          target={value?.blank ? "_blank" : undefined}
          rel={value?.blank ? "noopener noreferrer" : undefined}
          className="font-medium text-caramel-deep underline decoration-latte/70 decoration-1 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => (
      <ArticleImage value={value as SanityImage & { caption?: string }} />
    ),
  },
};

function ArticleImage({
  value,
}: {
  value: SanityImage & { caption?: string };
}) {
  if (!value?.asset?._ref) {
    return null;
  }

  const dimensions = value.dimensions ?? value.asset.metadata?.dimensions;

  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl border border-line bg-foam">
        <Image
          src={urlForImage(value)
            .width(1500)
            .fit("max")
            .auto("format")
            .url()}
          alt={value.alt || ""}
          width={dimensions?.width ?? 1200}
          height={dimensions?.height ?? 800}
          sizes="(min-width: 768px) 672px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {value.caption ? (
        <figcaption className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.2em] text-mocha">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function ArticleBody({
  value,
}: {
  value: Parameters<typeof PortableText>[0]["value"];
}) {
  return <PortableText value={value} components={components} />;
}
