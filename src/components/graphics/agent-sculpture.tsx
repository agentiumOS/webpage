import { box, CITRON, GRAPHITE, IVORY, project, type Iso } from "./iso";
import { EASE_ENTER, EASE_MOVE, IsoBox, MOTION_OK } from "./sculptures";

/* ------------------------------------------------------------------ */
/* Hero — the engine, running (5:4, transparent)                       */
/*                                                                     */
/* One agent runtime on a plinth, read as a machine:                   */
/*   tower    the model — tall and finned; its blue cap glows while    */
/*            the core is waiting on it                                */
/*   core     @agentium/core — the graphite block every track runs     */
/*            through; status light on top                             */
/*   bank     memory — a drive bay of slabs; one slides out on a read  */
/*   rail     tools — three typed blocks on a bus; the called one      */
/*            lifts off the rail                                       */
/*   gate     approval gate — a bar across the output track that has   */
/*            to lift before the reply can leave                       */
/*   tile     tracing — a scorecard whose bars light as the run lands  */
/*   sockets  your product — where the request enters the plinth and   */
/*            the reply leaves it                                      */
/* ------------------------------------------------------------------ */

type P3 = [number, number, number];
type Block = { x: number; y: number; z: number; w: number; d: number; h: number };

const fx = (n: number) => n.toFixed(1);

function path3(iso: Iso, pts: P3[]): string {
  return pts
    .map(([x, y, z], i) => {
      const [sx, sy] = project(iso, x, y, z);
      return `${i === 0 ? "M" : "L"} ${fx(sx)} ${fx(sy)}`;
    })
    .join(" ");
}

function poly3(iso: Iso, pts: P3[]): string {
  return pts.map(([x, y, z]) => project(iso, x, y, z).map(fx).join(",")).join(" ");
}

/** On-screen length of a projected polyline, in viewBox px. */
function pathLen(iso: Iso, pts: P3[]): number {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = project(iso, ...pts[i - 1]);
    const b = project(iso, ...pts[i]);
    len += Math.hypot(b[0] - a[0], b[1] - a[1]);
  }
  return len;
}

/** Screen-space offset of a 3D displacement, for CSS translate(). */
function shift(iso: Iso, dx: number, dy: number, dz: number): [number, number] {
  const a = project(iso, 0, 0, 0);
  const b = project(iso, dx, dy, dz);
  return [+(b[0] - a[0]).toFixed(1), +(b[1] - a[1]).toFixed(1)];
}

/** Rectangle lying on a vertical box face; `plane` is the fixed axis. */
function patch(iso: Iso, plane: "x" | "y", at: number, u0: number, u1: number, z0: number, z1: number): string {
  const p = (u: number, z: number): P3 => (plane === "x" ? [at, u, z] : [u, at, z]);
  return poly3(iso, [p(u0, z0), p(u1, z0), p(u1, z1), p(u0, z1)]);
}

/** Flat rectangle on a horizontal surface at height z. */
function flat(iso: Iso, x: number, y: number, z: number, w: number, d: number): string {
  return box(iso, x, y, z, w, d, 0.001).top;
}

const CYCLE = "8s";

type Signal = { name: string; from: number; to: number; len: number };

/**
 * One request through the engine, on loop (percent of CYCLE):
 *
 *    2–14   request arrives on the input track
 *   12–16   core status light comes on
 *   15–36   core consults the model tower — the cap glows twice — answer returns
 *   36–52   tool call: signal out along the bus, tool lifts off its rail, result back
 *   52–68   memory read: a slab slides out of the bank and back
 *   68–88   approval gate lifts; the reply leaves on the output track
 *   80–98   trace tile records the run, bar by bar
 *   88–94   status light dims; idle to 100
 *
 * A signal is a single dash on a `pathLength=1` path. Dash and margin are
 * fixed in px and converted per path, so every packet is the same size:
 *   dash f, gap 1+2m, offset (1+3m+2f) → (f+m)
 * keeps the dash fully off-path at both ends — no opacity toggling.
 * Everything is CSS (off main thread). Reduced motion: the engine at rest.
 */
