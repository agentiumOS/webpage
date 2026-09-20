import Link from "next/link";
import { home } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/layout/arrow-link";
import { Artwork } from "@/components/graphics/artwork";
import { JevDemo } from "@/components/interactive/jev-demo";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";
import { Icon } from "@/components/graphics/icon";

const jevCardIcons = ["target", "brain", "flask"] as const;

export function JevSpotlight() {
  const j = home.jev;
  return (
    <section
      id="jev"
      aria-labelledby="jev-title"
      className="bg-ink py-[56px] text-canvas lg:py-[80px]"
    >
      <Container>
        <div className="grid-main items-center">
          <RevealGroup className="md:col-span-6 lg:col-span-7">
            <RevealItem>
              <Eyebrow tone="dark">{j.eyebrow}</Eyebrow>
            </RevealItem>
            <RevealItem as="h2" id="jev-title" className="type-h2 mt-4 max-w-[18ch] text-canvas">
              <span className="block">{j.h2[0]}</span>
              <span className="block">{j.h2[1]}</span>
            </RevealItem>
            <RevealItem as="p" className="type-lead mt-5 max-w-[56ch] text-dark-muted">
              {j.lead}
            </RevealItem>
            <RevealItem className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button asChild variant="citron" className="w-full xs:w-auto">
                <Link href={j.primary.href}>
                  <Icon name="target" className="size-4" />
                  {j.primary.label}
                  <Icon name="arrowRight" data-arrow="" className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary-dark" className="w-full xs:w-auto">
                <a href={j.secondary.href}>
                  <Icon name="bookOpen" className="size-4" />
                  {j.secondary.label}
                  <Icon name="arrowUpRight" data-arrow="" className="size-4" />
                </a>
              </Button>
            </RevealItem>
          </RevealGroup>
          <Reveal delay={0.12} className="mt-8 md:col-span-6 lg:col-span-5 lg:mt-0">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[24px] border border-white/10 bg-dark-surface">
              <Artwork
                id="jev"
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                className="absolute inset-0"
              />
            </div>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-12 grid gap-6 lg:grid-cols-3">
          {j.cards.map((card, i) => (
            <RevealItem
              as="li"
              key={card.title}
              className="flex flex-col rounded-[18px] border border-white/10 bg-dark-surface p-7"
            >
              <span className="mb-5 inline-flex size-11 items-center justify-center rounded-[10px] bg-ink text-citron">
                <Icon name={jevCardIcons[i]} variant="bulk" className="size-6" />
              </span>
              <h3 className="type-h3 text-canvas">{card.title}</h3>
              <p className="type-body mt-3 flex-1 text-dark-muted">{card.copy}</p>
              <div className="mt-6">
                <ArrowLink href={card.link.href} tone="dark" external>
                  {card.link.label}
                </ArrowLink>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <JevDemo className="mt-10" />
      </Container>
    </section>
  );
}
