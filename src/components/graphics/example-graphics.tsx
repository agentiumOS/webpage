/* 4:3 authored schematics for the homepage use-case cards. Decorative.
   Each has one small CSS loop (`gfx-*`, globals.css) that hints at the behaviour;
   loops stop under prefers-reduced-motion and the static frame stands alone. */

const frame = "h-full w-full";

export function SupportGraphic() {
  return (
    <svg viewBox="0 0 400 300" className={frame} aria-hidden="true" role="presentation">
      <rect width="400" height="300" fill="var(--surface-muted)" />
      {/* ticket */}
      <rect x="48" y="64" width="200" height="150" rx="14" fill="var(--surface)" stroke="var(--line)" />
      <rect x="68" y="88" width="90" height="10" rx="5" fill="var(--ink)" />
      <rect x="68" y="112" width="150" height="8" rx="4" fill="var(--line)" />
      <rect x="68" y="130" width="130" height="8" rx="4" fill="var(--line)" />
      <rect x="68" y="148" width="110" height="8" rx="4" fill="var(--line)" />
      <rect className="gfx-breathe gfx-origin-center" x="68" y="178" width="64" height="20" rx="10" fill="var(--citron)" />
      {/* context note: the agent drafts its reply line by line */}
      <rect x="216" y="120" width="136" height="110" rx="12" fill="var(--ink)" />
      <rect x="232" y="140" width="60" height="8" rx="4" fill="var(--citron)" />
      {[
        { y: 160, w: 100, delay: 0 },
        { y: 176, w: 88, delay: 0.5 },
        { y: 192, w: 96, delay: 1 },
      ].map((l) => (
        <rect
          key={l.y}
          className="gfx-type gfx-origin-left"
          style={{ animationDelay: `${l.delay}s` }}
          x="232"
          y={l.y}
          width={l.w}
          height="7"
          rx="3.5"
          fill="var(--dark-muted)"
        />
      ))}
    </svg>
  );
}

export function ResearchGraphic() {
  return (
    <svg viewBox="0 0 400 300" className={frame} aria-hidden="true" role="presentation">
      <rect width="400" height="300" fill="var(--surface-muted)" />
      {/* document cards */}
      <rect x="56" y="70" width="120" height="160" rx="12" fill="var(--surface)" stroke="var(--line)" />
      <rect x="72" y="90" width="70" height="8" rx="4" fill="var(--ink)" />
      <rect x="72" y="108" width="88" height="6" rx="3" fill="var(--line)" />
      <rect x="72" y="122" width="80" height="6" rx="3" fill="var(--line)" />
      <rect x="72" y="136" width="86" height="6" rx="3" fill="var(--line)" />
      <rect x="72" y="150" width="64" height="6" rx="3" fill="var(--line)" />
      <rect x="150" y="90" width="120" height="160" rx="12" fill="var(--surface)" stroke="var(--line)" />
      <rect x="166" y="110" width="70" height="8" rx="4" fill="var(--ink)" />
      <rect x="166" y="128" width="88" height="6" rx="3" fill="var(--line)" />
      <rect x="166" y="142" width="80" height="6" rx="3" fill="var(--line)" />
      <rect x="166" y="156" width="86" height="6" rx="3" fill="var(--line)" />
      {/* review check: findings pass to the reviewer, who signs off */}
      <line x1="270" y1="170" x2="300" y2="170" stroke="var(--citron)" strokeWidth="2" />
      <line className="gfx-flow" x1="270" y1="170" x2="300" y2="170" pathLength={1} stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="326" cy="170" r="26" fill="var(--ink)" />
      <path
        className="gfx-draw"
        d="M314 170 l8 8 l16 -16"
        pathLength={1}
        fill="none"
        stroke="var(--citron)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VoiceBrowserGraphic() {
  const bars = [10, 22, 36, 18, 44, 28, 14, 32, 20];
  return (
    <svg viewBox="0 0 400 300" className={frame} aria-hidden="true" role="presentation">
      <rect width="400" height="300" fill="var(--surface-muted)" />
      {/* waveform: live speech, bars scale from their centre */}
      {bars.map((h, i) => (
        <rect
          key={i}
          className="gfx-bar gfx-origin-center"
          style={{ animationDelay: `${(i % 4) * 0.14}s` }}
          x={48 + i * 14}
          y={150 - h / 2}
          width="6"
          height={h}
          rx="3"
          fill={i === 4 ? "var(--citron-ink)" : "var(--ink)"}
        />
      ))}
      {/* browser outline */}
      <rect x="196" y="70" width="156" height="160" rx="12" fill="var(--surface)" stroke="var(--line)" />
      <line x1="196" y1="98" x2="352" y2="98" stroke="var(--line)" />
      <circle cx="212" cy="84" r="4" fill="var(--line)" />
      <circle cx="226" cy="84" r="4" fill="var(--line)" />
      <circle cx="240" cy="84" r="4" fill="var(--line)" />
      <rect x="212" y="114" width="80" height="8" rx="4" fill="var(--ink)" />
      <rect x="212" y="132" width="124" height="6" rx="3" fill="var(--line)" />
      <rect x="212" y="146" width="112" height="6" rx="3" fill="var(--line)" />
      <rect className="gfx-breathe gfx-origin-center" x="212" y="176" width="56" height="20" rx="10" fill="var(--citron)" />
    </svg>
  );
}
