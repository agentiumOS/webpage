import { home } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArrowLink } from "@/components/layout/arrow-link";
import { Icon, type IconName } from "@/components/graphics/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/interactive/reveal";

export function Controls() {
  const c = home.controls;
  return (
    <section id="controls" aria-labelledby="controls-title" className="section-y bg-surface">
      <Container>
        <SectionHeader id="controls-title" eyebrow={c.eyebrow} title={c.h2} lead={c.lead} />

        <RevealGroup as="ul" className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {c.items.map((item) => (
            <RevealItem as="li" key={item.heading} className="flex flex-col">
              <ControlGraphic kind={item.icon} />
              <div className="mt-8 flex-1">
                <h3 className="text-[20px] leading-[1.3] font-medium tracking-[-0.015em] text-ink">
                  {item.heading}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-muted">{item.copy}</p>
              </div>
              <div className="mt-8 border-t border-line pt-4">
                <ArrowLink href={item.href} external>
                  Read more
                </ArrowLink>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="figure" className="mt-12 grid items-center gap-8 rounded-[24px] border border-line bg-canvas p-5 sm:p-7 lg:mt-16 lg:grid-cols-2 lg:gap-10 lg:p-8">
          <div className="min-w-0 overflow-hidden rounded-[16px] border border-line bg-surface shadow-[0_8px_28px_-24px_rgba(18,24,38,0.3)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface px-4 py-3 sm:px-5">
              <span className="inline-flex items-center gap-2 text-[12px] font-medium text-ink"><Icon name="activity" variant="duotone" className="size-4 text-citron-ink" />Run events</span>
              <span className="rounded-full border border-line bg-canvas px-2 py-1 font-mono text-[9px] tracking-[0.04em] text-ink-muted uppercase">Illustrative run</span>
            </div>
            <ol className="px-4 py-3 font-mono text-[11px] leading-5 text-ink sm:px-5" aria-label="Example lifecycle events">
              {c.events.items.map((event, index) => (
                <li key={event.name} className="relative grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 py-3 sm:grid-cols-[20px_122px_minmax(0,1fr)]">
                  {index < c.events.items.length - 1 ? <span aria-hidden="true" className="absolute top-7 bottom-[-16px] left-[9px] w-px bg-line" /> : null}
                  <span className="relative inline-flex size-5 items-center justify-center rounded-full border border-line bg-surface text-citron-ink">
                    <Icon name={index === 0 ? "play" : index === c.events.items.length - 1 ? "check" : "wrench"} className="size-2.5" />
                  </span>
                  <span className="font-medium text-citron-ink">{event.name}</span>
                  <span className="col-start-2 break-words text-ink-muted sm:col-start-auto">{event.detail}</span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line bg-surface px-4 py-3 text-[10px] text-ink-muted sm:px-5">
              <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-citron" />Lifecycle</span>
              <span className="inline-flex items-center gap-1.5"><Icon name="wrench" className="size-3" />Tool calls</span>
              <span className="inline-flex items-center gap-1.5"><Icon name="code" className="size-3" />Structured payloads</span>
            </div>
          </div>
          <figcaption className="order-first min-w-0 lg:order-last">
            <p className="type-eyebrow text-citron-ink">Inside a run</p>
            <h3 className="font-display mt-3 max-w-[22ch] text-[26px] leading-[1.2] tracking-[-0.02em] text-ink sm:text-[28px]">
              Follow the work, event by event.
            </h3>
            <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">
              Subscribe to agent lifecycle and tool events. Connect those signals to your logs, metrics, and traces.
            </p>
            <dl className="mt-5 space-y-4">
              <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3">
                <span aria-hidden="true" className="row-span-2 inline-flex size-8 items-center justify-center rounded-[8px] border border-line bg-surface text-citron-ink"><Icon name="gitBranch" variant="duotone" className="size-4" /></span>
                <dt className="text-[13px] font-medium leading-5 text-ink">Keep the run in context</dt>
                <dd className="mt-1 text-[13px] leading-[1.6] text-ink-muted">Run IDs connect lifecycle events with tool activity.</dd>
              </div>
              <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3">
                <span aria-hidden="true" className="row-span-2 inline-flex size-8 items-center justify-center rounded-[8px] border border-line bg-surface text-citron-ink"><Icon name="code" variant="duotone" className="size-4" /></span>
                <dt className="text-[13px] font-medium leading-5 text-ink">Inspect what each tool did</dt>
                <dd className="mt-1 text-[13px] leading-[1.6] text-ink-muted">Read tool names, arguments, and results in event payloads.</dd>
              </div>
            </dl>
            <ArrowLink href={c.events.href} external className="mt-5">
              Explore lifecycle events
            </ArrowLink>
          </figcaption>
        </Reveal>
      </Container>
    </section>
  );
}

/** Small schematics explain each control without presenting invented metrics. */
function ControlGraphic({ kind }: { kind: IconName }) {
  return (
    <div aria-hidden="true" className="relative flex h-36 items-center justify-center overflow-hidden rounded-[12px] border border-line bg-canvas">
      <svg viewBox="0 0 240 132" fill="none" className="h-full w-full" focusable="false">
        <g fill="var(--line)" opacity="0.65">
          {Array.from({ length: 9 }, (_, column) => Array.from({ length: 4 }, (_, row) => <circle key={`${column}-${row}`} cx={16 + column * 26} cy={16 + row * 33} r="0.7" />))}
        </g>
        {kind === "shieldCheck" ? (
          <>
            <path d="M45 66H93M147 66H164V38H196M164 66V94H196" stroke="var(--line)" strokeWidth="1.5" />
            <path d="M45 66H93M147 66H164V38H196" stroke="var(--citron)" strokeWidth="1.5" />
            <rect x="22" y="51" width="32" height="32" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <path d="M33 61L41 67L33 73V61Z" fill="var(--citron)" fillOpacity="0.2" stroke="var(--citron)" strokeLinejoin="round" />
            <rect x="183" y="23" width="34" height="30" rx="8" fill="var(--surface)" stroke="var(--citron)" strokeOpacity="0.45" />
            <path d="M194 38L198 42L207 33" stroke="var(--citron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="183" y="79" width="34" height="30" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <path d="M196 89V99M203 89V99" stroke="var(--control-line)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="164" cy="66" r="3" fill="var(--surface)" stroke="var(--citron)" />
          </>
        ) : kind === "gauge" ? (
          <>
            <path d="M47 76A73 73 0 0 1 193 76" stroke="var(--line)" strokeWidth="7" strokeLinecap="round" />
            <path d="M47 76A73 73 0 0 1 165 19" stroke="var(--citron)" strokeWidth="7" strokeLinecap="round" />
            <path d="M177 21L183 15" stroke="var(--ink-muted)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="165" cy="19" r="4.5" fill="var(--surface)" stroke="var(--citron)" strokeWidth="1.5" />
            <rect x="43" y="100" width="154" height="8" rx="4" fill="var(--surface-muted)" />
            {[0, 1, 2, 3, 4, 5].map((segment) => <rect key={segment} x={43 + segment * 16} y="100" width="12" height="8" rx="2" fill="var(--citron)" fillOpacity={segment < 4 ? "0.7" : "0.22"} />)}
            <path d="M176 95V113" stroke="var(--ink-muted)" strokeWidth="1.5" />
          </>
        ) : kind === "activity" ? (
          <>
            <path d="M29 35V97H60M29 66H74M29 35H197" stroke="var(--line)" strokeWidth="1.5" />
            <rect x="28" y="28" width="182" height="13" rx="4" fill="var(--surface)" stroke="var(--line)" />
            <rect x="29" y="29" width="116" height="11" rx="3" fill="var(--citron)" fillOpacity="0.16" />
            <rect x="59" y="59" width="118" height="13" rx="4" fill="var(--surface)" stroke="var(--line)" />
            <rect x="60" y="60" width="77" height="11" rx="3" fill="var(--citron)" fillOpacity="0.35" />
            <rect x="86" y="90" width="93" height="13" rx="4" fill="var(--surface)" stroke="var(--line)" />
            <rect x="87" y="91" width="52" height="11" rx="3" fill="var(--citron)" fillOpacity="0.6" />
            <path d="M59 72V97H86" stroke="var(--line)" strokeWidth="1.5" />
            <circle cx="29" cy="66" r="3" fill="var(--surface)" stroke="var(--citron)" />
            <path d="M201 29V110" stroke="var(--control-line)" strokeDasharray="2 4" />
          </>
        ) : (
          <>
            <rect x="30" y="20" width="180" height="96" rx="10" fill="var(--surface)" stroke="var(--line)" />
            <path d="M30 50H210M30 82H210M161 20V116" stroke="var(--line)" />
            {[35, 66, 98].map((y, index) => <g key={y}><rect x="43" y={y - 5} width="10" height="10" rx="3" fill="var(--citron)" fillOpacity="0.12" /><path d={`M64 ${y - 2}H${index === 1 ? 128 : 140}M64 ${y + 3}H${index === 2 ? 102 : 116}`} stroke="var(--line)" strokeWidth="2" strokeLinecap="round" /></g>)}
            {[35, 66].map((y) => <g key={y}><circle cx="185" cy={y} r="8" fill="var(--citron)" fillOpacity="0.1" /><path d={`M181 ${y}L184 ${y + 3}L190 ${y - 3}`} stroke="var(--citron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></g>)}
            <circle cx="185" cy="98" r="7.5" stroke="var(--control-line)" strokeDasharray="2 3" />
          </>
        )}
      </svg>
      {kind === "shieldCheck" || kind === "gauge" ? (
        <span className="absolute top-1/2 left-1/2 inline-flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] border border-line bg-surface text-citron-ink shadow-[0_3px_0_0_var(--surface-muted)]">
          <Icon name={kind} variant="duotone" className="size-6" />
        </span>
      ) : null}
    </div>
  );
}
