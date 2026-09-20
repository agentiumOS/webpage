import { box, CITRON, GRAPHITE, IVORY, project, type Iso } from "./iso";

type Palette = typeof IVORY;

export function IsoBox({
  iso,
  x,
  y,
  z,
  w,
  d,
  h,
  palette,
  opacity = 1,
}: {
  iso: Iso;
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  palette: Palette;
  opacity?: number;
}) {
  const f = box(iso, x, y, z, w, d, h);
  return (
    <g opacity={opacity} strokeLinejoin="round" stroke={palette.edge} strokeWidth="1">
      <polygon points={f.left} fill={palette.left} />
      <polygon points={f.right} fill={palette.right} />
      <polygon points={f.top} fill={palette.top} />
    </g>
  );
}

/* Shared by the authored sculptures (and `agent-sculpture.tsx`). */

/** Codebase entrance curve (`--ease-enter`), inlined so it resolves inside keyframes. */
export const EASE_ENTER = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Codebase `--ease-move`: strong ease-in-out for parts that move while on screen. */
export const EASE_MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";

/** Only run continuous motion for people who haven't asked for less of it. */
export const MOTION_OK = "@media (prefers-reduced-motion: no-preference)";

/* ------------------------------------------------------------------ */
/* Asset B — Jev routing sculpture (3:2, graphite)                     */
/* ------------------------------------------------------------------ */

type CableTone = "ivory" | "blue";

