import { docs } from "@/lib/site-config";

export type CodeSample = {
  id: "agent" | "tool" | "images" | "costs" | "voice" | "harness" | "jev" | "jev-toolkit";
  label: string;
  heading?: readonly [string, string];
  description?: string;
  filename: string;
  code: string;
  install: string;
  env: string;
  note?: string;
  docsUrl: string;
  /** Internal editorial metadata; not rendered. */
  validation: "pending" | "typechecked" | "executed";
};

export const firstAgent: CodeSample = {
  id: "agent",
  label: "Agent",
  heading: ["An agent.", "Your application."],
  description: "Choose a model, give it instructions, and run it from TypeScript. Add context and tools as your application grows.",
  filename: "first-agent.ts",
  code: `import { Agent, openai } from "@agentium/core";

const productGuide = new Agent({
  name: "product-guide",
  model: openai("gpt-6-astra"),
  instructions: "Explain technical ideas with one concrete example.",
});

const answer = await productGuide.run(
  "When should an agent use a tool?",
);

console.log(answer.text);
`,
  install: "npm install @agentium/core openai",
  env: "OPENAI_API_KEY",
  note: "Run TypeScript locally with tsx in an ESM project.",
  docsUrl: docs("/quickstart"),
  validation: "typechecked",
};

export const toolAgent: CodeSample = {
  id: "tool",
  label: "Tool",
  heading: ["Your functions.", "An agent’s tools."],
  description: "Define inputs with Zod and connect your own application logic. The agent gets a typed tool it can call during a run.",
  filename: "tool-agent.ts",
  code: `import { Agent, defineTool, openai } from "@agentium/core";
import { z } from "zod";

const toMinutes = defineTool({
  name: "hours_to_minutes",
  description: "Convert a nonnegative number of hours to minutes.",
  parameters: z.object({ hours: z.number().nonnegative() }),
  execute: async ({ hours }) => String(hours * 60),
});

const converter = new Agent({
  name: "time-converter",
  model: openai("gpt-6-astra"),
  tools: [toMinutes],
});

console.log((await converter.run("Convert 2.5 hours to minutes.")).text);
`,
  install: "npm install @agentium/core openai zod",
  env: "OPENAI_API_KEY",
  docsUrl: docs("/agents/tools"),
  validation: "typechecked",
};

export const decisionAgent: CodeSample = {
  id: "jev",
  label: "Jev",
  filename: "decision-agent.ts",
  code: `import { Agent, choice, jev } from "@agentium/core";

const inboxRouter = new Agent({
  name: "inbox-router",
  model: jev("jev-latest"),
});

const decision = await inboxRouter.run(
  "Please send a copy of the invoice for my subscription.",
  {
    questions: {
      destination: choice("Which team should receive this request?", {
        accounts: "Invoices and subscription payments",
        engineering: "Product defects and API failures",
        general: "Other requests",
      }),
    },
  },
);

console.log(JSON.parse(decision.text).destination.choice);
`,
  install: "npm install @agentium/core @typesafe-ai/sdk",
  env: "TYPESAFE_API_KEY",
  note: "Validate parsed output before using it for an action.",
  docsUrl: docs("/models/jev"),
  validation: "typechecked",
};

export const jevToolkitAgent: CodeSample = {
  id: "jev-toolkit",
  label: "Jev toolkit",
  filename: "service-desk.ts",
  code: `import { Agent, openai } from "@agentium/core";
import { JevToolkit } from "@agentium/core/toolkits";

const serviceDesk = new Agent({
  name: "service-desk",
  model: openai("gpt-6-astra"),
  tools: [...new JevToolkit().getTools()],
  instructions:
    "Ask a Jev tool to classify the request, then explain the next step.",
});

console.log((await serviceDesk.run("I cannot download my invoice.")).text);
`,
  install: "npm install @agentium/core openai @typesafe-ai/sdk",
  env: "OPENAI_API_KEY, TYPESAFE_API_KEY",
  note: "A production policy may need explicit validation that the tool was called.",
  docsUrl: docs("/toolkits/jev"),
  validation: "typechecked",
};

