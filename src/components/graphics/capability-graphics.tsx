import { cn } from "cn";
import { Icon } from "@/components/graphics/icon";

/* All graphics are authored HTML/SVG. Each carries one small explanatory loop
   (CSS, see `gfx-*` in globals.css) that shows what the capability does; the
   loops pause for people who prefer reduced motion. Nothing essential is hidden. */

export function MemoryGraphic() {
  const notes = [
    { label: "Session", body: "12 messages · invoice A104", icon: "note" as const },
    { label: "User facts", body: "Prefers concise replies", icon: "user" as const },
    { label: "Retrieved context", body: "Refund policy · section 3", icon: "file" as const },
  ];
  return (
    <div className="relative flex h-full min-h-[220px] items-end p-5" aria-hidden="true">
      <span className="absolute top-4 left-5 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
        Example context
      </span>
      <div className="relative w-full">
        {notes.map((n, i) => (
          <div
            key={n.label}
            style={{
              animationDelay: `${i * 0.7}s`,
              marginLeft: `${i * 12}px`,
              marginTop: i === 0 ? 0 : -10,
              zIndex: i + 1,
            }}
            className="gfx-float relative rounded-[12px] border border-line bg-surface p-3.5 shadow-[0_10px_28px_-18px_rgb(32_37_33/0.35)]"
          >
            <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
              <Icon name={n.icon} className="size-3.5" />
              {n.label}
            </p>
            <p className="type-small mt-1 text-ink">{n.body}</p>
            {i === notes.length - 1 ? (
              <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-citron-ink" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToolsGraphic() {
  return (
    <div className="flex h-full min-h-[220px] flex-col justify-end gap-3 p-4" aria-hidden="true">
      <div className="rounded-[12px] border border-ink bg-ink p-4 font-mono text-[12px] leading-5 text-canvas shadow-[0_16px_32px_-20px_rgb(32_37_33/0.55)]">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#F0B4AD]" />
          <span className="size-1.5 rounded-full bg-[#E8C98A]" />
          <span className="size-1.5 rounded-full bg-citron" />
          <span className="ml-2 text-[10px] tracking-[0.06em] text-dark-muted uppercase">tool call</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            <span className="text-citron">lookup_order</span>
            <span className="text-dark-muted">{"({ orderId: "}</span>
            <span className="text-[#E8C98A]">&quot;A104&quot;</span>
            <span className="text-dark-muted">{" })"}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-citron">
            <Icon name="check" className="gfx-ping size-3.5" />
            completed
          </span>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {(
          [
            { label: "API", icon: "api" },
            { label: "Database", icon: "database" },
            { label: "Search", icon: "search" },
          ] as const
        ).map((s, i) => (
          <li
            key={s.label}
            style={{ animationDelay: `${i * 1.2}s` }}
            className="gfx-cycle-3 flex h-12 flex-col items-center justify-center gap-1 rounded-[10px] border border-line bg-surface font-mono text-[10px] tracking-[0.06em] text-ink uppercase"
          >
            <Icon name={s.icon} className="size-3.5" />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TeamsGraphic() {
  const specialists = [
    { id: "research", label: "Research" },
    { id: "draft", label: "Draft" },
    { id: "review", label: "Review" },
  ];
  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-0 px-5 py-6" aria-hidden="true">
      <span className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-3.5 py-2 font-mono text-[11px] tracking-[0.04em] text-canvas">
        <Icon name="team" className="size-3.5" />
        Coordinator
      </span>
      <svg width="180" height="36" viewBox="0 0 180 36" className="shrink-0">
        <path d="M90 0 v12 H20 v24" stroke="var(--line)" strokeWidth="1.5" fill="none" />
        <path d="M90 12 v24" stroke="var(--citron-ink)" strokeWidth="1.5" fill="none" />
        <path d="M90 12 H160 v24" stroke="var(--line)" strokeWidth="1.5" fill="none" />
        {[
          "M90 0 v12 H20 v24",
          "M90 0 v12 v24",
          "M90 0 v12 H160 v24",
        ].map((d, i) => (
          <path
            key={d}
            className="gfx-flow"
            style={{ animationDelay: `${i * 0.8}s` }}
            d={d}
            pathLength={1}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <ul className="mt-1 flex w-full max-w-[280px] items-start justify-between gap-2">
        {specialists.map((n) => (
          <li
            key={n.id}
            className={cn(
              "inline-flex min-h-9 items-center rounded-[8px] border px-2.5 py-1.5 font-mono text-[10px] tracking-[0.04em]",
              n.id === "draft"
                ? "border-citron bg-citron/40 text-ink"
                : "border-line bg-surface text-ink",
            )}
          >
            {n.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WorkflowGraphic() {
  const steps = ["Retrieve", "Draft", "Review", "Revise", "Finish"];
  return (
    <div className="flex h-full min-h-[220px] flex-col justify-center gap-5 px-5 py-6" aria-hidden="true">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-1">
            <span
              style={{ animationDelay: `${i * 0.9}s` }}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-3 font-mono text-[11px] tracking-[0.04em]",
                s === "Review"
                  ? "gfx-cycle-5-pop border-ink bg-ink text-canvas"
                  : "gfx-cycle-5-pill border-line bg-surface text-ink",
              )}
            >
              <span className={cn("font-medium", s === "Review" ? "text-citron" : "text-ink-muted")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s}
            </span>
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="mx-0.5 h-px w-3 bg-control-line" />
            ) : null}
          </li>
        ))}
      </ol>
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
        <svg width="56" height="20" viewBox="0 0 56 20" className="shrink-0">
          <path
            className="gfx-draw"
            d="M2 2 v10 a4 4 0 0 0 4 4 h44 l-4 -4 m4 4 l-4 4"
            pathLength={1}
            fill="none"
            stroke="var(--citron-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Review → Revise when changes are needed
      </div>
    </div>
  );
}

export function KnowledgeGraphic() {
  return (
    <div className="flex h-full min-h-[220px] flex-col gap-2.5 p-4" aria-hidden="true">
      <div className="flex h-11 items-center gap-3 rounded-[10px] border border-line bg-surface px-3.5 type-small text-ink shadow-[inset_0_1px_0_rgb(255_255_255)]">
        <Icon name="search" className="size-4 text-ink-muted" />
        <span>
          What is our return window?
          <span aria-hidden="true" className="gfx-caret ml-px inline-block h-[1.1em] w-px translate-y-[0.2em] bg-ink" />
        </span>
      </div>
      {[
        {
          tag: "policy.md",
          text: (
            <>
              Items may be returned within <mark className="rounded-[3px] bg-citron/20 px-0.5 text-citron-ink">30 days</mark> of
              delivery.
            </>
          ),
        },
        { tag: "faq.md", text: "Refunds are issued to the original payment method." },
      ].map((s, i) => (
        <div
          key={s.tag}
          style={{ animationDelay: `${i * 1.8}s` }}
          className="gfx-cycle-2 rounded-[12px] border border-line bg-surface p-3.5"
        >
          <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
            <Icon name="file" className="size-3.5" />
            {s.tag}
            <span className="ml-auto normal-case tracking-normal text-ink-muted">example</span>
          </p>
          <p className="type-small mt-1.5 text-ink">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export function HarnessGraphic() {
  const files = [
    { name: "AGENTS.md", kind: "file" as const, depth: 0 },
    { name: "skills/", kind: "dir" as const, depth: 0 },
    { name: "summarize-ticket/", kind: "dir" as const, depth: 1 },
    { name: "MEMORY.md", kind: "file" as const, depth: 0 },
    { name: "workspace/", kind: "dir" as const, depth: 0 },
  ];
  return (
    <div className="flex h-full min-h-[220px] flex-col p-4" aria-hidden="true">
      <div className="flex flex-1 flex-col overflow-hidden rounded-[12px] border border-line bg-surface shadow-[0_10px_24px_-18px_rgb(32_37_33/0.3)]">
        <div className="flex h-9 items-center gap-1.5 border-b border-line px-3">
          <span className="size-1.5 rounded-full bg-[#F0B4AD]" />
          <span className="size-1.5 rounded-full bg-[#E8C98A]" />
          <span className="size-1.5 rounded-full bg-[#C8D9B8]" />
          <span className="ml-2 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
            Project files
          </span>
        </div>
        <ul className="flex flex-col gap-0.5 p-2 font-mono text-[12px] leading-5 text-ink">
          {files.map((f, i) => (
            <li
              key={f.name}
              style={{ paddingLeft: `${8 + f.depth * 16}px`, animationDelay: `${i * 0.9}s` }}
              className={cn(
                "gfx-cycle-5-row flex items-center gap-2 rounded-[6px] px-2 py-1.5",
                f.name === "AGENTS.md" && "bg-citron/40",
              )}
            >
              {f.kind === "dir" ? (
                <Icon name="folder" className="size-3.5 text-ink-muted" />
              ) : (
                <Icon name="file" className="size-3.5 text-ink-muted" />
              )}
              {f.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
