"use client";

import * as React from "react";
import { cn } from "cn";
import { Icon } from "@/components/graphics/icon";

type Props = {
  text: string;
  label?: string;
  tone?: "light" | "dark";
  className?: string;
  /** Called after a successful copy (for optional analytics). */
  onCopied?: () => void;
};

const SUCCESS = "Copied";
const FAILURE = "Couldn’t copy. Select the code and copy it.";

export function CopyButton({ text, label = "Copy to clipboard", tone = "light", className, onCopied }: Props) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "failed">("idle");
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      onCopied?.();
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("failed");
    }
  };

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className={cn(
          "inline-flex size-11 shrink-0 items-center justify-center rounded-[8px] transition-colors duration-[160ms] ease-[var(--ease-state)]",
          tone === "dark"
            ? "text-dark-muted hover:bg-white/10 hover:text-canvas focus-visible:outline-citron"
            : "text-ink-muted hover:bg-surface-muted hover:text-ink",
        )}
      >
        {status === "copied" ? (
          <Icon name="check" className="size-4" />
        ) : (
          <Icon name="copy" className="size-4" />
        )}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "type-small",
          status === "idle" && "sr-only",
          status === "copied" && (tone === "dark" ? "text-citron" : "text-success"),
          status === "failed" && (tone === "dark" ? "text-[#F0B4AD]" : "text-error"),
        )}
      >
        {status === "copied" ? SUCCESS : status === "failed" ? FAILURE : ""}
      </span>
    </span>
  );
}
