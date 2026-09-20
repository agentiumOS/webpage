import { routeManifest } from "@/content/route-manifest";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Jev + Agentium — typed decisions inside your agent application";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Jev + Agentium",
    title: "Let the model talk. Let Jev make the call.",
    description: routeManifest["/jev"].description,
  });
}
