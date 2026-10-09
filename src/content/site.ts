import { docs } from "@/lib/site-config";

export type Cta = {
  label: string;
  href: string;
  kind: "primary" | "secondary" | "text";
};

export type NavLink = { label: string; href: string; external?: boolean };

export type PlatformItem = {
  title: string;
  description: string;
  href: string;
};

export const site = {
  name: "Agentium",
  tagline: "The TypeScript SDK behind your AI application.",
  announcement: {
    copy: "Jev + Agentium: decisions, tools, and evaluations.",
    linkLabel: "See how",
    href: "/jev",
  },
  nav: {
    platform: {
      label: "Platform",
      items: [
        {
          title: "The complete stack",
          description: "See how the pieces work together.",
          href: "/#stack",
        },
        {
          title: "SDK capabilities",
          description: "Tools, memory, harnesses, and workflows.",
          href: "/#capabilities",
        },
        {
          title: "Runtime controls",
          description: "Approvals, budgets, and visibility.",
          href: "/#controls",
        },
        {
          title: "Code examples",
          description: "Start with a small working pattern.",
          href: "/#code",
        },
      ] satisfies PlatformItem[],
    },
    links: [
      { label: "Jev", href: "/jev" },
      { label: "Integrations", href: "/integrations" },
      { label: "Examples", href: "/examples" },
      { label: "Docs", href: docs("/"), external: true },
    ] satisfies NavLink[],
    cta: { label: "Start building", href: docs("/quickstart"), kind: "primary" } satisfies Cta,
  },
  footer: {
    eyebrow: "Open-source TypeScript SDK",
    install: "npm install @agentium/core",
    installHelper: "Start with core. Add packages as you need them.",
    start: { label: "Open the quickstart", href: docs("/quickstart") },
    docs: {
      label: "Documentation",
      href: docs("/"),
      host: "docs.agentium.in",
    },
    stackLine: "TypeScript · Node.js",
    backToTop: "Back to top",
    columns: [
      {
        heading: "Product",
        links: [
          { label: "The stack", href: "/#stack" },
          { label: "Jev", href: "/jev" },
          { label: "Integrations", href: "/integrations" },
          { label: "Examples", href: "/examples" },
          { label: "Runtime controls", href: "/#controls" },
        ],
      },
      {
        heading: "Build",
        links: [
          { label: "Quickstart", href: docs("/quickstart"), external: true },
          { label: "Documentation", href: docs("/"), external: true },
          { label: "Agents", href: docs("/agents/overview"), external: true },
          { label: "Code examples", href: "/#code" },
          { label: "Example recipes", href: "/examples" },
        ],
      },
      {
        heading: "Develop",
        links: [
          { label: "Architecture", href: docs("/system-architecture"), external: true },
          { label: "Migration guide", href: docs("/migration-v3"), external: true },
          { label: "Evaluation", href: docs("/eval/overview"), external: true },
          { label: "Observability", href: docs("/observability/overview"), external: true },
          { label: "Approval gates", href: docs("/features/approval-gates"), external: true },
        ],
      },
      {
        heading: "Guides",
        links: [
          { label: "Models", href: docs("/models/overview"), external: true },
          { label: "Voice & calls", href: docs("/voice/overview"), external: true },
          { label: "Image generation", href: docs("/toolkits/image-generation"), external: true },
          { label: "Harnesses", href: docs("/harness/overview"), external: true },
          { label: "Cost tracking", href: docs("/cost/overview"), external: true },
        ],
      },
    ] satisfies { heading: string; links: NavLink[] }[],
  },
} as const;

/* ------------------------------------------------------------------ */
/* Homepage                                                            */
/* ------------------------------------------------------------------ */

