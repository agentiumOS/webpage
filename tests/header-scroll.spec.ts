import { expect, test } from "@playwright/test";

for (const route of ["/", "/integrations"]) {
  test(`${route} header hides on descent and returns after a deliberate upward scroll`, async ({ page }) => {
    await page.goto(route);
    const header = page.locator("header");
    await expect(header).not.toHaveAttribute("data-hidden", "");

    await page.evaluate(() => window.scrollTo({ top: 100, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-scrolled", "");
    await page.evaluate(() => window.scrollTo({ top: 650, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-hidden", "");
    await expect.poll(() => header.evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0);
    await page.evaluate(() => window.scrollBy({ top: -16, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-hidden", "");
    await page.evaluate(() => window.scrollBy({ top: -48, behavior: "instant" }));
    await expect(header).not.toHaveAttribute("data-hidden", "");
    await expect.poll(() => header.evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(header).not.toHaveAttribute("data-hidden", "");
  });
}

test("mobile navigation stays accessible while open", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const header = page.locator("header");
  await page.evaluate(() => window.scrollTo({ top: 100, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-scrolled", "");
  await page.evaluate(() => window.scrollTo({ top: 650, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-hidden", "");
  await page.evaluate(() => window.scrollBy({ top: -48, behavior: "instant" }));
  await expect(header).not.toHaveAttribute("data-hidden", "");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await expect(header).not.toHaveAttribute("data-hidden", "");
});

test("header movement respects reduced-motion preference", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header");
  await expect.poll(() => header.evaluate((element) => getComputedStyle(element).transitionProperty)).toContain("translate");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => header.evaluate((element) => getComputedStyle(element).transitionProperty)).not.toContain("translate");
});