function Cable({
  d,
  width,
  tone,
  flowClass,
}: {
  d: string;
  width: number;
  tone: CableTone;
  flowClass?: string;
}) {
  const colors =
    tone === "ivory"
      ? { body: "#F4F7FD", shade: "#B4BDCD", ridge: "#FFFFFF", core: "#E4EAF4", packet: "#2A3140" }
      : { body: "#2F6BFF", shade: "#1739C8", ridge: "#D4E2FF", core: "#8FB6FF", packet: "#F4F7FD" };
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="#05070C"
        strokeWidth={width + 10}
        strokeLinecap="round"
        opacity="0.16"
        transform="translate(2 22)"
        filter="url(#jev-blur-soft)"
      />
      <path
        d={d}
        fill="none"
        stroke="#05070C"
        strokeWidth={width}
        strokeLinecap="round"
        opacity="0.3"
        transform="translate(1 7)"
        filter="url(#jev-blur-tight)"
      />
      <path d={d} fill="none" stroke={colors.shade} strokeWidth={width} strokeLinecap="round" transform="translate(0 3)" />
      <path d={d} fill="none" stroke={colors.body} strokeWidth={width} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={colors.ridge}
        strokeWidth={Math.max(3, width * 0.26)}
        strokeLinecap="round"
        transform="translate(0 -2.2)"
        opacity="0.68"
      />
      <path d={d} fill="none" stroke={colors.core} strokeWidth={Math.max(4, width * 0.32)} strokeLinecap="round" />
      {flowClass ? (
        <path
          className={flowClass}
          d={d}
          pathLength={1}
          fill="none"
          stroke={colors.packet}
          strokeWidth={Math.max(4, width * 0.32)}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
}

export function RoutingSculpture({ className }: { className?: string }) {
  const half = 0.62;
  const iso: Iso = { ox: 1008, oy: 512, s: 112 };
  const faces = box(iso, -half, -half, -half, half * 2, half * 2, half * 2);
  const label = project(iso, 0.02, 0.02, half);
  // End slightly inside the left / right faces so the cube covers the caps.
  const dockIn = project(iso, 0, half - 0.14, 0);
  const dockOut = project(iso, half - 0.14, 0, 0);
  const groundPts = [
    project(iso, -half, -half, -half),
    project(iso, half, -half, -half),
    project(iso, half, half, -half),
    project(iso, -half, half, -half),
  ]
    .map((p) => p.map((n) => n.toFixed(1)).join(","))
    .join(" ");

  const end = { x: +dockIn[0].toFixed(1), y: +dockIn[1].toFixed(1) };
  const inlets = [
    `M -24 248 C 560 248, ${end.x - 70} ${end.y - 6}, ${end.x} ${end.y}`,
    `M -24 512 C 620 512, ${end.x - 40} ${end.y}, ${end.x} ${end.y}`,
    `M -24 776 C 560 776, ${end.x - 70} ${end.y + 6}, ${end.x} ${end.y}`,
  ];
  const track = `M ${dockOut[0].toFixed(1)} ${dockOut[1].toFixed(1)} C ${(dockOut[0] + 180).toFixed(1)} ${dockOut[1].toFixed(1)}, ${(dockOut[0] + 320).toFixed(1)} ${dockOut[1].toFixed(1)}, 1608 ${dockOut[1].toFixed(1)}`;

  const css = `
    .agrt-flow { stroke-dasharray: 0.14 1; stroke-dashoffset: 1.28; opacity: 0; }
    .agrt-glow { transform-box: fill-box; transform-origin: center; }
    @keyframes agrt-travel {
      0% { stroke-dashoffset: 1.28; opacity: 1; }
      100% { stroke-dashoffset: 0; opacity: 1; }
    }
    @keyframes agrt-glow {
      0%, 100% { opacity: 0.45; }
      50% { opacity: 0.8; }
    }
    ${MOTION_OK} {
      .agrt-flow { animation: agrt-travel 2.7s linear infinite; }
      .agrt-flow-0 { animation-delay: 0s; }
      .agrt-flow-1 { animation-delay: 0.9s; }
      .agrt-flow-2 { animation-delay: 1.8s; }
      .agrt-flow-out { animation-delay: 0.45s; }
      .agrt-glow { animation: agrt-glow 4.8s ${EASE_MOVE} infinite; }
    }
  `;
  return (
    <svg
      viewBox="0 0 1536 1024"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <defs>
        <radialGradient id="jev-bg" cx="64%" cy="48%" r="72%">
          <stop offset="0" stopColor="#161C2A" />
          <stop offset="1" stopColor="#0C1018" />
        </radialGradient>
        <radialGradient id="jev-bloom" cx="50%" cy="42%" r="50%">
          <stop offset="0" stopColor="#9EC0FF" stopOpacity="0.62" />
          <stop offset="0.42" stopColor="#2F6BFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2F6BFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="jev-face-top" x1="16%" y1="6%" x2="90%" y2="94%">
          <stop offset="0" stopColor="#D7E4FF" />
          <stop offset="0.4" stopColor="#7AA6FF" />
          <stop offset="1" stopColor="#3D72F5" />
        </linearGradient>
        <linearGradient id="jev-face-left" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0" stopColor="#4B80F7" />
          <stop offset="1" stopColor="#1A3FBE" />
        </linearGradient>
        <linearGradient id="jev-face-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#2F5DE8" />
          <stop offset="1" stopColor="#122F9C" />
        </linearGradient>
        <radialGradient id="jev-core" cx="40%" cy="30%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.48" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <pattern id="jev-grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.15" fill="#F4F7FD" opacity="0.08" />
        </pattern>
        <clipPath id="jev-top-clip">
          <polygon points={faces.top} />
        </clipPath>
        <filter id="jev-blur-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id="jev-blur-tight" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id="jev-blur-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>
      <rect width="1536" height="1024" fill="url(#jev-bg)" />
      <rect width="1536" height="1024" fill="url(#jev-grid)" />
      <ellipse className="agrt-glow" cx={iso.ox} cy={iso.oy} rx="300" ry="190" fill="url(#jev-bloom)" filter="url(#jev-blur-glow)" />

      {inlets.map((d, i) => (
        <Cable key={d} d={d} width={44} tone="ivory" flowClass={`agrt-flow agrt-flow-${i}`} />
      ))}
      <Cable d={track} width={44} tone="blue" flowClass="agrt-flow agrt-flow-out" />

      <polygon points={groundPts} fill="#05070C" opacity="0.38" transform="translate(6 18)" filter="url(#jev-blur-soft)" />
      <polygon points={groundPts} fill="#05070C" opacity="0.28" transform="translate(1 5)" filter="url(#jev-blur-tight)" />

      <g stroke="#C5D8FF" strokeWidth="1.15" strokeLinejoin="round">
        <polygon points={faces.left} fill="url(#jev-face-left)" />
        <polygon points={faces.right} fill="url(#jev-face-right)" />
        <polygon points={faces.top} fill="url(#jev-face-top)" />
      </g>
      <polygon points={faces.top} fill="url(#jev-core)" clipPath="url(#jev-top-clip)" />
      <ellipse cx={iso.ox - 14} cy={iso.oy - 62} rx="58" ry="26" fill="#FFFFFF" opacity="0.28" clipPath="url(#jev-top-clip)" />

      <g transform={`translate(${label[0]} ${label[1]})`}>
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFFFFF"
          fontFamily="var(--font-faculty), ui-serif, serif"
          fontSize="86"
          letterSpacing="-0.05em"
          transform="rotate(-30) scale(1 0.56)"
        >
          Jev
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Asset C — Connected assembly (16:9, ivory)                          */
/* ------------------------------------------------------------------ */

export function AssemblySculpture({ className }: { className?: string }) {
  const iso: Iso = { ox: 1120, oy: 470, s: 150 };
  const modules: { x: number; y: number; z: number; w: number; d: number; h: number }[] = [
    { x: -0.3, y: 0.2, z: 0, w: 0.7, d: 0.7, h: 0.55 },
    { x: 2.6, y: 0.1, z: 0, w: 0.7, d: 0.9, h: 0.75 },
    { x: 0.6, y: -0.6, z: 0, w: 0.9, d: 0.5, h: 0.45 },
    { x: 1.9, y: 2.0, z: 0, w: 0.8, d: 0.6, h: 0.65 },
    { x: 0.3, y: 2.1, z: 0, w: 0.6, d: 0.6, h: 0.5 },
  ];
  const shadow = project(iso, 1.5, 1.1, -0.2);
  // Docked modules hover a few pixels, out of phase; the tracks breathe underneath.
  const css = `
    @keyframes agas-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes agas-breathe {
      0%, 100% { opacity: 0.55; }
      50% { opacity: 1; }
    }
    ${MOTION_OK} {
      .agas-float { animation: agas-float 4.2s cubic-bezier(0.77, 0, 0.175, 1) infinite; }
      .agas-track { animation: agas-breathe 3s cubic-bezier(0.77, 0, 0.175, 1) infinite; }
    }
  `;
  return (
    <svg
      viewBox="0 0 1672 941"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <defs>
        <radialGradient id="c-bg" cx="65%" cy="45%" r="75%">
          <stop offset="0" stopColor="#F7F9FD" />
          <stop offset="1" stopColor="#E8EDF6" />
        </radialGradient>
        <filter id="c-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>
      <rect width="1672" height="941" fill="url(#c-bg)" />
      <ellipse cx={shadow[0]} cy={shadow[1] + 110} rx="460" ry="110" fill="#121826" opacity="0.14" filter="url(#c-blur)" />
      {/* central graphite base */}
      <IsoBox iso={iso} x={0} y={0} z={-0.2} w={3} d={2} h={0.42} palette={GRAPHITE} />
      {/* recessed blue tracks on the top face */}
      <g className="agas-track">
        <polygon points={box(iso, 0.3, 0.95, 0.22, 2.4, 0.1, 0.001).top} fill="#2F6BFF" />
        <polygon points={box(iso, 1.45, 0.3, 0.22, 0.1, 1.4, 0.001).top} fill="#2F6BFF" />
        <polygon points={box(iso, 0.3, 0.3, 0.22, 0.1, 0.75, 0.001).top} fill="#2F6BFF" />
        <polygon points={box(iso, 2.6, 0.95, 0.22, 0.1, 0.75, 0.001).top} fill="#2F6BFF" />
      </g>
      {/* docked ivory modules */}
      {modules.map((m, i) => (
        <g key={i} className="agas-float" style={{ animationDelay: `${i * 0.6}s` }}>
          <IsoBox iso={iso} {...m} palette={IVORY} />
          <polygon
            points={box(iso, m.x + 0.15, m.y + 0.15, m.z + m.h, m.w - 0.3, m.d - 0.3, 0.001).top}
            fill="#D4DCEC"
          />
        </g>
      ))}
      {/* one citron module accent */}
      <g className="agas-float" style={{ animationDelay: "0.3s" }}>
        <IsoBox iso={iso} x={1.25} y={0.75} z={0.22} w={0.5} d={0.5} h={0.22} palette={CITRON} />
      </g>
      <ellipse cx="1000" cy="150" rx="360" ry="160" fill="#FFFFFF" opacity="0.3" filter="url(#c-blur)" />
    </svg>
  );
}
