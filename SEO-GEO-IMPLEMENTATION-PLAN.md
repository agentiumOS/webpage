# Agentium — SEO / GEO / Structured Data / Measurement Implementation Plan

- Audit date: 2026-09-20 (17:00–18:00 UTC), performed from the `try-agentium` repository plus live HTTP inspection of `https://agentium.in`, `https://docs.agentium.in`, npm, and GitHub.
- Status: **plan only — nothing has been implemented or deployed.**
- Scope: the Next.js marketing site in this repository (routes `/`, `/jev`, `/integrations`, `/examples`), its relationship to the Mintlify documentation at `docs.agentium.in`, and the measurement stack (GA4 property supplied by the owner: `G-K1J2XC5BNR`).
- Evidence conventions: every finding is tagged **[Verified]** (observed directly), **[Inferred]** (derived from code/behaviour, needs runtime confirmation), **[Not implemented]** (proposed, absent in repo/deployment), or **[Unknown]** (no access/evidence). Nothing about traffic, rankings, search volume, or indexing status is asserted anywhere in this document because no Search Console, analytics, or log access was available.

---

## 1. Executive diagnosis

1. **Production currently serves a different, legacy site.** `https://agentium.in` (Vercel, `x-vercel-id: bom1…`) returns a client-rendered Vite SPA (`<div id="root"></div>`, `/assets/index-CBHsrbTu.js`), not this Next.js app. Its metadata is stale and partly wrong: title "Agentium — AI Runtime for TypeScript Agent Teams", `og:url` pointing to `https://agentiumos.github.io/webpage`, a `keywords` meta tag, a `SoftwareApplication` JSON-LD with an `Offer` but no rating, a different GA4 property (`G-D8J1414KBN`), no sitemap (404), and 404s for `/jev`, `/integrations`, `/examples`. **[Verified]**
2. **`www.agentium.in` is broken over HTTPS.** Its Let's Encrypt certificate expired 2026-08-20 (`CN=www.agentium.in`, issuer R13, notAfter Aug 20 2026). `http://www.agentium.in` 308-redirects to `https://www.agentium.in`, which then fails TLS. With verification disabled it 307s to the apex, so the intent (www → apex) exists but the domain is not correctly attached/renewing on Vercel. This is a launch blocker regardless of the Next.js work. **[Verified]**
3. **The new Next.js site is well-structured but not launch-ready for search.** Positives: server-rendered content, one `<h1>` per page, per-route titles/descriptions/canonicals, `metadataBase`, semantic landmarks, a static no-JS catalog fallback on `/integrations`, and all 49 docs links resolve to URLs present in the docs sitemap. Gaps: no `robots.txt`, no `sitemap.xml`, no JSON-LD, no Open Graph image, no icons beyond `favicon.ico`, indexability gated on an environment variable that is not set anywhere in the repo (local HTML ships `noindex, nofollow` and `canonical=http://localhost:3000`), FAQ answers absent from the DOM (Radix `Presence` unmounts closed content), and hero/title copy that differs between source and the running dev server (copy is still in flux). **[Verified]**
4. **Documentation (Mintlify) is in good technical shape** — self-canonicals, a 237-URL sitemap with real `lastmod`, `.md` twins served with `X-Robots-Tag: noindex, nofollow`, `llms.txt`/`llms-full.txt` with `Link` rel headers, TechArticle/Breadcrumb JSON-LD, and a Cloudflare robots.txt that allows all crawlers with `Content-Signal: ai-train=yes, search=yes, ai-input=yes`. Two entity problems are platform-generated: the docs declare `Organization @id https://docs.agentium.in/#organization` (should be the marketing origin) and a second `WebSite` node with `creator: Mintlify`. **[Verified]**
5. **Entity consistency across surfaces is weak.** Four different one-line descriptions of Agentium exist (legacy site, new site, npm README, docs Introduction). The GitHub repository `agentiumOS/agentium` has no description, homepage, topics, or API-detected license (npm declares MIT). No official social profiles are verifiable. This matters more for AI answer systems and knowledge-graph reconciliation than any single markup change. **[Verified]**
6. **Measurement does not exist for the new site.** No GA4, no Search Console evidence, no Web Vitals reporting. The owner has supplied `G-K1J2XC5BNR`; the legacy site uses `G-D8J1414KBN`. A property decision is required (Section 9).

The plan below prioritises: (P0) correct domain/TLS, indexability, sitemap/robots, OG/icons, FAQ DOM fix, GA4 baseline; (P1) JSON-LD entity graph, entity consistency across npm/GitHub/docs, performance and accessibility gates, GA4 event taxonomy and key events; (P2) content expansion and AI-visibility experiments with measurement.

---

## 2. Evidence-based audit

### 2.1 Repository and stack

