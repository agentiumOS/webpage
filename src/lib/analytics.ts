/**
 * Typed GA4 event layer.
 *
 * - Event names: snake_case, ≤ 40 chars. Params: ≤ 25 per event, string values
 *   ≤ 100 chars (GA4 limits).
 * - `track()` is a no-op when GA is not loaded (no measurement ID, SSR, or
 *   the gtag script failed), so call sites never need to guard.
 * - Server components annotate links with `data-track` attributes; the
 *   `<ClickTracker />` client component turns those into events. Client
 *   components call `track()` directly.
 */

export type LinkLocation =
  | "announcement"
  | "header"
  | "mobile_nav"
  | "hero"
  | "footer"
  | "final_cta"
  | "card"
  | `section:${string}`;

export type DestinationType = "docs" | "internal" | "external";

export type EventMap = {
  // Recommended GA4 events
  search: { search_term: string; results_count: number; category: string };
  select_content: { content_type: "integration" | "example" | "faq" | "platform_item"; content_id: string };
  // Custom events
  cta_click: {
    cta_id: string;
    cta_label: string;
    destination_url: string;
    destination_type: DestinationType;
    link_location: LinkLocation | string;
  };
  docs_click: { docs_path: string; link_text: string; link_location: LinkLocation | string };
  quickstart_click: { docs_path: string; link_text: string; link_location: LinkLocation | string };
  jev_docs_click: { docs_path: string; link_text: string; link_location: LinkLocation | string };
  copy_install_command: { command: string; link_location: LinkLocation | string };
  code_tab_select: { sample_id: string; link_location: LinkLocation | string };
  code_copy: { sample_id: string };
  integration_filter: { category: string; results_count: number };
  integration_open: { integration_id: string; category: string };
  example_open: { example_id: string; link_text: string };
  faq_toggle: { question_id: string; state: "open" | "closed" };
  jev_demo_interact: { example_id: string; action: "select" | "replay" };
  flow_demo_interact: { action: "approve" | "deny" | "reset"; stage_id: string };
  nav_click: { nav_item: string; link_location: LinkLocation | string; destination_type: DestinationType };
  announcement_click: { campaign: string };
  section_view: { section_id: string };
  page_not_found: { page_path: string; referrer: string };
  web_vitals: {
    metric_name: string;
    metric_value: number;
    metric_rating: string;
    metric_id: string;
    metric_delta: number;
    navigation_type: string;
  };
  client_error: { error_name: string; page_path: string };
};

export type EventName = keyof EventMap;

const DOCS_HOST = "docs.agentium.in";
const JEV_DOCS_PATHS = new Set(["/models/jev", "/toolkits/jev", "/eval/jev", "/examples/jev"]);

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function clamp(value: unknown): unknown {
  if (typeof value === "string") return value.length > 100 ? value.slice(0, 100) : value;
  return value;
}

export function track<E extends EventName>(name: E, params: EventMap[E]): void {
  if (typeof window === "undefined") return;
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params as Record<string, unknown>)) {
    if (value === undefined || value === null || value === "") continue;
    clean[key] = clamp(value);
  }
  // `@next/third-parties` defines window.gtag once the tag loads; before that,
  // push straight onto dataLayer so nothing is lost.
  if (typeof window.gtag === "function") {
    window.gtag("event", name, clean);
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  // gtag.js reads `arguments` objects from the data layer, not arrays.
  pushArguments("event", name, clean);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function pushArguments(..._args: unknown[]): void {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer!.push(arguments);
}

/** Classify an href relative to the current site. */
export function destinationType(href: string): DestinationType {
  try {
    const url = new URL(href, window.location.origin);
    if (url.host === DOCS_HOST) return "docs";
    if (url.origin === window.location.origin) return "internal";
    return "external";
  } catch {
    return "internal";
  }
}

/** Fire docs_click and its derived key events for a docs URL. */
export function trackDocsClick(href: string, linkText: string, linkLocation: string): void {
  let path = "";
  try {
    path = new URL(href).pathname.replace(/\/$/, "") || "/";
  } catch {
    return;
  }
  const params = { docs_path: path, link_text: linkText, link_location: linkLocation };
  track("docs_click", params);
  if (path === "/quickstart") track("quickstart_click", params);
  if (JEV_DOCS_PATHS.has(path)) track("jev_docs_click", params);
}