function engineCss(signals: Signal[], slide: [number, number], toolLift: number, gateLift: number): string {
  const DASH = 48;
  const MARGIN = 12;
  const sig = signals.map(({ name, from, to, len }) => {
    const f = +(DASH / len).toFixed(4);
    const m = +(MARGIN / len).toFixed(4);
    const o1 = +(1 + 3 * m + 2 * f).toFixed(4);
    const o2 = +(f + m).toFixed(4);
    const gap = +(1 + 2 * m).toFixed(4);
    return {
      base: `.age-sig-${name} { stroke-dasharray: ${f} ${gap}; stroke-dashoffset: ${o1}; }`,
      frames: `@keyframes age-sig-${name} { 0%, ${from}% { stroke-dashoffset: ${o1}; } ${to}%, 100% { stroke-dashoffset: ${o2}; } }`,
      anim: `.age-sig-${name} { animation: age-sig-${name} ${CYCLE} linear infinite; }`,
    };
  });
  const trace = [85, 87, 89].map(
    (at, i) => `@keyframes age-trace-${i} {
      0%, ${at}% { opacity: 0.3; animation-timing-function: ${EASE_ENTER}; }
      ${at + 2}%, 94% { opacity: 1; animation-timing-function: ${EASE_ENTER}; }
      98%, 100% { opacity: 0.3; }
    }`,
  );
  return `
    ${sig.map((s) => s.base).join("\n")}
    .age-cap { transform-box: fill-box; transform-origin: center; }
    .age-glow { opacity: 0; }
    .age-status, .age-tool-light, .age-mem-light { opacity: 0.35; }
    .age-trace-0, .age-trace-1, .age-trace-2 { opacity: 0.3; }
    ${sig.map((s) => s.frames).join("\n")}
    ${trace.join("\n")}
    @keyframes age-status {
      0%, 12% { opacity: 0.35; animation-timing-function: ${EASE_ENTER}; }
      16%, 88% { opacity: 1; animation-timing-function: ${EASE_ENTER}; }
      94%, 100% { opacity: 0.35; }
    }
    @keyframes age-glow {
      0%, 19% { opacity: 0; animation-timing-function: ${EASE_ENTER}; }
      22% { opacity: 0.9; animation-timing-function: ${EASE_ENTER}; }
      25% { opacity: 0.3; animation-timing-function: ${EASE_ENTER}; }
      28% { opacity: 0.9; animation-timing-function: ${EASE_ENTER}; }
      32%, 100% { opacity: 0; }
    }
    @keyframes age-cap {
      0%, 19% { transform: scale(1); animation-timing-function: ${EASE_ENTER}; }
      22% { transform: scale(1.16); animation-timing-function: ${EASE_ENTER}; }
      25% { transform: scale(1); animation-timing-function: ${EASE_ENTER}; }
      28% { transform: scale(1.16); animation-timing-function: ${EASE_ENTER}; }
      32%, 100% { transform: scale(1); }
    }
    @keyframes age-tool-lift {
      0%, 41% { transform: translateY(0px); animation-timing-function: ${EASE_MOVE}; }
      45%, 49% { transform: translateY(-${toolLift}px); animation-timing-function: ${EASE_MOVE}; }
      53%, 100% { transform: translateY(0px); }
    }
    @keyframes age-tool-light {
      0%, 41% { opacity: 0.35; animation-timing-function: ${EASE_ENTER}; }
      44%, 50% { opacity: 1; animation-timing-function: ${EASE_ENTER}; }
      54%, 100% { opacity: 0.35; }
    }
    @keyframes age-mem-slide {
      0%, 57% { transform: translate(0px, 0px); animation-timing-function: ${EASE_MOVE}; }
      61%, 65% { transform: translate(${slide[0]}px, ${slide[1]}px); animation-timing-function: ${EASE_MOVE}; }
      69%, 100% { transform: translate(0px, 0px); }
    }
    @keyframes age-mem-light {
      0%, 57% { opacity: 0.35; animation-timing-function: ${EASE_ENTER}; }
      60%, 66% { opacity: 1; animation-timing-function: ${EASE_ENTER}; }
      70%, 100% { opacity: 0.35; }
    }
    @keyframes age-gate {
      0%, 68% { transform: translateY(0px); animation-timing-function: ${EASE_MOVE}; }
      72%, 84% { transform: translateY(-${gateLift}px); animation-timing-function: ${EASE_MOVE}; }
      88%, 100% { transform: translateY(0px); }
    }
    ${MOTION_OK} {
      ${sig.map((s) => s.anim).join("\n")}
      .age-status { animation: age-status ${CYCLE} linear infinite; }
      .age-glow { animation: age-glow ${CYCLE} linear infinite; }
      .age-cap { animation: age-cap ${CYCLE} linear infinite; }
      .age-tool-lift { animation: age-tool-lift ${CYCLE} linear infinite; }
      .age-tool-light { animation: age-tool-light ${CYCLE} linear infinite; }
      .age-mem-slide { animation: age-mem-slide ${CYCLE} linear infinite; }
      .age-mem-light { animation: age-mem-light ${CYCLE} linear infinite; }
      .age-gate { animation: age-gate ${CYCLE} linear infinite; }
      .age-trace-0 { animation: age-trace-0 ${CYCLE} linear infinite; }
      .age-trace-1 { animation: age-trace-1 ${CYCLE} linear infinite; }
      .age-trace-2 { animation: age-trace-2 ${CYCLE} linear infinite; }
    }
  `;
}

