import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";
import { Code } from "@/components/sections/code";
import { JevSpotlight } from "@/components/sections/jev-spotlight";
import { Capabilities } from "@/components/sections/capabilities";
import { Flow } from "@/components/sections/flow";
import { Controls } from "@/components/sections/controls";
import { IntegrationsPreview } from "@/components/sections/integrations-preview";
import { ExamplesPreview } from "@/components/sections/examples-preview";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { routeManifest } from "@/content/route-manifest";
import { globalGraph, sourceCode, webPage } from "@/lib/structured-data";

const route = routeManifest["/"];

export const metadata: Metadata = {
  title: { absolute: route.title },
  description: route.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: route.title,
    description: route.description,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd graph={[...globalGraph(), sourceCode(), webPage({ path: "/" })]} />
      <Hero />
      <Stack />
      <Code />
      <JevSpotlight />
      <Capabilities />
      <Flow />
      <Controls />
      <IntegrationsPreview />
      <ExamplesPreview />
      <Faq />
      <FinalCta />
    </>
  );
}
