"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/graphics/icon";
import { navLinkIcons, platformIcons } from "@/components/graphics/nav-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "./container";
import { Wordmark } from "./wordmark";
import { SmartLink } from "./smart-link";

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return scrolled;
}

export function SiteHeader() {
  const scrolled = useScrolled();
  return (
    <>
      <AnnouncementStrip />
      <header
        data-scrolled={scrolled ? "" : undefined}
        className={cn(
          "sticky top-0 z-40 bg-canvas transition-[box-shadow,border-color] duration-[160ms] ease-[var(--ease-state)]",
          "border-b",
          scrolled ? "border-line shadow-[0_1px_0_0_var(--line),0_8px_24px_-20px_rgb(32_37_33/0.25)]" : "border-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between lg:h-[72px]">
          <Wordmark />
          <DesktopNav />
          <MobileNav />
        </Container>
      </header>
    </>
  );
}

function AnnouncementStrip() {
  return (
    <div id="top" className="bg-[#E4F0C9] text-ink">
      <Container className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center font-mono text-[11px] leading-[18px] tracking-[0.02em] lg:min-h-9 lg:py-0">
        <span>{site.announcement.copy}</span>
        <Link
          href={site.announcement.href}
          className="arrow-shift link-underline inline-flex min-h-7 items-center gap-1.5 font-medium text-citron-ink"
        >
          <Icon name="target" className="size-3.5" />
          {site.announcement.linkLabel}
          <Icon name="arrowRight" data-arrow="" className="size-3.5" />
        </Link>
      </Container>
    </div>
  );
}

function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      <NavigationMenu viewport={false} delayDuration={120} skipDelayDuration={300}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-11 gap-2 rounded-[8px] px-3 type-ui text-ink hover:bg-surface-muted focus:bg-surface-muted data-open:bg-surface-muted data-popup-open:bg-surface-muted">
              <Icon name="layers" className="size-4" />
              {site.nav.platform.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[520px] p-3! md:w-[520px] rounded-[12px]! bg-surface! shadow-[0_12px_32px_-20px_rgb(32_37_33/0.25)]! ring-line!">
              <ul className="grid grid-cols-2 gap-1">
                {site.nav.platform.items.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 rounded-[8px] p-3 hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                      >
                        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-surface-muted text-ink">
                          <Icon name={platformIcons[item.title] ?? "layers"} className="size-4" />
                        </span>
                        <span className="flex flex-col gap-1">
                        <span className="text-[14px] leading-5 font-medium text-ink">
                          {item.title}
                        </span>
                        <span className="text-[12px] leading-[18px] text-ink-muted">
                          {item.description}
                        </span>
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {site.nav.links.map((link) => (
        <SmartLink
          key={link.label}
          href={link.href}
          className="type-ui inline-flex h-11 items-center gap-2 rounded-[8px] px-3 text-ink hover:bg-surface-muted"
        >
          <Icon name={navLinkIcons[link.label] ?? "cube"} className="size-4" />
          {link.label}
        </SmartLink>
      ))}
      <Button asChild size="compact" className="ml-2">
        <a href={site.nav.cta.href}>
          <Icon name="code" className="size-4" />
          {site.nav.cta.label}
          <Icon name="arrowRight" data-arrow="" className="size-4" />
        </a>
      </Button>
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const first = React.useRef(true);

  // Close on navigation (pathname changes).
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation">
            <Icon name="menu" className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          showCloseButton
          closeLabel="Close navigation"
          className="h-dvh w-[min(88vw,360px)] max-w-none! gap-0 border-line bg-canvas p-0 text-ink sm:max-w-none!"
        >
          <SheetHeader className="h-16 flex-row items-center border-b border-line px-5 py-0">
            <SheetTitle className="font-display text-[20px] font-normal tracking-[-0.02em] text-ink">
              Agentium
            </SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
          </SheetHeader>
          <nav aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
            <p className="type-eyebrow px-3 pt-1 pb-2 text-ink-muted">Platform</p>
            <ul className="flex flex-col">
              {site.nav.platform.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-start gap-3 rounded-[8px] px-3 py-2 hover:bg-surface-muted"
                  >
                    <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-surface-muted text-ink">
                      <Icon name={platformIcons[item.title] ?? "layers"} className="size-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] leading-5 font-medium text-ink">{item.title}</span>
                      <span className="text-[12px] leading-[18px] text-ink-muted">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="my-4 border-t border-line" />
            <ul className="flex flex-col">
              {site.nav.links.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center gap-3 rounded-[8px] px-3 text-[15px] font-medium text-ink hover:bg-surface-muted"
                  >
                    <Icon name={navLinkIcons[link.label] ?? "cube"} className="size-4" />
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto px-3 pt-6">
              <Button asChild className="w-full">
                <a href={site.nav.cta.href}>
                  <Icon name="code" className="size-4" />
                  {site.nav.cta.label}
                  <Icon name="arrowRight" data-arrow="" className="size-4" />
                </a>
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
