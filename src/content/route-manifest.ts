/**
 * Single source of truth for indexable marketing routes.
 *
 * `lastModified` feeds the XML sitemap and JSON-LD `dateModified`. Bump the
 * date for a route whenever its copy or structure changes; never generate it
 * at build time, because a fabricated date is worse than none.
 */

/** One positioning sentence, reused verbatim across metadata and structured data. */
export const POSITIONING =
  "Agentium is a TypeScript agent framework for Node.js: models, tools, memory, teams, workflows, and runtime integrations in one codebase.";

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
    title: "Agentium — TypeScript agent framework for Node.js",
    description:
      "Build agent applications in TypeScript: models, typed tools, memory, teams, workflows, approvals, evaluation, and runtime integrations in one framework. Open source, MIT.",
    label: "Agentium",
    lastModified: "2026-09-20",
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
    title: "Integrations — models, toolkits, storage, MCP and A2A — Agentium",
    description:
      "Model providers (OpenAI, Anthropic, Gemini, Ollama, Bedrock, Azure, Jev), toolkits (GitHub, Slack, Notion, Gmail, Sheets), storage, and MCP/A2A for Agentium.",
    label: "Integrations",
    lastModified: "2026-09-20",
  },
  "/examples": {
    path: "/examples",
    title: "Examples — Agentium patterns for tools, memory, RAG, Jev, voice, browser",
    description:
      "Start with focused Agentium patterns for tools, memory, retrieval, Jev decisions, human approval, voice, and browser agents. Each recipe opens in the documentation.",
    label: "Examples",
    lastModified: "2026-09-20",
  },
};

export const indexableRoutes: RouteEntry[] = Object.values(routeManifest);
