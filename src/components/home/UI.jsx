import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon,
  Layers01Icon,
  Mic01Icon,
  Call02Icon,
  Image01Icon,
  Analytics01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  Menu01Icon,
  Cancel01Icon,
  Coins01Icon,
  Database01Icon,
  Shield01Icon,
  SourceCodeIcon,
  Package01Icon,
  WorkflowSquare01Icon,
  PlusSignIcon,
  PauseIcon,
  PlayIcon,
} from "@hugeicons-pro/core-duotone-rounded";

const icons = {
  agent: AiBrain01Icon,
  harness: Layers01Icon,
  voice: Mic01Icon,
  phone: Call02Icon,
  image: Image01Icon,
  chart: Analytics01Icon,
  arrow: ArrowRight02Icon,
  external: ArrowUpRight01Icon,
  check: CheckmarkCircle02Icon,
  copy: Copy01Icon,
  menu: Menu01Icon,
  close: Cancel01Icon,
  cost: Coins01Icon,
  memory: Database01Icon,
  shield: Shield01Icon,
  code: SourceCodeIcon,
  package: Package01Icon,
  workflow: WorkflowSquare01Icon,
  plus: PlusSignIcon,
  pause: PauseIcon,
  play: PlayIcon,
};

export function Icon({ name, size = 22, className = "", tone = false }) {
  return (
    <span
      className={`${tone ? "icon-tone" : "icon"} ${className}`}
      aria-hidden="true"
    >
      <HugeiconsIcon
        icon={icons[name]}
        size={size}
        primaryColor="currentColor"
        secondaryColor="currentColor"
      />
    </span>
  );
}

export function Brand({ name, size = 25, className = "" }) {
  return (
    <Image
      className={`brand-icon ${className}`}
      src={`/brands/${name}.svg`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      unoptimized
    />
  );
}

export function Logo({ light = false }) {
  return (
    <a
      href="#top"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label="Agentium home"
    >
      <Image src="/brand/agentium.svg" alt="" width={33} height={33} unoptimized />
      <span>
        agentium<span className="logo-dot">.</span>
      </span>
    </a>
  );
}

export function TextLink({ href, children, className = "" }) {
  return (
    <a href={href} className={`text-link ${className}`}>
      {children}
      <Icon name="arrow" size={18} />
    </a>
  );
}

export function CopyButton({ value, label = "Copy", className = "", onCopied }) {
  const [status, setStatus] = useState("idle");
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      onCopied?.();
    } catch {
      setStatus("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }
  return (
    <button
      className={`copy-button ${className}`}
      onClick={copy}
      aria-label={status === "copied" ? "Copied to clipboard" : label}
    >
      <Icon name={status === "copied" ? "check" : "copy"} size={17} />
      <span aria-live="polite">
        {status === "copied"
          ? "Copied"
          : status === "error"
            ? "Select to copy"
            : label}
      </span>
    </button>
  );
}

export function Eyebrow({ children, light = false }) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </div>
  );
}
