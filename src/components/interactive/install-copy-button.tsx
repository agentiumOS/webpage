"use client";

import { CopyButton } from "./copy-button";
import { track } from "@/lib/analytics";

/** Copy button for install commands; reports `copy_install_command` (a key event). */
export function InstallCopyButton({
  text,
  location,
  className,
}: {
  text: string;
  location: string;
  className?: string;
}) {
  return (
    <CopyButton
      text={text}
      label="Copy install command"
      className={className}
      onCopied={() => track("copy_install_command", { command: text, link_location: location })}
    />
  );
}
