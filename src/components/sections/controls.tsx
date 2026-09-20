import { home } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/layout/arrow-link";
import { Icon, type IconName } from "@/components/graphics/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

export function Controls() {
  const c = home.controls;
  return (
    <section id="controls" aria-labelledby="controls-title" className="section-y bg-surface">
      <Container>
        <SectionHeader id="controls-title" eyebrow={c.eyebrow} title={c.h2} lead={c.lead} />

        <RevealGroup as="ul" className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.items.map((item) => (
            <RevealItem as="li" key={item.heading} className="flex flex-col border-t border-line pt-6">
              <span className="inline-flex size-10 items-center justify-center rounded-[10px] bg-surface-muted text-ink">
                <Icon name={item.icon as IconName} variant="bulk" className="size-5" />
              </span>
              <h3 className="mt-4 text-[20px] leading-[1.3] font-medium tracking-[-0.015em] text-ink">
                {item.heading}
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-[1.65] text-ink-muted">{item.copy}</p>
              <div className="mt-4">
                <ArrowLink href={item.href} external>
                  Read more
                </ArrowLink>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="figure" className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-center">
          <ol
            className="rounded-[18px] border border-line bg-canvas p-5 font-mono text-[12px] leading-5 text-ink lg:col-span-7"
            aria-label="Example lifecycle events"
          >
            {c.events.items.map((e, i) => (
              <li
                key={e.name}
                className="flex items-baseline gap-4 border-b border-line py-2.5 last:border-b-0"
              >
                <span className="w-6 shrink-0 text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-[124px] font-medium text-citron-ink">{e.name}</span>
                <span className="text-ink-muted">{e.detail}</span>
              </li>
            ))}
          </ol>
          <figcaption className="type-body text-ink-muted lg:col-span-4 lg:col-start-9">
            {c.events.caption}{" "}
            <a href={c.events.href} className="arrow-shift link-underline inline-flex items-center gap-1.5 text-ink">
              See run events
              <Icon name="arrowUpRight" data-arrow="" className="size-4" />
            </a>
            .
          </figcaption>
        </Reveal>
      </Container>
    </section>
  );
}