| Item | Finding | Evidence | Consequence | Action |
| --- | --- | --- | --- | --- |
| Framework | Next.js **16.3.5**, React 19.2.8, App Router, Turbopack dev | `package.json`, `node_modules/next/package.json` | Use Next 16 metadata file conventions (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.svg`, `manifest.ts`). Read `node_modules/next/dist/docs/` before implementing (per `AGENTS.md`). | — |
| Styling/UI | Tailwind **4.3.3** (`@tailwindcss/postcss`), `radix-ui` 1.6.7, `shadcn` 4.21 CLI (`components.json` style `radix-nova`, `iconLibrary: lucide` but Hugeicons Pro is what is used), `motion` 13.4.0, `shiki` 4.4.3 (server-side) | `package.json`, `components.json`, `src/lib/highlight.ts` | Stack claim confirmed. `components.json` icon library mismatch is cosmetic. | P2: align `components.json.iconLibrary` or ignore. |
| Analytics libs | None (`@next/third-parties` not installed) | `package.json` | GA4 must be added. | P0 (Section 8.3). |
| Git/hosting config | Single commit, **no remote**, no `vercel.json`/`vercel.ts`, no `.env*`, no CI | `git remote -v` empty; `ls` | Production origin, env vars, and redirects live only in the Vercel dashboard (unverifiable from repo). | Record in Section 9; add `vercel.ts` or `next.config.ts` headers/redirects so behaviour is versioned. |
| Site origin config | `SITE_ORIGIN` falls back to `http://localhost:3000`; `IS_PRODUCTION_ORIGIN` is true only if `NEXT_PUBLIC_SITE_ORIGIN` is set and `VERCEL_ENV !== "preview"` | `src/lib/site-config.ts` | If the env var is missing in Vercel Production, the live site ships `<meta name="robots" content="noindex, nofollow">` and localhost canonicals. Local dev HTML confirms this path. **[Verified locally]** | P0: default to `https://agentium.in` when `VERCEL_ENV === "production"`; add a build-time assertion. |
| robots.txt | Missing (`/robots.txt` → 404 HTML) | curl `localhost:3000/robots.txt` | No sitemap discovery; crawlers get a 404 HTML page. | P0: `src/app/robots.ts`. |
| sitemap.xml | Missing (404) | curl | No canonical URL inventory for Google/Bing. | P0: `src/app/sitemap.ts` with maintained `lastModified`. |
| JSON-LD | None | grep of rendered HTML: `0` `application/ld+json` | No entity graph; legacy site's `SoftwareApplication` will disappear on cutover. | P1: Section 5. |
| Open Graph image | None (`twitter:card summary_large_image` with no image) | rendered `<head>` | Broken/blank social cards. | P0: `opengraph-image.tsx` per route or a static 1200×630 asset. |
| Icons/manifest | Only `favicon.ico` (256×256); no `icon.svg`, `apple-icon`, `manifest` | `src/app/`, rendered `<head>` | Poor iOS/Android/Google favicon handling. | P1. |
| Public assets | Default `create-next-app` SVGs (`next.svg`, `vercel.svg`, …); `public/images/*.png` referenced by `Artwork` do not exist → SVG fallbacks render | `ls public`, `src/components/graphics/artwork.tsx` | Fine functionally; remove template assets; if PNGs are added they are 1536×1024 and `priority` on the hero — verify LCP. | P2. |
| Titles | Root template `%s — Agentium`; home/jev use `title.absolute`; `/integrations`, `/examples` use template | `layout.tsx`, page files | Unique per route. Running dev server showed **"Agentium — Everything you need to make agents in TypeScript"** while source says **"The whole agent stack in TypeScript"** → copy still changing. | P0: freeze one positioning line (Section 4). |
| Headings | Home: 1 `<h1>`, 14 `<h2>`; footer renders 4 `<h2>` column headings on every page | rendered HTML, `site-footer.tsx` | Footer h2s dilute the outline. | P2: demote footer headings to `<h3>`/`<p role=heading aria-level=2>` or plain `<p>`. |
| FAQ content | Answers exist only in the RSC payload, **not in the DOM** (`"Agentium is a TypeScript framework…" in DOM: False`) because Radix Accordion `Content` uses `Presence` (unmounted when closed) | rendered HTML analysis; `@radix-ui/react-collapsible/dist/index.mjs:84` | Direct answers to "What is Agentium?" etc. are invisible to crawlers and to any structured-data-must-match-visible-text check. | P0: `forceMount` + CSS collapse, or render answers server-side with `<details>`. |
| Reveal animations | 67 elements ship with `opacity:0` in initial HTML (`Reveal`/`RevealGroup` `initial={HIDDEN}`) | rendered HTML | Content is present in HTML (fine for indexing) but invisible until hydration; if JS fails, sections stay blank. Hero uses CSS `animate-hero-in` (good). | P1: gate `initial` on a `js`-available class or use CSS-only reveals; keep first-viewport content visible without JS. |
| Integrations filter URLs | `?q=`/`?category=` via `history.replaceState`; canonical fixed to `/integrations`; no internal links to param URLs; `Suspense` fallback renders the full static catalog | `integration-search.tsx`, `integrations/page.tsx`, rendered HTML | Duplicate-URL risk is contained. Side effect: GA4 Enhanced Measurement may fire `page_view`/`view_search_results` on each debounced `replaceState`. | P1: verify in DebugView; see Section 8.3. |
| Internal linking | Only 4 internal routes; 36 unique docs links on home | rendered HTML | Marketing site is a hub to docs (intended). | P1: add contextual cross-links between `/jev`, `/integrations`, `/examples`. |
| External link handling | `SmartLink` renders plain `<a>` for docs (same tab, no `rel`) | `smart-link.tsx` | Fine for SEO (same organisation). No `rel="noopener"` needed without `target=_blank`. | — |
| 404 | `not-found.tsx` returns HTTP 404 with a real page | curl `/nonexistent-abc` → 404 | Correct (no soft 404). | Add `page_not_found` GA event. |
| Security headers | None configured (Vercel adds HSTS on the legacy deployment) | `next.config.ts` empty; live headers | Not an SEO ranking input, but part of page-experience hygiene and CSP for the GA/JSON-LD scripts. | P1: `headers()` in `next.config.ts`. |
| Tests | `@playwright/test` + `@axe-core/playwright` installed; no test files | `package.json`, `find` | Accessibility/SEO regressions unguarded. | P1: add `tests/seo.spec.ts` and `tests/a11y.spec.ts`. |
| Copy vs. v3 docs | Snippets import `JevToolkit` from `@agentium/core/toolkits` (v3 change ✓), state "no dedicated `jevJudge` helper" (✓ matches `eval/jev.md`), use `TYPESAFE_API_KEY`, `jev("jev-latest")`, `choice()`, `JSON.parse(result.text)` (✓). No copy advertises removed v3 modules (`Memory`, `UserMemory`, `CultureManager`, `AgentScheduler`, `VersionStore`, compliance/capacity, `learning: true`, `rateLimit`). "Budget checks" → `/features/cost-autostop` exists. | `src/content/snippets.ts`, `site.ts`; `migration-v3.md` | Product statements are consistent with current docs. | Keep `verifiedAt`/`validation` metadata; add a CI link-check. |

### 2.2 Live production marketing domain

| Item | Finding | Evidence |
| --- | --- | --- |
| Canonical host | `https://agentium.in` (Vercel; DNS A `216.198.79.1`, `64.29.17.1`; NS `domaincontrol.com` = GoDaddy) | `dig`, headers `server: Vercel` |
| HTTP → HTTPS | `http://agentium.in` → 308 → `https://agentium.in/` ✓ | curl |
| www | CNAME `856f535c7782fee2.vercel-dns-017.com`; **TLS cert expired 2026-08-20**; `http://www` → 308 → `https://www` (fails) | `openssl s_client`, curl |
| HSTS | `strict-transport-security: max-age=63072000` (no `includeSubDomains`) ✓ | headers |
| Content | Legacy Vite SPA, empty `#root`, external Google Fonts (Inter, JetBrains Mono), `og:url=https://agentiumos.github.io/webpage` (wrong), `keywords` meta, `SoftwareApplication` JSON-LD (`operatingSystem: Node.js`, `Offer price 0`), GA `G-D8J1414KBN` | fetched HTML |
| robots.txt | `User-agent: *\nAllow: /` (23 bytes, no Sitemap line) | curl |
| sitemap.xml | 404 | curl |
| `/jev`, `/integrations`, `/examples` | 404 plain text `NOT_FOUND` | curl |
| `/index.html` | 200 (duplicate of `/`) — disappears with the Next.js deploy | curl |
| Crawler access | Googlebot, bingbot, GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot user-agents all receive 200 (UA-only test; IP-based WAF rules cannot be tested from here) | curl `-A` |
| Search Console / analytics / logs | **[Unknown]** — no access | — |

### 2.3 Documentation subdomain (Mintlify)

| Item | Finding | Evidence |
| --- | --- | --- |
| Platform | Mintlify (`cname.mintlify.builders`), Cloudflare-fronted (`server: cloudflare`, `cf-cache-status`) | `dig`, headers |
| robots.txt | Allows all; `Content-Signal: ai-train=yes, search=yes, ai-input=yes`; `Disallow: /_next/`, `/cdn-cgi/`; `Sitemap:` line ✓ | curl |
| Sitemap | 237 URLs, 237 `<lastmod>` (dates 2026-02-27 → 2026-09-19) ✓ | parsed XML |
| Canonicals | Self-referential on every checked page; `/quickstart/` (trailing slash) → 200 with canonical to non-slash ✓; `xhipment.mintlify.app/*` serves a duplicate host with canonical to `docs.agentium.in` (acceptable; a 301 would be cleaner) | curl |
| Markdown twins | `/{slug}.md` → 200 `text/markdown`, **`X-Robots-Tag: noindex, nofollow`** ✓ | headers |
| AI discovery files | `/llms.txt` (35 KB, 239 entries with descriptions), `/llms-full.txt` (1.69 MB), `Link:` headers `rel="llms-txt"`, `rel="llms-full-txt"`, `rel="agent-card"`, `.well-known/agent-card.json` (200). `/.well-known/api-catalog` → 404 despite being advertised; `/.well-known/mcp/server-card.json` timed out | curl |
| JSON-LD | Two scripts: (a) `WebSite{name: Agentium, creator: Organization Mintlify}`; (b) `@graph` with `Organization @id https://docs.agentium.in/#organization` (url = docs), `WebSite @id https://docs.agentium.in#website`, `WebPage`, `BreadcrumbList` (first item → `https://docs.agentium.in/index`), `["Article","TechArticle"]` with `dateModified`, no `author`, no `datePublished`, no `image` | extracted from `/quickstart` |
| OG | Per-page OG title/description/url; `og:image` generated on `xhipment.mintlify.app` (1200×630) | `<head>` |
| Root | `/` canonical `https://docs.agentium.in`, title "Docs - Agentium"; `/index` also 200 (not in sitemap) | curl |
| 404 | `/this-does-not-exist-xyz` → 404 ✓ (first attempt timed out at 15 s — Cloudflare/Mintlify latency, retest) | curl |
| Consequences | (1) Two `Organization` identities will exist once the marketing site adds its own; (2) `WebSite.creator = Mintlify` is factually about the platform, not the publisher; (3) no `author` on TechArticle. These are platform-controlled; see Section 9 decisions. | — |

### 2.4 Package and repository identities

| Surface | Finding | Evidence |
| --- | --- | --- |
| npm `@agentium/core` | 3.1.1, MIT, homepage `https://agentium.in`, repo `git+https://github.com/agentiumOS/agentium.git`, description "Core framework for building AI agents with tools, memory, and multi-model support", first publish 2026-05-22, last 2026-09-19, README mentions Discord (URL not exposed) | registry JSON |
| Other packages | `@agentium/{transport,cli,browser,eval,queue,observability,admin,edge}` all 3.1.1 | registry search |
| GitHub `agentiumOS/agentium` | 8 stars, 0 forks, `description: null`, `homepage: null`, `topics: []`, `license: null` (API), pushed 2026-09-19 | GitHub API |
| Jev / TypeSafe | `typesafe.ai` — "TypeSafe AI is an AI lab… Try our first System One Model, Jev, in early access." SDK `@typesafe-ai/sdk` 0.6.0 (MIT, docs `https://docs.typesafe.ai/sdk/javascript`, repo `typesafe-ai/typesafe-sdk-js`) | fetched HTML, registry |
| Product Hunt | `https://www.producthunt.com/products/agentium-typescript` referenced from the legacy bundle (ownership not verified) | legacy JS |
| Social profiles | **[Unknown]** — none found in repo or live HTML | — |

### 2.5 Classification summary

- **Existing and verified:** SSR content, per-route metadata/canonicals, 404 status, docs link integrity, docs sitemap/canonicals/`.md` noindex, docs `llms.txt`, crawler UA access, HTTP→HTTPS on apex, HSTS.
- **Existing but incorrect/incomplete:** www TLS/redirect; legacy site metadata (`og:url`, title, GA id); indexability gated on missing env; FAQ content not in DOM; footer heading levels; docs Organization `@id`/`WebSite.creator`; GitHub repo metadata; `api-catalog` advertised but 404.
- **Proposed but not implemented:** `robots.ts`, `sitemap.ts`, JSON-LD, OG images, icons/manifest, security headers, redirects, GA4 + events, Web Vitals RUM, SEO/a11y tests, entity-consistency work.
- **Unknown:** Vercel project/env/domain settings, Search Console/Bing data, legacy indexed URLs, Cloudflare/Vercel WAF rules by IP, Mintlify `docs.json` contents, legal entity/owner details, official profiles, Discord URL, examples repository URL (`agentium-examples` is referenced in docs).

---

## 3. Technical SEO architecture

Ownership legend: **[App]** = this repository, **[Host]** = Vercel dashboard/config, **[Docs]** = Mintlify `docs.json`/support.

### 3.1 Hosts, protocols, and duplicates

- **[Host] Canonical host = `https://agentium.in`** (non-www, no trailing slash). Attach `www.agentium.in` to the same Vercel project and set it to redirect (308) to the apex so the certificate is issued/renewed automatically. Acceptance: `curl -I https://www.agentium.in` → valid cert, `308`, `Location: https://agentium.in/`. Vercel docs: <https://vercel.com/docs/domains/working-with-domains/add-a-domain>.
- **[App] Trailing slash:** keep Next default (`trailingSlash: false`), which 308-redirects `/jev/` → `/jev`. Do not change.
- **[App] Legacy paths:** add `redirects()` in `next.config.ts` for `/index.html → /` (permanent). Any other legacy SPA hash routes are irrelevant to crawlers. Check Search Console "Pages" once verified for unexpected indexed URLs (**[Unknown]**).
- **[App] `metadataBase`/canonicals:** derive from a single `SITE_ORIGIN` that defaults to `https://agentium.in` in Vercel Production (`process.env.VERCEL_ENV === "production"`), to `https://${VERCEL_URL}` in Preview, and to `http://localhost:3000` locally; keep `NEXT_PUBLIC_SITE_ORIGIN` as an override. Canonicals must be absolute `https://agentium.in/...` in production. Google: <https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>.
- **[App] Query parameters on `/integrations`:** keep `alternates.canonical: "/integrations"`, never emit internal links with `?q=`/`?category=`, and do not add `noindex` to parameterised URLs (canonical is the right signal; `noindex` on the same document would conflict). Continue to render the full catalog in the Suspense fallback so non-JS fetches see all items.
- **Docs vs. marketing:** different hosts, different content — no cross-host canonicals. Never canonicalise a docs page to the marketing homepage. Cross-link generously (marketing → docs deep links already exist; ask Mintlify config for a persistent "Website" link back to `https://agentium.in`).
- **Docs HTML vs. Markdown twins:** already handled by `X-Robots-Tag: noindex, nofollow` on `.md`. Do not add them to the sitemap. `llms.txt` remains the discovery mechanism for Markdown.
- **Docs versions:** only one version is published (**[Verified]** — no version switcher, single sitemap). If versions are added later, each must self-canonicalise and old versions should carry `noindex` or a canonical to the current page only where content is identical.

### 3.2 Indexing controls by environment

| Environment | Meta robots | `X-Robots-Tag` | robots.txt | Who |
| --- | --- | --- | --- | --- |
| Production (`agentium.in`) | `index, follow` (+ `max-image-preview:large`) | none | `Allow: /`, `Sitemap: https://agentium.in/sitemap.xml` | App |
| Preview (`*.vercel.app`) | `noindex, nofollow` | Vercel adds `X-Robots-Tag: noindex` on preview deployments — **verify with `curl -I` on a preview URL** | same file as production (do not `Disallow: /` — a blocked page cannot be seen to carry `noindex`) | App + Host |
| Local | `noindex, nofollow` | — | — | App |

- Keep **Deployment Protection** (Vercel Authentication) on previews so they are not publicly fetchable at all: <https://vercel.com/docs/deployment-protection>.
- robots.txt is a crawl control, not an indexing or privacy control. Google: <https://developers.google.com/search/docs/crawling-indexing/robots/intro>, robots meta/X-Robots-Tag: <https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag>.

### 3.3 Sitemap

- `src/app/sitemap.ts` returning exactly the four indexable routes with absolute URLs and **explicit `lastModified` values maintained in a `src/content/route-manifest.ts`** (ISO dates bumped when copy changes). Do not use `new Date()` (fabricated lastmod is ignored or distrusted). Omit `changeFrequency`/`priority` (Google ignores them). Google: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>.
- Do not include docs URLs (different host, already covered by `https://docs.agentium.in/sitemap.xml`). Submit both sitemaps in Search Console (domain property covers both hosts) and Bing Webmaster Tools.

### 3.4 Status codes, soft 404s, broken links

- `not-found.tsx` already yields a 404 status. Keep `/integrations` empty-state a 200 (it is a valid page state). 
- Add a link-check job (Playwright test or `lychee` in CI) that fetches every `docs()` URL from `src/content/*.ts` and fails on non-200/redirect; today all 49 resolve. Google soft-404 guidance: <https://developers.google.com/search/docs/crawling-indexing/http-network-errors#soft-404-errors>.

### 3.5 Rendering and initial HTML

- All four routes are static server components → meaningful initial HTML (1,644 words on `/` in dev). Google renders JS but "content available in textual form" is the requirement; the FAQ answers currently fail that (Section 2.1). Fix by rendering answers in the DOM: Radix `Accordion.Content forceMount` with `data-[state=closed]:hidden`-style CSS (keeps animation), or switch to native `<details>/<summary>`. Google JS SEO basics: <https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics>.
- `Reveal` components: render visible by default and add the `opacity:0` initial state only after hydration (e.g., `initial={false}` when `prefers-reduced-motion`, or apply a `.js` class on `<html>` via a tiny inline script and scope hidden styles to `.js`). Keep hero on CSS animations.

### 3.6 Metadata, headings, semantic HTML

- Titles ≤ ~60 characters, descriptions ≤ ~155, unique per route (Section 4). Google title links: <https://developers.google.com/search/docs/appearance/title-link>; snippets: <https://developers.google.com/search/docs/appearance/snippet>.
- One `<h1>` per route (already true). Demote footer `<h2>`s. Keep `aria-labelledby` section labelling.
- Add `openGraph.images` (1200×630) via `opengraph-image.tsx` (route-level `ImageResponse`, uses `next/og`) and let Twitter inherit; set `twitter:card` once in layout (done).
- Icons: `src/app/icon.svg` (+ `icon.png` 512), `apple-icon.png` (180), `manifest.ts` (name, short_name, theme colour). Existing `favicon.ico` stays.
- Semantic HTML is already good (`<main id="main">`, `<nav aria-label>`, `<footer>`, `<figure>/<figcaption>`, lists). Add `<article>`/`<section>` where the JSON-LD `WebPage.mainEntity` is meant to map to visible content.

### 3.7 Performance and Core Web Vitals

- Fonts: three families via `next/font/google` (self-hosted, `display: swap`, two preloaded). Reduce Lexend to the weights actually used; keep `preload:false` on the mono font. Consider dropping `Faculty_Glyphic` preload if not in the LCP element.
- Images: `Artwork` currently falls back to inline SVG sculptures (no network cost). If PNG rasters are added, keep `priority` + accurate `sizes`, and prefer AVIF/WebP via `next/image` (default). Add `images.formats` only if needed.
- JavaScript: `motion` is loaded through `LazyMotion domAnimation` (good). `shiki` runs on the server (`highlight.ts`) — confirm it is not bundled client-side (`next build` output / `@next/bundle-analyzer`). Radix NavigationMenu/Sheet/Accordion/Tabs are the main client cost; acceptable.
- Animations: all reveals are transform/opacity (compositor-friendly); `MotionConfig reducedMotion="user"` respected. Marquee (`usp-marquee.tsx`) should pause for `prefers-reduced-motion` (verify).
- WebGL: none present. If ever added, lazy-load behind interaction/`IntersectionObserver` and never in the LCP path.
- Budgets (lab, mobile, Lighthouse/PSI): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, total JS ≤ 250 KB gzip on `/`. Field data: CrUX will likely have insufficient data for a low-traffic site — rely on RUM via GA4 `web_vitals` events (Section 8.3) or Vercel Speed Insights. CWV: <https://web.dev/articles/vitals>; page experience: <https://developers.google.com/search/docs/appearance/page-experience>.

### 3.8 Mobile and accessibility

- `viewport` set; skip link present; buttons have labels; `aria-live` on search results. Add Playwright + axe tests for the four routes at 375 px and 1280 px, keyboard traversal of header menu/sheet, and colour-contrast of `text-ink-muted` on tinted surfaces.

### 3.9 Headers (App, `next.config.ts` `headers()`)

- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY` (or CSP `frame-ancestors`). Start CSP in **report-only** including `https://www.googletagmanager.com` and `https://*.google-analytics.com` for GA4 and `'unsafe-inline'`-free JSON-LD (JSON-LD `<script type="application/ld+json">` is not executed and is not blocked by CSP `script-src`). HSTS is already set by Vercel; enable `includeSubDomains` only after confirming every subdomain (docs on Cloudflare) serves valid HTTPS.

---

## 4. Route-by-route metadata and content map

Positioning line to freeze (choose one and use it everywhere: site title, npm description, GitHub description, docs Introduction): **"Agentium is a TypeScript agent framework for Node.js: models, tools, memory, teams, workflows, and runtime integrations in one codebase."** (Docs Introduction currently says "TypeScript-native agent orchestration framework for Node.js. Model-agnostic, multi-agent teams, workflows, RAG, and more." — compatible; align wording.)

Keyword phrases below are **research seeds, not verified volumes**.

### 4.1 `/` — Home

- Audience/intent: TypeScript/Node developers evaluating agent frameworks (informational → navigational to docs). Seeds: "TypeScript agent framework", "Node.js AI agent framework", "multi-agent orchestration TypeScript", "agent memory and tools TypeScript".
- Title (≤60): `Agentium — TypeScript agent framework for Node.js`
- Description: `Build agent applications in TypeScript: models, typed tools, memory, teams, workflows, approvals, evaluation, and runtime integrations in one framework. Open source, MIT.`
- H1: keep two-line hero but make the text one sentence for extraction, e.g. `The whole agent stack in one TypeScript framework.`
- Outline (existing sections map well): definition paragraph directly under H1 (add one explicit sentence "Agentium is…"); stack; code; Jev spotlight; capabilities; flow; controls; integrations preview; examples preview; FAQ (rendered in DOM); final CTA.
- Required technical evidence: install command matches npm (`npm install @agentium/core`), snippets typechecked against 3.1.x (`validation: "typechecked"` metadata already exists — add a CI step that actually compiles them), version badge sourced from npm at build time (optional).
- Internal links: out → `/jev`, `/integrations`, `/examples`, docs quickstart/agents/memory/teams/workflows. In → header, footer, all subpages.
- Structured data: `Organization`, `WebSite`, `SoftwareApplication` (+ `SoftwareSourceCode`), `WebPage`. No `FAQPage` (Section 5.6).
- Conversion goal: `quickstart_click`, `copy_install_command`.
- Priority: P0. Cannibalisation risk: low; ensure `/jev` does not compete for "Agentium" brand queries by keeping its title Jev-first.

### 4.2 `/jev` — Jev + Agentium

- Audience/intent: developers who know Jev/TypeSafe and want to use it from TypeScript, or Agentium users wanting typed decisions. Seeds: "Jev TypeScript integration", "Jev decision model", "Jev toolkit", "LLM as judge typed decisions", "route support tickets with a decision model".
- Title: `Jev + Agentium — typed decisions, judgment tools, and eval scoring`
- Description: `Use Jev, TypeSafe AI's decision model, inside Agentium: as the agent model with choice/noul/score questions, as a JevToolkit for chat agents, or as a custom eval scorer.`
- H1: `Give Jev a place in the whole workflow.` (existing) — add a first paragraph that states plainly: "Jev is a decision model by TypeSafe AI. Agentium integrates it; Agentium does not build or operate Jev."
- Outline: definition + ownership; three ways (model / toolkit / judge) with code (exists); prerequisites (`@typesafe-ai/sdk`, `TYPESAFE_API_KEY`, `jev-latest` id) and limitations (not a chat model; do not pair with `Agent.deep()`; `noul` 0–1; `score` is a 0-based index; no `jevJudge` helper) — all verified against `models/jev.md`, `toolkits/jev.md`, `eval/jev.md`; technical details FAQ (rendered in DOM); links to TypeSafe docs.
- Internal links: out → docs `/models/jev`, `/toolkits/jev`, `/eval/jev`, `/examples/jev`; `/examples#jev-decisions`; `/integrations` (Jev card). In → home Jev spotlight, announcement strip, footer.
- Structured data: `WebPage` (about Agentium; mentions Jev as a `SoftwareApplication` provided by TypeSafe AI), `BreadcrumbList`.
- Conversion: docs click to `/models/jev` (`jev_docs_click`), `copy_install_command` on the Jev snippet.
- Priority: P0 (exists). Risk: medium — TypeSafe's own pages will (and should) own "Jev" head terms; this page targets the integration long tail only.

### 4.3 `/integrations`

- Audience/intent: developers checking provider/toolkit/storage support (informational/commercial-investigation). Seeds: "agent framework OpenAI Anthropic Gemini Ollama", "MCP client TypeScript agent", "A2A protocol TypeScript", "agent framework PostgreSQL memory".
- Title: `Integrations — models, toolkits, storage, MCP and A2A — Agentium`
- Description: `Model providers (OpenAI, Anthropic, Gemini, Ollama, Bedrock, Azure, Jev), toolkits (GitHub, Slack, Notion, Gmail, Sheets, HTTP, web search), storage (Postgres, MongoDB, SQLite, Redis), and MCP/A2A for Agentium.`
- H1: `Your stack, connected.` — add a one-sentence definition line listing categories (the description above works).
- Outline: intro; catalog (21 items, server-rendered fallback); "need a different connection" links. Add a short "How integrations are packaged" paragraph (peer dependencies, `@agentium/core/toolkits` import path since v3) — verifiable from `migration-v3.md` and the npm peer list.
- Internal links: out → each docs guide; `/jev`; `/examples#tools`. In → home preview, footer.
- Structured data: `CollectionPage` + `ItemList` (21 `ListItem`s, `url` = docs guide), `BreadcrumbList`.
- Conversion: `integration_open` (docs click from a card), `search`.
- Priority: P0 (exists). Risk: do **not** generate per-integration marketing pages — docs already own those URLs; thin duplicates would compete with docs.

### 4.4 `/examples`

- Audience/intent: developers looking for runnable patterns (informational/transactional). Seeds: "TypeScript agent memory example", "RAG agent TypeScript example", "voice agent TypeScript", "browser agent Playwright TypeScript", "human approval agent tool calls".
- Title: `Examples — Agentium patterns for tools, memory, RAG, Jev, voice, browser`
- Description: existing is good (≤155).
- H1: `Start with a working pattern.` — fine.
- Outline: cards (6) linking to docs recipes; add a "Human approval before a tool runs" recipe card linking `/agents/approval` and `/features/approval-gates` (docs exist), and a link to the examples repository once its URL is known (**[Unknown]**).
- Structured data: `CollectionPage` + `ItemList` of recipes, `BreadcrumbList`.
- Conversion: `example_open`.
- Priority: P0 (exists).

### 4.5 Where topics belong

| Topic | Marketing page | Docs | Examples | Article (post-launch) |
| --- | --- | --- | --- | --- |
| "What is Agentium / who is it for" | `/` (definition + FAQ) | `/introduction` | — | — |
| Multi-agent orchestration (teams, workflows, handoff) | `/` sections | `/teams/*`, `/workflows/*`, `/handoff/overview` | research card | possible: design notes on team vs workflow |
| Agent memory & tools | `/` capabilities | `/memory/*`, `/agents/tools` | support/tools cards | — |
| Human approval for agent actions | `/` controls, flow demo | `/agents/approval`, `/features/approval-gates` | new card | strong candidate (P2) |
| Agent evaluation | `/` controls | `/eval/*` | — | candidate with Jev judge |
| Jev integration | `/jev` | `/models/jev`, `/toolkits/jev`, `/eval/jev` | jev card | — (TypeSafe owns Jev identity) |
| Voice & browser agents | `/examples` card | `/voice/*`, `/browser/*` | card | candidate |
| v3 migration / removed features | none (do not advertise) | `/migration-v3` | — | — |

New pages are recommended only post-launch and only if authorship is verifiable (Section 6.4): at most 2–3 substantive articles under `/articles/*` (e.g., "Adding a human approval gate to agent tool calls in TypeScript", "Choosing a chat model vs. a decision model for routing"). No programmatic pages, no comparison pages with unverifiable claims (the docs' `/performance` page compares to LangChain/Agno — keep such claims in docs where methodology can be shown).

---

## 5. JSON-LD entity and schema map

### 5.1 Principles

- Valid Schema.org ≠ Google rich result. Google only renders rich results for the features it documents (<https://developers.google.com/search/docs/appearance/structured-data/search-gallery>) and only when required properties are present and content policies are met (<https://developers.google.com/search/docs/appearance/structured-data/sd-policies>). Everything here is primarily for entity disambiguation; the only Google-supported features plausibly in play are `Organization` (logo/knowledge panel signals), `BreadcrumbList`, and `Article` for docs. `SoftwareApplication` rich results require `offers` **and** `aggregateRating`/`review` — do not fabricate ratings; ship the markup as valid-but-not-eligible.
- Markup must match visible content (hence the FAQ DOM fix precedes any thought of `FAQPage`).
- One `@graph` per page, composed from shared node builders, so no entity is emitted twice and `@id`s are stable.

### 5.2 Stable identifiers

| Entity | `@id` | Emitted on |
| --- | --- | --- |
| Organization (publisher) | `https://agentium.in/#organization` | every route |
| WebSite | `https://agentium.in/#website` | every route |
| SoftwareApplication (the framework) | `https://agentium.in/#software` | every route (referenced; full node on `/`, `/integrations`, `/examples`; reference-only elsewhere is acceptable but full node is simpler) |
| SoftwareSourceCode (repository) | `https://agentium.in/#sourcecode` | `/` |
| WebPage / CollectionPage | `https://agentium.in{path}#webpage` | that route |
| BreadcrumbList | `https://agentium.in{path}#breadcrumb` | subpages |
| ItemList | `https://agentium.in{path}#list` | `/integrations`, `/examples` |
| Jev (third-party) | `https://agentium.in/jev#jev` (local node describing an external product; **not** an `@id` on TypeSafe's domain) | `/jev`, `/integrations` (as list item) |
| TypeSafe AI (third-party org) | `https://agentium.in/jev#typesafe` with `url: https://typesafe.ai` | `/jev` |

Docs pages are published by Mintlify with `https://docs.agentium.in/#organization`; the correct end state is for docs to reference `https://agentium.in/#organization` (Section 9, docs decision). Until then the two Organization nodes share `name` and should share `logo`/`sameAs` so reconciliation is easy.

### 5.3 Global vs. route-specific

- Global (all routes): `Organization`, `WebSite` (with `publisher`), `SoftwareApplication` (with `author/publisher → Organization`, `url → https://agentium.in`, `downloadUrl/installUrl → npm`, `codeRepository` via `SoftwareSourceCode`).
- Route-specific: `WebPage`/`CollectionPage` (with `isPartOf → WebSite`, `about → SoftwareApplication`, `primaryImageOfPage → OG image`, `dateModified` from the route manifest), `BreadcrumbList`, `ItemList`, Jev/TypeSafe nodes on `/jev`.
- Never emitted: `FAQPage` (Section 5.6), `Review`/`AggregateRating`, `Offer` unless the team wants to assert "free" (`isAccessibleForFree: true` on `SoftwareApplication` is the more honest expression for MIT software), `Person` authors until named authors are approved.

### 5.4 Verified `sameAs` candidates

- `https://github.com/agentiumOS/agentium` — **verified** via npm `repository`.
- `https://www.npmjs.com/package/@agentium/core` — **verified** package; `https://www.npmjs.com/org/agentium` — plausible, **verify**.
- `https://www.producthunt.com/products/agentium-typescript` — referenced by the legacy site; **verify ownership**.
- Discord, X/Twitter, LinkedIn — **[Unknown]**; add only when the URLs are confirmed.

### 5.5 Representative JSON-LD

Values in `«»` are **MISSING — do not invent**; omit the property if unknown.

**Homepage `/`**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://agentium.in/#organization",
      "name": "Agentium",
      "url": "https://agentium.in",
      "logo": { "@type": "ImageObject", "url": "«https://agentium.in/…/logo.png — asset does not exist yet»", "width": 512, "height": 512 },
      "sameAs": [
        "https://github.com/agentiumOS/agentium",
        "https://www.npmjs.com/package/@agentium/core"
      ]
      /* legalName, foundingDate, address, contactPoint, founder: «unknown — omit» */
    },
    {
      "@type": "WebSite",
      "@id": "https://agentium.in/#website",
      "url": "https://agentium.in",
      "name": "Agentium",
      "publisher": { "@id": "https://agentium.in/#organization" },
      "inLanguage": "en"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://agentium.in/#software",
      "name": "Agentium",
      "alternateName": "@agentium/core",
      "description": "TypeScript agent framework for Node.js: models, tools, memory, teams, workflows, and runtime integrations.",
      "url": "https://agentium.in",
      "applicationCategory": "DeveloperApplication",
      "applicationSubCategory": "Agent framework",
      "operatingSystem": "Cross-platform (Node.js)",
      "softwareVersion": "3.1.1",
      "programmingLanguage": "TypeScript",
      "runtimePlatform": "Node.js",
      "license": "https://opensource.org/licenses/MIT",
      "isAccessibleForFree": true,
      "downloadUrl": "https://www.npmjs.com/package/@agentium/core",
      "installUrl": "https://www.npmjs.com/package/@agentium/core",
      "softwareHelp": { "@type": "CreativeWork", "url": "https://docs.agentium.in" },
      "author": { "@id": "https://agentium.in/#organization" },
      "publisher": { "@id": "https://agentium.in/#organization" },
      "sameAs": ["https://github.com/agentiumOS/agentium"]
      /* datePublished: «first release date if the team wants it — npm shows 2026-05-22 for 1.0.0» */
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://agentium.in/#sourcecode",
      "name": "agentiumOS/agentium",
      "codeRepository": "https://github.com/agentiumOS/agentium",
      "programmingLanguage": "TypeScript",
      "runtimePlatform": "Node.js",
      "license": "https://opensource.org/licenses/MIT",
      "targetProduct": { "@id": "https://agentium.in/#software" }
    },
    {
      "@type": "WebPage",
      "@id": "https://agentium.in/#webpage",
      "url": "https://agentium.in/",
      "name": "Agentium — TypeScript agent framework for Node.js",
      "description": "Build agent applications in TypeScript: models, typed tools, memory, teams, workflows, approvals, evaluation, and runtime integrations in one framework.",
      "isPartOf": { "@id": "https://agentium.in/#website" },
      "about": { "@id": "https://agentium.in/#software" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": "https://agentium.in/opengraph-image", "width": 1200, "height": 630 },
      "dateModified": "«route-manifest date»",
      "inLanguage": "en"
    }
  ]
}
```

Notes: `softwareVersion` must be sourced (build-time fetch of the npm `latest` tag, or a constant updated by release automation) — a stale version is worse than none. `license` is asserted by npm; the GitHub API reports no detected license file — add a `LICENSE` to the repo before claiming it in markup.

**Jev page `/jev`**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@id": "https://agentium.in/#organization", "@type": "Organization", "name": "Agentium", "url": "https://agentium.in" },
    { "@id": "https://agentium.in/#website", "@type": "WebSite", "url": "https://agentium.in", "name": "Agentium", "publisher": { "@id": "https://agentium.in/#organization" } },
    { "@id": "https://agentium.in/#software", "@type": "SoftwareApplication", "name": "Agentium", "url": "https://agentium.in", "applicationCategory": "DeveloperApplication", "operatingSystem": "Cross-platform (Node.js)", "programmingLanguage": "TypeScript" },
    {
      "@type": "Organization",
      "@id": "https://agentium.in/jev#typesafe",
      "name": "TypeSafe AI",
      "url": "https://typesafe.ai"
      /* logo, sameAs: «not verified — omit» */
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://agentium.in/jev#jev",
      "name": "Jev",
      "description": "Decision model by TypeSafe AI that returns typed answers (choice, noul probability, rubric score) instead of prose.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Cloud API",
      "provider": { "@id": "https://agentium.in/jev#typesafe" },
      "manufacturer": { "@id": "https://agentium.in/jev#typesafe" },
      "url": "https://typesafe.ai",
      "softwareHelp": { "@type": "CreativeWork", "url": "https://docs.typesafe.ai/sdk/javascript" }
      /* softwareVersion: «jev-1.13.0 per docs today — only if kept current»; offers/pricing: «unknown — omit» */
    },
    {
      "@type": "WebPage",
      "@id": "https://agentium.in/jev#webpage",
      "url": "https://agentium.in/jev",
      "name": "Jev + Agentium — typed decisions, judgment tools, and eval scoring",
      "description": "Use Jev, TypeSafe AI's decision model, inside Agentium as the agent model, as a toolkit for chat agents, or as a custom eval scorer.",
      "isPartOf": { "@id": "https://agentium.in/#website" },
      "about": { "@id": "https://agentium.in/#software" },
      "mentions": [{ "@id": "https://agentium.in/jev#jev" }, { "@id": "https://agentium.in/jev#typesafe" }],
      "breadcrumb": { "@id": "https://agentium.in/jev#breadcrumb" },
      "dateModified": "«route-manifest date»"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://agentium.in/jev#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Agentium", "item": "https://agentium.in/" },
        { "@type": "ListItem", "position": 2, "name": "Jev", "item": "https://agentium.in/jev" }
      ]
    }
  ]
}
```

Ownership is expressed by `provider`/`manufacturer → TypeSafe AI` on the Jev node and by `about → Agentium` / `mentions → Jev` on the page. Agentium is never `author`/`publisher` of Jev.

**Documentation article (target shape for `docs.agentium.in/quickstart`; platform-generated today)**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://agentium.in/#organization", "name": "Agentium", "url": "https://agentium.in", "logo": { "@type": "ImageObject", "url": "«logo»" } },
    { "@type": "WebSite", "@id": "https://docs.agentium.in/#website", "url": "https://docs.agentium.in", "name": "Agentium Documentation", "publisher": { "@id": "https://agentium.in/#organization" } },
    {
      "@type": "TechArticle",
      "@id": "https://docs.agentium.in/quickstart#article",
      "headline": "Quickstart",
      "description": "Get up and running with Agentium in minutes. Install, create your first agent, add tools, and stream responses.",
      "url": "https://docs.agentium.in/quickstart",
      "mainEntityOfPage": { "@id": "https://docs.agentium.in/quickstart#webpage" },
      "dateModified": "2026-09-16T11:18:47.940Z",
      "datePublished": "«unknown»",
      "author": { "@id": "https://agentium.in/#organization" },
      "publisher": { "@id": "https://agentium.in/#organization" },
      "about": { "@id": "https://agentium.in/#software" },
      "proficiencyLevel": "Beginner",
      "dependencies": "Node.js, @agentium/core, an LLM provider SDK",
      "inLanguage": "en"
    },
    { "@type": "WebPage", "@id": "https://docs.agentium.in/quickstart#webpage", "url": "https://docs.agentium.in/quickstart", "name": "Quickstart", "isPartOf": { "@id": "https://docs.agentium.in/#website" }, "breadcrumb": { "@id": "https://docs.agentium.in/quickstart#breadcrumb" } },
    { "@type": "BreadcrumbList", "@id": "https://docs.agentium.in/quickstart#breadcrumb", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Getting Started", "item": "https://docs.agentium.in/" },
      { "@type": "ListItem", "position": 2, "name": "Quickstart", "item": "https://docs.agentium.in/quickstart" } ] }
  ]
}
```

Differences from what Mintlify emits today: Organization `@id`/`url` should be the marketing origin; drop the extra `WebSite{creator: Mintlify}`; add `author`; breadcrumb root should be `/` not `/index`. Whether `docs.json` exposes these is **[Unknown]** — raise with Mintlify support. Google Article guidance: <https://developers.google.com/search/docs/appearance/structured-data/article>.

### 5.6 FAQPage

Google shows FAQ rich results only for "well-known, authoritative government and health websites" (change log entry, Aug 2023: <https://developers.google.com/search/docs/appearance/structured-data/faqpage>). Marking up the home/Jev FAQs would be valid Schema.org but yields no Google feature, and today it would also violate the "match visible content" policy because answers are not in the DOM. Decision: **do not add `FAQPage`**. Make the Q&A visible HTML (which is what answer engines actually read) and revisit only if guidance changes.

### 5.7 Implementation approach (Next.js 16.3.5)

- Follow `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`: render a native `<script type="application/ld+json">` from server components (not `next/script`).
- Files:
  - `src/lib/structured-data.ts` — `ORG_ID`, `SITE_ID`, `SOFTWARE_ID`, builders `organization()`, `website()`, `software()`, `webPage({path,name,description,dateModified})`, `breadcrumb(items)`, `itemList(...)`, `jevNodes()`. Type with `schema-dts` (`WithContext`, `Graph`) as a dev dependency.
  - `src/components/seo/json-ld.tsx` — `export function JsonLd({ graph }: { graph: Thing[] })` that serialises once: `JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")` and renders via `dangerouslySetInnerHTML`. All content is authored constants, but escaping is mandatory so a future CMS value cannot close the script tag.
  - Each `page.tsx` composes its graph: `[organization(), website(), software(), webPage(...), breadcrumb(...)]`. The root layout emits nothing, guaranteeing one graph per document and no duplicate nodes.
