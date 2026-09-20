import { home } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-header";
import { SmartLink } from "@/components/layout/smart-link";
import { AgentSculpture } from "@/components/graphics/agent-sculpture";
import { InstallCopyButton } from "@/components/interactive/install-copy-button";
import { UspMarquee } from "@/components/interactive/usp-marquee";
import { Icon } from "@/components/graphics/icon";
import { Reveal } from "@/components/interactive/reveal";

export function Hero() {
  const h = home.hero;
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-canvas"
    >
      {/* Soft blue wash in the top-right corner, fading into the canvas. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_55%_at_82%_-10%,rgb(47_107_255/0.16),transparent_70%)]"
      />
      {/* Hairline grid, masked so it only shows near the top of the section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px] bg-[linear-gradient(to_right,rgb(18_24_38/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(18_24_38/0.04)_1px,transparent_1px)] bg-size-[56px_56px] mask-[linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <Container className="pt-12 pb-10 lg:pt-[72px] lg:pb-[56px]">
        <div className="grid-main items-center lg:min-h-[560px]">
          <div className="md:col-span-6 lg:col-span-6">
            <Eyebrow className="motion-safe:animate-hero-in rounded-full border border-line bg-surface/80 py-1.5 pr-3.5 pl-3 shadow-[0_1px_2px_rgb(32_37_33/0.04)] backdrop-blur-sm">
              {h.eyebrow}
            </Eyebrow>

            <Reveal
              as="h1"
              id="hero-title"
              delay={0.06}
              className="type-hero mt-5 text-ink"
            >
              {h.h1.map((line) => (
                <span key={line} className="block lg:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </Reveal>

            <p className="type-lead motion-safe:animate-hero-in mt-6 max-w-[42ch] text-ink-muted motion-safe:[animation-delay:120ms]">
              {h.lead}
            </p>

            <div className="motion-safe:animate-hero-in mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap motion-safe:[animation-delay:180ms]">
              <Button
                asChild
                size="hero"
                className="w-full shadow-[0_10px_24px_-14px_rgb(32_37_33/0.55)] xs:w-auto"
              >
                <a href={h.primary.href} data-track="cta_click" data-track-cta-id="hero_primary" data-track-location="hero">
                  <Icon name="code" className="size-4" />
                  {h.primary.label}
                  <Icon name="arrowRight" data-arrow="" className="size-4" />
                </a>
              </Button>
              <Button asChild size="hero" variant="secondary" className="w-full xs:w-auto">
                <SmartLink href={h.secondary.href} data-track="cta_click" data-track-cta-id="hero_secondary" data-track-location="hero">
                  <Icon name="layers" className="size-4" />
                  {h.secondary.label}
                  <Icon name="arrowRight" data-arrow="" className="size-4" />
                </SmartLink>
              </Button>
            </div>

            <div className="motion-safe:animate-hero-in mt-8 max-w-[440px] motion-safe:[animation-delay:240ms]">
              <div className="group/install flex h-12 items-center justify-between gap-2 rounded-[10px] border border-line bg-surface pl-4 pr-1 shadow-[inset_0_1px_0_rgb(255_255_255),0_1px_2px_rgb(32_37_33/0.05)] transition-colors duration-160 ease-(--ease-state) hover:border-control-line focus-within:border-control-line">
                <code className="type-code truncate bg-transparent! p-0! text-[13px]! text-ink">
                  <span className="text-citron-ink select-none" aria-hidden="true">
                    ${" "}
                  </span>
                  {h.install}
                </code>
                <InstallCopyButton text={h.install} location="hero" />
              </div>
              <p className="type-small mt-2.5 text-ink-muted">{h.helper}</p>
            </div>
          </div>

          <div className="mt-12 md:col-span-6 lg:col-span-6 lg:mt-0">
            {/* The engine sits straight on the canvas: no frame, its own ground shadow. */}
            <div className="motion-safe:animate-hero-in relative motion-safe:[animation-delay:120ms]">
              <AgentSculpture className="mx-auto h-auto w-full max-w-[560px] lg:max-w-none" />
            </div>
          </div>
        </div>

        <UspMarquee
          items={h.usps}
          className="motion-safe:animate-fade-once mt-10 motion-safe:[animation-delay:320ms] lg:mt-12"
        />
      </Container>
    </section>
  );
}