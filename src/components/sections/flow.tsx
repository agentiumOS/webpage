import { home } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ScrollStory } from "@/components/interactive/scroll-story";

export function Flow() {
  const f = home.flow;
  return (
    <section id="flow" aria-labelledby="flow-title" className="section-y bg-surface-muted/60">
      <Container>
        <SectionHeader id="flow-title" eyebrow={f.eyebrow} title={f.h2} lead={f.lead} />
        <ScrollStory />
      </Container>
    </section>
  );
}
