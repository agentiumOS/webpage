/* Conceptual diagrams for the /jev "three ways" rows. Decorative; adjacent copy carries meaning. */

function Node({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark" | "citron";
  className?: string;
}) {
  const t =
    tone === "dark"
      ? "border-ink bg-ink text-canvas"
      : tone === "citron"
        ? "border-citron bg-citron text-canvas"
        : "border-line bg-surface text-ink";
  return (
    <span
      className={`inline-flex min-h-11 items-center justify-center rounded-[10px] border px-4 py-2 text-center font-mono text-[12px] leading-5 ${t} ${className}`}
    >
      {children}
    </span>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return vertical ? (
    <span aria-hidden="true" className="mx-auto h-5 w-px bg-control-line" />
  ) : (
    <span aria-hidden="true" className="h-px w-6 shrink-0 bg-control-line" />
  );
}

export function DecisionAgentGraphic() {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-line bg-surface-muted p-6" aria-hidden="true">
      <p className="font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">Conceptual flow</p>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-col gap-2">
          <Node>state · request text</Node>
          <Node>choice(&quot;Which team…&quot;)</Node>
        </div>
        <Arrow />
        <Node tone="dark" className="gfx-breathe sm:min-w-[72px]">
          Jev
        </Node>
        <Arrow />
        <div className="flex flex-1 flex-col gap-2">
          <Node tone="citron" className="gfx-cycle-5-pop">
            accounts
          </Node>
          <Node className="text-ink-muted">→ your routing logic</Node>
        </div>
      </div>
    </div>
  );
}

export function ToolAgentGraphic() {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-line bg-surface-muted p-6" aria-hidden="true">
      <p className="font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">Conceptual flow</p>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Node tone="dark" className="gfx-breathe flex-1">
          Chat agent
        </Node>
        <Arrow />
        <div className="flex flex-1 flex-col gap-2">
          <Node tone="citron" className="gfx-breathe">
            Jev tool · label / noul / score
          </Node>
        </div>
        <Arrow />
        <Node className="flex-1">Chat reply</Node>
      </div>
      <div className="mt-1 flex items-center gap-3 border-t border-line pt-3">
        <span className="font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">Separate</span>
        <Node className="border-dashed text-ink-muted">Application action</Node>
        <span className="type-small text-ink-muted">Your code decides whether anything runs.</span>
      </div>
    </div>
  );
}

export function JudgeGraphic() {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-line bg-surface-muted p-6" aria-hidden="true">
      <p className="font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">Conceptual flow</p>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Node className="flex-1">Response</Node>
        <Arrow />
        <Node className="flex-1">Criteria you define</Node>
        <Arrow />
        <Node tone="dark" className="gfx-breathe sm:min-w-[72px]">
          Jev
        </Node>
        <Arrow />
        <Node tone="citron" className="gfx-breathe flex-1">
          score
        </Node>
        <Arrow />
        <Node className="flex-1 border-ink">Your pass rule</Node>
      </div>
      <p className="type-small text-ink-muted">Wrap the call in <code>custom()</code> from the eval package and validate the score explicitly.</p>
    </div>
  );
}
