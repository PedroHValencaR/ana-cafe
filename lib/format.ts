import { toPlainText, type PortableTextBlock } from "@portabletext/react";

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function getReadingTime(body?: PortableTextBlock[] | null) {
  if (!body?.length) {
    return 1;
  }

  const words = toPlainText(body)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}
