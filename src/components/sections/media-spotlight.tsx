import Link from "next/link";
import { home } from "@/content/site";
import { integrationById } from "@/content/integrations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/layout/arrow-link";
import { Artwork } from "@/components/graphics/artwork";
import { IntegrationMark } from "@/components/graphics/integration-mark";
import { MediaDetailGraphic } from "@/components/graphics/media-detail-graphics";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";
import { Icon } from "@/components/graphics/icon";

export function MediaSpotlight() {
  const s = home.media;
  return (
    <section
      id="voice-media"
      aria-labelledby="voice-media-title"
      className="bg-ink py-[56px] text-canvas lg:py-[80px]"
    >
      <Container>
        <div className="grid-main items-center">
          <RevealGroup className="md:col-span-6 lg:col-span-7">
            <RevealItem>
              <Eyebrow tone="dark">{s.eyebrow}</Eyebrow>
            </RevealItem>
            <RevealItem as="h2" id="voice-media-title" className="type-h2 mt-4 max-w-[20ch] text-canvas">
              <span className="block">{s.h2[0]}</span>
              <span className="block">{s.h2[1]}</span>
            </RevealItem>
            <RevealItem as="p" className="type-lead mt-5 max-w-[56ch] text-dark-muted">
              {s.lead}
            </RevealItem>
            <RevealItem className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button asChild variant="citron" className="w-full xs:w-auto">
                <a href={s.primary.href}>
                  <Icon name="mic" className="size-4" />
                  {s.primary.label}
                  <Icon name="arrowUpRight" data-arrow="" className="size-4" />
                </a>
              </Button>
              <Button asChild variant="secondary-dark" className="w-full xs:w-auto">
                <Link href={s.secondary.href}>
                  <Icon name="cube" className="size-4" />
                  {s.secondary.label}
                  <Icon name="arrowRight" data-arrow="" className="size-4" />
                </Link>
              </Button>
            </RevealItem>
          </RevealGroup>
          <Reveal delay={0.12} className="mt-8 md:col-span-6 lg:col-span-5 lg:mt-0">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-dark-surface">
              <div className="relative aspect-[3/2] w-full bg-surface-muted">
                <Artwork
                  id="assembly"
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                  className="absolute inset-0"
                />
              </div>
              <ul className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 px-2 py-5" aria-label="Media capabilities">
                {s.cards.map((card, i) => (
                  <li key={card.icon} className="flex flex-col items-center gap-2 text-dark-muted">
                    <Icon name={card.icon} variant="duotone" className="size-6 text-citron" />
                    <span className="type-small">{["Voice", "Images", "Telephony"][i]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-12 grid gap-6 lg:grid-cols-3">
          {s.cards.map((card) => (
            <RevealItem
              as="li"
              key={card.title}
              className="flex flex-col rounded-[18px] border border-white/10 bg-dark-surface p-7"
            >
              <MediaDetailGraphic kind={card.icon} />
              <h3 className="type-h3 text-canvas">{card.title}</h3>
              <p className="type-body mt-3 flex-1 text-dark-muted">{card.copy}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Example providers">
                {card.providers.map((id) => {
                  const provider = integrationById[id];
                  return (
                    <li key={id} className="inline-flex items-center gap-2 rounded-[8px] bg-surface px-2.5 py-2 text-ink">
                      <IntegrationMark id={id} icon={provider.icon} className="size-4" />
                      <span className="type-small">{provider.name}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <ArrowLink href={card.link.href} tone="dark" external>
                  {card.link.label}
                </ArrowLink>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
