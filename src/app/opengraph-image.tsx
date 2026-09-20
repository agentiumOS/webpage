import { routeManifest } from "@/content/route-manifest";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Agentium — TypeScript agent framework for Node.js";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "TypeScript agent framework",
    title: "The whole agent stack in one TypeScript framework.",
    description: routeManifest["/"].description,
  });
}
