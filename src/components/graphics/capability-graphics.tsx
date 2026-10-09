import type { ReactNode } from "react";
import { cn } from "cn";
import { Icon, type IconName } from "@/components/graphics/icon";

/* Decorative, illustrative UI. Real text stays legible as the card narrows;
   diagrams use static states so their meaning does not depend on motion. */
const panel =
  "rounded-xl border border-line bg-surface shadow-[0_8px_20px_-14px_rgb(18_24_38/0.35),inset_0_1px_0_white]";
const label = "font-mono text-[10px] leading-4 tracking-[0.06em] uppercase";

function Scene({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex h-full min-h-[240px] flex-col justify-center overflow-hidden p-4 text-ink",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(var(--control-line)_0.6px,transparent_0.6px)] [background-size:16px_16px]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Mark({ icon, dark = false }: { icon: IconName; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-[9px] border",
        dark
          ? "border-white/15 bg-white/10 text-white"
          : "border-citron/15 bg-citron/8 text-citron-ink",
      )}
    >
      <Icon name={icon} variant="duotone" className="size-4" />
    </span>
  );
}

function Connector({ text }: { text?: string }) {
  return (
    <div className="flex h-7 items-center justify-center gap-2">
      <span className="h-full w-px bg-control-line" />
      {text ? (
        <span className={cn(label, "text-ink-muted")}>{text}</span>
      ) : null}
    </div>
  );
}

