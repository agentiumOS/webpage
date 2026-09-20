import { home } from "@/content/site";
import { homeSamples } from "@/content/snippets";
import { highlight } from "@/lib/highlight";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/layout/arrow-link";
import { CodeTabs, type HighlightedSample } from "@/components/interactive/code-tabs";
import { Reveal } from "@/components/interactive/reveal";

export async function Code() {
  const c = home.code;
  const samples: HighlightedSample[] = await Promise.all(
    homeSamples.map(async (s) => ({
      id: s.id,
      label: s.label,
      filename: s.filename,
      code: s.code,
      html: await highlight(s.code),
      install: s.install,
      env: s.env,
      note: s.note,
      docsUrl: s.docsUrl,
    })),
  );

  return (
    <section id="code" aria-labelledby="code-title" className="section-y bg-canvas">
      <Container>
        <div className="grid-main">
          <div className="md:col-span-6 lg:col-span-4">
            <SectionHeader id="code-title" eyebrow={c.eyebrow} title={c.h2} lead={c.lead} />
            <div className="mt-8">
              <ArrowLink href={c.link.href}>{c.link.label}</ArrowLink>
            </div>
          </div>
          <Reveal delay={0.1} className="mt-2 md:col-span-6 lg:col-span-8 lg:mt-0">
            <CodeTabs samples={samples} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
