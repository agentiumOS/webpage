/**
 * Site-wide configuration. The marketing origin is configurable so
 * canonical URLs, sitemap, and Open Graph tags resolve correctly once
 * the production hostname is known. Until then, a placeholder origin is used
 * and preview environments are marked non-indexable.
 */
export const DOCS_ORIGIN = "https://docs.agentium.in";

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const IS_PRODUCTION_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN !== undefined &&
  process.env.VERCEL_ENV !== "preview";

/** Resolve a docs-relative path (e.g. "/quickstart") to an absolute URL. */
export function docs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${DOCS_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
