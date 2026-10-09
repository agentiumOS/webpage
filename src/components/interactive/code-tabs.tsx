"use client";

import * as React from "react";
import { cn } from "cn";
import { Tabs as TabsPrimitive } from "radix-ui";
import { CopyButton } from "./copy-button";
import { Eyebrow } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/layout/arrow-link";
import { Icon } from "@/components/graphics/icon";
import { track } from "@/lib/analytics";

export type HighlightedSample = {
  id: string;
  label: string;
  filename: string;
  code: string;
  html: string;
  docsUrl: string;
  heading: readonly string[];
  description: string;
};

type Props = {
  samples: HighlightedSample[];
  eyebrow: string;
};

const ROTATION_MS = 4_000;
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function getReducedMotion() { return window.matchMedia(motionQuery).matches; }

export function CodeTabs({ samples, eyebrow }: Props) {
  const [value, setValue] = React.useState(samples[0]?.id ?? "");
  const [paused, setPaused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [animateChange, setAnimateChange] = React.useState(false);
  const root = React.useRef<HTMLDivElement>(null);
  const reduceMotion = React.useSyncExternalStore(subscribeToMotion, getReducedMotion, () => true);
  const activeIndex = Math.max(0, samples.findIndex((sample) => sample.id === value));
  const active = samples[activeIndex];
  const rotating = !paused && !hovered && !focused && !reduceMotion && inView && visible;

  React.useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  React.useEffect(() => {
    if (!rotating || samples.length < 2) return;
    const timer = window.setTimeout(() => {
      setAnimateChange(true);
      setValue(samples[(activeIndex + 1) % samples.length].id);
    }, ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, activeIndex, samples]);

  React.useEffect(() => {
    const list = root.current?.querySelector<HTMLElement>('[role="tablist"]');
    const selected = list?.querySelector<HTMLElement>('[data-state="active"]');
    if (!list || !selected) return;
    const bounds = list.getBoundingClientRect();
    const tab = selected.getBoundingClientRect();
    if (tab.right > bounds.right) list.scrollLeft += tab.right - bounds.right;
    else if (tab.left < bounds.left) list.scrollLeft += tab.left - bounds.left;
  }, [value]);

  if (!active) return null;
  const entrance = animateChange && "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-[180ms] motion-safe:ease-[var(--ease-state)]";

  return (
    <TabsPrimitive.Root
      ref={root}
      value={value}
      onValueChange={(id) => {
        setAnimateChange(false);
        setValue(id);
        track("code_tab_select", { sample_id: id, link_location: "section:code" });
      }}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      className="grid-main"
    >
      <div className="md:col-span-6 lg:col-span-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div key={active.id} className={cn("mt-4", entrance)}>
          <h2 id="code-title" className="type-h2 max-w-[19ch] lg:min-h-[112px]">
            {active.heading.map((line) => <span key={line} className="block">{line}</span>)}
          </h2>
          <p className="type-lead mt-5 max-w-[43ch] text-ink-muted lg:min-h-[132px]">{active.description}</p>
          <div className="mt-7"><ArrowLink href={active.docsUrl} external>Explore {active.label.toLowerCase()}</ArrowLink></div>
        </div>
        <div className="mt-8 flex items-center gap-3 text-ink-muted">
          <span className="font-mono text-[11px] tabular-nums" aria-label={`Example ${activeIndex + 1} of ${samples.length}`}>
            {String(activeIndex + 1).padStart(2, "0")} <span className="mx-1 text-control-line">/</span> {String(samples.length).padStart(2, "0")}
          </span>
          <div className="h-px w-12 bg-line" aria-hidden="true" />
          <button
            type="button"
            hidden={reduceMotion}
            aria-label={paused ? "Play code examples" : "Pause code examples"}
            aria-pressed={paused}
            onClick={() => setPaused((current) => !current)}
            className="inline-flex min-h-11 items-center gap-2 text-[12px] font-medium hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-citron"
          >
            <Icon name={paused ? "play" : "pause"} className="size-3.5" />
            {paused ? "Play examples" : "Pause rotation"}
          </button>
        </div>
      </div>
      <div className="mt-2 min-w-0 md:col-span-6 lg:col-span-8 lg:mt-0">
        <div className="overflow-hidden rounded-[18px] border border-dark-surface bg-ink text-canvas">
          <div className="border-b border-white/10 px-2 pt-1 sm:px-3">
            <TabsPrimitive.List aria-label="Code examples" className="flex max-w-full items-end gap-1 overflow-x-auto">
              {samples.map((sample) => (
                <TabsPrimitive.Trigger
                  key={sample.id}
                  value={sample.id}
                  className={cn(
                    "type-ui relative inline-flex h-11 shrink-0 items-center rounded-t-[8px] px-3 text-dark-muted outline-none transition-colors duration-[160ms] ease-[var(--ease-state)]",
                    "hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-citron",
                    "data-[state=active]:bg-white/6 data-[state=active]:text-canvas",
                    "after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-transparent data-[state=active]:after:bg-citron",
                  )}
                >{sample.label}</TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
          </div>
          <div className="flex h-11 items-center justify-between border-b border-white/5 pr-2 pl-4 sm:pl-6">
            <span className="font-mono text-[11px] tracking-[0.04em] text-dark-muted">{active.filename}</span>
            <CopyButton key={active.id} text={active.code} label={`Copy ${active.filename}`} tone="dark" onCopied={() => track("code_copy", { sample_id: active.id })} />
          </div>
          {samples.map((sample) => (
            <TabsPrimitive.Content key={sample.id} value={sample.id} className={cn("outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-citron", entrance)}>
              <div
                tabIndex={0}
                aria-label={`${sample.filename} source`}
                className="type-code h-[460px] max-w-full overflow-auto p-4 text-canvas focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-citron sm:p-6 [&_pre]:m-0 [&_pre]:min-w-max [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[12px]"
                dangerouslySetInnerHTML={{ __html: sample.html }}
              />
            </TabsPrimitive.Content>
          ))}
        </div>
      </div>
    </TabsPrimitive.Root>
  );
}
