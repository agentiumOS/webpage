"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "cn";
import { Icon, isIconName } from "@/components/graphics/icon";
import {
  categoryLabels,
  filterIntegrations,
  integrations,
  isCategory,
  type IntegrationCategory,
} from "@/content/integrations";
import { integrationsPage } from "@/content/site";
import { categoryIcons } from "@/components/graphics/nav-icons";
import type { IconName } from "@/components/graphics/icon";

type Category = IntegrationCategory | "all";

function readState(params: URLSearchParams): { q: string; category: Category } {
  const q = params.get("q") ?? "";
  const c = params.get("category");
  return { q, category: isCategory(c) ? c : "all" };
}

function writeUrl(q: string, category: Category) {
  const params = new URLSearchParams();
  if (q.trim()) params.set("q", q.trim());
  if (category !== "all") params.set("category", category);
  const search = params.toString();
  const url = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;
  window.history.replaceState(window.history.state, "", url);
}

export function IntegrationSearch() {
  const p = integrationsPage;
  const searchParams = useSearchParams();
  const urlState = React.useMemo(() => readState(new URLSearchParams(searchParams.toString())), [searchParams]);

  const [query, setQuery] = React.useState(urlState.q);
  const [category, setCategory] = React.useState<Category>(urlState.category);
  const [announced, setAnnounced] = React.useState("");
  const debounce = React.useRef<number | null>(null);

  // Back/forward: sync local state from the URL.
  React.useEffect(() => {
    setQuery(urlState.q);
    setCategory(urlState.category);
  }, [urlState.q, urlState.category]);

  // Normalize invalid category in URL once on mount.
  React.useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("category");
    if (raw && !isCategory(raw)) writeUrl(urlState.q, "all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = React.useMemo(() => filterIntegrations(query, category), [query, category]);

  // Debounced URL write + debounced announcement.
  React.useEffect(() => {
    if (debounce.current) window.clearTimeout(debounce.current);
    debounce.current = window.setTimeout(() => {
      writeUrl(query, category);
      setAnnounced(
        results.length === 0
          ? p.empty.heading
          : `${results.length} ${results.length === 1 ? "integration" : "integrations"}`,
      );
    }, 300);
    return () => {
      if (debounce.current) window.clearTimeout(debounce.current);
    };
  }, [query, category, results.length, p.empty.heading]);

  const clear = () => {
    setQuery("");
    setCategory("all");
  };

  const inputId = "integration-search";

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-[480px]">
          <label htmlFor={inputId} className="type-ui block text-ink">
            {p.search.label}
          </label>
          <div className="relative mt-2">
            <Icon name="search"
              className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-ink-muted"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={p.search.placeholder}
              autoComplete="off"
              className="h-12 w-full rounded-[10px] border border-control-line bg-surface pr-12 pl-11 text-[15px] text-ink placeholder:text-ink-muted focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-1 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-[8px] text-ink-muted hover:bg-surface-muted hover:text-ink"
              >
                <Icon name="close" className="size-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {p.filters.map((f) => {
            const pressed = category === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setCategory(f.id as Category)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border px-4 type-ui transition-colors duration-[160ms] ease-[var(--ease-state)]",
                  pressed
                    ? "border-ink bg-ink text-canvas"
                    : "border-line bg-surface text-ink hover:border-control-line",
                )}
              >
                <Icon name={(categoryIcons[f.id] ?? "grid") as IconName} className="size-4" />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="type-small text-ink-muted" aria-hidden="true">
          {results.length} of {integrations.length}
        </p>
        <p role="status" aria-live="polite" className="sr-only">
          {announced}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="mt-4 rounded-[18px] border border-line bg-surface p-8 text-center">
          <h3 className="type-h3 text-ink">{p.empty.heading}</h3>
          <p className="type-body mt-2 text-ink-muted">{p.empty.body}</p>
          <button
            type="button"
            onClick={clear}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-[10px] border border-control-line px-5 type-ui text-ink hover:bg-surface-muted"
          >
            <Icon name="close" className="size-4" />
            {p.empty.action}
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <li key={item.id}>
              <a
                href={item.docsUrl}
                className="card-hover arrow-shift flex min-h-[180px] flex-col rounded-[16px] border border-line bg-surface p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-surface-muted text-ink">
                    <Icon name={isIconName(item.icon) ? item.icon : "cube"} variant="bulk" className="size-5" />
                  </span>
                  <h3 className="type-h3 flex-1 text-ink">{item.name}</h3>
                  <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-line bg-surface-muted px-2.5 font-mono text-[10px] tracking-[0.06em] text-ink-muted uppercase">
                    {categoryLabels[item.category]}
                  </span>
                </div>
                <p className="type-body mt-2 flex-1 text-ink-muted">{item.description}</p>
                <span className="type-ui mt-5 inline-flex items-center gap-2 text-ink">
                  Open guide
                  <Icon name="arrowUpRight" data-arrow="" className="size-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
