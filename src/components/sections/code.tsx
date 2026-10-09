import { home } from "@/content/site";
import { homeSamples } from "@/content/snippets";
import { highlight } from "@/lib/highlight";
import { Container } from "@/components/layout/container";
import { CodeTabs, type HighlightedSample } from "@/components/interactive/code-tabs";

export async function Code() {
  const c = home.code;
  const samples: HighlightedSample[] = await Promise.all(
    homeSamples.map(async (s) => ({
      id: s.id,
      label: s.label,
      filename: s.filename,
      code: s.code,
      html: await highlight(s.code),
      docsUrl: s.docsUrl,
      heading: s.heading ?? [c.h2],
      description: s.description ?? c.lead,
    })),
  );

  return (
    <section id="code" aria-labelledby="code-title" className="section-y bg-canvas">
      <Container>
        <CodeTabs samples={samples} eyebrow={c.eyebrow} />
      </Container>
    </section>
  );
}
