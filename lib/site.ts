/** Canonical site origin, without a trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const siteName = "Ana café";

export const siteDescription =
  "A cozy corner of the internet for coffee, seasonal recipes, and the art of taking your time.";

/** Default Open Graph / Twitter image (lives in `public/`). */
export const socialImage = {
  url: "/about-coffee.jpg",
  width: 1200,
  height: 800,
  alt: "A freshly brewed cup of coffee on a wooden café table",
};
