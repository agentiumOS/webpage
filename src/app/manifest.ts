import type { MetadataRoute } from "next";
import { POSITIONING, SITE_NAME } from "@/content/route-manifest";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: POSITIONING,
    start_url: "/",
    display: "browser",
    background_color: "#f3f6fc",
    theme_color: "#f3f6fc",
    icons: [
      { src: "/icon0.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon1", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