export function MemoryGraphic() {
  const sources: { label: string; body: string; icon: IconName }[] = [
    {
      label: "Session history",
      body: "An earlier order question",
      icon: "note",
    },
    { label: "User memory", body: "Prefers concise replies", icon: "user" },
    {
      label: "Retrieved context",
      body: "The current return policy",
      icon: "file",
    },
  ];
  return (
    <Scene>
      <div className="mb-3 flex items-center justify-between">
        <span className={cn(label, "text-ink-muted")}>Context assembly</span>
        <Icon
          name="layers"
          variant="duotone"
          className="size-4 text-ink-muted"
        />
      </div>
      <div className="relative ml-2 space-y-2 border-l border-control-line pl-4">
        {sources.map((source) => (
          <div
            key={source.label}
            className={cn(
              panel,
              "relative flex items-center gap-3 px-3 py-2.5",
            )}
          >
            <span className="absolute -left-[21px] size-2 rounded-full border border-control-line bg-surface" />
            <Mark icon={source.icon} />
            <div className="min-w-0">
              <p className="text-[12px] font-medium leading-5">
                {source.label}
              </p>
              <p className="text-[11px] leading-4 text-ink-muted">
                {source.body}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Connector />
      <div className="flex items-center gap-3 rounded-xl border border-ink bg-ink px-3 py-3 text-white shadow-[0_8px_20px_-12px_rgb(18_24_38/0.5)]">
        <Mark icon="brain" dark />
        <div>
          <p className="text-[12px] leading-5">Ready for the next turn</p>
          <p className="text-[11px] leading-4 text-dark-muted">
            Relevant context, one agent run
          </p>
        </div>
        <Icon
          name="arrowRight"
          className="ml-auto size-4 shrink-0 text-white/60"
        />
      </div>
    </Scene>
  );
}

export function ToolsGraphic() {
  return (
    <Scene>
      <div className={cn(panel, "overflow-hidden")}>
        <div className="flex items-center gap-2 border-b border-line px-3 py-2">
          <Icon
            name="wrench"
            variant="duotone"
            className="size-4 text-citron-ink"
          />
          <span className={cn(label, "text-ink-muted")}>Typed tool call</span>
          <span className="ml-auto size-1.5 rounded-full bg-citron" />
        </div>
        <div className="p-3 font-mono text-[11px] leading-5">
          <p className="font-medium text-citron-ink">lookup_order</p>
          <div className="mt-2 flex items-center justify-between gap-2 rounded-md border border-line bg-surface-muted/50 px-2 py-1">
            <span className="text-ink-muted">orderId</span>
            <span>&quot;A104&quot;</span>
            <span className="text-[10px] text-ink-muted">string</span>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] text-ink-muted">
            <Icon
              name="shieldCheck"
              variant="duotone"
              className="size-3.5 text-citron-ink"
            />
            Input validated against schema
          </p>
        </div>
      </div>
      <div className="relative grid grid-cols-3 gap-2 pt-7">
        <span className="absolute top-0 left-1/2 h-3.5 w-px bg-control-line" />
        <span className="absolute top-3.5 right-[16.67%] left-[16.67%] h-3.5 rounded-t-md border-x border-t border-control-line" />
        <span className="absolute top-3.5 left-1/2 h-3.5 w-px bg-control-line" />
        {(
          [
            { label: "API", icon: "api" },
            { label: "Database", icon: "database" },
            { label: "Search", icon: "search" },
          ] satisfies { label: string; icon: IconName }[]
        ).map((tool) => (
          <div
            key={tool.label}
            className={cn(panel, "flex flex-col items-center gap-1.5 p-2.5")}
          >
            <Icon
              name={tool.icon}
              variant="duotone"
              className="size-5 text-citron-ink"
            />
            <span className="text-[10px] text-ink-muted">{tool.label}</span>
          </div>
        ))}
      </div>
    </Scene>
  );
}

export function TeamsGraphic() {
  return (
    <Scene>
      <div className="mx-auto flex w-fit items-center gap-2.5 rounded-xl border border-ink bg-ink px-4 py-3 text-white shadow-[0_8px_20px_-12px_rgb(18_24_38/0.5)]">
        <Mark icon="team" dark />
        <div>
          <p className="text-[12px]">Coordinator</p>
          <p className="mt-0.5 text-[10px] text-dark-muted">
            Delegate · combine
          </p>
        </div>
      </div>
      <div className="relative grid grid-cols-3 gap-2 pt-8">
        <span className="absolute top-0 left-1/2 h-4 w-px bg-control-line" />
        <span className="absolute top-4 right-[16.67%] left-[16.67%] h-4 rounded-t-lg border-x border-t border-control-line" />
        <span className="absolute top-4 left-1/2 h-4 w-px bg-citron" />
        {(
          [
            { name: "Research", role: "Find evidence", icon: "search" },
            { name: "Draft", role: "Write a reply", icon: "note" },
            { name: "Review", role: "Check the work", icon: "shieldCheck" },
          ] satisfies { name: string; role: string; icon: IconName }[]
        ).map((agent) => (
          <div
            key={agent.name}
            className={cn(
              panel,
              "flex min-w-0 flex-col items-center px-1.5 py-3 text-center",
            )}
          >
            <Mark icon={agent.icon} />
            <p className="mt-2 text-[11px] font-medium">{agent.name}</p>
            <p className="mt-1 text-[10px] leading-4 text-ink-muted">
              {agent.role}
            </p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-[10px] text-ink-muted">
        <Icon name="layers" className="size-3.5" />
        Specialist results → shared response
      </div>
    </Scene>
  );
}

export function WorkflowGraphic() {
  return (
    <Scene>
      <div className="mb-4 flex items-center gap-2">
        <Icon
          name="workflow"
          variant="duotone"
          className="size-4 text-citron-ink"
        />
        <span className={cn(label, "text-ink-muted")}>
          A workflow with a review loop
        </span>
      </div>
      <div className="flex items-center gap-2">
        {(
          [
            { name: "Retrieve", icon: "search" },
            { name: "Draft", icon: "note" },
          ] satisfies { name: string; icon: IconName }[]
        ).map((step, i) => (
          <div
            key={step.name}
            className={cn(
              panel,
              "relative flex min-w-0 flex-1 items-center gap-2 px-2.5 py-3",
              i === 0 && "after:absolute after:top-1/2 after:left-full after:w-2 after:border-t after:border-control-line",
            )}
          >
            <Icon
              name={step.icon}
              variant="duotone"
              className="size-4 shrink-0 text-citron-ink"
            />
            <span className="text-[11px]">{step.name}</span>
            <span className="ml-auto font-mono text-[9px] text-ink-muted">
              0{i + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="mr-[24%] ml-[24%] h-6 rounded-br-xl border-r border-b border-control-line" />
      <div className="mx-auto flex w-[72%] items-center gap-3 rounded-xl border border-ink bg-ink px-4 py-3 text-white">
        <Mark icon="shieldCheck" dark />
        <div>
          <p className="text-[12px]">Review the draft</p>
          <p className="mt-0.5 text-[10px] text-dark-muted">
            Branch on the result
          </p>
        </div>
      </div>
      <div className="relative grid grid-cols-2 gap-5 pt-7">
        <span className="absolute top-0 left-1/2 h-3 w-px bg-control-line" />
        <span className="absolute top-3 right-1/4 left-1/4 h-4 rounded-t-lg border-x border-t border-control-line" />
        <div className={cn(panel, "p-2.5")}>
          <p className="mb-1 text-[9px] text-ink-muted">CHANGES NEEDED</p>
          <p className="flex items-center gap-2 text-[11px]">
            <Icon name="replay" className="size-3.5 text-citron-ink" />
            Revise & review
          </p>
        </div>
        <div className="rounded-xl border border-citron/25 bg-citron/8 p-2.5">
          <p className="mb-1 text-[9px] text-ink-muted">ACCEPTED</p>
          <p className="flex items-center gap-2 text-[11px]">
            <Icon
              name="checkCircle"
              variant="duotone"
              className="size-3.5 text-citron-ink"
            />
            Return the result
          </p>
        </div>
      </div>
    </Scene>
  );
}

export function KnowledgeGraphic() {
  return (
    <Scene>
      <div className={cn(panel, "flex items-center gap-2.5 px-3 py-3")}>
        <Icon name="search" className="size-4 shrink-0 text-citron-ink" />
        <p className="text-[12px] leading-5">What is our return window?</p>
      </div>
      <Connector text="Retrieve relevant passages" />
      <div className="relative mr-2 mb-2">
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl border border-line bg-surface/70" />
        <div className={cn(panel, "relative p-3")}>
          <div className="flex items-center gap-2">
            <Mark icon="file" />
            <div>
              <p className="font-mono text-[11px]">returns-policy.md</p>
              <p className="text-[10px] text-ink-muted">
                Section 3 · Return eligibility
              </p>
            </div>
          </div>
          <p className="mt-3 border-l-2 border-citron/60 pl-3 text-[12px] leading-6 text-ink-muted">
            Items may be returned within{" "}
            <span className="rounded bg-citron/10 px-1 text-citron-ink">
              30 days of delivery.
            </span>
          </p>
          <div className="mt-3 flex items-center gap-2 border-t border-line pt-2.5 text-[10px] text-ink-muted">
            <Icon
              name="bookOpen"
              variant="duotone"
              className="size-3.5 text-citron-ink"
            />
            Source context for the agent
          </div>
        </div>
      </div>
    </Scene>
  );
}

export function HarnessGraphic() {
  const files: {
    name: string;
    description: string;
    icon: IconName;
    nested?: boolean;
  }[] = [
    { name: "AGENTS.md", description: "Instructions", icon: "file" },
    { name: "skills/", description: "Reusable skills", icon: "folder" },
    {
      name: "SKILL.md",
      description: "Task guidance",
      icon: "file",
      nested: true,
    },
    { name: "MEMORY.md", description: "Persistent context", icon: "note" },
    { name: "workspace/", description: "Working files", icon: "folder" },
  ];
  return (
    <Scene>
      <div className={cn(panel, "overflow-hidden")}>
        <div className="flex items-center gap-2 border-b border-line bg-surface-muted/30 px-3 py-2.5">
          <Icon
            name="folder"
            variant="duotone"
            className="size-4 text-citron-ink"
          />
          <span className="font-mono text-[11px]">agent-workspace/</span>
          <Icon name="code" className="ml-auto size-3.5 text-ink-muted" />
        </div>
        <div className="space-y-0.5 p-2">
          {files.map((file) => (
            <div
              key={file.name}
              className={cn(
                "flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5",
                file.nested && "ml-3 border-l border-line",
                file.name === "AGENTS.md" && "bg-citron/8",
              )}
            >
              <Icon
                name={file.icon}
                variant="duotone"
                className="size-3.5 shrink-0 text-citron-ink"
              />
              <span className="font-mono text-[10px] leading-5">
                {file.name}
              </span>
              <span className="ml-auto text-right text-[10px] leading-4 text-ink-muted">
                {file.description}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-line bg-surface-muted/30 px-3 py-2.5 text-[10px] text-ink-muted">
          <Icon
            name="terminal"
            variant="duotone"
            className="size-3.5 text-citron-ink"
          />
          Tools and context for long-running work
        </div>
      </div>
    </Scene>
  );
}