- `dateModified` and `lastModified` (sitemap) read from the same `src/content/route-manifest.ts`.
- If a CSP with nonces is introduced later, JSON-LD does not need a nonce (not executed), but `@next/third-parties` `GoogleAnalytics` accepts `nonce`.

### 5.8 Validation

1. Unit: snapshot test that each route's graph has unique `@id`s and every `{"@id"}` reference resolves inside the same graph.
2. Rendered HTML: Playwright test fetches `/`, `/jev`, `/integrations`, `/examples`, parses every `application/ld+json`, asserts exactly one script per page and that `WebPage.url` equals the canonical `<link>`.
3. Schema.org validator (<https://validator.schema.org/>) — zero errors.
4. Google Rich Results Test (<https://search.google.com/test/rich-results>) — expect "Breadcrumbs" detected on subpages; `Organization` detected; `SoftwareApplication` will report missing `aggregateRating`/`offers` as *warnings* (acceptable; not eligible by design).
5. After launch: Search Console → Enhancements → Breadcrumbs report with zero errors.

---

## 6. GEO / AEO and AI-search discoverability

Confidence labels: **[1] Established technical/search guidance**, **[2] Reasonable content/discoverability practice**, **[3] Experimental — must be measured**.

Ground truth from Google (2025-12-10): AI Overviews/AI Mode have "no additional requirements"; eligibility = indexed + eligible for a snippet; "You don't need to create new machine readable files, AI text files, or markup"; content must be "available in textual form"; structured data must match visible text (<https://developers.google.com/search/docs/appearance/ai-features>). Nothing in this section guarantees citations or rankings.

### 6.1 Definitions and direct answers

- **[1]** Put a plain-language definition of Agentium in the first paragraph of `/` and in the docs Introduction; make FAQ answers real DOM text (Section 3.5).
- **[2]** Add a short "Who it is for / who it is not for" block (TypeScript/Node teams; not Python; not a hosted platform — the site already says "Does Agentium host the application for me? … You choose the infrastructure").
- **[2]** On `/jev`, state ownership explicitly in the first paragraph (Jev is TypeSafe AI's model; Agentium integrates it) and list prerequisites/limitations verbatim from docs (SDK, key, not a chat model, `noul` 0–1, `score` index, no `jevJudge`).
- **[2]** Every capability claim links to the exact docs page (already true for 49 links) — keep the `verifiedAt` metadata and enforce with CI.

### 6.2 Headings, anchors, and text accessibility

- **[1]** Descriptive `<h2>`s that read as answers ("Require a human decision before selected tools run" rather than "Controls"); stable `id`s on sections (`#stack`, `#capabilities`, `#controls`, `#code`, `#faq` exist) — keep them stable because nav and external links depend on them.
- **[1]** Code samples are real text (`shiki` output) — good. Add `aria-label`/`<figcaption>` with the filename so snippet context is textual.
- **[2]** Avoid meaning carried only by decorative graphics (the `Artwork` uses `alt=""` deliberately; adjacent copy carries meaning — keep that rule).

### 6.3 Authorship, ownership, update history

- **[1]** `Organization` markup + consistent `name`/`url`/`logo`/`sameAs` across marketing and docs; visible footer "© Agentium" already exists — add the legal entity name once decided (**[Unknown]**).
- **[2]** Visible "Last updated" on marketing pages is unnecessary; on docs Mintlify already emits `dateModified`. Expose a `/changelog` link to GitHub releases if releases are published (**[Unknown]**).
- **[2]** Named authors on substantive articles only (post-launch), with a `Person` node and a profile page; do not attribute docs to individuals unless true.

### 6.4 Consistent product identity across surfaces

- **[2]** One description string reused in: `layout.tsx` metadata, `SoftwareApplication.description`, npm `package.json` `description` (all 9 packages), GitHub repo description + homepage `https://agentium.in` + topics (`typescript`, `ai-agents`, `agent-framework`, `nodejs`, `llm`, `mcp`), docs `/introduction` first sentence, Product Hunt tagline.
- **[2]** Add a root `LICENSE` file (npm says MIT; GitHub API detects none) so `license` claims are provable.
- **[2]** Publish the examples repository URL referenced by docs (`agentium-examples/...`) and link it from `/examples`.

### 6.5 Crawler guidance and controls (marketing `robots.ts` + docs robots)

Three distinct control types — do not conflate them:

| Purpose | Agents | Control | Source |
| --- | --- | --- | --- |
| Search indexing (classic + AI answers in search) | `Googlebot`, `Bingbot`, `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Applebot` | robots.txt allow; `noindex` where needed | Google <https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers>; OpenAI <https://platform.openai.com/docs/bots>; Anthropic <https://support.anthropic.com/en/articles/8896518>; Perplexity <https://docs.perplexity.ai/guides/bots>; Bing <https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0> |
| User-requested retrieval (a person asks an assistant to open a URL) | `ChatGPT-User`, `Claude-User`, `Perplexity-User` | robots.txt may not apply (OpenAI: "robots.txt rules may not apply"); allow anyway | same |
| Model-training crawl | `GPTBot`, `ClaudeBot`, `Google-Extended` (token, not a UA), `Applebot-Extended`, `CCBot` | robots.txt `Disallow` per agent; Cloudflare `Content-Signal: ai-train=` | same; Apple <https://support.apple.com/en-us/119829>; Content Signals <https://contentsignals.org/> |

- **[1]** Marketing `robots.ts`: `User-agent: * Allow: /` + `Sitemap`. Do not disallow `/_next/static` (needed for rendering). Preview indexing is handled by meta/header, not robots.
- **[1]** Training-crawler policy is a **business decision** (Section 9). Docs currently signal `ai-train=yes`; marketing robots should match whichever policy is chosen. If training is disallowed, add per-agent `Disallow: /` blocks for `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot` while keeping search/user agents allowed (Next 16.3 `robots.ts` supports per-agent rules and `other` for `Content-Signal`).
- **[1]** CDN/WAF: Vercel Firewall (marketing) and Cloudflare (docs, managed by Mintlify) can block bots by IP/behaviour. UA-spoof tests returned 200 everywhere, but real crawler IPs were not tested. Verification: Search Console URL Inspection (Googlebot fetch), Bing Webmaster "Live URL", and server logs (Vercel Logs/Drains) for 403/429 on known bot UAs. Cloudflare "Block AI bots" defaults must be confirmed off for search/user agents on the Mintlify zone (**[Unknown]**).
- **[1]** Be careful with rate limiting on `/integrations?q=` (client-side only today — no server load).

### 6.6 llms.txt and Markdown

- **[3]** `llms.txt` (<https://llmstxt.org/>) is a proposal without confirmed adoption by major answer engines; Google explicitly says such files are not needed. The docs' `llms.txt` is nonetheless well-formed (239 entries with descriptions) and costs nothing. Keep it; keep `.md` twins `noindex`; keep `Link:` headers. Fix advertised-but-404 `.well-known/api-catalog` (Mintlify-generated) or ask Mintlify to stop advertising it. Do **not** add a competing `llms.txt` on the marketing host; optionally add `Link: <https://docs.agentium.in/llms.txt>; rel="llms-txt"` on marketing responses — harmless, measurable only via logs.
- **[2]** Maintenance: `llms.txt` descriptions come from docs frontmatter — keep frontmatter `description` fields specific (several are already good).

### 6.7 Do-not-do list

- No claims that JSON-LD, `llms.txt`, or special phrasing guarantee AI citations.
- No keyword-stuffed `keywords` meta (legacy site has one — drop it).
- No advertising removed v3 modules (compliance/versioning/scheduler/`learning: true`).
- No manufactured "Agentium vs X" pages on the marketing site.

---

## 7. Prioritised implementation backlog

Effort: **S** < 0.5 day, **M** 0.5–2 days, **L** 2–5 days. "Benefit" never asserts ranking outcomes.

### 7.1 Launch blockers (P0)

**P0-1 Fix `www.agentium.in` TLS and redirect — [Host]**
- Problem: expired certificate; `http://www` → `https://www` → TLS failure.
- Change: add `www.agentium.in` to the Vercel project, set "Redirect to agentium.in" (308); confirm GoDaddy CNAME stays `cname.vercel-dns.com` (or the Vercel-assigned value).
- Benefit: no dead entry point; consolidated signals on the apex.
- Effort S. Dependency: Vercel project access.
- Acceptance: `curl -sI https://www.agentium.in/` → 308 with valid cert; `https://www.agentium.in/jev` → `https://agentium.in/jev`.
- Verify: curl, SSL Labs, Search Console "Change of address" not needed (same domain).

**P0-2 Deterministic production origin and indexability — [App] `src/lib/site-config.ts`, `src/app/layout.tsx`**
- Problem: `noindex` ships unless `NEXT_PUBLIC_SITE_ORIGIN` is set; canonical falls back to localhost.
- Change: `SITE_ORIGIN = env override ?? (VERCEL_ENV === "production" ? "https://agentium.in" : VERCEL_URL ? https://VERCEL_URL : localhost)`; `IS_INDEXABLE = VERCEL_ENV === "production"`; `robots` metadata `{ index: IS_INDEXABLE, follow: IS_INDEXABLE, googleBot: { "max-image-preview": "large" } }`; fail `next build` if `VERCEL_ENV === "production"` and `SITE_ORIGIN !== "https://agentium.in"`.
- Benefit: production can never accidentally ship `noindex`; previews always do.
- Effort S. Dependency: none (also set `NEXT_PUBLIC_SITE_ORIGIN=https://agentium.in` in Vercel Production for explicitness).
- Acceptance: production HTML has `<meta name="robots" content="index, follow, max-image-preview:large">`, `<link rel="canonical" href="https://agentium.in/…">`; preview HTML has `noindex, nofollow` and Vercel's `X-Robots-Tag`.
- Verify: curl on production and a preview; Search Console URL Inspection after launch.

**P0-3 `robots.ts` and `sitemap.ts` — [App] `src/app/robots.ts`, `src/app/sitemap.ts`, `src/content/route-manifest.ts`**
- Change: robots allows all, `sitemap: ${SITE_ORIGIN}/sitemap.xml`; sitemap lists `/`, `/jev`, `/integrations`, `/examples` with manifest `lastModified`.
- Benefit: discovery and accurate freshness signals.
- Effort S. Dependency: P0-2.
- Acceptance: `/robots.txt` 200 `text/plain` with a `Sitemap:` line; `/sitemap.xml` 200 valid XML, 4 URLs, ISO `lastmod`, no localhost/preview hosts.
- Verify: curl; Search Console + Bing Webmaster sitemap submission (0 errors).

**P0-4 FAQ answers in the DOM — [App] `src/components/interactive/faq-accordion.tsx`**
- Change: `<AccordionPrimitive.Content forceMount className="data-[state=closed]:hidden …">` (or native `<details>`); keep animation classes; keep heading semantics.
- Benefit: the site's direct answers become crawlable text (required for snippets/AI answers per Google).
- Effort S.
- Acceptance: `curl` of `/` and `/jev` with scripts stripped contains every FAQ answer string; a11y unchanged (axe passes).
- Verify: Playwright test asserting DOM text; Rich Results Test "rendered HTML" view.

**P0-5 Open Graph images — [App] `src/app/opengraph-image.tsx`, `src/app/{jev,integrations,examples}/opengraph-image.tsx`**
- Change: `ImageResponse` 1200×630 using the wordmark and route title; layout `twitter.card` already set.
- Benefit: complete social cards; `primaryImageOfPage` for JSON-LD.
- Effort S–M.
- Acceptance: `og:image`, `og:image:width/height`, `twitter:image` present on all routes; image returns 200 `image/png`.
- Verify: curl; Facebook Sharing Debugger / LinkedIn Post Inspector / X Card Validator (manual).

**P0-6 Freeze positioning copy and titles — [App] `src/content/site.ts`, `src/app/**/page.tsx`**
- Change: adopt Section 4 titles/descriptions; add a one-sentence definition under each H1; align npm/GitHub/docs strings (see P1-6).
- Effort S (copy) — needs owner approval.
- Acceptance: titles ≤ 60 chars, unique; description ≤ 155; dev server and source match.

**P0-7 GA4 baseline — [App] `src/app/layout.tsx`, `src/lib/analytics.ts`**
- Change: install `@next/third-parties`; render `<GoogleAnalytics gaId={GA_ID} />` only when `GA_ID` is defined; `GA_ID` from `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Production: the chosen property — see Section 9 decision between `G-K1J2XC5BNR` and legacy `G-D8J1414KBN`); `debugMode` when `VERCEL_ENV !== "production"`. Enable Enhanced Measurement (page changes on history events, outbound clicks, scroll) in GA Admin.
- Benefit: page views, sessions, outbound clicks from day one.
- Effort S. Dependency: property decision; consent decision (Section 9).
- Acceptance: DebugView shows `page_view` on load and on client-side navigation between the four routes; no double `page_view` per navigation.
- Verify: GA4 DebugView + Realtime.

**P0-8 Legacy URL redirects and asset cleanup — [App] `next.config.ts`, `public/`**
- Change: `redirects()` for `/index.html → /`; delete template SVGs; (optional) `/favicon.svg` → `/icon.svg` if legacy links exist.
- Effort S.
- Acceptance: `/index.html` → 308 → `/`.

### 7.2 Launch improvements (P1)

**P1-1 JSON-LD entity graph — [App] `src/lib/structured-data.ts`, `src/components/seo/json-ld.tsx`, all `page.tsx`** — Section 5. Effort M. Dependencies: logo asset, `LICENSE` in repo, version source. Acceptance: one `application/ld+json` per route, validator 0 errors, RRT detects Breadcrumbs on subpages. Verify: unit + Playwright + validator + RRT.

**P1-2 Icons and manifest — [App] `src/app/icon.svg`, `apple-icon.png`, `manifest.ts`** — Effort S. Acceptance: `<link rel="icon" type="image/svg+xml">`, `apple-touch-icon`, `manifest` in `<head>`; Lighthouse PWA icon checks pass.

**P1-3 Security headers + CSP report-only — [App] `next.config.ts`** — Effort S–M. Acceptance: headers present on all routes; zero CSP violations in report endpoint for first-party + GA scripts. Verify: curl, securityheaders.com (manual), browser console.

**P1-4 Reveal-without-JS resilience — [App] `src/components/interactive/reveal.tsx`, `globals.css`** — Effort S–M. Acceptance: with JavaScript disabled (Playwright `javaScriptEnabled: false`) all section text is visible; Lighthouse LCP element is not an `opacity:0` node.

**P1-5 Playwright SEO/a11y/link-check suite — [App] `tests/*.spec.ts`, CI** — Checks: exactly one `<h1>`, canonical equals expected, robots meta by env, OG image 200, JSON-LD parse, axe (WCAG 2.1 AA) at two viewports, all `docs()` URLs return 200. Effort M. Acceptance: suite green in CI on every PR.

**P1-6 Entity consistency across npm/GitHub/docs — [External]** — GitHub description/homepage/topics/`LICENSE`; npm descriptions aligned for 9 packages; docs Introduction first sentence aligned; publish examples repo URL. Effort S–M (mostly non-code). Acceptance: identical description string on all surfaces; GitHub API returns `license.spdx_id: "MIT"`.

**P1-7 Docs platform entity fixes — [Docs] Mintlify `docs.json`/support** — Request: Organization `@id`/`url` → `https://agentium.in`, remove `WebSite{creator: Mintlify}`, add `author`, breadcrumb root `/`, fix/remove `.well-known/api-catalog` link header, add "Website" link to `https://agentium.in`, add GA4 (`integrations.ga4.measurementId`) with the same property. Effort S (config) / **[Unknown]** (platform capability). Acceptance: docs JSON-LD references the marketing Organization `@id`.

**P1-8 GA4 event taxonomy, custom dimensions, key events — [App] + GA Admin** — Section 8.3. Effort M. Acceptance: every event in the taxonomy visible in DebugView with declared params; key events marked; custom dimensions registered; no `page_view` inflation from `/integrations` search.

**P1-9 Web Vitals RUM — [App] `src/app/web-vitals.tsx` using `useReportWebVitals` → GA4 `web_vitals` event** (alternative: `@vercel/speed-insights`). Effort S. Acceptance: LCP/INP/CLS events with `metric_rating` arrive per page view; GA4 exploration can chart p75.

**P1-10 Internal linking pass — [App] `src/content/site.ts`** — Contextual links `/jev` ↔ `/integrations#jev` ↔ `/examples#jev-decisions`; approval recipe card on `/examples`; footer heading levels. Effort S.

**P1-11 Search Console + Bing Webmaster setup — [External]** — Domain property `agentium.in` (DNS TXT at GoDaddy) covering docs; submit both sitemaps; Bing import from GSC; consider IndexNow only if Mintlify/Vercel automation exists (<https://www.indexnow.org/documentation>). Effort S. Acceptance: both consoles verified; sitemaps "Success".

### 7.3 Post-launch experiments (P2)

**P2-1 Substantive articles (2–3) under `/articles/*`** with named authors, `TechArticle` + `Person` markup, runnable code, links to docs. Measure: impressions/clicks for non-brand queries on those URLs after 8–12 weeks; AI-answer log (Section 8.4). Effort L each.

**P2-2 Training-crawler policy experiment** — if the team chooses to disallow training crawlers, monitor referrals from AI products before/after (attribution is weak; treat as directional only). Effort S.

**P2-3 `Link: rel="llms-txt"` header on marketing responses pointing at docs `llms.txt`** — measure via Vercel logs for fetches of the docs `llms.txt` with AI user agents. Effort S. Expectation: unknown; label [3].

**P2-4 Version badge from npm at build time** (`softwareVersion` + visible "v3.1.1" in hero) with ISR/`revalidate` — Effort S–M. Guard against stale values.

**P2-5 Per-section `section_view` and scroll-depth analysis to trim or reorder homepage sections** — Effort S; decision after 4 weeks of data.

**P2-6 Cloudflare/Vercel bot access audit from logs** (403/429 by UA) — quarterly. Effort S.

---

## 8. Validation and measurement plan

### 8.1 Engineering acceptance (guaranteed, testable)

- All P0 acceptance criteria above pass on production within 24 h of launch.
- Lighthouse (mobile, PSI) on the four routes: Performance ≥ 90, Accessibility ≥ 95, SEO = 100; LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms (lab proxy for INP).
- Zero Schema.org validator errors; Rich Results Test detects Breadcrumbs on subpages.
- Playwright SEO/a11y/link-check suite green in CI.
- GA4 DebugView shows every taxonomy event with the correct parameters; Realtime shows `page_view` for all four routes.

### 8.2 Growth outcomes (tracked, not guaranteed)

- Index coverage: all 4 marketing URLs + all 237 docs URLs "Indexed" in Search Console Pages report; zero "Crawled – currently not indexed" beyond `.md` twins (which are intentionally `noindex`).
- Branded vs. non-branded impressions/clicks (GSC regex `agentium|jev` vs. rest), monthly; landing-page performance for `/`, `/jev`, `/integrations`, `/examples`, docs quickstart.
- Core Web Vitals: GSC CWV report will likely show "not enough data" for months; use GA4 `web_vitals` p75 instead.
- Referrals from AI products (GA4 custom channel group "AI assistants": `chatgpt.com`, `chat.openai.com`, `perplexity.ai`, `claude.ai`, `copilot.microsoft.com`, `gemini.google.com`, `you.com`, `phind.com`; plus `utm_source=chatgpt.com` which ChatGPT sometimes appends). Attribution gaps: many assistant clicks arrive as `(direct)` or with stripped referrers; Google AI Overviews/AI Mode are reported inside normal Google Search traffic in GSC, not separately.
- Conversions (GA4 key events): `quickstart_click`, `copy_install_command`, `integration_open`, `example_open`, `jev_docs_click`.

### 8.3 GA4 implementation and full event taxonomy

**Loading**
- `@next/third-parties/google` `<GoogleAnalytics gaId=… debugMode={!isProd} />` in `src/app/layout.tsx` (loads after hydration; SPA `page_view`s via Enhanced Measurement "Page changes based on browser history events" — Next uses `pushState`). Next docs: `node_modules/next/dist/docs/01-app/02-guides/third-party-libraries.md`. The package is marked experimental; fallback is `next/script` `strategy="afterInteractive"` with the owner's inline snippet.
- Only load when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set; in Preview use a **separate test property or the same property with `debug_mode`** and a GA4 "developer traffic" filter (<https://support.google.com/analytics/answer/10108813>) so previews do not pollute production data.
- Docs: configure the same property in Mintlify (`integrations.ga4`) and add `docs.agentium.in`/`agentium.in` to **unwanted referrals** (<https://support.google.com/analytics/answer/10327750>) so hopping between hosts does not start new sessions (same root domain → cookie shared; no linker needed).
- Consent: GA4 sets cookies. If EU/UK visitors are in scope, implement Consent Mode v2 defaults (`analytics_storage: denied` until consent; <https://developers.google.com/tag-platform/security/guides/consent>) with a minimal banner, or accept the legal risk explicitly (Section 9 decision).

**Wrapper**
- `src/lib/analytics.ts`: `track<E extends keyof EventMap>(name: E, params: EventMap[E])` calling `sendGAEvent("event", name, params)`; strips undefined, truncates strings to 100 chars, enforces snake_case names ≤ 40 chars and ≤ 25 params (GA4 limits: <https://support.google.com/analytics/answer/9267744>).
- `src/components/analytics/click-tracker.tsx` (client, mounted once in layout): delegated `click` listener that reads `data-track="<event>"` and `data-track-*` attributes from the nearest anchor/button. This lets server components (`Hero`, `SiteFooter`, `StaticCatalog`) declare events without becoming client components. Interactive client components (`IntegrationSearch`, `FaqAccordion`, `CodeTabs`, `CopyButton`, `JevDemo`, `ScrollStory`) call `track()` directly.
- Common params on every custom event: `page_path` (auto via `page_location`), `link_location` (`hero|header|footer|announcement|section:<id>|card`), `destination_type` (`docs|internal|external`).

**Event taxonomy**

| Layer | Event | Trigger | Params | Key event |
| --- | --- | --- | --- | --- |
| Automatic | `first_visit`, `session_start`, `page_view`, `user_engagement` | GA4 default | — | — |
| Enhanced measurement | `scroll` (90 %), `click` (outbound, includes docs host), `view_search_results` (URL `q` param), `file_download`, `form_start/submit`, `video_*` | GA Admin toggles | `link_url`, `search_term` | — |
| Recommended | `search` | `/integrations` query settles (300 ms debounce, ≥ 2 chars) | `search_term`, `results_count`, `category` | — |
| Recommended | `select_content` | card/FAQ/example/integration selection | `content_type` (`integration|example|faq|platform_item`), `content_id` | — |
| Custom | `cta_click` | primary/secondary buttons | `cta_id` (`hero_primary`, `hero_secondary`, `nav_start_building`, `final_cta_primary`…), `cta_label`, `destination_url`, `destination_type`, `link_location` | — |
| Custom | `docs_click` | any click to `https://docs.agentium.in/*` | `docs_path`, `link_text`, `link_location` | — |
| Custom | `quickstart_click` | `docs_click` where `docs_path === "/quickstart"` (also fire `docs_click`) | same | **yes** |
| Custom | `jev_docs_click` | `docs_click` to `/models/jev`, `/toolkits/jev`, `/eval/jev`, `/examples/jev` | same | **yes** |
| Custom | `copy_install_command` | `CopyButton` success | `command`, `link_location` | **yes** |
| Custom | `code_tab_select` | `CodeTabs` change | `sample_id`, `link_location` | — |
| Custom | `code_copy` | copy inside `CodePanel` | `sample_id` | — |
| Custom | `integration_filter` | category chip | `category`, `results_count` | — |
| Custom | `integration_open` | card click (also `select_content` + `docs_click`) | `integration_id`, `category` | **yes** |
| Custom | `example_open` | recipe link click | `example_id`, `link_text` | **yes** |
| Custom | `faq_toggle` | accordion open | `question_id`, `page_path`, `state` (`open`) | — |
| Custom | `jev_demo_interact` | demo tab/replay | `example_id`, `action` (`select|replay`) | — |
| Custom | `flow_demo_interact` | approve/deny/reset | `action`, `stage_id` | — |
| Custom | `nav_click` | header/footer/mobile links | `nav_item`, `link_location`, `destination_type` | — |
| Custom | `announcement_click` | strip link | `campaign` (`jev_launch`) | — |
| Custom | `section_view` | first 50 % visibility of `#stack`, `#code`, `#capabilities`, `#controls`, `#faq`… (IntersectionObserver, once per page view) | `section_id` | — |
| Custom | `page_not_found` | `not-found.tsx` mount | `page_path`, `referrer` | — |
| Custom | `web_vitals` | `useReportWebVitals` | `metric_name`, `metric_value` (rounded; CLS ×1000), `metric_rating`, `metric_id`, `metric_delta` | — |
| Custom | `client_error` | error boundary | `error_name`, `page_path` | — |
| Not applicable | `sign_up`, `login`, `purchase`, `generate_lead`, `share` | no such flows on the site | — | — |

Register event-scoped **custom dimensions** for: `cta_id`, `link_location`, `destination_type`, `docs_path`, `sample_id`, `integration_id`, `category`, `example_id`, `question_id`, `section_id`, `metric_name`, `metric_rating`, `action`; **custom metric**: `metric_value`, `results_count` (<https://support.google.com/analytics/answer/14240153>). Mark key events per the table (<https://support.google.com/analytics/answer/13116657>).

**Known pitfall to verify:** `/integrations` writes the URL with `history.replaceState` on every debounced keystroke. GA4's history-based `page_view` may fire on each change (creating `page_view` inflation with `?q=`), and Enhanced Measurement site-search may emit `view_search_results` (default params include `q`). Test in DebugView; if inflated, either (a) disable the site-search toggle and send only `search`, and/or (b) update the URL only on input blur/Enter, or (c) set `send_page_view: false` and send manual `page_view`s on `usePathname()` change only.

**Validation:** DebugView (<https://support.google.com/analytics/answer/7201382>) for every event with params; Realtime for `page_view`; a Playwright test that intercepts `https://www.google-analytics.com/g/collect` (or `…/debug/mp/collect`) and asserts `en=<event>` and expected `ep.*` params for: hero CTA click, install copy, integration search, FAQ open, 404.

### 8.4 AI-answer visibility protocol (manual, repeatable, directional only)

- Cadence: monthly, first week; logged-out; incognito; fixed locale (en-US) and region; record platform version/mode.
- Platforms: Google Search (AI Overview present? AI Mode), ChatGPT (search on), Perplexity, Claude (web search), Microsoft Copilot, Gemini.
- Question set (10): "What is Agentium?", "Best TypeScript agent frameworks for Node.js", "How do I build a multi-agent team in TypeScript?", "TypeScript agent framework with memory and tools", "How to require human approval before an agent runs a tool in TypeScript", "How to evaluate an AI agent's responses in TypeScript", "How to use Jev with TypeScript", "What is Jev by TypeSafe AI?", "TypeScript framework for voice agents", "How to build a browser agent with Playwright in TypeScript".
- Record per row: date, platform, exact prompt, whether Agentium is mentioned, cited URLs (host + path), position/prominence, competitor mentions, screenshot path.
- Caveats to state in the log: answers vary run-to-run and by account/personalisation/location; sample size is tiny; there is no stable "rank"; a mention without a click is not attributable in GA4; treat the log as qualitative evidence for content gaps, not as a KPI.

### 8.5 Baseline capture (before cutover)

- Save current production HTML/headers for `/` (done in this audit), GSC exports if access is granted (**[Unknown]**), legacy GA4 (`G-D8J1414KBN`) last-90-day sessions/landing pages if access is granted, PSI/Lighthouse for legacy `/`, and the docs sitemap snapshot (237 URLs, 2026-09-20).

---

## 9. Dependencies, unknowns, and decisions requiring input

| # | Decision / unknown | Why it matters | Default if no answer |
| --- | --- | --- | --- |
| D1 | **GA4 property:** use the supplied `G-K1J2XC5BNR` or the legacy `G-D8J1414KBN` (which has historical data)? Same property for docs (Mintlify)? | Continuity of historical data vs. clean start; cross-host sessions | Use `G-K1J2XC5BNR` in Production via `NEXT_PUBLIC_GA_MEASUREMENT_ID`; configure the same ID in Mintlify; keep legacy property read-only for history |
| D2 | **Consent/cookies:** implement Consent Mode v2 + banner for EEA/UK, or ship GA4 without consent gating? | Legal exposure; data completeness | Consent Mode with region-gated defaults (denied in EEA/UK/CH), no banner elsewhere — confirm with counsel |
| D3 | **AI training crawlers:** allow (docs currently `ai-train=yes`) or disallow `GPTBot`/`ClaudeBot`/`Google-Extended`/`Applebot-Extended`/`CCBot`? Must be consistent across marketing and docs | Policy, not SEO; search/user agents stay allowed either way | Allow (match docs) |
| D4 | **Organization identity:** legal name, logo asset (≥ 512 px square + wordmark), official profiles (Discord invite, X/LinkedIn), Product Hunt ownership, whether "Xhipment" is the operating entity | `Organization` markup, `sameAs`, footer | Emit minimal `Organization` (name/url/GitHub/npm) until confirmed |
| D5 | **Positioning sentence** (Section 4) and final hero H1 | Titles, descriptions, npm/GitHub/docs alignment | Proposed line in Section 4 |
| D6 | **Vercel access:** confirm project, `VERCEL_ENV`, Production env vars, Deployment Protection, Firewall rules, whether the legacy Vite deployment is the same project | P0-1, P0-2, crawler access | Assume same project; verify before cutover |
| D7 | **Mintlify `docs.json` capabilities** for JSON-LD Organization/author, GA4, website link, `.well-known` link headers | P1-7 | Open a support request; accept platform defaults if impossible |
| D8 | **`LICENSE` file and `softwareVersion` source** (release automation vs. constant) | Truthful `license`/`softwareVersion` | Add `LICENSE` (MIT); constant updated on release, no version if not maintained |
| D9 | **Examples repository URL** (`agentium-examples`) and GitHub Releases/changelog availability | `/examples` links, update-history evidence | Omit until known |
| D10 | **Search Console / Bing / legacy analytics access** | Baseline, index coverage, legacy URL cleanup | Proceed without; list as missing evidence |
| D11 | **Web Vitals RUM tool:** GA4 `web_vitals` events vs. `@vercel/speed-insights` | Cost, dashboards | GA4 events (no extra vendor) |
| D12 | **Post-launch articles:** authors willing to be named; editorial owner | P2-1 eligibility | Defer P2-1 |

---

## Appendix A — Source list (accessed 2026-09-20)

- Google Search Central: AI features <https://developers.google.com/search/docs/appearance/ai-features>; structured data intro <https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data>; policies <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>; SoftwareApplication <https://developers.google.com/search/docs/appearance/structured-data/software-app>; Organization <https://developers.google.com/search/docs/appearance/structured-data/organization>; Breadcrumb <https://developers.google.com/search/docs/appearance/structured-data/breadcrumb>; Article <https://developers.google.com/search/docs/appearance/structured-data/article>; FAQPage (gov/health restriction) <https://developers.google.com/search/docs/appearance/structured-data/faqpage>; robots.txt <https://developers.google.com/search/docs/crawling-indexing/robots/intro>; robots meta / X-Robots-Tag <https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag>; sitemaps <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>; canonicalisation <https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>; soft 404 <https://developers.google.com/search/docs/crawling-indexing/http-network-errors#soft-404-errors>; JavaScript SEO <https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics>; crawlers incl. Google-Extended <https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers>; title links <https://developers.google.com/search/docs/appearance/title-link>; page experience <https://developers.google.com/search/docs/appearance/page-experience>; Rich Results Test <https://search.google.com/test/rich-results>.
- Schema.org validator <https://validator.schema.org/>; vocabulary <https://schema.org/SoftwareApplication>, <https://schema.org/SoftwareSourceCode>, <https://schema.org/TechArticle>, <https://schema.org/CollectionPage>, <https://schema.org/ItemList>.
- Bing: webmaster guidelines <https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a>; crawlers <https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0>; IndexNow <https://www.indexnow.org/documentation>.
- AI crawlers: OpenAI <https://platform.openai.com/docs/bots>; Anthropic <https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler>; Perplexity <https://docs.perplexity.ai/guides/bots>; Apple <https://support.apple.com/en-us/119829>; Common Crawl <https://commoncrawl.org/ccbot>; Content Signals <https://contentsignals.org/>; llms.txt <https://llmstxt.org/>.
- Web Vitals <https://web.dev/articles/vitals>.
- Next.js 16.3.5 (local): `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`, `…/02-guides/third-party-libraries.md`, `…/02-guides/scripts.md`, `…/03-api-reference/03-file-conventions/01-metadata/{robots,sitemap,opengraph-image,manifest}.md`, `…/04-functions/generate-metadata.md`, `…/01-getting-started/14-metadata-and-og-images.md`.
- Vercel: domains <https://vercel.com/docs/domains/working-with-domains/add-a-domain>; system env vars <https://vercel.com/docs/environment-variables/system-environment-variables>; deployment protection <https://vercel.com/docs/deployment-protection>.
- Mintlify: GA4 integration <https://www.mintlify.com/docs/integrations/analytics/google-analytics>; llms.txt <https://www.mintlify.com/docs/ai/llmstxt>; settings <https://www.mintlify.com/docs/settings>.
- GA4: recommended events <https://support.google.com/analytics/answer/9267735>; event reference <https://developers.google.com/analytics/devguides/collection/ga4/reference/events>; enhanced measurement <https://support.google.com/analytics/answer/9216061>; key events <https://support.google.com/analytics/answer/13116657>; custom dimensions <https://support.google.com/analytics/answer/14240153>; limits <https://support.google.com/analytics/answer/9267744>; DebugView <https://support.google.com/analytics/answer/7201382>; unwanted referrals <https://support.google.com/analytics/answer/10327750>; developer traffic <https://support.google.com/analytics/answer/10108813>; channel groups <https://support.google.com/analytics/answer/13051316>; Consent Mode <https://developers.google.com/tag-platform/security/guides/consent>.
- Agentium primary sources: <https://docs.agentium.in/llms.txt>, <https://docs.agentium.in/migration-v3.md>, <https://docs.agentium.in/models/jev.md>, <https://docs.agentium.in/toolkits/jev.md>, <https://docs.agentium.in/eval/jev.md>, <https://docs.agentium.in/quickstart.md>, <https://registry.npmjs.org/@agentium/core>, <https://api.github.com/repos/agentiumOS/agentium>, <https://typesafe.ai>, <https://registry.npmjs.org/@typesafe-ai/sdk>.

## Appendix B — Reproducible audit commands

```bash
# Production and docs probes
curl -sSI https://agentium.in/ ; curl -sSI https://www.agentium.in/          # www TLS failure
echo | openssl s_client -connect www.agentium.in:443 -servername www.agentium.in | openssl x509 -noout -dates
curl -sS https://agentium.in/robots.txt ; curl -sS -o /dev/null -w '%{http_code}\n' https://agentium.in/sitemap.xml
curl -sS https://docs.agentium.in/robots.txt ; curl -sSI https://docs.agentium.in/quickstart.md | grep -i x-robots
curl -sS https://docs.agentium.in/sitemap.xml | grep -c '<loc>'
# Local initial HTML (dev server on :3000)
curl -sS http://localhost:3000/ | grep -oE '<meta name="robots"[^>]*>|<link rel="canonical"[^>]*>'
curl -sS http://localhost:3000/ | sed 's/<script.*<\/script>//g' | grep -c 'Agentium is a TypeScript framework'   # expect 0 today
# Docs link integrity
grep -rhoE 'docs\("[^"]+"\)' src | sed -E 's/docs\("([^"]+)"\)/\1/' | sort -u
```
