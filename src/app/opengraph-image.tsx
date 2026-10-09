import { routeManifest } from "@/content/route-manifest";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Agentium — TypeScript SDK for agents, voice, images, and tools";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Open-source TypeScript SDK",
    title: "Build your next idea. Connect it with AI.",
    description: routeManifest["/"].description,
  });
}
