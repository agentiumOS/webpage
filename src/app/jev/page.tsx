import type { Metadata } from "next";
import Link from "next/link";
import { jevPage } from "@/content/site";
import { decisionAgent, jevToolkitAgent } from "@/content/snippets";
import { highlight } from "@/lib/highlight";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/layout/arrow-link";
import { Artwork } from "@/components/graphics/artwork";
import { CodePanel } from "@/components/interactive/code-panel";
import { FaqAccordion } from "@/components/interactive/faq-accordion";
import { Icon } from "@/components/graphics/icon";
import {
  DecisionAgentGraphic,
  JudgeGraphic,
  ToolAgentGraphic,
} from "@/components/graphics/jev-way-graphics";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

export const metadata: Metadata = {
  title: { absolute: "Jev + Agentium — Put decisions to work" },
  description:
    "Use Jev for typed decisions, judgment tools, and evaluation inside your Agentium application.",
  alternates: { canonical: "/jev" },
  openGraph: {
    title: "Jev + Agentium — Put decisions to work",
    description:
      "Use Jev for typed decisions, judgment tools, and evaluation inside your Agentium application.",
    url: "/jev",
  },
};

export default async function JevPage() {
  const p = jevPage;
  const [decisionHtml, toolkitHtml] = await Promise.all([
    highlight(decisionAgent.code),
    highlight(jevToolkitAgent.code),
  ]);

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="jev-hero-title" className="bg-ink text-canvas">
        <Container className="pt-12 pb-12 lg:pt-[72px] lg:pb-[64px]">
          <div className="grid-main items-center">
            <RevealGroup className="md:col-span-6 lg:col-span-7">
              <RevealItem>
                <Eyebrow tone="dark">{p.hero.eyebrow}</Eyebrow>
              </RevealItem>
              <RevealItem as="h1" id="jev-hero-title" className="type-h1-sub mt-4 max-w-[20ch] text-canvas">
                {p.hero.h1}
              </RevealItem>
              <RevealItem as="p" className="type-lead mt-6 max-w-[48ch] text-dark-muted">
                {p.hero.lead}
              </RevealItem>
              <RevealItem className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <Button asChild variant="citron" size="hero" className="w-full xs:w-auto">
                  <a href={p.hero.primary.href}>
                    <Icon name="target" className="size-4" />
                    {p.hero.primary.label}
                    <Icon name="arrowRight" data-arrow="" className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary-dark" size="hero" className="w-full xs:w-auto">
                  <a href={p.hero.secondary.href}>
                    <Icon name="layers" className="size-4" />
                    {p.hero.secondary.label}
                    <Icon name="arrowRight" data-arrow="" className="size-4" />
                  </a>
                </Button>
              </RevealItem>
            </RevealGroup>
            <Reveal delay={0.12} className="mt-8 md:col-span-6 lg:col-span-5 lg:mt-0">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[24px] border border-white/10 bg-dark-surface">
                <Artwork
                  id="jev"
                  priority
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                  className="absolute inset-0"
                />
              </div>
            </Reveal>
          </div>
        </Container>
        <div className="border-t border-white/10">
          <Container className="py-5">
            <p className="font-mono text-[12px] leading-5 tracking-[0.04em] text-dark-muted sm:text-[13px]">
              {p.hero.strip}
            </p>
          </Container>
        </div>
      </section>

      {/* Three ways */}
      <section id="ways" aria-labelledby="ways-title" className="section-y bg-canvas">
        <Container>
          <Reveal as="h2" id="ways-title" className="type-h2 max-w-[18ch] text-ink">
            {p.ways.heading}
          </Reveal>
          <ol className="mt-10 flex flex-col divide-y divide-line border-y border-line">
            {p.ways.items.map((item, i) => (
              <li key={item.id} id={item.id} className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-6 lg:py-16">
                <RevealGroup className="lg:col-span-5">
                  <RevealItem>
                    <p className="font-mono text-[12px] tracking-[0.08em] text-citron-ink">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </RevealItem>
                  <RevealItem
                    as="h3"
                    className="font-display mt-4 text-[28px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px] lg:text-[36px]"
                  >
                    {item.title}
                  </RevealItem>
                  <RevealItem as="p" className="type-lead mt-4 max-w-[46ch] text-ink-muted">
                    {item.copy}
                  </RevealItem>
                  <RevealItem className="mt-6">
                    <ArrowLink href={item.cta.href} external>
                      {item.cta.label}
                    </ArrowLink>
                  </RevealItem>
                </RevealGroup>
                <Reveal delay={0.1} className="flex flex-col gap-6 lg:col-span-7">
                  {i === 0 && (
                    <>
                      <DecisionAgentGraphic />
                      <CodePanel
                        filename={decisionAgent.filename}
                        code={decisionAgent.code}
                        html={decisionHtml}
                        install={decisionAgent.install}
                        env={decisionAgent.env}
                        note={decisionAgent.note}
                        docsUrl={decisionAgent.docsUrl}
                      />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <ToolAgentGraphic />
                      <CodePanel
                        filename={jevToolkitAgent.filename}
                        code={jevToolkitAgent.code}
                        html={toolkitHtml}
                        install={jevToolkitAgent.install}
                        env={jevToolkitAgent.env}
                        note={jevToolkitAgent.note}
                        docsUrl={jevToolkitAgent.docsUrl}
                      />
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <JudgeGraphic />
                      <p className="type-body text-ink-muted">
                        The runnable recipe lives in the docs.{" "}
                        <a href={item.cta.href} className="arrow-shift link-underline inline-flex items-center gap-1.5 text-ink">
                          Open the Jev evaluation guide
                          <Icon name="arrowUpRight" data-arrow="" className="size-4" />
                        </a>
                        .
                      </p>
                    </>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Value */}
      <section aria-labelledby="value-title" className="section-y bg-surface">
        <Container>
          <div className="grid-main">
            <RevealGroup className="lg:col-span-5">
              <RevealItem as="h2" id="value-title" className="type-h2 max-w-[18ch] text-ink">
                {p.value.heading}
              </RevealItem>
              <RevealItem as="p" className="type-lead mt-6 max-w-[40ch] text-ink-muted">
                {p.value.supporting}
              </RevealItem>
            </RevealGroup>
            <RevealGroup as="ul" className="mt-4 grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:mt-0">
              {p.value.items.map((item) => (
                <RevealItem as="li" key={item.title} className="border-t border-line pt-5">
                  <h3 className="text-[20px] leading-[1.3] font-medium tracking-[-0.015em] text-ink">
                    {item.title}
                  </h3>
                  <p className="type-body mt-2 text-ink-muted">{item.copy}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* Technical details */}
      <section aria-labelledby="details-title" className="section-y bg-canvas">
        <Container>
          <div className="mx-auto max-w-[860px]">
            <Reveal as="h2" id="details-title" className="type-h2 text-ink">
              {p.details.heading}
            </Reveal>
            <Reveal delay={0.08}>
              <FaqAccordion items={p.details.items} className="mt-10" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="jev-cta-title" className="section-y bg-canvas pt-0!">
        <Container>
          <Reveal className="rounded-[24px] bg-ink p-8 text-canvas sm:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <RevealGroup className="lg:col-span-7">
                <RevealItem as="h2" id="jev-cta-title" className="type-h2 max-w-[18ch] text-canvas">
                  {p.finalCta.heading}
                </RevealItem>
                <RevealItem as="p" className="type-lead mt-4 max-w-[40ch] text-dark-muted">
                  {p.finalCta.body}
                </RevealItem>
              </RevealGroup>
              <Reveal delay={0.12} className="flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:col-span-5 lg:justify-end">
                <Button asChild variant="citron" className="w-full xs:w-auto">
                  <a href={p.finalCta.primary.href}>
                    <Icon name="bookOpen" className="size-4" />
                    {p.finalCta.primary.label}
                    <Icon name="arrowRight" data-arrow="" className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary-dark" className="w-full xs:w-auto">
                  <Link href={p.finalCta.secondary.href}>
                    <Icon name="layers" className="size-4" />
                    {p.finalCta.secondary.label}
                  </Link>
                </Button>
              </Reveal>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
