import { cn } from "cn";
import { home } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { SmartLink } from "@/components/layout/smart-link";
import { Icon, type IconName } from "@/components/graphics/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

const COLS = 3;

export function Stack() {
  const s = home.stack;
  const top = s.modules.slice(0, COLS);
  const bottom = s.modules.slice(COLS);

  return (
    <section id="stack" aria-labelledby="stack-title" className="section-y bg-canvas">
      <Container>
        <SectionHeader
          id="stack-title"
          eyebrow={s.eyebrow}
          title={
            <>
              <span className="block">Everything around the model,</span>
              <span className="block">working together.</span>
            </>
          }
          lead={s.lead}
        />

        <Reveal className="relative mt-10 rounded-[24px] border border-line bg-surface-muted p-4 sm:p-5 lg:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="type-eyebrow text-ink-muted">{s.frameLabel}</p>
            <p className="type-eyebrow text-ink-muted">{s.modules.length} connected parts</p>
          </div>

          <div className="relative max-lg:border-l max-lg:border-citron/70 max-lg:pl-4">
            <RevealGroup delay={0.08} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {top.map((m, i) => (
                <Cell key={m.id} module={m} index={i} />
              ))}
            </RevealGroup>

            <Connector />

            <RevealGroup delay={0.22} className="mt-4 grid gap-4 md:grid-cols-2 lg:mt-0 lg:grid-cols-3">
              {bottom.map((m, i) => (
                <Cell key={m.id} module={m} index={i + COLS} />
              ))}
            </RevealGroup>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-line/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-small text-ink-muted sm:type-body sm:text-ink">{s.footerCopy}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {s.footerLinks.map((l) => (
                <li key={l.label}>
                  <SmartLink
                    href={l.href}
                    className="arrow-shift type-ui inline-flex min-h-10 items-center gap-1.5 text-ink"
                  >
                    {l.label}
                    <Icon name="arrowUpRight" data-arrow="" className="size-3.5 text-ink-muted" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="relative hidden h-11 lg:grid lg:grid-cols-3 lg:gap-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative">
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-citron" />
          <span
            className={cn(
              "absolute top-1/2 h-px -translate-y-1/2 bg-citron",
              i === 0 && "right-0 left-1/2",
              i === 1 && "inset-x-0",
              i === 2 && "right-1/2 left-0",
            )}
          />
          <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-[5px] ring-surface-muted" />
        </div>
      ))}
    </div>
  );
}

function Cell({
  module,
  index,
}: {
  module: (typeof home.stack.modules)[number];
  index: number;
}) {
  return (
    <RevealItem as="article" className="h-full">
      <SmartLink
        href={module.href}
        className={cn(
          "card-hover group/cell flex h-full min-h-[216px] flex-col rounded-[16px] border border-line bg-surface p-5 sm:p-6",
          "transition-[border-color,box-shadow,transform] duration-160 ease-(--ease-state)",
          "motion-safe:active:scale-[0.99] motion-safe:active:duration-100",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#F1F2F4] text-ink transition-colors duration-160 ease-(--ease-state) group-hover/cell:bg-citron group-hover/cell:text-canvas">
            <Icon name={module.icon as IconName} variant="bulk" className="size-5" />
          </span>
          <span className="type-eyebrow text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="type-h3 mt-5 text-ink">{module.title}</h3>
        <p className="type-body mt-2 flex-1 text-ink-muted">{module.copy}</p>
        <span className="arrow-shift type-ui mt-5 inline-flex min-h-6 items-center gap-2 text-ink">
          Open guide
          <Icon
            name="arrowUpRight"
            data-arrow=""
            className="size-3.5 text-ink-muted transition-colors duration-160 ease-(--ease-state) group-hover/cell:text-ink"
          />
        </span>
      </SmartLink>
    </RevealItem>
  );
}
