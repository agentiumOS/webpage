import { home } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-header";
import { SmartLink } from "@/components/layout/smart-link";
import { Artwork } from "@/components/graphics/artwork";
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
          <div className="md:col-span-6 lg:col-span-7">
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

          <div className="mt-12 md:col-span-6 lg:col-span-5 lg:mt-0">
            <figure className="motion-safe:animate-hero-in relative motion-safe:[animation-delay:120ms]">
              {/* Halo behind the panel so it lifts off the canvas. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-[radial-gradient(55%_55%_at_65%_35%,rgb(47_107_255/0.22),transparent_72%)] blur-2xl"
              />

              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[24px] border border-line bg-surface-muted shadow-[0_32px_64px_-40px_rgb(18_24_38/0.38),0_1px_0_rgb(255_255_255/0.8)_inset] lg:min-h-[440px]">
                <Artwork
                  id="stack"
                  priority
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                  className="absolute inset-0 scale-[1.14]"
                />

                {/* Dot grid, visible only toward the edges so the sculpture stays clean. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(32_37_33/0.12)_1px,transparent_1.2px)] bg-size-[18px_18px] mask-[radial-gradient(62%_62%_at_50%_50%,transparent_40%,black_100%)]"
                />
                {/* Ground vignette. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-surface-muted/80 to-transparent"
                />

                {/* Package badge. */}
                <div className="absolute top-4 left-4 inline-flex h-8 items-center gap-2 rounded-full border border-line/80 bg-surface/85 px-3 font-mono text-[11px] leading-none tracking-[0.04em] text-ink shadow-[0_1px_2px_rgb(32_37_33/0.06)] backdrop-blur-sm">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-citron-ink" />
                  {h.artBadge}
                </div>

                {/* Corner ticks, like a blueprint frame. */}
                <CornerTicks />
              </div>

              {/* Labels follow the sculpture's loop: the rule fills during its phase. */}
              <figcaption className="mt-5 grid grid-cols-3 gap-3">
                {h.artLabels.map((label, i) => (
                  <span key={label} className="flex flex-col gap-2.5">
                    <span aria-hidden="true" className="relative h-px w-full bg-line">
                      <span className={`stack-rule stack-rule-${i} absolute inset-0 bg-citron-ink`} />
                    </span>
                    <span
                      className={`stack-text-${i} flex items-baseline gap-2 font-mono text-[11px] leading-[18px] tracking-[0.06em] text-ink uppercase`}
                    >
                      <span className="text-citron-ink">{String(i + 1).padStart(2, "0")}</span>
                      {label}
                    </span>
                  </span>
                ))}
              </figcaption>
            </figure>
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

function CornerTicks() {
  const corners = [
    "top-3 left-3 border-t border-l",
    "top-3 right-3 border-t border-r",
    "bottom-3 left-3 border-b border-l",
    "bottom-3 right-3 border-b border-r",
  ];
  return (
    <>
      {corners.map((c) => (
        <span
          key={c}
          aria-hidden="true"
          className={`pointer-events-none absolute size-3 border-ink/25 ${c}`}
        />
      ))}
    </>
  );
}
