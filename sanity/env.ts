/**
 * Sanity connection settings.
 *
 * Add these to `.env.local` (and to your Vercel project settings):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   NEXT_PUBLIC_SANITY_API_VERSION
 */
const fallbackProjectId = "your-project-id";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || fallbackProjectId;

/** True once a real Sanity project id has been provided. */
export const isSanityConfigured =
  Boolean(projectId) && projectId !== fallbackProjectId;
