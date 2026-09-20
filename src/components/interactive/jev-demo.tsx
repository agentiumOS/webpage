"use client";

import * as React from "react";
import { cn } from "cn";
import { Tabs as TabsPrimitive } from "radix-ui";
import { home } from "@/content/site";
import { Icon } from "@/components/graphics/icon";
import { track } from "@/lib/analytics";

type Example = (typeof home.jev.demo.examples)[number];

export function JevDemo({ className }: { className?: string }) {
  const d = home.jev.demo;
  const [value, setValue] = React.useState<string>(d.examples[0].id);
  const [run, setRun] = React.useState(0);
  const active = d.examples.find((e) => e.id === value) ?? d.examples[0];

  const select = (v: string) => {
    setValue(v);
    setRun((r) => r + 1);
    track("jev_demo_interact", { example_id: v, action: "select" });
  };
  const replay = () => {
    setRun((r) => r + 1);
    track("jev_demo_interact", { example_id: value, action: "replay" });
  };

  return (
    <div className={cn("rounded-[24px] border border-white/10 bg-dark-surface p-5 sm:p-7", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-ink text-citron">
            <Icon name="target" variant="bulk" className="size-5" />
          </span>
          <h3 className="type-h3 text-canvas">{d.heading}</h3>
          <span className="inline-flex h-6 items-center rounded-full border border-dark-muted/40 px-2.5 font-mono text-[10px] tracking-[0.06em] text-dark-muted uppercase">
            {d.badge}
          </span>
        </div>
        <button
          type="button"
          onClick={replay}
          className="inline-flex h-11 items-center gap-2 rounded-[8px] px-3 type-ui text-dark-muted transition-colors duration-[160ms] hover:bg-white/8 hover:text-canvas focus-visible:outline-citron"
        >
          <Icon name="replay" className="size-4" />
          {d.replay}
        </button>
      </div>

      <TabsPrimitive.Root value={value} onValueChange={select} className="mt-5">
        <TabsPrimitive.List aria-label="Decision examples" className="flex flex-wrap gap-1">
          {d.examples.map((e) => (
            <TabsPrimitive.Trigger
              key={e.id}
              value={e.id}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-[8px] px-4 type-ui text-dark-muted transition-colors duration-[160ms] ease-[var(--ease-state)] outline-none",
                "hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-citron",
                "data-[state=active]:bg-citron data-[state=active]:text-canvas",
              )}
            >
              <Icon
                name={e.id === "route" ? "gitBranch" : e.id === "urgency" ? "gauge" : "flask"}
                className="size-4"
              />
              {e.label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>

        {d.examples.map((e) => (
          <TabsPrimitive.Content key={e.id} value={e.id} className="mt-6 outline-none">
            <Flow key={`${e.id}-${run}`} example={e} />
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>

      <p className="type-small mt-6 text-dark-muted">{active.note}</p>
    </div>
  );
}

/** Deterministic, local visualization. No provider is called. */
function Flow({ example }: { example: Example }) {
  return (
    <div
      className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch"
      aria-label={`${example.label} example: input, Jev decision, output`}
    >
      {/* Input */}
      <div
        className="jev-step rounded-[18px] border border-white/10 bg-ink p-5"
        style={{ "--delay": "0ms" } as React.CSSProperties}
      >
        <p className="type-eyebrow text-dark-muted">Input</p>
        <p className="type-body mt-2 text-canvas">“{example.input}”</p>
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="type-eyebrow text-dark-muted">
            Question · <span className="text-citron lowercase">{example.helper}()</span>
          </p>
          <p className="type-small mt-1.5 text-canvas">{example.question}</p>
        </div>
      </div>

      {/* Connector + node */}
      <div className="flex items-center justify-center md:w-[168px]" aria-hidden="true">
        <svg viewBox="0 0 168 56" className="hidden h-14 w-[168px] md:block">
          <line
            x1="0"
            y1="28"
            x2="56"
            y2="28"
            stroke="var(--dark-muted)"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
          <line
            x1="0"
            y1="28"
            x2="56"
            y2="28"
            stroke="var(--citron)"
            strokeWidth="2"
            pathLength={1}
            className="jev-line"
            style={{ "--delay": "150ms" } as React.CSSProperties}
          />
          <line
            x1="112"
            y1="28"
            x2="168"
            y2="28"
            stroke="var(--dark-muted)"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
          <line
            x1="112"
            y1="28"
            x2="168"
            y2="28"
            stroke="var(--citron)"
            strokeWidth="2"
            pathLength={1}
            className="jev-line"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          />
          <rect
            x="56"
            y="4"
            width="56"
            height="48"
            rx="12"
            fill="var(--ink)"
            stroke="var(--citron)"
            strokeWidth="2"
            className="jev-node"
            style={{ "--delay": "250ms" } as React.CSSProperties}
          />
          <text
            x="84"
            y="33"
            textAnchor="middle"
            fill="var(--canvas)"
            fontFamily="var(--font-martian)"
            fontSize="13"
            className="jev-node"
            style={{ "--delay": "250ms" } as React.CSSProperties}
          >
            Jev
          </text>
        </svg>
        <div className="flex flex-col items-center gap-1 md:hidden">
          <span className="h-4 w-0.5 bg-citron/60" />
          <span className="inline-flex h-10 min-w-14 items-center justify-center rounded-[10px] border-2 border-citron bg-ink px-3 font-mono text-[13px] text-canvas">
            Jev
          </span>
          <span className="h-4 w-0.5 bg-citron/60" />
        </div>
      </div>

      {/* Output */}
      <div
        className="jev-step rounded-[18px] border border-white/10 bg-ink p-5"
        style={{ "--delay": "500ms" } as React.CSSProperties}
      >
        <p className="type-eyebrow text-dark-muted">Output</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex h-10 items-center rounded-[8px] bg-citron px-3 font-mono text-[14px] font-medium text-canvas">
            {example.output}
          </span>
          {example.alternatives.map((alt) => (
            <span
              key={alt}
              className="inline-flex h-10 items-center rounded-[8px] border border-white/15 px-3 font-mono text-[13px] text-dark-muted"
            >
              {alt}
            </span>
          ))}
        </div>
        <p className="type-small mt-4 text-dark-muted">{example.caption}</p>
      </div>
    </div>
  );
}
