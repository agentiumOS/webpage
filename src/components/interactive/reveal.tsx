"use client";

import * as React from "react";
import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion, type Variants } from "motion/react";

/**
 * In-view reveal primitives (marketing surfaces only; fire once).
 *
 * - `Reveal`      one element that springs into place when it enters the viewport.
 * - `RevealGroup` a container whose `RevealItem` children stagger in (60ms apart).
 *
 * Headings (`h1`–`h3`, or `kind="heading"`) fade in from the left and unfurl
 * with a slight scaleX spring, as if the line had been compacted.
 * No clip-path — a leftover inset clip was cutting Faculty Glyphic’s ink.
 * Other elements keep the softer fade-up.
 *
 * Full `transform` strings (not `y`/`scale` shorthands) so Motion can hand the
 * animation to the compositor. `MotionConfig reducedMotion="user"` plus an
 * explicit reduced-motion branch: headings keep only the opacity fade.
 */

/** Soft fade-up for cards, leads, chrome. */
const SPRING = { type: "spring", duration: 0.55, bounce: 0.2 } as const;

/** Heading unfurl: a little spring, almost no bounce. */
const HEADING_SPRING = { type: "spring", duration: 0.7, bounce: 0.14 } as const;

/** Codebase `--ease-enter`. */
const EASE_ENTER = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" } as const;

const SOFT_HIDDEN = { opacity: 0, transform: "translateY(24px) scale(0.98)" };
const SOFT_SHOWN = { opacity: 1, transform: "translateY(0px) scale(1)" };

const HEADING_HIDDEN = {
  opacity: 0,
  transform: "translateX(-0.4em) scaleX(0.97)",
};
const HEADING_SHOWN = {
  opacity: 1,
  transform: "translateX(0px) scaleX(1)",
};

type Tag =
  | "div"
  | "section"
  | "article"
  | "ul"
  | "ol"
  | "li"
  | "figure"
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "span";

type Kind = "soft" | "heading";

type BaseProps = {
  as?: Tag;
  kind?: Kind;
  id?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

type MotionEl = React.ComponentType<Record<string, unknown>>;

const ELEMENTS = Object.fromEntries(
  (["div", "section", "article", "ul", "ol", "li", "figure", "h1", "h2", "h3", "p", "span"] as Tag[]).map(
    (t) => [t, (m as unknown as Record<Tag, MotionEl>)[t]],
  ),
) as Record<Tag, MotionEl>;

function resolveKind(as: Tag, kind?: Kind): Kind {
  if (kind) return kind;
  return as === "h1" || as === "h2" || as === "h3" ? "heading" : "soft";
}

function headingTransition(delay = 0, reduce: boolean) {
  if (reduce) {
    return { opacity: { duration: 0.2, ease: EASE_ENTER, delay } };
  }
  return {
    delay,
    opacity: { duration: 0.4, ease: EASE_ENTER, delay },
    transform: { ...HEADING_SPRING, delay },
  };
}

function states(kind: Kind, reduce: boolean) {
  if (kind === "heading") {
    return {
      hidden: reduce ? { opacity: 0 } : HEADING_HIDDEN,
      shown: reduce ? { opacity: 1 } : HEADING_SHOWN,
    };
  }
  return { hidden: SOFT_HIDDEN, shown: SOFT_SHOWN };
}

export function Reveal({
  as = "div",
  kind,
  delay = 0,
  className,
  children,
  ...rest
}: BaseProps & { delay?: number }) {
  const reduce = Boolean(useReducedMotion());
  const resolved = resolveKind(as, kind);
  const { hidden, shown } = states(resolved, reduce);
  const Comp = ELEMENTS[as];
  const Inner = ELEMENTS.span;

  // Clip-path on the observed node makes IntersectionObserver see 0% visibility,
  // so whileInView never fires (the hero h1 stayed hidden). Observe the outer
  // box; run the wipe on an inner span.
  if (resolved === "heading") {
    return (
      <Comp
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={{
          hidden: {},
          visible: { transition: headingTransition(delay, reduce) },
        }}
        className={className}
        {...rest}
      >
        <Inner className="block origin-left" variants={{ hidden, visible: shown }}>
          {children}
        </Inner>
      </Comp>
    );
  }

  return (
    <Comp
      initial={hidden}
      whileInView={shown}
      viewport={VIEWPORT}
      transition={{ ...SPRING, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({
  as = "div",
  stagger = 0.06,
  delay = 0,
  children,
  ...rest
}: BaseProps & { stagger?: number; delay?: number }) {
  const Comp = ELEMENTS[as];
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <Comp variants={variants} initial="hidden" whileInView="visible" viewport={VIEWPORT} {...rest}>
      {children}
    </Comp>
  );
}

export function RevealItem({ as = "div", kind, className, children, ...rest }: BaseProps) {
  const reduce = Boolean(useReducedMotion());
  const resolved = resolveKind(as, kind);
  const { hidden, shown } = states(resolved, reduce);
  const Comp = ELEMENTS[as];
  const variants: Variants = {
    hidden,
    visible: {
      ...shown,
      transition: resolved === "heading" ? headingTransition(0, reduce) : SPRING,
    },
  };
  const Inner = ELEMENTS.span;
  if (resolved === "heading") {
    return (
      <Comp
        variants={{ hidden: {}, visible: { transition: headingTransition(0, reduce) } }}
        className={className}
        {...rest}
      >
        <Inner className="block origin-left" variants={variants}>
          {children}
        </Inner>
      </Comp>
    );
  }

  return (
    <Comp variants={variants} className={className} {...rest}>
      {children}
    </Comp>
  );
}
