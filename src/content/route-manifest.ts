/**
 * Single source of truth for indexable marketing routes.
 *
 * `lastModified` feeds the XML sitemap and JSON-LD `dateModified`. Bump the
 * date for a route whenever its copy or structure changes; never generate it
 * at build time, because a fabricated date is worse than none.
 */

/** One positioning sentence, reused verbatim across metadata and structured data. */
export const POSITIONING =
  "Agentium is an open-source TypeScript SDK for agents, harnesses, voice, image generation, telephony, workflows, and cost tracking in Node.js.";

export const SITE_NAME = "Agentium";

export type RoutePath = "/" | "/jev" | "/integrations" | "/examples";

export type RouteEntry = {
  path: RoutePath;
  /** Document title (absolute, no template). Keep ≤ 60 characters. */
  title: string;
  /** Meta description. Keep ≤ 155 characters. */
  description: string;
  /** Short label used in breadcrumbs and OG images. */
  label: string;
  /** ISO date of the last meaningful content change. */
  lastModified: string;
};

export const routeManifest: Record<RoutePath, RouteEntry> = {
  "/": {
    path: "/",
    title: "Agentium — TypeScript SDK for AI Agents, Voice & Tools",
    description:
      "Build AI apps with Agentium, the open-source TypeScript SDK for agents, harnesses, voice, images, phone calls, workflows, and cost tracking.",
    label: "Agentium",
    lastModified: "2026-10-09",
  },
  "/jev": {
    path: "/jev",
    title: "Jev + Agentium — typed decisions, judgment tools, and eval scoring",
    description:
      "Use Jev, TypeSafe AI's decision model, inside Agentium: as the agent model with choice/noul/score questions, as a JevToolkit for chat agents, or as a custom eval scorer.",
    label: "Jev",
    lastModified: "2026-09-20",
  },
  "/integrations": {
    path: "/integrations",
    title: "Integrations — models, voice, tools & storage — Agentium",
    description:
      "Explore Agentium adapters for models, realtime voice, speech, phone calls, image generation, service toolkits, storage, MCP, and A2A.",
    label: "Integrations",
    lastModified: "2026-10-09",
  },
  "/examples": {
    path: "/examples",
    title: "Agentium Examples — Agents, Voice, Images & Workflows",
    description:
      "Explore TypeScript examples for agents, harnesses, voice, image generation, telephony, workflows, and cost tracking. Build from focused recipes.",
    label: "Examples",
    lastModified: "2026-10-09",
  },
};

export const indexableRoutes: RouteEntry[] = Object.values(routeManifest);
