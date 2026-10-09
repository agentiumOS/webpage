import { docs } from "@/lib/site-config";

export type ExampleLink = { label: string; href: string };

export type ExampleRecipe = {
  anchor: string;
  title: string;
  description: string;
  tags: string[];
  /** A single link makes the whole card an anchor. Multiple links render separately. */
  links: ExampleLink[];
};

export const exampleRecipes: ExampleRecipe[] = [
  {
    anchor: "support",
    title: "Remember the conversation",
    description:
      "Start with session history and add memory that fits your support application.",
    tags: ["Memory", "Sessions"],
    links: [{ label: "Open recipe", href: docs("/examples/memory-sessions") }],
  },
  {
    anchor: "research",
    title: "Retrieve before you answer",
    description:
      "Give the agent a retrieval tool and let source material inform its response.",
    tags: ["Knowledge", "RAG"],
    links: [{ label: "Open recipe", href: docs("/examples/knowledge-rag") }],
  },
  {
    anchor: "images",
    title: "Create images from a brief",
    description: "Give an agent OpenAI image tools for generation and editing.",
    tags: ["Images", "Tools"],
    links: [{ label: "Open guide", href: docs("/toolkits/image-generation") }],
  },
  {
    anchor: "telephony",
    title: "Manage an outbound call",
    description: "Try call intents, authorization, and confirmed hangup with a local provider fixture before connecting a carrier.",
    tags: ["Telephony", "Adapters"],
    links: [{ label: "Open recipe", href: docs("/examples/telephony") }],
  },
  {
    anchor: "harness",
    title: "Put a workflow inside a harness",
    description: "Apply tool grants and an approval policy to a refund-review workflow. Compare approved and denied outcomes locally.",
    tags: ["Harnesses", "Approval"],
    links: [{ label: "Open recipe", href: docs("/examples/harness-workflow") }],
  },
  {
    anchor: "costs",
    title: "Inspect the cost of a run",
    description: "Read provider usage and cost estimates, attach an observer, and add budget checks.",
    tags: ["Costs", "Observability"],
    links: [{ label: "Open recipe", href: docs("/examples/cost-observability") }],
  },
  {
    anchor: "workflows",
    title: "Define a workflow in TypeScript",
    description: "Compose typed state, conditional steps, and application functions. Add model calls where the work needs judgment.",
    tags: ["Workflows", "TypeScript"],
    links: [{ label: "Open recipe", href: docs("/examples/workflows") }],
  },
  {
    anchor: "tools",
    title: "Connect a useful tool",
    description: "Define a typed function or add a ready-made toolkit.",
    tags: ["Tools", "TypeScript"],
    links: [{ label: "Open recipe", href: docs("/examples/tools-toolkits") }],
  },
  {
    anchor: "skills",
    title: "Package a repeatable skill",
    description: "Bundle instructions and tools around a particular job.",
    tags: ["Skills", "Reuse"],
    links: [{ label: "Open recipe", href: docs("/examples/skills") }],
  },
  {
    anchor: "approval",
    title: "Require approval before an action",
    description:
      "Pause a sensitive tool call until a human approves it, then record the outcome.",
    tags: ["Approval", "Controls"],
    links: [
      { label: "Human-in-the-loop guide", href: docs("/agents/approval") },
      { label: "Approval gates", href: docs("/features/approval-gates") },
    ],
  },
  {
    anchor: "voice-browser",
    title: "Explore voice and browser agents",
    description: "Follow dedicated guides for spoken interaction and browser tasks.",
    tags: ["Voice", "Browser"],
    links: [
      { label: "Voice guide", href: docs("/voice/overview") },
      { label: "Browser guide", href: docs("/browser/overview") },
    ],
  },
  {
    anchor: "jev-decisions",
    title: "Route a request with Jev",
    description: "Turn a request into a typed decision your application can use.",
    tags: ["Jev", "Decisions"],
    links: [{ label: "Open recipe", href: docs("/examples/jev") }],
  },
];
