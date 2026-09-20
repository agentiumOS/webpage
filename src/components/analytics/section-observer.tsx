"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Emits one `section_view` per `<section id>` per page view once the section
 * is at least half visible (or 200px tall in view for very tall sections).
 * Re-arms on client-side navigation.
 */
export function SectionObserver() {
  const pathname = usePathname();
  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const seen = new Set<string>();
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          const tallEnough = entry.intersectionRect.height >= 200;
          if ((entry.intersectionRatio >= 0.5 || tallEnough) && entry.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track("section_view", { section_id: id });
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
