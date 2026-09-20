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
    anchor: "jev-decisions",
    title: "Route a request with Jev",
    description: "Turn a request into a typed decision your application can use.",
    tags: ["Jev", "Decisions"],
    links: [{ label: "Open recipe", href: docs("/examples/jev") }],
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
];
