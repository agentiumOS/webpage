import type { Metadata } from "next";
import { Suspense } from "react";
import { integrationsPage } from "@/content/site";
import { categoryLabels, integrations } from "@/content/integrations";
import { Container } from "@/components/layout/container";
import { ArrowLink } from "@/components/layout/arrow-link";
import { IntegrationSearch } from "@/components/interactive/integration-search";
import { Icon, isIconName } from "@/components/graphics/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Explore model providers, tools, storage, and protocols for your Agentium application.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Integrations — Agentium",
    description:
      "Explore model providers, tools, storage, and protocols for your Agentium application.",
    url: "/integrations",
  },
};

/** Static, no-JS fallback: the complete catalog as plain links. */
function StaticCatalog() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((item) => (
        <li key={item.id}>
          <a
            href={item.docsUrl}
            className="card-hover flex min-h-[180px] flex-col rounded-[16px] border border-line bg-surface p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-surface-muted text-ink">
                <Icon name={isIconName(item.icon) ? item.icon : "cube"} variant="bulk" className="size-5" />
              </span>
              <h3 className="type-h3 flex-1 text-ink">{item.name}</h3>
              <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-line bg-surface-muted px-2.5 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
                {categoryLabels[item.category]}
              </span>
            </div>
            <p className="type-body mt-2 flex-1 text-ink-muted">{item.description}</p>
            <span className="type-ui mt-5 inline-flex items-center gap-2 text-ink">
              Open guide
              <Icon name="arrowUpRight" className="size-4" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function IntegrationsPage() {
  const p = integrationsPage;
  return (
    <>
      <section aria-labelledby="integrations-h1" className="bg-canvas">
        <Container className="pt-12 pb-10 lg:pt-[72px] lg:pb-12">
          <RevealGroup>
            <RevealItem as="h1" id="integrations-h1" className="type-h1-sub max-w-[18ch] text-ink">
              {p.h1}
            </RevealItem>
            <RevealItem as="p" className="type-lead mt-5 max-w-[58ch] text-ink-muted">
              {p.lead}
            </RevealItem>
            <RevealItem as="p" className="type-small mt-4 max-w-[62ch] text-ink-muted">
              {p.helper}
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      <section aria-labelledby="catalog-title" className="bg-canvas pb-16 lg:pb-20">
        <Container>
          <Reveal as="h2" id="catalog-title" className="type-h2 text-ink">
            {p.catalogTitle}
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <Suspense fallback={<StaticCatalog />}>
              <IntegrationSearch />
            </Suspense>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="more-title" className="section-y border-t border-line bg-surface">
        <Container>
          <div className="grid-main items-start">
            <RevealGroup className="lg:col-span-6">
              <RevealItem as="h2" id="more-title" className="type-h2 max-w-[18ch] text-ink">
                {p.footer.heading}
              </RevealItem>
              <RevealItem as="p" className="type-lead mt-4 max-w-[48ch] text-ink-muted">
                {p.footer.body}
              </RevealItem>
            </RevealGroup>
            <RevealGroup as="ul" className="flex flex-col gap-2 lg:col-span-5 lg:col-start-8">
              {p.footer.links.map((l) => (
                <RevealItem as="li" key={l.label} className="border-t border-line pt-2 last:border-b last:pb-2">
                  <ArrowLink href={l.href} external className="w-full justify-between py-2">
                    {l.label}
                  </ArrowLink>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>
    </>
  );
}
