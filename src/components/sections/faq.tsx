import { home } from "@/content/site";
import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/interactive/faq-accordion";
import { Reveal } from "@/components/interactive/reveal";

export function Faq() {
  const f = home.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-canvas">
      <Container>
        <div className="mx-auto max-w-[860px]">
          <Reveal as="h2" id="faq-title" className="type-h2 text-ink">
            {f.h2}
          </Reveal>
          <Reveal delay={0.08}>
            <FaqAccordion items={f.items} className="mt-10" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
