import { useId, type ReactNode } from "react";
import { Icon, type IconName } from "./icon";

type MediaKind = "mic" | "image" | "phone";

const captions: Record<MediaKind, readonly string[]> = {
  mic: ["Listen", "Reason", "Speak"],
  image: ["Brief", "Generate", "Asset"],
  phone: ["Intent", "Carrier", "Status"],
};

/** Illustrative paths, not live sessions or generated customer assets. */
export function MediaDetailGraphic({ kind }: { kind: MediaKind }) {
  const id = useId();
  return (
    <div aria-hidden="true" className="mb-6 overflow-hidden rounded-[12px] border border-white/10 bg-ink">
      <svg viewBox="0 0 360 144" className="block h-auto w-full" fill="none" focusable="false">
        <defs>
          <pattern id={`${id}-grid`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#7F96BA" opacity="0.18" />
          </pattern>
          <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#343F55" />
            <stop offset="1" stopColor="#202A3E" />
          </linearGradient>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#BCD1FF" />
            <stop offset="1" stopColor="#EFF3FC" />
          </linearGradient>
        </defs>
        <path d="M0 0H360V144H0Z" fill={`url(#${id}-grid)`} />
        {kind === "mic" ? <VoicePath panel={`url(#${id}-panel)`} /> : null}
        {kind === "image" ? <ImagePath panel={`url(#${id}-panel)`} sky={`url(#${id}-sky)`} /> : null}
        {kind === "phone" ? <CallPath panel={`url(#${id}-panel)`} /> : null}
      </svg>
      <div className="grid grid-cols-3 border-t border-white/10 bg-white/[0.025] px-2 py-2.5 text-center font-mono text-[11px] text-dark-muted">
        {captions[kind].map((label) => <span key={label}>{label}</span>)}
      </div>
    </div>
  );
}

function Socket({ x, y, icon, fill, active = false }: { x: number; y: number; icon: IconName; fill: string; active?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="2" y="5" width="48" height="48" rx="13" fill="#090F1C" opacity="0.65" />
      <rect width="48" height="48" rx="13" fill={fill} stroke={active ? "#7AA3FF" : "#566683"} />
      <path d="M12 1H36" stroke={active ? "#BDD1FF" : "#71809B"} strokeLinecap="round" />
      <g transform="translate(12 12)">
        <Icon name={icon} variant="duotone" size={24} color={active ? "#D6E3FF" : "#A9BFED"} />
      </g>
      <circle cx="24" cy="48" r="2.5" fill="#121826" stroke="#7498E6" />
    </g>
  );
}

function Wave({ x, y, heights, light = false }: { x: number; y: number; heights: number[]; light?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeLinecap="round" strokeWidth="2.5">
      {heights.map((height, i) => (
        <path key={i} d={`M${i * 5} ${-height / 2}v${height}`} stroke={light ? "#A5BFFF" : "#668FF1"} opacity={0.5 + (i % 3) * 0.2} />
      ))}
    </g>
  );
}

function Rail({ children }: { children: ReactNode }) {
  return <g stroke="#6680AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">{children}</g>;
}

function VoicePath({ panel }: { panel: string }) {
  return (
    <>
      <Rail>
        <path d="M71 69H155M204 69H288" strokeDasharray="3 5" opacity="0.5" />
        <path d="M48 102V119H312V102" opacity="0.5" />
        <path d="M173 115l7 4-7 4" stroke="#94B3FF" />
      </Rail>
      <Wave x={87} y={69} heights={[8, 15, 24, 16, 36, 26, 14, 8, 18, 10, 5]} />
      <Wave x={219} y={69} heights={[7, 13, 22, 32, 22, 13, 27, 36, 19, 11, 6]} light />
      <Socket x={24} y={45} icon="mic" fill={panel} />
      <Socket x={156} y={45} icon="brain" fill="#2856BA" active />
      <Socket x={288} y={45} icon="audio" fill={panel} />
      <path d="M167 30H193M175 24H185" stroke="#6B8FDC" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="119" r="2.5" fill="#A5BFFF" />
      <circle cx="312" cy="119" r="2.5" fill="#A5BFFF" />
    </>
  );
}

function ImagePath({ panel, sky }: { panel: string; sky: string }) {
  return (
    <>
      <rect x="23" y="30" width="104" height="84" rx="9" fill={panel} stroke="#566683" />
      <g transform="translate(35 42)"><Icon name="doc" variant="duotone" size={20} color="#9BB9FB" /></g>
      <path d="M35 76H110M35 84H99M35 92H83" stroke="#7386A9" strokeWidth="3" strokeLinecap="round" />
      <Rail><path d="M127 72H175" /><path d="M170 68l5 4-5 4" stroke="#A5BFFF" /></Rail>
      <circle cx="151" cy="72" r="9" fill="#1B2943" stroke="#6A91E4" />
      <g transform="translate(145 66)"><Icon name="image" variant="duotone" size={12} color="#BDD1FF" /></g>
      <rect x="197" y="16" width="134" height="105" rx="10" fill="#202A3E" stroke="#3C4D6E" />
      <rect x="188" y="22" width="134" height="105" rx="10" fill="#293650" stroke="#627CAA" />
      <rect x="179" y="29" width="134" height="105" rx="10" fill="#DFE8FA" stroke="#B6C9F0" />
      <rect x="186" y="36" width="120" height="77" rx="5" fill={sky} />
      <circle cx="281" cy="52" r="8" fill="#FFFFFF" opacity="0.85" />
      <path d="M186 98Q213 65 248 93T306 79V113H186Z" fill="#9EB5D9" />
      <path d="M186 103Q226 84 255 102T306 92V113H186Z" fill="#526F9F" />
      <path d="M214 109V71M208 81l6 7 8-12" stroke="#314F83" strokeWidth="2" strokeLinecap="round" />
      <g fill="#EFF4FF" stroke="#C0CEED">
        <ellipse cx="214" cy="68" rx="4" ry="8" />
        <ellipse cx="214" cy="68" rx="8" ry="4" transform="rotate(30 214 68)" />
        <ellipse cx="214" cy="68" rx="8" ry="4" transform="rotate(-30 214 68)" />
      </g>
      <circle cx="214" cy="68" r="3" fill="#5B8CFF" />
      <path d="M189 124H229" stroke="#8099C3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="294" cy="124" r="3" fill="#5B8CFF" />
      <path d="M175 24h9m-9 0v9M308 24h9v9M175 130v9h9M317 130v9h-9" stroke="#82A7FF" />
    </>
  );
}

function CallPath({ panel }: { panel: string }) {
  return (
    <>
      <Rail>
        <path d="M73 67H154M206 67H287" />
        <path d="M278 63l7 4-7 4" stroke="#94B3FF" />
        <path d="M311 102V119H48V101" strokeDasharray="3 5" opacity="0.65" />
        <path d="M184 115l-7 4 7 4" stroke="#94B3FF" />
      </Rail>
      <Socket x={24} y={43} icon="phone" fill={panel} />
      <Socket x={156} y={43} icon="server" fill="#2856BA" active />
      <Socket x={288} y={43} icon="checkCircle" fill={panel} />
      <g fill="#182339" stroke="#5B7BAD">
        <circle cx="109" cy="67" r="5" /><circle cx="246" cy="67" r="5" />
      </g>
      <path d="M106 67h6M243 67h6" stroke="#A8C2FF" strokeLinecap="round" />
      <path d="M164 24c9-7 23-7 32 0M170 30c6-4 14-4 20 0" stroke="#7098EF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="180" cy="34" r="2" fill="#A8C2FF" />
      <circle cx="311" cy="119" r="2.5" fill="#A8C2FF" />
      <circle cx="48" cy="119" r="2.5" fill="#A8C2FF" />
    </>
  );
}
