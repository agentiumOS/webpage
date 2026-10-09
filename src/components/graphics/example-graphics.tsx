"use client";

import { useId, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/graphics/icon";

/* Authored product schematics, not screenshots or live results. Every visible
   state is complete without animation; per-instance IDs keep SVG paint local. */
function Scene({ children }: { children: ReactNode }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${id}-wash`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F4F7FC" />
          <stop offset="1" stopColor="#E3EAF6" />
        </linearGradient>
        <pattern
          id={`${id}-grid`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.7" fill="#BBC8DE" />
        </pattern>
        <filter
          id={`${id}-shadow`}
          x="-20%"
          y="-20%"
          width="150%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="7"
            floodColor="#253B66"
            floodOpacity="0.09"
          />
        </filter>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-wash)`} />
      <rect width="400" height="300" fill={`url(#${id}-grid)`} opacity="0.65" />
      <g filter={`url(#${id}-shadow)`}>{children}</g>
    </svg>
  );
}

function Glyph({
  name,
  x,
  y,
  dark = false,
}: {
  name: IconName;
  x: number;
  y: number;
  dark?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="30"
        height="30"
        rx="8"
        fill={dark ? "#263754" : "#EDF2FF"}
        stroke={dark ? "#354969" : "#D9E3FB"}
      />
      <svg x={x + 6} y={y + 6} width="18" height="18" viewBox="0 0 24 24">
        <Icon
          name={name}
          variant="duotone"
          color={dark ? "#B8CCFF" : "#2F6BFF"}
          size={24}
        />
      </svg>
    </g>
  );
}

function Text({
  x,
  y,
  children,
  muted = false,
  size = 12,
  light = false,
  mono = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  muted?: boolean;
  size?: number;
  light?: boolean;
  mono?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={light ? "#EAF0FF" : muted ? "#5A6578" : "#121826"}
      fontFamily={
        mono ? "var(--font-mono), monospace" : "var(--font-sans), sans-serif"
      }
    >
      {children}
    </text>
  );
}

export function SupportGraphic() {
  return (
    <Scene>
      {/* The ticket and its source context feed a distinct, unsent draft. */}
      <rect
        x="30"
        y="30"
        width="274"
        height="161"
        rx="13"
        fill="white"
        stroke="#CCD5E5"
      />
      <path d="M30 73H304" stroke="#E1E6EF" />
      <Glyph name="invoice" x={42} y={37} />
      <Text x={82} y={56}>
        Customer request
      </Text>
      <rect x="243" y="43" width="46" height="19" rx="5" fill="#EEF2F9" />
      <Text x={252} y={56} size={10} mono>
        A104
      </Text>
      <Text x={46} y={99} size={14}>
        Can I return this order?
      </Text>
      <Text x={46} y={122} muted>
        It arrived earlier this week.
      </Text>
      <path d="M46 139H288" stroke="#E8ECF4" />
      <circle cx="51" cy="161" r="4" fill="#2F6BFF" />
      <Text x={62} y={165} size={11} muted>
        Context: order + return policy
      </Text>
      <path
        d="M70 191V222Q70 230 78 230H104"
        fill="none"
        stroke="#8FA7D2"
        strokeWidth="1.5"
      />
      <circle cx="70" cy="191" r="3" fill="white" stroke="#8FA7D2" />
      <path
        d="m98 226 6 4-6 4"
        fill="none"
        stroke="#8FA7D2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="108"
        y="181"
        width="261"
        height="94"
        rx="13"
        fill="#121E34"
        stroke="#34425C"
      />
      <Glyph name="note" x={121} y={193} dark />
      <Text x={161} y={212} size={13} light>
        Reply draft
      </Text>
      <rect x="294" y="197" width="60" height="20" rx="5" fill="#263754" />
      <Text x={305} y={211} size={10} light>
        Review
      </Text>
      <Text x={123} y={241} size={12} light>
        Your order is within the return window.
      </Text>
      <Text x={123} y={260} size={11} light>
        Ready for your application to review.
      </Text>
    </Scene>
  );
}