export const home = {
  hero: {
    eyebrow: "Agentium / TypeScript AI SDK",
    h1: ["Build your next idea.", "Connect it with AI."],
    lead: "Build agents, voice conversations, image generation, and phone calls with one TypeScript SDK. Add the tools, memory, workflows, and controls your Node.js application needs.",
    primary: { label: "Start building", href: docs("/quickstart"), kind: "primary" } satisfies Cta,
    secondary: { label: "Explore the stack", href: "/#stack", kind: "secondary" } satisfies Cta,
    install: "npm install @agentium/core",
    helper: "Start with core. Add the integrations your application needs.",
    capabilities: ["Agents", "Harnesses", "Voice", "Images", "Telephony", "Workflows"],
    usps: [
      "One composable TypeScript SDK",
      "Choose your models",
      "Keep your infrastructure",
      "Typed tools with Zod",
      "Memory you configure",
      "Teams and workflows",
      "Jev typed decisions",
      "Approval gates",
      "Budget checks",
      "Tracing and metrics",
      "Evaluation package",
      "MCP and A2A",
      "Realtime voice",
      "Image generation tools",
      "Telephony adapters",
      "Reusable harnesses",
      "Cost accounting",
      "Browser automation",
    ],
  },

  stack: {
    eyebrow: "One SDK, connected parts",
    h2: "Everything around the model, working together.",
    lead: "Start with the capability your product needs. Compose the rest through dedicated APIs, provider adapters, and a shared TypeScript foundation.",
    frameLabel: "Your AI application",
    modules: [
      {
        id: "agents",
        icon: "layers",
        title: "Agents & harnesses",
        copy: "Define the model, instructions, and tools. Add a reusable execution environment with the harness package.",
        href: docs("/harness/overview"),
      },
      {
        id: "voice",
        icon: "mic",
        title: "Voice & phone calls",
        copy: "Use realtime models or compose speech pipelines. Connect carrier adapters for outbound calls.",
        href: docs("/voice/overview"),
      },
      {
        id: "images",
        icon: "image",
        title: "Images & creative tools",
        copy: "Generate and edit images through OpenAI tools, directly or as part of an agent workflow.",
        href: docs("/toolkits/image-generation"),
      },
      {
        id: "teams",
        icon: "gitBranch",
        title: "Teams & workflows",
        copy: "Coordinate specialists, branch on results, and combine agent calls with your application code.",
        href: docs("/teams/overview"),
      },
      {
        id: "memory",
        icon: "database",
        title: "Memory & knowledge",
        copy: "Bring conversation history, saved facts, and retrieved context into the next run.",
        href: docs("/memory/overview"),
      },
      {
        id: "cost",
        icon: "gauge",
        title: "Costs & controls",
        copy: "Track provider usage and estimated charges. Set budgets and require approval for selected tools.",
        href: docs("/cost/overview"),
      },
    ],
    footerCopy: "Start small. Add capabilities without changing the foundation.",
    footerLinks: [
      { label: "Agents", href: docs("/agents/overview"), external: true },
      { label: "Architecture", href: docs("/system-architecture"), external: true },
      { label: "Quickstart", href: docs("/quickstart"), external: true },
    ] satisfies NavLink[],
  },

  code: {
    eyebrow: "Start with TypeScript",
    h2: "Your first agent should look familiar.",
    lead: "Define its job, choose a model, and run it. Add capabilities when the work calls for them.",
    link: { label: "Read the quickstart", href: docs("/quickstart") },
  },

  jev: {
    eyebrow: "Jev + Agentium",
    h2: ["Let the model talk.", "Let Jev make the call."],
    lead: "Add Jev’s typed decisions to your Agentium application. Use it to choose a route, give a chat agent a judgment tool, or score a response in an evaluation.",
    primary: { label: "Build with Jev", href: "/jev", kind: "primary" } satisfies Cta,
    secondary: {
      label: "Read the integration guide",
      href: docs("/models/jev"),
      kind: "secondary",
    } satisfies Cta,
    cards: [
      {
        title: "Make the decision",
        copy: "Pass context and a defined set of questions. Get decisions your code can use.",
        link: { label: "Model integration", href: docs("/models/jev") },
      },
      {
        title: "Give your agent a second opinion",
        copy: "Let a chat agent call Jev when it needs a label, probability, or rubric score.",
        link: { label: "Jev toolkit", href: docs("/toolkits/jev") },
      },
      {
        title: "Put judgments into your evals",
        copy: "Score generated responses against criteria you define.",
        link: { label: "Evaluation guide", href: docs("/eval/jev") },
      },
    ],
    demo: {
      heading: "See a decision flow",
      badge: "Illustrative example",
      replay: "Replay example",
      examples: [
        {
          id: "route",
          label: "Route",
          input: "My invoice shows the same charge twice.",
          question: "Which team should receive this?",
          helper: "choice",
          output: "billing",
          alternatives: ["technical", "other"],
          caption: "Example choice label.",
          note: "Your application decides what happens with the result.",
        },
        {
          id: "urgency",
          label: "Urgency",
          input: "Checkout has stopped working for every customer.",
          question: "Does this need immediate review?",
          helper: "noul",
          output: "0.94",
          alternatives: [],
          caption: "Example noul value · 0–1.",
          note: "Your application decides the escalation rule.",
        },
        {
          id: "quality",
          label: "Quality",
          input: "Draft reply evaluated against a helpfulness rubric.",
          question: "How useful is this reply?",
          helper: "score",
          output: "Useful",
          alternatives: [],
          caption: "Example rubric level.",
          note: "Define the rubric levels that matter to your product.",
        },
      ],
    },
  },

  capabilities: {
    eyebrow: "Build the application",
    h2: "The parts you need, already connected.",
    lead: "Build on the same foundations whether your product answers questions, creates images, handles calls, or coordinates a team of agents.",
    cards: {
      memory: {
        title: "Keep the context that matters.",
        copy: "Save sessions, keep useful facts, and bring relevant context into the next conversation. Configure the storage behind it.",
        link: { label: "Explore memory", href: docs("/memory/overview") },
      },
      tools: {
        title: "Let agents do useful work.",
        copy: "Connect service APIs, image generation, and your own functions as typed tools. Add reusable skills for the work your agents repeat.",
        link: { label: "Explore tools", href: docs("/agents/tools") },
      },
      teams: {
        title: "Give each specialist a job.",
        copy: "Route a request, delegate tasks, or bring multiple agents together around the same problem.",
        link: { label: "Explore teams", href: docs("/teams/overview") },
      },
      workflows: {
        title: "Make the steps explicit.",
        copy: "Combine agent work with functions, conditions, and parallel steps. Carry shared state through the process.",
        link: { label: "Explore workflows", href: docs("/workflows/overview") },
      },
      knowledge: {
        title: "Bring your own knowledge.",
        copy: "Connect document retrieval to the agent’s tools so it can work with the information your application needs.",
        link: { label: "Explore retrieval", href: docs("/knowledge/overview") },
      },
      harness: {
        title: "Give the agent a working environment.",
        copy: "Package instructions, tools, policies, and session behavior in a reusable harness. Choose the driver that runs the work.",
        link: { label: "Explore the harness", href: docs("/harness/overview") },
      },
    },
  },

  flow: {
    eyebrow: "How the pieces work together",
    h2: "Follow one request through the stack.",
    lead: "Context, decisions, tools, and human review belong in the same application flow.",
    badge: "Illustrative support workflow",
    request: "I need help with invoice A104.",
    stages: [
      {
        id: "context",
        number: "01",
        label: "Context",
        heading: "Start with the right context.",
        body: "Load the conversation and retrieve the information the agent needs.",
        summary: "Account history and invoice A104 loaded",
      },
      {
        id: "decision",
        number: "02",
        label: "Decision",
        heading: "Make a decision you can use.",
        body: "Ask Jev to classify the request, then let your application choose the next step.",
        summary: "Jev classified the request as Billing",
      },
      {
        id: "tools",
        number: "03",
        label: "Tools",
        heading: "Let the agent use its tools.",
        body: "Give the specialist access to the relevant API and prepare the response.",
        summary: "lookup_invoice ran · draft response ready",
      },
      {
        id: "approval",
        number: "04",
        label: "Approval",
        heading: "Keep important actions in human hands.",
        body: "Require approval before a selected tool runs, then record what happened.",
        summary: "issue_credit is waiting for a reviewer",
      },
    ],
    requestLabel: "Incoming request",
    pendingLabel: "Not started",
    approval: {
      approve: "Approve example",
      deny: "Deny example",
      reset: "Reset example",
      waiting: "Waiting for review",
      approved: "Example approved",
      denied: "Example denied",
    },
  },

  controls: {
    eyebrow: "Keep control as you grow",
    h2: "Know what ran. Decide what runs next.",
    lead: "Track usage and estimated costs across providers. Add budget checks, tool approvals, tracing, and evaluations as your application grows.",
    items: [
      {
        icon: "shieldCheck",
        heading: "Approval gates",
        copy: "Require a human decision before selected tools execute.",
        href: docs("/features/approval-gates"),
      },
      {
        icon: "gauge",
        heading: "Costs & budgets",
        copy: "Account for provider usage, estimate charges, and check configured budgets during a run.",
        href: docs("/cost/overview"),
      },
      {
        icon: "activity",
        heading: "Run visibility",
        copy: "Add tracing, metrics, and structured logs through the observability package.",
        href: docs("/observability/overview"),
      },
      {
        icon: "flask",
        heading: "Evaluation",
        copy: "Define test cases and score outputs before you change production behavior.",
        href: docs("/eval/overview"),
      },
    ],
    events: {
      caption: "Example lifecycle events.",
      items: [
        { name: "run.start", detail: "agent · support-desk" },
        { name: "tool.call", detail: "lookup_invoice" },
        { name: "tool.result", detail: "invoice found" },
        { name: "run.complete", detail: "response ready" },
      ],
      href: docs("/agents/events"),
    },
  },

  integrations: {
    eyebrow: "Fits your stack",
    h2: "Choose your models. Keep your infrastructure.",
    lead: "Choose providers for models, speech, and phone calls. Connect your existing services and storage through dedicated adapters.",
    groups: [
      { label: "Models", ids: ["openai", "anthropic", "google-gemini", "ollama", "jev"] },
      { label: "Voice & calls", ids: ["openai-realtime", "elevenlabs", "livekit", "twilio"] },
      { label: "Services", ids: ["github", "slack", "notion", "gmail", "google-sheets"] },
      {
        label: "Storage & protocols",
        ids: ["postgresql", "mongodb", "redis", "mcp", "a2a"],
      },
    ],
    cta: { label: "Explore integrations", href: "/integrations", kind: "primary" } satisfies Cta,
    supporting: "Add the adapters and credentials you need for your chosen services.",
  },

  examples: {
    eyebrow: "What will you build?",
    h2: "Start with a job worth automating.",
    lead: "Explore patterns you can adapt to your own product.",
    cards: [
      {
        id: "support",
        title: "Support that remembers",
        copy: "Bring account context, ticket routing, and useful tools into the same support flow.",
        tags: ["Memory", "Tools", "Jev"],
        href: "/examples#support",
      },
      {
        id: "research",
        title: "Research with a review step",
        copy: "Retrieve source material, split the work, and review the result before it moves on.",
        tags: ["Knowledge", "Teams", "Workflows"],
        href: "/examples#research",
      },
      {
        id: "voice-browser",
        title: "Agents beyond the chat box",
        copy: "Explore voice conversations and browser tasks using Agentium’s dedicated integrations.",
        tags: ["Voice", "Browser"],
        href: "/examples#voice-browser",
      },
    ],
    cta: { label: "Browse examples", href: "/examples", kind: "secondary" } satisfies Cta,
  },

  faq: {
    h2: "A few things worth knowing.",
    items: [
      {
        q: "What is Agentium?",
        a: "Agentium is an open-source TypeScript SDK for building AI applications on Node.js. Core includes agents, tools, memory, teams, workflows, voice adapters, image tools, telephony, and cost accounting. Additional packages provide harnesses, background work, browser automation, observability, and evaluation.",
      },
      {
        q: "Do I have to use one model provider?",
        a: "No. Agentium supports multiple providers and custom integrations. Choose models according to the task. Capabilities differ: a chat model, a realtime voice provider, and Jev’s decision model serve different purposes.",
      },
      {
        q: "How does Jev fit into Agentium?",
        a: "Use Jev directly for typed decisions, give a chat agent access to Jev through a toolkit, or use it to judge responses in an evaluation. Your chat model still handles the conversation when prose is needed.",
      },
      {
        q: "Can the agent remember previous conversations?",
        a: "Yes, with the relevant memory configuration and storage. Configure persistence for sessions and enable additional memory features as needed. In-memory storage does not survive a process restart.",
      },
      {
        q: "Can I require approval before an action?",
        a: "Yes. Configure approval rules for selected tool calls and connect them to your application’s review flow.",
      },
      {
        q: "Can I use voice, images, and telephony separately?",
        a: "Yes. Use the dedicated voice and telephony APIs or image-generation toolkit for the capabilities your application needs. Voice supports native realtime providers and composed speech pipelines. Carrier adapters handle call control; your application connects the voice runtime and audio transport.",
      },
      {
        q: "Does Agentium host the application for me?",
        a: "This website describes the SDK and its runtime integrations. You choose the infrastructure on which your application runs. Use the transport and queue guides to connect it to your deployment.",
      },
      {
        q: "Where should I start?",
        a: "Start with the quickstart, run a small agent, and then add the tools or memory your use case needs. The examples page points to focused recipes.",
      },
    ],
  },

  finalCta: {
    h2: ["Start with an idea.", "Build it in TypeScript."],
    body: "Run your first agent. Add voice, tools, and workflows as your product takes shape.",
    primary: { label: "Open the quickstart", href: docs("/quickstart"), kind: "primary" } satisfies Cta,
    secondary: { label: "Explore examples", href: "/examples", kind: "secondary" } satisfies Cta,
  },
} as const;

