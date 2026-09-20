"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "cn";
import { Icon } from "@/components/graphics/icon";
import { track } from "@/lib/analytics";

type Item = { q: string; a: string };

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/**
 * Answers are always rendered (`forceMount`) so the question/answer pairs are
 * present in the initial HTML for crawlers and answer engines; closed panels
 * are hidden with CSS (see `[data-slot="faq-content"]` in globals.css).
 */
export function FaqAccordion({
  items,
  className,
  headingLevel = "h3",
}: {
  items: readonly Item[];
  className?: string;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  const ids = React.useMemo(() => items.map((item) => slug(item.q)), [items]);
  const [value, setValue] = React.useState<string>("");

  const onValueChange = (next: string) => {
    if (next) {
      track("faq_toggle", { question_id: next, state: "open" });
    } else if (value) {
      track("faq_toggle", { question_id: value, state: "closed" });
    }
    setValue(next);
  };

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      {items.map((item, i) => (
        <AccordionPrimitive.Item
          key={item.q}
          value={ids[i]}
          id={`faq-${ids[i]}`}
          className="border-t border-line last:border-b"
        >
          <AccordionPrimitive.Header asChild>
            <Heading className="m-0">
              <AccordionPrimitive.Trigger className="group/trigger flex min-h-16 w-full items-center justify-between gap-6 px-6 py-4 text-left text-[18px] leading-[1.35] font-medium tracking-[-0.01em] text-ink outline-none transition-colors duration-[160ms] hover:bg-surface-muted/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring">
                <span>{item.q}</span>
                <span className="inline-flex size-6 shrink-0 items-center justify-center text-ink-muted">
                  <Icon name="plus" className="size-5 group-data-[state=open]/trigger:hidden" />
                  <Icon name="minus" className="hidden size-5 group-data-[state=open]/trigger:block" />
                </span>
              </AccordionPrimitive.Trigger>
            </Heading>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            forceMount
            data-slot="faq-content"
            className="overflow-hidden motion-safe:data-[state=open]:animate-faq-down"
          >
            <p className="max-w-[70ch] px-6 pb-6 text-[15px] leading-[1.7] text-ink-muted">{item.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
