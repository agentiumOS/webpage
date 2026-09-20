import { routeManifest } from "@/content/route-manifest";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Agentium examples — working patterns for agent applications";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Examples",
    title: "Start with a working pattern.",
    description: routeManifest["/examples"].description,
  });
}
