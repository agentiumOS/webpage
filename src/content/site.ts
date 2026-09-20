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
  tagline: "The framework behind your agent application.",
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
          title: "Agent capabilities",
          description: "Tools, context, and coordinated work.",
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
    eyebrow: "TypeScript agent framework",
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
          { label: "Tools", href: docs("/agents/tools"), external: true },
          { label: "Memory", href: docs("/memory/overview"), external: true },
          { label: "Teams", href: docs("/teams/overview"), external: true },
          { label: "Workflows", href: docs("/workflows/overview"), external: true },
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
    eyebrow: "Agentium / TypeScript agent framework",
    h1: ["Your next big thing.", "Built with agents."],
    lead: "Bring models, tools, memory, and workflows together in one TypeScript framework. Everything connected, ready for you to build.",
    primary: { label: "Start building", href: docs("/quickstart"), kind: "primary" } satisfies Cta,
    secondary: { label: "Explore the stack", href: "/#stack", kind: "secondary" } satisfies Cta,
    install: "npm install @agentium/core",
    helper: "Start with core. Add the integrations your application needs.",
    capabilities: ["Models", "Tools", "Memory", "Teams", "Workflows", "Evaluations"],
    usps: [
      "One TypeScript framework",
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
      "Voice and browser agents",
    ],
    artLabels: ["Compose", "Connect", "Run"],
    artBadge: "@agentium/core",
  },

  stack: {
    eyebrow: "One framework, connected parts",
    h2: "Everything around the model, working together.",
    lead: "A useful agent needs context, tools, coordination, and a way into your product. Build those pieces around a shared TypeScript foundation.",
    frameLabel: "Your agent application",
    modules: [
      {
        id: "models",
        icon: "layers",
        title: "Models & decisions",
        copy: "Choose the model for the job, including Jev for typed decisions.",
        href: docs("/models/overview"),
      },
      {
        id: "tools",
        icon: "wrench",
        title: "Tools & skills",
        copy: "Connect APIs and package the instructions agents need.",
        href: docs("/toolkits/overview"),
      },
      {
        id: "memory",
        icon: "database",
        title: "Memory & knowledge",
        copy: "Bring conversation history and retrieved context into a run.",
        href: docs("/memory/overview"),
      },
      {
        id: "teams",
        icon: "gitBranch",
        title: "Teams & workflows",
        copy: "Delegate work and control the steps around it.",
        href: docs("/teams/overview"),
      },
      {
        id: "controls",
        icon: "shieldCheck",
        title: "Controls & evaluation",
        copy: "Add approval gates and test the behavior you expect.",
        href: docs("/features/approval-gates"),
      },
      {
        id: "serving",
        icon: "activity",
        title: "Serving & operations",
        copy: "Expose agents to your product and observe their runs.",
        href: docs("/transport/overview"),
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
    lead: "Give your agent context and useful tools. Bring in specialists when one agent is not enough.",
    cards: {
      memory: {
        title: "Keep the context that matters.",
        copy: "Save sessions, keep useful facts, and bring relevant context into the next conversation. Configure the storage behind it.",
        link: { label: "Explore memory", href: docs("/memory/overview") },
      },
      tools: {
        title: "Let agents do useful work.",
        copy: "Give your agents typed tools, reusable skills, and access to the services your product already uses.",
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
        copy: "Add project instructions, skills, standing notes, and helper agents through the Agentium harness.",
        link: { label: "Explore the harness", href: docs("/agents/harness") },
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
    lead: "Put approval rules around sensitive tools. Watch run events, check budgets, and test the behavior you care about.",
    items: [
      {
        icon: "shieldCheck",
        heading: "Approval gates",
        copy: "Require a human decision before selected tools execute.",
        href: docs("/features/approval-gates"),
      },
      {
        icon: "gauge",
        heading: "Budget checks",
        copy: "Track usage and check configured budgets during a run.",
        href: docs("/features/cost-autostop"),
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
    lead: "Connect the providers, services, and storage your application needs. Bring external tools in through MCP and connect agents through A2A.",
    groups: [
      { label: "Models", ids: ["openai", "anthropic", "google-gemini", "ollama", "jev"] },
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
        a: "Agentium is a TypeScript framework for building agent applications on Node.js. It brings together agent execution, tools, memory, teams, and workflows, with additional packages for serving, background work, browser automation, observability, and evaluation.",
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
        q: "Does Agentium host the application for me?",
        a: "This website describes the framework and its runtime integrations. You choose the infrastructure on which your application runs. Use the transport and queue guides to connect it to your deployment.",
      },
      {
        q: "Where should I start?",
        a: "Start with the quickstart, run a small agent, and then add the tools or memory your use case needs. The examples page points to focused recipes.",
      },
    ],
  },

  finalCta: {
    h2: ["Build the agent.", "Bring the whole stack."],
    body: "Start with a few lines of TypeScript. Add the rest when you need it.",
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
  lead: "Explore the models, services, storage, and protocols you can use with Agentium.",
  helper:
    "Each integration may require its own package, credentials, or service setup. Open its guide for the details.",
  catalogTitle: "Explore integrations",
  search: {
    label: "Find an integration",
    placeholder: "Search models, tools, storage…",
  },
  filters: [
    { id: "all", label: "All" },
    { id: "models", label: "Models" },
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