/* ------------------------------------------------------------------ */
/* /jev                                                                */
/* ------------------------------------------------------------------ */

export const jevPage = {
  hero: {
    eyebrow: "Jev, inside your agent application",
    h1: "Give Jev a place in the whole workflow.",
    lead: "Use Jev for the decision. Use Agentium to connect it to the context, agents, and evaluation around it.",
    ownership:
      "Jev is a decision model built and operated by TypeSafe AI. Agentium integrates it through the @typesafe-ai/sdk; Agentium does not build, host, or sell Jev.",
    primary: { label: "Start with Jev", href: docs("/models/jev"), kind: "primary" } satisfies Cta,
    secondary: { label: "See three ways to use it", href: "#ways", kind: "secondary" } satisfies Cta,
    strip: "Labels. Probabilities. Rubric scores. Results your code can act on.",
  },
  ways: {
    heading: "Choose where judgment belongs.",
    items: [
      {
        id: "decision-agent",
        title: "A decision agent.",
        copy: "Send the relevant facts and define the question. Use the returned decision in your own routing and application logic.",
        cta: { label: "Use Jev as a model", href: docs("/models/jev") },
      },
      {
        id: "tool",
        title: "A tool for your chat agent.",
        copy: "Keep the conversation with your chat model. Add Jev tools when the agent needs a judgment during the task.",
        cta: { label: "Add the Jev toolkit", href: docs("/toolkits/jev") },
      },
      {
        id: "judge",
        title: "A judge in your evaluations.",
        copy: "Run a response through criteria you define, then turn the result into an explicit pass rule.",
        cta: { label: "Build a Jev scorer", href: docs("/eval/jev") },
      },
    ],
  },
  value: {
    heading: "A decision is useful when the rest of the system can use it.",
    items: [
      { title: "Bring context", copy: "Pass the information the decision depends on." },
      {
        title: "Connect the next step",
        copy: "Use the result in your agent tools or application logic.",
      },
      {
        title: "Keep human review",
        copy: "Use your own thresholds and approval policies for consequential actions.",
      },
      {
        title: "Check the behavior",
        copy: "Evaluate responses against criteria relevant to your product.",
      },
    ],
    supporting: "You define the questions, the thresholds, and what happens next.",
  },
  details: {
    heading: "Technical details",
    items: [
      {
        q: "Is Jev a chat model?",
        a: "Jev handles typed decisions. Use a chat model when the application needs a written response.",
      },
      {
        q: "What does noul return?",
        a: "In the normal questions API, it returns a value from 0 to 1. Your application decides the threshold or action.",
      },
      {
        q: "Can I use Jev with the eval package?",
        a: "Yes. Wrap the Jev call in a custom scorer. The current documentation does not use a dedicated jevJudge helper.",
      },
      {
        q: "What do I need to install?",
        a: "Install Agentium core and the TypeSafe SDK. Set your TypeSafe API key on the server. Add the eval package if you are building an evaluation.",
      },
    ],
  },
  related: {
    heading: "Related on this site",
    links: [
      { label: "Jev in the integrations catalog", href: "/integrations#catalog" },
      { label: "Example: route a request with Jev", href: "/examples#jev-decisions" },
      { label: "Runtime controls and approval gates", href: "/#controls" },
      { label: "TypeSafe AI", href: "https://typesafe.ai", external: true },
    ] satisfies NavLink[],
  },
  finalCta: {
    heading: "Put a decision to work.",
    body: "Start with one question. Connect the answer to the next step.",
    primary: { label: "Open Jev docs", href: docs("/models/jev"), kind: "primary" } satisfies Cta,
    secondary: { label: "Explore Agentium", href: "/", kind: "secondary" } satisfies Cta,
  },
} as const;

