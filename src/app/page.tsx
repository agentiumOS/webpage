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

export const metadata: Metadata = {
  title: { absolute: "Agentium — Everything you need to make agents in TypeScript" },
  description:
    "Build agent applications with models, tools, memory, teams, workflows, and runtime integrations in one TypeScript framework.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Agentium — Everything you need to make agents in TypeScript",
    description:
      "Build agent applications with models, tools, memory, teams, workflows, and runtime integrations in one TypeScript framework.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
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
