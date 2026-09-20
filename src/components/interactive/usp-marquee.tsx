"use client";

import * as React from "react";
import { cn } from "cn";
import { Icon } from "@/components/graphics/icon";

type Props = {
  items: readonly string[];
  className?: string;
};

/**
 * Continuous horizontal marquee of USPs.
 * - Pauses on hover/focus and via a visible control.
 * - Under prefers-reduced-motion the list renders static and wraps.
 * - The duplicated track is aria-hidden so screen readers hear each item once.
 */
export function UspMarquee({ items, className }: Props) {
  const [paused, setPaused] = React.useState(false);

  const track = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-x-3 pr-3 motion-reduce:flex-wrap motion-reduce:gap-y-2 motion-reduce:pr-0"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 whitespace-nowrap">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-citron-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group/marquee relative flex items-center gap-4 border-t border-line pt-5",
        className,
      )}
      data-paused={paused ? "" : undefined}
    >
      <div
        className="relative min-w-0 flex-1 overflow-hidden motion-reduce:overflow-visible"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div
          className={cn(
            "flex w-max font-mono text-[11px] leading-[18px] tracking-[0.06em] text-ink-muted uppercase",
            "motion-safe:animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] group-data-paused/marquee:[animation-play-state:paused]",
            "motion-reduce:w-full motion-reduce:animate-none",
          )}
        >
          {track(false)}
          <span className="motion-reduce:hidden contents">{track(true)}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play highlights" : "Pause highlights"}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-[8px] text-ink-muted transition-colors duration-[160ms] hover:bg-surface-muted hover:text-ink motion-reduce:hidden"
      >
        {paused ? (
          <Icon name="play" className="size-4" />
        ) : (
          <Icon name="pause" className="size-4" />
        )}
      </button>
    </div>
  );
}
