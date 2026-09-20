import { cn } from "cn";
import { Icon } from "@/components/graphics/icon";
import { SmartLink } from "./smart-link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
  /** Show an external (↗) arrow instead of → */
  external?: boolean;
};

export function ArrowLink({ href, children, className, tone = "light", external }: Props) {
  return (
    <SmartLink
      href={href}
      className={cn(
        "arrow-shift link-underline type-ui inline-flex min-h-11 items-center gap-2",
        tone === "dark" ? "text-citron" : "text-ink",
        className,
      )}
    >
      <span>{children}</span>
      <Icon name={external ? "arrowUpRight" : "arrowRight"} data-arrow="" className="size-4" />
    </SmartLink>
  );
}
