"use client";

import { cn } from "cn";
import { CopyButton } from "./copy-button";
import { Icon } from "@/components/graphics/icon";
import { track } from "@/lib/analytics";

type Props = {
  filename: string;
  code: string;
  html: string;
  install?: string;
  env?: string;
  note?: string;
  docsUrl?: string;
  docsLabel?: string;
  className?: string;
};

/** Single static code panel (no tabs). Graphite surface, filename bar, copy button. */
export function CodePanel({ filename, code, html, install, env, note, docsUrl, docsLabel = "Open guide", className }: Props) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="overflow-hidden rounded-[18px] border border-dark-surface bg-ink text-canvas">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 py-1 pr-1 pl-4">
          <span className="font-mono text-[11px] tracking-[0.04em] text-dark-muted">{filename}</span>
          <CopyButton
            text={code}
            label={`Copy ${filename}`}
            tone="dark"
            onCopied={() => track("code_copy", { sample_id: filename })}
          />
        </div>
        <div
          tabIndex={0}
          aria-label={`${filename} source`}
          className="type-code max-w-full overflow-x-auto p-4 text-canvas sm:p-6 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-citron [&_pre]:m-0 [&_pre]:min-w-max [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[12px]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {(install || env || note || docsUrl) && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <dl className="type-small grid gap-1 text-ink-muted">
            {install ? (
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-ink">Install</dt>
                <dd>
                  <code className="text-[12px]!">{install}</code>
                </dd>
              </div>
            ) : null}
            {env ? (
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-ink">Server-side env</dt>
                <dd>
                  <code className="text-[12px]!">{env}</code>
                </dd>
              </div>
            ) : null}
            {note ? (
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-ink">Note</dt>
                <dd>{note}</dd>
              </div>
            ) : null}
          </dl>
          {docsUrl ? (
            <a
              href={docsUrl}
              className="arrow-shift link-underline type-ui inline-flex min-h-11 shrink-0 items-center gap-2 text-ink"
            >
              {docsLabel}
              <Icon name="arrowUpRight" data-arrow="" className="size-4" />
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}
