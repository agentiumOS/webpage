import { expect, test } from "@playwright/test";

test("a tall integration catalog reveals its content on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/integrations");
  const firstCard = page.locator('#catalog a[data-track="integration_open"]').first();
  await firstCard.scrollIntoViewIfNeeded();
  await expect.poll(() => firstCard.evaluate((el) => {
    const reveal = el.closest("[data-reveal]");
    return reveal ? Number(getComputedStyle(reveal).opacity) : 1;
  })).toBe(1);
});

test("reduced-motion headings settle without an offset", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const heading = page.locator("#hero-title [data-reveal]");
  await expect.poll(() => heading.evaluate((el) => getComputedStyle(el).transform)).toBe("none");
  await expect.poll(() => heading.evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(1);
});

test("lifecycle events fit a narrow phone viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("list", { name: "Example lifecycle events" }).scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});
