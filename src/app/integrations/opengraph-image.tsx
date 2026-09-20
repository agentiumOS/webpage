import { routeManifest } from "@/content/route-manifest";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Agentium integrations — models, toolkits, storage, MCP and A2A";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Integrations",
    title: "Your stack, connected.",
    description: routeManifest["/integrations"].description,
  });
}
