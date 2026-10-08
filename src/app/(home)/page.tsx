import type { Metadata, Viewport } from "next";
import { LandingClient } from "@/components/editorial/landing-client";
import { JsonLd } from "@/components/seo/json-ld";
import { routeManifest } from "@/content/route-manifest";
import { globalGraph, sourceCode, webPage } from "@/lib/structured-data";
import "./homepage.css";

const route = routeManifest["/"];

export const metadata: Metadata = {
  title: { absolute: route.title },
  description: route.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: route.title,
    description: route.description,
    url: "/",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Agentium: Build AI apps in TypeScript with agents, voice, images, and phone calls.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: route.title,
    description: route.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = { themeColor: "#fcfcf8" };

export default function HomePage() {
  return (
    <>
      <JsonLd graph={[...globalGraph(), sourceCode(), webPage({ path: "/" })]} />
      <LandingClient />
    </>
  );
}
