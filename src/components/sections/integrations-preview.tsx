import Link from "next/link";
import { home } from "@/content/site";
import { integrationById } from "@/content/integrations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon, isIconName, type IconName } from "@/components/graphics/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

const groupIcons: Record<string, IconName> = {
  Models: "brain",
  Services: "api",
  "Storage & protocols": "database",
};

export function IntegrationsPreview() {
  const s = home.integrations;
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="section-y bg-canvas">
      <Container>
        <SectionHeader id="integrations-title" eyebrow={s.eyebrow} title={s.h2} lead={s.lead} />

        <RevealGroup className="mt-10 flex flex-col divide-y divide-line border-y border-line">
          {s.groups.map((group) => (
            <RevealItem key={group.label} className="grid gap-3 py-5 md:grid-cols-12 md:items-center">
              <h3 className="type-eyebrow flex items-center gap-2.5 text-ink-muted md:col-span-3">
                <Icon name={groupIcons[group.label] ?? "cube"} variant="bulk" className="size-5 text-ink" />
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2 md:col-span-9">
                {group.ids.map((id) => {
                  const item = integrationById[id];
                  if (!item) return null;
                  return (
                    <li key={id}>
                      <a
                        href={item.docsUrl}
                        className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-line bg-surface px-4 py-3 type-ui text-ink transition-colors duration-[160ms] ease-[var(--ease-state)] hover:border-control-line hover:bg-surface-muted"
                      >
                        <Icon name={isIconName(item.icon) ? item.icon : "cube"} className="size-4" />
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild>
            <Link href={s.cta.href}>
              <Icon name="cube" className="size-4" />
              {s.cta.label}
              <Icon name="arrowRight" data-arrow="" className="size-4" />
            </Link>
          </Button>
          <p className="type-small text-ink-muted">{s.supporting}</p>
        </Reveal>
      </Container>
    </section>
  );
}
