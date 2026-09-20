import { site } from "@/content/site";
import { Icon } from "@/components/graphics/icon";
import { footerColumnIcons } from "@/components/graphics/nav-icons";
import { CopyButton } from "@/components/interactive/copy-button";
import { Container } from "./container";
import { SmartLink } from "./smart-link";
import { Wordmark } from "./wordmark";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const f = site.footer;

  return (
    <footer className="border-t border-line bg-[#F1F0E8]">
      <Container className="pt-14 pb-0 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
          <div className="lg:col-span-4">
            <p className="type-eyebrow text-ink-muted">{f.eyebrow}</p>
            <Wordmark className="mt-3 h-auto text-[22px]" />
            <p className="type-body mt-3 max-w-[34ch] text-ink-muted">{site.tagline}</p>
            <SmartLink
              href={f.start.href}
              className="arrow-shift type-ui mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-ink"
            >
              <Icon name="play" className="size-4 text-ink-muted" />
              {f.start.label}
              <Icon name="arrowUpRight" data-arrow="" className="size-3.5" />
            </SmartLink>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8"
          >
            {f.columns.map((col) => (
              <div key={col.heading} className="min-w-0">
                <h2 className="flex items-center gap-2">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-[6px] bg-surface text-ink-muted ring-1 ring-line">
                    <Icon name={footerColumnIcons[col.heading] ?? "cube"} className="size-3.5" />
                  </span>
                  <span className="type-eyebrow text-ink-muted">{col.heading}</span>
                </h2>
                <ul className="mt-4 flex flex-col gap-0.5">
                  {col.links.map((link) => {
                    const external = isExternal(link.href);
                    return (
                      <li key={link.label}>
                        <SmartLink
                          href={link.href}
                          className="group/flink inline-flex min-h-10 w-full items-center gap-2 rounded-[8px] px-2 -mx-2 text-[14px] leading-5 font-normal text-ink transition-[color,background-color] duration-160 ease-(--ease-state) hover:bg-surface"
                        >
                          <span>{link.label}</span>
                          {external ? (
                            <Icon
                              name="arrowUpRight"
                              className="size-3 shrink-0 text-ink-muted transition-colors duration-160 ease-(--ease-state) group-hover/flink:text-ink"
                            />
                          ) : null}
                        </SmartLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 grid items-start gap-3 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <div className="flex h-12 items-center justify-between gap-3 rounded-[10px] border border-line bg-surface pl-4 pr-1 shadow-[inset_0_1px_0_rgb(255_255_255),0_1px_2px_rgb(32_37_33/0.04)] transition-[border-color] duration-160 ease-(--ease-state) hover:border-control-line focus-within:border-control-line">
              <code className="type-code flex min-w-0 items-center gap-2.5 bg-transparent! p-0! text-[13px]! text-ink">
                <Icon name="terminal" className="size-3.5 shrink-0 text-ink-muted" />
                <span className="whitespace-nowrap">
                  <span className="text-citron-ink select-none" aria-hidden="true">
                    ${" "}
                  </span>
                  {f.install}
                </span>
              </code>
              <CopyButton text={f.install} label="Copy install command" />
            </div>
            <p className="type-small mt-2 text-ink-muted">{f.installHelper}</p>
          </div>

          <a
            href={f.docs.href}
            className="group/docs flex h-12 items-center gap-3 rounded-[10px] border border-line bg-surface px-3 shadow-[inset_0_1px_0_rgb(255_255_255),0_1px_2px_rgb(32_37_33/0.04)] transition-[border-color,box-shadow] duration-160 ease-(--ease-state) hover:border-control-line hover:shadow-[0_8px_20px_-16px_rgb(32_37_33/0.35)]"
          >
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-surface-muted text-ink">
              <Icon name="bookOpen" className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] leading-4 font-medium text-ink">{f.docs.label}</span>
              <span className="block font-mono text-[11px] leading-4 tracking-[0.02em] text-ink-muted">
                {f.docs.host}
              </span>
            </span>
            <Icon
              name="arrowUpRight"
              className="size-3.5 shrink-0 text-ink-muted transition-colors duration-160 ease-(--ease-state) group-hover/docs:text-ink"
            />
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <p className="type-small text-ink-muted">
              © {year} {site.name}
            </p>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:block" />
            <p className="font-mono text-[11px] leading-4 tracking-[0.04em] text-ink-muted">
              {f.stackLine}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={f.docs.href}
              className="type-small inline-flex min-h-9 items-center gap-1.5 text-ink-muted transition-colors duration-160 ease-(--ease-state) hover:text-ink"
            >
              <Icon name="globe" className="size-3.5" />
              {f.docs.host}
              <Icon name="arrowUpRight" className="size-3" />
            </a>
            <a
              href="#top"
              className="type-small inline-flex min-h-9 items-center gap-1.5 text-ink-muted transition-colors duration-160 ease-(--ease-state) hover:text-ink"
            >
              {f.backToTop}
              <Icon name="arrowUp" className="size-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
