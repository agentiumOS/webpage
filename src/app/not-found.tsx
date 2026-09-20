import Link from "next/link";
import { notFound } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Icon } from "@/components/graphics/icon";
import { RevealGroup, RevealItem } from "@/components/interactive/reveal";

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="section-y-lg bg-canvas">
      <Container className="max-w-[720px]!">
        <RevealGroup>
          <RevealItem>
            <p className="font-mono text-[12px] tracking-[0.08em] text-citron-ink">404</p>
          </RevealItem>
          <RevealItem as="h1" id="nf-title" className="type-h1-sub mt-4 text-ink">
            {notFound.h1}
          </RevealItem>
          <RevealItem as="p" className="type-lead mt-5 text-ink-muted">
            {notFound.body}
          </RevealItem>
          <RevealItem className="mt-8 flex flex-col gap-3 xs:flex-row">
          <Button asChild className="w-full xs:w-auto">
            <Link href={notFound.home.href}>
              <Icon name="home" className="size-4" />
              {notFound.home.label}
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full xs:w-auto">
            <a href={notFound.docs.href}>
              <Icon name="bookOpen" className="size-4" />
              {notFound.docs.label}
            </a>
          </Button>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
