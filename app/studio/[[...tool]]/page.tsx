import type { Metadata, Viewport } from "next";

import Studio from "./Studio";

export const metadata: Metadata = {
  title: {
    absolute: "Studio · Ana café",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <Studio />;
}
