import { expect, test } from "@playwright/test";

/**
 * The production build under test has no GA measurement ID, so `track()`
 * falls back to pushing onto `window.dataLayer`. These tests assert the event
 * names and parameters that would reach GA4.
 */
type Pushed = { name: string; params: Record<string, unknown> };

async function readEvents(page: import("@playwright/test").Page): Promise<Pushed[]> {
  return page.evaluate(() => {
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    const out: { name: string; params: Record<string, unknown> }[] = [];
    for (const entry of layer) {
      const args = Array.from(entry as ArrayLike<unknown>);
      if (args[0] === "event" && typeof args[1] === "string") {
        out.push({ name: args[1], params: (args[2] as Record<string, unknown>) ?? {} });
      }
    }
    return out;
  });
}

test.describe("GA4 event layer", () => {
  test.skip(({ browserName }) => browserName !== "chromium");

  test("no analytics script is injected without a measurement ID", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
  });

  test("hero CTA click emits cta_click and quickstart_click", async ({ page }) => {
    await page.goto("/");
    // Prevent navigation to the docs so we can inspect the data layer.
    await page.route("https://docs.agentium.in/**", (route) => route.fulfill({ status: 204, body: "" }));
    const cta = page.locator('a[data-track-cta-id="hero_primary"]');
    await cta.click();
    const events = await readEvents(page);
    const ctaEvent = events.find((e) => e.name === "cta_click");
    expect(ctaEvent?.params).toMatchObject({
      cta_id: "hero_primary",
      destination_type: "docs",
      link_location: "hero",
    });
    expect(events.some((e) => e.name === "docs_click" && e.params.docs_path === "/quickstart")).toBe(true);
    expect(events.some((e) => e.name === "quickstart_click")).toBe(true);
  });

  test("FAQ open emits faq_toggle", async ({ page }) => {
    await page.goto("/#faq");
    const trigger = page.locator("#faq button").first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const events = await readEvents(page);
    expect(events.some((e) => e.name === "faq_toggle" && e.params.state === "open")).toBe(true);
  });

  test("integration search emits search with results_count", async ({ page }) => {
    await page.goto("/integrations");
    await page.getByLabel("Find an integration").fill("slack");
    await page.waitForTimeout(500);
    const events = await readEvents(page);
    const search = events.find((e) => e.name === "search");
    expect(search?.params).toMatchObject({ search_term: "slack", results_count: 1, category: "all" });
  });

  test("section_view fires once per section", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const events = (await readEvents(page)).filter((e) => e.name === "section_view");
    const ids = events.map((e) => e.params.section_id);
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("404 page emits page_not_found", async ({ page }) => {
    await page.goto("/missing-page-xyz");
    const events = await readEvents(page);
    expect(events.some((e) => e.name === "page_not_found" && e.params.page_path === "/missing-page-xyz")).toBe(
      true,
    );
  });
});
