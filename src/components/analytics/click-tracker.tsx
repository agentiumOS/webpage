"use client";

import * as React from "react";
import { destinationType, track, trackDocsClick, type EventName } from "@/lib/analytics";

/**
 * Delegated click tracking.
 *
 * Any anchor or button may declare `data-track="<event>"` plus
 * `data-track-*` parameters. Links to docs.agentium.in are tracked as
 * `docs_click` automatically, even without a `data-track` attribute, and the
 * derived key events (`quickstart_click`, `jev_docs_click`) fire from there.
 *
 * Mounted once in the root layout; server components stay server components.
 */
export function ClickTracker() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("a[href], button, [data-track]");
      if (!el) return;

      const href = el instanceof HTMLAnchorElement ? el.href : "";
      const text = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().replace(/\s+/g, " ");
      const location = el.dataset.trackLocation ?? nearestSection(el);
      const explicit = el.dataset.track as EventName | undefined;

      if (explicit) {
        const params: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(el.dataset)) {
          if (!key.startsWith("track") || key === "track") continue;
          // data-track-cta-id -> cta_id
          const name = key
            .slice("track".length)
            .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
            .replace(/^_/, "");
          params[name] = value;
        }
        if (href) {
          params.destination_url ??= href;
          params.destination_type ??= destinationType(href);
        }
        if (explicit === "cta_click") {
          params.cta_label ??= text;
        }
        if (explicit === "nav_click") {
          params.nav_item ??= text;
        }
        params.link_location ??= location;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        track(explicit, params as any);
      }

      if (href && destinationType(href) === "docs") {
        trackDocsClick(href, text, location);
      }
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

function nearestSection(el: HTMLElement): string {
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const section = el.closest<HTMLElement>("section[id], section[aria-labelledby]");
  if (section?.id) return `section:${section.id}`;
  const labelled = section?.getAttribute("aria-labelledby");
  if (labelled) return `section:${labelled}`;
  return "page";
}
