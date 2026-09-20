"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "cn";
import { Icon } from "@/components/graphics/icon";

type Item = { q: string; a: string };

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
  return (
    <AccordionPrimitive.Root type="single" collapsible className={cn("w-full", className)}>
      {items.map((item, i) => (
        <AccordionPrimitive.Item
          key={item.q}
          value={`item-${i}`}
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
          <AccordionPrimitive.Content className="overflow-hidden motion-safe:data-[state=open]:animate-faq-down motion-safe:data-[state=closed]:animate-faq-up">
            <p className="max-w-[70ch] px-6 pb-6 text-[15px] leading-[1.7] text-ink-muted">{item.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
