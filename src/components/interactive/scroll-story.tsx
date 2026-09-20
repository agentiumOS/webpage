"use client";

import * as React from "react";
import { cn } from "cn";
import { home } from "@/content/site";
import { Icon } from "@/components/graphics/icon";
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
      className={cn("flex flex-col rounded-[24px] border border-line bg-surface p-5 sm:p-6", className)}
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

      {/* Request: the one thing that persists through every step */}
      <div className="mt-5 rounded-[12px] border border-line bg-canvas px-4 py-3">
        <Label>{f.requestLabel}</Label>
        <p className="type-body mt-1 text-ink">“{f.request}”</p>
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
  return (
    <div>
      <Label>Context loaded</Label>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          { title: "Account history", body: "Plan: Team · 14 months · 2 prior tickets" },
          { title: "Invoice record", body: "A104 · issued this month · 2 line items" },
        ].map((c) => (
          <li key={c.title} className="rounded-[12px] border border-line bg-canvas p-4">
            <p className="type-ui text-ink">{c.title}</p>
            <p className="type-small mt-1 text-ink-muted">{c.body}</p>
          </li>
        ))}
      </ul>
      <p className="type-small mt-4 text-ink-muted">
        Example data. Your storage and retrieval decide what loads.
      </p>
    </div>
  );
}

function StageDecision() {
  const routes = [
    { id: "billing", label: "Billing", chosen: true },
    { id: "technical", label: "Technical", chosen: false },
    { id: "other", label: "Other", chosen: false },
  ];
  return (
    <div>
      <Label>Typed decision</Label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="inline-flex h-11 shrink-0 items-center justify-center rounded-[10px] border-2 border-citron bg-ink px-4 font-mono text-[13px] text-canvas">
          Jev
        </div>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-citron sm:block" />
        <ul className="flex flex-wrap gap-2">
          {routes.map((r) => (
            <li
              key={r.id}
              className={cn(
                "inline-flex h-10 items-center rounded-[8px] border px-3 font-mono text-[12px]",
                r.chosen
                  ? "border-citron bg-citron text-canvas"
                  : "border-line bg-surface text-ink-muted",
              )}
            >
              {r.label}
            </li>
          ))}
        </ul>
      </div>
      <p className="type-small mt-4 text-ink-muted">
        Jev returns the label. Your application chooses the next step.
      </p>
    </div>
  );
}

function StageTools() {
  return (
    <div>
      <Label>Specialist at work</Label>
      <div className="mt-3 rounded-[12px] border border-line bg-ink p-4 font-mono text-[12px] leading-5 text-canvas">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            <span className="text-citron">lookup_invoice</span>
            <span className="text-dark-muted">{"({ id: "}</span>
            <span className="text-[#E8C98A]">&quot;A104&quot;</span>
            <span className="text-dark-muted">{" })"}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-citron">
            <Icon name="check" className="size-3.5" />
            completed
          </span>
        </div>
      </div>
      <div className="mt-3 rounded-[12px] border border-line bg-canvas p-4">
        <Label>Draft response</Label>
        <p className="type-small mt-1.5 text-ink">
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
      <Label>Human review</Label>
      <div className="mt-3 rounded-[12px] border border-line bg-ink p-4 font-mono text-[12px] leading-5 text-canvas">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            <span className="text-citron">issue_credit</span>
            <span className="text-dark-muted">{"({ invoice: "}</span>
            <span className="text-[#E8C98A]">&quot;A104&quot;</span>
            <span className="text-dark-muted">{" })"}</span>
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
