"use client";

import * as React from "react";
import { cn } from "cn";
import { Tabs as TabsPrimitive } from "radix-ui";
import { CopyButton } from "./copy-button";
import { Icon } from "@/components/graphics/icon";

export type HighlightedSample = {
  id: string;
  label: string;
  filename: string;
  code: string;
  html: string;
  install: string;
  env: string;
  note?: string;
  docsUrl: string;
};

type Props = {
  samples: HighlightedSample[];
  className?: string;
  /** Accessible name for the code panel group */
  label?: string;
};

export function CodeTabs({ samples, className, label = "Code examples" }: Props) {
  const [value, setValue] = React.useState(samples[0]?.id ?? "");
  const active = samples.find((s) => s.id === value) ?? samples[0];

  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={setValue}
      className={cn("flex flex-col", className)}
    >
      <div className="overflow-hidden rounded-[18px] border border-dark-surface bg-ink text-canvas">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-2 pt-1 sm:px-3">
          <TabsPrimitive.List aria-label={label} className="flex items-end gap-1">
            {samples.map((s) => (
              <TabsPrimitive.Trigger
                key={s.id}
                value={s.id}
                className={cn(
                  "relative inline-flex h-11 items-center rounded-t-[8px] px-3 type-ui text-dark-muted transition-colors duration-[160ms] ease-[var(--ease-state)] outline-none",
                  "hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-citron",
                  "data-[state=active]:bg-white/6 data-[state=active]:text-canvas",
                  "after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-transparent after:transition-colors after:duration-[160ms] data-[state=active]:after:bg-citron",
                )}
              >
                {s.label}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          <div className="flex items-center gap-2 pr-1">
            <span className="hidden font-mono text-[11px] tracking-[0.04em] text-dark-muted sm:inline">
              {active.filename}
            </span>
            <CopyButton
              key={active.id}
              text={active.code}
              label={`Copy ${active.filename}`}
              tone="dark"
            />
          </div>
        </div>

        {samples.map((s) => (
          <TabsPrimitive.Content
            key={s.id}
            value={s.id}
            className="outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-citron data-[state=active]:motion-safe:animate-in data-[state=active]:motion-safe:fade-in data-[state=active]:motion-safe:slide-in-from-bottom-1 data-[state=active]:motion-safe:duration-[180ms] data-[state=active]:motion-safe:ease-[var(--ease-state)]"
          >
            <p className="sr-only">{s.filename}</p>
            <div
              tabIndex={0}
              aria-label={`${s.filename} source`}
              className="type-code max-w-full overflow-x-auto p-4 text-canvas sm:p-6 lg:min-h-[350px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-citron [&_pre]:m-0 [&_pre]:min-w-max [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[12px]"
              dangerouslySetInnerHTML={{ __html: s.html }}
            />
          </TabsPrimitive.Content>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <dl className="type-small grid gap-1 text-ink-muted">
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-medium text-ink">Install</dt>
            <dd>
              <code className="text-[12px]!">{active.install}</code>
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-medium text-ink">Server-side env</dt>
            <dd>
              <code className="text-[12px]!">{active.env}</code>
            </dd>
          </div>
          {active.note ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-medium text-ink">Note</dt>
              <dd>{active.note}</dd>
            </div>
          ) : null}
        </dl>
        <a
          href={active.docsUrl}
          className="arrow-shift link-underline type-ui inline-flex min-h-11 shrink-0 items-center gap-2 text-ink"
        >
          Open guide
          <Icon name="arrowUpRight" data-arrow="" className="size-4" />
        </a>
      </div>
    </TabsPrimitive.Root>
  );
}
