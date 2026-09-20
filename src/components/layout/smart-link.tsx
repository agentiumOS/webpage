import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  children: ReactNode;
};

/** Internal routes use next/link; external URLs use a plain anchor (same tab). */
export function SmartLink({ href, children, ...props }: Props) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
