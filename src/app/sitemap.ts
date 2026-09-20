import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/content/route-manifest";
import { SITE_ORIGIN } from "@/lib/site-config";

/**
 * Only canonical, indexable marketing URLs. Documentation has its own sitemap
 * at https://docs.agentium.in/sitemap.xml and is submitted separately.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: route.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route.path}`,
    lastModified: route.lastModified,
  }));
}
