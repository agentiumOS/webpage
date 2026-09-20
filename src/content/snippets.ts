import { docs } from "@/lib/site-config";

export type CodeSample = {
  id: "agent" | "tool" | "jev" | "jev-toolkit";
  label: string;
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

export const homeSamples: CodeSample[] = [firstAgent, toolAgent, decisionAgent];
export const allSamples: CodeSample[] = [firstAgent, toolAgent, decisionAgent, jevToolkitAgent];
