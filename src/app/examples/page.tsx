import type { Metadata } from "next";
import { examplesPage } from "@/content/site";
import { exampleRecipes } from "@/content/examples";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Icon, type IconName } from "@/components/graphics/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { routeManifest } from "@/content/route-manifest";
import { breadcrumb, collectionPage, globalGraph, itemList, listRef } from "@/lib/structured-data";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

const recipeIcons: Record<string, IconName> = {
  support: "note",
  research: "search",
  "jev-decisions": "target",
  tools: "wrench",
  skills: "folder",
  "voice-browser": "audio",
  approval: "shieldCheck",
};

const route = routeManifest["/examples"];

export const metadata: Metadata = {
  title: { absolute: route.title },
  description: route.description,
  alternates: { canonical: "/examples" },
  openGraph: {
    title: route.title,
    description: route.description,
    url: "/examples",
  },
};

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
      {tags.map((t) => (
        <li
          key={t}
          className="inline-flex h-6 items-center rounded-full border border-line bg-surface-muted px-2.5 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function ExamplesPage() {
  const p = examplesPage;
  return (
    <>
      <JsonLd
        graph={[
          ...globalGraph(),
          itemList(
            "/examples",
            "Agentium example recipes",
            exampleRecipes.map((r) => ({ name: r.title, url: r.links[0].href, description: r.description })),
          ),
          collectionPage({ path: "/examples", mainEntity: listRef("/examples") }),
          breadcrumb("/examples"),
        ]}
      />
      <section id="examples-intro" aria-labelledby="examples-h1" className="bg-canvas">
        <Container className="pt-12 pb-10 lg:pt-[72px] lg:pb-12">
          <RevealGroup>
            <RevealItem as="h1" id="examples-h1" className="type-h1-sub max-w-[18ch] text-ink">
              {p.h1}
            </RevealItem>
            <RevealItem as="p" className="type-lead mt-5 max-w-[58ch] text-ink-muted">
              {p.lead}
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      <section id="recipes" aria-label="Recipes" className="bg-canvas pb-16 lg:pb-20">
        <Container>
          <Reveal as="p" className="type-small border-t border-line pt-4 text-ink-muted">
            {p.note}{" "}
            <a
              href={p.repo.href}
              className="link-underline text-ink"
              data-track="cta_click"
              data-track-cta-id="examples_github_repo"
            >
              {p.repo.label}
            </a>
            .
          </Reveal>
          <RevealGroup as="ul" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exampleRecipes.map((r) => {
              const single = r.links.length === 1;
              const inner = (
                <>
                  <span className="mb-4 inline-flex size-10 items-center justify-center rounded-[10px] bg-surface-muted text-ink">
                    <Icon name={recipeIcons[r.anchor] ?? "sparkle"} variant="bulk" className="size-5" />
                  </span>
                  <Tags tags={r.tags} />
                  <h2 className="type-h3 mt-4 text-ink">{r.title}</h2>
                  <p className="type-body mt-2 flex-1 text-ink-muted">{r.description}</p>
                </>
              );
              return (
                <RevealItem as="li" key={r.anchor} id={r.anchor} className="scroll-mt-24">
                  {single ? (
                    <a
                      href={r.links[0].href}
                      data-track="example_open"
                      data-track-example-id={r.anchor}
                      data-track-link-text={r.links[0].label}
                      className="card-hover arrow-shift flex h-full min-h-[220px] flex-col rounded-[18px] border border-line bg-surface p-6"
                    >
                      {inner}
                      <span className="type-ui mt-5 inline-flex items-center gap-2 text-ink">
                        {r.links[0].label}
                        <Icon name="arrowRight" data-arrow="" className="size-4" />
                      </span>
                    </a>
                  ) : (
                    <div className="card-hover flex h-full min-h-[220px] flex-col rounded-[18px] border border-line bg-surface p-6">
                      {inner}
                      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                        {r.links.map((l) => (
                          <li key={l.href}>
                            <a
                              href={l.href}
                              data-track="example_open"
                              data-track-example-id={r.anchor}
                              data-track-link-text={l.label}
                              className="arrow-shift link-underline type-ui inline-flex min-h-11 items-center gap-2 text-ink"
                            >
                              {l.label}
                              <Icon name="arrowUpRight" data-arrow="" className="size-4" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section id="examples-final" aria-labelledby="examples-cta" className="section-y bg-canvas pt-0!">
        <Container>
          <Reveal className="rounded-[24px] border border-line bg-surface-muted p-8 sm:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <RevealGroup className="lg:col-span-8">
                <RevealItem as="h2" id="examples-cta" className="type-h2 max-w-[18ch] text-ink">
                  {p.finalCta.heading}
                </RevealItem>
                <RevealItem as="p" className="type-lead mt-4 max-w-[48ch] text-ink-muted">
                  {p.finalCta.body}
                </RevealItem>
              </RevealGroup>
              <Reveal delay={0.12} className="lg:col-span-4 lg:justify-self-end">
                <Button asChild size="hero">
                  <a href={p.finalCta.cta.href} data-track="cta_click" data-track-cta-id="examples_final_primary" data-track-location="final_cta">
                    <Icon name="code" className="size-4" />
                    {p.finalCta.cta.label}
                    <Icon name="arrowRight" data-arrow="" className="size-4" />
                  </a>
                </Button>
              </Reveal>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
