import Link from "next/link";
import { home } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon } from "@/components/graphics/icon";
import {
  ResearchGraphic,
  SupportGraphic,
  VoiceBrowserGraphic,
} from "@/components/graphics/example-graphics";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

const graphics = {
  support: SupportGraphic,
  research: ResearchGraphic,
  "voice-browser": VoiceBrowserGraphic,
} as const;

export function ExamplesPreview() {
  const e = home.examples;
  return (
    <section id="examples" aria-labelledby="examples-title" className="section-y bg-canvas">
      <Container>
        <SectionHeader id="examples-title" eyebrow={e.eyebrow} title={e.h2} lead={e.lead} />
        <RevealGroup as="ul" className="mt-10 grid gap-6 md:grid-cols-3">
          {e.cards.map((card) => {
            const Graphic = graphics[card.id as keyof typeof graphics];
            return (
              <RevealItem as="li" key={card.id}>
                <Link
                  href={card.href}
                  className="card-hover arrow-shift group/ex flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-surface"
                >
                  <div className="aspect-[4/3] w-full border-b border-line">
                    <Graphic />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="type-h3 text-ink">{card.title}</h3>
                    <p className="type-body mt-2 flex-1 text-ink-muted">{card.copy}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Capabilities">
                      {card.tags.map((t) => (
                        <li
                          key={t}
                          className="inline-flex h-6 items-center rounded-full border border-line px-2.5 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <span className="type-ui mt-5 inline-flex items-center gap-2 text-ink">
                      See the pattern
                      <Icon name="arrowRight" data-arrow="" className="size-4" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal className="mt-10">
          <Button asChild variant="secondary">
            <Link href={e.cta.href}>
              <Icon name="sparkle" className="size-4" />
              {e.cta.label}
              <Icon name="arrowRight" data-arrow="" className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
