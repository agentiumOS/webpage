import Link from "next/link";
import { cn } from "cn";

/** Text wordmark. Replace with an approved mark when one is supplied. */
export function Wordmark({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-display inline-flex h-11 items-center text-[22px] leading-none tracking-[-0.02em] rounded-[8px]",
        tone === "dark" ? "text-canvas" : "text-ink",
        className,
      )}
      aria-label="Agentium home"
    >
      Agentium
    </Link>
  );
}
