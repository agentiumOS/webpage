"use client";

import * as React from "react";
import { cn } from "cn";
import { home } from "@/content/site";
import { Icon, type IconName } from "@/components/graphics/icon";
import { track } from "@/lib/analytics";
import { RevealGroup, RevealItem } from "@/components/interactive/reveal";

type ApprovalState = "waiting" | "approved" | "denied";
const STAGES = home.flow.stages;

export function ScrollStory() {
  const f = home.flow;
  const [active, setActive] = React.useState(0);
  const [approval, setApproval] = React.useState<ApprovalState>("waiting");
  const chapterRefs = React.useRef<(HTMLElement | null)[]>([]);

  React.useEffect(() => {
    const els = chapterRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    // A chapter is "active" when it crosses the viewport's vertical midline.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-10 lg:mt-12">
      <div className="story:grid story:grid-cols-12 story:gap-6 story:items-start">
        {/* Narrative */}
        <div className="story:col-span-5">
          {STAGES.map((stage, i) => (
            <article
              key={stage.id}
              id={`flow-${stage.number}`}
              data-index={i}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              className={cn(
                "flex flex-col justify-center border-t border-line py-10",
                "story:min-h-[max(65svh,400px)] story:border-t-0 story:py-0 story:[&+&]:mt-10",
              )}
            >
              <RevealGroup className="max-w-[44ch]">
                <RevealItem>
                  <p className="flex items-center gap-3 font-mono text-[12px] tracking-[0.08em] text-citron-ink">
                    <span aria-hidden="true" className="h-px w-6 bg-citron-ink" />
                    {stage.number}
                    <span className="text-ink-muted">/ {stage.label}</span>
                  </p>
                </RevealItem>
                <RevealItem
                  as="h3"
                  className="font-display mt-4 text-[28px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px] lg:text-[36px]"
                >
                  {stage.heading}
                </RevealItem>
                <RevealItem as="p" className="type-lead mt-4 text-ink-muted">
                  {stage.body}
                </RevealItem>
              </RevealGroup>
              {/* Inline diagram for non-sticky configurations */}
              <div className="mt-8 story:hidden">
                <FlowDiagram
                  stage={i}
                  approval={approval}
                  onApproval={setApproval}
                  badge={f.badge}
                  static
                />
              </div>
            </article>
          ))}
        </div>

        {/* Sticky visual */}
        <div className="hidden story:col-span-7 story:block story:self-start story:sticky story:top-[112px]">
          <FlowDiagram
            stage={active}
            approval={approval}
            onApproval={setApproval}
            badge={f.badge}
            className="min-h-[min(560px,calc(100svh-144px))]"
          />
          <ol className="mt-3 flex items-center gap-1" aria-label="Chapters">
            {STAGES.map((stage, i) => (
              <li key={stage.id} className="flex-1">
                <a
                  href={`#flow-${stage.number}`}
                  aria-current={active === i ? "step" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-[8px] px-2.5 font-mono text-[11px] tracking-[0.06em] uppercase transition-colors duration-[160ms] ease-[var(--ease-state)]",
                    active === i ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px w-5 shrink-0 transition-colors duration-[160ms]",
                      i <= active ? "bg-ink" : "bg-line",
                    )}
                  />
                  {stage.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type DiagramProps = {
  stage: number;
  approval: ApprovalState;
  onApproval: (s: ApprovalState) => void;
  badge: string;
  className?: string;
  /** In static mode the panel is not height-constrained and shows no crossfade. */
  static?: boolean;
};

/**
 * The panel is a run trace. One request enters at the top; each stage is a step
 * in the timeline below it. Steps the reader has passed collapse to a one-line
 * record, the current step is expanded, later steps are queued. Nothing is
 * swapped out, so by the last chapter the whole path of the request is visible.
 */
function FlowDiagram({ stage, approval, onApproval, badge, className, static: isStatic }: DiagramProps) {
  const f = home.flow;
  const approvalSummary =
    approval === "waiting"
      ? STAGES[3].summary
      : approval === "approved"
        ? "Reviewer approved · issue_credit would run next"
        : "Reviewer denied · issue_credit did not run";

  return (
    <div
      className={cn("flex flex-col rounded-[24px] border border-line bg-surface p-5 shadow-[0_8px_32px_-24px_rgba(18,24,38,0.28)] sm:p-6", className)}
      aria-live="off"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex h-6 items-center rounded-full border border-line bg-surface-muted px-2.5 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
          {badge}
        </span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-ink-muted tabular-nums">
          Step {STAGES[stage].number} / {String(STAGES.length).padStart(2, "0")}
        </span>
      </div>

      <div aria-hidden="true" className="mt-4 grid grid-cols-4 gap-1.5">
        {STAGES.map((item, index) => (
          <span key={item.id} className={cn("h-1 rounded-full transition-colors duration-[240ms]", index <= stage ? "bg-citron" : "bg-surface-muted")} />
        ))}
      </div>

      {/* The request stays visible as context moves through the run. */}
      <div className="mt-4 flex items-start gap-3 rounded-[12px] border border-line bg-canvas px-3 py-3 sm:px-4">
        <span className="mt-0.5 hidden size-8 shrink-0 items-center justify-center rounded-[8px] border border-line bg-surface text-citron-ink sm:inline-flex">
          <Icon name="user" variant="duotone" className="size-5" />
        </span>
        <div className="min-w-0">
          <Label>{f.requestLabel}</Label>
          <p className="type-body mt-1 text-ink">“{f.request}”</p>
        </div>
      </div>

      {/* Trace */}
      <ol className="mt-5 flex flex-col">
        {STAGES.map((s, i) => {
          const state: StepState = i < stage ? "done" : i === stage ? "active" : "pending";
          const last = i === STAGES.length - 1;
          const summary = i === 3 ? approvalSummary : s.summary;
          return (
            <li key={s.id} className="grid grid-cols-[20px_1fr] gap-x-3">
              {/* Rail: marker + connector */}
              <div className="flex flex-col items-center">
                <StepMarker state={state} />
                {!last ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-px flex-1 transition-colors duration-[240ms] ease-[var(--ease-state)]",
                      state === "done" ? "bg-ink/30" : "bg-line",
                    )}
                  />
                ) : null}
              </div>

              {/* Row */}
              <div className={cn("min-w-0", !last && "pb-5")}>
                <div className="flex min-h-5 items-baseline gap-3">
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.06em] uppercase transition-colors duration-[240ms]",
                      state === "pending" ? "text-ink-muted/70" : "text-ink",
                    )}
                  >
                    {s.number} {s.label}
                  </span>
                  {state !== "active" ? (
                    <span
                      className={cn(
                        "type-small truncate",
                        state === "done" ? "text-ink-muted" : "text-ink-muted/60",
                      )}
                    >
                      {state === "done" ? summary : f.pendingLabel}
                    </span>
                  ) : null}
                </div>

                {state === "active" ? (
                  <div
                    key={s.id}
                    className={cn(
                      "mt-3",
                      !isStatic &&
                        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-[240ms] motion-safe:ease-[var(--ease-enter)]",
                    )}
                  >
                    {i === 0 && <StageContext />}
                    {i === 1 && <StageDecision />}
                    {i === 2 && <StageTools />}
                    {i === 3 && <StageApproval approval={approval} onApproval={onApproval} />}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

type StepState = "done" | "active" | "pending";

function StepMarker({ state }: { state: StepState }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-[240ms] ease-[var(--ease-state)]",
        state === "done" && "border-ink bg-ink text-canvas",
        state === "active" && "border-citron-ink bg-citron text-canvas",
        state === "pending" && "border-line bg-surface",
      )}
    >
      {state === "done" ? <Icon name="check" className="size-2.5" strokeWidth={2.5} /> : null}
      {state === "active" ? <span className="size-1.5 rounded-full bg-ink" /> : null}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">{children}</p>
  );
}

function StageContext() {
  const sources: { title: string; icon: IconName; source: string; details: [string, string][] }[] = [
    { title: "Account history", icon: "database", source: "Session memory", details: [["Plan", "Team"], ["History", "2 prior tickets"]] },
    { title: "Invoice record", icon: "invoice", source: "Connected data", details: [["Invoice", "A104"], ["Items", "2 line items"]] },
  ];
  return (
    <div>
      <Label>Context loaded</Label>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {sources.map((source) => (
          <li key={source.title} className="overflow-hidden rounded-[12px] border border-line bg-canvas">
            <div className="flex items-center gap-2.5 border-b border-line bg-surface px-3 py-2.5">
              <Icon name={source.icon} variant="duotone" className="size-5 shrink-0 text-citron-ink" />
              <p className="text-[12px] font-medium text-ink">{source.title}</p>
              <Icon name="checkCircle" className="ml-auto size-3.5 shrink-0 text-citron-ink" />
            </div>
            <dl className="space-y-1.5 px-3 py-3 text-[11px] leading-4">
              {source.details.map(([label, value]) => (
                <div key={label} className="flex flex-wrap justify-between gap-x-2 gap-y-0.5">
                  <dt className="text-ink-muted">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-line px-3 py-2 font-mono text-[9px] tracking-[0.02em] text-ink-muted">{source.source}</p>
          </li>
        ))}
      </ul>
      <p className="type-small mt-3 text-ink-muted">
        Example data. Your storage and retrieval decide what loads.
      </p>
    </div>
  );
}

function StageDecision() {
  const routes: { id: string; label: string; icon: IconName; chosen: boolean }[] = [
    { id: "billing", label: "Billing", icon: "invoice", chosen: true },
    { id: "technical", label: "Technical", icon: "wrench", chosen: false },
    { id: "other", label: "General", icon: "team", chosen: false },
  ];
  return (
    <div>
      <Label>Team routing</Label>
      <div className="mt-3 grid grid-cols-[60px_22px_minmax(0,1fr)] items-center sm:grid-cols-[84px_36px_minmax(0,1fr)]">
        <div className="relative flex items-center justify-center text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-[12px] border border-citron/30 bg-ink text-canvas shadow-[0_4px_0_0_var(--surface-muted)] sm:size-14">
            <Icon name="gitBranch" variant="duotone" className="size-6" />
          </div>
          <span className="absolute top-full mt-2 font-mono text-[10px] text-ink">Router</span>
        </div>
        <svg viewBox="0 0 36 136" fill="none" preserveAspectRatio="none" className="h-[136px] w-full self-start" aria-hidden="true">
          <path d="M0 68H14V20H36M14 68H36M14 68V116H36" stroke="var(--line)" strokeWidth="1.5" />
          <path d="M0 68H14V20H36" stroke="var(--citron)" strokeWidth="1.5" />
          <circle cx="14" cy="68" r="3" fill="var(--surface)" stroke="var(--citron)" strokeWidth="1.5" />
        </svg>
        <ul className="space-y-2">
          {routes.map((route) => (
            <li key={route.id} className={cn("flex h-10 items-center gap-2 rounded-[9px] border px-2.5 sm:px-3", route.chosen ? "border-citron/40 bg-citron/5 text-citron-ink" : "border-line bg-canvas text-ink-muted")}>
              <Icon name={route.icon} variant="duotone" className="size-4 shrink-0" />
              <span className="text-[11px] sm:text-[12px]">{route.label}</span>
              {route.chosen ? <Icon name="checkCircle" className="ml-auto size-3.5 shrink-0" /> : <span aria-hidden="true" className="ml-auto size-1.5 shrink-0 rounded-full bg-line" />}
            </li>
          ))}
        </ul>
      </div>
      <p className="type-small mt-3 text-ink-muted">
        Use a model or application logic to choose the next specialist.
      </p>
    </div>
  );
}

function StageTools() {
  return (
    <div>
      <Label>Specialist at work</Label>
      <div className="mt-3 overflow-hidden rounded-[12px] border border-line">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-ink px-3 py-2.5 font-mono text-[11px] text-canvas sm:px-4">
          <span className="inline-flex items-center gap-2"><Icon name="wrench" variant="duotone" className="size-4" />lookup_invoice</span>
          <span className="inline-flex items-center gap-1 text-[10px] text-[#A9C2FF]"><Icon name="check" className="size-3" />completed</span>
        </div>
        <div className="grid gap-2 bg-canvas px-3 py-3 font-mono text-[11px] sm:grid-cols-2 sm:px-4">
          <div><Label>Input</Label><p className="mt-1 text-ink">id: <span className="text-citron-ink">&quot;A104&quot;</span></p></div>
          <div><Label>Result</Label><p className="mt-1 text-ink">2 invoice items</p></div>
        </div>
      </div>
      <div className="relative ml-3 h-4 border-l border-dashed border-control-line" aria-hidden="true"><span className="absolute -bottom-0.5 -left-[2.5px] size-1 rounded-full bg-control-line" /></div>
      <div className="rounded-[12px] border border-line bg-canvas p-3 sm:p-4">
        <div className="flex items-center gap-2"><Icon name="note" variant="duotone" className="size-4 text-citron-ink" /><Label>Draft response</Label></div>
        <p className="type-small mt-2 text-ink">
          I found invoice A104. The second line item looks like a duplicate of the first. I can
          issue a credit for it once a teammate confirms.
        </p>
      </div>
    </div>
  );
}

function StageApproval({
  approval,
  onApproval,
}: {
  approval: ApprovalState;
  onApproval: (s: ApprovalState) => void;
}) {
  const a = home.flow.approval;
  const statusLabel =
    approval === "waiting" ? a.waiting : approval === "approved" ? a.approved : a.denied;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label>Human review</Label>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2 py-1 text-[10px] text-ink-muted"><Icon name="shieldCheck" variant="duotone" className="size-3.5 text-citron-ink" />Approval gate</span>
      </div>
      <div className="mt-3 rounded-[12px] border border-line bg-ink p-4 font-mono text-[12px] leading-5 text-canvas">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            <span className="text-[#A9C2FF]">issue_credit</span>
            <span className="text-dark-muted">{"({"}</span>
            <span className="block pl-4 sm:inline sm:pl-0">
              <span className="text-dark-muted">{" invoice: "}</span>
              <span className="text-[#E8C98A]">&quot;A104&quot;</span>
            </span>
            <span className="block text-dark-muted sm:inline">{" })"}</span>
          </span>
          <span
            role="status"
            className={cn(
              "inline-flex items-center gap-1.5 text-[11px]",
              approval === "waiting" && "text-[#F2CF8B]",
              approval === "approved" && "text-citron",
              approval === "denied" && "text-[#F0B4AD]",
            )}
          >
            {approval === "waiting" ? (
              <Icon name="loading" className="size-3.5" />
            ) : approval === "approved" ? (
              <Icon name="check" className="size-3.5" />
            ) : (
              <Icon name="close" className="size-3.5" />
            )}
            {statusLabel}
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            onApproval("approved");
            track("flow_demo_interact", { action: "approve", stage_id: "approval" });
          }}
          disabled={approval !== "waiting"}
          className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-ink px-4 type-ui text-canvas transition-colors duration-[160ms] hover:bg-dark-surface disabled:bg-surface-muted disabled:text-ink-muted"
        >
          <Icon name="check" className="size-4" />
          {a.approve}
        </button>
        <button
          type="button"
          onClick={() => {
            onApproval("denied");
            track("flow_demo_interact", { action: "deny", stage_id: "approval" });
          }}
          disabled={approval !== "waiting"}
          className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-control-line px-4 type-ui text-ink transition-colors duration-[160ms] hover:bg-surface-muted disabled:border-line disabled:text-ink-muted"
        >
          <Icon name="close" className="size-4" />
          {a.deny}
        </button>
        <button
          type="button"
          onClick={() => {
            onApproval("waiting");
            track("flow_demo_interact", { action: "reset", stage_id: "approval" });
          }}
          className="inline-flex h-11 items-center gap-2 rounded-[8px] px-4 type-ui text-ink-muted transition-colors duration-[160ms] hover:bg-surface-muted hover:text-ink"
        >
          <Icon name="replay" className="size-4" />
          {a.reset}
        </button>
      </div>
      <p className="type-small mt-4 text-ink-muted">
        {approval === "waiting"
          ? "The tool does not run until a reviewer decides. Nothing is called from this page."
          : approval === "approved"
            ? "Recorded: example approved by a reviewer. In your application, the tool would run next."
            : "Recorded: example denied. The action does not execute."}
      </p>
    </div>
  );
}