export const imageAgent: CodeSample = {
  id: "images",
  label: "Images",
  heading: ["From a brief", "to an image."],
  description: "Give an agent image-generation tools. It can turn a user’s request into a provider-backed image generation call.",
  filename: "image-agent.ts",
  code: `import { Agent, openai } from "@agentium/core";
import { ImageGenerationToolkit } from "@agentium/core/toolkits";

const images = new ImageGenerationToolkit({ model: "dall-e-3" });
const illustrator = new Agent({
  name: "illustrator",
  model: openai("gpt-6-astra"),
  instructions: "Use image_generate to illustrate the supplied brief.",
  tools: [...images.getTools()],
});

try {
  const result = await illustrator.run(
    "Illustrate a field guide to native wildflowers.",
  );
  console.log(result.text);
} finally {
  await illustrator.close();
}
`,
  install: "npm install @agentium/core openai",
  env: "OPENAI_API_KEY",
  note: "Image generation uses a separate provider request. Editing uses the toolkit’s supported editing model.",
  docsUrl: docs("/toolkits/image-generation"),
  validation: "typechecked",
};

export const costAgent: CodeSample = {
  id: "costs",
  label: "Costs",
  heading: ["Every run.", "A clearer cost."],
  description: "Enable cost accounting to inspect reported usage and estimated charges alongside the result. Incomplete pricing stays explicit.",
  filename: "run-costs.ts",
  code: `import { Agent, openai } from "@agentium/core";

const assistant = new Agent({
  name: "support-assistant",
  model: openai("gpt-6-astra"),
  cost: true,
});

try {
  const result = await assistant.run("Explain how sessions work.");
  console.log(result.text);
  console.log(result.usage);
  console.log(result.costs);
} finally {
  await assistant.close();
}
`,
  install: "npm install @agentium/core openai",
  env: "OPENAI_API_KEY",
  note: "Costs are estimates based on reported usage and available prices. A null total means pricing is incomplete.",
  docsUrl: docs("/cost/overview"),
  validation: "typechecked",
};

export const voiceAgent: CodeSample = {
  id: "voice",
  label: "Voice",
  heading: ["A conversation.", "In real time."],
  description: "Connect Gemini Live through a voice adapter. Your application handles audio capture and playback; VoiceAgent coordinates the session.",
  filename: "voice-agent.ts",
  code: `import { GoogleLiveProvider, VoiceAgent } from "@agentium/core/voice";

export function createVoiceAgent() {
  return new VoiceAgent({
    name: "voice-guide",
    provider: new GoogleLiveProvider(),
    instructions: "Answer questions in concise spoken sentences.",
    recovery: {
      fallback: "stop",
      maxAttempts: 3,
      maxElapsedMs: 30_000,
    },
  });
}
`,
  install: "npm install @agentium/core @google/genai",
  env: "GOOGLE_API_KEY",
  docsUrl: docs("/voice/google"),
  validation: "typechecked",
};

export const harnessAgent: CodeSample = {
  id: "harness",
  label: "Harness",
  heading: ["A workspace.", "Defined in code."],
  description: "Compose source context, an execution driver, and explicit budgets. A harness gives your agent a reusable environment to work in.",
  filename: "research-harness.ts",
  code: `import { openai } from "@agentium/core";
import { agentDriver, HarnessRuntime, research } from "@agentium/harness";

export function createResearchHarness() {
  return new HarnessRuntime({
    definition: research({
      text: {
        id: "project-notes",
        entries: [{ id: "scope", text: "We study shipping delays." }],
      },
    }),
    driver: agentDriver({
      name: "research-assistant",
      model: openai("gpt-6-astra"),
      instructions: "Answer using the supplied project notes.",
    }),
    grants: { toolIds: [], modelRoles: ["main"] },
    budgets: { maxModelCalls: 4, maxToolCalls: 0 },
  });
}
`,
  install: "npm install @agentium/core @agentium/harness openai",
  env: "OPENAI_API_KEY",
  docsUrl: docs("/harness/quickstart"),
  validation: "typechecked",
};

export const homeSamples: CodeSample[] = [firstAgent, toolAgent, voiceAgent, imageAgent, harnessAgent, costAgent];
export const allSamples: CodeSample[] = [...homeSamples, decisionAgent, jevToolkitAgent];