export function ResearchGraphic() {
  return (
    <Scene>
      {/* Distinct evidence sources merge into a cited working brief. */}
      <rect
        x="29"
        y="33"
        width="144"
        height="139"
        rx="12"
        fill="#F9FBFF"
        stroke="#CCD5E5"
      />
      <rect
        x="38"
        y="25"
        width="144"
        height="139"
        rx="12"
        fill="white"
        stroke="#CCD5E5"
      />
      <Glyph name="file" x={51} y={39} />
      <Text x={91} y={58} size={12}>
        Sources
      </Text>
      <path d="M51 80H168" stroke="#E0E6F0" />
      <Text x={52} y={103} size={11}>
        01 Product guide
      </Text>
      <Text x={52} y={125} size={11}>
        02 Release notes
      </Text>
      <Text x={52} y={147} size={11}>
        03 Reference docs
      </Text>
      <path
        d="M182 99H220Q229 99 229 108V130"
        fill="none"
        stroke="#8FA7D2"
        strokeWidth="1.5"
      />
      <circle cx="182" cy="99" r="3" fill="white" stroke="#8FA7D2" />
      <rect x="262" y="34" width="103" height="49" rx="12" fill="#121E34" />
      <Glyph name="search" x={273} y={43} dark />
      <Text x={311} y={62} size={11} light>
        Review
      </Text>
      <path
        d="M314 83V116Q314 127 303 127H271"
        fill="none"
        stroke="#8FA7D2"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <rect
        x="151"
        y="127"
        width="211"
        height="151"
        rx="13"
        fill="white"
        stroke="#CCD5E5"
      />
      <Glyph name="bookOpen" x={165} y={140} />
      <Text x={205} y={159} size={14}>
        Research brief
      </Text>
      <path d="M166 182H347" stroke="#E0E6F0" />
      <rect x="166" y="195" width="4" height="43" rx="2" fill="#2F6BFF" />
      <Text x={180} y={207} size={12}>
        Findings grounded in
      </Text>
      <Text x={180} y={226} size={12}>
        your source material.
      </Text>
      <rect x="166" y="245" width="58" height="20" rx="5" fill="#EDF2FF" />
      <Text x={174} y={259} size={10} mono>
        [1] [2]
      </Text>
      <Text x={234} y={259} size={10} muted>
        Sources attached
      </Text>
      <circle cx="77" cy="224" r="24" fill="#EDF2FF" stroke="#C8D7F6" />
      <svg x="66" y="213" width="22" height="22" viewBox="0 0 24 24">
        <Icon name="gitBranch" variant="duotone" color="#2F6BFF" size={24} />
      </svg>
      <path d="M77 172V198M101 224H151" stroke="#A4B6D4" fill="none" />
    </Scene>
  );
}

export function VoiceBrowserGraphic() {
  const bars = [8, 16, 24, 14, 34, 45, 28, 16, 37, 23, 12, 20];
  return (
    <Scene>
      {/* A voice session is connected to browser tools by the host application. */}
      <rect
        x="28"
        y="31"
        width="228"
        height="126"
        rx="13"
        fill="#121E34"
        stroke="#34425C"
      />
      <Glyph name="mic" x={41} y={43} dark />
      <Text x={81} y={62} size={13} light>
        Voice session
      </Text>
      <circle cx="233" cy="58" r="4" fill="#84AAFF" />
      <path d="M43 113H239" stroke="#314464" />
      {bars.map((height, i) => (
        <rect
          key={i}
          x={52 + i * 15}
          y={111 - height / 2}
          width="5"
          height={height}
          rx="2.5"
          fill={i > 3 && i < 8 ? "#A9C3FF" : "#627FAE"}
        />
      ))}
      <path
        d="M256 94H331Q341 94 341 104V135"
        fill="none"
        stroke="#8FA7D2"
        strokeWidth="1.5"
      />
      <path
        d="m337 129 4 6 4-6"
        stroke="#8FA7D2"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="124"
        y="137"
        width="244"
        height="139"
        rx="12"
        fill="white"
        stroke="#CCD5E5"
      />
      <path d="M124 173H368" stroke="#E0E6F0" />
      <circle cx="139" cy="155" r="3" fill="#CAD4E5" />
      <circle cx="149" cy="155" r="3" fill="#CAD4E5" />
      <circle cx="159" cy="155" r="3" fill="#CAD4E5" />
      <rect x="174" y="147" width="144" height="17" rx="5" fill="#F0F3F9" />
      <Text x={187} y={159} size={10}>
        Browser tools
      </Text>
      <Glyph name="browser" x={140} y={187} />
      <Text x={180} y={199} size={12}>
        Read the page
      </Text>
      <Text x={180} y={215} size={10} muted>
        Return structured context
      </Text>
      <path d="M140 230H352" stroke="#E0E6F0" />
      <rect x="140" y="241" width="104" height="21" rx="6" fill="#EDF2FF" />
      <Text x={151} y={255} size={10} mono>
        page content
      </Text>
      <Text x={259} y={255} size={10} muted>
        → Agent context
      </Text>
      <path
        d="M79 157V223Q79 234 90 234H112"
        fill="none"
        stroke="#8FA7D2"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <rect
        x="29"
        y="183"
        width="68"
        height="26"
        rx="8"
        fill="#F9FBFF"
        stroke="#CCD5E5"
      />
      <Text x={42} y={200} size={10}>
        Your app
      </Text>
    </Scene>
  );
}
