/**
 * Site-wide configuration.
 *
 * The canonical production origin is fixed so metadata, canonicals, the
 * sitemap, and Open Graph URLs never depend on a dashboard-only environment
 * variable. Preview deployments resolve to their own Vercel URL and are never
 * indexable; local development resolves to localhost.
 */
export const PRODUCTION_ORIGIN = "https://agentium.in";
export const DOCS_ORIGIN = "https://docs.agentium.in";

const VERCEL_ENV = process.env.VERCEL_ENV; // "production" | "preview" | "development" | undefined
const VERCEL_URL = process.env.VERCEL_URL; // host only, no protocol

function resolveOrigin(): string {
  const override = process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/$/, "");
  if (override) return override;
  if (VERCEL_ENV === "production") return PRODUCTION_ORIGIN;
  if (VERCEL_URL) return `https://${VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE_ORIGIN = resolveOrigin();

/** True only for the real production origin. Everything else ships `noindex`. */
export const IS_INDEXABLE = VERCEL_ENV === "production" && SITE_ORIGIN === PRODUCTION_ORIGIN;

/** @deprecated Use IS_INDEXABLE. Kept for older call sites. */
export const IS_PRODUCTION_ORIGIN = IS_INDEXABLE;

// Guard against a production build that would publish the wrong origin.
if (VERCEL_ENV === "production" && SITE_ORIGIN !== PRODUCTION_ORIGIN) {
  throw new Error(
    `Refusing to build for production with SITE_ORIGIN=${SITE_ORIGIN}; expected ${PRODUCTION_ORIGIN}. ` +
      "Unset or correct NEXT_PUBLIC_SITE_ORIGIN in the Vercel Production environment.",
  );
}

/** Resolve a docs-relative path (e.g. "/quickstart") to an absolute URL. */
export function docs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${DOCS_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Resolve a site-relative path to an absolute URL on the current origin. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

/** GA4 measurement ID. Loaded only when defined. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** GA4 debug mode for every non-production deployment (DebugView). */
export const GA_DEBUG_MODE = VERCEL_ENV !== "production";