const INK = "#121826";
const WELL = "#1E2534";
const SLOT = "#0F1420";
const RECESS = "#D4DCEC";
const GROOVE = "#D2D9E6";
const GROOVE_EDGE = "#B3BDCE";
const BLUE = "#2F6BFF";
const BLUE_SOFT = "#5B8CFF";

export function AgentSculpture({ className }: { className?: string }) {
  const iso: Iso = { ox: 532, oy: 292, s: 196 };
  const s = iso.s;
  /** The request track runs along this y, straight through the core. */
  const TY = 1.3;

  const plinth: Block = { x: 0, y: 0, z: -0.24, w: 3.4, d: 2.6, h: 0.24 };
  const core: Block = { x: 1.35, y: 0.85, z: 0, w: 0.9, d: 0.9, h: 0.7 };
  const tower: Block = { x: 0.35, y: 0.25, z: 0, w: 0.6, d: 0.6, h: 1.5 };
  const cap: Block = { x: tower.x + 0.13, y: tower.y + 0.13, z: tower.h, w: 0.34, d: 0.34, h: 0.08 };
  const bank = { x: 2.45, y: 0.3, w: 0.7, d: 0.7, slab: 0.16, gap: 0.04, count: 4, active: 2 };
  const rail: Block = { x: 1.28, y: 2.1, z: 0, w: 1.04, d: 0.36, h: 0.05 };
  const tools: Block[] = [1.33, 1.67, 2.01].map((x, i) => ({
    x,
    y: 2.13,
    z: rail.h,
    w: 0.26,
    d: 0.3,
    h: [0.46, 0.36, 0.54][i],
  }));
  /** The tool the run calls: the far one, so the signal is seen travelling the bus. */
  const activeTool = 0;
  const tile: Block = { x: 0.3, y: 1.75, z: 0, w: 0.7, d: 0.45, h: 0.08 };
  const traceBars = [0.26, 0.16, 0.22].map((len, i) => ({ x: 0.42 + i * 0.15, len }));
  const gateX = 2.95;
  const posts: Block[] = [
    { x: gateX, y: TY - 0.29, z: 0, w: 0.1, d: 0.1, h: 0.56 },
    { x: gateX, y: TY + 0.19, z: 0, w: 0.1, d: 0.1, h: 0.56 },
  ];
  const gateBar: Block = { x: gateX + 0.01, y: TY - 0.19, z: 0.02, w: 0.08, d: 0.38, h: 0.06 };
  const socketIn: Block = { x: 0, y: TY - 0.18, z: 0, w: 0.16, d: 0.36, h: 0.12 };
  const socketOut: Block = { x: plinth.w - 0.16, y: TY - 0.18, z: 0, w: 0.16, d: 0.36, h: 0.12 };

  const coreBack = core.y;
  const coreFront = core.y + core.d;
  const busY = 1.95;
  const toolCx = (t: Block) => t.x + t.w / 2;

  /** Signal routes, in the direction the packet travels on the way out. */
  const routes: Record<string, P3[]> = {
    in: [
      [socketIn.x + socketIn.w, TY, 0],
      [core.x, TY, 0],
    ],
    out: [
      [core.x + core.w, TY, 0],
      [socketOut.x, TY, 0],
    ],
    think: [
      [1.6, coreBack, 0],
      [1.6, 0.55, 0],
      [tower.x + tower.w, 0.55, 0],
    ],
    mem: [
      [2.0, coreBack, 0],
      [2.0, 0.65, 0],
      [bank.x, 0.65, 0],
    ],
    tool: [
      [toolCx(tools[1]), coreFront, 0],
      [toolCx(tools[1]), busY, 0],
      [toolCx(tools[activeTool]), busY, 0],
      [toolCx(tools[activeTool]), tools[activeTool].y, 0],
    ],
    trace: [
      [1.5, coreFront, 0],
      [1.5, 1.95, 0],
      [tile.x + tile.w, 1.95, 0],
    ],
  };
  const back = (p: P3[]) => [...p].reverse();
  /** Static grooves: every route, plus the tool bus and its three stubs. */
  const grooves: P3[][] = [
    ...Object.values(routes),
    [
      [toolCx(tools[0]), busY, 0],
      [toolCx(tools[2]), busY, 0],
    ],
    ...tools.map<P3[]>((t) => [
      [toolCx(t), busY, 0],
      [toolCx(t), t.y, 0],
    ]),
  ];

  const signals: Signal[] = [
    { name: "in", from: 2, to: 14, len: pathLen(iso, routes.in) },
    { name: "think-out", from: 15, to: 21, len: pathLen(iso, routes.think) },
    { name: "think-back", from: 30, to: 36, len: pathLen(iso, routes.think) },
    { name: "tool-out", from: 36, to: 42, len: pathLen(iso, routes.tool) },
    { name: "tool-back", from: 46, to: 52, len: pathLen(iso, routes.tool) },
    { name: "mem-out", from: 52, to: 58, len: pathLen(iso, routes.mem) },
    { name: "mem-back", from: 62, to: 68, len: pathLen(iso, routes.mem) },
    { name: "out", from: 70, to: 84, len: pathLen(iso, routes.out) },
    { name: "trace", from: 80, to: 86, len: pathLen(iso, routes.trace) },
  ];
  const signalPaths: Record<string, string> = {
    in: path3(iso, routes.in),
    "think-out": path3(iso, routes.think),
    "think-back": path3(iso, back(routes.think)),
    "tool-out": path3(iso, routes.tool),
    "tool-back": path3(iso, back(routes.tool)),
    "mem-out": path3(iso, routes.mem),
    "mem-back": path3(iso, back(routes.mem)),
    out: path3(iso, routes.out),
    trace: path3(iso, routes.trace),
  };

  const slide = shift(iso, 0.22, 0, 0);
  const toolLift = -shift(iso, 0, 0, 0.11)[1];
  const gateLift = -shift(iso, 0, 0, 0.3)[1];
  const css = engineCss(signals, slide, toolLift, gateLift);

  const bankH = bank.count * bank.slab + (bank.count - 1) * bank.gap;
  const bankBlock: Block = { x: bank.x, y: bank.y, z: 0, w: bank.w, d: bank.d, h: bankH };
  const plinthTop = flat(iso, plinth.x, plinth.y, 0, plinth.w, plinth.d);
  const ground = project(iso, plinth.w / 2, plinth.d / 2, plinth.z);
  const capTop = project(iso, cap.x + cap.w / 2, cap.y + cap.d / 2, cap.z + cap.h);
  const fins = Array.from({ length: 8 }, (_, i) => 0.2 + i * 0.15);
  const vents = Array.from({ length: 4 }, (_, i) => 0.2 + i * 0.11);
  const screws: P3[] = [
    [0.14, 0.14, 0],
    [plinth.w - 0.14, 0.14, 0],
    [0.14, plinth.d - 0.14, 0],
    [plinth.w - 0.14, plinth.d - 0.14, 0],
  ];
  const contact = (b: Block, rx: number, ry: number) => {
    const c = project(iso, b.x + b.w / 2, b.y + b.d / 2, 0);
    return <ellipse cx={c[0]} cy={c[1] + 4} rx={rx * s} ry={ry * s} fill={INK} opacity="0.1" filter="url(#age-soft)" />;
  };

  return (
    <svg viewBox="0 0 1200 960" className={className} role="presentation" aria-hidden="true" focusable="false">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <defs>
        <filter id="age-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="age-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="age-bloom" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <linearGradient id="age-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="age-top">
          <polygon points={plinthTop} />
        </clipPath>
      </defs>

      {/* ground shadow */}
      <ellipse cx={ground[0]} cy={ground[1] + 44} rx={2.6 * s} ry={0.4 * s} fill={INK} opacity="0.15" filter="url(#age-blur)" />

      {/* plinth: light from the upper left, four screws */}
      <IsoBox iso={iso} {...plinth} palette={IVORY} />
      <polygon points={plinthTop} fill="url(#age-sheen)" />
      {screws.map((p) => {
        const c = project(iso, ...p);
        return <ellipse key={p.join()} cx={c[0]} cy={c[1]} rx="4" ry="2.4" fill={IVORY.right} stroke={IVORY.edge} strokeWidth="1" />;
      })}
      <g clipPath="url(#age-top)">
        {contact(tower, 0.42, 0.2)}
        {contact(core, 0.62, 0.3)}
        {contact(bankBlock, 0.48, 0.23)}
      </g>

      {/* recessed tracks etched into the plinth */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {grooves.map((pts) => {
          const d = path3(iso, pts);
          return (
            <g key={d}>
              <path d={d} stroke={GROOVE_EDGE} strokeWidth="10" transform="translate(0 -1.6)" />
              <path d={d} stroke={GROOVE} strokeWidth="10" />
            </g>
          );
        })}
      </g>

      {/* signals: one packet per route, drawn under the modules so it enters and leaves them */}
      <g fill="none" stroke={BLUE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {signals.map((sg) => (
          <path key={sg.name} className={`age-sig-${sg.name}`} d={signalPaths[sg.name]} pathLength={1} />
        ))}
      </g>

      {/* model tower: heatsink fins, recessed top, blue cap that glows while thinking */}
      <g>
        <IsoBox iso={iso} {...tower} palette={IVORY} />
        {fins.map((z) => (
          <path
            key={z}
            d={path3(iso, [
              [tower.x, tower.y + tower.d, z],
              [tower.x + tower.w, tower.y + tower.d, z],
              [tower.x + tower.w, tower.y, z],
            ])}
            fill="none"
            stroke={IVORY.edge}
            strokeWidth="1.5"
          />
        ))}
        <polygon points={flat(iso, tower.x + 0.08, tower.y + 0.08, tower.h, tower.w - 0.16, tower.d - 0.16)} fill={RECESS} />
        <ellipse className="age-glow" cx={capTop[0]} cy={capTop[1]} rx={0.36 * s} ry={0.18 * s} fill={BLUE_SOFT} filter="url(#age-bloom)" />
        <g className="age-cap">
          <IsoBox iso={iso} {...cap} palette={CITRON} />
        </g>
      </g>

      {/* input socket on the back-left edge */}
      <g>
        <IsoBox iso={iso} {...socketIn} palette={IVORY} />
        <polygon points={patch(iso, "x", socketIn.x + socketIn.w, TY - 0.07, TY + 0.07, 0.02, 0.1)} fill={SLOT} />
      </g>

      {/* trace tile: three bars that light once the run lands */}
      <g>
        <IsoBox iso={iso} {...tile} palette={IVORY} />
        <polygon points={flat(iso, tile.x + 0.06, tile.y + 0.06, tile.h, tile.w - 0.12, tile.d - 0.12)} fill={RECESS} />
        {traceBars.map((b, i) => (
          <g key={b.x} className={`age-trace-${i}`}>
            <IsoBox iso={iso} x={b.x} y={tile.y + 0.1} z={tile.h} w={0.08} d={b.len} h={0.03} palette={CITRON} />
          </g>
        ))}
      </g>

      {/* core: recessed well, status light, vents on the right, ports where tracks meet it */}
      <g>
        <IsoBox iso={iso} {...core} palette={GRAPHITE} />
        <polygon points={flat(iso, core.x + 0.1, core.y + 0.1, core.h, core.w - 0.2, core.d - 0.2)} fill={WELL} />
        {vents.map((z) => (
          <path
            key={z}
            d={path3(iso, [
              [core.x + core.w, core.y + 0.14, z],
              [core.x + core.w, core.y + core.d - 0.14, z],
            ])}
            fill="none"
            stroke={GRAPHITE.edge}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <polygon points={patch(iso, "x", core.x + core.w, TY - 0.07, TY + 0.07, 0.02, 0.14)} fill={SLOT} />
        <polygon points={patch(iso, "y", coreFront, 1.43, 1.57, 0.02, 0.14)} fill={SLOT} />
        <polygon points={patch(iso, "y", coreFront, 1.73, 1.87, 0.02, 0.14)} fill={SLOT} />
        <polygon
          className="age-status"
          points={flat(iso, core.x + core.w / 2 - 0.08, core.y + core.d / 2 - 0.08, core.h, 0.16, 0.16)}
          fill={BLUE}
        />
      </g>

      {/* memory bank: dark spine, four slabs; the third slides out on a read */}
      <g>
        <IsoBox iso={iso} x={bank.x + 0.04} y={bank.y + 0.04} z={0} w={bank.w - 0.08} d={bank.d - 0.08} h={bankH} palette={GRAPHITE} />
        {Array.from({ length: bank.count }, (_, i) => {
          const z = i * (bank.slab + bank.gap);
          const active = i === bank.active;
          const last = i === bank.count - 1;
          return (
            <g key={i} className={active ? "age-mem-slide" : undefined}>
              <IsoBox iso={iso} x={bank.x} y={bank.y} z={z} w={bank.w} d={bank.d} h={bank.slab} palette={IVORY} />
              {last ? (
                <polygon points={flat(iso, bank.x + 0.07, bank.y + 0.07, z + bank.slab, bank.w - 0.14, bank.d - 0.14)} fill={RECESS} />
              ) : null}
              <polygon
                className={active ? "age-mem-light" : undefined}
                points={patch(iso, "y", bank.y + bank.d, bank.x + 0.25, bank.x + 0.45, z + 0.05, z + 0.11)}
                fill={active ? BLUE : IVORY.edge}
              />
            </g>
          );
        })}
      </g>

      {/* tool rail: three typed tools on a bus; the called one lifts */}
      <g>
        <IsoBox iso={iso} {...rail} palette={GRAPHITE} />
        {tools.map((t, i) => {
          const active = i === activeTool;
          return (
            <g key={t.x} className={active ? "age-tool-lift" : undefined}>
              <IsoBox iso={iso} {...t} palette={IVORY} />
              <polygon points={flat(iso, t.x + 0.04, t.y + 0.04, t.z + t.h, t.w - 0.08, t.d - 0.08)} fill={RECESS} />
              <polygon points={patch(iso, "y", t.y + t.d, t.x + 0.05, t.x + 0.19, t.z + 0.06, t.z + 0.1)} fill={IVORY.edge} />
              <polygon
                className={active ? "age-tool-light" : undefined}
                points={flat(iso, toolCx(t) - 0.04, t.y + t.d / 2 - 0.04, t.z + t.h, 0.08, 0.08)}
                fill={BLUE}
                opacity={active ? undefined : 0.35}
              />
            </g>
          );
        })}
      </g>

      {/* approval gate: bar across the output track, lifts to let the reply through */}
      <g>
        <IsoBox iso={iso} {...posts[0]} palette={IVORY} />
        <g className="age-gate">
          <IsoBox iso={iso} {...gateBar} palette={CITRON} />
        </g>
        <IsoBox iso={iso} {...posts[1]} palette={IVORY} />
      </g>

      {/* output socket on the front-right edge */}
      <IsoBox iso={iso} {...socketOut} palette={IVORY} />
    </svg>
  );
}
