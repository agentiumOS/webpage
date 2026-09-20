import { box, CITRON, GRAPHITE, IVORY, project, type Iso } from "./iso";

type Palette = typeof IVORY;

function IsoBox({
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

/* ------------------------------------------------------------------ */
/* Asset A — Modular stack (3:2)                                       */
/* ------------------------------------------------------------------ */

/** Codebase entrance curve (`--ease-enter`), inlined so it resolves inside keyframes. */
const EASE_ENTER = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Only run continuous motion for people who haven't asked for less of it. */
const MOTION_OK = "@media (prefers-reduced-motion: no-preference)";

const EASE_MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";

type Pose = { x: number; y: number; z: number };

function screenDelta(iso: Iso, from: Pose, to: Pose): [number, number] {
  const a = project(iso, from.x, from.y, from.z);
  const b = project(iso, to.x, to.y, to.z);
  return [+(b[0] - a[0]).toFixed(1), +(b[1] - a[1]).toFixed(1)];
}

function arcPath(a: [number, number], b: [number, number], bulge: number): string {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const mx = (a[0] + b[0]) / 2 - (dy / len) * bulge;
  const my = (a[1] + b[1]) / 2 + (dx / len) * bulge;
  return `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
}

/**
 * One cycle (`--stack-cycle`), shared with the hero's Compose / Connect / Run labels.
 *
 *   0–6%    reset    engine dissolves into loose parts
 *   6–34%   compose  parts assemble into a tower (hold 22–34)
 *   34–66%  connect  tower unpacks into a flat linked board (hold 46–64)
 *   66–100% run      board locks into a running engine + circuit (hold 78–100)
 *
 * 0% === 100% (engine). Reduced motion keeps the stacked tower.
 */
function stackAnimationCss(
  deltas: { scatter: [number, number]; connect: [number, number]; run: [number, number] }[],
): string {
  const rules: string[] = [];
  const anim: string[] = [];
  const base = `
    .agst-slab, .agst-grommet { transform-box: fill-box; transform-origin: center; }
    .agst-cable { stroke-dasharray: 1 2; }
    .agst-cable-stack { stroke-dashoffset: 0; opacity: 1; }
    .agst-cable-net, .agst-cable-run { stroke-dashoffset: 1.02; opacity: 0; }
    .agst-pulse { stroke-dasharray: 0.18 1; stroke-dashoffset: 1.36; opacity: 0; }
    .agst-plinth { opacity: 1; }
  `;

  deltas.forEach((d, i) => {
    const [sx, sy] = d.scatter;
    const [cx, cy] = d.connect;
    const [rx, ry] = d.run;
    const enter = 8 + i * 3.2;
    rules.push(`@keyframes agst-slab-${i} {
      0% { opacity: 1; transform: translate(${rx}px, ${ry}px) scale(0.78); }
      6% { opacity: 0.9; transform: translate(${sx}px, ${sy - 28}px) scale(0.92); animation-timing-function: ${EASE_ENTER}; }
      ${enter}% { opacity: 0.9; transform: translate(${sx}px, ${sy - 40}px) scale(0.92); animation-timing-function: ${EASE_ENTER}; }
      ${enter + 7}% { opacity: 1; transform: translate(0px, 2px) scale(1); }
      22% { transform: translate(0px, 0px) scale(1); }
      34% { transform: translate(0px, 0px) scale(1); animation-timing-function: ${EASE_MOVE}; }
      46% { transform: translate(${cx}px, ${cy}px) scale(0.56); }
      64% { transform: translate(${cx}px, ${cy}px) scale(0.56); animation-timing-function: ${EASE_MOVE}; }
      78% { transform: translate(${rx}px, ${ry}px) scale(0.78); }
      100% { opacity: 1; transform: translate(${rx}px, ${ry}px) scale(0.78); }
    }`);
    anim.push(`.agst-slab-${i} { animation: agst-slab-${i} var(--stack-cycle) linear infinite; }`);

    rules.push(`@keyframes agst-grommet-${i} {
      0% { opacity: 1; transform: scale(1); }
      6%, 30% { opacity: 0.25; transform: scale(1); }
      ${46 + i}% { opacity: 0.25; transform: scale(1); animation-timing-function: ${EASE_ENTER}; }
      ${49 + i}% { opacity: 1; transform: scale(1.45); }
      ${53 + i}% { transform: scale(1); }
      78% { transform: scale(1); }
      ${82 + i * 2}% { transform: scale(1.35); }
      ${86 + i * 2}% { transform: scale(1); }
      100% { opacity: 1; transform: scale(1); }
    }`);
    anim.push(`.agst-grommet-${i} { animation: agst-grommet-${i} var(--stack-cycle) linear infinite; }`);
  });

  rules.push(`@keyframes agst-plinth {
    0%, 8% { opacity: 0; }
    20%, 34% { opacity: 1; }
    46%, 100% { opacity: 0; }
  }`);
  anim.push(`.agst-plinth { animation: agst-plinth var(--stack-cycle) linear infinite; }`);

  rules.push(`@keyframes agst-cable-stack {
    0%, 16% { stroke-dashoffset: 1.02; opacity: 0; }
    20% { stroke-dashoffset: 1.02; opacity: 1; }
    30% { stroke-dashoffset: 0; opacity: 1; }
    34% { stroke-dashoffset: 0; opacity: 1; }
    42%, 100% { stroke-dashoffset: 0; opacity: 0; }
  }`);
  anim.push(`.agst-cable-stack { animation: agst-cable-stack var(--stack-cycle) linear infinite; }`);

  rules.push(`@keyframes agst-cable-net {
    0%, 44% { stroke-dashoffset: 1.02; opacity: 0; }
    48% { stroke-dashoffset: 1.02; opacity: 1; }
    58% { stroke-dashoffset: 0; opacity: 1; }
    64% { stroke-dashoffset: 0; opacity: 1; }
    72%, 100% { stroke-dashoffset: 0; opacity: 0; }
  }`);
  anim.push(`.agst-cable-net { animation: agst-cable-net var(--stack-cycle) linear infinite; }`);

  rules.push(`@keyframes agst-cable-run {
    0% { stroke-dashoffset: 0; opacity: 1; }
    6% { stroke-dashoffset: 0; opacity: 0; }
    76% { stroke-dashoffset: 1.02; opacity: 0; }
    80% { stroke-dashoffset: 1.02; opacity: 1; }
    90% { stroke-dashoffset: 0; opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: 1; }
  }`);
  anim.push(`.agst-cable-run { animation: agst-cable-run var(--stack-cycle) linear infinite; }`);

  rules.push(`@keyframes agst-pulse {
    0%, 79.9% { opacity: 0; stroke-dashoffset: 1.36; }
    80% { opacity: 1; stroke-dashoffset: 1.36; }
    90% { opacity: 1; stroke-dashoffset: 0; }
    90.1%, 92.9% { opacity: 0; stroke-dashoffset: 1.36; }
    93% { opacity: 1; stroke-dashoffset: 1.36; }
    99% { opacity: 1; stroke-dashoffset: 0; }
    99.1%, 100% { opacity: 0; stroke-dashoffset: 0; }
  }`);
  anim.push(`.agst-pulse { animation: agst-pulse var(--stack-cycle) linear infinite; }`);

  return `${base}\n${rules.join("\n")}\n${MOTION_OK} {\n${anim.join("\n")}\n}`;
}

export function StackSculpture({ className }: { className?: string }) {
  const iso: Iso = { ox: 700, oy: 500, s: 160 };
  const stacked: Pose[] = [
    { x: 0.15, y: 0.15, z: 0.2 },
    { x: 0.15, y: 0.15, z: 0.7 },
    { x: 0.15, y: 0.15, z: 1.2 },
    { x: 0.15, y: 0.15, z: 1.7 },
    { x: 0.15, y: 0.15, z: 2.2 },
  ];
  // Loose cloud — compose starts here.
  const scatter: Pose[] = [
    { x: -0.85, y: 1.05, z: 0.9 },
    { x: 1.35, y: -0.55, z: 1.7 },
    { x: -0.7, y: -0.8, z: 2.5 },
    { x: 1.2, y: 1.1, z: 0.35 },
    { x: 0.15, y: -1.2, z: 2.9 },
  ];
  // Flat plus — connect is a board, not a sheared tower.
  const connect: Pose[] = [
    { x: 0.15, y: 1.75, z: 0.4 },
    { x: 1.75, y: 0.15, z: 0.55 },
    { x: 0.15, y: 0.15, z: 0.7 },
    { x: -1.15, y: 0.2, z: 0.85 },
    { x: 0.15, y: -1.45, z: 1.0 },
  ];
  // Interlocking brick — run is a compact engine.
  const run: Pose[] = [
    { x: 0.5, y: 0.45, z: 0.2 },
    { x: -0.3, y: 0.5, z: 0.55 },
    { x: 0.45, y: -0.25, z: 0.95 },
    { x: -0.25, y: 0.05, z: 1.3 },
    { x: 0.2, y: -0.4, z: 1.65 },
  ];

  const deltas = stacked.map((home, i) => ({
    scatter: screenDelta(iso, home, scatter[i]),
    connect: screenDelta(iso, home, connect[i]),
    run: screenDelta(iso, home, run[i]),
  }));

  const grommetAt = (pose: Pose): [number, number] =>
    project(iso, pose.x + 1.25, pose.y + 0.75, pose.z + 0.18);

  const stackedGrommets = stacked.map((p) => grommetAt(p));
  const connectGrommets = connect.map((p) => grommetAt(p));
  const runGrommets = run.map((p) => grommetAt(p));

  const stackBottom = project(iso, 2.5, 1.55, -0.2);
  const stackTop = project(iso, 2.35, 1.55, 2.6);
  const stackPath = [
    `M ${stackBottom[0].toFixed(1)} ${stackBottom[1].toFixed(1)}`,
    ...stackedGrommets.map((p) => `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`),
    `L ${stackTop[0].toFixed(1)} ${stackTop[1].toFixed(1)}`,
  ].join(" ");

  // Star from the center slab, then a ring around the four arms.
  const netPaths = [
    arcPath(connectGrommets[2], connectGrommets[0], 22),
    arcPath(connectGrommets[2], connectGrommets[1], -22),
    arcPath(connectGrommets[2], connectGrommets[3], 22),
    arcPath(connectGrommets[2], connectGrommets[4], -22),
    arcPath(connectGrommets[0], connectGrommets[1], 18),
    arcPath(connectGrommets[1], connectGrommets[4], 18),
    arcPath(connectGrommets[4], connectGrommets[3], 18),
    arcPath(connectGrommets[3], connectGrommets[0], 18),
  ];
  const runHops = [
    arcPath(runGrommets[0], runGrommets[1], 16),
    arcPath(runGrommets[1], runGrommets[2], -16),
    arcPath(runGrommets[2], runGrommets[3], 16),
    arcPath(runGrommets[3], runGrommets[4], -16),
    arcPath(runGrommets[4], runGrommets[0], 22),
  ];
  const runCircuit = runHops.join(" ");

  const baseShadow = project(iso, 1.4, 0.9, -0.35);
  const css = stackAnimationCss(deltas);
  return (
    <svg
      viewBox="0 0 1536 1024"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <defs>
        <radialGradient id="a-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="#FBFAF5" />
          <stop offset="1" stopColor="#EFEEE6" />
        </radialGradient>
        <filter id="a-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>
      <rect width="1536" height="1024" fill="url(#a-bg)" />
      <g className="agst-plinth">
        <ellipse
          cx={baseShadow[0]}
          cy={baseShadow[1] + 70}
          rx="360"
          ry="80"
          fill="#202521"
          opacity="0.16"
          filter="url(#a-blur)"
        />
        <IsoBox iso={iso} x={0} y={0} z={-0.35} w={2.8} d={1.8} h={0.28} palette={GRAPHITE} />
      </g>
      <path
        className="agst-cable agst-cable-stack"
        d={stackPath}
        pathLength={1}
        fill="none"
        stroke="#D6F268"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {stacked.map((s, i) => (
        <g key={s.z} className={`agst-slab agst-slab-${i}`}>
          <IsoBox
            iso={iso}
            x={s.x}
            y={s.y}
            z={s.z}
            w={2.5}
            d={1.5}
            h={0.18}
            palette={i % 2 === 0 ? IVORY : GRAPHITE}
          />
          <polygon
            points={box(iso, s.x + 0.3, s.y + 0.3, s.z + 0.18, 1.9, 0.14, 0.001).top}
            fill={i % 2 === 0 ? "#E2E0D6" : "#262B27"}
          />
          <polygon
            className={`agst-grommet agst-grommet-${i}`}
            points={box(iso, s.x + 1.17, s.y + 0.67, s.z + 0.18, 0.16, 0.16, 0.001).top}
            fill="#D6F268"
          />
        </g>
      ))}
      {netPaths.map((d) => (
        <path
          key={d}
          className="agst-cable agst-cable-net"
          d={d}
          pathLength={1}
          fill="none"
          stroke="#D6F268"
          strokeWidth="10"
          strokeLinecap="round"
        />
      ))}
      <path
        className="agst-cable agst-cable-run"
        d={runCircuit}
        pathLength={1}
        fill="none"
        stroke="#D6F268"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        className="agst-pulse"
        d={runCircuit}
        pathLength={1}
        fill="none"
        stroke="#F6FFCF"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <ellipse cx="520" cy="220" rx="380" ry="200" fill="#FFFFFF" opacity="0.28" filter="url(#a-blur)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Asset B — Jev routing sculpture (3:2, graphite)                     */
/* ------------------------------------------------------------------ */

export function RoutingSculpture({ className }: { className?: string }) {
  const junction = { x: 1010, y: 560 };
  const channels = [
    { from: { x: 420, y: 300 } },
    { from: { x: 380, y: 560 } },
    { from: { x: 440, y: 820 } },
  ];
  const channelPath = (from: { x: number; y: number }) =>
    `M ${from.x} ${from.y} C ${from.x + 260} ${from.y}, ${junction.x - 260} ${junction.y}, ${junction.x - 60} ${junction.y}`;
  const track = `M ${junction.x + 40} ${junction.y} C ${junction.x + 200} ${junction.y}, ${junction.x + 280} ${junction.y - 40}, 1500 ${junction.y - 60}`;
  const iso: Iso = { ox: junction.x, oy: junction.y - 40, s: 110 };
  // Requests arrive on the three channels in turn; each decision leaves on the track.
  // 2.7s per packet, channels offset by a third so there is always one in flight.
  const css = `
    .agrt-flow { stroke-dasharray: 0.16 1; stroke-dashoffset: 1.32; opacity: 0; }
    .agrt-pad { transform-box: fill-box; transform-origin: center; }
    @keyframes agrt-travel {
      0% { stroke-dashoffset: 1.32; opacity: 1; }
      100% { stroke-dashoffset: 0; opacity: 1; }
    }
    @keyframes agrt-pad {
      0%, 30% { transform: scale(1); }
      36% { transform: scale(1.12); }
      48%, 100% { transform: scale(1); }
    }
    ${MOTION_OK} {
      .agrt-flow { animation: agrt-travel 2.7s linear infinite; }
      .agrt-flow-0 { animation-delay: 0s; }
      .agrt-flow-1 { animation-delay: 0.9s; }
      .agrt-flow-2 { animation-delay: 1.8s; }
      .agrt-flow-out { animation-delay: 0.45s; }
      .agrt-pad { animation: agrt-pad 0.9s ${EASE_ENTER} infinite; }
    }
  `;
  return (
    <svg
      viewBox="0 0 1536 1024"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <defs>
        <radialGradient id="b-bg" cx="68%" cy="50%" r="75%">
          <stop offset="0" stopColor="#2C322D" />
          <stop offset="1" stopColor="#1B1F1C" />
        </radialGradient>
        <filter id="b-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <rect width="1536" height="1024" fill="url(#b-bg)" />
      {/* contact shadows */}
      {channels.map((c, i) => (
        <path
          key={`s-${i}`}
          d={channelPath(c.from)}
          fill="none"
          stroke="#0F120F"
          strokeWidth="46"
          strokeLinecap="round"
          opacity="0.55"
          transform="translate(0 26)"
          filter="url(#b-blur)"
        />
      ))}
      {/* channels: shaded body then top surface */}
      {channels.map((c, i) => (
        <g key={`c-${i}`}>
          <path
            d={channelPath(c.from)}
            fill="none"
            stroke="#C9C7BC"
            strokeWidth="40"
            strokeLinecap="round"
            transform="translate(0 10)"
          />
          <path
            d={channelPath(c.from)}
            fill="none"
            stroke="#F4F2EA"
            strokeWidth="40"
            strokeLinecap="round"
          />
          <path
            d={channelPath(c.from)}
            fill="none"
            stroke="#E5E3D9"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* packet travelling toward the junction */}
          <path
            className={`agrt-flow agrt-flow-${i}`}
            d={channelPath(c.from)}
            pathLength={1}
            fill="none"
            stroke="#333A34"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </g>
      ))}
      {/* citron track continuing forward */}
      <path
        d={track}
        fill="none"
        stroke="#0F120F"
        strokeWidth="46"
        strokeLinecap="round"
        opacity="0.55"
        transform="translate(0 26)"
        filter="url(#b-blur)"
      />
      <path d={track} fill="none" stroke="#A8C736" strokeWidth="40" strokeLinecap="round" transform="translate(0 10)" />
      <path d={track} fill="none" stroke="#D6F268" strokeWidth="40" strokeLinecap="round" />
      <path d={track} fill="none" stroke="#E4F7A0" strokeWidth="12" strokeLinecap="round" />
      {/* decision leaving on the track */}
      <path
        className="agrt-flow agrt-flow-out"
        d={track}
        pathLength={1}
        fill="none"
        stroke="#FBFFE6"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* junction block */}
      <ellipse cx={junction.x + 10} cy={junction.y + 120} rx="150" ry="40" fill="#0F120F" opacity="0.6" filter="url(#b-blur)" />
      <IsoBox iso={iso} x={-1} y={-0.9} z={-0.5} w={2} d={1.8} h={0.9} palette={GRAPHITE} />
      <polygon points={box(iso, -0.7, -0.6, 0.4, 1.4, 1.2, 0.001).top} fill="#3B433C" />
      <polygon
        className="agrt-pad"
        points={box(iso, -0.35, -0.3, 0.4, 0.7, 0.6, 0.001).top}
        fill="#D6F268"
      />
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
          <stop offset="0" stopColor="#FBFAF5" />
          <stop offset="1" stopColor="#EFEEE6" />
        </radialGradient>
        <filter id="c-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>
      <rect width="1672" height="941" fill="url(#c-bg)" />
      <ellipse cx={shadow[0]} cy={shadow[1] + 110} rx="460" ry="110" fill="#202521" opacity="0.14" filter="url(#c-blur)" />
      {/* central graphite base */}
      <IsoBox iso={iso} x={0} y={0} z={-0.2} w={3} d={2} h={0.42} palette={GRAPHITE} />
      {/* recessed citron tracks on the top face */}
      <g className="agas-track">
        <polygon points={box(iso, 0.3, 0.95, 0.22, 2.4, 0.1, 0.001).top} fill="#D6F268" />
        <polygon points={box(iso, 1.45, 0.3, 0.22, 0.1, 1.4, 0.001).top} fill="#D6F268" />
        <polygon points={box(iso, 0.3, 0.3, 0.22, 0.1, 0.75, 0.001).top} fill="#D6F268" />
        <polygon points={box(iso, 2.6, 0.95, 0.22, 0.1, 0.75, 0.001).top} fill="#D6F268" />
      </g>
      {/* docked ivory modules */}
      {modules.map((m, i) => (
        <g key={i} className="agas-float" style={{ animationDelay: `${i * 0.6}s` }}>
          <IsoBox iso={iso} {...m} palette={IVORY} />
          <polygon
            points={box(iso, m.x + 0.15, m.y + 0.15, m.z + m.h, m.w - 0.3, m.d - 0.3, 0.001).top}
            fill="#E5E3D9"
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
