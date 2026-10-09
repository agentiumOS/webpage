"use client";

import * as React from "react";
import { cn } from "cn";
import { Icon, type IconName } from "@/components/graphics/icon";

const tagIcons: Record<string, IconName> = {
  "One composable TypeScript SDK": "code",
  "Choose your models": "brain",
  "Keep your infrastructure": "server",
  "Typed tools with Zod": "wrench",
  "Memory you configure": "database",
  "Teams and workflows": "team",
  "Structured output": "doc",
  "Approval gates": "shieldCheck",
  "Budget checks": "gauge",
  "Tracing and metrics": "chart",
  "Evaluation package": "target",
  "MCP and A2A": "connect",
  "Realtime voice": "mic",
  "Image generation tools": "image",
  "Telephony adapters": "phone",
  "Reusable harnesses": "cube",
  "Cost accounting": "invoice",
  "Browser automation": "browser",
};

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
      className="flex shrink-0 items-center gap-x-2.5 pr-2.5 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:gap-y-2 motion-reduce:pr-0"
    >
      {items.map((item) => (
        <li key={item} className="flex cursor-default items-center gap-2 whitespace-nowrap rounded-md bg-[#E8EDF8] px-3 py-2.5">
          <Icon name={tagIcons[item] ?? "cube"} variant="duotone" className="size-4 shrink-0 text-citron-ink" />
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
        className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-visible motion-reduce:[mask-image:none]"
      >
        <div
          className={cn(
            "flex w-max font-sans text-[12px] leading-[18px] font-medium text-ink-muted",
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
