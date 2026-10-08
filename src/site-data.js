export const site = {
  name: "Agentium",
  url: "https://agentium.in",
  docs: "https://docs.agentium.in",
  github: "https://github.com/agentiumOS/agentium",
  title: "Agentium — TypeScript SDK for AI Agents, Voice & Tools",
  description:
    "Build AI applications with Agentium, an open-source TypeScript SDK for agents, harnesses, voice, image generation, telephony, workflows, and cost tracking.",
};

export const integrations = [
  {
    name: "OpenAI",
    logo: "openai",
    group: "Models",
    detail: "Models, images & realtime voice",
    path: "/models/openai",
  },
  {
    name: "Anthropic",
    logo: "anthropic",
    group: "Models",
    detail: "Claude models",
    path: "/models/anthropic",
  },
  {
    name: "Google Gemini",
    logo: "googlegemini",
    group: "Models",
    detail: "Models & live voice sessions",
    path: "/models/google",
  },
  {
    name: "Ollama",
    logo: "ollama",
    group: "Models",
    detail: "Run local models",
    path: "/models/ollama",
  },
  {
    name: "ElevenLabs",
    logo: "elevenlabs",
    group: "Voice & calls",
    detail: "Speech recognition & synthesis",
    path: "/voice/elevenlabs",
  },
  {
    name: "Twilio",
    logo: "twilio",
    group: "Voice & calls",
    detail: "Outbound call control",
    path: "/telephony/twilio",
  },
  {
    name: "LiveKit",
    logo: "livekit",
    group: "Voice & calls",
    detail: "Audio transport & SIP calls",
    path: "/voice/livekit",
  },
  {
    name: "GitHub",
    logo: "github",
    group: "Tools",
    detail: "Repositories & issues",
    path: "/toolkits/github",
  },
  {
    name: "Notion",
    logo: "notion",
    group: "Tools",
    detail: "Pages & databases",
    path: "/toolkits/notion",
  },
  {
    name: "Slack",
    logo: "slack",
    group: "Tools",
    detail: "Channels & messages",
    path: "/toolkits/slack",
  },
  {
    name: "PostgreSQL",
    logo: "postgresql",
    group: "Infrastructure",
    detail: "Persistent storage",
    path: "/storage/postgres",
  },
  {
    name: "Redis",
    logo: "redis",
    group: "Infrastructure",
    detail: "Storage & queues",
    path: "/storage/redis",
  },
];

export const faqs = [
  {
    question: "What is Agentium?",
    answer:
      "Agentium is an open-source TypeScript SDK for building AI applications in Node.js. Core includes agents, teams, workflows, memory, tools, voice adapters, image generation, outbound call control, and cost accounting. Separate packages add harnesses, browser automation, background jobs, evaluation, and observability. You run it within your own application and infrastructure.",
  },
  {
    question: "Where does Agentium run?",
    answer:
      "Agentium runs inside your Node.js application as an npm dependency. Your application supplies authentication, resource ownership, provider credentials, and lifecycle management. Choose your own hosting and storage, and add transport or queue packages when you need HTTP endpoints or background workers.",
  },
  {
    question: "How are agents and harnesses different?",
    answer:
      "An Agent runs the model and tool-calling loop. The separate @agentium/harness package composes context, skills, tool access, policies, budgets, and sessions around an execution driver. Drivers can run an Agent, Team, Workflow, or custom loop. Use core execution on its own, or add a harness to reuse these controls.",
  },
  {
    question: "Can I choose my own models and voice providers?",
    answer:
      "Yes. Model adapters include OpenAI, Anthropic, Google Gemini, and Ollama. For voice, use OpenAI Realtime or Gemini Live, or compose a streaming pipeline with separate speech recognition, agent, speech synthesis, and audio transport adapters. You supply provider credentials, and supported features vary by adapter.",
  },
  {
    question: "Does Agentium support image generation and phone calls?",
    answer:
      "Yes. The image toolkit provides OpenAI generation and editing tools; editing support depends on the selected model. Telephony adapters manage outbound calls through Twilio, Telnyx, Exotel, SignalWire, Vonage, and LiveKit SIP. Your application connects the carrier’s call control to its voice runtime and audio transport.",
  },
  {
    question: "Can I track AI usage and costs?",
    answer:
      "Yes. Enable cost accounting to record provider usage, estimate charges, and inspect costs by run. Configure budgets to check costs before new work starts, and add the observability package for traces and metrics. Estimates depend on reported usage and available pricing; missing information stays visible as incomplete cost. Budgets do not guarantee a final provider invoice.",
  },
  {
    question: "Is Agentium free to use?",
    answer:
      "Yes. Agentium is released under the MIT license and can be used in commercial applications. You run it on your own infrastructure. Model APIs, speech services, phone carriers, hosting, and other services you connect have their own charges.",
  },
];

export const examples = [
  {
    id: "agent",
    label: "An agent",
    file: "assistant.ts",
    path: "/learn/first-agent",
    install: "npm install @agentium/core openai",
    note: "Set OPENAI_API_KEY before running. Choose a model available to your account.",
    code: `import { Agent, openai } from '@agentium/core';

const assistant = new Agent({
  name: 'product-assistant',
  model: openai('gpt-4o'),
  instructions: 'Be clear, useful, and concise.',
});

try {
  const result = await assistant.run(
    'Help me plan a product launch.'
  );
  console.log(result.text);
} finally {
  await assistant.close();
}`,
  },
  {
    id: "team",
    label: "A team",
    file: "team.ts",
    path: "/teams/overview",
    install: "npm install @agentium/core openai",
    note: "Set OPENAI_API_KEY before running. Each member uses your selected model.",
    code: `import { Agent, Team, TeamMode, openai } from '@agentium/core';

const writer = new Agent({
  name: 'writer', model: openai('gpt-4o'),
  instructions: 'Write clear product copy.',
});
const editor = new Agent({
  name: 'editor', model: openai('gpt-4o'),
  instructions: 'Check clarity and accuracy.',
});
const team = new Team({
  name: 'content', mode: TeamMode.Coordinate,
  model: openai('gpt-4o'), members: [writer, editor],
});
const result = await team.run('Draft a launch email.');
console.log(result.text);
await Promise.all([writer.close(), editor.close()]);`,
  },
  {
    id: "voice",
    label: "A voice session",
    file: "voice.ts",
    path: "/voice/overview",
    install: "npm install @agentium/core ws",
    note: "Set OPENAI_API_KEY. Your app supplies microphone capture and audio playback.",
    code: `import {
  VoiceAgent, OpenAIRealtimeProvider,
} from '@agentium/core/voice';

const voice = new VoiceAgent({
  name: 'support',
  provider: new OpenAIRealtimeProvider(),
  instructions: 'Help the caller with concise answers.',
});
const session = await voice.connect({
  tenantId: 'demo', userId: 'developer',
  sessionId: 'first-call',
});
// Connect your audio input and playback here.
// Close the session when the call ends.
await session.close();`,
  },
];

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/brand/agentium.svg`,
        sameAs: [site.github, "https://www.npmjs.com/org/agentium"],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: `${site.url}/`,
        name: site.title,
        description: site.description,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#software` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${site.url}/#software`,
        name: site.name,
        description: site.description,
        url: site.url,
        codeRepository: site.github,
        programmingLanguage: "TypeScript",
        runtimePlatform: "Node.js",
        license: "https://opensource.org/license/mit",
        isAccessibleForFree: true,
        author: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}
