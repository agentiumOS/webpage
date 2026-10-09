import { docs } from "@/lib/site-config";

export type IntegrationCategory = "models" | "voice" | "tools" | "storage" | "protocols";

export type Integration = {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
  keywords: string[];
  docsUrl: string;
  /** Optional on-site overview; provider documentation remains available there. */
  overviewUrl?: string;
  /** Hugeicons name from `src/components/graphics/icon.tsx`. */
  icon: string;
  /** Internal editorial metadata: date the docs path was checked against the index. */
  verifiedAt: string;
};

/** Icon name (see components/graphics/icon.tsx) per category. */
export const categoryIcons = {
  models: "brain",
  voice: "mic",
  tools: "wrench",
  storage: "database",
  protocols: "api",
} as const satisfies Record<IntegrationCategory, string>;

export const categoryLabels: Record<IntegrationCategory, string> = {
  models: "Models",
  voice: "Voice & calls",
  tools: "Tools",
  storage: "Storage",
  protocols: "Protocols",
};

const V = "2026-09-20";

export const integrations: Integration[] = [
  {
    id: "openai-realtime",
    name: "OpenAI Realtime",
    category: "voice",
    description: "Connect a native realtime voice session through the OpenAI adapter.",
    keywords: ["speech", "audio", "realtime", "voice"],
    docsUrl: docs("/voice/openai"),
    icon: "audio",
    verifiedAt: "2026-10-09",
  },
  {
    id: "gemini-live",
    name: "Gemini Live",
    category: "voice",
    description: "Connect a native realtime voice session through the Google Gemini Live adapter.",
    keywords: ["google", "gemini", "speech", "audio", "realtime", "voice"],
    docsUrl: docs("/voice/google"),
    icon: "gemini",
    verifiedAt: "2026-10-09",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "voice",
    description: "Compose speech recognition and synthesis with dedicated streaming adapters.",
    keywords: ["speech", "audio", "tts", "stt", "voice"],
    docsUrl: docs("/voice/elevenlabs"),
    icon: "audio",
    verifiedAt: "2026-10-09",
  },
  {
    id: "sarvam",
    name: "Sarvam",
    category: "voice",
    description: "Compose Sarvam speech synthesis and preview speech recognition adapters for supported languages.",
    keywords: ["speech", "audio", "tts", "stt", "voice", "indic", "bulbul", "saaras"],
    docsUrl: docs("/voice/sarvam"),
    icon: "audio",
    verifiedAt: "2026-10-09",
  },
  {
    id: "livekit",
    name: "LiveKit",
    category: "voice",
    description: "Bridge streaming voice audio to a LiveKit source and track managed by your application.",
    keywords: ["media", "audio", "transport", "streaming", "voice"],
    docsUrl: docs("/voice/livekit"),
    icon: "mic",
    verifiedAt: "2026-10-09",
  },
  {
    id: "twilio",
    name: "Twilio",
    category: "voice",
    description: "Create outbound calls, inspect status, and request hangup through the Twilio adapter.",
    keywords: ["telephony", "phone", "carrier", "calls"],
    docsUrl: docs("/telephony/twilio"),
    icon: "phone",
    verifiedAt: "2026-10-09",
  },
  {
    id: "exotel",
    name: "Exotel",
    category: "voice",
    description: "Manage outbound call control through Exotel AgentStream, with media handled by your application.",
    keywords: ["telephony", "phone", "carrier", "calls", "agentstream", "india"],
    docsUrl: docs("/telephony/exotel"),
    icon: "phone",
    verifiedAt: "2026-10-09",
  },
  {
    id: "telnyx",
    name: "Telnyx",
    category: "voice",
    description: "Dial outbound calls, inspect status, and request hangup through the Telnyx adapter.",
    keywords: ["telephony", "phone", "carrier", "calls", "call control"],
    docsUrl: docs("/telephony/telnyx"),
    icon: "phone",
    verifiedAt: "2026-10-09",
  },
  {
    id: "signalwire",
    name: "SignalWire",
    category: "voice",
    description: "Control outbound calls through SignalWire’s Compatibility Calls API.",
    keywords: ["telephony", "phone", "carrier", "calls", "cxml", "compatibility"],
    docsUrl: docs("/telephony/signalwire"),
    icon: "phone",
    verifiedAt: "2026-10-09",
  },
  {
    id: "vonage",
    name: "Vonage",
    category: "voice",
    description: "Create and inspect outbound calls through the Vonage Voice API, with host-supplied answer routes.",
    keywords: ["telephony", "phone", "carrier", "calls", "ncco"],
    docsUrl: docs("/telephony/vonage"),
    icon: "phone",
    verifiedAt: "2026-10-09",
  },
  {
    id: "livekit-sip",
    name: "LiveKit SIP",
    category: "voice",
    description: "Dial through your outbound SIP trunk into a LiveKit room, separately from the audio transport.",
    keywords: ["telephony", "phone", "sip", "calls", "trunk", "room"],
    docsUrl: docs("/telephony/livekit"),
    icon: "phone",
    verifiedAt: "2026-10-09",
  },
  {
    id: "openai-images",
    name: "OpenAI Images",
    category: "tools",
    description: "Generate and edit images with tools your agents and workflows can call.",
    keywords: ["images", "generation", "editing", "creative", "toolkit"],
    docsUrl: docs("/toolkits/image-generation"),
    icon: "image",
    verifiedAt: "2026-10-09",
  },
  {
    id: "gemini-images",
    name: "Gemini Images",
    category: "tools",
    description: "Connect Gemini image generation and editing tools to your agents and workflows.",
    keywords: ["google", "gemini", "images", "generation", "editing", "creative", "tools"],
    docsUrl: docs("/toolkits/image-generation"),
    icon: "gemini",
    verifiedAt: "2026-10-09",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "models",
    description: "Use OpenAI models in an Agentium agent.",
    keywords: ["gpt", "chat", "llm", "provider"],
    docsUrl: docs("/models/openai"),
    icon: "chatgpt",
    verifiedAt: V,
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "models",
    description: "Connect Claude for supported agent tasks.",
    keywords: ["claude", "chat", "llm", "provider"],
    docsUrl: docs("/models/anthropic"),
    icon: "claude",
    verifiedAt: V,
  },
  {
    id: "google-gemini",
    name: "Google Gemini",
    category: "models",
    description: "Use Gemini through the Google provider.",
    keywords: ["google", "gemini", "llm", "provider"],
    docsUrl: docs("/models/google"),
    icon: "gemini",
    verifiedAt: V,
  },
  {
    id: "ollama",
    name: "Ollama",
    category: "models",
    description: "Connect models served through Ollama.",
    keywords: ["local", "self-hosted", "llama", "provider"],
    docsUrl: docs("/models/ollama"),
    icon: "bot",
    verifiedAt: V,
  },
  {
    id: "jev",
    name: "Jev",
    category: "models",
    description: "Ask typed decision questions through TypeSafe.",
    keywords: ["typesafe", "decision", "choice", "noul", "score", "judgment"],
    docsUrl: docs("/models/jev"),
    overviewUrl: "/jev",
    icon: "target",
    verifiedAt: V,
  },
  {
    id: "aws-bedrock",
    name: "AWS Bedrock",
    category: "models",
    description: "Use supported models through AWS Bedrock.",
    keywords: ["amazon", "aws", "bedrock", "provider"],
    docsUrl: docs("/models/aws-bedrock"),
    icon: "aws",
    verifiedAt: V,
  },
  {
    id: "azure-openai",
    name: "Azure OpenAI",
    category: "models",
    description: "Connect supported OpenAI deployments on Azure.",
    keywords: ["microsoft", "azure", "openai", "provider"],
    docsUrl: docs("/models/azure-openai"),
    icon: "microsoft",
    verifiedAt: V,
  },
  {
    id: "openai-compatible",
    name: "OpenAI-compatible APIs",
    category: "models",
    description: "Connect a supported compatible API endpoint.",
    docsUrl: docs("/models/openai-like"),
    keywords: ["openai-like", "compatible", "custom endpoint", "provider"],
    icon: "api",
    verifiedAt: V,
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    description: "Work with repositories, issues, and pull requests.",
    keywords: ["git", "repository", "issues", "pull requests", "toolkit"],
    docsUrl: docs("/toolkits/github"),
    icon: "github",
    verifiedAt: V,
  },
  {
    id: "slack",
    name: "Slack",
    category: "tools",
    description: "Connect messages and channel workflows.",
    keywords: ["chat", "messages", "channels", "toolkit"],
    docsUrl: docs("/toolkits/slack"),
    icon: "slack",
    verifiedAt: V,
  },
  {
    id: "notion",
    name: "Notion",
    category: "tools",
    description: "Read and work with Notion content.",
    keywords: ["docs", "pages", "databases", "toolkit"],
    docsUrl: docs("/toolkits/notion"),
    icon: "notion",
    verifiedAt: V,
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "tools",
    description: "Connect email search, reading, and sending.",
    keywords: ["email", "google", "mail", "toolkit"],
    docsUrl: docs("/toolkits/gmail"),
    icon: "mail",
    verifiedAt: V,
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "tools",
    description: "Read and update spreadsheet data.",
    keywords: ["spreadsheet", "google", "sheets", "toolkit"],
    docsUrl: docs("/toolkits/google-sheets"),
    icon: "sheets",
    verifiedAt: V,
  },
  {
    id: "http",
    name: "HTTP / REST",
    category: "tools",
    description: "Call APIs through an HTTP toolkit.",
    keywords: ["rest", "api", "fetch", "http", "toolkit"],
    docsUrl: docs("/toolkits/http"),
    icon: "webhook",
    verifiedAt: V,
  },
  {
    id: "websearch",
    name: "Web Search",
    category: "tools",
    description: "Add search through supported search providers.",
    keywords: ["search", "web", "internet", "toolkit"],
    docsUrl: docs("/toolkits/websearch"),
    icon: "search",
    verifiedAt: V,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "storage",
    description: "Persist supported agent data in PostgreSQL.",
    keywords: ["postgres", "sql", "database", "persistence"],
    docsUrl: docs("/storage/postgres"),
    icon: "database",
    verifiedAt: V,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "storage",
    description: "Use a MongoDB storage backend.",
    keywords: ["mongo", "document", "database", "persistence"],
    docsUrl: docs("/storage/mongodb"),
    icon: "database",
    verifiedAt: V,
  },
  {
    id: "sqlite",
    name: "SQLite",
    category: "storage",
    description: "Use local database persistence.",
    keywords: ["sql", "local", "file", "database", "persistence"],
    docsUrl: docs("/storage/sqlite"),
    icon: "file",
    verifiedAt: V,
  },
  {
    id: "redis",
    name: "Redis",
    category: "storage",
    description: "Configure Redis-backed storage.",
    keywords: ["cache", "key-value", "queue", "persistence"],
    docsUrl: docs("/storage/redis"),
    icon: "dbZap",
    verifiedAt: V,
  },
  {
    id: "mcp",
    name: "MCP",
    category: "protocols",
    description: "Connect tools exposed by MCP servers.",
    keywords: ["model context protocol", "servers", "tools", "protocol"],
    docsUrl: docs("/mcp/overview"),
    icon: "mcp",
    verifiedAt: V,
  },
  {
    id: "a2a",
    name: "A2A",
    category: "protocols",
    description: "Connect with remote agents through A2A.",
    keywords: ["agent to agent", "remote agents", "interoperability", "protocol"],
    docsUrl: docs("/a2a/overview"),
    icon: "connect",
    verifiedAt: V,
  },
];

export const integrationById = Object.fromEntries(
  integrations.map((i) => [i.id, i]),
) as Record<string, Integration>;

export function isCategory(value: string | null | undefined): value is IntegrationCategory {
  return value === "models" || value === "voice" || value === "tools" || value === "storage" || value === "protocols";
}

export function filterIntegrations(
  query: string,
  category: IntegrationCategory | "all",
): Integration[] {
  const q = query.trim().toLowerCase();
  return integrations.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      categoryLabels[item.category].toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q)) ||
      item.description.toLowerCase().includes(q)
    );
  });
}
