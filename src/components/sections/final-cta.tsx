import Link from "next/link";
import { home } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Artwork } from "@/components/graphics/artwork";
import { Icon } from "@/components/graphics/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

export function FinalCta() {
  const c = home.finalCta;
  return (
    <section id="start" aria-labelledby="start-title" className="section-y bg-canvas pt-0!">
      <Container>
        <Reveal className="overflow-hidden rounded-[24px] border border-line bg-surface-muted">
          <div className="grid lg:grid-cols-12 lg:items-center">
            <RevealGroup delay={0.1} className="p-8 sm:p-12 lg:col-span-6 lg:p-16">
              <RevealItem as="h2" id="start-title" className="type-h2 max-w-[18ch] text-ink">
                <span className="block">{c.h2[0]}</span>
                <span className="block">{c.h2[1]}</span>
              </RevealItem>
              <RevealItem as="p" className="type-lead mt-5 max-w-[40ch] text-ink-muted">
                {c.body}
              </RevealItem>
              <RevealItem className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <Button asChild className="w-full xs:w-auto">
                  <a href={c.primary.href}>
                    <Icon name="bookOpen" className="size-4" />
                    {c.primary.label}
                    <Icon name="arrowRight" data-arrow="" className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary" className="w-full xs:w-auto">
                  <Link href={c.secondary.href}>
                    <Icon name="sparkle" className="size-4" />
                    {c.secondary.label}
                    <Icon name="arrowRight" data-arrow="" className="size-4" />
                  </Link>
                </Button>
              </RevealItem>
            </RevealGroup>
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/9] w-full lg:min-h-[360px]">
                <Artwork
                  id="assembly"
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
