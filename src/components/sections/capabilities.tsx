import { cn } from "cn";
import { home } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { SmartLink } from "@/components/layout/smart-link";
import { Icon, type IconName } from "@/components/graphics/icon";
import {
  HarnessGraphic,
  KnowledgeGraphic,
  MemoryGraphic,
  TeamsGraphic,
  ToolsGraphic,
  WorkflowGraphic,
} from "@/components/graphics/capability-graphics";
import { RevealGroup, RevealItem } from "@/components/interactive/reveal";

type CardKey = keyof typeof home.capabilities.cards;

const layout: {
  key: CardKey;
  label: string;
  icon: IconName;
  span: string;
  minH: string;
  stack?: boolean;
  Graphic: () => React.JSX.Element;
}[] = [
  { key: "memory", label: "Memory", icon: "database", span: "lg:col-span-8", minH: "lg:min-h-[380px]", Graphic: MemoryGraphic },
  { key: "tools", label: "Tools", icon: "wrench", span: "lg:col-span-4", minH: "lg:min-h-[380px]", stack: true, Graphic: ToolsGraphic },
  { key: "teams", label: "Teams", icon: "team", span: "lg:col-span-4", minH: "lg:min-h-[360px]", stack: true, Graphic: TeamsGraphic },
  { key: "workflows", label: "Workflows", icon: "workflow", span: "lg:col-span-8", minH: "lg:min-h-[360px]", Graphic: WorkflowGraphic },
  { key: "knowledge", label: "Knowledge", icon: "bookOpen", span: "lg:col-span-6", minH: "lg:min-h-[340px]", stack: true, Graphic: KnowledgeGraphic },
  { key: "harness", label: "Harness", icon: "folder", span: "lg:col-span-6", minH: "lg:min-h-[340px]", stack: true, Graphic: HarnessGraphic },
];

export function Capabilities() {
  const c = home.capabilities;
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="section-y bg-canvas">
      <Container>
        <SectionHeader id="capabilities-title" eyebrow={c.eyebrow} title={c.h2} lead={c.lead} />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:gap-5">
          {layout.map(({ key, label, icon, span, minH, stack, Graphic }, index) => {
            const card = c.cards[key];
            return (
              <RevealItem key={key} className={cn(span, minH)}>
                <SmartLink
                  href={card.link.href}
                  className={cn(
                    "card-hover group/card relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface",
                    "transition-[border-color,box-shadow,transform] duration-160 ease-(--ease-state)",
                    "motion-safe:active:scale-[0.99] motion-safe:active:duration-100",
                    stack ? "lg:flex-col" : "lg:flex-row",
                  )}
                >
                  <div className={cn("flex flex-col p-6 sm:p-7", stack ? "lg:p-7" : "lg:w-[42%] lg:shrink-0 lg:p-8")}>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-surface-muted text-ink ring-1 ring-line">
                        <Icon name={icon} className="size-4" />
                      </span>
                      <span className="type-eyebrow text-ink-muted">{label}</span>
                      <span className="type-eyebrow ml-auto text-ink-muted/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="type-h3 mt-5 text-ink">{card.title}</h3>
                    <p className="type-body mt-3 text-ink-muted">{card.copy}</p>
                    <p className="arrow-shift type-ui mt-5 inline-flex min-h-11 items-center gap-2 text-ink">
                      {card.link.label}
                      <Icon name="arrowUpRight" data-arrow="" className="size-4 text-ink-muted" />
                    </p>
                  </div>
                  <div
                    className={cn(
                      "relative min-h-[220px] overflow-hidden bg-[#F1F0E8]",
                      stack
                        ? "mx-4 mb-4 rounded-[14px] ring-1 ring-line/80 sm:mx-5 sm:mb-5 lg:mt-auto"
                        : "mx-4 mb-4 rounded-[14px] ring-1 ring-line/80 sm:mx-5 sm:mb-5 lg:mx-0 lg:my-5 lg:mr-5 lg:min-h-0 lg:flex-1",
                    )}
                  >
                    <Graphic />
                  </div>
                </SmartLink>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
