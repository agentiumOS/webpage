import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-config";

/**
 * robots.txt is a crawl control, not an indexing control. Non-production
 * deployments are kept out of the index with `noindex` (meta + Vercel's
 * X-Robots-Tag on previews), so the same permissive file is served everywhere;
 * a `Disallow: /` would stop crawlers from ever seeing the `noindex`.
 *
 * AI training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
 * CCBot) are currently allowed, matching docs.agentium.in
 * (Content-Signal: ai-train=yes). Change both together if policy changes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