/* ------------------------------------------------------------------ */
/* /integrations                                                       */
/* ------------------------------------------------------------------ */

export const integrationsPage = {
  h1: "Your stack, connected.",
  lead: "Explore model providers, voice and telephony adapters, image tools, services, storage, and protocols for your application.",
  helper:
    "Each integration may require its own package, credentials, or service setup. Open its guide for the details.",
  packaging:
    "Provider and storage clients are optional peer dependencies of @agentium/core, so you install only what you use. Since v3, concrete toolkits are imported from @agentium/core/toolkits (or a single toolkit such as @agentium/core/toolkits/github).",
  catalogTitle: "Explore integrations",
  search: {
    label: "Find an integration",
    placeholder: "Search providers, voice, tools…",
  },
  filters: [
    { id: "all", label: "All" },
    { id: "models", label: "Models" },
    { id: "voice", label: "Voice & calls" },
    { id: "tools", label: "Tools" },
    { id: "storage", label: "Storage" },
    { id: "protocols", label: "Protocols" },
  ],
  empty: {
    heading: "No integrations match that search.",
    body: "Try another name or clear the filters.",
    action: "Clear filters",
  },
  footer: {
    heading: "Need a different connection?",
    body: "Explore custom providers, typed tools, and MCP in the docs.",
    links: [
      { label: "Custom providers", href: docs("/models/custom-provider"), external: true },
      { label: "Typed tools", href: docs("/agents/tools"), external: true },
      { label: "MCP", href: docs("/mcp/overview"), external: true },
    ] satisfies NavLink[],
  },
} as const;

/* ------------------------------------------------------------------ */
/* /examples                                                           */
/* ------------------------------------------------------------------ */

export const examplesPage = {
  h1: "Start with a working pattern.",
  lead: "Explore focused recipes, then adapt them to the job your agent needs to do.",
  note: "Examples and guides open in the documentation.",
  repo: {
    label: "Browse the examples folder on GitHub",
    href: "https://github.com/agentiumOS/agentium/tree/main/examples",
  },
  finalCta: {
    heading: "Ready to make it yours?",
    body: "Build the smallest useful agent first. Add the capabilities your application needs.",
    cta: { label: "Start building", href: docs("/quickstart"), kind: "primary" } satisfies Cta,
  },
} as const;

/* ------------------------------------------------------------------ */
/* 404                                                                 */
/* ------------------------------------------------------------------ */

export const notFound = {
  h1: "That page isn’t here.",
  body: "Head back to Agentium or find the guide in the docs.",
  home: { label: "Home", href: "/", kind: "primary" } satisfies Cta,
  docs: { label: "Open docs", href: docs("/"), kind: "secondary" } satisfies Cta,
} as const;
