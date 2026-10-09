import { useId } from "react";
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
  idPrefix,
}: {
  d: string;
  width: number;
  tone: CableTone;
  flowClass?: string;
  idPrefix: string;
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
        filter={`url(#${idPrefix}-jev-blur-soft)`}
      />
      <path
        d={d}
        fill="none"
        stroke="#05070C"
        strokeWidth={width}
        strokeLinecap="round"
        opacity="0.3"
        transform="translate(1 7)"
        filter={`url(#${idPrefix}-jev-blur-tight)`}
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
  const idPrefix = `routing-${useId().replace(/:/g, "")}`;
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
        <radialGradient id={`${idPrefix}-jev-bg`} cx="64%" cy="48%" r="72%">
          <stop offset="0" stopColor="#161C2A" />
          <stop offset="1" stopColor="#0C1018" />
        </radialGradient>
        <radialGradient id={`${idPrefix}-jev-bloom`} cx="50%" cy="42%" r="50%">
          <stop offset="0" stopColor="#9EC0FF" stopOpacity="0.62" />
          <stop offset="0.42" stopColor="#2F6BFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2F6BFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${idPrefix}-jev-face-top`} x1="16%" y1="6%" x2="90%" y2="94%">
          <stop offset="0" stopColor="#D7E4FF" />
          <stop offset="0.4" stopColor="#7AA6FF" />
          <stop offset="1" stopColor="#3D72F5" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-jev-face-left`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0" stopColor="#4B80F7" />
          <stop offset="1" stopColor="#1A3FBE" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-jev-face-right`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#2F5DE8" />
          <stop offset="1" stopColor="#122F9C" />
        </linearGradient>
        <radialGradient id={`${idPrefix}-jev-core`} cx="40%" cy="30%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.48" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${idPrefix}-jev-grid`} width="56" height="56" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.15" fill="#F4F7FD" opacity="0.08" />
        </pattern>
        <clipPath id={`${idPrefix}-jev-top-clip`}>
          <polygon points={faces.top} />
        </clipPath>
        <filter id={`${idPrefix}-jev-blur-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={`${idPrefix}-jev-blur-tight`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id={`${idPrefix}-jev-blur-glow`} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>
      <rect width="1536" height="1024" fill={`url(#${idPrefix}-jev-bg)`} />
      <rect width="1536" height="1024" fill={`url(#${idPrefix}-jev-grid)`} />
      <ellipse className="agrt-glow" cx={iso.ox} cy={iso.oy} rx="300" ry="190" fill={`url(#${idPrefix}-jev-bloom)`} filter={`url(#${idPrefix}-jev-blur-glow)`} />

      {inlets.map((d, i) => (
        <Cable idPrefix={idPrefix} key={d} d={d} width={44} tone="ivory" flowClass={`agrt-flow agrt-flow-${i}`} />
      ))}
      <Cable idPrefix={idPrefix} d={track} width={44} tone="blue" flowClass="agrt-flow agrt-flow-out" />

      <polygon points={groundPts} fill="#05070C" opacity="0.38" transform="translate(6 18)" filter={`url(#${idPrefix}-jev-blur-soft)`} />
      <polygon points={groundPts} fill="#05070C" opacity="0.28" transform="translate(1 5)" filter={`url(#${idPrefix}-jev-blur-tight)`} />

      <g stroke="#C5D8FF" strokeWidth="1.15" strokeLinejoin="round">
        <polygon points={faces.left} fill={`url(#${idPrefix}-jev-face-left)`} />
        <polygon points={faces.right} fill={`url(#${idPrefix}-jev-face-right)`} />
        <polygon points={faces.top} fill={`url(#${idPrefix}-jev-face-top)`} />
      </g>
      <polygon points={faces.top} fill={`url(#${idPrefix}-jev-core)`} clipPath={`url(#${idPrefix}-jev-top-clip)`} />
      <ellipse cx={iso.ox - 14} cy={iso.oy - 62} rx="58" ry="26" fill="#FFFFFF" opacity="0.28" clipPath={`url(#${idPrefix}-jev-top-clip)`} />

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
/* Asset C — Media adapter workbench, on the same scale as the hero.    */
/* ------------------------------------------------------------------ */

type Point3 = [number, number, number];

function projectedLine(iso: Iso, points: Point3[]) {
  return points.map((point, index) => `${index ? "L" : "M"}${project(iso, ...point).join(" ")}`).join(" ");
}

/** Maps a 100 × 100 drawing onto a horizontal machined surface. */
function topSurface(iso: Iso, x: number, y: number, z: number, size: number) {
  const [px, py] = project(iso, x, y, z);
  const unit = iso.s * size / 100;
  return `matrix(${Math.sqrt(3) / 2 * unit} ${unit / 2} ${-Math.sqrt(3) / 2 * unit} ${unit / 2} ${px} ${py})`;
}

function Fastener({ iso, point, dark = false }: { iso: Iso; point: Point3; dark?: boolean }) {
  const [x, y] = project(iso, ...point);
  return (
    <g>
      <ellipse cx={x} cy={y} rx="3.4" ry="2" fill={dark ? "#506079" : "#B3C0D4"} />
      <path d={`M${x - 1.6} ${y}h3.2`} stroke={dark ? "#263040" : "#EDF2FA"} strokeWidth="0.8" />
    </g>
  );
}

export function AssemblySculpture({ className }: { className?: string }) {
  const idPrefix = `assembly-${useId().replace(/:/g, "")}`;
  const iso: Iso = { ox: 445, oy: 177, s: 146 };
  const voice = { x: 0.27, y: 0.24, z: 0.1, w: 0.78, d: 0.72, h: 0.87 };
  const image = { x: 2.03, y: 0.28, z: 0.1, w: 0.79, d: 0.77, h: 0.69 };
  const phone = { x: 0.44, y: 1.59, z: 0.1, w: 0.82, d: 0.78, h: 0.39 };
  const core = { x: 1.52, y: 1.27, z: 0.1, w: 0.86, d: 0.79, h: 0.34 };
  const chassis = { x: 0, y: 0, z: -0.2, w: 3.08, d: 2.45, h: 0.28 };
  const routes: Point3[][] = [
    [[0.69, 0.94, 0.086], [0.69, 1.19, 0.086], [1.85, 1.19, 0.086], [1.85, 1.36, 0.086]],
    [[2.42, 1.01, 0.086], [2.42, 1.11, 0.086], [2.15, 1.11, 0.086], [2.15, 1.35, 0.086]],
    [[1.18, 1.98, 0.086], [1.4, 1.98, 0.086], [1.4, 1.66, 0.086], [1.6, 1.66, 0.086]],
  ];
  const top = (x: number, y: number, z: number, width: number, depth: number) => box(iso, x, y, z, width, depth, 0).top;
  const footPoints: Point3[] = [[0.17, 0.17, -0.3], [2.68, 0.17, -0.3], [0.17, 2.03, -0.3], [2.68, 2.03, -0.3]];
  const screwPoints: Point3[] = [[0.13, 0.13, 0.085], [2.95, 0.13, 0.085], [0.13, 2.32, 0.085], [2.95, 2.32, 0.085]];
  return (
    <svg viewBox="0 0 960 640" preserveAspectRatio="xMidYMid meet" className={className} role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${idPrefix}-background`} cx="48%" cy="38%" r="72%">
          <stop offset="0" stopColor="#FAFCFF" />
          <stop offset="1" stopColor="#E8EEF7" />
        </radialGradient>
        <linearGradient id={`${idPrefix}-sheen`} x1="0" y1="0" x2="0.9" y2="1">
          <stop stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id={`${idPrefix}-shadow`} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <pattern id={`${idPrefix}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="#9DACBF" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="960" height="640" fill={`url(#${idPrefix}-background)`} />
      <rect x="55" y="55" width="850" height="535" fill={`url(#${idPrefix}-grid)`} />
      <ellipse cx="490" cy="465" rx="318" ry="119" fill="#53637D" opacity="0.15" filter={`url(#${idPrefix}-shadow)`} />

      {footPoints.map(([x, y, z]) => <IsoBox key={`${x}-${y}`} iso={iso} x={x} y={y} z={z} w={0.23} d={0.23} h={0.13} palette={GRAPHITE} />)}
      <IsoBox iso={iso} {...chassis} palette={IVORY} />
      <path d={projectedLine(iso, [[0, 2.45, -0.12], [3.08, 2.45, -0.12], [3.08, 0, -0.12]])} fill="none" stroke="#9FADC3" strokeWidth="1.3" />
      <polygon points={top(0.08, 0.08, 0.085, 2.92, 2.29)} fill="#EDF2F9" stroke="#CCD7E6" strokeWidth="1.2" />
      <polygon points={top(0.08, 0.08, 0.086, 2.92, 2.29)} fill={`url(#${idPrefix}-sheen)`} />
      {screwPoints.map((point) => <Fastener key={point.join()} iso={iso} point={point} />)}

      {/* Each adapter has a separate socket and route into the SDK. */}
      {routes.map((points, index) => (
        <g key={index} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={projectedLine(iso, points)} stroke="#C2CEE0" strokeWidth="11" />
          <path d={projectedLine(iso, points)} stroke="#F9FBFF" strokeWidth="6" />
          <path d={projectedLine(iso, points)} stroke="#8AAFFF" strokeWidth="2.4" />
          {points.slice(1, -1).map((point) => {
            const [x, y] = project(iso, ...point);
            return <ellipse key={point.join()} cx={x} cy={y} rx="4" ry="2.4" fill="#EEF4FF" stroke="#658DE1" strokeWidth="1.2" />;
          })}
        </g>
      ))}

      {/* Voice: a waveform cartridge, perforated grille, and input socket. */}
      <IsoBox iso={iso} {...voice} palette={IVORY} />
      <IsoBox iso={iso} x={voice.x + 0.03} y={voice.y + 0.03} z={voice.z + voice.h} w={voice.w - 0.06} d={voice.d - 0.06} h={0.045} palette={IVORY} />
      <g transform={topSurface(iso, voice.x + 0.11, voice.y + 0.09, voice.z + voice.h + 0.048, 0.56)}>
        <rect width="100" height="100" rx="10" fill="#DCE7FB" stroke="#A9BFDF" strokeWidth="1.5" />
        {[23, 45, 67, 38, 78, 52, 29].map((height, index) => <rect key={index} x={15 + index * 10} y={50 - height / 2} width="5" height={height} rx="2.5" fill={index === 4 ? "#245ED8" : "#6893E5"} />)}
      </g>
      {[0, 1, 2, 3, 4].map((row) => (
        <g key={row}>
          {[0, 1, 2, 3, 4, 5].map((column) => {
            const [x, y] = project(iso, voice.x + 0.15 + column * 0.085, voice.y + voice.d + 0.002, 0.36 + row * 0.075);
            return <ellipse key={column} cx={x} cy={y} rx="1.6" ry="2.4" fill="#A8B6CB" />;
          })}
        </g>
      ))}
      <path d={projectedLine(iso, [[voice.x + 0.11, voice.y + voice.d, 0.22], [voice.x + 0.61, voice.y + voice.d, 0.22]])} stroke="#B5C5DD" strokeWidth="4" strokeLinecap="round" />

      {/* Image: a recessed preview surface and a stack of output sheets. */}
      {[0, 1, 2].map((index) => <IsoBox key={index} iso={iso} {...image} h={0.12} z={0.12 + index * 0.16} palette={IVORY} />)}
      <IsoBox iso={iso} {...image} z={0.61} h={0.11} palette={IVORY} />
      <g transform={topSurface(iso, image.x + 0.075, image.y + 0.06, 0.722, 0.64)}>
        <rect width="100" height="100" rx="5" fill="#CDDCF5" stroke="#9DB4D8" strokeWidth="2" />
        <circle cx="72" cy="27" r="11" fill="#FAFCFF" />
        <path d="M5 90V74L35 37L65 76L81 56L95 73V90Z" fill="#759DDE" />
        <path d="M5 90V80L35 47L66 87L82 66L95 81V95H5Z" fill="#316EE3" />
      </g>
      {[0, 1, 2].map((index) => <path key={index} d={projectedLine(iso, [[image.x + image.w, image.y + 0.12, 0.17 + index * 0.16], [image.x + image.w, image.y + 0.54, 0.17 + index * 0.16]])} stroke="#A6B8D2" strokeWidth="2" />)}

      {/* Telephony: handset relief, separate control and audio contacts. */}
      <IsoBox iso={iso} {...phone} palette={IVORY} />
      <g transform={topSurface(iso, phone.x + 0.095, phone.y + 0.09, phone.z + phone.h + 0.003, 0.62)}>
        <rect width="100" height="100" rx="8" fill="#DCE7FB" stroke="#A9BFDF" strokeWidth="1.5" />
        <path d="M27 18C22 17 16 22 18 34C22 57 43 79 66 83C78 85 84 78 82 73L73 58C71 54 67 53 63 56L56 62C47 58 40 51 36 42L43 36C46 33 45 28 42 26Z" fill="#5F8CDB" stroke="#2B60B9" strokeWidth="2" strokeLinejoin="round" />
        <path d="M61 20Q78 23 81 41M60 30Q69 32 71 42" fill="none" stroke="#A4BCE6" strokeWidth="4" strokeLinecap="round" />
      </g>
      {[0.18, 0.4, 0.61].map((offset) => {
        const [x, y] = project(iso, phone.x + offset, phone.y + phone.d, 0.22);
        return <g key={offset}><ellipse cx={x} cy={y} rx="5" ry="6" fill="#A5B4C9" /><ellipse cx={x} cy={y} rx="2.5" ry="3.4" fill="#263C5B" /></g>;
      })}

      {/* The SDK is the common runtime, with visible edge contacts. */}
      <IsoBox iso={iso} {...core} palette={GRAPHITE} />
      <IsoBox iso={iso} x={core.x + 0.075} y={core.y + 0.075} z={0.44} w={0.71} d={0.64} h={0.075} palette={CITRON} />
      <g transform={topSurface(iso, core.x + 0.16, core.y + 0.11, 0.517, 0.51)} fill="none" stroke="#EFF5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M33 25L10 50L33 75M67 25L90 50L67 75M57 23L43 77" />
      </g>
      {[0, 1, 2, 3, 4].map((index) => <polygon key={index} points={top(core.x + 0.14 + index * 0.12, core.y + core.d - 0.035, 0.44, 0.05, 0.08)} fill="#91A5C4" />)}
      <polygon points={top(2.68, 1.77, 0.087, 0.21, 0.36)} fill="#D5E1F2" stroke="#BDCCE1" />
      {[0, 1, 2].map((index) => <polygon key={index} points={top(2.73, 1.82 + index * 0.085, 0.09, 0.11, 0.035)} fill={index === 0 ? "#346EDE" : "#A3B8D7"} />)}
    </svg>
  );
}
