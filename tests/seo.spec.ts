import { expect, test, type Page } from "@playwright/test";

const ORIGIN = "https://agentium.in";
const ROUTES = ["/", "/jev", "/integrations", "/examples"] as const;

type JsonLdNode = { "@id"?: string; "@type"?: string | string[]; [key: string]: unknown };

async function readJsonLd(page: Page): Promise<{ scripts: number; graph: JsonLdNode[] }> {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const doc = JSON.parse(scripts[0] ?? "{}") as { "@graph"?: JsonLdNode[] };
  return { scripts: scripts.length, graph: doc["@graph"] ?? [] };
}

function collectIdRefs(value: unknown, out: Set<string>) {
  if (Array.isArray(value)) return value.forEach((v) => collectIdRefs(v, out));
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    if (keys.length === 1 && typeof obj["@id"] === "string") out.add(obj["@id"]);
    keys.forEach((k) => collectIdRefs(obj[k], out));
  }
}

test.describe("metadata", () => {
  for (const route of ROUTES) {
    test(`${route} has unique title, description, canonical, robots, OG image`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      const title = await page.title();
      expect(title.length).toBeGreaterThan(20);
      expect(title.length).toBeLessThanOrEqual(80);

      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(50);
      expect(description?.length ?? 0).toBeLessThanOrEqual(170);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBe(route === "/" ? ORIGIN : `${ORIGIN}${route}`);

      const robots = await page.locator('meta[name="robots"]').first().getAttribute("content");
      expect(robots).toContain("index");
      expect(robots).not.toContain("noindex");

      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
      expect(ogUrl).toBe(route === "/" ? ORIGIN : `${ORIGIN}${route}`);

      const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      expect(ogImage).toMatch(new RegExp(`^${ORIGIN}${route === "/" ? "" : route}/opengraph-image`));
      const imagePath = new URL(ogImage!).pathname + new URL(ogImage!).search;
      const img = await page.request.get(imagePath);
      expect(img.status()).toBe(200);
      expect(img.headers()["content-type"]).toContain("image/png");

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
    });
  }

  test("titles and descriptions are unique across routes", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const route of ROUTES) {
      await page.goto(route);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(ROUTES.length);
    expect(descriptions.size).toBe(ROUTES.length);
  });

  test("icons and manifest are linked", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveCount(1);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
    const manifest = await page.locator('link[rel="manifest"]').getAttribute("href");
    expect(manifest).toBeTruthy();
    const res = await page.request.get(manifest!);
    expect(res.status()).toBe(200);
  });
});

test.describe("structured data", () => {
  for (const route of ROUTES) {
    test(`${route} emits one JSON-LD graph with resolvable @ids`, async ({ page }) => {
      await page.goto(route);
      const { scripts, graph } = await readJsonLd(page);
      expect(scripts).toBe(1);
      expect(graph.length).toBeGreaterThanOrEqual(4);

      const ids = graph.map((n) => n["@id"]).filter(Boolean) as string[];
      expect(new Set(ids).size).toBe(ids.length);

      const refs = new Set<string>();
      collectIdRefs(graph, refs);
      for (const ref of refs) expect(ids, `unresolved @id ${ref}`).toContain(ref);

      const types = graph.flatMap((n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]]));
      expect(types).toContain("Organization");
      expect(types).toContain("WebSite");
      expect(types).toContain("SoftwareApplication");
      expect(types).not.toContain("FAQPage");

      const webPage = graph.find((n) => n["@type"] === "WebPage" || n["@type"] === "CollectionPage");
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect((webPage?.url as string).replace(/\/$/, "")).toBe(canonical);

      if (route !== "/") expect(types).toContain("BreadcrumbList");
      if (route === "/integrations" || route === "/examples") {
        expect(types).toContain("CollectionPage");
        expect(types).toContain("ItemList");
      }
    });
  }

  test("/jev attributes Jev to TypeSafe AI, not Agentium", async ({ page }) => {
    await page.goto("/jev");
    const { graph } = await readJsonLd(page);
    const jev = graph.find((n) => n.name === "Jev");
    const typesafe = graph.find((n) => n.name === "TypeSafe AI");
    expect(jev).toBeTruthy();
    expect(typesafe).toBeTruthy();
    expect((jev?.provider as JsonLdNode)["@id"]).toBe(typesafe?.["@id"]);
    expect(JSON.stringify(jev)).not.toContain(`${ORIGIN}/#organization`);
  });

  test("JSON-LD is safely serialised", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').first().innerHTML();
    expect(raw).not.toContain("<");
    expect(raw).not.toContain("</script");
  });
});

test.describe("robots and sitemap", () => {
  test("robots.txt allows crawling and lists the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    expect(body).toMatch(/User-Agent: \*/i);
    expect(body).toContain("Allow: /");
    expect(body).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
    expect(body).not.toContain("Disallow: /\n");
  });

  test("sitemap.xml lists exactly the indexable routes with lastmod", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual([`${ORIGIN}/`, `${ORIGIN}/jev`, `${ORIGIN}/integrations`, `${ORIGIN}/examples`]);
    expect((body.match(/<lastmod>\d{4}-\d{2}-\d{2}/g) ?? []).length).toBe(4);
    expect(body).not.toContain("localhost");
  });

  test("legacy /index.html redirects permanently to /", async ({ request }) => {
    const res = await request.get("/index.html", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toBe("/");
  });

  test("unknown URL returns a real 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("security headers are present", async ({ request }) => {
    const headers = (await request.get("/")).headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["content-security-policy-report-only"]).toContain("default-src 'self'");
  });
});

test.describe("initial HTML content", () => {
  test("FAQ answers are present in the server HTML", async ({ request }) => {
    const html = await (await request.get("/")).text();
    const dom = html.replace(/<script[\s\S]*?<\/script>/g, "");
    expect(dom).toContain("Agentium is a TypeScript framework for building agent applications on Node.js");
    expect(dom).toContain("Agentium is a TypeScript agent framework for Node.js");
  });

  test("/jev states Jev ownership in the server HTML", async ({ request }) => {
    const html = await (await request.get("/jev")).text();
    const dom = html.replace(/<script[\s\S]*?<\/script>/g, "");
    expect(dom).toContain("TypeSafe AI");
    expect(dom).toContain("Jev handles typed decisions");
  });

  test("content is visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    const faqHeading = page.locator("#faq h2");
    await expect(faqHeading).toBeVisible();
    const opacity = await faqHeading.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBe(1);
    await context.close();
  });
});
