import { cn } from "cn";
import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/interactive/reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
  titleClassName?: string;
};

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "type-eyebrow inline-flex items-center gap-3",
        tone === "dark" ? "text-citron" : "text-citron-ink",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-6 shrink-0", tone === "dark" ? "bg-citron" : "bg-citron-ink")}
      />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  align = "left",
  tone = "light",
  className,
  as = "h2",
  titleClassName,
}: Props) {
  return (
    <RevealGroup
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <RevealItem>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </RevealItem>
      ) : null}
      <RevealItem
        as={as}
        id={id}
        className={cn(
          as === "h1" ? "type-h1" : "type-h2",
          "max-w-[18ch]",
          eyebrow && "mt-4",
          tone === "dark" ? "text-canvas" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </RevealItem>
      {lead ? (
        <RevealItem
          as="p"
          className={cn(
            "type-lead mt-5 max-w-[58ch]",
            tone === "dark" ? "text-dark-muted" : "text-ink-muted",
          )}
        >
          {lead}
        </RevealItem>
      ) : null}
    </RevealGroup>
  );
}
